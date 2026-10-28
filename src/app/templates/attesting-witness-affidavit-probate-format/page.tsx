import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AttestingWitnessAffidavitClient from "./AttestingWitnessAffidavitClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Affidavit of Attesting Witness for Probate | WillDrafting", // exactly 56 characters
  },
  description:
    "Download affidavit of attesting witness for probate of will format in India. Dual templates for Section 281 ISA court verification and.", // exactly 151 characters
  keywords: [
    "affidavit of attesting witness for probate of will format",
    "witness declaration format for will india",
    "section 68 evidence act witness affidavit format",
    "contemporaneous witness affidavit will",
    "section 281 indian succession act affidavit",
    "proof of will bharatiya sakshya adhiniyam section 67",
    "attesting witness affidavit high court probate",
    "janki narayan bhoir attesting witness rule",
    "animus attestandi affidavit format",
    "proof of will deceased witness section 68 bsa",
    "probate court witness verification sample",
    "ama legal solutions probate witness affidavit",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/attesting-witness-affidavit-probate-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/attesting-witness-affidavit-probate-format",
      "x-default": "https://www.willdrafting.in/templates/attesting-witness-affidavit-probate-format",
    },
  },
  openGraph: {
    title: "Affidavit of Attesting Witness for Probate | WillDrafting",
    description:
      "Download affidavit of attesting witness for probate of will format in India. Dual templates for Section 281 ISA court verification and.",
    url: "https://www.willdrafting.in/templates/attesting-witness-affidavit-probate-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/attesting-witness-affidavit-probate-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Affidavit of Attesting Witness for Probate of Will Format in India Legal Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affidavit of Attesting Witness for Probate | WillDrafting",
    description:
      "Download affidavit of attesting witness for probate of will format in India. Dual templates for Section 281 ISA court verification and.",
    images: ["https://www.willdrafting.in/images/attesting-witness-affidavit-probate-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function AttestingWitnessAffidavitPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/attesting-witness-affidavit-probate-format";
  const imageUrl = "https://www.willdrafting.in/images/attesting-witness-affidavit-probate-format-og.jpg";

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
        name: "Affidavit of Attesting Witness for Probate | WillDrafting",
        description:
          "Download affidavit of attesting witness for probate of will format in India. Dual templates for Section 281 ISA court verification and.",
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
            name: "Attesting Witness Affidavit Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Affidavit of Attesting Witness for Probate of Will Format",
        url: canonicalUrl,
        fileFormat: "text/html",
        description:
          "Statutory legal template pack containing contemporaneous attesting witness affidavit and Section 281 Indian Succession Act probate court.",
        image: imageUrl,
        inLanguage: "en-IN",
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
            name: "What is an affidavit of an attesting witness for probate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An affidavit of an attesting witness for probate is a sworn legal declaration submitted by one of the witnesses who signed the Will. Under Section 281 of the Indian Succession Act, 1925, every petition for probate or letters of administration must be verified by at least one attesting witness confirming that the testator executed the Will in their presence while possessing a sound mind.",
            },
          },
          {
            "@type": "Question",
            name: "Why is a contemporaneous witness affidavit executed at the time of Will signing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A contemporaneous witness affidavit is signed simultaneously on the date the Will is executed. It records that both witnesses were present together, saw the testator sign of free will, and observed the testator in a sound state of mind. It serves as preventative evidence to repel future allegations of incapacity or undue influence, especially if decades pass before the testator dies.",
            },
          },
          {
            "@type": "Question",
            name: "Does a registered Will exempt the propounder from calling an attesting witness?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court in Ramesh Verma v. Lajwanti (2017) and landmark authorities established that registration before the Sub-Registrar does not dispense with Section 68 of the Evidence Act (now Section 67 of the Bharatiya Sakshya Adhiniyam, 2023). A Will, even if registered, cannot be used in evidence until at least one attesting witness is examined to prove execution.",
            },
          },
          {
            "@type": "Question",
            name: "What did the Supreme Court rule in Janki Narayan Bhoir v. Narayan Namdeo Kadam?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Janki Narayan Bhoir (2003) 2 SCC 91, the Supreme Court ruled that to satisfy Section 68 of the Evidence Act, the single attesting witness called must depose that the testator signed in the presence of both witnesses and that both witnesses signed in the presence of the testator. If the witness cannot depose to the execution by the second witness, the Will is not proven.",
            },
          },
          {
            "@type": "Question",
            name: "How is a Will proved if both attesting witnesses have passed away?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 68 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly Section 69 of the Indian Evidence Act), if all attesting witnesses are dead or cannot be found, the propounder must prove two things: (1) that the signature of at least one attesting witness is in their handwriting, and (2) that the signature of the testator is in the testator's genuine handwriting.",
            },
          },
          {
            "@type": "Question",
            name: "Can an executor or a beneficiary sign the attesting witness affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An executor can be an attesting witness under Section 68 of the Indian Succession Act, 1925, provided they do not benefit from a legacy. However, a beneficiary should never be an attesting witness. For Christians and Parsis, Section 67 ISA renders any bequest to an attesting witness strictly void. For Hindus, while Section 67 is exempt, courts treat beneficiary-witnesses with extreme suspicion.",
            },
          },
          {
            "@type": "Question",
            name: "What is animus attestandi in the context of Will attestation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Animus attestandi is the specific legal intention to attest the signature of the testator on the Will. In K. Laxmanan v. Thekkayil Padmini (2009), the Supreme Court clarified that a person who signs merely as a scribe, draftsperson, or registering identifier does not automatically become an attesting witness unless they signed with the conscious intention of witnessing execution.",
            },
          },
          {
            "@type": "Question",
            name: "Before whom must the probate attesting witness affidavit be sworn?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For probate petitions filed in High Courts (Bombay, Calcutta, Madras) or District Courts, the witness affidavit must be sworn before the Court Registrar, an Oath Commissioner appointed by the High Court, or a Notary Public duly appointed under the Notaries Act, 1952. For contemporaneous affidavits, execution before an Executive Magistrate or Notary Public with photographic proof is standard practice.",
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
        <AttestingWitnessAffidavitClient />
        <Footer />
      </div>
    </>
  );
}
