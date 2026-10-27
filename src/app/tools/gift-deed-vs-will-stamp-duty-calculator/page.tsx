import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GiftDeedCalculatorClient from "./GiftDeedCalculatorClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Gift Deed Stamp Duty Calculator vs Will | WillDrafting", // exactly 54 characters
  },
  description:
    "Calculate gift deed stamp duty for blood relatives across Indian states. Compare gift deed vs release deed vs Will costs and save lakhs with WillDrafting.", // exactly 152 characters
  keywords: [
    "gift deed stamp duty calculator for blood relatives",
    "gift deed vs will cost calculator",
    "release deed stamp duty by state",
    "stamp duty on gift deed to son daughter wife",
    "gift deed stamp duty maharashtra 200 rupees",
    "uttar pradesh gift deed blood relative 5000",
    "delhi gift deed stamp duty blood relatives",
    "tamil nadu gift deed 25000 cap",
    "section 122 transfer of property act",
    "section 23 senior citizens act gift deed",
    "urmila dixit v sunil sharan dixit 2025",
    "ama legal solutions gift deed vs will calculator",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/gift-deed-vs-will-stamp-duty-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/gift-deed-vs-will-stamp-duty-calculator",
      "x-default": "https://www.willdrafting.in/tools/gift-deed-vs-will-stamp-duty-calculator",
    },
  },
  openGraph: {
    title: "Gift Deed Stamp Duty Calculator vs Will | WillDrafting",
    description:
      "Calculate gift deed stamp duty for blood relatives across Indian states. Compare gift deed vs release deed vs Will costs and save lakhs with WillDrafting.",
    url: "https://www.willdrafting.in/tools/gift-deed-vs-will-stamp-duty-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/gift-deed-vs-will-stamp-duty-calculator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Gift Deed Stamp Duty Calculator for Blood Relatives vs Will Comparison Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gift Deed Stamp Duty Calculator vs Will | WillDrafting",
    description:
      "Calculate gift deed stamp duty for blood relatives across Indian states. Compare gift deed vs release deed vs Will costs and save lakhs with WillDrafting.",
    images: ["https://www.willdrafting.in/images/gift-deed-vs-will-stamp-duty-calculator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function GiftDeedCalculatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/gift-deed-vs-will-stamp-duty-calculator";
  const imageUrl = "https://www.willdrafting.in/images/gift-deed-vs-will-stamp-duty-calculator-og.jpg";

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
        name: "Gift Deed Stamp Duty Calculator vs Will | WillDrafting",
        description:
          "Calculate gift deed stamp duty for blood relatives across Indian states. Compare gift deed vs release deed vs Will costs and save lakhs with WillDrafting.",
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
            name: "Gift Deed vs Will Stamp Duty Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Gift Deed vs Will Stamp Duty Calculator for Blood Relatives",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive statutory stamp duty calculator for gift deeds, release deeds, and Wills across Indian states including Maharashtra, Uttar Pradesh, Delhi, Karnataka, and Tamil Nadu.",
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
            name: "How much stamp duty is charged on a Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Will attracts exactly zero (₹0) stamp duty in every Indian state and union territory. A Will is a testamentary instrument under the Indian Succession Act, 1925, and does not require stamp paper under the Indian Stamp Act, 1899. Writing a Will on plain white paper is completely valid.",
            },
          },
          {
            "@type": "Question",
            name: "Why is a Gift Deed more expensive than a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Gift Deed transfers property ownership during the donor's lifetime (inter vivos). Under Section 17 of the Registration Act, 1908, it requires mandatory registration and ad valorem or concessional state stamp duty ranging from ₹200 to 7% of property value, plus 1% registration fees. A Will costs ₹0 stamp duty and registration is entirely optional.",
            },
          },
          {
            "@type": "Question",
            name: "What is the stamp duty on a gift deed to blood relatives in Maharashtra?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 34 proviso of the Maharashtra Stamp Act, 1958, a gift deed of residential or agricultural property made to a spouse, son, daughter, grandchild, or wife of a deceased son attracts a fixed stamp duty of only ₹200. A registration fee of 1% applies, capped at a maximum of ₹30,000.",
            },
          },
          {
            "@type": "Question",
            name: "What is the flat ₹5,000 gift deed stamp duty rule in Uttar Pradesh?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Government of Uttar Pradesh notified a concessional flat stamp duty of ₹5,000 under Article 33 for gift deeds executed between defined blood relatives (parents, spouse, children, siblings, grandchildren, and daughter-in-law). The registration fee is 1%, subject to a maximum cap of ₹10,000.",
            },
          },
          {
            "@type": "Question",
            name: "Can a parent cancel a registered Gift Deed if their child neglects them?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under general property law, a registered gift deed is irrevocable. However, under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, a senior citizen can petition the Maintenance Tribunal to cancel the gift deed if the deed contains an express clause stating the gift was conditional upon providing basic physical needs, as affirmed in Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20).",
            },
          },
          {
            "@type": "Question",
            name: "Can I use a Release Deed instead of a Gift Deed to avoid stamp duty?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A Release Deed (or Relinquishment Deed) can only be executed between existing co-owners or coparceners who already hold a pre-existing legal share in ancestral or jointly owned property. A sole living owner cannot execute a Release Deed for self-acquired property; attempting to do so is legally void.",
            },
          },
          {
            "@type": "Question",
            name: "Is income tax applicable on gifts received from blood relatives?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 56(2)(x) of the Income Tax Act, 1961, any immovable property or sum of money received as a gift from a defined relative (spouse, parents, siblings, children, grandchildren) is 100% exempt from income tax in the hands of the receiver. However, gifts from non-relatives exceeding ₹50,000 are taxed as income.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to ownership when I make a Gift Deed vs a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "With a Gift Deed, ownership transfers immediately upon registration. You lose all ownership rights, cannot sell or mortgage the property, and cannot revoke the gift easily. With a Will, you retain 100% absolute ownership and control during your entire lifetime; property only passes to beneficiaries after your demise.",
            },
          },
          {
            "@type": "Question",
            name: "What is the stamp duty cap on family gift deeds in Tamil Nadu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 33 of the Tamil Nadu Stamp Act, a gift deed made in favor of family members (spouse, children, parents, grandchildren, siblings) attracts 1% stamp duty subject to a maximum ceiling of ₹25,000, and a 1% registration fee capped at ₹4,000. Non-family gifts attract 7% stamp duty and 4% registration fees.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Will need to be registered in India to be legally valid?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 18(e) of the Registration Act, 1908, registration of a Will is completely optional in India. An unregistered Will written on plain paper and signed by the testator in the presence of two attesting witnesses under Section 63 of the Indian Succession Act is 100% legally valid.",
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
      <GiftDeedCalculatorClient />
      <Footer />
    </>
  );
}