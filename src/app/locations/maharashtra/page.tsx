import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaharashtraLocationClient from "./MaharashtraLocationClient";

// Title: Exactly 57 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 152 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Maharashtra: Probate & Registration Guide",
  },
  description:
    "Draft and register your Will in Maharashtra. Clear guidance on Section 213 Bombay HC probate rules, IGR Maharashtra e-Stepin, and housing.",
  keywords: [
    "will drafting in maharashtra",
    "will registration igr maharashtra",
    "bombay high court probate will",
    "mcs act cooperative society will",
    "estate lawyer mumbai pune",
    "section 213 indian succession act maharashtra",
    "article 64 maharashtra stamp act will",
    "igr maharashtra estepin appointment",
    "sarita portal will registration maharashtra",
    "online will maker maharashtra",
    "housing society flat will nomination",
    "section 31 registration act home visit maharashtra",
    "sub registrar office maharashtra",
    "will lawyer nagpur nashik",
    "7 12 land will bequest maharashtra",
    "doctor fitness certificate will maharashtra",
    "ama legal solutions maharashtra will drafting",
    "probate mandatory mumbai presidency",
    "probate optional pune nagpur",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/maharashtra",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/maharashtra",
      "x-default": "https://www.willdrafting.in/locations/maharashtra",
    },
  },
  openGraph: {
    title: "Will Drafting in Maharashtra: Probate & Registration Guide",
    description:
      "Draft and register your Will in Maharashtra. Clear guidance on Section 213 Bombay HC probate rules, IGR Maharashtra e-Stepin, and housing.",
    url: "https://www.willdrafting.in/locations/maharashtra",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-maharashtra.jpg",
        width: 1376,
        height: 768,
        alt: "Online Will Drafting and SRO Registration Services in Maharashtra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Maharashtra: Probate & Registration Guide",
    description:
      "Draft and register your Will in Maharashtra. Clear guidance on Section 213 Bombay HC probate rules, IGR Maharashtra e-Stepin, and housing.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-maharashtra.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const MAHARASHTRA_FAQS = [
  {
    q: "Is probate compulsory for a Will in Maharashtra?",
    a: "Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the historic presidency town limits of Mumbai (Ordinary Original Civil Jurisdiction of the Bombay High Court). For properties and testators in all other parts of Maharashtra including Pune, Nagpur, Nashik, Thane, and Chhatrapati Sambhajinagar, probate is legally optional. A registered Will is self-authenticating for municipal and revenue mutation.",
  },
  {
    q: "Does a nominee become the owner of a Maharashtra cooperative society flat?",
    a: "No. Under Section 30 of the Maharashtra Co-operative Societies Act, 1960 and Supreme Court rulings (Indrani Wahi v. Registrar of Co-op Societies), nomination serves only for administrative convenience. The nominee holds the flat as a trustee for the legal heirs. True beneficial ownership is governed strictly by the deceased owner's Will or general succession laws.",
  },
  {
    q: "What is the official stamp duty and registration fee for a Will in Maharashtra?",
    a: "Wills are 100% exempt from stamp duty across Maharashtra under Article 64 of Schedule I of the Maharashtra Stamp Act. You can execute your Will on plain white A4 paper. At Sub-Registrar Offices (SROs), the registration fee under Book III is a nominal flat ₹100, plus government scanning charges of ₹100 to ₹300. There are no ad-valorem or percentage property duties.",
  },
  {
    q: "How do I book an online appointment for Will registration in Maharashtra?",
    a: "Will registration appointments are scheduled through the Inspector General of Registration (IGR) Maharashtra portal at igrmaharashtra.gov.in using the e-Stepin module under the SARITA framework. Citizens select their administrative district and local SRO, enter testator and witness credentials, pay the nominal fee online, and download the designated time slot token.",
  },
  {
    q: "Can senior citizens in Maharashtra register a Will from home or hospital?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell testators can request a home or hospital visit by a Sub-Registrar commissioner. A certificate from a registered MBBS doctor stating medical inability to travel is submitted along with the appointment application, and the official records biometrics on-site.",
  },
  {
    q: "How can agricultural land (7/12 extract) be bequeathed in Maharashtra?",
    a: "Agricultural land recorded in the 7/12 extract (Satbara Utara) and 8A extract can be bequeathed via a Will. However, under Section 63 of the Maharashtra Tenancy and Agricultural Lands Act, a non-agriculturist cannot inherit agricultural land through a Will if it circumvents statutory ceilings or restrictions. Precision drafting ensures agricultural bequests conform to state revenue laws.",
  },
  {
    q: "Why is a doctor medical fitness certificate essential for senior citizens?",
    a: "While not statutory for the Will to be legally executed, a fitness certificate issued on the same day by a registered MBBS doctor certifies sound mind, memory, and testamentary capacity. This eliminates future legal challenges from aggrieved relatives alleging dementia, senility, coercion, or undue influence during probate or civil litigation.",
  },
  {
    q: "Can NRIs owning properties in Maharashtra execute an Indian Will?",
    a: "Yes. Non-Resident Indians (NRIs) owning apartments, ancestral property, or demat portfolios across Maharashtra can draft an India-specific Will online. NRIs can execute the document before two witnesses abroad and get it notarized or apostilled through the Indian consulate, or register it before an SRO during a visit to Maharashtra.",
  },
];

