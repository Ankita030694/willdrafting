import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LivingWillFormatIndiaClient from "./LivingWillFormatIndiaClient";

export const metadata: Metadata = {
  title: {
    absolute: "Living Will Format India: 2023 Guidelines | WillDrafting",
  },
  description:
    "Download a valid living will format in India under 2023 SC rules. Free advance medical directive template with notary attestation and hospital.",
  keywords: [
    "living will format india",
    "advance medical directive india",
    "living will procedure 2023",
    "advance directive format",
    "passive euthanasia will india",
    "common cause v union of india 2023",
    "living will notary attestation",
    "article 21 right to die with dignity",
    "medical board living will india",
    "surrogate healthcare attorney india",
    "living will format word pdf",
    "ama legal solutions living will",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/living-will-format-india",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/living-will-format-india",
      "x-default": "https://www.willdrafting.in/templates/living-will-format-india",
    },
  },
  openGraph: {
    title: "Living Will Format India: 2023 Guidelines | WillDrafting",
    description:
      "Download a valid living will format in India under 2023 SC rules. Free advance medical directive template with notary attestation and hospital.",
    url: "https://www.willdrafting.in/templates/living-will-format-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/living-will-format-india-og.jpg",
        width: 1200,
        height: 630,
        alt: "Living Will Format in India Advance Medical Directive and 2023 Supreme Court Guidelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Living Will Format India: 2023 Guidelines | WillDrafting",
    description:
      "Download a valid living will format in India under 2023 SC rules. Free advance medical directive template with notary attestation and hospital.",
    images: ["https://www.willdrafting.in/images/living-will-format-india-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function LivingWillFormatIndiaPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/living-will-format-india";
  const imageUrl = "https://www.willdrafting.in/images/living-will-format-india-og.jpg";

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
        name: "Living Will Format India: 2023 Guidelines | WillDrafting",
        description:
          "Download a valid living will format in India under 2023 SC rules. Free advance medical directive template with notary attestation and hospital.",
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
            name: "Living Will Format India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Execute a Legally Valid Living Will in India",
        description:
          "Step-by-step statutory procedure to execute an Advance Medical Directive (Living Will) in India under the simplified 2023 Supreme Court.",
        image: imageUrl,
        totalTime: "PT20M",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Plain White A4 Paper or Legal Sheet (No Stamp Duty Required)",
          },
          {
            "@type": "HowToSupply",
            name: "Identity Proof (Aadhaar / PAN Card of Testator and Surrogates)",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Fountain or Ballpoint Pen for Physical Signatures",
          },
          {
            "@type": "HowToTool",
            name: "Seal and Registration Stamp of Notary Public or Gazetted Officer",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Draft Medical Directives and Treatment Limitations",
            text: "Explicitly record treatment wishes regarding ventilators, CPR, artificial nutrition, and pain management in the event of terminal illness or persistent vegetative state.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Appoint Primary and Alternate Surrogate Decision-Makers",
            text: "Designate trusted family members or friends who will convey your instructions and give consent to treating physicians when you cannot communicate.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Print on Standard Plain Paper",
            text: "Print the finalized Advance Medical Directive text on plain white A4 paper. No non-judicial stamp paper is required under Indian law.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Sign Before Two Independent Witnesses",
            text: "Sign or mark every page of the document in the direct physical presence of two independent adult witnesses who attest to your sound disposing mind.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Attestation by a Notary Public or Gazetted Officer",
            text: "Have the signed document authenticated by a practicing Notary Public or Gazetted Officer, who certifies that the execution was voluntary. No Judicial Magistrate is required under the 2023 Supreme Court order.",
          },
          {
            "@type": "HowToStep",
            position: 6,
            name: "Deposit Certified Copies with Custodians and Digital Registry",
            text: "Provide certified copies to your named surrogate, your family physician, and the designated custodian at your local municipal corporation or digital health account (ABHA).",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Is a Living Will legally valid and enforceable in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In the landmark Common Cause v. Union of India judgments of 2018 and January 2023, a five-judge Constitution Bench of the Supreme Court held that the right to die with dignity is an inseparable part of the right to life under Article 21 of the Constitution.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need to visit a magistrate court to execute a Living Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court January 2023 order completely removed the requirement for countersigning before a Judicial Magistrate First Class (JMFC). You only need attestation by a Notary Public or a Gazetted Officer in the presence of two witnesses.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Living Will be written on plain paper, or is stamp paper needed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Living Will does not require non-judicial stamp paper. It can be printed on standard white A4 paper. Stamp duty applies only to financial conveyances under the Indian Stamp Act, not personal medical directives.",
            },
          },
          {
            "@type": "Question",
            name: "Who can act as an attesting witness to a Living Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Any two competent adults who possess mental capacity can attest the document. They must sign in your physical presence confirming that you executed the directive voluntarily and understood its implications.",
            },
          },
          {
            "@type": "Question",
            name: "What is the role of a surrogate decision-maker in an Advance Directive?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A surrogate decision-maker is a trusted person you appoint to act as your healthcare attorney. If you become incapacitated, they liaise with treating doctors, present your living will, and give consent for palliative care or withdrawal of futile treatment.",
            },
          },
          {
            "@type": "Question",
            name: "Who decides when an Advance Medical Directive takes effect in hospital?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The living will activates only when you lose decision-making capacity and are diagnosed with terminal illness. Two medical panels (Primary Medical Board and Secondary Medical Board of 3 doctors each) must both certify that further treatment is medically futile.",
            },
          },
          {
            "@type": "Question",
            name: "Can I revoke or modify my Living Will after signing it?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An Advance Medical Directive is revocable at any time during your lifetime while you are of sound mind. You can revoke it by simple written notice to your surrogate and doctor, or by destroying physical copies.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a Living Will and a regular property Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A regular Will under the Indian Succession Act governs the distribution of your property after death. A Living Will (Advance Medical Directive) operates solely while you are alive and incapacitated, governing end-of-life medical care and life-support withdrawal.",
            },
          },
          {
            "@type": "Question",
            name: "Does an Advance Medical Directive permit active euthanasia in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Indian law strictly distinguishes between passive and active euthanasia. A Living Will permits only passive euthanasia, which is the withholding or withdrawal of artificial life support. Administering lethal substances remains a criminal offense.",
            },
          },
          {
            "@type": "Question",
            name: "Where should I keep or register copies of my executed Living Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Keep the original safely at home. Provide certified copies to your primary surrogate, your alternate surrogate, and your family physician. A copy can also be deposited with the local municipal authority or linked to your digital health records (ABHA).",
            },
          },
        ],
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
      <LivingWillFormatIndiaClient />
      <Footer />
    </>
  );
}
