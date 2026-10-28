import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WestBengalLocationClient from "./WestBengalLocationClient";

// Title: Exactly 57 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 154 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in West Bengal: Probate & Registration Guide",
  },
  description:
    "Draft your Will in West Bengal. Expert guidance on Calcutta High Court probate mandate, Dayabhaga Hindu law, and e-District West Bengal SRO.",
  keywords: [
    "will drafting in west bengal",
    "calcutta high court probate will",
    "wbregistration will appointment",
    "dayabhaga law will bengal",
    "estate lawyer kolkata",
    "will registration west bengal sro",
    "ara kolkata will registration",
    "kmc property mutation will",
    "salt lake leasehold will transfer",
    "section 213 indian succession act kolkata",
    "probate lawyer calcutta high court",
    "will drafting howrah",
    "will drafting asansol",
    "will drafting siliguri",
    "will drafting durgapur",
    "will drafting bardhaman",
    "will drafting kharagpur",
    "banglarbhumi will mutation",
    "section 31 registration act home visit west bengal",
    "stamp duty on will in west bengal",
    "online will maker west bengal",
    "ama legal solutions west bengal will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/west-bengal",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/west-bengal",
      "x-default": "https://www.willdrafting.in/locations/west-bengal",
    },
  },
  openGraph: {
    title: "Will Drafting in West Bengal: Probate & Registration Guide",
    description:
      "Draft your Will in West Bengal. Expert guidance on Calcutta High Court probate mandate, Dayabhaga Hindu law, and e-District West Bengal SRO.",
    url: "https://www.willdrafting.in/locations/west-bengal",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-west-bengal-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting, Probate and Property Succession in West Bengal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in West Bengal: Probate & Registration Guide",
    description:
      "Draft your Will in West Bengal. Expert guidance on Calcutta High Court probate mandate, Dayabhaga Hindu law, and e-District West Bengal SRO.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-west-bengal-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const WEST_BENGAL_FAQS = [
  {
    q: "Is Will registration mandatory across West Bengal?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional throughout West Bengal. A Will executed on standard white paper and signed in the presence of two adult witnesses is legally valid. However, formal registration at an Additional Registrar of Assurances (ARA) or local Sub-Registrar Office places the document into permanent Book III government custody. This deters fraudulent claims and simplifies municipal property mutation with Kolkata Municipal Corporation (KMC) and district land offices.",
  },
  {
    q: "Is probate compulsory in West Bengal under Calcutta High Court rules?",
    a: "Yes, but strictly within specific territorial limits. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory for Hindu, Buddhist, Sikh, and Jain Wills executed within the historical presidency town of Kolkata (Ordinary Original Civil Jurisdiction of the Calcutta High Court) or where immovable property covered under the Will is situated in Kolkata. In districts outside Kolkata presidency town, probate is optional unless a dispute arises in a competent civil court.",
  },
  {
    q: "What is Dayabhaga Hindu law and how does it affect Wills in West Bengal?",
    a: "Unlike most of India which adheres to Mitakshara law, West Bengal historically follows the Dayabhaga School of Hindu law. Under Dayabhaga law, male or female children do not acquire any birthright in ancestral property while the father or holder is alive. The owner possesses complete, unfettered testamentary power to bequeath both self-acquired and ancestral properties through a Will without coparcener consent.",
  },
  {
    q: "What is the government fee to register a Will in West Bengal?",
    a: "Wills are 100% exempt from ad-valorem stamp duty across West Bengal under the Indian Stamp Act as applicable to the state. Testators do not need non-judicial stamp paper. At West Bengal registration offices, testators pay only a flat Book III registration fee of ₹100, alongside nominal computer scanning and system charges of approximately ₹100 to ₹240. No percentage-based property valuation fees apply.",
  },
  {
    q: "How do I book a Will registration slot on wbregistration.gov.in?",
    a: "Appointments are scheduled online through the Directorate of Registration and Stamp Revenue West Bengal portal (wbregistration.gov.in). You submit testator and witness details, generate an e-Deed assessment token, remit nominal registration fees via the GRIPS payment gateway, and secure an official time slot for biometric presentation at your local Sub-Registrar or ARA office.",
  },
  {
    q: "Can senior citizens in West Bengal register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden persons, or individuals facing severe medical mobility restrictions can request a doorstep registration visit. An MBBS registered doctor certifies the testator is of sound mind but medically unfit to travel. A Sub-Registrar or Special Commission officer attends your residence or hospital room with portable biometric equipment.",
  },
  {
    q: "How does a registered Will assist with Kolkata Municipal Corporation (KMC) mutation?",
    a: "Kolkata Municipal Corporation requires verified title documentation before mutating names on the assessment register (Form A/B). If the property lies within Kolkata presidency jurisdiction, KMC requires a grant of probate from the Calcutta High Court. If located in district corporation areas where probate is optional, a registered Will and death certificate provide primary legal proof for ownership transfer.",
  },
  {
    q: "Can 99-year leasehold plots in Salt Lake (Bidhannagar) or New Town be bequeathed?",
    a: "Yes. Residential plots and apartments in Salt Lake and New Town (WBHIDCO / NKDA) can be bequeathed through a Will. Following the testator's demise, the named legatee submits the registered Will (and probate order if situated within Kolkata presidency limits) to the Urban Development and Municipal Affairs Department to execute a formal lease substitution.",
  },
  {
    q: "How are agricultural lands mutated on the Banglarbhumi portal after demise?",
    a: "For agricultural parcels, orchards, and rural homesteads across West Bengal districts, succession is recorded under the West Bengal Land Reforms Act. The beneficiary presents the registered Will and death certificate to the local Block Land & Land Reforms Officer (BL&LRO) or submits an online mutation petition via banglarbhumi.gov.in to update the Khatian and Record of Rights (RoR).",
  },
  {
    q: "Who can serve as a valid attesting witness for a West Bengal Will?",
    a: "Any two adult individuals of sound mind holding valid government identification (such as Aadhaar or voter card) can act as attesting witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any legacy under the Will. Family doctors, trusted neighbors, or family friends make ideal witnesses.",
  },
  {
    q: "Does a housing cooperative society nomination override a Will in West Bengal?",
    a: "No. Under the West Bengal Co-operative Societies Act, 2006 and consistent Supreme Court jurisprudence, a nominee is merely a custodian who holds the flat in trust. A nomination does not confer absolute ownership. Only a valid Will or lawful succession determines true beneficial inheritance of the society share certificate and flat.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located across West Bengal?",
    a: "Yes. NRIs residing in the UK, USA, Gulf, or elsewhere can draft a customized Will for their West Bengal apartments, ancestral homes, and bank deposits. The document can be signed before two independent witnesses abroad and authenticated via consular notarization or apostille, or registered at a local West Bengal SRO during an India visit.",
  },
];

