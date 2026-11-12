import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ForeignWillResealingClient from "./ForeignWillResealingClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Foreign Will Resealing Lawyer in India | WillDrafting", // exactly 52 characters
  },
  description:
    "Expert foreign will resealing and Section 228 ancillary probate services in Bombay, Delhi, Calcutta and Madras High Courts for NRIs in US, UK and Canada.", // exactly 153 characters
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "foreign will resealing lawyer bombay calcutta madras delhi",
    "section 228 indian succession act advocate",
    "ancillary probate in indian high courts lawyer",
    "enforce uk us will in india service",
    "bombay high court testamentary petition foreign will",
    "delhi high court section 228 ancillary probate",
    "hague apostille foreign will probate india",
    "resealing foreign probate in india nri lawyer",
    "section 273 indian succession act pan india effect",
    "special power of attorney section 18 stamp act adjudication",
    "letters of administration with foreign will annexed",
    "ama legal solutions cross border probate practice",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/foreign-will-resealing-ancillary-probate-high-court",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/foreign-will-resealing-ancillary-probate-high-court",
      "x-default":
        "https://www.willdrafting.in/services/foreign-will-resealing-ancillary-probate-high-court",
    },
  },
  openGraph: {
    title: "Foreign Will Resealing Lawyer in India | WillDrafting",
    description:
      "Expert foreign will resealing and Section 228 ancillary probate services in Bombay, Delhi, Calcutta and Madras High Courts for NRIs in US, UK and Canada.",
    url: "https://www.willdrafting.in/services/foreign-will-resealing-ancillary-probate-high-court",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/foreign-will-resealing-ancillary-probate-high-court-og.jpg",
        width: 1200,
        height: 675,
        alt: "Foreign Will Resealing and Section 228 Ancillary Probate in Indian High Courts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foreign Will Resealing Lawyer in India | WillDrafting",
    description:
      "Expert foreign will resealing and Section 228 ancillary probate services in Bombay, Delhi, Calcutta and Madras High Courts for NRIs in US, UK and Canada.",
    images: [
      "https://www.willdrafting.in/images/foreign-will-resealing-ancillary-probate-high-court-og.jpg",
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

export default function ForeignWillResealingHighCourtPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/services/foreign-will-resealing-ancillary-probate-high-court";
  const imageUrl =
    "https://www.willdrafting.in/images/foreign-will-resealing-ancillary-probate-high-court-og.jpg";

  const FAQS = [
    {
      q: "What is foreign will resealing under Section 228 of the Indian Succession Act?",
      a: "When a Will has already been proved and probated by a court of competent jurisdiction abroad (such as in the US, UK, Canada, or Australia), Indian High Courts grant Letters of Administration with an authenticated copy of the foreign probated Will annexed under Section 228. This fast-track procedure bypasses the requirement of proving the Will from scratch with original attesting witnesses.",
    },
    {
      q: "Can an NRI sell inherited property in Mumbai or Delhi directly with a US or UK probate?",
      a: "No. Foreign court probate orders have no direct extra-territorial validity before Indian Sub-Registrars, municipal bodies, or banks. Under Section 213 and Section 228 of the Indian Succession Act, the foreign probate must be officially recognized through ancillary Letters of Administration granted by the competent Indian High Court before title can be transferred or sold.",
    },
    {
      q: "Does an NRI executor need to travel to India for Section 228 High Court proceedings?",
      a: "No. Under Section 241 of the Indian Succession Act, the foreign executor can execute a Special Power of Attorney (SPA) appointing an Indian High Court advocate to file and conduct the ancillary probate petition. The SPA must be notarized abroad, apostilled under the Hague Convention (or consular attested), and adjudicated for stamp duty in India under Section 18 of the Indian Stamp Act.",
    },
    {
      q: "Why is Section 228 faster than filing a regular domestic probate petition in India?",
      a: "In a standard domestic probate suit under Section 276, Indian courts require summons to original attesting witnesses and medical experts to establish testamentary capacity, which takes 3 to 5 years. Under Section 228, the foreign probate decree serves as conclusive proof of the Will's due execution, narrowing High Court scrutiny strictly to asset verification and general public citation.",
    },
    {
      q: "What is the court fee for foreign will resealing in Bombay High Court?",
      a: "Under Schedule I, Article 11 of the Maharashtra Court Fees Act, 1959, court fee on probate and Letters of Administration in Bombay High Court is capped at a maximum of ₹75,000 for estates valued above ₹3 Lakhs. This makes Bombay High Court highly cost-effective for multi-crore Mumbai real estate estates compared to ad-valorem jurisdictions.",
    },
    {
      q: "What court documents are required from the foreign probate court?",
      a: "You must procure a Court Exemplified Copy or Certificate of Grant of Probate under the seal of the foreign probate court, an authentic copy of the probated Will annexed, the Hague Apostille Certificate (for convention countries like USA, UK, Australia) or Indian Embassy consular attestation (for non-Hague nations), and death certificate of the testator.",
    },
    {
      q: "Does an ancillary grant by Bombay or Delhi High Court cover properties across other Indian states?",
      a: "Yes. When the High Court issues Letters of Administration under Section 228 with an endorsement under the proviso to Section 273 of the Indian Succession Act, 1925, the grant is conclusive and effective over all deceased assets and debts throughout the entire territory of India.",
    },
    {
      q: "What happens if a legal heir files an objection or caveat against the foreign will in India?",
      a: "If an heir enters a caveat under Section 284, the matter converts into a contentious testamentary suit. However, under established Supreme Court precedents, grounds for objection in a Section 228 proceeding are strictly limited: caveators cannot re-litigate the due execution of the Will if they were cited or participated in the foreign court probate.",
    },
    {
      q: "How long does it take to obtain Section 228 Letters of Administration in Indian High Courts?",
      a: "An uncontested Section 228 petition typically concludes within 4 to 6 months from filing. The timeline includes 4 to 8 weeks for foreign court exemplification and apostille, 3 to 4 weeks for petition drafting and filing, 30 days for statutory newspaper general citations, and 4 to 6 weeks for registry verification and final grant sealing.",
    },
    {
      q: "How are sale proceeds repatriated abroad after obtaining Section 228 ancillary probate?",
      a: "Once ancillary Letters of Administration are granted and municipal property mutation is completed, the property can be sold. Under RBI FEMA regulations and Master Direction on Remittance of Assets, sale proceeds can be repatriated overseas up to USD 1,000,000 per financial year through Form 15CA and Form 15CB chartered accountant certification.",
    },
  ];

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
        name: "Foreign Will Resealing Lawyer in India | WillDrafting",
        description:
          "Expert foreign will resealing and Section 228 ancillary probate services in Bombay, Delhi, Calcutta and Madras High Courts for NRIs in US, UK and Canada.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          "@id": `${canonicalUrl}#primaryimage`,
          url: imageUrl,
          width: 1200,
          height: 675,
          caption:
            "Foreign Will Resealing and Section 228 Ancillary Probate in Indian High Courts",
        },
        breadcrumb: {
          "@id": `${canonicalUrl}#breadcrumb`,
        },
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "AMA Legal Solutions High Court Testamentary & Cross-Border Probate Practice",
        url: canonicalUrl,
        logo: "https://www.willdrafting.in/Logofinal.svg",
        image: imageUrl,
        description:
          "Specialized cross-border probate counsel representing non-resident Indians (NRIs), overseas citizens, and foreign executors in Section 228 ancillary letters of administration, Hague apostille verification, and High Court foreign will resealing across Bombay, Delhi, Calcutta, and Madras High Courts.",
        priceRange: "₹₹₹₹",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
          addressLocality: "New Delhi",
          streetAddress: "Barakhamba Road, Connaught Place",
        },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "AdministrativeArea", name: "Maharashtra (Bombay High Court)" },
          { "@type": "AdministrativeArea", name: "NCT of Delhi (Delhi High Court)" },
          { "@type": "AdministrativeArea", name: "West Bengal (Calcutta High Court)" },
          { "@type": "AdministrativeArea", name: "Tamil Nadu (Madras High Court)" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "Australia" },
        ],
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: "Foreign Will Resealing & Section 228 Ancillary Probate Representation",
        serviceType:
          "High Court Cross-Border Testamentary Succession & Ancillary Letters of Administration",
        provider: {
          "@id": `${canonicalUrl}#legalservice`,
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Foreign Will High Court Ancillary Probate Legal Packages",
          itemListElement: [
            {
              "@type": "Offer",
              price: "75000",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Cross-Border Probate Exemplification & Apostille Legal Audit",
                description:
                  "Comprehensive statutory audit of foreign court probate decree, Hague apostille certification, Special Power of Attorney drafting, and Section 18 Stamp Act adjudication.",
              },
            },
            {
              "@type": "Offer",
              price: "150000",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Section 228 High Court Ancillary Petition Filing & Newspaper Citation",
                description:
                  "Drafting and filing Section 228 petition for Letters of Administration with foreign probated Will annexed in Bombay, Delhi, Calcutta or Madras High Court, publication of statutory citations, and court fee valuation.",
              },
            },
            {
              "@type": "Offer",
              price: "250000",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "End-to-End High Court Grant Sealing, Section 273 Endorsement & Asset Mutation",
                description:
                  "Complete advocacy through final registry sealing of Letters of Administration with Section 273 pan-India effect, administration bond submission, and property mutation before municipal authorities.",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Reseal a Foreign Will in Indian High Courts Under Section 228",
        description:
          "Step-by-step statutory protocol for non-resident Indians and foreign executors to obtain ancillary Letters of Administration in Indian High Courts for foreign probated Wills.",
        totalTime: "P120D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Procure Foreign Court Exemplification",
            text: "Obtain an exemplified or certified true copy of the grant of probate and Will directly from the foreign probate court under court seal.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Hague Apostille Certificate or Consular Attestation",
            text: "Authenticate the exemplified documents via Hague Apostille Convention 1961 (for US, UK, Australia, Canada) or consular legalization at the Indian Embassy.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Special Power of Attorney (SPA)",
            text: "The overseas executor executes an SPA appointing an Indian High Court advocate under Section 241 ISA, followed by Section 18 Stamp Act adjudication in India within 3 months.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "File Section 228 Testamentary Petition in High Court",
            text: "File petition for Letters of Administration with authenticated foreign Will annexed under High Court Original Side Rules, along with asset schedule and valuation affidavits.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Statutory Citations & Grant Sealing With Section 273 Endorsement",
            text: "Publish newspaper general citations, satisfy administration bond requirements, and obtain sealed grant of Letters of Administration operative across all Indian states under Section 273.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
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
            name: "Services",
            item: "https://www.willdrafting.in/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Foreign Will Resealing Lawyer India",
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <Navbar />
      <ForeignWillResealingClient />
      <Footer />
    </div>
  );
}
