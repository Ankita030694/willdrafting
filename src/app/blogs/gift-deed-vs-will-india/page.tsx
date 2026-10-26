import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "gift-deed-vs-will-india" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "gift-deed-vs-will-india" }),
  });
}

// ============================================================================
// HARDCODED BLOG COMMENTED OUT (PRESERVED — NOW RENDERED FROM MONGODB)
// ============================================================================
// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import GiftDeedVsWillClient from "./GiftDeedVsWillClient";
// 
// export const metadata: Metadata = {
//   title: {
//     absolute: "Gift Deed vs Will Which is Better in India | WillDrafting",
//   },
//   description:
//     "Gift deed vs Will: which is better in India? Compare stamp duty, Section 56(2)(x) tax, revocability, and costs to protect your property and family rights.",
//   keywords: [
//     "gift deed vs will which is better",
//     "gift deed vs will",
//     "gift deed or will for property",
//     "gift deed tax implications",
//     "gift deed stamp duty",
//     "property transfer gift vs will",
//     "section 56 2 x income tax gift",
//     "stamp duty on gift deed in maharashtra",
//     "is stamp duty payable on will in india",
//     "section 23 senior citizens act gift deed",
//     "can gift deed be cancelled by parents",
//     "WillDrafting.in gift deed vs will",
//   ],
//   alternates: {
//     canonical: "https://www.willdrafting.in/blogs/gift-deed-vs-will-india",
//     languages: {
//       "en-IN": "https://www.willdrafting.in/blogs/gift-deed-vs-will-india",
//       "x-default": "https://www.willdrafting.in/blogs/gift-deed-vs-will-india",
//     },
//   },
//   openGraph: {
//     title: "Gift Deed vs Will Which is Better in India | WillDrafting",
//     description:
//       "Gift deed vs Will: which is better in India? Compare stamp duty, Section 56(2)(x) tax, revocability, and costs to protect your property and family rights.",
//     url: "https://www.willdrafting.in/blogs/gift-deed-vs-will-india",
//     siteName: "WillDrafting.in",
//     locale: "en_IN",
//     type: "article",
//     images: [
//       {
//         url: "https://www.willdrafting.in/images/gift-deed-vs-will-india.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Gift Deed vs Will in India Legal Comparison and Cost Guide",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Gift Deed vs Will Which is Better in India | WillDrafting",
//     description:
//       "Gift deed vs Will: which is better in India? Compare stamp duty, Section 56(2)(x) tax, revocability, and costs to protect your property and family rights.",
//     images: ["https://www.willdrafting.in/images/gift-deed-vs-will-india.jpg"],
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
// export default function GiftDeedVsWillPage() {
//   const canonicalUrl = "https://www.willdrafting.in/blogs/gift-deed-vs-will-india";
//   const imageUrl = "https://www.willdrafting.in/images/gift-deed-vs-will-india.jpg";
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
//         name: "Gift Deed vs Will Which is Better in India | WillDrafting",
//         description:
//           "Gift deed vs Will: which is better in India? Compare stamp duty, Section 56(2)(x) tax, revocability, and costs to protect your property and family rights.",
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
//             name: "Gift Deed vs Will in India",
//             item: canonicalUrl,
//           },
//         ],
//       },
//       {
//         "@type": "Article",
//         "@id": `${canonicalUrl}#article`,
//         isPartOf: {
//           "@id": `${canonicalUrl}#webpage`,
//         },
//         headline: "Gift Deed vs Will Which is Better in India: Legal & Cost Guide",
//         description:
//           "Comprehensive decision guide comparing Gift Deeds and Wills in India across stamp duty, Income Tax Section 56(2)(x), revocability, and elder protection.",
//         mainEntityOfPage: canonicalUrl,
//         datePublished: "2026-10-21T08:00:00+05:30",
//         dateModified: "2026-10-21T10:45:00+05:30",
//         author: {
//           "@type": "Person",
//           name: "Advocate Anuj Anand Malik",
//           jobTitle: "Senior Succession Counsel",
//           worksFor: {
//             "@type": "LegalService",
//             name: "WillDrafting.in",
//           },
//         },
//         publisher: {
//           "@id": "https://www.willdrafting.in/#organization",
//         },
//         image: {
//           "@type": "ImageObject",
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//         },
//         articleSection: "Estate Planning and Succession Law",
//         inLanguage: "en-IN",
//       },
//       {
//         "@type": "FAQPage",
//         "@id": `${canonicalUrl}#faq`,
//         mainEntity: [
//           {
//             "@type": "Question",
//             name: "What is the primary difference between a Gift Deed and a Will in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Gift Deed transfers property immediately during the lifetime of the donor under Section 122 of the Transfer of Property Act, 1882, and is generally irrevocable once accepted. In contrast, a Will takes effect only after the testator's death under the Indian Succession Act, 1925, and can be revoked or changed anytime during the testator's lifetime.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Which is cheaper: transferring property via a Gift Deed or a Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Will is substantially cheaper. Wills attract ₹0 stamp duty across all Indian states and can be executed on plain paper. A Gift Deed of immovable property requires compulsory registration and payment of state stamp duty (ranging from 1% to 7% of market value plus local cess) along with registration fees (up to ₹30,000 or 1%).",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a parent cancel a registered Gift Deed if their child mistreats them?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes, under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, if a senior citizen (aged 60+) gifts property with a condition that the child must provide basic amenities and care, and the child fails to do so, the Maintenance Tribunal can declare the gift deed void. The Supreme Court affirmed this in Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20). However, establishing this requires court litigation, whereas a Will can be revoked unilaterally at any time without going to court.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Is stamp duty payable on a Will in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. Under Schedule I of the Indian Stamp Act, 1899, Wills are completely exempt from stamp duty throughout India. Registration of a Will is also optional under Section 18(e) of the Registration Act, 1908. Even if registered, only a nominal administrative fee (typically ₹50 to ₹500) applies.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Are gifts of property taxable under Income Tax Section 56(2)(x)?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Section 56(2)(x) of the Income Tax Act, 1961, gifts of immovable property received from specified 'relatives' (such as spouse, children, siblings, parents, and lineal ascendants/descendants) are 100% tax-exempt. Gifts to non-relatives (like friends or nephews) exceeding ₹50,000 in stamp duty value are taxed as Income from Other Sources. In contrast, property received under a Will or by inheritance is completely tax-free regardless of whether the recipient is a relative or not.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "When is a Gift Deed better than a Will for property transfer?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Gift Deed is preferable when the donor wishes to eliminate any risk of post-death litigation among legal heirs, when the donee urgently requires legal title to secure a home renovation mortgage or redevelop the property, or when the transferor wants to settle assets cleanly during their own lifetime with immediate municipal mutation.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "When is a Will better than a Gift Deed?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Will is superior when the property owner wishes to retain 100% control, ownership, and rental income during their life, avoid hefty stamp duty and registration expenses upfront, retain the freedom to change beneficiaries if relationships evolve, and ensure protection against elder abandonment or neglect by children.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does a donee pay capital gains tax upon receiving a gifted property?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No, receiving a gift or inheritance does not trigger capital gains tax at the time of transfer. However, if the donee or heir subsequently sells the property, capital gains tax applies. Under Section 49(1) of the Income Tax Act, the cost of acquisition is deemed to be the original cost paid by the donor/previous owner, and the holding period of the previous owner is included under Section 2(42A).",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Is registration mandatory for both Gift Deeds and Wills in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. Under Section 17 of the Registration Act, 1908 and Section 123 of the Transfer of Property Act, registration of a Gift Deed of immovable property is strictly mandatory; an unregistered gift deed confers zero title. For a Will, registration is strictly optional under Section 18(e); a Will executed on plain A4 paper attested by two witnesses is 100% valid.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can I gift self-acquired property as well as ancestral property?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "An individual has an absolute right to gift their self-acquired property to anyone. However, ancestral coparcenary property under Hindu law cannot be unilaterally gifted without the consent of other coparceners, except for small gifts of affection or pious purposes. A Will can only dispose of the individual's undivided deemed coparcenary share under Section 30 of the Hindu Succession Act.",
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
//       <GiftDeedVsWillClient />
//       <Footer />
//     </>
//   );
// }
// 
