import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RajkotLocationClient from "./RajkotLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 153 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Rajkot: Legal Online Will Making Help",
  },
  description:
    "Draft a legally binding Will in Rajkot. Expert lawyer review, Garvi Gujarat registration advice, and seamless family business succession.",
  keywords: [
    "will drafting in rajkot",
    "will registration gujarat sub registrar",
    "ruda plot will transfer rajkot",
    "engineering business will rajkot",
    "estate advocate gujarat",
    "rajkot municipal corporation mutation will",
    "garvi gujarat rajkot sro",
    "will drafting kalawad road",
    "will drafting yagnik road",
    "will drafting mavdi rajkot",
    "will drafting university road",
    "will drafting soni bazar",
    "will drafting aji gidc",
    "will drafting shapar veraval",
    "will drafting metoda gidc",
    "section 31 registration act home visit rajkot",
    "gujarat stamp act will exemption",
    "is probate mandatory in gujarat",
    "gujarat high court probate rajkot exemption",
    "rmc property tax will mutation",
    "ruda bungalow succession will",
    "ama legal solutions rajkot will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/rajkot",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/rajkot",
      "x-default": "https://www.willdrafting.in/locations/rajkot",
    },
  },
  openGraph: {
    title: "Will Drafting in Rajkot: Legal Online Will Making Help",
    description:
      "Draft a legally binding Will in Rajkot. Expert lawyer review, Garvi Gujarat registration advice, and seamless family business succession.",
    url: "https://www.willdrafting.in/locations/rajkot",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-rajkot-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Business Succession in Rajkot Gujarat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Rajkot: Legal Online Will Making Help",
    description:
      "Draft a legally binding Will in Rajkot. Expert lawyer review, Garvi Gujarat registration advice, and seamless family business succession.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-rajkot-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const RAJKOT_FAQS = [
  {
    q: "Is Will registration mandatory in Rajkot under Gujarat law?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Rajkot and across Gujarat. A Will signed on plain white paper before two independent witnesses is valid. However, registering your Will at a Rajkot Sub-Registrar Office via the Garvi Gujarat portal places it in official Book III custody. This protects your estate from false challenges and speeds up mutation with the Rajkot Municipal Corporation (RMC) and RUDA.",
  },
  {
    q: "Is probate required for properties in Rajkot under Gujarat High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only for Wills executed in or concerning immovable properties located within the historic presidency towns of Mumbai, Kolkata, and Chennai. Rajkot lies outside the presidency towns. The Gujarat High Court has repeatedly held that probate is optional for Hindu, Jain, Sikh, and Buddhist Wills in Gujarat, permitting direct property mutation.",
  },
  {
    q: "What is the official government fee to register a Will in Rajkot?",
    a: "Testamentary Wills are completely exempt from stamp duty across Gujarat under the Gujarat Stamp Act. At Rajkot Sub-Registrar offices, you pay only a nominal flat registration fee of ₹100 under Gujarat Registration Rules, along with computer scanning and data entry charges of approximately ₹100 to ₹300 through the Cyber Treasury challan system. There are no percentage-based property value fees.",
  },
  {
    q: "How are RUDA plots, freehold bungalows, and RMC flats transferred after demise?",
    a: "Following the testator's demise, the nominated successor submits an application to the Rajkot Municipal Corporation (RMC) for property tax assessment transfer (Varasdar Nond) and to the Rajkot Urban Development Authority (RUDA). The application includes a certified copy of the registered Will, the death certificate, and an indemnity bond. A public notice is issued in local Gujarati newspapers. Once clear, ownership records are updated smoothly.",
  },
  {
    q: "How is an engineering unit or foundry in Aji GIDC or Shapar-Veraval bequeathed?",
    a: "Rajkot is a major center for diesel engine foundries, auto-parts, and CNC manufacturing. A Will can bequeath GIDC industrial plot leasehold rights, factory machinery, partnership shares, and corporate equity. After demise, the executor presents the registered Will to the GIDC Divisional Office for formal leasehold transfer, protecting commercial continuity without court delays.",
  },
  {
    q: "How do I book an appointment on the Garvi Gujarat portal for Rajkot registration?",
    a: "Will registration appointments are booked online through the Inspector General of Registration Gujarat portal at garvi.gujarat.gov.in. Citizens log in, enter testator and witness KYC details, choose their local Rajkot Sub-Registrar Office (such as SRO 1 Old Collectorate, SRO 2 Mavdi, SRO 3 Kothariya, or SRO 4 Madhapar), pay the ₹100 fee via Cyber Treasury, and select a confirmed date and time.",
  },
  {
    q: "Can senior citizens in Rajkot register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly citizens, ill individuals, or persons with mobility challenges can request a doorstep visit. An MBBS doctor provides a medical certificate confirming testamentary capacity and difficulty traveling. The Sub-Registrar attends your home in Kalawad Road, Yagnik Road, or University Road with portable biometric equipment.",
  },
  {
    q: "How can bullion and gold traders in Soni Bazar protect family business wealth?",
    a: "Gold and silver bullion trading firms along Soni Bazar and Palace Road often involve joint family businesses, HUF coparcenary assets, and physical bullion. A comprehensive Will clearly separates personal self-acquired wealth from ancestral HUF capital, outlines partnership succession, and secures spousal life interest, avoiding destructive family court disputes.",
  },
  {
    q: "Who can serve as valid attesting witnesses at a Rajkot Sub-Registrar Office?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government identity cards can serve as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or gift under the Will. Respected family friends, chartered accountants, or family doctors in Rajkot are ideal choices.",
  },
  {
    q: "Can Non-Resident Gujaratis (NRGs / NRIs) make a Will for assets in Rajkot?",
    a: "Yes. Many NRGs and NRIs living in the UK, USA, Canada, UAE, and Africa own apartments, plots, and commercial units in Rajkot. NRIs can draft a tailored Indian Will online. They can execute it abroad before two witnesses with Indian consulate attestation, or complete formal Book III registration before a Rajkot Sub-Registrar during their visit to Gujarat.",
  },
];

