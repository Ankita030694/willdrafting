import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorMedicalFitnessClient from "./DoctorMedicalFitnessClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Doctor Medical Fitness Certificate Will | WillDrafting", // exactly 54 characters
  },
  description:
    "Download official doctor medical fitness certificate format for will registration in India. Proven sound mind draft for elderly and bedridden testators.", // exactly 152 characters
  keywords: [
    "medical certificate of fitness for will format india",
    "doctor mental fitness certificate will sample",
    "registered medical practitioner certificate sound mind draft",
    "form of certificate for bedridden testator",
    "section 59 indian succession act sound disposing mind",
    "mmse score checklist testamentary capacity india",
    "nmc guidelines medical fitness certificate will",
    "bharatiya sakshya adhiniyam section 45 section 39 expert opinion",
    "sub registrar home visit medical certificate section 38",
    "mbbs doctor certificate for 80 year old will registration",
    "senior citizen will doctor witness format india",
    "ama legal solutions will registration assistance",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/templates/doctor-medical-fitness-certificate-for-will-format",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/templates/doctor-medical-fitness-certificate-for-will-format",
      "x-default":
        "https://www.willdrafting.in/templates/doctor-medical-fitness-certificate-for-will-format",
    },
  },
  openGraph: {
    title: "Doctor Medical Fitness Certificate Will | WillDrafting",
    description:
      "Download official doctor medical fitness certificate format for will registration in India. Proven sound mind draft for elderly and bedridden testators.",
    url: "https://www.willdrafting.in/templates/doctor-medical-fitness-certificate-for-will-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/doctor-medical-fitness-certificate-for-will-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Doctor Medical Fitness Certificate Format for Will Registration India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Doctor Medical Fitness Certificate Will | WillDrafting",
    description:
      "Download official doctor medical fitness certificate format for will registration in India. Proven sound mind draft for elderly and bedridden testators.",
    images: [
      "https://www.willdrafting.in/images/doctor-medical-fitness-certificate-for-will-format-og.jpg",
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

export default function DoctorMedicalFitnessCertificatePage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/doctor-medical-fitness-certificate-for-will-format";
  const imageUrl =
    "https://www.willdrafting.in/images/doctor-medical-fitness-certificate-for-will-format-og.jpg";

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
        name: "Doctor Medical Fitness Certificate Will | WillDrafting",
        description:
          "Download official doctor medical fitness certificate format for will registration in India. Proven sound mind draft for elderly and bedridden testators.",
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
            name: "Templates",
            item: "https://www.willdrafting.in/templates",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Doctor Medical Fitness Certificate for Will Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        headline: "Doctor Medical Fitness Certificate Format for Will in India",
        name: "Doctor Medical Fitness Certificate Format for Will Registration India",
        url: canonicalUrl,
        fileFormat: "text/html",
        isAccessibleForFree: true,
        inLanguage: "en-IN",
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        description:
          "Court-tested Registered Medical Practitioner certificate format for senior citizen and bedridden testators under Section 59 Indian Succession Act, NMC rules, and MMSE cognitive scoring.",
        image: imageUrl,
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Estate Counsel",
        },
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Is a doctor medical fitness certificate mandatory for Will registration in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Indian Succession Act, 1925 does not make a doctor certificate mandatory for every Will. However, Sub-Registrars across India routinely require an MBBS or MD doctor certificate when a testator is above 70 or 80 years old, physically frail, or bedridden. Even for an unregistered Will, a same-day medical certificate is vital proof of sound disposing mind under Section 59.",
            },
          },
          {
            "@type": "Question",
            name: "Which doctor can sign a mental fitness certificate for a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Any Registered Medical Practitioner (RMP) holding at least an MBBS degree and an active State Medical Council or National Medical Commission (NMC) registration number can issue the certificate. If the testator has a history of stroke, dementia, or psychiatric care, an MD Physician, Neurologist, or Psychiatrist gives stronger weight in probate court.",
            },
          },
          {
            "@type": "Question",
            name: "Why do generic two-line doctor notes fail in Indian probate courts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A bare prescription note saying 'patient is fit' fails because Bharatiya Sakshya Adhiniyam Section 45 (and Section 39 on expert opinions) makes the clinical grounds of an expert opinion relevant. Courts reject vague notes that omit the testator's ID check, date and time of exam, MMSE cognitive scores, medication review, and Section 59 comprehension findings.",
            },
          },
          {
            "@type": "Question",
            name: "What MMSE score supports testamentary sound mind for a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "On the 30-point Mini-Mental State Examination (MMSE), a score between 24 and 30 indicates normal cognitive function. A score between 19 and 23 shows mild impairment, where a Will may still be valid during a lucid interval under Explanation 3 to Section 59 if a specialist documents clear asset and family recall.",
            },
          },
          {
            "@type": "Question",
            name: "What medical certificate is needed for a bedridden testator home visit by the Sub-Registrar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Sections 31 and 38 of the Registration Act, 1908, a person unable to visit the Sub-Registrar Office due to bodily infirmity is exempt from personal appearance. The doctor certificate must state both facts: first, that the testator cannot travel safely, and second, that they are mentally alert and able to execute a Will.",
            },
          },
          {
            "@type": "Question",
            name: "Can a beneficiary stay in the room during the doctor examination?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under landmark Supreme Court rulings including H. Venkatachala Iyengar and Kavita Kanwar v. Pamela Mehta, active participation by a favored beneficiary creates suspicious circumstances. The doctor should examine the testator alone so the certificate proves free will and zero undue influence under Section 61.",
            },
          },
          {
            "@type": "Question",
            name: "Should the doctor certificate be dated on the exact day of Will signing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Testamentary capacity under Section 59 is judged at the exact time the Will is signed. A certificate issued weeks earlier or months later carries weak evidentiary value. Obtain the certificate on the same morning or within hours before signing and Sub-Registrar presentation.",
            },
          },
          {
            "@type": "Question",
            name: "Can the same doctor also act as an attesting witness on the Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, provided the doctor is not a beneficiary or spouse of a beneficiary under Section 67 of the Indian Succession Act. Having the examining doctor sign both the Medical Fitness Certificate and as one of the two attesting witnesses under Section 63 creates strong protection against court challenges.",
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
      <div className="min-h-screen bg-[#FAF7F0] text-[#172228] antialiased">
        <Navbar />
        <DoctorMedicalFitnessClient />
        <Footer />
      </div>
    </>
  );
}
