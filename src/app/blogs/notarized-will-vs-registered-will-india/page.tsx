import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "notarized-will-vs-registered-will-india" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "notarized-will-vs-registered-will-india" }),
  });
}

// ============================================================================
// HARDCODED BLOG COMMENTED OUT (PRESERVED — NOW RENDERED FROM MONGODB)
// ============================================================================
// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import NotarizedVsRegisteredWillClient from "./NotarizedVsRegisteredWillClient";
// 
// export const metadata: Metadata = {
//   title: {
//     absolute: "Is Notarized Will Valid in India? Guide | WillDrafting",
//   },
//   description:
//     "Is a notarized will valid in India? Learn Section 63 rules, why notarization adds no legal weight, registered will benefits, and compare all three types.",
//   keywords: [
//     "is notarized will valid in india",
//     "notarized will vs registered will",
//     "will registration vs notarization",
//     "is unregistered will valid",
//     "registered will benefits",
//     "will notarization india",
//     "indian succession act section 63",
//     "registration act section 18",
//     "plain paper will validity india",
//     "difference between notarized and registered will",
//     "section 68 indian evidence act will proof",
//     "WillDrafting.in will registration",
//   ],
//   alternates: {
//     canonical:
//       "https://www.willdrafting.in/blogs/notarized-will-vs-registered-will-india",
//     languages: {
//       "en-IN":
//         "https://www.willdrafting.in/blogs/notarized-will-vs-registered-will-india",
//       "x-default":
//         "https://www.willdrafting.in/blogs/notarized-will-vs-registered-will-india",
//     },
//   },
//   openGraph: {
//     title: "Is Notarized Will Valid in India? Guide | WillDrafting",
//     description:
//       "Is a notarized will valid in India? Learn Section 63 rules, why notarization adds no legal weight, registered will benefits, and compare all three types.",
//     url: "https://www.willdrafting.in/blogs/notarized-will-vs-registered-will-india",
//     siteName: "WillDrafting.in",
//     locale: "en_IN",
//     type: "article",
//     images: [
//       {
//         url: "https://www.willdrafting.in/images/notarized-will-vs-registered-will-india-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Is Notarized Will Valid in India: Plain vs Notarized vs Registered Will Comparison",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Is Notarized Will Valid in India? Guide | WillDrafting",
//     description:
//       "Is a notarized will valid in India? Learn Section 63 rules, why notarization adds no legal weight, registered will benefits, and compare all three types.",
//     images: [
//       "https://www.willdrafting.in/images/notarized-will-vs-registered-will-india-og.jpg",
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
// export default function NotarizedVsRegisteredWillPage() {
//   const canonicalUrl =
//     "https://www.willdrafting.in/blogs/notarized-will-vs-registered-will-india";
//   const imageUrl =
//     "https://www.willdrafting.in/images/notarized-will-vs-registered-will-india-og.jpg";
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
//         name: "Is Notarized Will Valid in India? Guide | WillDrafting",
//         description:
//           "Is a notarized will valid in India? Discover Section 63 rules, why notarization adds no legal weight, registered will benefits, and compare all three types.",
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
//             name: "Notarized vs Registered Will",
//             item: canonicalUrl,
//           },
//         ],
//       },
//       {
//         "@type": "Article",
//         "@id": `${canonicalUrl}#article`,
//         headline: "Is a Notarized Will Legally Valid in India? Full Comparison",
//         description:
//           "Statutory comparison of plain, notarized, and registered wills in India under the Indian Succession Act 1925 and Registration Act 1908.",
//         image: imageUrl,
//         author: {
//           "@type": "Person",
//           name: "Advocate Anuj Anand Malik",
//           jobTitle: "Senior Succession & Estate Planning Counsel",
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
//         articleSection: "Estate Planning and Testamentary Succession",
//         inLanguage: "en-IN",
//       },
//       {
//         "@type": "FAQPage",
//         "@id": `${canonicalUrl}#faq`,
//         mainEntity: [
//           {
//             "@type": "Question",
//             name: "Is a notarized Will legally valid in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes, a notarized Will is legally valid in India, but NOT because of the notary's stamp or signature. It is valid solely if it satisfies Section 63 of the Indian Succession Act, 1925—meaning it is in writing, signed by the testator, and attested by at least two independent witnesses. The notary stamp adds zero extra legal validity.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Is an unregistered Will valid in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes, 100%. Under Section 18(e) of the Registration Act, 1908, the registration of a Will is purely optional. An unregistered Will executed on a plain sheet of A4 paper with signatures of two independent witnesses is just as legally enforceable as a registered Will.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What is the difference between notarizing a Will and registering a Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Notarization is done before an advocate designated as a Notary Public under the Notaries Act, 1952, who merely verifies identity. Registration is done before a government Sub-Registrar under the Registration Act, 1908, creating an official government public record, capturing biometric verification, and creating a strong legal presumption of genuineness.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does a notary stamp protect a Will from court challenges?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. Indian courts have repeatedly held that a notary stamp does not prevent disputes, nor does it prove that the testator possessed sound testamentary capacity. To prove any Will in court, at least one attesting witness must testify under Section 68 of the Indian Evidence Act, regardless of whether a notary stamped it.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What are the key benefits of registering a Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Registering a Will creates a strong presumption of due execution in court under Section 60 of the Registration Act. It prevents claims that the Will was forged or signed under duress, creates a safe government backup copy if the original is destroyed, and drastically reduces hurdles during property mutation and banking probate.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a registered Will be challenged in an Indian court?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Registration does not grant complete immunity. A registered Will can still be challenged on grounds of lack of testamentary capacity (unsound mind), fraud, coercion, undue influence, suspicious circumstances surrounding execution, or if a subsequent valid Will is discovered.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does a Will need to be printed on stamp paper in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. Under Schedule I of the Indian Stamp Act, 1899, Wills are completely exempt from stamp duty across every state in India. A Will can be drafted on ordinary plain white A4 paper. You do not need non-judicial stamp paper of ₹10, ₹100, or any other value.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a notary act as one of the two attesting witnesses?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Legally, a notary could act as an attesting witness only if they specifically witnessed the testator sign and signed with the 'animus attestandi' (intent to attest as a statutory witness). However, doing so is risky and discouraged because notaries usually sign with an attestation seal as a public officer, which courts distinguish from personal witness attestation under Section 63.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a registered Will be updated or revoked by an unregistered Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Under Section 62 of the Indian Succession Act, a Will is revocable at any time during the testator's life. A newer valid unregistered Will or Codicil can legally revoke or amend an earlier registered Will. However, to prevent suspicion and litigation, it is strongly recommended to register the revocation or newer Will as well.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How much does it cost to register a Will in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "The official government registration fee for a Will is very low in most Indian states—typically ranging from ₹50 to ₹1,000, plus nominal scanning fees (around ₹200 to ₹500). There is zero stamp duty payable.",
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
//       <NotarizedVsRegisteredWillClient />
//       <Footer />
//     </>
//   );
// }
// 
