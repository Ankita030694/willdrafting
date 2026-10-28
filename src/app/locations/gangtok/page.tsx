import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GangtokLocationClient from "./GangtokLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 152 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Gangtok: Online Will & Land Law Guide",
  },
  description:
    "Draft a valid Will in Gangtok. Guidance on Revenue Order No. 1 land rules, Bhutia-Lepcha succession, GMC property mutation, and SRO Gangtok.",
  keywords: [
    "will drafting in gangtok",
    "revenue order no 1 sikkim will",
    "bhutia lepcha property will",
    "will registration gangtok sro",
    "estate lawyer sikkim",
    "article 371f sikkim inheritance",
    "gangtok municipal corporation will mutation",
    "online will drafting gangtok",
    "sub registrar office gangtok east sikkim",
    "sikkim succession act will drafting",
    "will drafting deorali gangtok",
    "will drafting tadong ranipool",
    "will drafting sichey burtuk",
    "will drafting namchi jorethang",
    "will drafting singtam rangpo",
    "will drafting gyalshing pelling",
    "will drafting mangan chungthang",
    "will drafting pakyong airport belt",
    "section 31 registration act home visit gangtok",
    "is probate mandatory in gangtok",
    "high court of sikkim will probate",
    "dzumsa customary succession sikkim",
    "ama legal solutions gangtok will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/gangtok",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/gangtok",
      "x-default": "https://www.willdrafting.in/locations/gangtok",
    },
  },
  openGraph: {
    title: "Will Drafting in Gangtok: Online Will & Land Law Guide",
    description:
      "Draft a valid Will in Gangtok. Guidance on Revenue Order No. 1 land rules, Bhutia-Lepcha succession, GMC property mutation, and SRO Gangtok.",
    url: "https://www.willdrafting.in/locations/gangtok",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-gangtok-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Gangtok Sikkim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Gangtok: Online Will & Land Law Guide",
    description:
      "Draft a valid Will in Gangtok. Guidance on Revenue Order No. 1 land rules, Bhutia-Lepcha succession, GMC property mutation, and SRO Gangtok.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-gangtok-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const GANGTOK_FAQS = [
  {
    q: "Is Will registration mandatory in Gangtok and Sikkim?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, Will registration is optional in Gangtok. A Will written on plain paper is legally valid if executed in writing and signed before two independent adult witnesses. However, registering your Will at the Sub-Registrar Office at DAC Sichey enters it into permanent Book III government custody, preventing fraudulent challenges and simplifying GMC property mutation.",
  },
  {
    q: "How does Revenue Order No. 1 of 1917 affect Will drafting in Sikkim?",
    a: "Revenue Order No. 1 of 1917 is a protected historical statute under Article 371F of the Constitution. It strictly prohibits the transfer or alienation of ancestral lands belonging to Bhutias and Lepchas to non-tribals or persons outside their communities. A Will cannot bypass Revenue Order No. 1; any testamentary bequest attempting to bequeath restricted ancestral tribal land to a non-Bhutia/Lepcha is void ab initio.",
  },
  {
    q: "Can a non-tribal or non-Sikkimese inherit ancestral Bhutia-Lepcha land through a Will?",
    a: "No. Testamentary bequests cannot circumvent Sikkim land tenure regulations. Under settled jurisprudence of the High Court of Sikkim and constitutional protections under Article 371F, non-tribals cannot acquire title to protected Bhutia-Lepcha ancestral lands through testamentary instruments. Self-acquired non-restricted urban properties and movable assets can be bequeathed in accordance with general civil law.",
  },
  {
    q: "Is probate compulsory for a Will in Gangtok under Indian Succession Act rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Gangtok lies entirely outside presidency limits. Probate is strictly non-compulsory in Gangtok for Hindu, Buddhist, Sikh, and Jain testators, allowing direct municipal mutation and asset transmission with a registered Will.",
  },
  {
    q: "How does a registered Will assist in Gangtok Municipal Corporation (GMC) property mutation?",
    a: "Gangtok Municipal Corporation requires authenticated documentation before mutating ownership for municipal property taxes and building ownership registers. A registered Will bearing official Book III registration from SRO Gangtok provides conclusive prima facie proof of genuine testamentary intent, preventing administrative disputes among surviving legal heirs.",
  },
  {
    q: "Can senior citizens in Gangtok register a Will from home under Section 31?",
    a: "Yes. Given Gangtok's steep hilly terrain and winter conditions, traveling to DAC Sichey can be difficult for elderly citizens. Under Section 31 of the Registration Act, 1908, a senior citizen or bedridden testator can request a doorstep SRO visit. Upon submitting an MBBS doctor fitness certificate and paying a nominal commission fee, the Sub-Registrar attends your residence with portable biometric tools.",
  },
  {
    q: "What is the official fee and stamp duty for registering a Will at SRO Gangtok?",
    a: "Testamentary Wills are exempt from ad valorem stamp duty across India and Sikkim. At the Sub-Registrar Office in Gangtok (DAC Sichey), testators pay only nominal government registration and scanning charges. There are no percentage-based property market value stamp duty levies on Wills.",
  },
  {
    q: "Who can serve as valid attesting witnesses at the Gangtok Sub-Registrar Office?",
    a: "Any two adult individuals of sound mind carrying valid government photo identification (such as Aadhaar Card, Voter ID, or Sikkim Certificate of Identification) can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must be independent individuals who receive no legacy or benefit under the Will.",
  },
  {
    q: "How are hotel and homestay business assets bequeathed in Gangtok and Pelling?",
    a: "Commercial hotels, tourism homestays, and restaurant businesses along MG Marg, Deorali, or Pelling require customized succession clauses. A well-drafted Will distinguishes between underlying freehold/leasehold land rights, commercial trade licenses, business goodwill, and company equity, ensuring continuous operational control without family deadlock.",
  },
  {
    q: "Can Sikkimese Non-Resident Indians (NRIs) make a Will for properties located in Gangtok?",
    a: "Yes. Sikkimese NRIs living in Australia, Singapore, the UK, the US, or the Middle East who own residential or commercial properties in Gangtok can draft a valid Indian Will online. The Will can be executed and attested before two independent witnesses abroad and consularized, or formally registered during a personal visit to SRO Gangtok.",
  },
];

