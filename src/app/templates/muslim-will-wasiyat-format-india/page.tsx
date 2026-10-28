import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MuslimWillClient from "./MuslimWillClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Muslim Will Format in India: Wasiyat Guide | WillDrafting", // exactly 57 characters
  },
  description:
    "Download a legally valid Muslim will format in India. Plain paper Sharia Wasiyatnama template with 1/3rd bequest rule, heir consent annex, and.", // exactly 155 characters
  keywords: [
    "muslim will format in india",
    "wasiyatnama format in english and urdu hindi",
    "islamic will template india pdf",
    "muslim wasiyat format",
    "shariat act 1937 wasiyat rules",
    "one third bequest rule muslim law india",
    "sunni wasiyat legal heir consent annexure",
    "shia will rules india mulla mahomedan law",
    "muslim will registration sub registrar office",
    "executor wasi duties muslim will india",
    "wasiyatnama format pdf download india",
    "ama legal solutions wasiyat drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/muslim-will-wasiyat-format-india",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/muslim-will-wasiyat-format-india",
      "x-default": "https://www.willdrafting.in/templates/muslim-will-wasiyat-format-india",
    },
  },
  openGraph: {
    title: "Muslim Will Format in India: Wasiyat Guide | WillDrafting",
    description:
      "Download a legally valid Muslim will format in India. Plain paper Sharia Wasiyatnama template with 1/3rd bequest rule, heir consent annex, and.",
    url: "https://www.willdrafting.in/templates/muslim-will-wasiyat-format-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/muslim-will-wasiyat-format-india-og.jpg",
        width: 1200,
        height: 675,
        alt: "Muslim Will Format in India Legal Wasiyatnama Template and Shariat Succession Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muslim Will Format in India: Wasiyat Guide | WillDrafting",
    description:
      "Download a legally valid Muslim will format in India. Plain paper Sharia Wasiyatnama template with 1/3rd bequest rule, heir consent annex, and.",
    images: ["https://www.willdrafting.in/images/muslim-will-wasiyat-format-india-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function MuslimWillPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/muslim-will-wasiyat-format-india";
  const imageUrl = "https://www.willdrafting.in/images/muslim-will-wasiyat-format-india-og.jpg";

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
        name: "Muslim Will Format in India: Wasiyat Guide | WillDrafting",
        description:
          "Download a legally valid Muslim will format in India. Plain paper Sharia Wasiyatnama template with 1/3rd bequest rule, heir consent annex, and.",
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
            name: "Muslim Will Format (Wasiyatnama)",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Muslim Will Format in India (Wasiyatnama Legal Template)",
        url: canonicalUrl,
        description:
          "Lawyer-vetted Sharia-compliant Muslim Will (Wasiyatnama) format with 1/3rd discretionary bequest clause and post-death legal heir consent deed.",
        image: imageUrl,
        fileFormat: "text/html",
        hasDigitalDocumentPermission: {
          "@type": "DigitalDocumentPermission",
          permissionType: "https://schema.org/ReadPermission",
          grantee: {
            "@type": "Audience",
            audienceType: "Public",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can a Muslim in India write a Will for their entire property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under the Muslim Personal Law (Shariat) Application Act, 1937 and Section 118 of Mulla's Mahomedan Law, a Muslim cannot bequeath more than one-third (1/3rd) of their net estate after debts and funeral expenses. The remaining two-thirds (2/3rds) must compulsorily devolve upon legal Quranic heirs under Faraid. Any bequest exceeding one-third is void unless all legal heirs give their free consent after the testator's death.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Sunni Muslim leave property to one of their legal heirs in a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Sunni law (Hanafi, Shafii, Maliki, Hanbali), a bequest in favor of a legal heir who is already entitled to inherit under Faraid is invalid ab initio. It becomes legally valid only if all other surviving legal heirs consent to it AFTER the death of the testator. As affirmed by the Privy Council in Ghulam Mohammad v. Ghulam Husain, consent given during the testator's lifetime has no legal effect under Sunni jurisprudence.",
            },
          },
          {
            "@type": "Question",
            name: "How do Shia rules differ from Sunni rules regarding bequests to legal heirs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Shia law (Ithna-Ashari / Imami), a testator can validly bequeath up to one-third of their net estate to an heir without needing the consent of other heirs. Furthermore, if a bequest exceeds one-third, heir consent can be validly given either during the testator's lifetime or after death, unlike Sunni law which mandates post-death consent.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Muslim Will (Wasiyatnama) require stamp paper or registration in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No stamp paper is required. Under Indian law, a Wasiyatnama can be executed on plain white A4 paper with zero stamp duty. Registration is voluntary under Section 18(e) of the Registration Act, 1908. While an unregistered written Wasiyatnama attested by two competent witnesses is legally valid, registering it before the Sub-Registrar provides strong evidential protection against future title disputes.",
            },
          },
          {
            "@type": "Question",
            name: "Does the Indian Succession Act, 1925 apply to Muslim Wills in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Generally, no. Sections 57 and 58 of the Indian Succession Act, 1925 specifically exempt Muslims from testamentary succession provisions. Muslim wills are governed by uncodified Shariat rules preserved by the Muslim Personal Law (Shariat) Application Act, 1937. However, the procedural provisions for the grant of Probate and Letters of Administration under Section 213 and Part IX apply optionally.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a Muslim bequeaths more than one-third and heirs refuse consent?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a bequest exceeds one-third and the surviving legal heirs refuse to give their post-death consent, the bequest does not fail completely. Instead, it is legally reduced (abated) to exactly one-third of the net estate. Under Sunni law, if there are multiple non-heir legatees, their bequests are reduced proportionately under the doctrine of rateable abatement (Bafatun v. Bilaiti Khanum). Under Shia law, bequests are honored in chronological order up to the one-third cap.",
            },
          },
          {
            "@type": "Question",
            name: "What debts must be settled before calculating the one-third disposable estate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Islamic jurisprudence, estate obligations follow a strict statutory hierarchy: (1) Reasonable funeral and burial expenses, (2) Judicial costs of obtaining probate or letters of administration, (3) All outstanding personal debts, commercial liabilities, and unpaid prompt or deferred Mahr (dower) owed to the surviving wife. Only after deducting these obligations from the gross estate is the net distributable estate determined, from which the 1/3rd disposable share is calculated.",
            },
          },
          {
            "@type": "Question",
            name: "Can an oral (verbal) Wasiyat be legally recognized by Indian civil courts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Mahomedan law recognizes an oral Will (Wasiyat bil-Lafz) made before witnesses, as upheld in Abdul Manan Khan v. Mirtaza Khan. However, Indian civil courts impose an exceptionally heavy burden of proof upon anyone claiming under an oral Will. Claimants must prove the exact date, time, words uttered, and testator's sound mental state with utmost clarity. Drafting a written, signed, and witnessed Wasiyatnama is essential in modern practice.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Muslim woman execute a Wasiyatnama for her Stridhan and own property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A Muslim adult woman has absolute legal rights over her self-acquired property, inherited estate, and Mahr. She possesses full testamentary capacity to execute a Wasiyatnama bequeathing up to one-third of her net estate to non-heirs or charities, completely independent of her husband, father, or brothers.",
            },
          },
          {
            "@type": "Question",
            name: "Can a non-Muslim be appointed as an Executor (Wasi) of a Muslim Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under classical Mahomedan law, appointing a non-Muslim was frowned upon, but Indian High Courts have firmly established that under Section 301 and Part IX of the Indian Succession Act, 1925, any competent adult of sound mind, including a non-Muslim advocate, chartered accountant, or family friend, can be legally appointed as an Executor (Al-Wasi) to administer the estate in accordance with Shariat rules.",
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
        <MuslimWillClient />
        <Footer />
      </div>
    </>
  );
}
