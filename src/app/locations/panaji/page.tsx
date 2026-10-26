import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PanajiLocationClient from "./PanajiLocationClient";

// Title: Exactly 50 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 150 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Panaji: Goa Civil Code Will Guide",
  },
  description:
    "Draft a valid Will in Panaji. Expert guidance on the Goa Civil Code, legitime quota rules, Comunidade property succession, and Notary Public registration.",
  keywords: [
    "will drafting in panaji",
    "goa civil code will",
    "public will panaji notary",
    "comunidade land succession goa",
    "estate lawyer panaji north goa",
    "quota disponivel goa will",
    "legitime quota panaji",
    "civil registrar tiswadi panaji",
    "special notary panaji will",
    "inventory proceedings goa court",
    "bombay high court at goa",
    "form i and xiv mutation panaji",
    "corporation of the city of panaji property tax",
    "miramar flat will panaji",
    "dona paula villa succession",
    "altinho heritage house will",
    "caranzalem apartment succession",
    "sealed will testamento cerrado panaji",
    "comunhao de bens marriage will panaji",
    "ama legal solutions panaji will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/panaji",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/panaji",
      "x-default": "https://www.willdrafting.in/locations/panaji",
    },
  },
  openGraph: {
    title: "Will Drafting in Panaji: Goa Civil Code Will Guide",
    description:
      "Draft a valid Will in Panaji. Expert guidance on the Goa Civil Code, legitime quota rules, Comunidade property succession, and Notary Public registration.",
    url: "https://www.willdrafting.in/locations/panaji",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-panaji-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Panaji Goa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Panaji: Goa Civil Code Will Guide",
    description:
      "Draft a valid Will in Panaji. Expert guidance on the Goa Civil Code, legitime quota rules, Comunidade property succession, and Notary Public registration.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-panaji-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const PANAJI_FAQS = [
  {
    q: "Is Will registration mandatory in Panaji under Goa law?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, Will registration is optional in Panaji. However, under the Goa Civil Code and local succession practice, registering a Public Will (Testamento Público) before the Special Notary or Civil Registrar of Tiswadi in Panaji records the instrument in the official Book of Wills (Livro de Notas). This establishes indisputable authenticity against future claims and ensures smooth inventory proceedings in court.",
  },
  {
    q: "How does the Goa Civil Code legitime quota rule apply in Panaji?",
    a: "Unlike the Indian Succession Act where testators enjoy complete testamentary freedom over self-acquired assets, Panaji testators are governed by the Goa Civil Code. Under this regime, forced heirs (descendants or ascendants) hold a protected statutory claim known as the Legitime (Quota Indisponível), which reserves 50% of the estate. A testator can only freely bequeath the remaining 50% known as the Disposable Quota (Quota Disponível).",
  },
  {
    q: "How does Communion of Assets (Comunhão de Bens) affect a Panaji Will?",
    a: "In Goa, marriages default to the Communion of Assets (Comunhão de Bens) unless an Antenuptial Contract was executed before solemnization. Under communion, each spouse holds an undivided 50% half-share (meeação) in all matrimonial assets. Consequently, one spouse cannot bequeath an entire shared property; each spouse must execute an independent Will covering only their personal 50% undivided share.",
  },
  {
    q: "What is the difference between a Public Will and a Sealed Will in Panaji?",
    a: "In Panaji, a Public Will (Testamento Público) is dictated and recorded directly by the Special Notary or Civil Registrar in the official registry book (Livro de Notas) before independent witnesses. A Sealed or Closed Will (Testamento Cerrado) is drafted privately by the testator or legal counsel, enclosed in a sealed cover, and presented to the Civil Registrar who executes an official Act of Approval (Instrumento de Aprovação) on the envelope.",
  },
  {
    q: "Are Inventory Proceedings required instead of probate in Panaji?",
    a: "Yes. In Panaji and across Goa, standard High Court probate under Section 213 of the Indian Succession Act is generally not applicable. Estate administration and partition between legal heirs take place through Inventory Proceedings (Processo de Inventário) before the Civil Court or Special Notary under the Goa Succession, Special Notaries and Inventory Proceeding Act, 2012.",
  },
  {
    q: "Can Comunidade land or Gaunkari rights (Zon) in Panaji be bequeathed by Will?",
    a: "Leasehold plots and residential structures built on Comunidade lands in Tiswadi can be willed to beneficiaries subject to the Code of Comunidades (Código das Comunidades) and consent from the managing committee. However, traditional Gaunkar lineage privileges, voting rights, and annual dividend rights (Zon) follow customary patriarchal lines and cannot be transferred via a testamentary Will.",
  },
  {
    q: "What are the official government registration fees for a Will in Panaji?",
    a: "Wills are exempt from ad-valorem stamp duty based on property market valuation across Goa. At the Civil Registrar or Sub-Registrar Office of Tiswadi in Panaji, registration charges, scanning fees, and Notary Public recording fees typically range between ₹500 and ₹2,500 depending on page count and whether the instrument is executed as a Public Will or Sealed Will.",
  },
  {
    q: "How does a registered Will help in mutating Form I & XIV in Panaji?",
    a: "Following the testator's demise, the beneficiary submits the registered Will along with the final Inventory partition order or Deed of Succession (Escritura de Habilitação de Herdeiros) to the Tiswadi Mamlatdar or Talathi. A mutation entry is posted to update Form I & XIV (the official Goan Record of Rights) and Corporation of the City of Panaji (CCP) municipal tax records.",
  },
  {
    q: "Can senior citizens in Panaji register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908 and Goa registration regulations, senior citizens, bedridden individuals, or persons with certified medical mobility issues can request a doorstep visit. Upon submitting a fitness certificate from an MBBS practitioner, the Civil Registrar or Sub-Registrar visits your home in Miramar, Caranzalem, Altinho, or Dona Paula with portable biometric equipment.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located in Panaji?",
    a: "Yes. Many Goan diaspora members and NRIs residing in the Gulf, the UK, Europe, or North America hold ancestral villas and apartments in Panaji. NRIs can draft a Goa-compliant Will online through our advocate service. They can execute it before the Indian High Commission or Consulate abroad, or schedule an in-person appointment with the Civil Registrar in Panaji during their visit.",
  },
];

