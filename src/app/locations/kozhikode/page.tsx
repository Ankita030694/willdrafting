import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KozhikodeLocationClient from "./KozhikodeLocationClient";

// Title: Exactly 51 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 153 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Kozhikode: Online Will & NRI Guide",
  },
  description:
    "Secure your family assets in Kozhikode. Comprehensive guidance for Gulf NRI property owners, PEARLS portal registration, and lawful estate.",
  keywords: [
    "will drafting in kozhikode",
    "nri will calicut kerala",
    "will registration kozhikode pearls",
    "malabar property succession will",
    "estate advocate calicut",
    "kozhikode corporation land mutation will",
    "sub registrar office civil station calicut",
    "will lawyer calicut beach",
    "will drafting mavoor road kozhikode",
    "will drafting nadakkavu calicut",
    "will registration feroke sro",
    "will drafting chevayur kozhikode",
    "is probate mandatory in kozhikode",
    "kerala pearls portal will booking calicut",
    "section 31 registration act home visit kozhikode",
    "kerala stamp act will exemption calicut",
    "pokkuvaravu thandapper transfer will kozhikode",
    "ama legal solutions kozhikode will drafting",
    "doctor fitness certificate will calicut",
    "gulf nri succession planning kerala calicut",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/kozhikode",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/kozhikode",
      "x-default": "https://www.willdrafting.in/locations/kozhikode",
    },
  },
  openGraph: {
    title: "Will Drafting in Kozhikode: Online Will & NRI Guide",
    description:
      "Secure your family assets in Kozhikode. Comprehensive guidance for Gulf NRI property owners, PEARLS portal registration, and lawful estate.",
    url: "https://www.willdrafting.in/locations/kozhikode",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-kozhikode-og.jpg",
        width: 1024,
        height: 576,
        alt: "Online Will Drafting and NRI Succession Planning in Kozhikode Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Kozhikode: Online Will & NRI Guide",
    description:
      "Secure your family assets in Kozhikode. Comprehensive guidance for Gulf NRI property owners, PEARLS portal registration, and lawful estate.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-kozhikode-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const KOZHIKODE_FAQS = [
  {
    q: "Is Will registration mandatory in Kozhikode?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Kerala. A Will drafted on plain white paper is legally valid if signed before two independent witnesses. However, registering your Will at a Kozhikode Sub-Registrar Office archives it permanently in government Book III records. This prevents future inheritance disputes, nullifies claims of forged codicils, and accelerates land mutation before the Kozhikode Municipal Corporation and Village Revenue Offices.",
  },
  {
    q: "Is court probate compulsory for family properties in Kozhikode?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, court probate is compulsory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Kozhikode is a non-presidency jurisdiction under the Kerala High Court. Probate is strictly optional in Kerala for Hindus, Christians, Sikhs, Jains, and Buddhists. Legal heirs can directly effectuate bank account transfers and land title mutations without undergoing costly court probate petitions.",
  },
  {
    q: "How do Gulf NRIs execute a Will for Kozhikode and UAE properties?",
    a: "Non-Resident Malayalis residing across the UAE, Qatar, Saudi Arabia, Oman, Bahrain, and Kuwait can draft an Indian Will online for their Kozhikode properties. Under Section 63 of the Indian Succession Act, the Will can be signed abroad before two witnesses. Alternatively, Gulf NRIs can complete registration at their local Kozhikode SRO during their annual vacation. We also advise a separate jurisdictional Will for UAE or GCC mainland bank holdings to ensure swift cross-border estate succession.",
  },
  {
    q: "How do I book an online Will registration slot on the Kerala PEARLS portal?",
    a: "Appointments are scheduled online via the Kerala Registration Department PEARLS portal (keralaregistration.gov.in). You log in, enter testator and witness personal details, upload the Will document draft, pay the nominal government fee via e-Treasury challan, and download your e-token slip. On the selected date, you present the token at your designated Kozhikode SRO in Civil Station, Calicut Beach, Chevayur, or Feroke for biometric verification.",
  },
  {
    q: "What is the official government fee to register a Will in Kozhikode?",
    a: "Wills are 100% exempt from stamp duty across Kerala under the Kerala Stamp Act, 1959. You do not pay any percentage-based property duty regardless of the estate's financial value. At Kozhikode Sub-Registrar Offices, you pay only a nominal government registration fee of ₹1,000, along with computer scanning and digital archiving charges of approximately ₹100 to ₹200.",
  },
  {
    q: "Can elderly or bedridden citizens in Nadakkavu or Mavoor Road register from home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden pensioners, or individuals with mobility challenges in Nadakkavu, Mavoor Road, Chevayur, and surrounding Calicut localities can request a home visit by the Sub-Registrar. A medical fitness certificate from a registered MBBS doctor and the official government commission fee are required for doorstep execution.",
  },
  {
    q: "How does a registered Will help in Kozhikode Corporation land mutation (Pokkuvaravu)?",
    a: "A registered Will provides unquestionable testamentary proof before the Kozhikode Municipal Corporation (KMC) and local Village Revenue Offices. It expedites Pokkuvaravu (revenue title mutation) and transfers the Thandapper account number into the beneficiary's name. This ensures prompt, unhindered payment of land tax (Kandazhuthu) without protracted legal heirship verifications.",
  },
  {
    q: "How are Malabar commercial businesses and joint trading firms bequeathed in a Will?",
    a: "Kozhikode has a rich heritage of family trading firms, commercial wholesale enterprises on Big Bazaar (Valiyangadi), and partnership ventures. A customized Will specifies the exact transmission of commercial partnership shares, trading capital, business premises, and intellectual goodwill. This prevents dissolution stalemates and safeguards generational family commerce.",
  },
  {
    q: "Do Kozhikode Sub-Registrars require a doctor's mental fitness certificate for seniors?",
    a: "While not mandatory for young testators, a medical capacity certificate issued by an MBBS doctor is strongly advised for testators aged 60 and above. The doctor attests that the testator is of sound mind, memory, and understanding. This eliminates future courtroom allegations of testamentary incapacity, dementia, or undue influence by dissatisfied relatives.",
  },
  {
    q: "What happens if a Calicut resident dies without leaving a valid Will?",
    a: "If a person passes away intestate (without a Will), their estate is distributed according to statutory personal succession laws (the Hindu Succession Act, Indian Succession Act for Christians, or Shariat laws for Muslims). This division is rigid and often divides ancestral homes and commercial plots among distant relatives, sparking decades-long partition disputes.",
  },
];

