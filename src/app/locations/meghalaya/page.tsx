import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MeghalayaLocationClient from "./MeghalayaLocationClient";

// Title: Exactly 57 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 153 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Meghalaya: Matrilineal Succession Guide",
  },
  description:
    "Draft a valid Will in Meghalaya. Guidance on Khasi and Garo matrilineal customary succession, self-acquired asset bequests, and registration.",
  keywords: [
    "will drafting in meghalaya",
    "khasi customary succession will",
    "garo inheritance will",
    "will registration shillong",
    "estate advocate meghalaya",
    "khatduh youngest daughter inheritance will",
    "khasi lineage act estate planning",
    "self acquired property will meghalaya",
    "will drafting tura garo hills",
    "will drafting jowai jaintia hills",
    "meghalaya transfer of land regulation act",
    "high court of meghalaya probate rules",
    "sub registrar office shillong will registration",
    "nongpoh will drafting advocate",
    "section 31 registration act home visit meghalaya",
    "ama legal solutions meghalaya will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/meghalaya",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/meghalaya",
      "x-default": "https://www.willdrafting.in/locations/meghalaya",
    },
  },
  openGraph: {
    title: "Will Drafting in Meghalaya: Matrilineal Succession Guide",
    description:
      "Draft a valid Will in Meghalaya. Guidance on Khasi and Garo matrilineal customary succession, self-acquired asset bequests, and registration.",
    url: "https://www.willdrafting.in/locations/meghalaya",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-meghalaya-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Matrilineal Property Succession in Meghalaya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Meghalaya: Matrilineal Succession Guide",
    description:
      "Draft a valid Will in Meghalaya. Guidance on Khasi and Garo matrilineal customary succession, self-acquired asset bequests, and registration.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-meghalaya-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const MEGHALAYA_FAQS = [
  {
    q: "Is Will registration mandatory in Meghalaya?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Meghalaya. A Will executed on plain white paper signed before two independent witnesses is legally valid. However, registering your Will before the Sub-Registrar at the Deputy Commissioner's Office in Shillong, Tura, or Jowai places it in permanent Book III government custody, preventing post-demise disputes under customary family laws.",
  },
  {
    q: "Can a Khasi testator bequeath self-acquired property through a Will?",
    a: "Yes. Under Khasi customary law and established rulings of the High Court of Meghalaya, a clear legal distinction exists between ancestral clan property (Ri Kur) and self-acquired property (Kamai Nongkhynraw). While ancestral property passes matrilineally to the youngest daughter (Khatduh) as clan custodian, an individual holds unrestricted testamentary power to bequeath their self-acquired assets to sons, other daughters, spouse, or non-relatives via a valid Will.",
  },
  {
    q: "How does customary matrilineal succession work for the Garo community in Meghalaya?",
    a: "In Garo customary succession, ancestral family property and clan A'king land are held matrilineally under the guardianship of the Nokma, with succession passing through a designated daughter (Nokna) and her husband (Nokkrom). However, for self-acquired movable assets, urban residential houses, bank savings, and commercial investments, individuals retain the right to draft a Will specifying how their personal estate should be distributed.",
  },
  {
    q: "Is probate required for a Will executed in Meghalaya?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, court probate is compulsory only for Wills executed within or concerning immovable properties situated inside the historical presidency towns of Mumbai, Kolkata, and Chennai. Meghalaya lies completely outside presidency town jurisdictions, meaning probate is non-mandatory and beneficiaries can effectuate title mutations directly.",
  },
  {
    q: "How does the Meghalaya Transfer of Land (Regulation) Act, 1971 affect property bequests?",
    a: "The Meghalaya Transfer of Land (Regulation) Act, 1971 regulates the transfer of land from indigenous tribal persons to non-tribals. When drafting a Will involving tribal land, bequests must strictly respect statutory land transfer limitations. Testators cannot use a testamentary disposition to circumvent statutory restrictions against transfer of tribal land to non-indigenous persons without prior sanction from the competent state authority.",
  },
  {
    q: "What is the official government fee to register a Will in Meghalaya?",
    a: "Wills are exempt from ad-valorem stamp duty across Meghalaya under the Indian Stamp Act as adopted by the state. You can draft your Will on plain white A4 paper without purchasing non-judicial stamp paper. At Meghalaya Sub-Registrar Offices (DC Office registry counters), you pay only a nominal flat registration fee of ₹100 under Book III plus nominal computer scanning charges.",
  },
  {
    q: "Can senior citizens in Meghalaya register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically restricted individuals can request a home visit by the Sub-Registrar. Upon submitting a physician's fitness certificate certifying mental soundness and physical inability to travel, the registering officer visits the residence in Shillong, Tura, Jowai, or nearby areas with biometric capture equipment.",
  },
  {
    q: "Where are Wills registered across Meghalaya?",
    a: "Wills are registered at the Sub-Registrar Office operating within the Deputy Commissioner's (DC) Office Complex in each district headquarters, including East Khasi Hills (Shillong), West Garo Hills (Tura), West Jaintia Hills (Jowai), Ri-Bhoi (Nongpoh), East Garo Hills (Williamnagar), West Khasi Hills (Nongstoin), and other district registries across Meghalaya.",
  },
  {
    q: "Who can act as valid attesting witnesses for a Will in Meghalaya?",
    a: "Under Section 63 of the Indian Succession Act, 1925, any two adult individuals of sound mind who hold valid government photo identification (such as Aadhaar card, Voter ID, or Passport) can act as witnesses. Crucially, under Section 67, an attesting witness must not be a beneficiary or the spouse of a beneficiary receiving any property or bequest under the Will.",
  },
  {
    q: "What protections does a registered Will offer against customary clan litigation in Meghalaya?",
    a: "A registered Will executed before the Sub-Registrar provides strong statutory presumption of testamentary capacity, free volition, and genuine execution. In disputes brought before Autonomous District Council (ADC) courts or civil courts, a registered Will carrying Sub-Registrar attestation and independent witness signatures conclusively establishes the testator's conscious intentions, effectively defusing clan challenges.",
  },
];

