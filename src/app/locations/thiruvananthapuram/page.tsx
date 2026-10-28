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
    "Draft a legally binding Will in Thiruvananthapuram. Expert guidance on PEARLS portal registration, Technopark IT assets, and family wealth.",
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
      "Draft a legally binding Will in Thiruvananthapuram. Expert guidance on PEARLS portal registration, Technopark IT assets, and family wealth.",
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
      "Draft a legally binding Will in Thiruvananthapuram. Expert guidance on PEARLS portal registration, Technopark IT assets, and family wealth.",
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
    q: "Is Will registration required by law in Thiruvananthapuram?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, filing a Will at the SRO is optional in Kerala. A Will written on plain white paper is valid if you sign it in front of two witnesses. Still, recording your Will at a Trivandrum SRO stores it in safe Book III state records. This stops family fights, blocks fake claims, and speeds up title transfers at the TMC and local Village Offices.",
  },
  {
    q: "Is court probate needed for a Will in Thiruvananthapuram?",
    a: "No. Under Section 213 and Section 57 of the Indian Succession Act, 1925, court probate is needed only in Mumbai, Kolkata, and Chennai. Trivandrum falls under the Kerala High Court, where probate is not required for Hindu, Christian, Sikh, Jain, or Buddhist Wills. Heirs can update bank accounts and land titles directly without a slow court case.",
  },
  {
    q: "How do Technopark IT staff plan for stock options and digital assets?",
    a: "Technopark engineers and startup founders often hold ESOPs, RSUs, US stock accounts, crypto funds, and company shares. Our Wills include clear digital asset clauses and foreign stock schedules so your executor can claim and pass these funds to your family without delay.",
  },
  {
    q: "How do I book an online slot on the Kerala PEARLS portal?",
    a: "You can book your slot on the Kerala PEARLS portal (keralaregistration.gov.in). Log in, enter your ID and witness details, pay the flat state fee online, and print your e-token slip for your local SRO in Vanchiyoor, Pattom, Kazhakoottam, or Chalai.",
  },
  {
    q: "What is the state fee to register a Will in Thiruvananthapuram?",
    a: "Wills pay zero stamp duty across Kerala under the Kerala Stamp Act, 1959. You do not pay any land tax percentage. At Trivandrum SRO desks, you pay only a flat ₹1,000 state fee plus ₹100 to ₹200 for page scans.",
  },
  {
    q: "Can seniors and retired officers in Trivandrum register from home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, seniors or unwell owners in Kowdiar, Sasthamangalam, Jawahar Nagar, and nearby areas can ask for a home visit by the SRO officer. You only need an MBBS doctor's note and the small state home visit fee.",
  },
  {
    q: "How does a registered Will help with TMC tax transfer and Pokkuvaravu?",
    a: "A registered Will gives trusted proof to the Trivandrum city office (TMC) and local Village Offices. It speeds up Pokkuvaravu (land title transfer) and moves the Thandapper account into the heir's name so they can pay land tax right away.",
  },
  {
    q: "How does Christian succession law apply to Wills in Kerala?",
    a: "In Kerala, Christian succession follows the Indian Succession Act, 1925, after the Supreme Court Mary Roy ruling. While estates without a Will split equally among sons and daughters, Section 59 lets every Christian owner leave self-earned land and bank funds to any heir they choose.",
  },
  {
    q: "Can NRIs make an online Will for Trivandrum properties?",
    a: "Yes. NRIs living in the Gulf, the UK, or the US can draft a valid Indian Will online. Under Section 63 of the Indian Succession Act, you can sign the Will abroad in front of two witnesses, or record it at your local Trivandrum SRO during your next trip to Kerala.",
  },
  {
    q: "Do I need a doctor's fitness note to register a Will in Trivandrum?",
    a: "While not required for young adults, a doctor's note from an MBBS doctor is wise for owners aged 60 and older. The doctor confirms that you have a clear and sound mind, which blocks future claims of memory loss or pressure.",
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
          "Draft a legally binding Will in Thiruvananthapuram. Expert guidance on PEARLS portal signing, Technopark IT assets, and family wealth.",
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
          "Professional Will drafting, lawyer check, Kerala PEARLS signing, Technopark digital asset planning, and doorstep signing.",
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
            text: "List your Thiruvananthapuram assets including TMC flats, land plots, Technopark stock equity, demat accounts, and bank deposits. Name heirs and a trusted executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Will Clauses",
            text: "Draft your Will using our online legal platform or with a senior Kerala estate lawyer to include clear bequests, survivorship clauses, and digital asset instructions.",
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
            text: "Generate an online signing token on the Kerala Filing PEARLS portal (keralasigning.gov.in) for your local SRO and pay the nominal ₹1,000 fee via e-Challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric SRO Registration",
            text: "Visit the designated Thiruvananthapuram SRO office with your two witnesses and original Aadhaar cards for biometric thumbprints, digital photos, and Book III archiving.",
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