export default function KozhikodeLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/kozhikode";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-kozhikode.jpg";

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
        name: "Will Drafting in Kozhikode: Online Will & NRI Guide",
        description:
          "Secure your family assets in Kozhikode. Comprehensive guidance for Gulf NRI property owners, PEARLS portal registration, and lawful estate.",
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
          caption: "Online Will Drafting and NRI Succession Planning in Kozhikode Kerala",
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
            name: "Kozhikode",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Kozhikode - Legal Estate Planning & PEARLS Registration",
        description:
          "Professional Will drafting, advocate verification, Kerala PEARLS registration, Gulf NRI asset planning, and doorstep execution support across.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kozhikode",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Kozhikode" },
          { "@type": "City", name: "Calicut Beach" },
          { "@type": "City", name: "Mavoor Road" },
          { "@type": "City", name: "Nadakkavu" },
          { "@type": "City", name: "Chevayur" },
          { "@type": "City", name: "Civil Station" },
          { "@type": "City", name: "Palayam" },
          { "@type": "City", name: "SM Street" },
          { "@type": "City", name: "Feroke" },
          { "@type": "City", name: "Elathur" },
          { "@type": "City", name: "Kunnamangalam" },
          { "@type": "City", name: "Beypore" },
          { "@type": "City", name: "Puthiyara" },
          { "@type": "City", name: "Pottammal" },
          { "@type": "City", name: "Kottooli" },
          { "@type": "City", name: "Karaparamba" },
          { "@type": "City", name: "West Hill" },
          { "@type": "City", name: "Bilathikulam" },
          { "@type": "City", name: "Ramanattukara" },
          { "@type": "City", name: "Pantheerankavu" },
          { "@type": "City", name: "Koyilandy" },
          { "@type": "City", name: "Vadakara" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Kozhikode Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Kozhikode Residents",
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
                name: "Complete Kozhikode SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Kozhikode",
        description:
          "Five clear steps to create a legally binding Will and register it through the Kerala PEARLS portal in Kozhikode.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Catalog Assets, Gulf Portfolios & Heirs",
            text: "List your Kozhikode properties including Corporation land, flats, commercial trading assets, Gulf NRI bank accounts, and demat holdings. Name beneficiaries and a trusted executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Will Clauses",
            text: "Draft your Will using our online legal platform or consult with a senior Kerala estate advocate to craft specific bequests, survivorship clauses, and cross-border provisions.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Sign Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the physical presence of two independent adult witnesses who do not inherit any assets under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book PEARLS Token Online",
            text: "Schedule an online registration token on the Kerala Registration PEARLS portal (keralaregistration.gov.in) for your local Kozhikode SRO and pay the nominal ₹1,000 fee via e-Challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric SRO Registration",
            text: "Visit the designated Kozhikode Sub-Registrar Office with your two witnesses and original Aadhaar cards for biometric thumbprints, digital photos, and official Book III archiving.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: KOZHIKODE_FAQS.map((item) => ({
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
      <KozhikodeLocationClient faqs={KOZHIKODE_FAQS} />
      <Footer />
    </>
  );
}
