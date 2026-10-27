import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestamentaryTrustClauseClient from "./TestamentaryTrustClauseClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Testamentary Trust Clause in Will Format | WillDrafting", // exactly 55 characters
  },
  description:
    "Download testamentary trust clause in will format india under Indian Trusts Act. Staggered milestone payouts at 18, 21, 25 for minor child & special needs.", // exactly 155 characters
  keywords: [
    "testamentary trust clause in will format india",
    "minor child trust clause in will india",
    "special needs child trust clause template will",
    "indian trusts act 1882 section 5 testamentary trust",
    "trust clause in will for minor children",
    "staggered inheritance age 18 21 25 trust clause",
    "spendthrift trust clause format india",
    "guardians and wards act section 29 permission bypass",
    "representative assessee section 161 income tax act",
    "trustee vs legal guardian of minor child will",
    "private family trust inside will stamp duty savings",
    "ama legal solutions testamentary trust advocate",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/testamentary-trust-clause-minor-child-will-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/testamentary-trust-clause-minor-child-will-format",
      "x-default": "https://www.willdrafting.in/templates/testamentary-trust-clause-minor-child-will-format",
    },
  },
  openGraph: {
    title: "Testamentary Trust Clause in Will Format | WillDrafting",
    description:
      "Download testamentary trust clause in will format india under Indian Trusts Act. Staggered milestone payouts at 18, 21, 25 for minor child & special needs.",
    url: "https://www.willdrafting.in/templates/testamentary-trust-clause-minor-child-will-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/testamentary-trust-clause-minor-child-will-format-og.jpg",
        width: 1376,
        height: 768,
        alt: "Testamentary Trust Clause in Will Format India for Minor and Special Needs Children",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Testamentary Trust Clause in Will Format | WillDrafting",
    description:
      "Download testamentary trust clause in will format india under Indian Trusts Act. Staggered milestone payouts at 18, 21, 25 for minor child & special needs.",
    images: ["https://www.willdrafting.in/images/testamentary-trust-clause-minor-child-will-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function TestamentaryTrustClausePage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/testamentary-trust-clause-minor-child-will-format";
  const imageUrl =
    "https://www.willdrafting.in/images/testamentary-trust-clause-minor-child-will-format-og.jpg";

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
        name: "Testamentary Trust Clause in Will Format | WillDrafting",
        description:
          "Download testamentary trust clause in will format india under Indian Trusts Act. Staggered milestone payouts at 18, 21, 25 for minor child & special needs.",
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
            name: "Testamentary Trust Clause in Will",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Testamentary Trust Clause for Minor Children in Will Format India",
        url: canonicalUrl,
        description:
          "Lawyer-drafted testamentary trust clause for minor children and special needs dependents under Section 5 of the Indian Trusts Act, 1882 and Indian Succession Act, 1925, featuring trustee fiduciary powers, milestone payouts at ages 18, 21, and 25, and spendthrift protection.",
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
            name: "What is a testamentary trust clause in a Will under Indian law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A testamentary trust clause is a specific provision inserted into a Will that directs the testator's executor to transfer designated assets into a private trust upon the testator's demise, rather than handing them over directly to beneficiaries. Governed under Section 5 of the Indian Trusts Act, 1882, the trust comes into legal existence only after the death of the testator when the Will takes effect.",
            },
          },
          {
            "@type": "Question",
            name: "Does creating a testamentary trust require stamp duty during my lifetime?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Unlike an inter-vivos (living) trust which requires an immediate registered trust deed attracting state stamp duty (often 3% to 5% of asset value) and annual accounting compliance, a testamentary trust created under Section 5 of the Indian Trusts Act, 1882 requires ZERO upfront stamp duty or registration during your lifetime. It is established directly through your validly executed Will at no additional setup expense.",
            },
          },
          {
            "@type": "Question",
            name: "Why should I create a testamentary trust instead of leaving property directly to my minor child?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a minor child inherits immovable property directly, Section 29 of the Guardians and Wards Act, 1890 strictly prohibits any legal guardian from selling, mortgaging, or leasing the property for more than 5 years without prior permission from the District Court. This often traps family assets in judicial delays during educational emergencies. Furthermore, at age 18, the child gets sudden unrestricted access to substantial wealth. A testamentary trust bypasses court approvals and staggers distributions over mature milestones.",
            },
          },
          {
            "@type": "Question",
            name: "How does a milestone payout schedule (e.g., ages 18, 21, and 25) work under Indian law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 119 and 120 of the Indian Succession Act, 1925, a testator has testamentary freedom to specify contingent or deferred vesting terms. The clause provides that the corpus remains with the trustees who fund medical and educational needs until age 18, release a partial lump-sum (e.g., 20%) at 18 for undergraduate studies, another tranche (e.g., 30%) at age 21 for post-graduate education or career launch, and the final 50% capital at age 25 when the child possesses mature financial judgment.",
            },
          },
          {
            "@type": "Question",
            name: "Can a testamentary trust protect my child's inheritance from creditors or spendthrift spouses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. By incorporating an express 'Spendthrift / Protective Clause', the legal title remains vested in the trustees while the beneficiary holds only a beneficial right to discretionary distributions. Under Indian trust jurisprudence, because the child does not possess absolute ownership of the underlying capital until milestone vesting, creditors, business liabilities, or estranged matrimonial partners cannot attach or liquidate the trust corpus.",
            },
          },
          {
            "@type": "Question",
            name: "How does a testamentary trust safeguard a child with special needs or intellectual disability?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For children with physical or intellectual disabilities, a Special Needs Testamentary Trust ensures lifelong medical treatment, caretaking, and assisted living without terminating upon reaching majority. The clause coordinates with Section 14 of the National Trust Act, 1999 and the Rights of Persons with Disabilities Act, 2016 to appoint a Local Level Committee guardian alongside independent co-trustees or corporate fiduciary managers.",
            },
          },
          {
            "@type": "Question",
            name: "How is income earned by a testamentary trust taxed under the Income Tax Act, 1961?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 160(1)(iv) and Section 161 of the Income Tax Act, 1961, trustees of a testamentary trust are assessed as 'Representative Assessees'. When the trust is created for a minor child with determinate beneficiaries and defined shares (a Specific Trust created under a Will), the income is taxed at the individual personal tax slab rate of the beneficiary, rather than at the punitive Maximum Marginal Rate (MMR) of 42.744% that applies to discretionary living trusts.",
            },
          },
          {
            "@type": "Question",
            name: "Can the legal guardian of the child also be appointed as the trustee?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "While legally permissible, it is strongly advised by succession lawyers to separate the role of 'Guardian of the Person' (who provides daily care, shelter, and emotional nurture) from the 'Trustee of the Property' (who manages investments, bank accounts, and approvals). Alternatively, appoint a trusted financial advisor or professional co-trustee alongside the guardian to provide vital fiduciary checks and balances.",
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
      <div className="min-h-screen bg-[#FAF7F0] text-[#172228] antialiased selection:bg-[#C65378] selection:text-white">
        <Navbar />
        <TestamentaryTrustClauseClient />
        <Footer />
      </div>
    </>
  );
}
