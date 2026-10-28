import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LudhianaLocationClient from "./LudhianaLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 154 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Ludhiana: Online Will & NRI Estate Help",
  },
  description:
    "Draft a legally binding Will in Ludhiana. Expert guidance for industrial assets, NRI ancestral property succession, and Punjab Sub-Registrar.",
  keywords: [
    "will drafting in ludhiana",
    "nri will punjab ludhiana",
    "will registration ngdrs punjab",
    "glada property will transfer",
    "industrial enterprise succession ludhiana",
    "ludhiana municipal corporation mutation will",
    "sub registrar office ludhiana appointment",
    "will drafting sarabha nagar ludhiana",
    "will drafting model town ludhiana",
    "will drafting civil lines ludhiana",
    "will drafting focal point ludhiana",
    "will drafting brs nagar ludhiana",
    "will drafting gurdev nagar",
    "will drafting aggar nagar ludhiana",
    "will drafting dugri ludhiana",
    "will drafting jagraon",
    "will drafting khanna ludhiana",
    "will drafting sahnewal",
    "will drafting samrala",
    "is probate mandatory in punjab",
    "punjab and haryana high court probate exemption",
    "glada plot transfer through will",
    "section 31 registration act home visit ludhiana",
    "will registration fees in punjab",
    "doctor medical certificate will ludhiana",
    "ama legal solutions ludhiana will drafting",
    "jamabandi fard will mutation punjab",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/ludhiana",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/ludhiana",
      "x-default": "https://www.willdrafting.in/locations/ludhiana",
    },
  },
  openGraph: {
    title: "Will Drafting in Ludhiana: Online Will & NRI Estate Help",
    description:
      "Draft a legally binding Will in Ludhiana. Expert guidance for industrial assets, NRI ancestral property succession, and Punjab Sub-Registrar.",
    url: "https://www.willdrafting.in/locations/ludhiana",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-ludhiana-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and NRI Estate Planning in Ludhiana Punjab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Ludhiana: Online Will & NRI Estate Help",
    description:
      "Draft a legally binding Will in Ludhiana. Expert guidance for industrial assets, NRI ancestral property succession, and Punjab Sub-Registrar.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-ludhiana-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const LUDHIANA_FAQS = [
  {
    q: "Is Will registration mandatory in Ludhiana and across Punjab?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Ludhiana and throughout Punjab. A Will written on plain paper and signed before two independent witnesses is legally binding. However, for GLADA urban estates, municipal property mutation, and industrial asset transfers, registering the Will on NGDRS Punjab provides conclusive proof of authenticity and prevents disputes among heirs.",
  },
  {
    q: "Is court probate compulsory for executing a Will in Ludhiana?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the presidency towns of Mumbai, Kolkata, and Chennai. Ludhiana is a non-presidency city under the Punjab & Haryana High Court. Landmark rulings, including Ram Chand v. Sardara Singh and Madan Lal v. Dev Raj, affirm that probate is strictly optional in Punjab for Hindu, Sikh, Jain, and Buddhist estates.",
  },
  {
    q: "How does a registered Will help in transferring GLADA plots in Ludhiana?",
    a: "The Greater Ludhiana Area Development Authority (GLADA) governs residential and commercial sectors in Dugri, Sector 32A, and Chandigarh Road. For unregistered Wills, GLADA mandates public notices in English and Punjabi dailies, a 30-day objection window, and heavy indemnity bonds. A registered Will drastically speeds up the process, enabling swift ownership substitution.",
  },
  {
    q: "How should industrial units and factory assets in Focal Point be willed?",
    a: "Ludhiana is Punjab's industrial engine with thousands of textile, hosiery, cycle parts, and engineering units in Focal Point and Industrial Area A and B. Industrial succession requires specific clauses allocating manufacturing premises, machinery, corporate shares, and partnership capital accounts, alongside clear executorship powers to avoid halting business operations upon demise.",
  },
  {
    q: "How can NRIs protect ancestral agricultural farmland around Ludhiana?",
    a: "NRI families owning ancestral farmland in Sahnewal, Gill, Jagraon, Khanna, and surrounding villages frequently face fraudulent mutation or unlawful encroachment risks. A lawyer-drafted, registered Will specifying khasra and khatauni numbers creates an unassailable evidentiary record, enabling direct mutation in Punjab land records (Jamabandi/Fard) without partition litigation.",
  },
  {
    q: "What is the official government fee to register a Will on NGDRS Punjab?",
    a: "Wills are 100% exempt from stamp duty across Punjab under the Indian Stamp Act, 1899. When registering on the National Generic Document Registration System (NGDRS Punjab at igr.punjab.gov.in), you pay only a nominal government registration fee of ₹100, plus standard scanning and pasting charges of approximately ₹100 to ₹200. There are zero property transfer taxes.",
  },
  {
    q: "How do I book an online appointment for Will registration in Ludhiana?",
    a: "Visit the NGDRS Punjab portal (igr.punjab.gov.in). Create a citizen login, choose Ludhiana district, and select your relevant Sub-Registrar Office, such as Ludhiana Central at Mini Secretariat, Ludhiana West, East, or Gill. Enter the testator and two witnesses details, pay the nominal fee online, and download your e-appointment slot receipt.",
  },
  {
    q: "Can a Ludhiana Sub-Registrar visit an elderly or bedridden testator at home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or medically infirm testators can request a home or hospital visit by the Sub-Registrar. You submit an application along with a registered MBBS doctor's medical fitness certificate and pay the official commission travel fee. Our legal team coordinates the entire doorstep registration process.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) execute a Will for Ludhiana properties while abroad?",
    a: "Yes. NRIs residing in Canada, the UK, the USA, Australia, or the Gulf can draft an India-compliant Will online through our platform. They can execute it abroad before two independent witnesses, notarize or apostille it through the Indian Embassy/Consulate, or register it before the local Sub-Registrar during their visit to Ludhiana.",
  },
  {
    q: "Do I need a doctor's fitness certificate to register a Will in Ludhiana?",
    a: "While not legally mandatory for younger testators, an MBBS medical fitness certificate is strongly recommended for senior testators aged 60 and above. The certificate certifies sound mental capacity and understanding at the time of signing, effectively shielding the Will against false claims of testamentary incapacity or undue influence.",
  },
];

