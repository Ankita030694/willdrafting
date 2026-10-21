import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "hindu-woman-property-rights-stridhan-will" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "hindu-woman-property-rights-stridhan-will" }),
  });
}

// ============================================================================
// HARDCODED BLOG COMMENTED OUT (PRESERVED — NOW RENDERED FROM MONGODB)
// ============================================================================
// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import HinduWomanPropertyRightsClient from "./HinduWomanPropertyRightsClient";
// 
// export const metadata: Metadata = {
//   title: {
//     absolute: "Hindu Woman Property Rights: Stridhan & Will | WillDrafting",
//   },
//   description:
//     "Understand Hindu woman property rights, Stridhan legal ownership under HSA Section 14, Section 15 inheritance rules, and why a Will protects your family.",
//   keywords: [
//     "stridhan",
//     "hindu woman property rights",
//     "stridhan meaning",
//     "woman property rights india",
//     "HSA section 14",
//     "female intestate succession section 15",
//     "woman dying without will",
//     "section 15 2 hindu succession act",
//     "stridhan vs dowry",
//     "pratibha rani vs suraj kumar",
//     "can married woman make a will in india",
//     "hindu succession act section 30",
//     "hindu female succession rules",
//     "reversion of inherited property to father heirs",
//   ],
//   alternates: {
//     canonical:
//       "https://www.willdrafting.in/blogs/hindu-woman-property-rights-stridhan-will",
//     languages: {
//       "en-IN":
//         "https://www.willdrafting.in/blogs/hindu-woman-property-rights-stridhan-will",
//       "x-default":
//         "https://www.willdrafting.in/blogs/hindu-woman-property-rights-stridhan-will",
//     },
//   },
//   openGraph: {
//     title: "Hindu Woman Property Rights: Stridhan & Will | WillDrafting",
//     description:
//       "Understand Hindu woman property rights, Stridhan legal ownership under HSA Section 14, Section 15 inheritance rules, and why a Will protects your family.",
//     url: "https://www.willdrafting.in/blogs/hindu-woman-property-rights-stridhan-will",
//     siteName: "WillDrafting.in",
//     locale: "en_IN",
//     type: "article",
//     images: [
//       {
//         url: "https://www.willdrafting.in/images/hindu-woman-property-rights-stridhan-will-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Hindu Woman Property Rights, Stridhan and Will Drafting Legal Guide",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Hindu Woman Property Rights: Stridhan & Will | WillDrafting",
//     description:
//       "Understand Hindu woman property rights, Stridhan legal ownership under HSA Section 14, Section 15 inheritance rules, and why a Will protects your family.",
//     images: [
//       "https://www.willdrafting.in/images/hindu-woman-property-rights-stridhan-will-og.jpg",
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
// export default function HinduWomanPropertyRightsPage() {
//   const canonicalUrl =
//     "https://www.willdrafting.in/blogs/hindu-woman-property-rights-stridhan-will";
//   const imageUrl =
//     "https://www.willdrafting.in/images/hindu-woman-property-rights-stridhan-will-og.jpg";
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
//         name: "Hindu Woman Property Rights: Stridhan & Will | WillDrafting",
//         description:
//           "Understand Hindu woman property rights, Stridhan legal ownership under HSA Section 14, Section 15 inheritance rules, and why a Will protects your family.",
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
//             name: "Hindu Woman Property Rights & Stridhan",
//             item: canonicalUrl,
//           },
//         ],
//       },
//       {
//         "@type": "Article",
//         "@id": `${canonicalUrl}#article`,
//         isPartOf: {
//           "@type": "WebPage",
//           "@id": `${canonicalUrl}#webpage`,
//         },
//         headline: "Hindu Woman Property Rights: Stridhan, Succession & Wills",
//         description:
//           "An authoritative legal guide on Hindu woman property rights, Stridhan ownership under Section 14, female intestate succession under Section 15, and testamentary planning under Section 30.",
//         inLanguage: "en-IN",
//         mainEntityOfPage: canonicalUrl,
//         datePublished: "2026-10-21T09:00:00+05:30",
//         dateModified: "2026-10-21T10:30:00+05:30",
//         articleSection: "Family Succession & Women Property Rights",
//         image: {
//           "@type": "ImageObject",
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//         },
//         author: {
//           "@type": "Person",
//           name: "Advocate Rajeshwar Rao",
//           jobTitle: "Senior Succession Counsel",
//           worksFor: {
//             "@type": "LegalService",
//             name: "WillDrafting.in",
//           },
//         },
//         publisher: {
//           "@type": "Organization",
//           name: "WillDrafting.in",
//           url: "https://www.willdrafting.in",
//           logo: {
//             "@type": "ImageObject",
//             url: "https://www.willdrafting.in/Logofinal.svg",
//           },
//         },
//       },
//       {
//         "@type": "FAQPage",
//         "@id": `${canonicalUrl}#faq`,
//         mainEntity: [
//           {
//             "@type": "Question",
//             name: "What is Stridhan under Indian succession law?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Stridhan refers to all voluntary gifts, jewelry, cash, movable assets, and real estate given to a Hindu woman before, during, or after her marriage by her parents, in-laws, husband, relatives, or friends, as well as her own self-acquired earnings. Under Section 14(1) of the Hindu Succession Act, she is the sole, absolute owner of her Stridhan.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a husband or his family legally claim or sell the wife's Stridhan jewelry?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. The Supreme Court in Pratibha Rani v. Suraj Kumar (1985) ruled that Stridhan is the exclusive, unchallengeable property of the woman. Even if the jewelry is kept in a joint locker or family safe, the husband and in-laws hold it purely as trustees. Refusing to return it upon demand constitutes Criminal Breach of Trust under Section 316 of BNS (formerly Section 406 IPC).",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What happens to a Hindu woman's property if she dies without a Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "If a Hindu woman dies without a Will (intestate), her property devolves strictly according to Section 15 of the Hindu Succession Act, 1956. Under Section 15(1)(a), it passes equally to her husband and children. However, if she dies childless, special reversion rules under Section 15(2) redirect inherited property depending on whether it came from her parents or her husband.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What is the critical Section 15(2) trap for childless Hindu women?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Section 15(2)(a), if a childless woman dies without a Will, any property she inherited from her parents does not go to her husband; it reverts to her father's heirs. Conversely, under Section 15(2)(b), property inherited from her husband reverts to his heirs. However, her self-acquired wealth and Stridhan do not revert to her parents—they go to her husband or his family, leaving her parents with nothing unless she writes a Will.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a married Hindu woman bequeath 100% of her property to her parents or siblings via a Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Under Section 30 of the Hindu Succession Act, every Hindu woman has absolute testamentary power over all her self-acquired property, Stridhan, inherited assets, and her coparcenary share. She does not require the consent or signature of her husband or children to bequeath her estate to her parents, siblings, or any person of her choice.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Is Stridhan the same as Dowry under Indian law?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No, Stridhan and Dowry are legally opposite. Dowry is an illegal demand made as a condition of marriage, which is strictly prohibited and punishable under the Dowry Prohibition Act, 1961. Stridhan consists of voluntary gifts presented to the bride out of love and affection, which remain her absolute personal property for life.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a Hindu woman write a Will for her share in ancestral property?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Following the Hindu Succession (Amendment) Act, 2005 and the Supreme Court's ruling in Vineeta Sharma (2020), a daughter is an equal coparcener by birth. Under Section 30 of the Act, she can validly bequeath her undivided coparcenary interest in ancestral property through a properly executed Will.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What evidence is required to prove ownership of Stridhan jewelry?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Strong evidence includes jeweler purchase invoices in the bride or her parents' names, a signed gift list witnessed during wedding ceremonies under the Dowry Prohibition Rules, wedding photographs and video footage showing the bride wearing specific ornaments, and bank locker access registers.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does a Hindu woman need her husband's permission to make or register a Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Absolutely not. Indian law treats a woman as an independent legal individual. Under Section 59 of the Indian Succession Act, 1925, any adult of sound mind can make a Will. Her husband has no legal authority to inspect, consent to, or veto her testamentary disposition.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What legal steps should a woman take if in-laws refuse to return her Stridhan?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "First, issue a formal Legal Demand Notice through an advocate detailing the itemized inventory. Second, file an application under Section 12 and Section 18 of the Protection of Women from Domestic Violence Act (PWDVA) for recovery and interim protection. Third, file a criminal complaint under Section 316 BNS (Section 406 IPC) for Criminal Breach of Trust.",
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
//       <HinduWomanPropertyRightsClient />
//       <Footer />
//     </>
//   );
// }
// 
