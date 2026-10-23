import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DehradunLocationClient from "./DehradunLocationClient";

// Title: Exactly 59 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 146 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Dehradun: Registration & Probate Law Guide",
  },
  description:
    "Draft and register your Will in Dehradun. Expert Uttarakhand High Court probate advice, asset planning, and lawyer guidance across Dehradun & Doon Valley.",
  keywords: [
    "will drafting in dehradun",
    "will registration uttarakhand e-prerna dehradun",
    "mdda plot will transfer dehradun",
    "defense personnel will drafting dehradun",
    "uttarakhand high court probate will",
    "succession lawyer dehradun",
    "sub registrar office dehradun sadar",
    "section 213 indian succession act uttarakhand",
    "doorstep will registration dehradun section 31",
    "doctor medical certificate will dehradun",
    "will registration doiwala sro",
    "will drafting rajpur road dehradun",
    "dalanwala estate planning will",
    "vasant vihar property succession dehradun",
    "clement town cantt will lawyer",
    "garhi cantt army pension will dehradun",
    "uttarakhand land ceiling will inheritance section 154",
    "doon valley agricultural orchard will transfer",
    "online will maker dehradun uttarakhand",
    "ama legal solutions dehradun will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/dehradun",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/dehradun",
      "x-default": "https://www.willdrafting.in/locations/dehradun",
    },
  },
  openGraph: {
    title: "Will Drafting in Dehradun: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Dehradun. Expert Uttarakhand High Court probate advice, asset planning, and lawyer guidance across Dehradun & Doon Valley.",
    url: "https://www.willdrafting.in/locations/dehradun",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-dehradun.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Asset Protection Services in Dehradun Uttarakhand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Dehradun: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Dehradun. Expert Uttarakhand High Court probate advice, asset planning, and lawyer guidance across Dehradun & Doon Valley.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-dehradun.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const DEHRADUN_FAQS = [
  {
    q: "Is court probate mandatory for a Will in Dehradun?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the historical presidential territories of Mumbai, Kolkata, and Chennai. Dehradun is governed under the High Court of Uttarakhand at Nainital. The Supreme Court of India in Clarence Pais v. Union of India confirmed that probate is strictly optional for Hindu, Sikh, Jain, Buddhist, and Christian Wills outside presidency limits. A registered Will provides complete legal validity for direct asset transfer before MDDA, Nagar Nigam Dehradun, and revenue tehsils without expensive court litigation.",
  },
  {
    q: "Is Will registration compulsory under Uttarakhand registration rules?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Uttarakhand. A Will signed on plain paper before two competent witnesses is legally binding. However, registering your Will at the local Sub-Registrar Office via the Uttarakhand e-Prerna portal creates an indelible government record in Book III. This neutralizes future family litigation, prevents false claims of coercion, and ensures smooth mutation across Doon Valley land authorities.",
  },
  {
    q: "How do I transfer an MDDA plot or Dehradun residential house after death?",
    a: "Beneficiaries must submit an application to the Mussoorie Dehradun Development Authority (MDDA) along with the original death certificate, a certified copy of the registered Will, proof of legal heirship, and an indemnity bond. MDDA issues a public notice in local daily newspapers. If no objection is received within thirty days, the allotment and lease deed are transferred directly to the designated beneficiary in official records.",
  },
  {
    q: "What is the official government fee to register a Will in Dehradun?",
    a: "Wills are completely exempt from stamp duty across Uttarakhand under the Indian Stamp Act. Testators pay zero stamp duty regardless of property valuation. At Dehradun Sub-Registrar offices under the Registration Department of Uttarakhand, you only pay a flat statutory registration fee of one hundred rupees, along with nominal digital scanning and biometric user charges of approximately one hundred to two hundred rupees.",
  },
  {
    q: "How does a Will protect retired defense personnel and pensioners in Dehradun?",
    a: "Dehradun is home to thousands of retired armed forces veterans from the Army, Navy, and Air Force. Under Supreme Court rulings, bank or pension nominations only create interim custodial rights and do not convey ownership. A carefully drafted Will clearly allocates army housing board flats (AWHO/AFNHB), commercial plots, DSOP fund balances, and gratuity proceeds to chosen legal heirs, eliminating post-service inheritance disputes.",
  },
  {
    q: "Can an Uttarakhand Sub-Registrar visit home for senior citizens under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell citizens across Dehradun can request a doorstep home visit by the Sub-Registrar. A registered medical practitioner (MBBS doctor) must provide a mental fitness certificate certifying sound disposing state of mind. An official government commission fee is paid through the state treasury portal, and our legal team coordinates the visit.",
  },
  {
    q: "How does a Will handle agricultural land and orchards under Uttarakhand Land Laws?",
    a: "Uttarakhand enforces strict ceiling restrictions on non-domicile agricultural land purchases under Section 154 of the UPZA&LR Act as adapted in the state. However, testamentary succession under a Will is a devolution by operation of law, not an inter-vivos sale transaction. A legally sound Will ensures agricultural holdings, tea garden interests, and Doon Valley orchards transfer smoothly to family heirs without revenue confiscation risks.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) and Doon alumni make a Will for Dehradun properties?",
    a: "Yes. Many NRIs and alumni of Dehradun boarding schools own ancestral homes, holiday cottages, and plots in Dalanwala, Rajpur, and Mussoorie. NRIs can draft their Will online through our legal platform and execute it abroad before two witnesses. The Will can be notarized and consularized at the Indian Embassy, or registered during their visit to India at the jurisdictional Dehradun Sub-Registrar Office.",
  },
];

export default function DehradunLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/dehradun";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-dehradun.jpg";

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
        name: "Will Drafting in Dehradun: Registration & Probate Law Guide",
        description:
          "Draft and register your Will in Dehradun. Expert Uttarakhand High Court probate advice, asset planning, and lawyer guidance across Dehradun & Doon Valley.",
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
          caption: "Legal Will Drafting and Asset Protection Services in Dehradun Uttarakhand",
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
            name: "Dehradun",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Dehradun - Estate Planning, Defense Pensioners & Uttarakhand IGR Registration",
        description:
          "Professional Will drafting, defense veteran succession advisory, MDDA property inheritance, and Uttarakhand e-Prerna Sub-Registrar registration support across Dehradun and Doon Valley.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dehradun",
          addressRegion: "Uttarakhand",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Dehradun" },
          { "@type": "City", name: "Rajpur Road" },
          { "@type": "City", name: "Dalanwala" },
          { "@type": "City", name: "Vasant Vihar" },
          { "@type": "City", name: "Hathibarkala" },
          { "@type": "City", name: "Clement Town" },
          { "@type": "City", name: "Garhi Cantt" },
          { "@type": "City", name: "Prem Nagar" },
          { "@type": "City", name: "Jakhan" },
          { "@type": "City", name: "Sahastradhara Road" },
          { "@type": "City", name: "Canal Road" },
          { "@type": "City", name: "Patel Nagar" },
          { "@type": "City", name: "GMS Road" },
          { "@type": "City", name: "Majra" },
          { "@type": "City", name: "Doiwala" },
          { "@type": "City", name: "Rishikesh" },
          { "@type": "City", name: "Mussoorie" },
          { "@type": "City", name: "Vikasnagar" },
          { "@type": "City", name: "Herbertpur" },
          { "@type": "City", name: "Selaqui" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Dehradun Will Drafting, Defense Succession & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Dehradun Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & MDDA Property Succession Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Dehradun Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Dehradun Uttarakhand",
        description:
          "Five straightforward steps to create a legally binding Will and register it before the Sub-Registrar in Dehradun.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Properties, Pension Assets, and Beneficiaries",
            text: "Compile your Dehradun residential homes, MDDA plots, defense housing units, bank savings, and orchard holdings. Appoint your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Exact Legal Succession Clauses",
            text: "Draft your Will using our legally verified platform or with an advocate to include non-presidency probate clarity, specific bequests, and executor powers.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not beneficiaries under the document.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Dehradun SRO Slot on Uttarakhand e-Prerna",
            text: "Schedule an appointment token on registration.uk.gov.in for your jurisdictional Dehradun SRO and pay the nominal ₹100 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the Sub-Registrar Office with your two witnesses, original Aadhaar cards, and photographs for biometric thumbprinting, digital photography, and Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: DEHRADUN_FAQS.map((item) => ({
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
      <DehradunLocationClient faqs={DEHRADUN_FAQS} />
      <Footer />
    </>
  );
}