export default function PanajiLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/panaji";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-panaji.jpg";

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
        name: "Will Drafting in Panaji: Goa Civil Code Will Guide",
        description:
          "Draft a valid Will in Panaji. Expert guidance on the Goa Civil Code, legitime quota rules, Comunidade property succession, and Notary Public registration.",
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
          caption: "Legal Will Drafting and Property Succession in Panaji Goa",
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
            name: "Panaji",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Panaji - Estate Planning & Civil Registrar Assistance",
        description:
          "Professional Will drafting, advocate verification, Goa Civil Code compliance, and Civil Registrar registration support across Panaji, Miramar, Dona Paula, Caranzalem, and Tiswadi.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Panaji",
          addressRegion: "Goa",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Panaji" },
          { "@type": "City", name: "Miramar" },
          { "@type": "City", name: "Dona Paula" },
          { "@type": "City", name: "Caranzalem" },
          { "@type": "City", name: "Altinho" },
          { "@type": "City", name: "Fontainhas" },
          { "@type": "City", name: "Taleigao" },
          { "@type": "City", name: "Ribandar" },
          { "@type": "City", name: "Santa Cruz" },
          { "@type": "City", name: "Bambolim" },
          { "@type": "City", name: "Kadamba Plateau" },
          { "@type": "City", name: "Porvorim" },
          { "@type": "City", name: "Margao" },
          { "@type": "City", name: "Mapusa" },
          { "@type": "City", name: "Vasco da Gama" },
          { "@type": "City", name: "Ponda" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Panaji Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Panaji Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Goa Civil Code Advocate Will Consultation & Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Panaji Civil Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Panaji",
        description:
          "Five clear legal steps to draft and register a valid Will under the Goa Civil Code before the Civil Registrar in Panaji.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Calculate Disposable Quota and Forced Heirs",
            text: "Evaluate your family tree to identify forced heirs under the Goa Civil Code. Isolate the 50% Legitime reserve from the 50% Disposable Quota (Quota Disponível) that can be willed away.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Account for Communion of Assets",
            text: "Confirm your matrimonial property regime. For default communion of assets marriages, ensure the Will covers only the testator's undivided 50% half-share (meeação).",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Draft Customized Goa Succession Clauses",
            text: "Incorporate legally verified clauses specifying bequests, executor appointments, Form I & XIV details, Comunidade plot status, and revocation of earlier wills.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Select Public Will or Sealed Will Format",
            text: "Decide whether to execute a Public Will (inscribed into the Civil Registrar's Book of Wills) or a Closed Sealed Will with an official Act of Approval.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Register Before the Civil Registrar of Tiswadi",
            text: "Appear at the Civil Registrar office in Panaji with two independent adult witnesses for identity verification, thumbprinting, and official record entry.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: PANAJI_FAQS.map((item) => ({
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
      <PanajiLocationClient faqs={PANAJI_FAQS} />
      <Footer />
    </>
  );
}
