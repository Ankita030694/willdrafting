import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThiruvananthapuramLocationClient from "./ThiruvananthapuramLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 149 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Thiruvananthapuram: Online Will Guide",
  },
  description:
    "Draft a legally binding Will in Thiruvananthapuram. Expert guidance on PEARLS portal registration, Technopark IT assets, and family wealth succession.",
  keywords: [
    "will drafting in thiruvananthapuram",
    "will registration trivandrum pearls",
    "estate planning technopark",
    "christian succession will trivandrum",
    "property lawyer kerala",
    "trivandrum corporation mutation will",
    "sub registrar office vanchiyoor appointment",
    "will lawyer kowdiar thiruvananthapuram",
    "will drafting sasthamangalam trivandrum",
    "will drafting kazhakoottam technopark",
    "will registration chalai sro",
    "will drafting pattom thiruvananthapuram",
    "is probate mandatory in thiruvananthapuram",
    "kerala pearls portal will booking",
    "section 31 registration act home visit trivandrum",
    "kerala stamp act will exemption",
    "pokkuvaravu thandapper transfer will kerala",
    "ama legal solutions thiruvananthapuram will drafting",
    "doctor fitness certificate will trivandrum",
    "nri will drafting thiruvananthapuram kerala",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/thiruvananthapuram",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/thiruvananthapuram",
      "x-default": "https://www.willdrafting.in/locations/thiruvananthapuram",
    },
  },
  openGraph: {
    title: "Will Drafting in Thiruvananthapuram: Online Will Guide",
    description:
      "Draft a legally binding Will in Thiruvananthapuram. Expert guidance on PEARLS portal registration, Technopark IT assets, and family wealth succession.",
    url: "https://www.willdrafting.in/locations/thiruvananthapuram",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-thiruvananthapuram-og.jpg",
        width: 1024,
        height: 576,
        alt: "Online Will Drafting and Registration Services in Thiruvananthapuram Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Thiruvananthapuram: Online Will Guide",
    description:
      "Draft a legally binding Will in Thiruvananthapuram. Expert guidance on PEARLS portal registration, Technopark IT assets, and family wealth succession.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-thiruvananthapuram-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const THIRUVANANTHAPURAM_FAQS = [
  {
    q: "Is Will registration mandatory in Thiruvananthapuram?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Kerala. A Will written on plain paper is legally valid if signed before two independent witnesses. However, registering your Will at a Thiruvananthapuram Sub-Registrar Office stores it permanently in government Book III records. This prevents future family disputes, stops forged codicils, and accelerates property mutation before the Thiruvananthapuram Municipal Corporation and Revenue Village Offices.",
  },
  {
    q: "Is probate required for a Will in Thiruvananthapuram?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, court probate is mandatory only in the presidency towns of Mumbai, Kolkata, and Chennai. Thiruvananthapuram is a non-presidency city under the Kerala High Court. Probate is entirely optional in Kerala for Hindus, Christians, Sikhs, Jains, and Buddhists. Legal heirs can directly effectuate bank transfers and land mutations without undergoing costly probate petitions.",
  },
  {
    q: "How do Technopark IT professionals structure tech equity and digital assets?",
    a: "Technopark software engineers and startup executives frequently hold complex digital estates including corporate ESOPs, RSUs, US brokerage holdings, crypto assets, and commercial intellectual property. Our specialized Wills integrate dedicated digital executor clauses, international asset declarations, and clear nomination harmonization to avoid multi-jurisdictional inheritance conflicts.",
  },
  {
    q: "How do I book an online appointment on the Kerala PEARLS portal?",
    a: "Appointments are scheduled through the Kerala Registration Department PEARLS portal (keralaregistration.gov.in). You log in, enter testator and witness personal details, upload the Will document draft, pay the nominal government fee via e-Treasury challan, and download your e-token slip for your local Sub-Registrar Office in Vanchiyoor, Pattom, Kazhakoottam, or Chalai.",
  },
  {
    q: "What is the official government fee to register a Will in Thiruvananthapuram?",
    a: "Wills are 100% exempt from stamp duty across Kerala under the Kerala Stamp Act, 1959. You do not pay any percentage-based property duty. At Thiruvananthapuram Sub-Registrar Offices, you pay only a nominal government registration fee of ₹1,000, alongside computer scanning and archiving charges of approximately ₹100 to ₹200.",
  },
  {
    q: "Can senior citizens and retired civil servants in Trivandrum register from home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden pensioners, or individuals with mobility impairments in Kowdiar, Sasthamangalam, Jawahar Nagar, and surrounding localities can request a home visit by the Sub-Registrar. A medical fitness certificate from a registered MBBS doctor and the official government commission fee are required.",
  },
  {
    q: "How does a registered Will help in Trivandrum Municipal Corporation mutation and Pokkuvaravu?",
    a: "A registered Will provides authentic testamentary proof before the Thiruvananthapuram Municipal Corporation (TMC) and local Village Offices. It expedites Pokkuvaravu (revenue title mutation) and transfers the Thandapper account number into the beneficiary's name. This ensures seamless payment of land tax (Kandazhuthu) without lengthy legal heirship inquiries.",
  },
  {
    q: "How does Christian inheritance law apply to Wills in Kerala?",
    a: "In Kerala, Christian succession is governed by the Indian Succession Act, 1925, following the landmark Supreme Court Mary Roy judgment. While intestate succession divides property equally among sons and daughters, Section 59 grants every Christian testator absolute testamentary freedom to bequeath their self-acquired real estate and bank funds to any beneficiary of their choice.",
  },
  {
    q: "Can Non-Resident Malayalis (NRIs) make an online Will for Trivandrum properties?",
    a: "Yes. Non-Resident Keralites living in the UAE, Saudi Arabia, Qatar, Oman, the UK, or the US can draft a legally compliant Indian Will online. Under Section 63 of the Indian Succession Act, the Will can be signed abroad before two witnesses. Registration can be completed at the local Trivandrum SRO during your next annual holiday or visit.",
  },
  {
    q: "Do I need a doctor's mental fitness certificate to register a Will in Trivandrum?",
    a: "While not statutory for younger individuals, a medical capacity certificate from a registered MBBS practitioner is strongly recommended for testators aged 60 and above. The doctor certifies that the testator is of sound mind, memory, and understanding, effectively nullifying future legal claims of dementia, illness, or undue influence.",
  },
];

