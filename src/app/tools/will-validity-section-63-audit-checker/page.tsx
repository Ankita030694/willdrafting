import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillValidityAuditClient from "./WillValidityAuditClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Check If Will Is Valid in India: Sec 63 | WillDrafting", // 54 characters
  },
  description:
    "Use our free 12-question audit tool to check if Will is valid in India under Section 63 & 67 of the Indian Succession Act, 1925. Get your.", // 148 characters
  keywords: [
    "check if will is valid in india",
    "will validity checker india",
    "section 63 indian succession act checklist",
    "can my will be challenged quiz",
    "section 67 beneficiary witness will india",
    "h venkatachala iyengar suspicious circumstances will",
    "is unregistered plain paper will valid in india",
    "is aadhaar esign valid for will in india",
    "missing attestation clause in will india",
    "doctor fitness certificate for will india",
    "how to check if diy will is valid",
    "ama legal solutions will validity audit",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/will-validity-section-63-audit-checker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/will-validity-section-63-audit-checker",
      "x-default": "https://www.willdrafting.in/tools/will-validity-section-63-audit-checker",
    },
  },
  openGraph: {
    title: "Check If Will Is Valid in India: Sec 63 | WillDrafting",
    description:
      "Use our free 12-question audit tool to check if Will is valid in India under Section 63 & 67 of the Indian Succession Act, 1925. Get your.",
    url: "https://www.willdrafting.in/tools/will-validity-section-63-audit-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-validity-section-63-audit-checker-og.jpg",
        width: 1200,
        height: 675,
        alt: "Check If Will Is Valid in India - Section 63 Audit Checker and Court-Defensibility Score",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Check If Will Is Valid in India: Sec 63 | WillDrafting",
    description:
      "Use our free 12-question audit tool to check if Will is valid in India under Section 63 & 67 of the Indian Succession Act, 1925. Get your.",
    images: ["https://www.willdrafting.in/images/will-validity-section-63-audit-checker-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillValidityAuditCheckerPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/will-validity-section-63-audit-checker";
  const imageUrl = "https://www.willdrafting.in/images/will-validity-section-63-audit-checker-og.jpg";

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
        name: "Check If Will Is Valid in India: Sec 63 | WillDrafting",
        description:
          "Use our free 12-question audit tool to check if Will is valid in India under Section 63 & 67 of the Indian Succession Act, 1925. Get your.",
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
            name: "Will Validity Section 63 Audit Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Will Validity & Section 63 Audit Checker India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive 12-question legal diagnostic tool that checks if a Will is valid in India under Sections 59, 61, 63, and 67 of the Indian.",
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
            name: "How do I check if a Will is valid in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To be legally valid in India, a Will must satisfy four statutory rules under the Indian Succession Act, 1925: (1) The testator must be an adult of sound mind under Section 59, (2) The Will must be made voluntarily without fraud or coercion under Section 61, (3) The testator must sign or affix a thumb mark with intent to give effect to the Will under Section 63(a) and 63(b), and (4) At least two witnesses must attest the Will in the testator's presence under Section 63(c).",
            },
          },
          {
            "@type": "Question",
            name: "Is a plain-paper or unregistered Will legally valid in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 18(e) of the Registration Act, 1908, registration of a Will is completely optional. A Will written or printed on plain white paper carries zero stamp duty and is 100% legally valid if it is properly signed by the testator and attested by two witnesses under Section 63 of the Indian Succession Act, 1925.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a beneficiary or their spouse signs as a witness to a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 67 of the Indian Succession Act, 1925, if an attesting witness or their spouse is given a bequest in the Will, that specific bequest becomes legally void (strictly enforced for Christian and Parsi Wills). For Hindu, Sikh, Jain, and Buddhist Wills, courts treat a beneficiary or their spouse acting as a witness as a severe suspicious circumstance indicating undue influence.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Will require a doctor certificate to be valid in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A doctor certificate is not mandatory by statute under Section 63. Look at Supreme Court rulings like H. Venkatachala Iyengar v. B.N. Thimmajamma: when a testator is a senior citizen (above age 65) or unwell, attaching a simultaneous mental fitness certificate from an MBBS or MD doctor prevents rival heirs from challenging testamentary capacity under Section 59.",
            },
          },
          {
            "@type": "Question",
            name: "Is a Will signed with Aadhaar eSign or Digital Signature valid in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 1(4) read with Entry 3 of the First Schedule to the Information Technology Act, 2000, testamentary dispositions and Wills are explicitly excluded from electronic signature validity. You can draft a Will online, but you must print it on physical paper and sign it in wet ink or thumb impression before two physical witnesses.",
            },
          },
          {
            "@type": "Question",
            name: "Is a handwritten or diary Will valid without witnesses in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Unlike some foreign jurisdictions that allow unwitnessed holographic Wills, Section 63(c) of the Indian Succession Act requires every unprivileged Will in India, whether typed or handwritten, to be attested by at least two witnesses. An unwitnessed handwritten note is void.",
            },
          },
          {
            "@type": "Question",
            name: "Do both attesting witnesses need to sign the Will at the exact same time?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 63(c) of the Indian Succession Act, it is not strictly necessary for both witnesses to be present at the exact same moment, provided each witness either sees the testator sign or receives a personal acknowledgment of the signature from the testator, and each witness signs in the presence of the testator. However, signing together in one sitting is the safest practice.",
            },
          },
          {
            "@type": "Question",
            name: "How can I fix a defective DIY Will while I am still alive?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 62 and Section 70 of the Indian Succession Act, 1925, a Will is revocable and can be replaced at any time during the testator's lifetime. Do not cross out or overwrite lines on an old Will. Instead, execute a fresh, properly structured Will containing an express revocation clause and sign it before two independent adult witnesses.",
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
        <WillValidityAuditClient />
        <Footer />
      </div>
    </>
  );
}
