import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "will-vs-family-trust-india" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "will-vs-family-trust-india" }),
  });
}

// ============================================================================
// HARDCODED BLOG COMMENTED OUT (PRESERVED — NOW RENDERED FROM MONGODB)
// ============================================================================
// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import WillVsFamilyTrustClient from "./WillVsFamilyTrustClient";
// 
// export const metadata: Metadata = {
//   title: {
//     absolute: "Will vs Family Trust in India: Legal Guide | WillDrafting",
//   },
//   description:
//     "Will vs family trust in India: compare setup costs, privacy, tax rules, and asset safety under Indian Trusts Act. Choose the right estate plan with WillDrafting.in.",
//   keywords: [
//     "will vs trust india",
//     "family trust vs will",
//     "private trust india",
//     "trust for estate planning india",
//     "will or trust which is better",
//     "indian trusts act 1882",
//     "private family trust registration india",
//     "revocable vs irrevocable trust india",
//     "discretionary trust taxation india",
//     "probate vs trust india",
//     "pour over will india",
//     "WillDrafting.in estate planning",
//   ],
//   alternates: {
//     canonical:
//       "https://www.willdrafting.in/blogs/will-vs-family-trust-india",
//     languages: {
//       "en-IN":
//         "https://www.willdrafting.in/blogs/will-vs-family-trust-india",
//       "x-default":
//         "https://www.willdrafting.in/blogs/will-vs-family-trust-india",
//     },
//   },
//   openGraph: {
//     title: "Will vs Family Trust in India: Legal Guide | WillDrafting",
//     description:
//       "Will vs family trust in India: compare setup costs, privacy, tax rules, and asset safety under Indian Trusts Act. Choose the right estate plan with WillDrafting.in.",
//     url: "https://www.willdrafting.in/blogs/will-vs-family-trust-india",
//     siteName: "WillDrafting.in",
//     locale: "en_IN",
//     type: "article",
//     images: [
//       {
//         url: "https://www.willdrafting.in/images/will-vs-family-trust-india.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Will vs Family Trust in India Legal Comparison and Estate Planning Guide",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Will vs Family Trust in India: Legal Guide | WillDrafting",
//     description:
//       "Will vs family trust in India: compare setup costs, privacy, tax rules, and asset safety under Indian Trusts Act. Choose the right estate plan with WillDrafting.in.",
//     images: [
//       "https://www.willdrafting.in/images/will-vs-family-trust-india.jpg",
//     ],
//   },
//   robots: {
//     index: true,
//     follow: true,
//     "max-snippet": -1,
//     "max-image-preview": "large",
//     "max-video-preview": -1,
//   },
// };
// 
// export default function WillVsFamilyTrustPage() {
//   const canonicalUrl =
//     "https://www.willdrafting.in/blogs/will-vs-family-trust-india";
//   const imageUrl =
//     "https://www.willdrafting.in/images/will-vs-family-trust-india.jpg";
// 
//   const schemaGraph = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Organization",
//         "@id": "https://www.willdrafting.in/#organization",
//         name: "WillDrafting.in",
//         url: "https://www.willdrafting.in",
//         logo: "https://www.willdrafting.in/Logofinal.svg",
//         parentOrganization: {
//           "@type": "LegalService",
//           name: "WillDrafting.in",
//           url: "https://www.willdrafting.in/contact",
//         },
//       },
//       {
//         "@type": "WebPage",
//         "@id": `${canonicalUrl}#webpage`,
//         url: canonicalUrl,
//         name: "Will vs Family Trust in India: Legal Guide | WillDrafting",
//         description:
//           "Will vs family trust in India: compare setup costs, privacy, tax rules, and asset safety under Indian Trusts Act. Choose the right estate plan with WillDrafting.in.",
//         isPartOf: {
//           "@type": "WebSite",
//           "@id": "https://www.willdrafting.in/#website",
//           name: "WillDrafting.in",
//           url: "https://www.willdrafting.in",
//         },
//       },
//       {
//         "@type": "BreadcrumbList",
//         "@id": `${canonicalUrl}#breadcrumb`,
//         itemListElement: [
//           {
//             "@type": "ListItem",
//             position: 1,
//             name: "Home",
//             item: "https://www.willdrafting.in",
//           },
//           {
//             "@type": "ListItem",
//             position: 2,
//             name: "Blogs",
//             item: "https://www.willdrafting.in/blogs",
//           },
//           {
//             "@type": "ListItem",
//             position: 3,
//             name: "Will vs Family Trust India",
//             item: canonicalUrl,
//           },
//         ],
//       },
//       {
//         "@type": "Article",
//         "@id": `${canonicalUrl}#article`,
//         headline: "Will vs Family Trust in India: Which is Right for You?",
//         description:
//           "Statutory comparison of Wills and Private Family Trusts under the Indian Succession Act 1925, Indian Trusts Act 1882, and Income Tax Act 1961.",
//         image: imageUrl,
//         author: {
//           "@type": "Person",
//           name: "Adv. Sneha Jaiswal",
//           jobTitle: "Senior Succession & Trust Counsel",
//           worksFor: {
//             "@type": "LegalService",
//             name: "WillDrafting.in",
//           },
//         },
//         publisher: {
//           "@type": "Organization",
//           name: "WillDrafting.in",
//           logo: {
//             "@type": "ImageObject",
//             url: "https://www.willdrafting.in/Logofinal.svg",
//           },
//         },
//         datePublished: "2026-10-21T09:00:00+05:30",
//         dateModified: "2026-10-21T09:00:00+05:30",
//         mainEntityOfPage: canonicalUrl,
//         articleSection: "Estate Planning and Private Trusts",
//         inLanguage: "en-IN",
//       },
//       {
//         "@type": "FAQPage",
//         "@id": `${canonicalUrl}#faq`,
//         mainEntity: [
//           {
//             "@type": "Question",
//             name: "What is the main difference between a Will and a family trust in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Will is a testamentary document that takes effect only after your death and can be revoked or changed anytime during your life. In contrast, a private family trust is a legal arrangement created under the Indian Trusts Act, 1882, where you transfer assets to trustees during your lifetime or upon death to manage for beneficiaries according to specific rules, staged milestones, and conditions.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "When is a simple Will enough for an Indian family?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Will is 100% sufficient for most Indian families where total estate value is below ₹5 Crores, assets are straightforward (such as a family home, bank deposits, mutual funds, and insurance), family relationships are harmonious, and adult children receive outright shares. It costs virtually nothing to maintain and avoids complex trust compliance.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "When does creating a private family trust make sense?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A family trust makes sense for High Net Worth Individuals (HNIs with assets of ₹5 Crores or more), business owners planning corporate succession, families with minor children or special needs dependents requiring lifetime financial care, blended families with children from previous marriages, or individuals seeking complete privacy to avoid public court probate.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does a family trust bypass probate in Mumbai, Chennai, or Kolkata?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. While Section 213 of the Indian Succession Act makes probate mandatory for Wills of Hindus, Buddhists, Sikhs, and Jains executed in or covering immovable property within Mumbai, Chennai, or Kolkata, a private living trust bypasses probate completely. Trust assets pass directly to beneficiaries or remain under trustee management without any court proceedings or public scrutiny.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Is a private family trust completely private in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. A private family trust is a confidential legal agreement between the settlor and the trustees. Unlike a Will that becomes a matter of public court record once a probate petition is filed with newspaper notices, a trust deed and its asset distributions remain private and confidential among the family members and trustees.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How are private family trusts taxed in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under the Income Tax Act, 1961, trust taxation depends on its structure. A determinate (specific) trust where beneficiaries and their exact shares are named is taxed at the individual income slab rates of the beneficiaries (Section 161). A discretionary trust where trustees decide payouts is taxed at the Maximum Marginal Rate (MMR of approx. 39% or 42.74%) under Section 164, unless created under a Will exclusively for dependent relatives.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does a family trust protect my assets from creditors or insolvency?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "An irrevocable family trust provides strong asset protection against future business liabilities and personal creditors, provided the trust was settled legitimately before any debt arose. However, under Section 53 of the Transfer of Property Act, 1882, transfers made to defraud existing creditors can be set aside by courts. A revocable trust offers zero creditor protection because the settlor retains control.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What is a Pour-Over Will and how does it work with a trust?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Pour-Over Will is a specialized Will designed to work alongside an existing living family trust. It acts as a legal safety net by directing that any assets left in your personal name at death that were not previously transferred into your family trust should automatically 'pour over' into the trust upon your demise to be distributed under the trust rules.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How much does it cost to set up and maintain a family trust vs a Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Will has zero stamp duty across India and negligible maintenance costs (₹0 per year). A private family trust requires state stamp duty on the trust deed (ranging from nominal fixed duty to 2% to 5% depending on state and whether immovable property is settled), registration fees, obtaining a PAN card, opening a dedicated bank account, and recurring annual accounting, audit, and ITR-5 tax filing fees (typically ₹25,000 to ₹1,00,000+ annually).",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can I change my mind after creating a family trust in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "If you create a Revocable Family Trust, you can alter, amend, or completely revoke the trust at any time under Section 77 and 78 of the Indian Trusts Act, 1882. However, if you create an Irrevocable Family Trust, you cannot cancel the trust or take back the assets without the consent of all beneficiaries, which is why irrevocable trusts require careful legal planning.",
//             },
//           },
//         ],
//       },
//     ],
//   };
// 
//   return (
//     <>
//       <Navbar />
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
//       />
//       <WillVsFamilyTrustClient />
//       <Footer />
//     </>
//   );
// }
// 
