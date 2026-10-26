import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "property-transfer-after-death-without-will-india" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "property-transfer-after-death-without-will-india" }),
  });
}

// ============================================================================
// HARDCODED BLOG COMMENTED OUT (PRESERVED — NOW RENDERED FROM MONGODB)
// ============================================================================
// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import PropertyTransferAfterDeathClient from "./PropertyTransferAfterDeathClient";
// 
// export const metadata: Metadata = {
//   title: {
//     absolute: "Property Transfer After Death of Father Without Will",
//   },
//   description:
//     "Transfer property after death of father without a will in India. Step-by-step mutation guide, Class 1 legal heir rights, documents list, and legal advice.",
//   keywords: [
//     "property transfer after death of father without will",
//     "property transfer after death",
//     "mutation after death",
//     "property name change after death",
//     "how to transfer property after death without will",
//     "hindu succession act section 8",
//     "class 1 legal heirs property partition",
//     "relinquishment deed property transfer",
//     "legal heir certificate property mutation",
//     "dakhil kharij after death",
//     "succession certificate immovable property section 370",
//     "property succession india WillDrafting.in",
//   ],
//   alternates: {
//     canonical:
//       "https://www.willdrafting.in/blogs/property-transfer-after-death-without-will-india",
//     languages: {
//       "en-IN":
//         "https://www.willdrafting.in/blogs/property-transfer-after-death-without-will-india",
//       "x-default":
//         "https://www.willdrafting.in/blogs/property-transfer-after-death-without-will-india",
//     },
//   },
//   openGraph: {
//     title: "Property Transfer After Death of Father Without Will",
//     description:
//       "Transfer property after death of father without a will in India. Step-by-step mutation guide, Class 1 legal heir rights, documents list, and legal advice.",
//     url: "https://www.willdrafting.in/blogs/property-transfer-after-death-without-will-india",
//     siteName: "WillDrafting.in",
//     locale: "en_IN",
//     type: "article",
//     images: [
//       {
//         url: "https://www.willdrafting.in/images/property-transfer-after-death-without-will-india-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Property Transfer After Death of Father Without Will in India Step-by-Step Guide",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Property Transfer After Death of Father Without Will",
//     description:
//       "Transfer property after death of father without a will in India. Step-by-step mutation guide, Class 1 legal heir rights, documents list, and legal advice.",
//     images: [
//       "https://www.willdrafting.in/images/property-transfer-after-death-without-will-india-og.jpg",
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
// export default function PropertyTransferAfterDeathPage() {
//   const canonicalUrl =
//     "https://www.willdrafting.in/blogs/property-transfer-after-death-without-will-india";
//   const imageUrl =
//     "https://www.willdrafting.in/images/property-transfer-after-death-without-will-india-og.jpg";
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
//         name: "Property Transfer After Death of Father Without Will",
//         description:
//           "Transfer property after death of father without a will in India. Step-by-step mutation guide, Class 1 legal heir rights, documents list, and legal advice.",
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
//             name: "Property Transfer After Death Without Will",
//             item: canonicalUrl,
//           },
//         ],
//       },
//       {
//         "@type": "Article",
//         "@id": `${canonicalUrl}#article`,
//         headline: "Property Transfer After Death of Father Without Will in India",
//         description:
//           "Transfer property after death of father without a will in India. Step-by-step mutation guide, Class 1 legal heir rights, documents list, and legal advice.",
//         image: imageUrl,
//         datePublished: "2026-10-20T09:00:00+05:30",
//         dateModified: "2026-10-20T12:00:00+05:30",
//         author: {
//           "@type": "Person",
//           name: "Advocate Anuj Anand Malik",
//           jobTitle: "Senior Estate & Succession Counsel",
//           affiliation: {
//             "@type": "LegalService",
//             name: "WillDrafting.in",
//           },
//         },
//         publisher: {
//           "@id": "https://www.willdrafting.in/#organization",
//         },
//         mainEntityOfPage: {
//           "@id": `${canonicalUrl}#webpage`,
//         },
//         articleSection: "Post-Death Succession",
//       },
//       {
//         "@type": "FAQPage",
//         "@id": `${canonicalUrl}#faq`,
//         mainEntity: [
//           {
//             "@type": "Question",
//             name: "What happens to a father's property if he dies without a will in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Section 8 of the Hindu Succession Act, 1956, when a male Hindu dies intestate (without a will), his entire estate devolves equally among his Class I legal heirs simultaneously. These include his surviving widow, mother, sons, and daughters. Each gets an undivided equal share as tenants-in-common.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Do married daughters have equal inheritance rights in their father's property?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Following the landmark 2005 Amendment to the Hindu Succession Act and the Supreme Court's Vineeta Sharma (2020) ruling, daughters possess identical coparcenary and inheritance rights as sons from birth, irrespective of their marital status or whether the father was alive when the amendment took effect.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a mother transfer the entire property to one son without the other children's consent?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. If the property was owned solely by the deceased father, the mother inherits only her individual fractional share (e.g. 1/3 if there are two children). She cannot legally sell, gift, or transfer the shares belonging to the other children without their executed and registered relinquishment deeds.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Is a succession certificate required to transfer real estate or houses in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. Under Section 370 of the Indian Succession Act, 1925, a succession certificate can only be granted for movable debts and securities (like bank accounts and shares). Immovable property transfer requires a Legal Heir Certificate, registered release/settlement deeds, and municipal mutation.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does property mutation (Dakhil Kharij) grant legal title and ownership?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. The Supreme Court of India in landmark rulings (including Sawarni v. Inder Kaur and Jitendra Singh v. State of MP) has settled that mutation entries in municipal or revenue records exist strictly for fiscal tax collection and do not confer, extinguish, or create proprietary title to immovable property.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can one legal heir sell their share of inherited property to an outsider?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "While an heir technically owns an undivided share, Section 22 of the Hindu Succession Act and Section 44 of the Transfer of Property Act give co-heirs a preferential right of pre-emption. Furthermore, an outside purchaser cannot force joint physical possession of a family dwelling without filing a civil partition suit.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How can an NRI legal heir relinquish or transfer their share from abroad?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "An NRI co-heir can execute a Special Power of Attorney (POA) or Relinquishment Deed in their country of residence. The document must be notarized and apostilled (or authenticated by the Indian Embassy/Consulate), sent to India, stamped with state duty within 90 days, and registered under the Registration Act.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a plain affidavit or unregistered NOC transfer property rights after death?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. Under Section 17(1)(b) and Section 49 of the Registration Act, 1908, any instrument that relinquishes or transfers an interest in immovable property valued over 100 rupees must be compulsorily registered at the Sub-Registrar Office. Plain paper affidavits and NOCs have zero legal validity to extinguish title.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What should family members do if one legal heir refuses to sign mutation papers?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "If a co-heir refuses mutual cooperation or disputes shares, municipal authorities will refuse consensus mutation. The only legal remedy is for the consenting heirs to file a Civil Suit for Partition in the competent civil court to obtain a preliminary and final partition decree specifying separate metes and bounds.",
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
//       <PropertyTransferAfterDeathClient />
//       <Footer />
//     </>
//   );
// }
// 
