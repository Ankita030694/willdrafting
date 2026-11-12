import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaveatPetitionClient from "./CaveatPetitionClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Probate Caveat Petition Format High Court | WillDrafting", // exactly 56 characters
  },
  description:
    "Download official High Court probate caveat petition format under Section 284 Indian Succession Act 1925. Stop fraudulent grant of probate instantly.", // exactly 149 characters
  keywords: [
    "high court caveat petition format probate india",
    "caveat under section 284 indian succession act format",
    "caveat petition in bombay high court testamentary format",
    "stop grant of probate caveat sample",
    "section 284 form 12 indian succession act draft",
    "delhi high court probate caveat format",
    "caveatable interest indian succession act supreme court",
    "jagjit singh v pamela manmohan singh caveatable interest",
    "affidavit in support of caveat testamentary rules",
    "sub registrar notice caveat probate lis pendens",
    "section 295 contentious testamentary suit conversion",
    "high court testamentary suit contested will defense",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/caveat-petition-high-court-probate-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/caveat-petition-high-court-probate-format",
      "x-default": "https://www.willdrafting.in/templates/caveat-petition-high-court-probate-format",
    },
  },
  openGraph: {
    title: "Probate Caveat Petition Format High Court | WillDrafting",
    description:
      "Download official High Court probate caveat petition format under Section 284 Indian Succession Act 1925. Stop fraudulent grant of probate instantly.",
    url: "https://www.willdrafting.in/templates/caveat-petition-high-court-probate-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/caveat-petition-high-court-probate-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "High Court Probate Caveat Petition Format Form 12 Under Indian Succession Act 1925",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Probate Caveat Petition Format High Court | WillDrafting",
    description:
      "Download official High Court probate caveat petition format under Section 284 Indian Succession Act 1925. Stop fraudulent grant of probate instantly.",
    images: ["https://www.willdrafting.in/images/caveat-petition-high-court-probate-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function CaveatPetitionHighCourtPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/caveat-petition-high-court-probate-format";
  const imageUrl = "https://www.willdrafting.in/images/caveat-petition-high-court-probate-format-og.jpg";

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
        name: "Probate Caveat Petition Format High Court | WillDrafting",
        description:
          "Download official High Court probate caveat petition format under Section 284 Indian Succession Act 1925. Stop fraudulent grant of probate instantly.",
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
            name: "Probate Caveat Petition Format High Court",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "High Court Probate Caveat Petition Format (ISA Form 12)",
        url: canonicalUrl,
        description:
          "Testamentary caveat petition format under Section 284 of the Indian Succession Act 1925, verification affidavit draft, and Sub-Registrar freezing notice.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        image: imageUrl,
        creator: {
          "@type": "Organization",
          name: "WillDrafting.in",
        },
        publisher: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a caveat petition in High Court probate proceedings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A caveat in probate proceedings is an official formal notice filed under Section 284 of the Indian Succession Act, 1925. It warns the High Court testamentary registry not to grant probate of a Will or Letters of Administration without prior formal notice and citation served upon the caveator.",
            },
          },
          {
            "@type": "Question",
            name: "Why is a Section 148A CPC caveat rejected in probate courts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 148A of the Code of Civil Procedure applies only to ordinary civil suits. Probate and testamentary matters are governed by special law under Section 284 and Schedule V Form 12 of the Indian Succession Act, 1925. Under the legal principle lex specialis derogat legi generali, a general civil caveat is rejected by High Court testamentary registries.",
            },
          },
          {
            "@type": "Question",
            name: "Who has caveatable interest to stop probate under Indian law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "As held by the Supreme Court in Jagjit Singh v. Pamela Manmohan Singh (2010) and Krishna Kumar Birla v. Rajendra Singh Lodha (2008), any legal heir who would inherit property under intestate succession, or any legatee under an earlier valid Will whose rights are displaced by the disputed Will, has valid caveatable interest.",
            },
          },
          {
            "@type": "Question",
            name: "How long does a probate caveat remain valid in High Court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Unlike a civil caveat under Section 148A CPC which expires after 90 days, a probate caveat filed under Section 284 of the Indian Succession Act remains active for 6 calendar months from the date of filing. If no probate petition is instituted within 6 months, the caveator must file a caveat renewal.",
            },
          },
          {
            "@type": "Question",
            name: "What happens when a probate caveat is filed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Once a caveat is filed, the High Court cannot issue probate ex-parte. When the executor files a probate petition, the court serves a citation upon the caveator. Under Section 295 of the Indian Succession Act, the proceedings convert into a regular contentious testamentary suit where the petitioner becomes plaintiff and the caveator becomes defendant.",
            },
          },
          {
            "@type": "Question",
            name: "What is the mandatory 8-day affidavit rule in Bombay High Court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Rule 399 of the Bombay High Court Original Side Rules, a caveator must file an Affidavit in Support of Caveat stating full grounds of objection within strictly 8 days of service of citation. If the affidavit is not filed within 8 days, the caveat is discharged and probate proceeds uncontested.",
            },
          },
          {
            "@type": "Question",
            name: "What grounds can be taken in the affidavit in support of caveat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Common grounds include: lack of sound disposing mind and mental capacity of the testator, presence of suspicious circumstances surrounding execution, active role of sole beneficiary in drafting, forgery or fraudulent signatures, revocation by a subsequent valid Will, and undue influence or coercion.",
            },
          },
          {
            "@type": "Question",
            name: "Can a probate court decide real estate title disputes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court in Kanwarjit Singh Dhillon v. Hardyal Singh Dhillon established that a probate court only decides the genuine execution and validity of the Will, not the testator's title. To protect ownership or stop third-party sales, the caveator must also file a civil title suit with an injunction under Order 39 Rules 1 and 2 CPC.",
            },
          },
          {
            "@type": "Question",
            name: "Why should a caveat notice be served on the Sub-Registrar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Serving an official intimation notice of the probate caveat on the local Sub-Registrar and revenue Tehsildar puts them on formal notice under Section 52 of the Transfer of Property Act (Lis Pendens). This prevents the executor from fraudulently selling, mortgaging, or mutating the estate property while probate litigation is pending.",
            },
          },
          {
            "@type": "Question",
            name: "What court fee is payable for filing a probate caveat in High Court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Filing a caveat requires only a nominal court fee stamp, typically ranging from ₹50 to ₹500 depending on the High Court rules (such as Bombay, Delhi, or Calcutta High Court). Ad valorem probate duty is only payable by the executor when the probate petition is finally granted.",
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
        <CaveatPetitionClient />
        <Footer />
      </div>
    </>
  );
}
