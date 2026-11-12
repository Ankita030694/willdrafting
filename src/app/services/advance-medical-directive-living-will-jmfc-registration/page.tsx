import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LivingWillRegistrationClient from "./LivingWillRegistrationClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Living Will Registration Lawyer India | WillDrafting", // exactly 52 characters
  },
  description:
    "Turnkey living will drafting and registration legal service in India. Fully compliant with Supreme Court 2023 modified orders and hospital protocols.", // exactly 149 characters
  keywords: [
    "living will registration lawyer india",
    "advance medical directive advocate india",
    "supreme court 2023 living will execution service",
    "end of life legal consultation delhi mumbai",
    "two tier medical board hospital representation advocate",
    "common cause v uoi 2023 living will lawyer",
    "notary jmfc living will custody service india",
    "living will digital health record vault abha",
    "passive euthanasia legal consultation india",
    "ama legal solutions living will registration service",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/advance-medical-directive-living-will-jmfc-registration",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/advance-medical-directive-living-will-jmfc-registration",
      "x-default":
        "https://www.willdrafting.in/services/advance-medical-directive-living-will-jmfc-registration",
    },
  },
  openGraph: {
    title: "Living Will Registration Lawyer India | WillDrafting",
    description:
      "Turnkey living will drafting and registration legal service in India. Fully compliant with Supreme Court 2023 modified orders and hospital protocols.",
    url: "https://www.willdrafting.in/services/advance-medical-directive-living-will-jmfc-registration",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/advance-medical-directive-living-will-jmfc-registration-og.jpg",
        width: 1200,
        height: 675,
        alt: "Living Will and Advance Medical Directive Registration Service in India Legal Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Living Will Registration Lawyer India | WillDrafting",
    description:
      "Turnkey living will drafting and registration legal service in India. Fully compliant with Supreme Court 2023 modified orders and hospital protocols.",
    images: [
      "https://www.willdrafting.in/images/advance-medical-directive-living-will-jmfc-registration-og.jpg",
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

export default function LivingWillRegistrationPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/services/advance-medical-directive-living-will-jmfc-registration";
  const imageUrl =
    "https://www.willdrafting.in/images/advance-medical-directive-living-will-jmfc-registration-og.jpg";

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
        name: "Living Will Registration Lawyer India | WillDrafting",
        description:
          "Turnkey living will drafting and registration legal service in India. Fully compliant with Supreme Court 2023 modified orders and hospital protocols.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
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
            name: "Services",
            item: "https://www.willdrafting.in/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Living Will JMFC Registration Service",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "AMA Legal Solutions Advance Medical Directive & Living Will Practice",
        url: canonicalUrl,
        logo: "https://www.willdrafting.in/Logofinal.svg",
        image: imageUrl,
        description:
          "Turnkey legal service for drafting, notarization, municipal record deposition, and hospital board coordination of Advance Medical Directives under Supreme Court 2023 modified guidelines.",
        priceRange: "₹25,000 - ₹75,000",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
          addressLocality: "New Delhi",
          streetAddress: "Barakhamba Road, Connaught Place",
        },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "AdministrativeArea", name: "Delhi NCR" },
          { "@type": "AdministrativeArea", name: "Maharashtra" },
          { "@type": "AdministrativeArea", name: "Karnataka" },
          { "@type": "AdministrativeArea", name: "Tamil Nadu" },
          { "@type": "AdministrativeArea", name: "Telangana" },
          { "@type": "AdministrativeArea", name: "West Bengal" },
        ],
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: "Turnkey Living Will Drafting, Notarization & Hospital Protocol Service",
        serviceType:
          "Advance Medical Directive Legal Drafting, Municipal Deposition, and Hospital Board Representation",
        provider: {
          "@id": `${canonicalUrl}#legalservice`,
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Living Will & Advance Medical Directive Legal Packages",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Standard Advance Medical Directive Execution",
                description:
                  "Comprehensive Living Will drafting, Notary execution, two-witness verification, and family surrogate designation.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Turnkey Supreme Court 2023 Municipal & Digital Vault Filing",
                description:
                  "End-to-end execution including municipal body record deposition, digital health vault sync, and hospital board intimation notices.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Hospital Two-Tier Medical Board Emergency Legal Representation",
                description:
                  "Active advocate representation before Primary and Secondary Hospital Medical Boards to enforce living will directives without civil court delays.",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a Living Will or Advance Medical Directive in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Living Will is a legally binding written document where a competent adult states medical treatment choices in advance. It specifies whether to withhold or withdraw life-support systems, mechanical ventilation, or artificial nutrition if terminally ill with no hope of recovery. The Supreme Court legalized it under Article 21 in Common Cause v. Union of India.",
            },
          },
          {
            "@type": "Question",
            name: "Did the Supreme Court change living will rules in 2023?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In January 2023, a 5-judge Supreme Court Constitution Bench modified the 2018 guidelines. The Living Will can now be attested before a Notary Public or Gazetted Officer instead of a Judicial Magistrate. Furthermore, both the Primary and Secondary Medical Boards are set up directly by the hospital within 48 hours each, removing previous bureaucratic delays.",
            },
          },
          {
            "@type": "Question",
            name: "Is countersignature by a Judicial Magistrate First Class (JMFC) still needed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the modified 2023 Supreme Court order, execution before a Notary Public or Gazetted Officer in the presence of two independent witnesses is sufficient for legal validity. The JMFC is informed of the decision when the hospital medical board convenes. However, judicial record deposition or sub-registrar indexing can still be completed as an added protective measure.",
            },
          },
          {
            "@type": "Question",
            name: "How does the Two-Tier Hospital Medical Board process work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When a patient becomes terminally ill and unable to make decisions, the hospital forms a Primary Medical Board within 48 hours comprising 3 doctors. If they confirm that treatment will not help, the hospital forms a Secondary Medical Board within 48 hours. Upon concurrence of both boards, life support can be withdrawn in accordance with the directive.",
            },
          },
          {
            "@type": "Question",
            name: "Can family members override a patient's registered Living Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court affirmed that an individual's autonomy and right to refuse medical treatment under Article 21 reigns supreme. If the Living Will is validly executed, doctors and appointed surrogates must honor the patient's documented instructions even if other relatives disagree.",
            },
          },
          {
            "@type": "Question",
            name: "Where should the executed Living Will be deposited for custody?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Supreme Court guidelines, authenticated physical copies must be provided to the appointed surrogate, family physician, and the local municipal corporation or panchayat custodian. Additionally, a copy should be preserved in digital health lockers such as ABHA or DigiLocker for instant hospital access.",
            },
          },
          {
            "@type": "Question",
            name: "What treatments can be refused under an Advance Medical Directive?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can specify instructions regarding invasive mechanical ventilators, cardiopulmonary resuscitation (CPR), hemodialysis, artificial enteral nutrition, and blood transfusions in terminal situations. You cannot request active euthanasia or lethal substance administration, which remains illegal in India.",
            },
          },
          {
            "@type": "Question",
            name: "Can a person revoke or amend their Living Will later?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An individual retains the absolute right to revoke, cancel, or amend their Living Will at any time during their life, provided they have sound mental capacity. The revocation must be executed in writing and shared with the surrogate, family doctor, and municipal records.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a Living Will and a Healthcare Power of Attorney?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Living Will outlines specific medical treatment decisions and end-of-life refusals in writing. A Durable Healthcare Power of Attorney (or Healthcare Proxy) legally appoints a trusted surrogate to communicate with doctors and make real-time decisions if unforeseen clinical situations arise. Our turnkey service combines both into a hybrid directive.",
            },
          },
          {
            "@type": "Question",
            name: "What are the legal fees for turnkey Living Will registration in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our professional retainer fees range between ₹25,000 and ₹75,000 depending on requirements. This includes customized legal drafting, doctor mental fitness certification coordination, Notary and witness attestation, municipal custodian filing, and emergency hospital board notification protocols.",
            },
          },
        ],
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
      <LivingWillRegistrationClient />
      <Footer />
    </>
  );
}
