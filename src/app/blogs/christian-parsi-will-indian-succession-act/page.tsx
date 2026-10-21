import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "christian-parsi-will-indian-succession-act" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "christian-parsi-will-indian-succession-act" }),
  });
}

// ============================================================================
// HARDCODED BLOG COMMENTED OUT (PRESERVED — NOW RENDERED FROM MONGODB)
// ============================================================================
// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ChristianParsiWillClient from "./ChristianParsiWillClient";
// 
// export const metadata: Metadata = {
//   title: {
//     absolute: "Christian and Parsi Will Rules India: Succession Act",
//   },
//   description:
//     "Learn Christian and Parsi will rules in India under Indian Succession Act Part V. Understand legal heir shares, privileged wills, and draft with advocates.",
//   keywords: [
//     "christian will rules india",
//     "parsi succession",
//     "christian inheritance law india",
//     "parsi inheritance law",
//     "Indian Succession Act Part V",
//     "christian will format",
//     "parsi will rules",
//     "section 33 indian succession act",
//     "section 51 parsi succession",
//     "privileged wills succession act",
//     "christian intestate succession",
//     "parsi legal heirs",
//     "WillDrafting.in will drafting",
//   ],
//   alternates: {
//     canonical:
//       "https://www.willdrafting.in/blogs/christian-parsi-will-indian-succession-act",
//     languages: {
//       "en-IN":
//         "https://www.willdrafting.in/blogs/christian-parsi-will-indian-succession-act",
//       "x-default":
//         "https://www.willdrafting.in/blogs/christian-parsi-will-indian-succession-act",
//     },
//   },
//   openGraph: {
//     title: "Christian and Parsi Will Rules India: Succession Act",
//     description:
//       "Learn Christian and Parsi will rules in India under Indian Succession Act Part V. Understand legal heir shares, privileged wills, and draft with advocates.",
//     url: "https://www.willdrafting.in/blogs/christian-parsi-will-indian-succession-act",
//     siteName: "WillDrafting.in",
//     locale: "en_IN",
//     type: "article",
//     images: [
//       {
//         url: "https://www.willdrafting.in/images/christian-parsi-will-indian-succession-act-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Christian and Parsi Will Rules under Indian Succession Act Legal Guide",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Christian and Parsi Will Rules India: Succession Act",
//     description:
//       "Learn Christian and Parsi will rules in India under Indian Succession Act Part V. Understand legal heir shares, privileged wills, and draft with advocates.",
//     images: [
//       "https://www.willdrafting.in/images/christian-parsi-will-indian-succession-act-og.jpg",
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
// export default function ChristianParsiWillPage() {
//   const canonicalUrl =
//     "https://www.willdrafting.in/blogs/christian-parsi-will-indian-succession-act";
//   const imageUrl =
//     "https://www.willdrafting.in/images/christian-parsi-will-indian-succession-act-og.jpg";
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
//         name: "Christian and Parsi Will Rules India: Succession Act",
//         description:
//           "Learn Christian and Parsi will rules in India under Indian Succession Act Part V. Understand legal heir shares, privileged wills, and draft with advocates.",
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
//             name: "Christian and Parsi Will Rules India",
//             item: canonicalUrl,
//           },
//         ],
//       },
//       {
//         "@type": "Article",
//         "@id": `${canonicalUrl}#article`,
//         headline: "Christian and Parsi Will Rules: Indian Succession Act Guide",
//         description:
//           "Comprehensive legal guide to Christian and Parsi testamentary and intestate succession under Part V and Part VI of the Indian Succession Act, 1925.",
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
//         articleSection: "Succession Law & Estate Planning",
//         inLanguage: "en-IN",
//       },
//       {
//         "@type": "FAQPage",
//         "@id": `${canonicalUrl}#faq`,
//         mainEntity: [
//           {
//             "@type": "Question",
//             name: "Which law governs Wills made by Christians and Parsis in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Testamentary succession for both Christians and Parsis is governed by Part VI of the Indian Succession Act, 1925 (Sections 59 to 191). If a person dies intestate without leaving a Will, Christian succession is governed by Part V Chapter II (Sections 31 to 49), while Parsi intestate succession is governed by Part V Chapter III (Sections 50 to 56).",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a Christian or Parsi individual bequeath 100% of their property by Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Unlike Muslim personal law, which restricts bequests to one-third of the estate without heir consent, and Hindu coparcenary law, which grants birthrights in ancestral property, Christians and Parsis have complete testamentary freedom. Under Section 59 of the Indian Succession Act, you can bequeath 100% of your self-acquired and inherited property to any chosen beneficiary, trust, or charity.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What is a Christian widow or widower's legal share if there is no Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Section 33 of the Indian Succession Act, 1925, if an intestate leaves a surviving spouse and lineal descendants (children or grandchildren), the spouse receives one-third (1/3) of the estate and children divide the remaining two-thirds (2/3). If there are no children but kindred survive (parents or siblings), the spouse receives one-half (1/2). If neither descendants nor kindred exist, the surviving spouse takes the entire 100% estate.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Do Parsi sons and daughters have equal inheritance rights?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Prior to the Indian Succession (Amendment) Act, 1991, sons received twice the share of daughters in a Parsi father's estate. The 1991 amendment eliminated this disparity. Under Section 51(1) of the Indian Succession Act, daughters and sons now receive identical, equal shares in the intestate estate of either parent.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Do parents receive a share in a Parsi person's intestate property?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes, when a male Parsi dies intestate. Under Section 51(2) of the Indian Succession Act, 1925, when a male Parsi dies leaving a widow and children, his father and mother each receive a share equal to half the share of each child. However, when a female Parsi dies leaving a widower and children, her estate is divided equally between widower and children without an automatic statutory share for her parents.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Is probate of a Will compulsory for Christians and Parsis in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Probate is not mandatory for Christians across India. The Supreme Court in Clarence Pais v. Union of India (2001) established that Section 213 does not require mandatory probate for Indian Christian Wills. For Parsis, probate was historically required only for Wills made within or concerning properties in the Ordinary Original Civil Jurisdiction of Bombay, Calcutta, or Madras High Courts. However, probate or registration speeds up bank transmissions and mutations everywhere.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What is a Privileged Will under the Indian Succession Act, 1925?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Sections 65 and 66 of the Indian Succession Act, a Privileged Will is an informal Will permitted exclusively to soldiers, airmen engaged in actual warfare or expeditions, and mariners at sea who are at least 18 years old. Such Wills can be executed orally before two witnesses, written entirely in the testator's hand without witnesses, or signed without attestation. Ordinary civilians must execute standard unprivileged Wills under Section 63 with two witnesses.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can an attesting witness inherit property under a Christian or Parsi Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. Under Section 67 of the Indian Succession Act, 1925, any bequest or legacy made to an attesting witness, or to the husband or wife of an attesting witness, is completely void. However, the witness's attestation remains valid. To protect your beneficiaries, always ensure that your two attesting witnesses are independent adults who receive nothing under the Will.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does the concept of Ancestral Property apply to Christians or Parsis?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. The Mitakshara coparcenary concept of ancestral property and birthrights applies exclusively to Hindus, Buddhists, Jains, and Sikhs governed by Hindu law. In Christian and Parsi succession, there is no coparcenary or right by birth. Any property inherited from parents or ancestors becomes the absolute personal property of the recipient, which can be transferred or willed away freely.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How can I calculate legal heir shares for an intestate Christian or Parsi estate?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "You can use the WillDrafting Succession Calculator at /tools/succession-calculator. By selecting religion (Christian or Parsi), gender, marital status, and surviving family members, our algorithmic engine calculates exact percentage shares and rupee allocations according to Sections 33, 42, 51, and 54 of the Indian Succession Act, 1925.",
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
//       <ChristianParsiWillClient />
//       <Footer />
//     </>
//   );
// }
// 
