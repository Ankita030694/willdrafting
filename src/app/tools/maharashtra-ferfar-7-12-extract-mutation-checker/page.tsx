import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaharashtraFerfarCheckerClient from "./MaharashtraFerfarCheckerClient";

// Screaming Frog Rules: Title 50-60 chars (<=55 ideal), Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Maharashtra Ferfar 7/12 Mutation Checker | WillDrafting", // 55 characters
  },
  description:
    "Check Maharashtra Ferfar & 7/12 extract mutation rules under MLRC 1966. Verify Varas Nond, Will probate, 15-day Aapli Chawdi notice & RTS timelines.", // 148 characters
  keywords: [
    "maharashtra ferfar 7 12 extract mutation checker",
    "satbara utara mutation rules maharashtra",
    "varas nond 7 12 extract online e hakk",
    "maharashtra land revenue code 1966 section 149 150",
    "aapli chawdi 15 day notice ferfar objection",
    "circle officer ferfar certification timeline rts act",
    "will mutation 7 12 extract maharashtra probate rule",
    "property card vs 7 12 extract maharashtra",
    "digitalsatbara mahabhumi ferfar fee",
    "section 247 mlrc sdo appeal 60 days",
    "jitendra singh mutation does not confer title",
    "bhimabai mahadeo kambekar supreme court 7 12",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/maharashtra-ferfar-7-12-extract-mutation-checker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/maharashtra-ferfar-7-12-extract-mutation-checker",
      "x-default": "https://www.willdrafting.in/tools/maharashtra-ferfar-7-12-extract-mutation-checker",
    },
  },
  openGraph: {
    title: "Maharashtra Ferfar 7/12 Mutation Checker | WillDrafting",
    description:
      "Check Maharashtra Ferfar & 7/12 extract mutation rules under MLRC 1966. Verify Varas Nond, Will probate, 15-day Aapli Chawdi notice & RTS timelines.",
    url: "https://www.willdrafting.in/tools/maharashtra-ferfar-7-12-extract-mutation-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/maharashtra-ferfar-7-12-extract-mutation-checker-og.jpg",
        width: 1200,
        height: 630,
        alt: "Maharashtra Ferfar and 7/12 Extract Mutation Checker under MLRC 1966",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Maharashtra Ferfar 7/12 Mutation Checker | WillDrafting",
    description:
      "Check Maharashtra Ferfar & 7/12 extract mutation rules under MLRC 1966. Verify Varas Nond, Will probate, 15-day Aapli Chawdi notice & RTS timelines.",
    images: [
      "https://www.willdrafting.in/images/maharashtra-ferfar-7-12-extract-mutation-checker-og.jpg",
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

export default function MaharashtraFerfarMutationCheckerPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/maharashtra-ferfar-7-12-extract-mutation-checker";
  const imageUrl =
    "https://www.willdrafting.in/images/maharashtra-ferfar-7-12-extract-mutation-checker-og.jpg";

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
        name: "Maharashtra Ferfar 7/12 Mutation Checker | WillDrafting",
        description:
          "Check Maharashtra Ferfar & 7/12 extract mutation rules under MLRC 1966. Verify Varas Nond, Will probate, 15-day Aapli Chawdi notice & RTS timelines.",
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
            name: "Maharashtra Ferfar & 7/12 Mutation Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Maharashtra Ferfar & 7/12 Extract Mutation Checker",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free checker for Maharashtra Ferfar (Village Form 6) and 7/12 Satbara mutation rules under MLRC 1966 Sections 149-150, e-Hakk filing, Aapli Chawdi notices, and RTS deadlines.",
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
            name: "What is Ferfar (Village Form 6) and how does it update a 7/12 extract?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ferfar is the official Register of Mutations maintained in Village Form 6 under Section 150 of the Maharashtra Land Revenue Code, 1966. When land changes hands by sale, death, Will, or gift, the Talathi writes a Ferfar entry first. Once the Circle Officer certifies that entry after a 15-day notice, the new owner name updates on the 7/12 Satbara extract and 8A Khata.",
            },
          },
          {
            "@type": "Question",
            name: "How much is the official government fee for Maharashtra Ferfar mutation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Maharashtra Revenue Department charges zero official government fee for standard Ferfar mutations like Varas Nond (heirship) or registered sale transfers. However, downloading a digitally signed 7/12, 8A, or Ferfar copy from Digital Satbara costs a nominal Rs 15 per record, and CSC or Maha-e-Seva centers may charge small operator service fees.",
            },
          },
          {
            "@type": "Question",
            name: "How many days does Circle Officer certification take under the RTS Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the Maharashtra Right to Public Services Act, 2015, an undisputed Ferfar mutation must be certified within 30 days. This includes the mandatory 15-day notice window under Section 150(2) published on Aapli Chawdi. If an heir files a written objection, the case shifts to the Disputed Register (Takrari) with a statutory limit of up to 365 days.",
            },
          },
          {
            "@type": "Question",
            name: "Is Probate mandatory to mutate a 7/12 or Property Card through a Will in Maharashtra?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 57 and Section 213 of the Indian Succession Act, 1925, Probate from the Bombay High Court is mandatory if the Will is made in Mumbai or covers immovable property in Mumbai. Outside Mumbai (such as Pune, Nashik, or rural Maharashtra), Probate is not legally compulsory for undisputed Wills, though revenue officers often ask for a Civil Court decree or NOCs if any heir objects.",
            },
          },
          {
            "@type": "Question",
            name: "Does a certified Ferfar or 7/12 extract prove legal ownership of land?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under settled Supreme Court rulings including Jitendra Singh v. State of Madhya Pradesh (2021) and Bhimabai Mahadeo Kambekar (2019), mutation entries and 7/12 extracts exist only for fiscal land revenue collection. They do not create or cancel ownership title. Under MLRC Section 157, they carry a rebuttable presumption of truth, while final title disputes belong only to Civil Courts.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if heirs miss the 3-month reporting deadline under MLRC Section 149?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 149 of the MLRC, 1966 requires acquiring parties to report rights within 3 months. Missing this deadline does not cancel your inheritance or ownership right. Under Section 152, the Talathi or revenue officer can levy a minor nominal fine (statutory cap up to Rs 5) and still process your late Varas Nond mutation application.",
            },
          },
          {
            "@type": "Question",
            name: "What can I do if the Circle Officer rejects my Ferfar entry?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a Circle Officer rejects or wrongly certifies a Ferfar entry, you can file a statutory RTS Appeal under Section 247 of the MLRC, 1966 before the Sub-Divisional Officer (SDO). Under Section 250, the appeal must be filed within 60 days from the order date, unless you prove sufficient cause for delay under Section 251.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a 7/12 Satbara extract and a Property Card?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A 7/12 Satbara Utara is kept by the village Talathi for agricultural and rural land parcels identified by Survey or Gat numbers. A Property Card (Malmatta Patrak) is kept by the City Survey Officer (CTS) for urban and non-agricultural municipal plots identified by CTS numbers. Both serve fiscal revenue records and follow MLRC Chapter X rules.",
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
        <MaharashtraFerfarCheckerClient />
        <Footer />
      </div>
    </>
  );
}
