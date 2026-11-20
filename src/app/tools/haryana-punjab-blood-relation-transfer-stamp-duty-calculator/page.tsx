import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HaryanaPunjabBloodRelationClient from "./HaryanaPunjabBloodRelationClient";

// Screaming Frog Rules: Title 50-60 chars, Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Haryana Punjab Blood Relation Stamp Duty | WillDrafting", // 55 characters
  },
  description:
    "Calculate Haryana and Punjab blood relation transfer stamp duty (0%) and SRO fees. Check eligible family list, Haryana fee slabs, and Punjab waivers.", // 149 characters (0 HTML entity expansion)
  keywords: [
    "haryana blood relation transfer deed stamp duty calculator",
    "punjab blood relation transfer deed stamp duty calculator",
    "haryana blood relation property transfer registration fee",
    "punjab blood relation transfer deed registration fee",
    "haryana s o 62 2014 blood relation stamp duty exemption",
    "punjab s o 28 2014 blood relation stamp duty waiver",
    "haryana august 2026 maternal grandchildren stamp duty order",
    "jamabandi nic in blood relation transfer deed calculator",
    "igrpunjab blood relation gift deed fees",
    "is daughter in law eligible for blood relation transfer haryana punjab",
    "haryana registration fee 50000 cap slab table",
    "blood relation transfer deed vs will haryana punjab",
    "section 23 senior citizens act transfer deed cancellation",
    "willdrafting haryana punjab stamp duty calculator",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/haryana-punjab-blood-relation-transfer-stamp-duty-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/haryana-punjab-blood-relation-transfer-stamp-duty-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/haryana-punjab-blood-relation-transfer-stamp-duty-calculator",
    },
  },
  openGraph: {
    title: "Haryana Punjab Blood Relation Stamp Duty | WillDrafting",
    description:
      "Calculate Haryana and Punjab blood relation transfer stamp duty (0%) and SRO fees. Check eligible family list, Haryana fee slabs, and Punjab waivers.",
    url: "https://www.willdrafting.in/tools/haryana-punjab-blood-relation-transfer-stamp-duty-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/haryana-punjab-blood-relation-transfer-stamp-duty-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Haryana and Punjab Blood Relation Transfer Stamp Duty Calculator Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Haryana Punjab Blood Relation Stamp Duty | WillDrafting",
    description:
      "Calculate Haryana and Punjab blood relation transfer stamp duty (0%) and SRO fees. Check eligible family list, Haryana fee slabs, and Punjab waivers.",
    images: [
      "https://www.willdrafting.in/images/haryana-punjab-blood-relation-transfer-stamp-duty-calculator-og.jpg",
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

export default function HaryanaPunjabBloodRelationStampDutyPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/haryana-punjab-blood-relation-transfer-stamp-duty-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/haryana-punjab-blood-relation-transfer-stamp-duty-calculator-og.jpg";

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
        name: "Haryana Punjab Blood Relation Stamp Duty | WillDrafting",
        description:
          "Calculate Haryana and Punjab blood relation transfer stamp duty (0%) and SRO fees. Check eligible family list, Haryana fee slabs, and Punjab waivers.",
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
            name: "Haryana & Punjab Blood Relation Stamp Duty Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Haryana & Punjab Blood Relation Transfer Stamp Duty Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free calculator to check blood relation eligibility, 0% stamp duty waivers, Haryana registration fee slabs up to Rs 50,000, and Punjab zero-fee rules.",
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
            name: "Is stamp duty 0% on blood relation property transfers in Haryana and Punjab?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Both states waive 100% of stamp duty on lifetime property transfers made without cash payment among listed blood relatives and spouses. Haryana grants this under Notification No. S.O. 62 dated June 16, 2014. Punjab grants it under Notification No. S.O. 28 dated May 7, 2014.",
            },
          },
          {
            "@type": "Question",
            name: "Do I still have to pay registration fees for a blood relation transfer in Haryana vs Punjab?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes in Haryana, and no ad-valorem fee in Punjab. In Haryana, you pay a slab-based registration fee capped at Rs 50,000 under Notification S.O. 65 dated October 3, 2018. In Punjab, Notifications S.O. 47 and S.O. 48 dated November 2, 2015 waive both registration fees and Social Infrastructure Cess, leaving only minor pasting and facilitation charges of around Rs 900.",
            },
          },
          {
            "@type": "Question",
            name: "Are maternal grandchildren (daughter's children) eligible in Haryana?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In July 2026 (published in the Haryana Gazette on August 13, 2026), the Haryana Revenue Department issued a corrigendum to its 2014 order. It added dohata-dohati and nati-natin (daughter's children) alongside son's children. Maternal grandchildren now get the exact same 0% stamp duty waiver across Haryana.",
            },
          },
          {
            "@type": "Question",
            name: "Does a daughter-in-law qualify for the 0% blood relation transfer in Haryana or Punjab?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Neither Haryana nor Punjab lists a daughter-in-law or son-in-law as a direct blood relative in their 2014 exemption orders. A direct transfer from a parent-in-law to a daughter-in-law attracts full standard stamp duty and registration fees. Families who wish to transfer lawfully often gift first to their son, who can later transfer to his wife.",
            },
          },
          {
            "@type": "Question",
            name: "Did Punjab reintroduce 2.5% stamp duty on blood relation transfers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. In February 2025, Punjab proposed charging 1% to 2.5% stamp duty on family property transfers. Following strong public and farmer opposition, the state government put that plan on hold. The 0% stamp duty waiver remains active, though you should always check live challan rules on igrpunjab.gov.in before paying.",
            },
          },
          {
            "@type": "Question",
            name: "Is income tax payable on property received through a blood relation transfer deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 56(2)(x) of the Income Tax Act, 1961, land or a flat received from parents, children, spouses, siblings, or grandparents is 100% exempt from income tax. However, under Section 64, if a husband transfers a rented home to his wife without payment, the rent income is clubbed and taxed in the husband's return.",
            },
          },
          {
            "@type": "Question",
            name: "Can an elderly parent cancel a blood relation transfer deed if children neglect them?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, if protected properly. Under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, a Maintenance Tribunal can void a gift or transfer deed if the child fails to care for the parent. Following the Supreme Court rulings in Sudesh Chhikara (2022) and Urmila Dixit (2025), parents should write a clear maintenance clause directly inside the Transfer Deed.",
            },
          },
          {
            "@type": "Question",
            name: "Should parents in Haryana or Punjab use a Blood Relation Transfer Deed or a Registered Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Blood Relation Transfer Deed shifts title immediately and is hard to undo once signed. A Registered Will costs zero stamp duty, keeps 100% ownership in your name for life, and can be changed anytime. Choose a Transfer Deed only when immediate handover is essential; otherwise, a Registered Will is much safer for senior citizens.",
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
        <HaryanaPunjabBloodRelationClient />
        <Footer />
      </div>
    </>
  );
}
