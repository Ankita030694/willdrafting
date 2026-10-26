import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "second-wife-children-property-rights-india" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "second-wife-children-property-rights-india" }),
  });
}

// ============================================================================
// HARDCODED BLOG COMMENTED OUT (PRESERVED — NOW RENDERED FROM MONGODB)
// ============================================================================
// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import SecondWifeChildrenRightsClient from "./SecondWifeChildrenRightsClient";
// 
// export const metadata: Metadata = {
//   title: {
//     absolute: "Second Wife Children Property Rights: Legal Guide | AMA",
//   },
//   description:
//     "Understand second wife children property rights in India. Learn Supreme Court 2023 rules, ancestral shares, HMA Section 16, and inheritance with WillDrafting.in.",
//   keywords: [
//     "second wife children property rights",
//     "second marriage children rights",
//     "children of void marriage rights",
//     "HMA section 16",
//     "revanasiddappa v mallikarjun 2023",
//     "second wife property rights in india",
//     "ancestral property second wife child",
//     "hindu succession act section 6",
//     "hindu succession act section 8",
//     "can father will property to second wife",
//     "rights of child born out of void marriage",
//     "partition suit blended family india",
//   ],
//   alternates: {
//     canonical:
//       "https://www.willdrafting.in/blogs/second-wife-children-property-rights-india",
//     languages: {
//       "en-IN":
//         "https://www.willdrafting.in/blogs/second-wife-children-property-rights-india",
//       "x-default":
//         "https://www.willdrafting.in/blogs/second-wife-children-property-rights-india",
//     },
//   },
//   openGraph: {
//     title: "Second Wife Children Property Rights: Legal Guide | AMA",
//     description:
//       "Understand second wife children property rights in India. Learn Supreme Court 2023 rules, ancestral shares, HMA Section 16, and inheritance with WillDrafting.in.",
//     url: "https://www.willdrafting.in/blogs/second-wife-children-property-rights-india",
//     siteName: "WillDrafting.in",
//     locale: "en_IN",
//     type: "article",
//     images: [
//       {
//         url: "https://www.willdrafting.in/images/second-wife-children-property-rights-india-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Second Wife and Children Property Rights in India Legal Guide and Inheritance Matrix",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Second Wife Children Property Rights: Legal Guide | AMA",
//     description:
//       "Understand second wife children property rights in India. Learn Supreme Court 2023 rules, ancestral shares, HMA Section 16, and inheritance with WillDrafting.in.",
//     images: [
//       "https://www.willdrafting.in/images/second-wife-children-property-rights-india-og.jpg",
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
// export default function SecondWifeChildrenRightsPage() {
//   const canonicalUrl =
//     "https://www.willdrafting.in/blogs/second-wife-children-property-rights-india";
//   const imageUrl =
//     "https://www.willdrafting.in/images/second-wife-children-property-rights-india-og.jpg";
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
//         name: "Second Wife Children Property Rights: Legal Guide | AMA",
//         description:
//           "Understand second wife children property rights in India. Learn Supreme Court 2023 rules, ancestral shares, HMA Section 16, and inheritance with WillDrafting.in.",
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
//             name: "Second Wife Children Property Rights",
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
//         headline: "Second Wife and Children Property Rights in India",
//         description:
//           "A definitive statutory guide on the property and inheritance rights of children born from second marriages under the Hindu Marriage Act, Hindu Succession Act, and the landmark Supreme Court ruling in Revanasiddappa v. Mallikarjun (2023).",
//         inLanguage: "en-IN",
//         mainEntityOfPage: canonicalUrl,
//         datePublished: "2026-10-20T09:00:00+05:30",
//         dateModified: "2026-10-20T16:00:00+05:30",
//         articleSection: "Family Succession & Property Rights",
//         image: {
//           "@type": "ImageObject",
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//         },
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
//             name: "Do children born of a second wife have property rights in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Under Section 16 of the Hindu Marriage Act, 1955, children born of a second marriage are deemed legitimate by law, even if the marriage itself is void or bigamous. They inherit an equal share in their father's self-acquired property and his share in ancestral property alongside children of the first wife.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What did the Supreme Court rule in Revanasiddappa v. Mallikarjun (2023)?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A three-judge bench of the Supreme Court held on September 1, 2023, that children of void or voidable marriages are entitled to inherit their parent's share in Hindu Undivided Family (HUF) coparcenary property through notional partition under Section 6(3) of the Hindu Succession Act.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does a second wife have inheritance rights if the first wife is alive?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. If a Hindu man marries a second wife while his first marriage is still legally active, the second marriage is null and void under Sections 5(i) and 11 of the Hindu Marriage Act. The second wife is not a legal heir under Section 8 of the Hindu Succession Act and receives no inheritance.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "When does a second wife have full legal inheritance rights?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A second wife possesses 100% legal inheritance rights if the second marriage occurred after the first marriage was legally dissolved through a court divorce decree, or after the death of the first wife. In this case, she is a legally wedded wife and a Class I legal heir.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can children of a second wife demand partition of ancestral property while the father is alive?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. Children born from a void or bigamous marriage are not independent coparceners by birth in the ancestral joint family. They cannot demand a partition during their father's lifetime. Their inheritance rights arise only upon the father's death out of his deemed coparcenary share.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How is father's self-acquired property divided if he dies without a Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Section 8 and Section 10 of the Hindu Succession Act, the father's self-acquired property is divided equally per capita among all Class I legal heirs. Children from the second marriage receive the exact same share as children from the first marriage and the surviving legal widow and mother.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a father give all his self-acquired property to the second wife or her children through a Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Under Section 30 of the Hindu Succession Act, an individual has absolute testamentary freedom over self-acquired property. A father can bequeath 100% of his self-acquired property to his second wife or second family through a valid Will, excluding the first family.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a second wife claim maintenance if her marriage is legally void?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "While an invalid second marriage grants no succession rights, the Supreme Court in Badshah v. Urmila Badshah Godse (2014) held that if the husband concealed his existing marriage, the second wife is entitled to maintenance under Section 125 of the CrPC and the Domestic Violence Act, 2005.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What happens to ancestral property if the father leaves a Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Section 30 of the Hindu Succession Act, a father can only Will away his own undivided coparcenary share in ancestral property. He cannot Will away the independent coparcenary shares of his children from a valid marriage.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Why is drafting a Will essential in blended families with second marriages?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Will prevents bitter disputes and multi-decade court battles between children of different marriages. It allows the father to clearly specify who receives what, grant life-interest residence rights to the second wife, and appoint an impartial executor.",
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
//       <SecondWifeChildrenRightsClient />
//       <Footer />
//     </>
//   );
// }
// 
