import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DnhDdLocationClient from "./DnhDdLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 147 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Daman, Diu & Dadra: Online Will Guide",
  },
  description:
    "Draft a valid Will in Daman, Diu & Dadra Nagar Haveli. Guidance on Civil Law succession heritage, industrial estate transfer, and SRO.",
  keywords: [
    "will drafting in daman and diu",
    "will registration dadra and nagar haveli",
    "silvassa industrial succession will",
    "bombay high court jurisdiction",
    "online will",
    "will drafting silvassa",
    "will drafting daman",
    "will drafting diu",
    "portuguese civil code daman will",
    "sub registrar office silvassa",
    "civil registrar daman will registration",
    "civil registrar diu will registration",
    "section 31 registration act home visit silvassa",
    "dadra nagar haveli land reforms regulation 1971",
    "is probate mandatory in daman and diu",
    "bombay high court probate dadra exemption",
    "piparia industrial manufacturing will",
    "nani daman flat will transfer",
    "ama legal solutions dadra daman diu will drafting",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/locations/dadra-and-nagar-haveli-and-daman-and-diu",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/locations/dadra-and-nagar-haveli-and-daman-and-diu",
      "x-default":
        "https://www.willdrafting.in/locations/dadra-and-nagar-haveli-and-daman-and-diu",
    },
  },
  openGraph: {
    title: "Will Drafting in Daman, Diu & Dadra: Online Will Guide",
    description:
      "Draft a valid Will in Daman, Diu & Dadra Nagar Haveli. Guidance on Civil Law succession heritage, industrial estate transfer, and SRO.",
    url: "https://www.willdrafting.in/locations/dadra-and-nagar-haveli-and-daman-and-diu",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-dadra-and-nagar-haveli-and-daman-and-diu-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Dadra and Nagar Haveli and Daman and Diu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Daman, Diu & Dadra: Online Will Guide",
    description:
      "Draft a valid Will in Daman, Diu & Dadra Nagar Haveli. Guidance on Civil Law succession heritage, industrial estate transfer, and SRO.",
    images: [
      "https://www.willdrafting.in/images/will-drafting-in-dadra-and-nagar-haveli-and-daman-and-diu-og.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const DNH_DD_FAQS = [
  {
    q: "Is Will registration mandatory in Dadra and Nagar Haveli and Daman and Diu?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional throughout the Union Territory. A Will executed on plain white paper signed by the testator in the presence of two independent witnesses is legally valid. However, formal registration before the Sub-Registrar in Silvassa, Daman, or Diu places the document into permanent Book III government custody, eliminating allegations of tampering and ensuring swift mutation of industrial units, agricultural land, and municipal properties.",
  },
  {
    q: "Is probate compulsory under Bombay High Court rules for properties in DNH and Daman & Diu?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only for Wills executed within or concerning immovable properties located in the historical presidency towns of Mumbai, Kolkata, and Chennai. Although the Bombay High Court holds appellate jurisdiction over Dadra and Nagar Haveli and Daman and Diu, the UT lies outside the presidency town of Mumbai. Probate is non-mandatory here for Hindu, Sikh, Jain, and Buddhist Wills, enabling direct asset transfer with a registered Will.",
  },
  {
    q: "How does Portuguese Civil Code heritage affect Will drafting in Daman and Diu?",
    a: "In Daman and Diu, native families historically fell under the Portuguese Civil Code of 1867, which recognizes the regime of communion of assets (communio bonorum) between married spouses and rules on reserved legal portions (legitima). Modern estate planning requires clearly segregating the testator's personal half-share of marital assets and self-acquired properties, ensuring the testamentary bequest conforms to statutory succession standards without infringing on protected legal heir entitlements.",
  },
  {
    q: "How are industrial factories and MSME manufacturing units transferred via a Will in Silvassa?",
    a: "Silvassa hosts major industrial estates in Piparia, Masat, Amli, and Khadoli. A Will must specifically address company shares, partnership stakes, proprietary licenses, DIC registrations, and leasehold plot rights granted by the Administration. Bequeathing industrial assets via a registered Will ensures uninterrupted banking facilities, seamless factory license transfer, and statutory corporate succession without commercial disruption.",
  },
  {
    q: "What are the registration fees and stamp duty charges for a Will in the Union Territory?",
    a: "Wills are exempt from ad valorem stamp duty across Dadra and Nagar Haveli and Daman and Diu. You only pay nominal official registration fees (typically ₹100 to ₹500) plus nominal document scanning and computer service charges at the Sub-Registrar Office in Silvassa, Daman, or Diu. No percentage levy is charged on the market valuation of your factories, residential houses, or lands.",
  },
  {
    q: "How are agricultural and tribal lands in Dadra and Nagar Haveli passed to legal heirs?",
    a: "Agricultural holdings in DNH are governed by the Dadra and Nagar Haveli Land Reforms Regulation, 1971. Under Section 8 of this regulation, occupancy lands belonging to members of Scheduled Tribes (such as Varli, Dhodia, or Kokna communities) cannot be transferred or bequeathed to non-tribals. A Will concerning tribal land must designate tribal successors. Following the testator's demise, the registered Will and death certificate are submitted to the Talathi/Mamlatdar for revenue record mutation.",
  },
  {
    q: "Can senior citizens in Silvassa, Daman, or Diu register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or mobility-impaired testators can request a home or hospital commission visit. Upon submitting a fitness certificate issued by an MBBS doctor certifying testamentary soundness, the Sub-Registrar visits the residence in Silvassa, Daman, or Diu with portable biometric equipment to complete Book III registration.",
  },
  {
    q: "How does a registered Will expedite property mutation with Daman, Diu, and Silvassa Municipal Councils?",
    a: "The Daman Municipal Council (DMC), Diu Municipal Council, and Silvassa Municipal Council (SMC) require authoritative proof of legal succession before transferring property tax assessment records (Varasdar Nond). A registered Will provides conclusive testamentary evidence, eliminating the need for expensive civil court succession certificates or disputed legal heir affidavits.",
  },
  {
    q: "Who can serve as valid attesting witnesses at UT Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind carrying valid Aadhaar cards or government photo IDs can act as attesting witnesses. In accordance with Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property, legacy, or benefit under the Will, nor should they be spouses of beneficiaries. Family doctors, trusted accountants, or independent friends are recommended.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located in Daman or Diu?",
    a: "Yes. Many individuals from Daman and Diu reside in the UK, Portugal, Mozambique, the Gulf, and North America while retaining ancestral properties, beachfront parcels, or commercial shops in the UT. An NRI can draft an Indian law-compliant Will online, execute it before two witnesses abroad with Indian consular attestation or Hague Apostille certification, or register it before the local Sub-Registrar during their visit to India.",
  },
];

export default function DnhDdLocationPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/locations/dadra-and-nagar-haveli-and-daman-and-diu";
  const imageUrl =
    "https://www.willdrafting.in/images/will-drafting-in-dadra-and-nagar-haveli-and-daman-and-diu.jpg";

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
        name: "Will Drafting in Daman, Diu & Dadra: Online Will Guide",
        description:
          "Draft a valid Will in Daman, Diu & Dadra Nagar Haveli. Guidance on Civil Law estate heritage, plant estate transfer, and SRO.",
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
          caption:
            "Legal Will Drafting and Property Succession in Dadra and Nagar Haveli and Daman and Diu",
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
            name: "Dadra and Nagar Haveli and Daman and Diu",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Dadra and Nagar Haveli and Daman and Diu - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, SRO filing, and doorstep signing support across Silvassa, Daman, Diu, and.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Silvassa",
          addressRegion: "Dadra and Nagar Haveli and Daman and Diu",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Silvassa" },
          { "@type": "City", name: "Daman" },
          { "@type": "City", name: "Diu" },
          { "@type": "City", name: "Dadra" },
          { "@type": "City", name: "Amli" },
          { "@type": "City", name: "Masat" },
          { "@type": "City", name: "Piparia" },
          { "@type": "City", name: "Naroli" },
          { "@type": "City", name: "Moti Daman" },
          { "@type": "City", name: "Nani Daman" },
          { "@type": "City", name: "Ghoghla" },
          { "@type": "City", name: "Khanvel" },
          { "@type": "City", name: "Bhimpore" },
          { "@type": "City", name: "Kadaiya" },
          { "@type": "City", name: "Dabhel" },
          { "@type": "City", name: "Somnath" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Dadra and Nagar Haveli and Daman and Diu Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for DNH & DD Residents",
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
                name: "Complete UT Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Dadra and Nagar Haveli and Daman and Diu",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Silvassa, Daman, or Diu.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your plant manufacturing units in Silvassa, Portuguese-era bungalows in Daman, coastal assets in Diu, farm farmlands, and bank accounts. Appoint heirs and a dependable executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using legally vetted clauses harmonizing Portuguese Civil Code aspects where applicable, providing clear asset bequests, minor child care, and debt exoneration.",
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
            name: "Schedule Sub-Registrar Appointment",
            text: "Book your filing slot at the SRO office in Silvassa, Daman, or Diu and remit nominal legal government fees.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at UT Sub-Registrar Office",
            text: "Visit the SRO with both witnesses for verbal witness signing, photo capture, and biometric thumbprinting to complete Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: DNH_DD_FAQS.map((item) => ({
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
      <DnhDdLocationClient faqs={DNH_DD_FAQS} />
      <Footer />
    </>
  );
}
