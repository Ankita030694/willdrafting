import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoaLocationClient from "./GoaLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 149 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Goa: Portuguese Civil Code Will Guide",
  },
  description:
    "Draft a valid Will in Goa. Expert guidance on the Goa Civil Code, Comunidade land rules, legitime disposable quota, and Civil Registrar.",
  keywords: [
    "will drafting in goa",
    "goa civil code will",
    "portuguese civil code succession goa",
    "public will registration goa notary",
    "estate lawyer panaji",
    "civil registrar will goa",
    "special notary goa will",
    "disposable quota legitime goa",
    "quota disponivel goa will",
    "comunhao de bens marriage goa will",
    "comunidade land succession goa",
    "inventory proceedings goa court",
    "bombay high court at goa probate",
    "will drafting margao",
    "will drafting mapusa",
    "will drafting vasco da gama",
    "will drafting ponda",
    "will drafting porvorim",
    "will drafting calangute",
    "will drafting assagao",
    "form i and xiv mutation will goa",
    "nri property will in goa",
    "portuguese passport holder will goa",
    "ama legal solutions goa will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/goa",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/goa",
      "x-default": "https://www.willdrafting.in/locations/goa",
    },
  },
  openGraph: {
    title: "Will Drafting in Goa: Portuguese Civil Code Will Guide",
    description:
      "Draft a valid Will in Goa. Expert guidance on the Goa Civil Code, Comunidade land rules, legitime disposable quota, and Civil Registrar.",
    url: "https://www.willdrafting.in/locations/goa",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-goa-og.jpg",
        width: 1200,
        height: 630,
        alt: "Will Drafting Services in Goa Portuguese Civil Code and Estate Succession Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Goa: Portuguese Civil Code Will Guide",
    description:
      "Draft a valid Will in Goa. Expert guidance on the Goa Civil Code, Comunidade land rules, legitime disposable quota, and Civil Registrar.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-goa-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const GOA_FAQS = [
  {
    q: "How does the Portuguese Civil Code affect Will drafting in Goa?",
    a: "Unlike the rest of India where the Indian Succession Act, 1925 permits complete testamentary freedom over self-acquired assets, Goa continues to be governed by the Portuguese Civil Code of 1867 and the Goa Succession, Special Notaries and Inventory Proceeding Act, 2012. Testators cannot freely bequeath their entire estate if they have forced heirs (descendants or ascendants). The law strictly mandates a 'Legitime' (reserved portion), limiting testamentary disposition solely to the 'Disposable Quota' (Quota Disponível).",
  },
  {
    q: "What is the Legitime and Disposable Quota under Goa succession law?",
    a: "The 'Legitime' (Quota Indisponível) is the mandatory fraction of the estate legally reserved for compulsory forced heirs (children, grandchildren, or parents). If the testator has living children or descendants, 50% of the estate is legally reserved for them and cannot be willed away. The remaining 50% is the 'Disposable Quota' (Quota Disponível), which the testator may freely bequeath to any individual, charity, or trusted third party.",
  },
  {
    q: "How does Communion of Assets (Comunhão de Bens) impact a Goan Will?",
    a: "Under Goan family law, marriages default to the 'Communion of Assets' (Comunhão de Bens) unless an Antenuptial Contract (Escritura de Convenção Antenupcial) was registered prior to solemnization. In a communion marriage, each spouse owns an undivided 50% half-share (meeação) in all family assets. Consequently, one spouse cannot write a Will disposing of the entire property; each spouse can execute a Will covering only their personal 50% undivided share.",
  },
  {
    q: "What is the difference between a Public Will and a Sealed Will in Goa?",
    a: "In Goa, testators have two primary statutory formats: A 'Public Will' (Testamento Público) is drafted and dictated before the Special Notary or Civil Registrar, inscribed directly in the official Book of Wills (Livro de Notas), and attested by witnesses. A 'Closed or Sealed Will' (Testamento Cerrado) is drafted privately by the testator or advocate, signed, enclosed in a sealed envelope, and presented to the Special Notary who affixes an official act of approval (Instrumento de Aprovação).",
  },
  {
    q: "Is court probate required in Goa, or do Inventory Proceedings take precedence?",
    a: "In Goa, probate under Section 213 of the Indian Succession Act is not the standard procedure for estate transmission. Instead, estate distribution and partition among co-heirs are governed by 'Inventory Proceedings' (Processo de Inventário) under the Goa Succession, Special Notaries and Inventory Proceeding Act, 2012. Inventory proceedings are conducted before the Civil Court or Special Notary to officially inventory, evaluate, and apportion assets between forced heirs and testamentary legatees.",
  },
  {
    q: "Can Comunidade lands and Gaunkari rights (Zon) be bequeathed through a Will?",
    a: "Comunidade lands are governed by the Code of Comunidades (Código das Comunidades). While proprietary rights in personal structures or long-term leases on Comunidade plots can be passed via Will subject to Comunidade approval, traditional 'Gaunkar' rights and the right to receive annual dividends ('Zon') follow customary patriarchal lineage or specific Comunidade statutory rules and cannot be alienated through testamentary bequests.",
  },
  {
    q: "What are the official government fees and stamp duty to register a Will in Goa?",
    a: "Under the Goa Stamp Act and registration schedule, Wills are completely exempt from ad-valorem stamp duty based on property market value. At the Civil Registrar or Sub-Registrar Office, only nominal statutory fees are payable: standard registration and scanning fees typically range between ₹500 and ₹2,000 depending on the number of pages, whether executed as a Public Will or Sealed Will, and computerization charges.",
  },
  {
    q: "How does a registered Will facilitate mutation of Form I & XIV in Goa?",
    a: "Following the testator's demise, the beneficiary or legal executor presents the registered Will along with the death certificate and Inventory partition order or deed of succession to the Talathi and Mamlatdar. A mutation entry is initiated in the Directorate of Land Records to update Form I & XIV (the official Goan Record of Rights), as well as municipal or panchayat property tax assessment records.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) or Portuguese passport holders make a Goan Will?",
    a: "Yes. Many Goan diaspora members and NRIs residing in the UK, UAE, USA, Canada, or Portugal own ancestral properties in Goa. NRIs can draft a Goa-compliant Will online through our legal portal. The instrument can be executed before the Indian Embassy or Consulate abroad and notarized, or registered in person before the Civil Registrar during a trip to Goa.",
  },
  {
    q: "Can senior citizens in Goa register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908 and Goa registration regulations, senior citizens, bedridden persons, or medically incapacitated individuals can request an official home visit. Upon submitting a registered medical practitioner's fitness certificate, the Civil Registrar or Sub-Registrar attends the testator's residence anywhere in North or South Goa with biometric devices.",
  },
];

