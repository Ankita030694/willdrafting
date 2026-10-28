import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExecutorTimelineClient from "./ExecutorTimelineClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Executor of Will Checklist India | WillDrafting.in", // exactly 51 characters
  },
  description:
    "Free executor of will checklist India tool. Track 90-day executor duties, probate rules under Indian Succession Act, asset freezing, and.", // exactly 153 characters
  keywords: [
    "executor of will checklist india",
    "what to do after been named executor of will",
    "executor timeline india",
    "duties of executor step by step",
    "indian succession act section 316 to 369",
    "executor duties 90 day roadmap india",
    "section 159 income tax act legal representative",
    "executor assent section 332 indian succession act",
    "section 317 inventory and accounts deadline",
    "mandatory probate cities mumbai chennai kolkata",
    "executor devastavit liability section 369",
    "ama legal solutions probate advocate",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/executor-duties-90-day-timeline-generator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/executor-duties-90-day-timeline-generator",
      "x-default": "https://www.willdrafting.in/tools/executor-duties-90-day-timeline-generator",
    },
  },
  openGraph: {
    title: "Executor of Will Checklist India | WillDrafting.in",
    description:
      "Free executor of will checklist India tool. Track 90-day executor duties, probate rules under Indian Succession Act, asset freezing, and.",
    url: "https://www.willdrafting.in/tools/executor-duties-90-day-timeline-generator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/executor-duties-90-day-timeline-generator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Executor of Will Checklist India - 90-Day Statutory Roadmap and Duties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executor of Will Checklist India | WillDrafting.in",
    description:
      "Free executor of will checklist India tool. Track 90-day executor duties, probate rules under Indian Succession Act, asset freezing, and.",
    images: ["https://www.willdrafting.in/images/executor-duties-90-day-timeline-generator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ExecutorDutiesTimelinePage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/executor-duties-90-day-timeline-generator";
  const imageUrl = "https://www.willdrafting.in/images/executor-duties-90-day-timeline-generator-og.jpg";

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
        name: "Executor of Will Checklist India | WillDrafting.in",
        description:
          "Free executor of will checklist India tool. Track 90-day executor duties, probate rules under Indian Succession Act, asset freezing, and.",
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
            name: "Executor Duties 90-Day Timeline",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Executor Duties 90-Day Timeline & Statutory Checklist Tool India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Personalized 90-day and 180-day Indian executor roadmap generating legal deadlines under Indian Succession Act, 1925 (Sections 316-369).",
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
            name: "What should an executor do first after the death of the testator?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 316 of the Indian Succession Act, 1925, the executor's immediate legal duty is to provide a suitable funeral for the deceased according to their religious rites and station in life. Under Section 319, necessary funeral and medical expenses hold first legal charge on the deceased estate and must be paid before any other debts or legacies.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate mandatory for an executor to act in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Sections 57 and 213 of the Indian Succession Act, 1925, probate is needed for Wills made by Hindus, Buddhists, Sikhs, and Jains only if signed within the ordinary original civil area of the High Courts of Mumbai, Chennai, or Kolkata, or if land asset bequeathed is located within these cities. Outside these presidency towns, probate is a choice unless demanded by institutions or contested by heirs.",
            },
          },
          {
            "@type": "Question",
            name: "What is the statutory deadline to exhibit an asset inventory in court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 317(1) of the Indian Succession Act, 1925, an executor who has been granted probate must exhibit a full and true inventory of all asset in possession and credits within 6 months from the grant. The executor must also exhibit a full account of the care of the estate within 1 year.",
            },
          },
          {
            "@type": "Question",
            name: "What is the legal order of paying debts from a deceased estate in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The legal hierarchy under Sections 319 to 323 is: (1) Funeral and deathbed medical expenses (Section 319), (2) Expenses of obtaining probate and legal care (Section 320), (3) Wages of domestic servants and laborers for 3 months preceding death (Section 321), (4) All other unsecured debts rateably and equally (Section 322). All debts must be fully cleared before any specific or general legacies are distributed (Section 323).",
            },
          },
          {
            "@type": "Question",
            name: "What are the executor's tax duties under Section 159 of the Income Tax Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 159 of the Income Tax Act, 1961, the executor or legal agent is deemed to be an assessee liable to file the income tax return of the deceased for income earned up to the date of death and pay any outstanding taxes. The executor's personal liability is strictly capped at the value of the estate assets that come into their possession.",
            },
          },
          {
            "@type": "Question",
            name: "What is executor assent under Section 332 of the Indian Succession Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 332, the assent of the executor is legally necessary to complete a legatee's title to any specific bequest. Until the executor assents, legal title remains vested in the executor. Once the executor verifies that estate debts are satisfied and issues formal written assent, title relates back to the date of death under Section 333.",
            },
          },
          {
            "@type": "Question",
            name: "Can an executor be held personally liable for wasting estate property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 369 of the Indian Succession Act, 1925 (devastavit), an executor who misapplies the estate or suffers it to be wasted or lost is personally liable to make good the loss to the heirs and creditors. Publishing a legal notice to creditors under Section 360 protects the executor from unknown liabilities.",
            },
          },
          {
            "@type": "Question",
            name: "Can an appointed executor refuse to act or renounce their appointment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An single named as executor has the legal right to renounce probate under Section 229 of the Indian Succession Act, provided they have not intermeddled with estate assets or acted as executor. Giving Up can be made orally before the district judge or by writing signed by the person renouncing.",
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
        <ExecutorTimelineClient />
        <Footer />
      </div>
    </>
  );
}
