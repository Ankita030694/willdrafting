import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillRegistrationClient from "./WillRegistrationClient";

export const metadata: Metadata = {
  title: {
    absolute: "Will Registration Service India: SRO Process | WillDrafting",
  },
  description:
    "Complete Will registration service in India. Book SRO appointments, arrange witnesses, schedule Section 31 home visits, and protect your estate legally.",
  keywords: [
    "will registration service india",
    "register will at sub registrar",
    "will registration fees",
    "sro will registration process",
    "section 31 registration act home visit",
    "will registration online appointment",
    "documents required for will registration",
    "unregistered will vs registered will india",
    "book 3 will registry sub registrar",
    "senior citizen will registration home visit",
    "sub registrar will verification rules",
    "will drafting and registration service",
    "ama legal solutions will registration",
    "section 18 registration act optional will",
    "indian succession act section 63",
    "will registration cost in delhi maharashtra bangalore",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/services/will-registration",
    languages: {
      "en-IN": "https://www.willdrafting.in/services/will-registration",
      "x-default": "https://www.willdrafting.in/services/will-registration",
    },
  },
  openGraph: {
    title: "Will Registration Service India: SRO Process | WillDrafting",
    description:
      "Complete Will registration service in India. Book SRO appointments, arrange witnesses, schedule Section 31 home visits, and protect your estate legally.",
    url: "https://www.willdrafting.in/services/will-registration",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-registration-og.jpg",
        width: 1200,
        height: 630,
        alt: "Will Registration Service in India at Sub-Registrar Office",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Registration Service India: SRO Process | WillDrafting",
    description:
      "Complete Will registration service in India. Book SRO appointments, arrange witnesses, schedule Section 31 home visits, and protect your estate legally.",
    images: ["https://www.willdrafting.in/images/will-registration-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillRegistrationPage() {
  const canonicalUrl = "https://www.willdrafting.in/services/will-registration";
  const imageUrl = "https://www.willdrafting.in/images/will-registration-og.jpg";

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
        name: "Will Registration Service India: SRO Process | WillDrafting",
        description:
          "Complete Will registration service in India. Book SRO appointments, arrange witnesses, schedule Section 31 home visits, and protect your estate legally.",
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
            item: "https://www.willdrafting.in/service",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Will Registration Service",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: "Done-for-You Will Registration Service at Sub-Registrar Office in India",
        serviceType: "Testamentary Estate Planning & SRO Registration Assistance",
        provider: {
          "@type": "LegalService",
          name: "AMA Legal Solutions & WillDrafting",
          url: "https://www.amalegalsolutions.com",
        },
        areaServed: [
          { "@type": "Country", "name": "India" },
          { "@type": "AdministrativeArea", "name": "Delhi NCR" },
          { "@type": "AdministrativeArea", "name": "Maharashtra" },
          { "@type": "AdministrativeArea", "name": "Karnataka" },
          { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
          { "@type": "AdministrativeArea", "name": "Uttar Pradesh" },
          { "@type": "AdministrativeArea", "name": "West Bengal" },
          { "@type": "AdministrativeArea", "name": "Telangana" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Will Drafting & SRO Registration Plans",
          itemListElement: [
            {
              "@type": "Offer",
              price: "2490",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Auto Verified (Essential Will)",
                description:
                  "Instant plain-paper legally vetted Will draft compliant with Section 63 of the Indian Succession Act, ready for SRO registration.",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Manually Verified (Lawyer Verified)",
                description:
                  "Comprehensive review by a High Court succession advocate, customized clause structuring, and SRO registration checklist.",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Connect to Lawyer (Premium Consultation)",
                description:
                  "1-on-1 strategic consultation with senior counsel, complex multi-asset succession roadmap, and end-to-end SRO coordination.",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Register a Will at the Sub-Registrar Office in India",
        description:
          "Six-step legal procedure to execute, authenticate, and register an Indian Will under the Registration Act, 1908 and Indian Succession Act, 1925.",
        image: imageUrl,
        totalTime: "P3D",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Two Physical Copies of the Will Printed on Plain A4 Sheets",
          },
          {
            "@type": "HowToSupply",
            name: "Original Government Photo ID Cards (Aadhaar & PAN) of Testator and Two Witnesses",
          },
          {
            "@type": "HowToSupply",
            name: "Two Passport-Sized Photographs of Testator and Each Witness",
          },
          {
            "@type": "HowToSupply",
            name: "Registered Medical Practitioner Fitness Certificate (for Elderly Testators)",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Sub-Registrar Biometric Fingerprint Scanner & Live Web Camera",
          },
          {
            "@type": "HowToTool",
            name: "State Land Records Portal (DORIS, IGRS, Kaveri 2.0, TNREGINET)",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Will Legal Vetting & Plain Paper Printing",
            text: "Finalize your Will draft with clear asset schedules, executor nominations, and Section 63 witness blocks. Print on standard white A4 sheets with zero stamp paper required.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Online SRO Appointment & Fee Challan Payment",
            text: "Book an appointment slot on your state land registry portal and pay the nominal government registration fee (typically 100 to 500 rupees).",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Witness Verification under Section 67",
            text: "Select two independent adult witnesses who hold valid government IDs and are not beneficiaries or spouses of beneficiaries under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Sub-Registrar Appearance or Section 31 Home Visit",
            text: "Appear before the Sub-Registrar at your scheduled time, or arrange a private residence visit under Section 31 if the testator is elderly or bedridden.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Biometric Fingerprinting & Registrar Endorsement",
            text: "The Sub-Registrar verifies personal identities, captures live digital photographs and thumb impressions, and endorses the statutory certificate.",
          },
          {
            "@type": "HowToStep",
            position: 6,
            name: "Book 3 Entry & Certified Copy Delivery",
            text: "The registered Will is entered into confidential Book 3. The testator receives the original endorsed Will, and certified copies can be retrieved at any time.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Is Will registration mandatory under Indian law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 18(e) of the Registration Act, 1908, Will registration is optional. An unregistered Will written on plain paper and signed before two witnesses is legally valid under Section 63 of the Indian Succession Act. However, registration before the Sub-Registrar provides strong legal proof and removes suspicions of forgery in court.",
            },
          },
          {
            "@type": "Question",
            name: "What are the government fees for registering a Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Unlike property sale deeds that attract heavy ad-valorem stamp duty of 5% to 7%, Wills are completely exempt from stamp duty across India under the Indian Stamp Act, 1899. Sub-Registrar registration fees are nominal, typically ranging from 100 to 500 rupees depending on your state (such as 100 rupees in Maharashtra and Delhi).",
            },
          },
          {
            "@type": "Question",
            name: "Can the Sub-Registrar visit a senior citizen at home under Section 31?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Section 31 of the Registration Act, 1908 allows the Sub-Registrar to visit a private home or hospital for elderly, sick, or bedridden individuals. You must file a formal application with a doctor's fitness certificate and pay a government attendance fee. AMA Legal Solutions manages this entire doorstep process.",
            },
          },
          {
            "@type": "Question",
            name: "Who can be witnesses for Will registration at the Sub-Registrar Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You need two adult witnesses with valid government photo identification (such as Aadhaar or PAN card). Under Section 67 of the Indian Succession Act, neither the witnesses nor their spouses can be beneficiaries under the Will. Any bequest made to an attesting witness becomes legally void.",
            },
          },
          {
            "@type": "Question",
            name: "What documents are required on the day of Will registration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You need two printed physical copies of the Will on plain A4 paper, original Aadhaar and PAN cards of the testator and two witnesses, two passport-size photographs of each person, property title documents or municipal tax receipts, and an official doctor's fitness certificate for senior citizens.",
            },
          },
          {
            "@type": "Question",
            name: "Is a registered Will public information that anyone can read?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 57(2) of the Registration Act, 1908, registered Wills are recorded in Book 3 (Register of Wills). Book 3 records remain strictly confidential during the testator's lifetime. Nobody, including family members or children, can view or obtain copies of the Will without the testator's written authorization until after the testator's demise.",
            },
          },
          {
            "@type": "Question",
            name: "Can a registered Will be challenged in an Indian court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A registered Will can be challenged, but the burden of proof rests heavily on the challenger under Section 114 of the Indian Evidence Act (now Bharatiya Sakshya Adhiniyam, 2023). The challenger must prove fraud, coercion, or lack of mental capacity. The Supreme Court in Pentakota Satyanarayana held that the Sub-Registrar's official endorsement creates a strong presumption of genuine execution.",
            },
          },
          {
            "@type": "Question",
            name: "How can I change, revoke, or amend a registered Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 62 of the Indian Succession Act, a Will is always revocable during the testator's lifetime. You can amend it by executing a registered Codicil or revoke it completely by executing a fresh registered Will that revokes all earlier instruments. Registering the new instrument at the same Sub-Registrar office prevents conflicting public records.",
            },
          },
          {
            "@type": "Question",
            name: "Can an NRI register an Indian Will without being physically present?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Will can only be registered if the testator appears physically before the Sub-Registrar (or receives a Section 31 home visit in India). A Power of Attorney cannot sign or register a Will on your behalf. However, NRIs can draft their Will online with AMA Legal Solutions and complete registration during their trip to India, or execute a plain-paper Will abroad with two witnesses under Section 63.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the original registered Will is lost or misplaced?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If an original registered Will is lost, you or your named executor can apply for an official certified copy from the Sub-Registrar Office where it was registered. Under Section 76 of the Evidence Act, an official certified copy issued by the Sub-Registrar is admissible as secondary evidence in court and accepted by banks, municipal corporations, and revenue authorities.",
            },
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": "https://www.willdrafting.in/#legalservice",
        name: "WillDrafting by AMA Legal Solutions",
        url: "https://www.willdrafting.in",
        logo: "https://www.willdrafting.in/Logofinal.svg",
        priceRange: "₹2490 - ₹9990",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "1300",
          bestRating: "5",
          worstRating: "1",
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <WillRegistrationClient />
      <Footer />
    </>
  );
}
