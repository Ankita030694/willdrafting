import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetCareCharityBequestClient from "./PetCareCharityBequestClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Leaving Money to Charity or Pet in Will India | WillDrafting", // exactly 60 characters
  },
  description:
    "Download valid pet care and charity bequest clauses for Wills in India. Structure conditional caretaker funds, 80G NGO gifts, and honorary pet trusts.", // exactly 150 characters
  keywords: [
    "leaving money to charity or pet in will india format",
    "pet trust clause in will india",
    "charitable bequest temple ngo in will format section 118",
    "can i leave money to my dog in a will india",
    "pet care clause in will indian succession act",
    "conditional bequest to caretaker with gift over",
    "section 112 indian succession act animal bequest",
    "john vallamattom section 118 supreme court precedent",
    "section 80g charitable corpus donation in will",
    "testamentary pet trust indian trusts act 1882",
    "temple ashram donation clause will format india",
    "ama legal solutions pet care will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/pet-care-and-charity-bequest-clause-will-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/pet-care-and-charity-bequest-clause-will-format",
      "x-default": "https://www.willdrafting.in/templates/pet-care-and-charity-bequest-clause-will-format",
    },
  },
  openGraph: {
    title: "Leaving Money to Charity or Pet in Will India | WillDrafting",
    description:
      "Download valid pet care and charity bequest clauses for Wills in India. Structure conditional caretaker funds, 80G NGO gifts, and honorary pet trusts.",
    url: "https://www.willdrafting.in/templates/pet-care-and-charity-bequest-clause-will-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/pet-care-and-charity-bequest-clause-will-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Pet Care and Charity Bequest Clause in Will Format India Legal Guidelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leaving Money to Charity or Pet in Will India | WillDrafting",
    description:
      "Download valid pet care and charity bequest clauses for Wills in India. Structure conditional caretaker funds, 80G NGO gifts, and honorary pet trusts.",
    images: ["https://www.willdrafting.in/images/pet-care-and-charity-bequest-clause-will-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function PetCareAndCharityBequestPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/pet-care-and-charity-bequest-clause-will-format";
  const imageUrl = "https://www.willdrafting.in/images/pet-care-and-charity-bequest-clause-will-format-og.jpg";

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
        name: "Leaving Money to Charity or Pet in Will India | WillDrafting",
        description:
          "Download valid pet care and charity bequest clauses for Wills in India. Structure conditional caretaker funds, 80G NGO gifts, and honorary pet trusts.",
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
            name: "Pet Care & Charity Bequest Clause Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Pet Care and Charity Bequest Clause in Will Format India",
        url: canonicalUrl,
        description:
          "Statutory legal clauses and testamentary trust formats for providing lifelong maintenance for companion animals and tax-exempt bequests to charitable trusts, NGOs, and religious institutions under Indian law.",
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
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "Pet Care and Charity Bequest Clause in Will Format",
        description:
          "Comprehensive legal guide and statutory clause templates for structuring enforceable pet caretaking funds and philanthropic charitable bequests in an Indian Will.",
        image: imageUrl,
        mainEntityOfPage: canonicalUrl,
        inLanguage: "en-IN",
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Succession Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I leave money directly to my pet dog or cat in an Indian Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Indian law and Section 112 of the Indian Succession Act, 1925, an animal is not a juristic person and cannot hold property or maintain a bank account. A direct bequest like 'I give ₹20 Lakhs to my dog Bruno' is legally void ab initio. Instead, testators must structure the bequest as a Conditional Caretaker Bequest under Section 127 with a Gift-Over under Section 131, or establish a Testamentary Pet Care Trust under the Indian Trusts Act, 1882.",
            },
          },
          {
            "@type": "Question",
            name: "How does a Conditional Caretaker Bequest with Gift-Over work for pet care?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Sections 127 and 131 of the Indian Succession Act, 1925, the testator bequeaths a specific fund or monthly stipend to a designated human caretaker subject to the express condition subsequent that they provide humane shelter, veterinary healthcare, and daily sustenance to the pet. The clause includes a mandatory 'gift-over' provision stipulating that if the caretaker neglects, abandons, or mistreats the animal, legal custody and the remaining funds immediately divest and pass to an alternate caretaker or a registered animal welfare NGO.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Christian, Parsi, or Hindu leave money to a charity or temple in a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In the historic judgment of John Vallamattom & Anr. v. Union of India (2003) 6 SCC 611, the Supreme Court of India declared Section 118 of the Indian Succession Act, 1925 unconstitutional. Previously, Section 118 imposed arbitrary 12-month pre-death execution and deposit restrictions on bequests for religious or charitable purposes. Following this landmark ruling, any testator in India can bequeath property to charities, temples, ashrams, churches, gurdwaras, or NGOs at any time without statutory delay periods.",
            },
          },
          {
            "@type": "Question",
            name: "How do I ensure a charitable donation in my Will qualifies for tax exemption?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To ensure legal compliance and optimal tax treatment, the bequest should specify the official registered name, Registered Office address, Permanent Account Number (PAN), and Section 12AB/80G registration certificate number of the charitable trust or NGO. Furthermore, the clause should explicitly state that the bequest is a 'Corpus Donation' under Section 11(1)(d) of the Income Tax Act, 1961, directing the charity to capitalize the funds rather than treating them as annual taxable revenue.",
            },
          },
          {
            "@type": "Question",
            name: "Can my pet caretaker or the charity head act as an attesting witness to my Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No! Under Section 67 of the Indian Succession Act, 1925, any bequest, legacy, or benefit granted to an attesting witness (or to the spouse of an attesting witness) is strictly VOID. While the Will itself remains valid, the caretaker will forfeit all financial bequests and the charity bequest may be invalidated if their authorized trustees attested the Will. Always select two independent, neutral adult witnesses who receive zero financial interest under the testament.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to the remaining pet care fund after the pet passes away?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A well-drafted pet care clause must contain a 'residuary gift-over clause'. It directs the executor or trustee that upon the pet's natural death (verified by a registered veterinary surgeon's certificate of humane demise), any unspent principal corpus and accrued interest shall either transfer to a nominated animal welfare charity (such as Blue Cross of India, Friendicoes, or People For Animals) or revert to the testator's residuary estate for their human legal heirs.",
            },
          },
          {
            "@type": "Question",
            name: "Can relatives challenge a Will that leaves a large estate to charity or pet care?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Relatives frequently attempt to challenge such Wills on grounds of 'undue influence', 'unnatural disposition', or 'lack of testamentary capacity'. To make the Will challenge-proof: (1) clearly record the reasons for disinheriting or limiting family gifts, (2) attach a contemporaneous medical fitness certificate from a registered physician confirming sound disposing mind, (3) register the Will at the Sub-Registrar Office (SRO) under Book 3, and (4) video-record the execution session with independent witnesses.",
            },
          },
          {
            "@type": "Question",
            name: "What is an Honorary Pet Trust under the Indian Trusts Act, 1882?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An Honorary Pet Trust is a testamentary trust where property is transferred to a human Trustee with specific directions to hold and manage funds exclusively for the welfare and maintenance of a non-human beneficiary. Because an animal cannot enforce a trust in court, the Will appoints a third-party 'Trust Protector' or 'Enforcer' (such as a trusted family lawyer or veterinarian) empowered to audit veterinary bills and replace the caretaker in case of neglect.",
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
      <Navbar />
      <PetCareCharityBequestClient />
      <Footer />
    </>
  );
}
