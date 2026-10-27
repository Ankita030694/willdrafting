import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoObjectionCertificateClient from "./NoObjectionCertificateClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Legal Heir NOC Format for Property Transfer | WillDrafting", // exactly 58 characters
  },
  description:
    "Download legally valid noc format from legal heirs for property transfer, bank claims & vehicle mutation. Understand Section 17 Registration Act rules.", // exactly 151 characters
  keywords: [
    "noc format from legal heirs for property transfer",
    "no objection affidavit from legal heirs for bank claim",
    "legal heir noc for mutation electricity vehicle transfer",
    "noc from legal heirs for flat transfer",
    "legal heir noc format word pdf",
    "section 17 registration act noc validity",
    "yellapu uma maheswari supreme court precedent",
    "noc affidavit on stamp paper format india",
    "rto form 31 legal heir noc vehicle transfer",
    "bank deceased claim legal heir no objection format",
    "relinquishment deed vs legal heir noc",
    "ama legal solutions noc legal heir advocate",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/no-objection-certificate-noc-legal-heirs-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/no-objection-certificate-noc-legal-heirs-format",
      "x-default": "https://www.willdrafting.in/templates/no-objection-certificate-noc-legal-heirs-format",
    },
  },
  openGraph: {
    title: "Legal Heir NOC Format for Property Transfer | WillDrafting",
    description:
      "Download legally valid noc format from legal heirs for property transfer, bank claims & vehicle mutation. Understand Section 17 Registration Act rules.",
    url: "https://www.willdrafting.in/templates/no-objection-certificate-noc-legal-heirs-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/no-objection-certificate-noc-legal-heirs-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Legal Heir NOC Format for Property Transfer, Bank Claims, and Vehicle Mutation India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Heir NOC Format for Property Transfer | WillDrafting",
    description:
      "Download legally valid noc format from legal heirs for property transfer, bank claims & vehicle mutation. Understand Section 17 Registration Act rules.",
    images: ["https://www.willdrafting.in/images/no-objection-certificate-noc-legal-heirs-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function NoObjectionCertificatePage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/no-objection-certificate-noc-legal-heirs-format";
  const imageUrl = "https://www.willdrafting.in/images/no-objection-certificate-noc-legal-heirs-format-og.jpg";

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
        name: "Legal Heir NOC Format for Property Transfer | WillDrafting",
        description:
          "Download legally valid noc format from legal heirs for property transfer, bank claims & vehicle mutation. Understand Section 17 Registration Act rules.",
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
            name: "Legal Heir NOC Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "No Objection Certificate (NOC) from Legal Heirs Format",
        url: canonicalUrl,
        description:
          "Lawyer-vetted No Objection Certificate (NOC) formats from legal heirs for property mutation, bank account claims, RTO vehicle transfer, and court probate consent under Indian succession laws.",
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
            name: "Is a plain NOC on stamp paper sufficient to give up my share in inherited property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 17(1)(b) of the Registration Act, 1908 and the Supreme Court ruling in Yellapu Uma Maheswari v. Buddha Jagadheeswararao (2015), any instrument that purports to extinguish, create, or transfer an undivided share in immovable property worth over Rs. 100 must be compulsorily registered. A simple NOC only permits administrative municipal mutation or utility transfer. To legally surrender co-ownership title, co-heirs must execute a registered Relinquishment Deed (Haq Tyag) or Gift Deed.",
            },
          },
          {
            "@type": "Question",
            name: "What is the non-judicial stamp paper value required for a legal heir NOC affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For administrative purposes like bank deceased claims, municipal mutation, or RTO vehicle transfer, a legal heir NOC affidavit is printed on non-judicial stamp paper of Rs. 10, Rs. 20, Rs. 50, or Rs. 100 depending on state stamp schedules (such as Rs. 100 in Maharashtra and Uttar Pradesh, Rs. 50 in Karnataka, and Rs. 10 in Delhi) and attested by a Notary Public or Oath Commissioner.",
            },
          },
          {
            "@type": "Question",
            name: "Can a sibling who signed an NOC for property transfer later file a partition suit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Because an unregistered NOC does not extinguish title under the Transfer of Property Act, a sibling who signed an NOC for municipal mutation can file a partition suit in civil court within the 12-year limitation period. The Supreme Court has repeatedly held that mutation in municipal records does not confer or extinguish title. A registered Relinquishment Deed is required to permanently bar future partition claims.",
            },
          },
          {
            "@type": "Question",
            name: "What are the RBI rules for legal heir NOC in deceased bank account claims?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under RBI Master Circular DBOD.No.Leg.BC.21/09.07.006/2014-15, when a deceased depositor leaves savings or fixed deposit accounts without nomination, banks permit settlement to one legal heir provided all other Class I legal heirs submit a notarized No Objection Certificate alongside an Indemnity Bond (Form Annexure-A) and Letter of Disclaimer (Annexure-C).",
            },
          },
          {
            "@type": "Question",
            name: "How is an NOC from legal heirs used for RTO vehicle RC transfer after death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Rule 56 of the Central Motor Vehicles Rules, 1989 and Section 50 of the Motor Vehicles Act, 1988, legal heirs must apply via RTO Form 31 within 3 months of the owner's death. When multiple legal heirs survive, all other heirs must sign a joint No Objection Affidavit on stamp paper agreeing that the vehicle registration certificate (RC) be transferred to a single surviving heir.",
            },
          },
          {
            "@type": "Question",
            name: "Is an NOC required from all legal heirs for electricity and water connection transfer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. State power distribution companies and municipal water boards require an Indemnity Bond and a signed NOC on stamp paper from all other legal heirs before transferring an existing utility meter from the deceased parent's name to a single heir.",
            },
          },
          {
            "@type": "Question",
            name: "Can an NRI legal heir execute a valid NOC from outside India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An NRI legal heir can execute the NOC affidavit in their overseas country of residence before a Notary Public or the Indian Embassy / Consulate. Once received in India, the document must be adjudicated and stamped under Section 18 of the Indian Stamp Act, 1899 within three months of arrival.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a probate consent NOC and a property release deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A probate consent NOC is an affidavit filed in the High Court or District Court confirming that the legal heir has no objection to the grant of probate or letters of administration under a specific Will. It validates testamentary execution. A Relinquishment Deed, by contrast, is an inter-vivos deed registered at the SRO when there is no Will, transferring an undivided ancestral share to a co-heir.",
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
      <NoObjectionCertificateClient />
      <Footer />
    </>
  );
}