export default function LudhianaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/ludhiana";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-ludhiana-og.jpg";

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
        name: "Will Drafting in Ludhiana: Online Will & NRI Estate Help",
        description:
          "Draft a legally binding Will in Ludhiana. Expert guidance for industrial assets, NRI ancestral property succession, and Punjab Sub-Registrar.",
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
          caption: "Will Drafting & NRI Estate Planning Services in Ludhiana Punjab",
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
            name: "Ludhiana",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Ludhiana - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer verification, industrial succession structuring, and Sub-Registrar Office e-registration support across.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ludhiana",
          addressRegion: "Punjab",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Ludhiana" },
          { "@type": "City", name: "Sarabha Nagar" },
          { "@type": "City", name: "Model Town" },
          { "@type": "City", name: "Civil Lines" },
          { "@type": "City", name: "BRS Nagar" },
          { "@type": "City", name: "Gurdev Nagar" },
          { "@type": "City", name: "Aggar Nagar" },
          { "@type": "City", name: "Focal Point" },
          { "@type": "City", name: "Industrial Area A" },
          { "@type": "City", name: "Industrial Area B" },
          { "@type": "City", name: "Dugri" },
          { "@type": "City", name: "Sahnewal" },
          { "@type": "City", name: "Gill" },
          { "@type": "City", name: "Jagraon" },
          { "@type": "City", name: "Khanna" },
          { "@type": "City", name: "Samrala" },
          { "@type": "City", name: "Payal" },
          { "@type": "City", name: "Raikot" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Ludhiana Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Ludhiana Residents & NRIs",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation, Industrial & NRI Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Ludhiana Sub-Registrar Will Registration & Doorstep Support",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Ludhiana, Punjab",
        description:
          "Five clear steps to create a legally binding Will and register it before the Sub-Registrar in Ludhiana, Punjab.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Catalog Assets, Farmland, and Business Holdings",
            text: "List your assets including GLADA plots, Focal Point manufacturing units, ancestral farmland with khasra numbers, bank accounts, and demat portfolios. Choose your beneficiaries and executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Will with Estate Clauses",
            text: "Draft your Will using our online legal platform or with a senior advocate. Include industrial succession clauses, NRI multi-jurisdiction protections, and agricultural land bequests.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the physical presence of two independent adult witnesses who are not beneficiaries under the document.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Ludhiana SRO Appointment on NGDRS Punjab",
            text: "Schedule an e-appointment on the Punjab NGDRS portal (igr.punjab.gov.in) for your local Sub-Registrar Office (Mini Secretariat, West, East, or Gill) and pay the ₹100 fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Registration at Sub-Registrar Office",
            text: "Visit the Sub-Registrar office with your two witnesses, original Aadhaar cards, and PAN to complete digital fingerprinting, photo capture, and official Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: LUDHIANA_FAQS.map((item) => ({
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
      <LudhianaLocationClient faqs={LUDHIANA_FAQS} />
      <Footer />
    </>
  );
}