export default function RajkotLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/rajkot";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-rajkot.jpg";

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
        name: "Will Drafting in Rajkot: Legal Online Will Making Help",
        description:
          "Draft a legally binding Will in Rajkot. Expert lawyer review, Garvi Gujarat filing advice, and seamless family business estate.",
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
          caption: "Legal Will Drafting and Business Succession in Rajkot Gujarat",
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
            name: "Rajkot",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Rajkot - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer talk, Garvi Gujarat portal appointment booking, and doorstep signing support across Rajkot.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rajkot",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Rajkot" },
          { "@type": "City", name: "Kalawad Road" },
          { "@type": "City", name: "University Road" },
          { "@type": "City", name: "Dr Yagnik Road" },
          { "@type": "City", name: "Dharmendra Road" },
          { "@type": "City", name: "Soni Bazar" },
          { "@type": "City", name: "Mavdi" },
          { "@type": "City", name: "Nana Mava" },
          { "@type": "City", name: "150 Feet Ring Road" },
          { "@type": "City", name: "Raiya Road" },
          { "@type": "City", name: "Sadhu Vaswani Road" },
          { "@type": "City", name: "Aji GIDC" },
          { "@type": "City", name: "Bhaktinagar" },
          { "@type": "City", name: "Shapar Veraval" },
          { "@type": "City", name: "Metoda GIDC" },
          { "@type": "City", name: "Madhapar" },
          { "@type": "City", name: "Kothariya" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Rajkot Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Rajkot Residents",
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
                name: "Complete Rajkot Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Rajkot",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Rajkot.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Rajkot assets including RUDA home plots, RMC apartments, GIDC plant units, gold bullion, and bank accounts. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using checked legal clauses for clear asset split, business continuity, minor child care, and revocation of prior wills.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the paper on standard A4 paper and sign each page in the physical presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Garvi Gujarat Appointment Slot",
            text: "Schedule your filing appointment on the Garvi Gujarat portal for your relevant Rajkot SRO and pay the flat ₹100 filing fee via Cyber Treasury.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Rajkot SRO",
            text: "Visit the SRO office with both witnesses for identity check, digital photograph capture, and biometric thumbprinting to complete Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: RAJKOT_FAQS.map((item) => ({
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
      <RajkotLocationClient faqs={RAJKOT_FAQS} />
      <Footer />
    </>
  );
}
