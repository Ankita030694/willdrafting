import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HostileWitnessCheckerClient from "./HostileWitnessCheckerClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Hostile Witness Will Proof Checker BSA | WillDrafting", // exactly 53 characters
  },
  description:
    "Assess legal strategies to prove a will when an attesting witness turns hostile in probate court under Section 68 BSA 2023. Evaluate alternate evidence.", // exactly 152 characters
  keywords: [
    "proving will when witness turns hostile checker",
    "section 68 bsa will proof checklist",
    "hostile attesting witness evidence will india",
    "section 71 evidence act proof of execution tool",
    "section 70 bsa proof when attesting witness denies execution",
    "janki narayan bhoir v narayan namdeo kadam",
    "babu singh v ram sahai supreme court",
    "jagdish chand sharma v narain singh saini",
    "attesting witness denies signature will probate",
    "sub registrar summons will proof book 3",
    "scribe testimony to prove registered will india",
    "high court testamentary suit contested will defense",
    "ama legal solutions testamentary litigation",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/hostile-witness-will-proof-bsa-section-68-checker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/hostile-witness-will-proof-bsa-section-68-checker",
      "x-default": "https://www.willdrafting.in/tools/hostile-witness-will-proof-bsa-section-68-checker",
    },
  },
  openGraph: {
    title: "Hostile Witness Will Proof Checker BSA | WillDrafting",
    description:
      "Assess legal strategies to prove a will when an attesting witness turns hostile in probate court under Section 68 BSA 2023. Evaluate alternate evidence.",
    url: "https://www.willdrafting.in/tools/hostile-witness-will-proof-bsa-section-68-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/hostile-witness-will-proof-bsa-section-68-checker-og.jpg",
        width: 1200,
        height: 675,
        alt: "Hostile Witness Will Proof Checker under Section 68 and 70 BSA India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hostile Witness Will Proof Checker BSA | WillDrafting",
    description:
      "Assess legal strategies to prove a will when an attesting witness turns hostile in probate court under Section 68 BSA 2023. Evaluate alternate evidence.",
    images: ["https://www.willdrafting.in/images/hostile-witness-will-proof-bsa-section-68-checker-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function HostileWitnessWillProofPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/hostile-witness-will-proof-bsa-section-68-checker";
  const imageUrl = "https://www.willdrafting.in/images/hostile-witness-will-proof-bsa-section-68-checker-og.jpg";

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
        name: "Hostile Witness Will Proof Checker BSA | WillDrafting",
        description:
          "Assess legal strategies to prove a will when an attesting witness turns hostile in probate court under Section 68 BSA 2023. Evaluate alternate evidence.",
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
            name: "Tools",
            item: "https://www.willdrafting.in/tools",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Hostile Witness Will Proof Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Hostile Witness Will Proof Checker BSA",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive diagnostic tool to assess evidentiary strategies for proving a contested Will when an attesting witness turns hostile, colludes, or denies execution under Sections 67, 68 and 70 of the Bharatiya Sakshya Adhiniyam, 2023.",
        image: imageUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Does a Will fail automatically if an attesting witness turns hostile in court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A Will does not fail simply because an attesting witness turns hostile or denies signing. Under Section 70 of the Bharatiya Sakshya Adhiniyam, 2023 (erstwhile Section 71 of the Indian Evidence Act, 1872), if an attesting witness denies or does not recollect execution, the propounder is permitted to prove execution by other evidence, including the scribe, the drafting advocate, the Sub-Registrar, and forensic handwriting analysis.",
            },
          },
          {
            "@type": "Question",
            name: "What is the mandatory Janki Bhoir rule established by the Supreme Court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Janki Narayan Bhoir v. Narayan Namdeo Kadam (2003) 2 SCC 91, the Supreme Court ruled that a propounder cannot bypass available attesting witnesses. If the first witness turns hostile or fails to prove attestation, the propounder cannot immediately jump to alternate evidence under Section 70 BSA if the second attesting witness is alive, capable of testifying, and subject to court process. The surviving witness must first be summoned.",
            },
          },
          {
            "@type": "Question",
            name: "How does Section 70 BSA save a Will when witnesses deny execution?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 70 of the Bharatiya Sakshya Adhiniyam, 2023 acts as a statutory safety net. It provides that when attesting witnesses deny or do not recollect the execution, the propounder can lead other evidence. This includes producing the document scribe, the doctor who certified testamentary capacity, the registration records from the Sub-Registrar Office, and cross-examining the hostile witness.",
            },
          },
          {
            "@type": "Question",
            name: "Can a document scribe or drafting advocate prove execution of the Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. When attesting witnesses turn hostile or have passed away, the testimony of the scribe who drafted the Will or the advocate who typed and oversaw execution is admissible and highly persuasive under Section 70 BSA, provided they depose that they saw the testator sign and the attesting witnesses append signatures in each other's presence.",
            },
          },
          {
            "@type": "Question",
            name: "How does Sub-Registrar registration help overcome a hostile witness?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 60 of the Registration Act, 1908, the Sub-Registrar's endorsement creates a strong legal presumption of due execution. The propounder can summon the Sub-Registrar and the official Book 3 register under Order XVI Rule 1 of the CPC to show that the testator and witnesses appeared in person, provided biometrics, and admitted execution before a public officer.",
            },
          },
          {
            "@type": "Question",
            name: "What legal action can be taken against a bribed or colluding hostile witness?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If an attesting witness commits perjury by falsely denying their genuine signature after being influenced by opposing heirs, the propounder can file an application under Section 340 of the CrPC (now Section 379 BNSS) for criminal prosecution for perjury, alongside summoning their admitted signatures from bank accounts or voter IDs for forensic comparison under Section 72 BSA.",
            },
          },
          {
            "@type": "Question",
            name: "Can handwriting experts prove the signature of a hostile witness under Section 72 BSA?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 72 of the Bharatiya Sakshya Adhiniyam, 2023 (erstwhile Section 73 of the Indian Evidence Act), the court or a forensic handwriting expert can compare the disputed signature on the Will with admitted genuine signatures of the witness taken from government registers, driving licenses, bank KYC documents, or specimen signatures taken in open court.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if one attesting witness is dead and the other turns hostile?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the Supreme Court ruling in Babu Singh v. Ram Sahai (2008), when one attesting witness is dead and the surviving witness denies execution, the propounder can prove the deceased witness's signature under Section 68 BSA (erstwhile Section 69 IEA) and invoke Section 70 BSA to introduce the scribe, registration records, and treating physician to establish valid execution.",
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
        <HostileWitnessCheckerClient />
        <Footer />
      </div>
    </>
  );
}
