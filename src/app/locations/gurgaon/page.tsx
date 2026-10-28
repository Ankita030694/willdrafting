import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GurgaonLocationClient from "./GurgaonLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 148 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Gurgaon: Online Will Services in NCR",
  },
  description:
    "Protect family property in Gurgaon. Expert online Will drafting, HSVP floor transfer advice, and Sub-Registrar registration guidance in Gurugram.",
  keywords: [
    "will drafting in gurgaon",
    "will registration gurugram tehsil",
    "hsvp plot will succession gurgaon",
    "will lawyer gurgaon dlf",
    "estate planning gurgaon",
    "sub registrar wazirabad gurgaon",
    "sub registrar badshahpur gurugram",
    "sub registrar manesar gurgaon",
    "jamabandi haryana will registration",
    "is probate mandatory in haryana",
    "punjab and haryana high court will probate",
    "builder floor succession gurgaon",
    "hsvp floor transfer rules after death",
    "will drafting dlf phase 5",
    "will drafting golf course road",
    "will drafting sohna road",
    "will drafting dwarka expressway",
    "will drafting sushant lok",
    "section 31 registration act home visit gurgaon",
    "will registration fees in haryana",
    "ama legal solutions gurgaon will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/gurgaon",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/gurgaon",
      "x-default": "https://www.willdrafting.in/locations/gurgaon",
    },
  },
  openGraph: {
    title: "Will Drafting in Gurgaon: Online Will Services in NCR",
    description:
      "Protect family property in Gurgaon. Expert online Will drafting, HSVP floor transfer advice, and Sub-Registrar registration guidance in Gurugram.",
    url: "https://www.willdrafting.in/locations/gurgaon",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-gurgaon-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Registration Services in Gurgaon NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Gurgaon: Online Will Services in NCR",
    description:
      "Protect family property in Gurgaon. Expert online Will drafting, HSVP floor transfer advice, and Sub-Registrar registration guidance in Gurugram.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-gurgaon-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const GURGAON_FAQS = [
  {
    q: "Is Will registration mandatory in Gurgaon and Haryana?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Haryana. An unregistered Will signed on plain white paper before two independent witnesses is legally binding. However, for HSVP plots, builder floors, and DLF luxury apartments in Gurgaon, government departments and housing societies strongly insist on a registered Will to carry out direct title mutation without demanding newspaper advertisements or high-value indemnity bonds.",
  },
  {
    q: "How does a registered Will help in transferring an HSVP plot or builder floor?",
    a: "Haryana Shehri Vikas Pradhikaran (HSVP, formerly HUDA) governs residential plots and independent floors across Gurgaon sectors. In the event of an unregistered Will, HSVP procedures require obtaining affidavits from all Class I legal heirs, publishing newspaper advertisements, and submitting indemnity bonds. A registered Will drastically simplifies this, allowing the HSVP Estate Officer (EO-I or EO-II) to sanction direct re-allotment and title transfer to the named beneficiary.",
  },
  {
    q: "Is court probate required for a Will in Gurgaon?",
    a: "No. Under Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, probate is mandatory only for properties located within the historical presidency towns of Mumbai, Kolkata, and Chennai. Haryana is a non-presidency state. The Hon'ble Punjab & Haryana High Court in landmark rulings (including Ram Chand v. Raghbir Singh and Kanta v. State of Haryana) has established that probate is not compulsory in Haryana for Hindu, Sikh, Jain, or Buddhist Wills.",
  },
  {
    q: "What is the official government fee to register a Will in Gurgaon on Jamabandi?",
    a: "Wills are completely exempt from stamp duty across Haryana under the Indian Stamp Act, 1899. On the Haryana Jamabandi portal (jamabandi.nic.in), you pay only a nominal government registration fee of ₹100, alongside official HALRIS scanning and computerized token processing charges of ₹100 to ₹200. There are no percentage-based property taxes or transfer stamp duties for registering a Will.",
  },
  {
    q: "How do I book an e-token slot for Will registration on the Haryana Jamabandi portal?",
    a: "Visit the official Haryana land records portal at jamabandi.nic.in. Under the Deed Registration Appointment section, select District Gurugram and choose your Tehsil or Sub-Tehsil (Gurgaon Sadar, Wazirabad, Badshahpur, Manesar, or Kadipur). Enter testator and witness Aadhaar details, book your preferred date and time slot, and print your HALRIS appointment slip for Tehsil entry.",
  },
  {
    q: "Can a Gurugram Sub-Registrar visit an elderly testator at home for registration?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or medically infirm testators residing across Gurgaon condominiums and villas can request a home visit by the Sub-Registrar. You must submit an MBBS doctor medical fitness certificate along with a formal commission petition and pay the official government commission charge. Our Gurgaon legal team assists with complete home visit filing.",
  },
  {
    q: "How do I bequeath independent builder floors with roof rights in Gurgaon?",
    a: "Haryana permits separate registration of independent floors on HSVP and licensed colony plots. When drafting a Will for a builder floor, you must clearly specify the exact floor level, percentage of undivided impartible rights in the land, exclusive roof or terrace rights, and designated stilt parking bays. Specifying these details prevents bitter multi-floor disputes among occupants.",
  },
  {
    q: "What happens if my condominium on Dwarka Expressway has pending builder registry?",
    a: "If the developer has not yet executed the final conveyance deed and you hold a Builder-Buyer Agreement (BBA) with an allotment letter, you can still legally bequeath those contractual and beneficial rights in your Will. Your Will should reference the apartment number, tower, developer name, and allotment dates. The designated beneficiary will step into your shoes before the developer and DTCP Haryana.",
  },
  {
    q: "Who can attest a Will as a witness in Gurgaon, and can an NRI execute a Will for Gurgaon assets?",
    a: "A Will must be attested by at least two adult witnesses (aged 18+) of sound mind. Beneficiaries and their spouses must never sign as witnesses under Section 67 of the Indian Succession Act. NRIs owning properties in DLF, Nirvana Country, or Golf Course Road can draft their Will online and sign it abroad before two witnesses, or complete biometric Tehsil registration during an India visit.",
  },
  {
    q: "What is the difference between a nominee in a Gurgaon housing society and a Will beneficiary?",
    a: "Under the Haryana Apartment Ownership Act, 1983 and settled Supreme Court law, a nominee is merely a temporary trustee holding the flat until legal succession is established. A nominee does not become the owner. The rightful beneficiary designated in your Will takes complete legal ownership and title of the apartment, superseding any society nomination.",
  },
];