export default function GangtokLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/gangtok";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-gangtok.jpg";

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
        name: "Will Drafting in Gangtok: Online Will & Land Law Guide",
        description:
          "Draft a valid Will in Gangtok. Guidance on Revenue Order No. 1 land rules, Bhutia-Lepcha estate, GMC asset name change, and SRO Gangtok.",
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
          caption: "Legal Will Drafting and Property Succession in Gangtok Sikkim",
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
            name: "Gangtok",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Gangtok - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, Revenue Order No. 1 compliance, and SRO filing support across Gangtok.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gangtok",
          addressRegion: "Sikkim",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Gangtok" },
          { "@type": "City", name: "MG Marg" },
          { "@type": "City", name: "Deorali" },
          { "@type": "City", name: "Tadong" },
          { "@type": "City", name: "Ranipool" },
          { "@type": "City", name: "Sichey" },
          { "@type": "City", name: "Burtuk" },
          { "@type": "City", name: "Namchi" },
          { "@type": "City", name: "Jorethang" },
          { "@type": "City", name: "Singtam" },
          { "@type": "City", name: "Rangpo" },
          { "@type": "City", name: "Gyalshing" },
          { "@type": "City", name: "Pelling" },
          { "@type": "City", name: "Mangan" },
          { "@type": "City", name: "Chungthang" },
          { "@type": "City", name: "Pakyong" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Gangtok Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Gangtok Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Sikkim Land Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Gangtok Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Gangtok",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Gangtok, Sikkim.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Gangtok real estate including GMC home houses, shop hotel leases, rural land parchas, bank accounts, and investments. Identify heirs and choose a dependable executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Verify Revenue Order No. 1 and Land Rights",
            text: "Confirm family tribal land classifications under Revenue Order No. 1 of 1917 and Article 371F, ensuring bequests comply strictly with community land laws.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using checked legal clauses for asset split, executor powers, minor guardianships, and explicit revocation of any prior Will papers.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the paper on standard A4 paper and sign each page in the physical presence of two adult non-heir witnesses holding valid government photo ID.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at SRO Gangtok DAC Sichey",
            text: "Present the signed Will before the SRO at District Office Centre Sichey with both witnesses for verbal check and Book III archival entry.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: GANGTOK_FAQS.map((item) => ({
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
      <GangtokLocationClient faqs={GANGTOK_FAQS} />
      <Footer />
    </>
  );
}