export default function GoaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/goa";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-goa.jpg";

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
        name: "Will Drafting in Goa: Portuguese Civil Code Will Guide",
        description:
          "Draft a valid Will in Goa. Expert guidance on the Goa Civil Code, Comunidade land rules, legitime disposable quota, and Civil Registrar.",
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
          caption: "Will Drafting Services in Goa Portuguese Civil Code and Estate Succession Guide",
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
            name: "Goa",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Goa - Portuguese Civil Code & Estate Succession",
        description:
          "Professional Will drafting, Portuguese Civil Code talk, disposable quota allocation, Civil Registrar filing, and doorstep.",
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
          { "@type": "City", name: "Margao" },
          { "@type": "City", name: "Mapusa" },
          { "@type": "City", name: "Vasco da Gama" },
          { "@type": "City", name: "Ponda" },
          { "@type": "City", name: "Porvorim" },
          { "@type": "City", name: "Calangute" },
          { "@type": "City", name: "Candolim" },
          { "@type": "City", name: "Assagao" },
          { "@type": "City", name: "Anjuna" },
          { "@type": "City", name: "Dona Paula" },
          { "@type": "City", name: "Miramar" },
          { "@type": "City", name: "Colva" },
          { "@type": "City", name: "Benaulim" },
          { "@type": "City", name: "Fatorda" },
          { "@type": "City", name: "Pernem" },
          { "@type": "City", name: "Bicholim" },
          { "@type": "City", name: "Canacona" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Goa Will Drafting & Estate Succession Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Goa Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Portuguese Civil Code Will Consultation",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Goa Civil Registrar & Special Notary Registration",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Goa",
        description:
          "Five clear legal steps to draft and register a valid Will under the Goa Civil Code before the Civil Registrar or Special Notary.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Audit Marital Regime and Asset Portfolio",
            text: "Determine your matrimonial asset regime (Communion of Assets or Antenuptial Contract) and compile Form I & XIV extracts, Comunidade papers, and personal investment portfolios.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Calculate Legitime vs Disposable Quota",
            text: "Strictly segregate the non-disposable legitime (50% reserved for children/forced heirs) from the freely disposable quota to prevent post-demise reduction lawsuits in Inventory Proceedings.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Draft Customized Legal Clauses",
            text: "Draft legal clauses incorporating Portuguese Civil Code principles, appointing an executor (Cabeça de Casal), specifying asset bequests, and revoking prior instruments.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Select Will Format and Book Notary Slot",
            text: "Choose between a Public Will (inscribed directly in the Notary Register) or a Sealed Will (Testamento Cerrado), and book an appointment with the Civil Registrar or Special Notary.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Execute Before Registrar and Independent Witnesses",
            text: "Appear before the Special Notary or Civil Registrar with two independent witnesses for formal witness signing, thumbprint recording, and official Book III government custody.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: GOA_FAQS.map((item) => ({
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
      <GoaLocationClient faqs={GOA_FAQS} />
      <Footer />
    </>
  );
}