export default function GurgaonLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/gurgaon";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-gurgaon-og.jpg";

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
        name: "Will Drafting in Gurgaon: Online Will Services in NCR",
        description:
          "Protect family asset in Gurgaon. Expert online Will drafting, HSVP floor transfer advice, and SRO filing guidance in Gurugram.",
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
          caption: "Will Drafting & Registration Services in Gurgaon NCR",
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
            name: "Gurgaon NCR",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Gurgaon - Estate Planning & HSVP Succession",
        description:
          "Professional Will drafting, lawyer check, and SRO office e-token filing support across Gurgaon, Wazirabad, Badshahpur.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Gurgaon" },
          { "@type": "City", name: "Gurugram" },
          { "@type": "City", name: "DLF Phase 1" },
          { "@type": "City", name: "DLF Phase 2" },
          { "@type": "City", name: "DLF Phase 4" },
          { "@type": "City", name: "DLF Phase 5" },
          { "@type": "City", name: "Golf Course Road" },
          { "@type": "City", name: "Golf Course Extension Road" },
          { "@type": "City", name: "Sohna Road" },
          { "@type": "City", name: "Dwarka Expressway" },
          { "@type": "City", name: "Sushant Lok" },
          { "@type": "City", name: "Nirvana Country" },
          { "@type": "City", name: "Manesar" },
          { "@type": "City", name: "Palam Vihar" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Gurgaon Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Gurgaon Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & HSVP Floor Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Gurugram Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Gurgaon NCR",
        description:
          "Five clear steps to create a legally binding Will and register it before the Gurugram SRO in Haryana.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Assets and HSVP Properties",
            text: "Compile your Gurgaon asset details including HSVP allotment letters, builder floor conveyance deeds, bank accounts, and mutual funds. Name your heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Gurgaon Specific Clauses",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to include HSVP floor transfer terms, terrace/roof rights demarcation, and revocation clauses.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not heirs in the paper.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Gurugram SRO Appointment on Jamabandi Portal",
            text: "Book an e-token slot on jamabandi.nic.in for your relevant Tehsil (Gurgaon Sadar, Wazirabad, Badshahpur, or Manesar) and pay the nominal ₹100 filing fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the Tehsil office with your two witnesses and original IDs for biometric fingerprinting, digital photo capture, and official Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: GURGAON_FAQS.map((item) => ({
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
      <GurgaonLocationClient faqs={GURGAON_FAQS} />
      <Footer />
    </>
  );
}