export default function ThiruvananthapuramLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/thiruvananthapuram";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-thiruvananthapuram.jpg";

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
        name: "Will Drafting in Thiruvananthapuram: Online Will Guide",
        description:
          "Draft a legally binding Will in Thiruvananthapuram. Expert guidance on PEARLS portal registration, Technopark IT assets, and family wealth succession.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1024,
          height: 576,
          caption: "Online Will Drafting and Registration Services in Thiruvananthapuram Kerala",
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
            name: "Thiruvananthapuram",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Thiruvananthapuram - Legal Estate Planning & PEARLS Registration",
        description:
          "Professional Will drafting, advocate verification, Kerala PEARLS registration, Technopark digital asset planning, and doorstep execution support across Thiruvananthapuram.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Thiruvananthapuram",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Thiruvananthapuram" },
          { "@type": "City", name: "Kowdiar" },
          { "@type": "City", name: "Sasthamangalam" },
          { "@type": "City", name: "Kazhakoottam" },
          { "@type": "City", name: "Technopark" },
          { "@type": "City", name: "Pattom" },
          { "@type": "City", name: "Vanchiyoor" },
          { "@type": "City", name: "Chalai" },
          { "@type": "City", name: "East Fort" },
          { "@type": "City", name: "Jawahar Nagar" },
          { "@type": "City", name: "Vellayambalam" },
          { "@type": "City", name: "Medical College" },
          { "@type": "City", name: "Kesavadasapuram" },
          { "@type": "City", name: "Pangode" },
          { "@type": "City", name: "Karamana" },
          { "@type": "City", name: "Nemom" },
          { "@type": "City", name: "Thiruvallam" },
          { "@type": "City", name: "Kovalam" },
          { "@type": "City", name: "Sreekariyam" },
          { "@type": "City", name: "Attingal" },
          { "@type": "City", name: "Nedumangad" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Thiruvananthapuram Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Trivandrum Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Kerala High Court Advocate Will Consultation",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Trivandrum SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Thiruvananthapuram",
        description:
          "Five clear steps to create a legally binding Will and register it through the Kerala PEARLS portal in Thiruvananthapuram.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Catalog Assets, Tech Portfolios & Heirs",
            text: "List your Thiruvananthapuram properties including TMC flats, land plots, Technopark stock equity, demat accounts, and bank deposits. Name beneficiaries and a trusted executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Will Clauses",
            text: "Draft your Will using our online legal platform or with a senior Kerala estate lawyer to include specific bequests, survivorship clauses, and digital asset instructions.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Sign Before Two Independent Witnesses",
            text: "Print the Will on plain A4 sheets and execute each page in the physical presence of two independent adult witnesses who do not inherit under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book PEARLS Token Online",
            text: "Generate an online registration token on the Kerala Registration PEARLS portal (keralaregistration.gov.in) for your local SRO and pay the nominal ₹1,000 fee via e-Challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric SRO Registration",
            text: "Visit the designated Thiruvananthapuram Sub-Registrar Office with your two witnesses and original Aadhaar cards for biometric thumbprints, digital photos, and Book III archiving.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: THIRUVANANTHAPURAM_FAQS.map((item) => ({
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
      <ThiruvananthapuramLocationClient faqs={THIRUVANANTHAPURAM_FAQS} />
      <Footer />
    </>
  );
}