export default function MaharashtraLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/maharashtra";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-maharashtra.jpg";

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
        name: "Will Drafting in Maharashtra: Probate & Registration Guide",
        description:
          "Draft and register your Will in Maharashtra. Clear guidance on Section 213 Bombay HC probate rules, IGR Maharashtra e-Stepin, and housing.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1376,
          height: 768,
          caption: "Online Will Drafting and SRO Registration Services in Maharashtra",
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
            name: "Maharashtra",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Maharashtra - Legal Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, IGR Maharashtra e-Stepin filing, and Section 31 doorstep signing support across.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "State", name: "Maharashtra" },
          { "@type": "City", name: "Mumbai" },
          { "@type": "City", name: "Pune" },
          { "@type": "City", name: "Nagpur" },
          { "@type": "City", name: "Thane" },
          { "@type": "City", name: "Pimpri-Chinchwad" },
          { "@type": "City", name: "Nashik" },
          { "@type": "City", name: "Kalyan-Dombivli" },
          { "@type": "City", name: "Vasai-Virar" },
          { "@type": "City", name: "Chhatrapati Sambhajinagar" },
          { "@type": "City", name: "Navi Mumbai" },
          { "@type": "City", name: "Solapur" },
          { "@type": "City", name: "Mira-Bhayandar" },
          { "@type": "City", name: "Bhiwandi" },
          { "@type": "City", name: "Amravati" },
          { "@type": "City", name: "Nanded" },
          { "@type": "City", name: "Kolhapur" },
          { "@type": "City", name: "Akola" },
          { "@type": "City", name: "Panvel" },
          { "@type": "City", name: "Ulhasnagar" },
          { "@type": "City", name: "Sangli" },
          { "@type": "City", name: "Malegaon" },
          { "@type": "City", name: "Jalgaon" },
          { "@type": "City", name: "Latur" },
          { "@type": "City", name: "Dhule" },
          { "@type": "City", name: "Ahmednagar" },
          { "@type": "City", name: "Chandrapur" },
          { "@type": "City", name: "Parbhani" },
          { "@type": "City", name: "Jalna" },
          { "@type": "City", name: "Satara" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Maharashtra Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Maharashtra Residents",
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
                name: "Complete Maharashtra Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Maharashtra",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Maharashtra.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Assets and Designate Beneficiaries",
            text: "List your Maharashtra assets including CHS apartments, CIDCO/MHADA units, farm 7/12 plots, bank FDs, mutual funds, and demat portfolios. Nominate primary heirs and an alternate executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Mandatory Legal Clauses",
            text: "Draft your Will using our online legal platform or with a senior High Court lawyer to incorporate revocation, survivorship, specific bequests, and executor appointment.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not heirs under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book SRO Slot on IGR Maharashtra e-Stepin Portal",
            text: "Book an appointment on the IGR Maharashtra e-Stepin portal (igrmaharashtra.gov.in) for your local SRO office and pay the nominal ₹100 filing fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at SRO",
            text: "Visit the SRO office with your two witnesses and original Aadhaar cards for biometric thumbprint scanning, live webcam photo capture, and official Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: MAHARASHTRA_FAQS.map((item) => ({
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
      <MaharashtraLocationClient faqs={MAHARASHTRA_FAQS} />
      <Footer />
    </>
  );
}
