import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GujaratStampDutyClient from "./GujaratStampDutyClient";

// Screaming Frog Rules: Title 50-60 chars, Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Gujarat Gift & Release Stamp Duty Tool | WillDrafting", // 53 characters
  },
  description:
    "Calculate Gujarat Gift Deed (4.9% Art. 28) & Release Deed (₹200 Art. 49) stamp duty. Check women 0% fee waiver, 2025 heir rules, and Will savings.", // 146 characters
  keywords: [
    "gujarat gift deed stamp duty calculator",
    "gujarat release deed stamp duty calculator",
    "article 28 gift deed stamp duty gujarat",
    "article 49 release deed stamp duty gujarat",
    "gujarat stamp amendment act 2025 release deed",
    "hakk kami stamp duty gujarat 200 300",
    "women registration fee exemption gujarat gift deed",
    "garvi gujarat stamp duty jantri calculator",
    "gift deed vs release deed vs will gujarat",
    "section 63 gujarat tenancy act agricultural land gift",
    "shalin mukeshbhai patel gujarat high court release deed",
    "ahmedabad surat vadodara gift deed stamp duty",
    "willdrafting gujarat stamp duty calculator",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/gujarat-gift-deed-release-deed-stamp-duty-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/gujarat-gift-deed-release-deed-stamp-duty-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/gujarat-gift-deed-release-deed-stamp-duty-calculator",
    },
  },
  openGraph: {
    title: "Gujarat Gift & Release Stamp Duty Tool | WillDrafting",
    description:
      "Calculate Gujarat Gift Deed (4.9% Art. 28) & Release Deed (₹200 Art. 49) stamp duty. Check women 0% fee waiver, 2025 heir rules, and Will savings.",
    url: "https://www.willdrafting.in/tools/gujarat-gift-deed-release-deed-stamp-duty-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/gujarat-gift-deed-release-deed-stamp-duty-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Gujarati family reviewing Gift Deed and Release Deed stamp duty papers in Ahmedabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Gujarat Gift & Release Stamp Duty Tool | WillDrafting",
    description:
      "Calculate Gujarat Gift Deed (4.9% Art. 28) & Release Deed (₹200 Art. 49) stamp duty. Check women 0% fee waiver, 2025 heir rules, and Will savings.",
    images: [
      "https://www.willdrafting.in/images/gujarat-gift-deed-release-deed-stamp-duty-calculator-og.jpg",
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

export default function GujaratGiftReleaseStampDutyPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/gujarat-gift-deed-release-deed-stamp-duty-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/gujarat-gift-deed-release-deed-stamp-duty-calculator-og.jpg";

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
        name: "Gujarat Gift & Release Stamp Duty Tool | WillDrafting",
        description:
          "Calculate Gujarat Gift Deed (4.9% Art. 28) & Release Deed (₹200 Art. 49) stamp duty. Check women 0% fee waiver, 2025 heir rules, and Will savings.",
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
            name: "Gujarat Gift & Release Deed Stamp Duty",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Gujarat Gift Deed & Release Deed Stamp Duty Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free calculator for Gujarat Stamp Act Article 28 Gift Deeds, Article 49(a) Release Deeds, Section 9 Rs 300 inherited land relief, women 0% registration fee waiver, and Will cost comparison.",
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
            name: "What is the stamp duty on a Gift Deed in Gujarat under Article 28?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 28 of Schedule I read with Section 3A of the Gujarat Stamp Act, 1958, a Gift Deed attracts the same stamp duty as a Conveyance under Article 20(a). This equals 3.5% basic stamp duty plus 40% additional duty (1.4%), totaling 4.9% of the higher of declared value or Government Jantri value. Unlike Maharashtra or UP, Schedule I Article 28 in Gujarat does not grant a flat Rs 200 or 1% blood-relative concession.",
            },
          },
          {
            "@type": "Question",
            name: "Do women get a stamp duty or registration fee exemption in Gujarat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Gujarat, women get a 100% waiver (0%) on the 1% registration fee when the property is registered solely in a woman's name or all-female names. Women do not get a discount on the 4.9% stamp duty. If a male co-owner is added to the deed, the 0% registration fee waiver is lost and the full 1% uncapped fee applies.",
            },
          },
          {
            "@type": "Question",
            name: "What is the stamp duty on an ancestral Release Deed (Hakk Kami) in Gujarat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 49(a) of Schedule I of the Gujarat Stamp Act, a Release Deed of ancestral property executed without consideration in favour of close family members attracts a flat Rs 200 stamp duty. For jointly held inherited land relinquished or partitioned among recorded lineal or collateral heirs, Gujarat's March 2026 Section 9(a) relief fixes a flat Rs 300 token stamp duty per deed.",
            },
          },
          {
            "@type": "Question",
            name: "What changed for Release Deeds under the Gujarat Stamp (Amendment) Act, 2025?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Effective April 2025, the Gujarat Stamp (Amendment) Act, 2025 expanded Article 49(a) to explicitly include the son and daughter of a pre-deceased daughter alongside children of a pre-deceased son, parents, spouse, siblings, and children. Earlier, grandchildren through a pre-deceased daughter often faced 4.9% conveyance duty demands on ancestral property releases.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use a Rs 200 Release Deed for a self-acquired flat in Ahmedabad or Surat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. In State of Gujarat v. Shalin Mukeshbhai Patel (LPA 689 & 864 of 2023, decided October 30, 2024), the Gujarat High Court Division Bench held that a release deed for property that is not genuinely undivided ancestral property, or that transfers exclusive rights to a single co-owner, attracts full conveyance stamp duty of 4.9% under Article 49(b) on the released share's Jantri value.",
            },
          },
          {
            "@type": "Question",
            name: "Can I gift agricultural land in Gujarat to a non-agriculturist child or relative?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 63 of the Gujarat Tenancy and Agricultural Lands Act, 1948, and the Supreme Court ruling in Vinodchandra Sakarlal Kapadia v. State of Gujarat (2020), agricultural land in Gujarat cannot be transferred to a non-agriculturist, even through a Gift Deed or Will, without prior Collector permission. The recipient must hold verified agriculturist (Khedut) status.",
            },
          },
          {
            "@type": "Question",
            name: "Is a Will cheaper than a Gift Deed in Gujarat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. On a Rs 1 Crore flat in Gujarat, a Gift Deed costs Rs 4.90 Lakh for a sole female donee or Rs 5.90 Lakh for a male donee. By contrast, a Will (Vasiyatnama) carries Rs 0 stamp duty, optional Rs 100 SRO registration fee on GARVI 2.0, and requires no court probate in Gujarat under Minaxiben Shashikant Patel v. Dave Sundarlal Chunilal (AIR 2002 Guj 122).",
            },
          },
          {
            "@type": "Question",
            name: "Is a Gift Deed between family members taxable under Income Tax law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 56(2)(x) of the Income Tax Act, 1961, immovable property gifted by specified relatives (spouse, siblings, parents, children, and lineal ascendants or descendants) is 100% exempt from income tax regardless of Jantri value. Gifts from non-relatives where Jantri value exceeds Rs 50,000 are fully taxable in the recipient's hands.",
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
        <GujaratStampDutyClient />
        <Footer />
      </div>
    </>
  );
}
