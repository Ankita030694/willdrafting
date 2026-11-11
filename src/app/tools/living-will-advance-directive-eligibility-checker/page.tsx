import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LivingWillCheckerClient from "./LivingWillCheckerClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Living Will Eligibility Checker India | WillDrafting", // exactly 52 characters
  },
  description:
    "Check living will eligibility in India under Supreme Court 2023 guidelines. Verify adult capacity, executor, and medical board compliance in minutes.", // exactly 149 characters
  keywords: [
    "living will eligibility checker india",
    "advance medical directive checklist india",
    "supreme court living will guidelines 2023",
    "who can make advance directive india",
    "common cause v union of india 2023 modified order",
    "two tier hospital medical board living will",
    "article 21 right to die with dignity",
    "passive euthanasia guidelines india",
    "advance medical directive executor guardian",
    "living will registration notary gazetted officer",
    "jmfc custodian advance medical directive",
    "ama legal solutions living will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/living-will-advance-directive-eligibility-checker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/living-will-advance-directive-eligibility-checker",
      "x-default": "https://www.willdrafting.in/tools/living-will-advance-directive-eligibility-checker",
    },
  },
  openGraph: {
    title: "Living Will Eligibility Checker India | WillDrafting",
    description:
      "Check living will eligibility in India under Supreme Court 2023 guidelines. Verify adult capacity, executor, and medical board compliance in minutes.",
    url: "https://www.willdrafting.in/tools/living-will-advance-directive-eligibility-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/living-will-advance-directive-eligibility-checker-og.jpg",
        width: 1200,
        height: 675,
        alt: "Living Will and Advance Directive Eligibility Checker India under Supreme Court 2023 Order",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Living Will Eligibility Checker India | WillDrafting",
    description:
      "Check living will eligibility in India under Supreme Court 2023 guidelines. Verify adult capacity, executor, and medical board compliance in minutes.",
    images: ["https://www.willdrafting.in/images/living-will-advance-directive-eligibility-checker-og.jpg"],
    site: "@willdrafting",
    creator: "@willdrafting",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function LivingWillEligibilityCheckerPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/living-will-advance-directive-eligibility-checker";
  const imageUrl =
    "https://www.willdrafting.in/images/living-will-advance-directive-eligibility-checker-og.jpg";

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
        name: "Living Will Eligibility Checker India | WillDrafting",
        description:
          "Check living will eligibility in India under Supreme Court 2023 guidelines. Verify adult capacity, executor, and medical board compliance in minutes.",
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
            name: "Living Will Eligibility Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Living Will & Advance Directive Eligibility Checker India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free diagnostic legal tool to check eligibility and compliance for executing an Advance Medical Directive (Living Will) in India under modified 2023 Supreme Court guidelines.",
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
            name: "Who is legally eligible to make a Living Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the Supreme Court guidelines in Common Cause v. Union of India, any adult of sound mind who has attained majority (18 years or older) under the Indian Majority Act 1875 can execute an Advance Medical Directive. The person must give voluntary, informed consent without any coercion, fraud, or undue influence.",
            },
          },
          {
            "@type": "Question",
            name: "What changed between the 2018 and 2023 Supreme Court Living Will rulings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Supreme Court simplified the execution process in January 2023 (MA No. 1699/2019). The directive no longer requires physical counter-signing by a Judicial Magistrate First Class (JMFC). It can now be executed before a Notary Public or Gazetted Officer in the presence of two witnesses. The hospital medical board review process was also streamlined to two tiers of three doctors each, operating within strict 48-hour timelines.",
            },
          },
          {
            "@type": "Question",
            name: "Is a Living Will legally enforceable against hospital doctors in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The 5-judge Constitution Bench held that the right to die with dignity is a fundamental right under Article 21 of the Constitution. An Advance Medical Directive executed in accordance with Supreme Court guidelines is legally binding on treating physicians and hospital administrations, shielding them from civil and criminal liability when withdrawing futile life support.",
            },
          },
          {
            "@type": "Question",
            name: "What medical treatments can I refuse in an Advance Medical Directive?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can refuse invasive mechanical ventilation, cardiopulmonary resuscitation (CPR), artificial cardiac pacing, blood transfusions, hemodialysis, and artificial hydration or enteral tube feeding when in a terminal condition or persistent vegetative state. Active euthanasia or lethal injections remain strictly prohibited under Indian penal law.",
            },
          },
          {
            "@type": "Question",
            name: "Who can I appoint as my healthcare executor or surrogate proxy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can appoint any adult individual whom you trust, such as a spouse, adult child, sibling, close relative, or trusted friend. The 2023 modified orders permit you to name more than one executor or surrogate in order of priority (primary executor and alternate executor) to make informed medical choices if you lose decision-making capacity.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Judicial Magistrate (JMFC) still need to countersign the Living Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under the 2023 modified order, the JMFC no longer acts as an ex-ante roadblock who must sign the paper beforehand. Instead, the person executes the paper before a Notary Public or Gazetted Officer. A copy is sent to the competent municipal or sub-registrar custodian and informed to the JMFC registry for safe custody.",
            },
          },
          {
            "@type": "Question",
            name: "Can I revoke or alter my Advance Medical Directive after making it?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An individual retains an absolute legal right to revoke, amend, or rewrite their Advance Medical Directive at any time during their life, provided they are in a sound state of mind. Revocation can be executed in writing and delivered to the designated surrogate, treating physician, and custodian registry.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a Living Will and a traditional Property Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A traditional testamentary Will takes effect only after death to distribute real estate, bank balances, shares, and physical assets under the Indian Succession Act 1925. In contrast, a Living Will operates during your lifetime while you are alive but incapacitated, directing medical care, hospital interventions, and dignity at the end of life under Article 21.",
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
        <LivingWillCheckerClient />
        <Footer />
      </div>
    </>
  );
}
