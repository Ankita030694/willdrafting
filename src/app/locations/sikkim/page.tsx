import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SikkimLocationClient from "./SikkimLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 148 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Sikkim: Online Will & Land Law Guide",
  },
  description:
    "Draft a valid Will in Sikkim. Guidance on Revenue Order No. 1 land protections, Bhutia-Lepcha customary succession, and SRO registration in Gangtok.",
  keywords: [
    "will drafting in sikkim",
    "revenue order no 1 sikkim will",
    "bhutia lepcha land succession",
    "will registration gangtok sikkim",
    "estate lawyer sikkim",
    "article 371f sikkim inheritance",
    "sikkim succession act will drafting",
    "sub registrar office gangtok will",
    "will drafting namchi sikkim",
    "will drafting gyalshing",
    "mangan district will registration",
    "gangtok municipal corporation will mutation",
    "section 31 registration act home visit sikkim",
    "online will drafting sikkim",
    "ama legal solutions sikkim will",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/sikkim",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/sikkim",
      "x-default": "https://www.willdrafting.in/locations/sikkim",
    },
  },
  openGraph: {
    title: "Will Drafting in Sikkim: Online Will & Land Law Guide",
    description:
      "Draft a valid Will in Sikkim. Guidance on Revenue Order No. 1 land protections, Bhutia-Lepcha customary succession, and SRO registration in Gangtok.",
    url: "https://www.willdrafting.in/locations/sikkim",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-sikkim-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Sikkim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Sikkim: Online Will & Land Law Guide",
    description:
      "Draft a valid Will in Sikkim. Guidance on Revenue Order No. 1 land protections, Bhutia-Lepcha customary succession, and SRO registration in Gangtok.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-sikkim-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const SIKKIM_FAQS = [
  {
    q: "Is Will registration mandatory in Sikkim?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Sikkim. An unregistered Will written on plain white paper and attested by two independent adult witnesses is legally valid. However, formal Book III registration before the Sub-Registrar at the District Collectorate in Gangtok, Namchi, Gyalshing, or Mangan creates an indisputable government record that protects your estate against future disputes.",
  },
  {
    q: "What is Revenue Order No. 1 of 1917 and how does it restrict Will bequests in Sikkim?",
    a: "Revenue Order No. 1 of 1917 is a historic, constitutionally protected regulation in Sikkim (under Article 371F) that strictly prohibits the alienation, mortgage, or transfer of Bhutia-Lepcha ancestral and agricultural land to non-Bhutia-Lepcha individuals. A testator cannot circumvent Revenue Order No. 1 by bequeathing protected Bhutia-Lepcha land to a non-BL person through a Will; any such bequest is void ab initio.",
  },
  {
    q: "How does Article 371F of the Constitution of India protect succession laws in Sikkim?",
    a: "Article 371F(k) of the Constitution of India guarantees that all pre-merger laws in force in Sikkim prior to 1975 continue in full force until explicitly amended or repealed by the Sikkim State Legislature. This protects Sikkim's unique land tenure regulations, local residential property protections, and community-specific customary succession practices from being diluted by generalized central enactments.",
  },
  {
    q: "Is court probate mandatory for a Will executed in Sikkim?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, court probate is compulsory only for Wills executed within or concerning immovable properties located inside the historical presidency towns of Mumbai, Kolkata, and Chennai. Sikkim lies completely outside these presidency town jurisdictions, meaning probate is optional and beneficiaries can effectuate title mutations directly.",
  },
  {
    q: "What property can an individual in Sikkim freely bequeath through a Will?",
    a: "A testator in Sikkim holds absolute testamentary power over all self-acquired properties, including urban apartments in Gangtok, private commercial buildings, hotel and homestay leases, vehicles, bank fixed deposits, mutual funds, and personal jewelry. For ancestral agricultural lands, bequests must strictly comply with customary norms and Revenue Order No. 1.",
  },
  {
    q: "What is the official government fee to register a Will in Sikkim?",
    a: "Wills are 100% exempt from ad-valorem stamp duty across Sikkim. You can execute your Will on standard white A4 paper without purchasing non-judicial stamp paper. At Sikkim Sub-Registrar Offices (DC Office registry desks), you only pay a nominal flat registration fee of ₹100 to ₹200 under Book III plus nominal computer scanning charges.",
  },
  {
    q: "Can senior citizens in Sikkim register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly citizens, bedridden individuals, or persons with medical mobility restrictions across Sikkim's hilly terrain can request a home visit. Upon submitting a certified medical fitness certificate, the Sub-Registrar attends your residence in Gangtok, Namchi, or surrounding areas with portable biometric equipment.",
  },
  {
    q: "How does a registered Will help with Gangtok Municipal Corporation (GMC) mutation?",
    a: "Gangtok Municipal Corporation requires clear documentary evidence of succession before substituting ownership on municipal property tax registers. A registered Will provides conclusive proof of the deceased testator's testamentary intention, preventing contested hearings and avoiding the requirement for expensive civil court succession certificates.",
  },
  {
    q: "Who can serve as valid attesting witnesses for a Sikkim Will?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards, Voter IDs, or Sikkim Certificates of Identification (COI) can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or bequest under the Will.",
  },
  {
    q: "Can Sikkimese residents working outside Sikkim or NRIs make a Will for local properties?",
    a: "Yes. Many Sikkimese professionals living in Delhi, Bengaluru, Kolkata, or abroad own properties in Gangtok and surrounding districts. You can draft a customized Will online, execute it before two witnesses where you reside, and complete formal Book III registration before a Sikkim Sub-Registrar during your visit to the state.",
  },
];

export default function SikkimLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/sikkim";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-sikkim.jpg";

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
        name: "Will Drafting in Sikkim: Online Will & Land Law Guide",
        description:
          "Draft a valid Will in Sikkim. Guidance on Revenue Order No. 1 land protections, Bhutia-Lepcha customary succession, and SRO registration in Gangtok.",
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
          caption: "Legal Will Drafting and Property Succession in Sikkim",
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
            name: "Sikkim",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Sikkim - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Revenue Order No. 1 land protection compliance, and SRO registration support across Gangtok, Namchi, Gyalshing, Pakyong, and Mangan.",
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
          { "@type": "City", name: "Namchi" },
          { "@type": "City", name: "Gyalshing" },
          { "@type": "City", name: "Mangan" },
          { "@type": "City", name: "Pakyong" },
          { "@type": "City", name: "Soreng" },
          { "@type": "City", name: "Rangpo" },
          { "@type": "City", name: "Singtam" },
          { "@type": "City", name: "Jorethang" },
          { "@type": "City", name: "Ravangla" },
          { "@type": "City", name: "Pelling" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Sikkim Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Sikkim Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Succession Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Sikkim Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Sikkim",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Sikkim.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Check Land Category",
            text: "List your residential flats, commercial properties, bank deposits, and verify whether any agricultural land falls under Revenue Order No. 1 Bhutia-Lepcha protections.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will incorporating clear beneficiary allocations, survivorship clauses, executor appointment, and compliance with Article 371F provisions.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page in the presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Pay Government Registration Fee",
            text: "Obtain the official treasury challan for the nominal registration fee at the jurisdictional District Collectorate or Sub-Registrar Office in Sikkim.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Sikkim SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: SIKKIM_FAQS.map((item) => ({
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
      <SikkimLocationClient faqs={SIKKIM_FAQS} />
      <Footer />
    </>
  );
}