export default function WestBengalLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/west-bengal";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-west-bengal.jpg";

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
        name: "Will Drafting in West Bengal: Probate & Registration Guide",
        description:
          "Draft your Will in West Bengal. Expert guidance on Calcutta High Court probate mandate, Dayabhaga Hindu law, and e-District West Bengal SRO.",
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
          caption: "Legal Will Drafting, Probate and Property Succession in West Bengal",
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
            name: "West Bengal",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting West Bengal - Estate Planning, Probate & SRO Registration Desk",
        description:
          "Professional Will drafting, lawyer check, Calcutta High Court probate guidance, wbregistration.gov.in e-District appointments, and.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kolkata",
          addressRegion: "West Bengal",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "West Bengal" },
          { "@type": "City", name: "Kolkata" },
          { "@type": "City", name: "Howrah" },
          { "@type": "City", name: "Asansol" },
          { "@type": "City", name: "Siliguri" },
          { "@type": "City", name: "Durgapur" },
          { "@type": "City", name: "Bardhaman" },
          { "@type": "City", name: "Kharagpur" },
          { "@type": "City", name: "Bidhannagar" },
          { "@type": "City", name: "New Town" },
          { "@type": "City", name: "Alipore" },
          { "@type": "City", name: "Berhampore" },
          { "@type": "City", name: "Malda" },
          { "@type": "City", name: "Darjeeling" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "West Bengal Will Drafting, Probate & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for West Bengal Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Probate Assessment",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete West Bengal SRO / ARA Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in West Bengal",
        description:
          "Five clear legal steps to draft, execute, and register an enforceable Will before the SRO or ARA in West Bengal.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your West Bengal assets including Kolkata flats, Salt Lake leaseholds, Banglarbhumi land parcels, bank accounts, and investments. Nominate your heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will incorporating Dayabhaga legal principles, complete asset descriptions, executor office, guardian appointments for minors, and explicit revocation of prior instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on standard A4 paper and sign each page in the physical presence of two independent non-heir adult witnesses holding valid government photo ID.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book e-District West Bengal Appointment",
            text: "Generate an e-Deed assessment token on wbregistration.gov.in, remit the flat ₹100 filing fee via the GRIPS payment gateway, and select your preferred SRO or ARA office.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at SRO or ARA Counter",
            text: "Attend the filing office with your witnesses for verbal witness signing, photo capture, and electronic thumbprint recording to finalize permanent Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: WEST_BENGAL_FAQS.map((item) => ({
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
      <WestBengalLocationClient faqs={WEST_BENGAL_FAQS} />
      <Footer />
    </>
  );
}
