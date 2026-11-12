import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HealthcarePowerOfAttorneyClient from "./HealthcarePowerOfAttorneyClient";

const PAGE_URL =
  "https://www.willdrafting.in/templates/durable-power-of-attorney-for-healthcare-format-india";
const OG_IMAGE_URL =
  "https://www.willdrafting.in/images/durable-power-of-attorney-for-healthcare-format-india-og.jpg";
const SEO_TITLE = "Healthcare Power of Attorney Format India | WillDrafting"; // 56 chars
const SEO_DESCRIPTION =
  "Download free Durable Power of Attorney for Healthcare format in India. Appoint medical surrogates under Powers of Attorney Act and Mental Healthcare Act."; // 154 chars

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },
  description: SEO_DESCRIPTION,
  keywords: [
    "durable power of attorney for healthcare format india",
    "medical proxy format india",
    "healthcare surrogate designation form sample",
    "medical power of attorney living will draft",
    "nominated representative form mental healthcare act 2017",
    "section 14 mental healthcare act nominated representative format",
    "powers of attorney act 1882 section 2 medical proxy",
    "common cause 2023 surrogate decision maker india",
    "health care proxy deed format word pdf india",
    "notary attestation certificate healthcare poa india",
    "nri healthcare power of attorney elderly parents india",
    "medical power of attorney coma icu treatment consent india",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-IN": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: PAGE_URL,
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 675,
        alt: "Durable Power of Attorney for Healthcare Format India and Nominated Representative Schedule",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [OG_IMAGE_URL],
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

export default function DurableHealthcarePowerOfAttorneyPage() {
  const faqItems = [
    {
      question:
        "Can I appoint my daughter or spouse as my healthcare proxy in India if I fall into a coma?",
      answer:
        "Yes. You can name your adult daughter, son, or spouse as your medical proxy in writing. Under the Powers of Attorney Act, 1882 Section 2 and the Supreme Court 2023 Living Will rules, hospitals ask for written proof when a patient is in a coma or ICU. Add a Section 14 Schedule under the Mental Healthcare Act, 2017. That way, your proxy can also guide care during stroke, brain injury, or memory loss.",
    },
    {
      question:
        "Is a Durable Power of Attorney for Healthcare legally valid under Indian law?",
      answer:
        "A US-style Durable Power of Attorney does not work on its own in India. Under Section 201 of the Indian Contract Act, 1872, a normal agency ends if you lose sound mind. To keep your deed active, combine three parts in one signed form: Section 2 of the Powers of Attorney Act, 1882, a Section 14 to 17 Mental Healthcare Act clause, and a 2023 Living Will proxy clause.",
    },
    {
      question:
        "What is the difference between a Healthcare Power of Attorney and a Living Will in India?",
      answer:
        "A Living Will tells doctors when to stop life support machines near death. A Durable Power of Attorney for Healthcare does much more. It names a real person to speak for you in any ICU stay. Your proxy can read lab reports, pick a good hospital, approve urgent surgery, and guide your care while you recover.",
    },
    {
      question:
        "What is a Nominated Representative under Sections 14 to 17 of the Mental Healthcare Act, 2017?",
      answer:
        "Under Section 14 of the Mental Healthcare Act, 2017, any adult in India can name a trusted adult in writing as a Nominated Representative. Under Section 17, doctors must ask this person before planning care, admission, or discharge if you lose mental capacity from coma, ICU stress, stroke, or dementia.",
    },
    {
      question:
        "What happens if I do not name a Nominated Representative for dementia or ICU care?",
      answer:
        "If you leave no signed Section 14 note, Section 14(4) sets a fixed legal list: first a relative, then a caregiver, then a board pick, and last a state officer. When siblings or spouses disagree at the ICU door, doctors wait for family consensus. A written form stops that delay fast.",
    },
    {
      question:
        "Does a Medical Power of Attorney require stamp paper, a Notary Public, or registration?",
      answer:
        "Yes, clean signing makes hospitals trust your paper fast. Print the deed on Rs. 100 to Rs. 500 non-judicial e-stamp paper per your State Stamp Act. Sign before two adult witnesses. Next, get a Notary Public or Gazetted Officer stamp. You can also register it under Section 18(f) of the Indian Registration Act, 1908 at a Sub-Registrar office.",
    },
    {
      question:
        "Can an NRI child act as healthcare proxy for elderly parents living in India?",
      answer:
        "Yes. An adult NRI son or daughter can serve as your first medical proxy. Still, flights take hours during an urgent health crisis. Always add a backup proxy who lives near your parents in India. That local person can sign hospital forms in person while the NRI child joins by video call.",
    },
    {
      question:
        "Can doctors withdraw life support based only on a Durable Healthcare Power of Attorney?",
      answer:
        "No. Under the Supreme Court Common Cause order (January 2023), stopping life support needs a valid Living Will plus two doctor boards. Both the Primary Board and Secondary Board must agree in writing. Your medical proxy hands your Living Will to those boards, but cannot switch off machines alone.",
    },
    {
      question:
        "How can I change or revoke my Healthcare Power of Attorney in India?",
      answer:
        "You can cancel or change your medical proxy any time while your mind is clear. Sign a short cancellation note before a Notary Public and tell your doctor and family. If your old deed was registered at the Sub-Registrar office, cancel it there too. Section 14(6) of the Mental Healthcare Act also lets you replace your representative in writing.",
    },
    {
      question:
        "Should my Healthcare Power of Attorney also cover bank payments for hospital bills?",
      answer:
        "No, keep medical choices and bank access separate. Your medical proxy deed covers ICU consent, tests, hospital transfer, and health insurance claims. Paying huge bills from your bank account needs a joint account or a separate bank mandate that follows RBI bank rules.",
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
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: SEO_TITLE,
        description: SEO_DESCRIPTION,
        inLanguage: "en-IN",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          url: "https://www.willdrafting.in",
          name: "WillDrafting.in",
        },
        breadcrumb: {
          "@id": `${PAGE_URL}#breadcrumb`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
          width: 1200,
          height: 675,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
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
            name: "Durable Power of Attorney for Healthcare Format India",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${PAGE_URL}#article`,
        headline: "Durable Power of Attorney for Healthcare Format India",
        description: SEO_DESCRIPTION,
        url: PAGE_URL,
        mainEntityOfPage: {
          "@id": `${PAGE_URL}#webpage`,
        },
        image: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
          width: 1200,
          height: 675,
        },
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Founder & Managing Partner, AMA Legal Solutions",
          url: "https://www.willdrafting.in/about-us",
        },
        publisher: {
          "@id": "https://www.willdrafting.in/#organization",
        },
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        inLanguage: "en-IN",
        encodingFormat: "text/html",
        legislationResponsible: [
          "Powers of Attorney Act, 1882 (Section 2)",
          "Mental Healthcare Act, 2017 (Sections 14-17)",
          "Registration Act, 1908 (Section 18)",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <Navbar />
      <HealthcarePowerOfAttorneyClient faqs={faqItems} />
      <Footer />
    </div>
  );
}
