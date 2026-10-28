import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillContestRiskCalculatorClient from "./WillContestRiskCalculatorClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Can My Will Be Challenged in Court India | WillDrafting", // exactly 55 characters
  },
  description:
    "Use our free interactive tool to assess if your Will can be challenged in Indian court under the Indian Succession Act. Calculate dispute risk.", // exactly 154 characters
  keywords: [
    "can my will be challenged in court india",
    "how to make an unchallengeable will in india",
    "will dispute risk assessment india",
    "grounds to challenge a will in india",
    "kavita kanwar v pamela mehta suspicious circumstances",
    "shivakumar v sharanabasappa supreme court will",
    "section 59 indian succession act sound mind",
    "section 61 undue influence coercion will",
    "section 63 execution of will attestation witnesses",
    "section 67 void bequest attesting witness beneficiary",
    "disinherit son daughter will legal clause india",
    "ama legal solutions will contest risk calculator",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/will-contest-challenge-risk-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/will-contest-challenge-risk-calculator",
      "x-default": "https://www.willdrafting.in/tools/will-contest-challenge-risk-calculator",
    },
  },
  openGraph: {
    title: "Can My Will Be Challenged in Court India | WillDrafting",
    description:
      "Use our free interactive tool to assess if your Will can be challenged in Indian court under the Indian Succession Act. Calculate dispute risk.",
    url: "https://www.willdrafting.in/tools/will-contest-challenge-risk-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-contest-challenge-risk-calculator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Can My Will Be Challenged in Court India - Litigation Risk Scorecard and Fortification Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Can My Will Be Challenged in Court India | WillDrafting",
    description:
      "Use our free interactive tool to assess if your Will can be challenged in Indian court under the Indian Succession Act. Calculate dispute risk.",
    images: ["https://www.willdrafting.in/images/will-contest-challenge-risk-calculator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillContestChallengeRiskCalculatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/will-contest-challenge-risk-calculator";
  const imageUrl = "https://www.willdrafting.in/images/will-contest-challenge-risk-calculator-og.jpg";

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
        name: "Can My Will Be Challenged in Court India | WillDrafting",
        description:
          "Use our free interactive tool to assess if your Will can be challenged in Indian court under the Indian Succession Act. Calculate dispute risk.",
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
            name: "Will Contest Risk Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Will Contest and Challenge Risk Calculator India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive judicial risk assessment tool quantifying testamentary dispute probability under Indian Succession Act ss. 59, 61, 63 and landmark.",
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
            name: "Can my Will be challenged in court in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Any legal heir or interested person who would inherit under intestate succession can challenge a Will by filing a caveat or lawsuit in civil court. Common grounds include lack of sound mind under Section 59, undue influence or coercion under Section 61, suspicious circumstances under Kavita Kanwar (2020 SC), or failure to comply with two-witness attestation under Section 63.",
            },
          },
          {
            "@type": "Question",
            name: "Can I legally disinherit my married daughter or son in my Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In India, a person has complete testamentary freedom over self-acquired property and can exclude any child or legal heir. However, under the Supreme Court ruling in Shivakumar v. Sharanabasappa (2020), total exclusion of natural heirs is treated as a suspicious circumstance unless the Will explicitly recites the factual, rational reasons for their exclusion.",
            },
          },
          {
            "@type": "Question",
            name: "Does registering a Will make it 100% unchallengeable?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. While registration under Book 3 of the Registration Act, 1908 creates a strong statutory presumption of regular execution and authentic signature, it does not bar a challenge. As held by the Supreme Court in Murthy v. C. Saradambal (2022), if the testator lacked cognitive testamentary capacity or was under undue influence, even a registered Will can be declared null and void.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a beneficiary was present when the Will was drafted and signed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the landmark Supreme Court decision in Kavita Kanwar v. Pamela Mehta (2020), active participation by a major beneficiary (such as hiring the lawyer, dictating terms, arranging witnesses, or staying in the room during execution) casts a heavy cloud of judicial suspicion. The court will deny probate unless the beneficiary proves beyond doubt that the testator acted with independent free will.",
            },
          },
          {
            "@type": "Question",
            name: "Can a beneficiary also sign as an attesting witness to the Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Never. Under Section 67 of the Indian Succession Act, 1925, if a person to whom any bequest or legacy is given signs as an attesting witness, the Will remains valid but the bequest to that person (or their spouse) becomes completely void. Always use two independent witnesses who have zero financial interest in the estate.",
            },
          },
          {
            "@type": "Question",
            name: "Why is a doctor's certificate essential for testators above age 70?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 59 of the Indian Succession Act, a testator must possess a sound disposing state of mind. When a Will is executed by a senior citizen, disinherited relatives frequently allege dementia, memory loss, or delirium. A contemporaneous certificate from a registered MBBS or MD doctor issued on the day of signing provides vital court proof to defeat such allegations.",
            },
          },
          {
            "@type": "Question",
            name: "How can I make my Will unchallengeable in court in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Follow the 5-point fortification protocol: (1) Obtain a same-day doctor certificate of mental capacity, (2) Keep all beneficiaries outside the room during drafting and execution, (3) Include clear recital clauses explaining unequal shares or disinheritance, (4) Register the Will before the Sub-Registrar Office, and (5) Record a continuous video of the testator answering testamentary capacity questions.",
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
        <WillContestRiskCalculatorClient />
        <Footer />
      </div>
    </>
  );
}
