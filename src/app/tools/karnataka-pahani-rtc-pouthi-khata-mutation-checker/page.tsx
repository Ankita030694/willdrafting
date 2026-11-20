import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KarnatakaPouthiKhataClient from "./KarnatakaPouthiKhataClient";

// Strict SEO compliance: Title 50-60 chars (<=55px safe), Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Karnataka Pahani RTC Pouthi Khata Tool | WillDrafting", // 53 characters
  },
  description:
    "Check Karnataka Pahani RTC Pouthi Khata eligibility under KLRA Sections 128 and 129. Verify Bhoomi notice days, Vamshavruksha, fees, and Will rules.", // 149 characters
  keywords: [
    "karnataka pahani rtc pouthi khata mutation checker",
    "pouthi khata mutation process karnataka bhoomi",
    "rtc pahani name transfer after death karnataka",
    "karnataka land revenue act section 128 129 mutation",
    "vamshavruksha family tree certificate nadakacheri",
    "form 12 form 21 mutation notice 30 days karnataka",
    "pouthi khata based on will karnataka high court",
    "cn nagendra singh jayamma karnataka mutation will",
    "bhoomi i-rtc fee sakala pouthi khata timeline",
    "rtc column 9 column 11 column 12 explained",
    "phodi hissa 11e sketch vs joint pouthi khata",
    "section 136 appeal assistant commissioner karnataka",
    "bbmp e khata vs bhoomi pahani transfer",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/karnataka-pahani-rtc-pouthi-khata-mutation-checker",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/karnataka-pahani-rtc-pouthi-khata-mutation-checker",
      "x-default":
        "https://www.willdrafting.in/tools/karnataka-pahani-rtc-pouthi-khata-mutation-checker",
    },
  },
  openGraph: {
    title: "Karnataka Pahani RTC Pouthi Khata Tool | WillDrafting",
    description:
      "Check Karnataka Pahani RTC Pouthi Khata eligibility under KLRA Sections 128 and 129. Verify Bhoomi notice days, Vamshavruksha, fees, and Will rules.",
    url: "https://www.willdrafting.in/tools/karnataka-pahani-rtc-pouthi-khata-mutation-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/karnataka-pahani-rtc-pouthi-khata-mutation-checker-og.jpg",
        width: 1200,
        height: 630,
        alt: "Karnataka Pahani RTC and Pouthi Khata Mutation Checker Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Karnataka Pahani RTC Pouthi Khata Tool | WillDrafting",
    description:
      "Check Karnataka Pahani RTC Pouthi Khata eligibility under KLRA Sections 128 and 129. Verify Bhoomi notice days, Vamshavruksha, fees, and Will rules.",
    images: [
      "https://www.willdrafting.in/images/karnataka-pahani-rtc-pouthi-khata-mutation-checker-og.jpg",
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

export default function KarnatakaPouthiKhataMutationCheckerPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/karnataka-pahani-rtc-pouthi-khata-mutation-checker";
  const imageUrl =
    "https://www.willdrafting.in/images/karnataka-pahani-rtc-pouthi-khata-mutation-checker-og.jpg";

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
        name: "Karnataka Pahani RTC Pouthi Khata Tool | WillDrafting",
        description:
          "Check Karnataka Pahani RTC Pouthi Khata eligibility under KLRA Sections 128 and 129. Verify Bhoomi notice days, Vamshavruksha, fees, and Will rules.",
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
            name: "Karnataka Pahani RTC & Pouthi Khata Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Karnataka Pahani (RTC) & Pouthi Khata Mutation Checker",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free diagnostic checker for Karnataka Pouthi Khata inheritance mutation on Bhoomi under Sections 128 and 129 of the Karnataka Land Revenue Act, 1964.",
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
            name: "What is Pouthi Khata in Karnataka land records?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pouthi Khata is the inheritance mutation process in Karnataka. After a land owner passes away, legal heirs apply under Section 128 of the Karnataka Land Revenue Act, 1964 to record their names in Column 9 of the Pahani (RTC) on the Bhoomi portal.",
            },
          },
          {
            "@type": "Question",
            name: "How many days does Pouthi Khata mutation take on Bhoomi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Rule 64 and Rule 65 of the Karnataka Land Revenue Rules, 1966, the Village Accountant displays Form 12 and serves Form 21 notice for 30 days to invite objections. If no one objects, the Revenue Inspector certifies the mutation. Under Sakala, uncontested Pouthi Khata usually finishes in 30 to 45 days.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Tahsildar approve Pouthi Khata based on a disputed Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Two Full Bench rulings of the Karnataka High Court, C.N. Nagendra Singh (2002) and Smt. Jayamma v. State of Karnataka (2020), hold that revenue officers cannot decide if a contested Will is valid. If any legal heir objects to a Will, parties must get a civil court decree or probate first.",
            },
          },
          {
            "@type": "Question",
            name: "What is the official government fee for Pouthi Khata and Vamshavruksha?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Government fees in Karnataka are nominal. A Vamshavruksha (Family Tree) at Nadakacheri costs about Rs 45 to Rs 50. Rural Pouthi Khata mutation charges are about Rs 50 to Rs 200. A digitally signed i-RTC copy on Bhoomi costs Rs 25, while viewing an RTC online is free.",
            },
          },
          {
            "@type": "Question",
            name: "Is an 11E Sketch or Phodi required for Pouthi Khata?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. If all legal heirs enter their names jointly in RTC Column 9 through a joint Pouthi Khata, you do not need an 11E Sketch or Phodi. You only need Phodi (Hissa division) or an 11E Sketch later if heirs divide the survey number into separate individual plots or sell a partial share.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if heirs apply for Pouthi Khata more than 3 months after death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 128(1) requires reporting inheritance within 3 months. If you apply late, Section 128(3) prescribes a nominal late fee of Rs 2 for delays between 3 months and 1 year, and Rs 2 to Rs 10 for delays over 1 year. Your right to inherit the land does not expire due to late reporting.",
            },
          },
          {
            "@type": "Question",
            name: "Where can I appeal if the Tahsildar rejects or delays my Pouthi Khata?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 136(2) of the Karnataka Land Revenue Act, 1964, you can file an appeal before the jurisdictional Assistant Commissioner (AC) within 60 days of the mutation order. Against the Assistant Commissioner's order, a revision petition lies before the Deputy Commissioner (DC) under Section 136(3).",
            },
          },
          {
            "@type": "Question",
            name: "Does Pouthi Khata on Bhoomi apply to Bengaluru BBMP flats or sites?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Bhoomi Pahani (RTC) and Pouthi Khata apply only to agricultural and revenue survey lands. For Bengaluru city sites and flats under BBMP, heirs must apply for Khata Transfer through the BBMP e-Aasthi or Sakala portal. Village residential sites under Gram Panchayats use the e-Swathu portal.",
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
        <KarnatakaPouthiKhataClient />
        <Footer />
      </div>
    </>
  );
}
