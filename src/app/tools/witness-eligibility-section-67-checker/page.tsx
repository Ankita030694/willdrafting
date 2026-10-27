import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WitnessEligibilityCheckerClient from "./WitnessEligibilityCheckerClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Who Can Be Witness to a Will in India | WillDrafting.in", // exactly 55 characters
  },
  description:
    "Check who can be a witness to a will in India under Section 67 of Indian Succession Act. Verify doctor, lawyer, and family void bequest risks online.", // exactly 150 characters
  keywords: [
    "who can be witness to a will in india",
    "can wife or son be witness to will",
    "section 67 indian succession act witness rules",
    "can doctor or lawyer be witness to will",
    "beneficiary as witness to will india",
    "executor as witness to will section 68",
    "bharatiya sakshya adhiniyam section 67 will proof",
    "will attestation rules india",
    "can relative be witness to will",
    "christian parsi will section 67 void bequest",
    "hindu will witness schedule iii exception",
    "ama legal solutions will witness eligibility checker",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/witness-eligibility-section-67-checker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/witness-eligibility-section-67-checker",
      "x-default": "https://www.willdrafting.in/tools/witness-eligibility-section-67-checker",
    },
  },
  openGraph: {
    title: "Who Can Be Witness to a Will in India | WillDrafting.in",
    description:
      "Check who can be a witness to a will in India under Section 67 of Indian Succession Act. Verify doctor, lawyer, and family void bequest risks online.",
    url: "https://www.willdrafting.in/tools/witness-eligibility-section-67-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/witness-eligibility-section-67-checker-og.jpg",
        width: 1200,
        height: 675,
        alt: "Who Can Be Witness to a Will in India - Section 67 Checker and Witness Eligibility Rules",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Who Can Be Witness to a Will in India | WillDrafting.in",
    description:
      "Check who can be a witness to a will in India under Section 67 of Indian Succession Act. Verify doctor, lawyer, and family void bequest risks online.",
    images: ["https://www.willdrafting.in/images/witness-eligibility-section-67-checker-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WitnessEligibilityCheckerPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/witness-eligibility-section-67-checker";
  const imageUrl = "https://www.willdrafting.in/images/witness-eligibility-section-67-checker-og.jpg";

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
        name: "Who Can Be Witness to a Will in India | WillDrafting.in",
        description:
          "Check who can be a witness to a will in India under Section 67 of Indian Succession Act. Verify doctor, lawyer, and family void bequest risks online.",
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
            name: "Witness Eligibility & Section 67 Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Will Witness Eligibility & Section 67 Checker India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive statutory checker evaluating witness competency, Section 67 void bequest risk, Section 63(c) attestation validity, and Section 67 BSA 2023 probate court proof standards.",
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
            name: "Who can legally be a witness to a Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 63(c) of the Indian Succession Act, 1925, any person who is 18 years of age or older, of sound mind, and physically capable of seeing the testator sign can be an attesting witness. The witness must have the animus attestandi, meaning the clear legal intent to testify that the testator executed the Will voluntarily.",
            },
          },
          {
            "@type": "Question",
            name: "Can my wife, son, or daughter sign as an attesting witness to my Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Legally, a family member can witness a Will only if they receive no property or benefit under that Will. If a beneficiary or their spouse attests a Christian or Parsi Will, Section 67 makes their bequest completely void. For Hindu, Sikh, and Jain Wills, Section 67 is excluded by Schedule III, but having a beneficiary child or spouse attest creates a heavy suspicious circumstance in court that often leads to the Will being set aside in probate.",
            },
          },
          {
            "@type": "Question",
            name: "What does Section 67 of the Indian Succession Act state?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 67 provides that if any person attests a Will, any bequest or legacy given to that person, or to their wife or husband, shall be entirely void. The execution of the Will remains valid, but the witness and their spouse lose all inheritance under that Will. However, under Section 57 read with Schedule III, this statutory forfeiture does not apply to Hindus, Sikhs, Buddhists, and Jains.",
            },
          },
          {
            "@type": "Question",
            name: "Why is a doctor the best witness for an Indian Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Registered Medical Practitioner (MBBS or MD) can examine the testator immediately prior to signing and endorse a contemporaneous Medical Fitness Certificate directly on the Will. This provides undeniable proof that the testator possessed sound disposing mind and memory, effectively neutralizing future claims of dementia, Alzheimer's, or lack of capacity.",
            },
          },
          {
            "@type": "Question",
            name: "Can the Executor of a Will also be an attesting witness?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 68 of the Indian Succession Act, 1925, no person is disqualified from being a witness merely because they are appointed as an Executor of the Will. As long as the Executor receives no personal beneficial legacy or property under the Will, their attestation is completely valid and court-defensible.",
            },
          },
          {
            "@type": "Question",
            name: "Can a lawyer or Chartered Accountant sign as a witness to a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An independent practicing advocate or Chartered Accountant is an ideal attesting witness. They understand legal formalities, maintain professional contemporaneous files, and provide credible, objective testimony when called to depose in probate court under Section 67 of the Bharatiya Sakshya Adhiniyam, 2023.",
            },
          },
          {
            "@type": "Question",
            name: "How many witnesses are mandatory for a valid Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 63(c) mandates at least two attesting witnesses. While each witness must see the testator sign or receive personal acknowledgment, it is not legally mandatory that both witnesses sign at the exact same moment. However, having both witnesses physically present together during signing is the recommended gold standard.",
            },
          },
          {
            "@type": "Question",
            name: "How is a Will proved in court if the witnesses pass away?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 67 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly Section 68 of the Evidence Act), at least one living attesting witness must be examined in court. If both witnesses have died or cannot be found, Section 68 BSA allows the Will to be proved by establishing the handwriting and signature of at least one witness and the testator.",
            },
          },
          {
            "@type": "Question",
            name: "Can a visually impaired or blind person be an attesting witness to a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 63(c) and established case law, attestation requires physical visual perception of the testator signing the document. A blind person cannot visually verify the act of execution, rendering their attestation legally incompetent.",
            },
          },
          {
            "@type": "Question",
            name: "Is digital signature or Aadhaar eSign valid for a Will witness?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under the First Schedule of the Information Technology Act, 2000, Wills and testamentary dispositions are expressly excluded from electronic signatures. Both the testator and both attesting witnesses must sign physically using ink on paper.",
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
        <WitnessEligibilityCheckerClient />
        <Footer />
      </div>
    </>
  );
}