export default function MeghalayaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/meghalaya";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-meghalaya.jpg";

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
        name: "Will Drafting in Meghalaya: Matrilineal Succession Guide",
        description:
          "Draft a valid Will in Meghalaya. Guidance on Khasi and Garo matrilineal customary succession, self-acquired asset bequests, and registration.",
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
          caption: "Legal Will Drafting and Matrilineal Property Succession in Meghalaya",
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
            name: "Meghalaya",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Meghalaya - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, customary succession legal counsel, advocate verification, and DC Office Sub-Registrar registration support across.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Shillong",
          addressRegion: "Meghalaya",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Shillong" },
          { "@type": "City", name: "Tura" },
          { "@type": "City", name: "Jowai" },
          { "@type": "City", name: "Nongpoh" },
          { "@type": "City", name: "Williamnagar" },
          { "@type": "City", name: "Baghmara" },
          { "@type": "City", name: "Nongstoin" },
          { "@type": "City", name: "Khliehriat" },
          { "@type": "City", name: "Mairang" },
          { "@type": "City", name: "Resubelpara" },
          { "@type": "City", name: "Ampati" },
          { "@type": "City", name: "Cherrapunji" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Meghalaya Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Meghalaya Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Customary Succession Consultation & Will Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Meghalaya DC Office SRO Registration & Doorstep Execution",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Meghalaya",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Meghalaya while respecting customary succession laws.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Distinguish Self-Acquired vs Ancestral Clan Assets",
            text: "Identify all real estate and movable properties, carefully categorizing self-acquired assets (Kamai Nongkhynraw) versus ancestral clan assets (Ri Kur / A'king land) to ensure full testamentary legality.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Statutory Clauses with Legal Counsel",
            text: "Draft your Will with explicit testamentary declarations, beneficiary allocations, executor appointment, and compliance with the Meghalaya Transfer of Land (Regulation) Act, 1971.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Adult Witnesses",
            text: "Print the Will on standard A4 paper and sign each page in the presence of two independent adult witnesses who hold no beneficial interest under the document.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Schedule Sub-Registrar Appointment at District DC Office",
            text: "Schedule an appointment at the jurisdictional Sub-Registrar Office in Shillong, Tura, Jowai, or your local DC Office and deposit the nominal ₹100 registration fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Registration for Book III Custody",
            text: "Attend the Sub-Registrar Office with both witnesses for verbal verification, photo capture, and biometric thumbprinting to seal the Will in permanent Book III custody.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: MEGHALAYA_FAQS.map((item) => ({
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
      <MeghalayaLocationClient faqs={MEGHALAYA_FAQS} />
      <Footer />
    </>
  );
}
