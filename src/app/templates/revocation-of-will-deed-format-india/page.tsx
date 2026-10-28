import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevocationDeedClient from "./RevocationDeedClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Cancel Registered Will in India Format | WillDrafting", // exactly 53 characters
  },
  description:
    "Download legally valid deed of revocation of will format in India. Learn how to cancel a registered will under Section 70 of Indian Succession.", // exactly 152 characters
  keywords: [
    "how to cancel a registered will in india format",
    "deed of revocation of will format india",
    "cancellation of will format sub registrar",
    "section 70 indian succession act",
    "how to revoke an old registered will in india",
    "revocation deed vs making a new will",
    "cancellation deed of registered will word pdf",
    "will revocation clause format india",
    "sub registrar cancellation of will procedure",
    "section 62 indian succession act ambulatory will",
    "animus revocandi intention to revoke will india",
    "ama legal solutions will revocation lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/revocation-of-will-deed-format-india",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/revocation-of-will-deed-format-india",
      "x-default": "https://www.willdrafting.in/templates/revocation-of-will-deed-format-india",
    },
  },
  openGraph: {
    title: "Cancel Registered Will in India Format | WillDrafting",
    description:
      "Download legally valid deed of revocation of will format in India. Learn how to cancel a registered will under Section 70 of Indian Succession.",
    url: "https://www.willdrafting.in/templates/revocation-of-will-deed-format-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/revocation-of-will-deed-format-india-og.jpg",
        width: 1200,
        height: 675,
        alt: "Deed of Revocation of Will Format India Legal Cancellation Template and SRO Guidelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancel Registered Will in India Format | WillDrafting",
    description:
      "Download legally valid deed of revocation of will format in India. Learn how to cancel a registered will under Section 70 of Indian Succession.",
    images: ["https://www.willdrafting.in/images/revocation-of-will-deed-format-india-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function RevocationOfWillPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/revocation-of-will-deed-format-india";
  const imageUrl = "https://www.willdrafting.in/images/revocation-of-will-deed-format-india-og.jpg";

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
        name: "Cancel Registered Will in India Format | WillDrafting",
        description:
          "Download legally valid deed of revocation of will format in India. Learn how to cancel a filed will under Section 70 of Indian Succession.",
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
            name: "Revocation of Will Deed Format India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Deed of Revocation of Will Format India",
        url: canonicalUrl,
        description:
          "Full legal Deed of Revocation of Will format and SRO cancellation guidelines under Section 70 of the Indian Succession.",
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
            name: "Can a registered Will be cancelled in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 62 and Section 70 of the Indian Succession Act, 1925, any Will, whether filed or plain, can be revoked at any time during the lifetime of the Will maker, provided the Will maker possesses sound disposing mind. Filing does not make a Will irrevocable.",
            },
          },
          {
            "@type": "Question",
            name: "What is the best way to revoke an old registered Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The cleanest, legally safest, and most cost-effective method is to execute and register a brand new Will containing an express revocation clause revoking all prior Wills. This supersedes the old filed Will and sets up your new asset split without creating an intestacy vacuum.",
            },
          },
          {
            "@type": "Question",
            name: "Can I revoke a registered Will simply by tearing or burning it?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "While Section 70 allows revocation by destruction with intention (animus revocandi), destroying a filed Will physically is dangerous. A certified copy remains on record at the SRO office, which disgruntled heirs could misuse after your death. Signing a formal written paper or new filed Will is strongly advised.",
            },
          },
          {
            "@type": "Question",
            name: "Is it compulsory to register a Deed of Revocation at the Sub-Registrar Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Filing of a revocation deed is a choice under Section 18 of the Filing Act. However, if the original Will was filed, registering the revocation deed (or a new filed Will) at the same SRO office is essential to record the cancellation in SRO Book 3 records.",
            },
          },
          {
            "@type": "Question",
            name: "How many witnesses are required to attest a Deed of Revocation of Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 70 read with Section 63 of the Indian Succession Act, a written declaration of revocation must be signed with the exact same formalities as a Will: signed by the Will maker in the presence of at least two independent signing witnesses who see the Will maker sign.",
            },
          },
          {
            "@type": "Question",
            name: "Can an NRI cancel an Indian registered Will while residing abroad?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An NRI can execute a new Indian Will or a standalone Deed of Revocation abroad, get it attested by two witnesses, notarized, and authenticated by the Indian Embassy or apostilled under the Hague Apostille Convention.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if I cancel my registered Will without making a new one?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If you cancel your Will without signing a replacement Will, you die no-Will. Upon your demise, all your cash and land assets will be distributed strictly according to personal estate laws, such as the Hindu Succession Act, 1956 or Indian Succession Act, 1925, among all legal heirs equally.",
            },
          },
          {
            "@type": "Question",
            name: "Can beneficiaries challenge my decision to cancel a registered Will while I am alive?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A Will has zero legal effect during the Will maker's lifetime. Heirs have no vested right or claim to the asset while you are alive, and they have no legal standing to fight your revocation or replacement of a Will.",
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
      <Navbar />
      <RevocationDeedClient />
      <Footer />
    </>
  );
}
