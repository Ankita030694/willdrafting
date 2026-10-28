import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MirrorWillsForCouplesClient from "./MirrorWillsForCouplesClient";

export const metadata: Metadata = {
  title: {
    absolute: "Mirror Wills for Couples in India: Joint Will Guide",
  },
  description:
    "Protect your family with mirror wills in India. Avoid risky joint wills, secure mutual clauses under ISA 1925, and draft legally sound wills.",
  keywords: [
    "joint will",
    "mirror will husband wife",
    "mirror will india",
    "couples will india",
    "husband wife will",
    "mutual will",
    "joint will india",
    "section 62 indian succession act",
    "survivorship clause will india",
    "joint property will husband wife",
    "testamentary guardianship couples will",
    "mirror wills vs joint wills",
    "ama legal solutions mirror wills",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/services/mirror-wills-for-couples",
    languages: {
      "en-IN": "https://www.willdrafting.in/services/mirror-wills-for-couples",
      "x-default": "https://www.willdrafting.in/services/mirror-wills-for-couples",
    },
  },
  openGraph: {
    title: "Mirror Wills for Couples in India: Joint Will Guide",
    description:
      "Protect your family with mirror wills in India. Avoid risky joint wills, secure mutual clauses under ISA 1925, and draft legally sound wills.",
    url: "https://www.willdrafting.in/services/mirror-wills-for-couples",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/mirror-wills-for-couples-og.jpg",
        width: 1200,
        height: 630,
        alt: "Mirror Wills for Couples in India Legal Guide and Advocate Drafting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirror Wills for Couples in India: Joint Will Guide",
    description:
      "Protect your family with mirror wills in India. Avoid risky joint wills, secure mutual clauses under ISA 1925, and draft legally sound wills.",
    images: ["https://www.willdrafting.in/images/mirror-wills-for-couples-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function MirrorWillsForCouplesPage() {
  const canonicalUrl = "https://www.willdrafting.in/services/mirror-wills-for-couples";
  const imageUrl = "https://www.willdrafting.in/images/mirror-wills-for-couples-og.jpg";

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
        name: "Mirror Wills for Couples in India: Joint Will Guide",
        description:
          "Protect your family with mirror wills in India. Avoid risky joint wills, secure mutual clauses under ISA 1925, and draft legally sound wills.",
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
            name: "Services",
            item: "https://www.willdrafting.in/service",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Mirror Wills for Couples",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: "Mirror Wills for Couples in India: Coordinated Estate Planning",
        serviceType: "Dual Testamentary Drafting & Mutual Estate Protection",
        provider: {
          "@type": "LegalService",
          name: "AMA Legal Solutions & WillDrafting",
          url: "https://www.amalegalsolutions.com",
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        description:
          "Specialized estate planning for married couples. We draft two coordinated, legally independent Wills with cross-bequests, survivorship.",
        offers: [
          {
            "@type": "Offer",
            name: "Auto Verified Couple Plan",
            price: "2490",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: "https://www.willdrafting.in/start",
            description: "Instant statutory mirror will drafting for couples with Section 63 compliant clauses.",
          },
          {
            "@type": "Offer",
            name: "Lawyer Verified Couple Plan",
            price: "4990",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: "https://www.willdrafting.in/start",
            description: "High Court advocate vetting of cross-bequests, joint tenancy clauses, and guardianship terms.",
          },
          {
            "@type": "Offer",
            name: "Connect to Lawyer Couple Plan",
            price: "9990",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: "https://www.willdrafting.in/start",
            description: "Dedicated succession advocate consultation for complex family arrangements, NRI assets, and trust structures.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the fundamental difference between a Mirror Will and a Joint Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Mirror Will consists of two separate, independent legal documents executed individually by each spouse with matching cross-bequests. A Joint Will is a single physical document signed by both spouses disposing of their combined property. In India, Mirror Wills are strongly recommended because they allow clean probate, independent registration, and clear revocability under Section 62 of the Indian Succession Act, 1925.",
            },
          },
          {
            "@type": "Question",
            name: "Are Joint Wills legal under the Indian Succession Act, 1925?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "While Indian courts recognize that joint wills can operate as the separate will of each testator with respect to their own property, joint wills create severe practical complications. Sub-Registrars often raise indexing objections, probate courts struggle with partial probate on the first spouse's death, and litigation frequently arises over whether the surviving spouse has the right to amend the document.",
            },
          },
          {
            "@type": "Question",
            name: "Can a surviving spouse change their Mirror Will after the first spouse dies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 62 of the Indian Succession Act, 1925, every competent testator retains the absolute statutory right to revoke or alter their Will at any time during their lifetime. Because Mirror Wills are two separate documents, the surviving spouse retains complete testamentary freedom to adapt to new life circumstances unless an explicit, enforceable mutual trust covenant was established.",
            },
          },
          {
            "@type": "Question",
            name: "What is a 30-day survivorship clause and why is it essential for couples?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A 30-day survivorship clause specifies that a spouse must survive the deceased spouse by a defined period (usually 30 days) to inherit the estate. If both spouses pass away simultaneously or within days in a common accident, the estate bypasses the deceased spouse and passes directly to named contingent beneficiaries, avoiding double probate, double stamp duty, and administrative gridlock.",
            },
          },
          {
            "@type": "Question",
            name: "How do Mirror Wills handle minor children and legal guardianship?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both parents designate the exact same primary and alternate legal guardians in their respective Mirror Wills under Section 60 of the Indian Succession Act and the Guardians and Wards Act, 1890. This guarantees that if both parents pass away together, there is zero ambiguity or custody disputes among relatives regarding who will raise the children.",
            },
          },
          {
            "@type": "Question",
            name: "Do husband and wife need separate witnesses or the same witnesses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both spouses may use the same two trusted witnesses (such as long-time family friends or family physicians), but each Will must be executed and attested as a distinct legal act under Section 63(c). Crucially, neither spouse nor any named child beneficiary can act as an attesting witness, as Section 67 voids bequests made to attesting witnesses.",
            },
          },
          {
            "@type": "Question",
            name: "Do Mirror Wills need to be registered at the Sub-Registrar Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Registration is optional under Section 18(e) of the Registration Act, 1908. A Mirror Will executed on plain white paper with two witnesses is 100% legally valid. However, registering both Wills at the Sub-Registrar Office provides permanent government custody, verifiable date stamps, and shields the estate against allegations of forgery or undue influence.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a couple divorces after executing Mirror Wills?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Unlike some Western jurisdictions where divorce automatically revokes spousal bequests, under Indian succession law, divorce does NOT automatically revoke a Will. Therefore, upon legal separation or divorce, each party must actively execute a new Will explicitly revoking the former Mirror Will under Section 62 and Section 70 of the Indian Succession Act, 1925.",
            },
          },
          {
            "@type": "Question",
            name: "How do Mirror Wills protect blended families or children from a previous marriage?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For blended families, a simple mirror bequest leaving everything to the survivor risks disinheriting children from a first marriage if the survivor later changes their Will. In such cases, advocates draft structured Mirror Wills granting a life interest (usufructuary right) to the surviving spouse with the absolute remainder vested in named biological children.",
            },
          },
          {
            "@type": "Question",
            name: "Does a nominee on joint bank accounts or property override a Mirror Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court of India has repeatedly held (including in Ram Chander Talwar and Sarbati Devi) that a nominee is merely a temporary custodian or trustee who receives funds to hold them on behalf of the lawful legal heirs. A valid Will supersedes nomination, ensuring that the intentions expressed in your Mirror Will prevail over bank or property nominee records.",
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
      <MirrorWillsForCouplesClient />
      <Footer />
    </>
  );
}