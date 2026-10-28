import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LakshadweepLocationClient from "./LakshadweepLocationClient";

// Title: Exactly 50 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 142 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Lakshadweep: Customary Will Guide",
  },
  description:
    "Draft a valid Will in Lakshadweep. Guidance on Marumakkathayam customary property, island tenancy regulations, and SRO Kavaratti registration.",
  keywords: [
    "will drafting in lakshadweep",
    "marumakkathayam will succession lakshadweep",
    "will registration kavaratti",
    "kerala high court jurisdiction lakshadweep",
    "online will",
    "velliazha property will lakshadweep",
    "belasha property will",
    "sro kavaratti will appointment",
    "agatti island will drafting",
    "amini island succession",
    "andrott island property will",
    "minicoy island will drafting maliku",
    "kalpeni island succession",
    "lakshadweep land revenue tenancy regulation 1965",
    "section 31 registration act home visit lakshadweep",
    "is probate mandatory in lakshadweep",
    "kerala high court probate exemption lakshadweep",
    "ama legal solutions lakshadweep will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/lakshadweep",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/lakshadweep",
      "x-default": "https://www.willdrafting.in/locations/lakshadweep",
    },
  },
  openGraph: {
    title: "Will Drafting in Lakshadweep: Customary Will Guide",
    description:
      "Draft a valid Will in Lakshadweep. Guidance on Marumakkathayam customary property, island tenancy regulations, and SRO Kavaratti registration.",
    url: "https://www.willdrafting.in/locations/lakshadweep",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-lakshadweep-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Lakshadweep Islands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Lakshadweep: Customary Will Guide",
    description:
      "Draft a valid Will in Lakshadweep. Guidance on Marumakkathayam customary property, island tenancy regulations, and SRO Kavaratti registration.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-lakshadweep-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const LAKSHADWEEP_FAQS = [
  {
    q: "Is Will filing needed by law in Lakshadweep?",
    a: "No. Under Section 18(e) of the Act of 1908, filing a Will is your choice in the islands. A Will written on plain white paper and signed by two adult witnesses is valid in law. Still, filing your Will at the SRO in Kavaratti or your local island desk puts it in safe Book III state records. This stops family fights when changing land records before the Tehsildar.",
  },
  {
    q: "Is court probate needed for a Will under Kerala High Court rules?",
    a: "No. Under Section 213 and Section 57 of the Act of 1925, probate is needed only for Wills made in or for land in Mumbai, Kolkata, and Chennai. Even though the Kerala High Court hears cases for the islands, the islands lie outside those three old towns. Probate is not needed for island residents, so land can pass directly with a valid Will.",
  },
  {
    q: "What is the gap between Belasha and Velliazha land under island custom?",
    a: "Under local island custom, land falls into two clear groups. Velliazha (family tarawad land) passes down the mother line and belongs to the joint family; one person cannot give it away by Will without full family consent. In contrast, Belasha (self-earned land or cash) bought from your own work or trade is yours to give to anyone you pick in a Will.",
  },
  {
    q: "Can non-islanders get or buy land in the islands through a Will?",
    a: "No. Under the 1965 Land Revenue and Tenancy Rule, strict laws stop non-natives from buying, holding, or getting farm or home land on the islands without prior written approval from the UT Head. Gifts of island land in a Will must follow these local rules.",
  },
  {
    q: "How does the 1965 Land Rule affect Will name change?",
    a: "Under Rule 6 of 1965 and the 1968 Tenancy Rules, coconut groves, cowle grants, and home plots need formal name change before the local Tehsildar. Showing a filed Will along with the death slip gives clear legal proof of your plan. This updates the island Record of Rights fast without civil court cases.",
  },
  {
    q: "What is the state fee to file a Will at SRO Kavaratti?",
    a: "Wills have zero stamp duty in the islands because they take effect only after life. At the SRO in Kavaratti or island sub-desks, you pay only small filing and scan fees of about ₹100 to ₹300. There is no fee based on land price.",
  },
  {
    q: "How does a Will work in Minicoy (Maliku) with Athiri and Avakar homes?",
    a: "Minicoy has a clear social setup grouped into Athiris (village units). Family houses (Avakar) pass down the female line to members who care for the home. A Will in Minicoy can clearly pass self-earned assets, boats, personal goods, and bank cash while keeping family house rules in peace.",
  },
  {
    q: "Can senior citizens or sick residents file a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Act of 1908, seniors, sick persons, or those who cannot take a boat between islands can ask for a home visit. With a doctor health note, the SRO officer or island magistrate visits your home on Kavaratti, Agatti, Amini, or Andrott to complete the signing.",
  },
  {
    q: "Who can sign as witnesses for a Will in the islands?",
    a: "Any two adults of sound mind with valid photo ID such as Aadhaar cards or voter IDs can act as witnesses. Under Section 67 of the Act of 1925, a witness must not get any land, boat, or cash under the Will. Respected elders, neighbors, or island doctors are great choices.",
  },
  {
    q: "How does a filed Will help with Dweep Panchayat tax records?",
    a: "Under the 1994 Panchayat Rule, local Dweep Panchayats keep village books and house tax rolls. A filed Will gives clear legal proof of who gets the home. This lets the Panchayat clerk update the new owner name on house tax books right away.",
  },
];

export default function LakshadweepLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/lakshadweep";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-lakshadweep.jpg";

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
        name: "Will Drafting in Lakshadweep: Local Will Guide",
        description:
          "Draft a valid Will in Lakshadweep. Guidance on Marumakkathayam local asset, island tenancy regulations, and SRO Kavaratti signing.",
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
          caption: "Legal Will Drafting and Asset Estate in Lakshadweep Islands",
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
            name: "Lakshadweep",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Lakshadweep - Local Estate & SRO Kavaratti Registration",
        description:
          "Professional Will drafting, Kerala High Court lawyer talk, Marumakkathayam local asset check, and SRO Kavaratti.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kavaratti",
          addressRegion: "Lakshadweep",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Kavaratti" },
          { "@type": "City", name: "Agatti" },
          { "@type": "City", name: "Amini" },
          { "@type": "City", name: "Andrott" },
          { "@type": "City", name: "Minicoy" },
          { "@type": "City", name: "Kalpeni" },
          { "@type": "City", name: "Kadmat" },
          { "@type": "City", name: "Kiltan" },
          { "@type": "City", name: "Chetlat" },
          { "@type": "City", name: "Bitra" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Lakshadweep Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Lakshadweep Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Lawyer Talk & Marumakkathayam Local Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete SRO Kavaratti Will Registration & Island Home Visit Support",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Lakshadweep",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Lakshadweep.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Distinguish Belasha from Velliazha Assets",
            text: "List your self-acquired Belasha assets, bank savings, and fishing vessels separately from tarawad family Velliazha holdings. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal and Local Clauses",
            text: "Draft your Will using checked legal clauses adhering to Section 63 of the Indian Succession Act, island land revenue rules, and local matrilineal rules.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the paper on standard A4 paper and sign each page in the presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Submit at SRO Kavaratti or Island Sub-Division",
            text: "Present the signed Will to the SRO office in Kavaratti or your local island Sub-Divisional registry office, remitting nominal government signing fees.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Verbal Attestation and Book III Entry",
            text: "Appear with both witnesses for identity check, thumb impressions, and verbal affirmation to finalize official Book III government recording.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: LAKSHADWEEP_FAQS.map((item) => ({
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
      <LakshadweepLocationClient faqs={LAKSHADWEEP_FAQS} />
      <Footer />
    </>
  );
}
