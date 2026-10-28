import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/faq";
import CTA from "@/components/cta";
import Process from "@/components/process";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Online Will Writing Services in India | WillDrafting.in",
  },
  description:
    "Professional online Will writing services in India under the Indian Succession Act 1925 & Hindu Succession Act 1956 with High Court advocate review.",
  keywords: [
    "will writing services in india",
    "lawyer verified will online india",
    "online will drafting services india",
    "estate planning services in india",
    "will under indian succession act 1925",
    "advocate reviewed will india",
    "estate planning lawyers in india",
    "personal law will drafting india",
    "hindu succession act 1956 will rules",
    "muslim will wasiyat 1/3 rule india",
    "christian will drafting india",
    "parsi will succession india",
    "special marriage act will rules india",
    "court ready will printout india",
    "will registration assistance india",
    "nri will writing services india",
    "online will consultation india",
    "testamentary succession india",
    "ama legal solutions estate planning",
    "executors and guardians in will india",
    "self acquired vs ancestral property will",
    "sub registrar will registration help",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/services",
  },
  openGraph: {
    title: "Online Will Writing Services in India - Lawyer-Verified Will & Estate Planning | WillDrafting.in",
    description:
      "Professional online Will writing services in India under the Indian Succession Act, 1925 & Hindu Succession Act, 1956. Get a court-ready Will printout, High Court advocate verification & registration assistance.",
    url: "https://www.willdrafting.in/services",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/online-will-drafting-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting & Lawyer Review Services in India - AMA Legal Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Will Writing Services in India - Lawyer-Verified Will & Estate Planning | WillDrafting.in",
    description:
      "Professional online Will writing services in India under the Indian Succession Act, 1925 & Hindu Succession Act, 1956. Get a court-ready Will printout, High Court advocate verification & registration assistance.",
    images: ["/images/online-will-drafting-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.willdrafting.in/services#service",
      "name": "Online Will Writing, Lawyer Verification & Estate Planning Services in India",
      "serviceType": "Legal Will Preparation & Estate Succession",
      "image": "https://www.willdrafting.in/images/online-will-drafting-og.jpg",
      "provider": {
        "@id": "https://www.willdrafting.in/#legalservice",
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "Australia" },
        { "@type": "Country", "name": "Singapore" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Indian Will Drafting & Estate Planning Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "price": "2490",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Auto-Verified Online Will Drafting (Essential Plan)",
              "description":
                "Create a legally binding Will online in minutes under Section 63 of the Indian Succession Act, 1925 with instant court-ready PDF download.",
            },
          },
          {
            "@type": "Offer",
            "price": "4990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Lawyer-Verified Online Will (Advocate Reviewed)",
              "description":
                "Line-by-line legal review and verification of your Will by a High Court succession advocate at AMA Legal Solutions.",
            },
          },
          {
            "@type": "Offer",
            "price": "9990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "1-on-1 Advocate Consultation & NRI / Complex Estate Will",
              "description":
                "Dedicated advocate call, bespoke clauses for NRI/OCI Indian assets, HUF/coparcenary shares, and Sub-Registrar registration guidance.",
            },
          },
          {
            "@type": "Offer",
            "price": "14990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "High Court Letters of Administration Petition Drafting & Representation",
              "description":
                "End-to-end representation before High Courts and District Courts for Letters of Administration under Sections 218 and 232 of the Indian Succession Act, 1925.",
            },
          },
          {
            "@type": "Offer",
            "price": "25000",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Will Dispute & Probate Litigation Advocacy",
              "description":
                "High Court advocate representation for challenging forged Wills, lodging caveats under Section 284, defending genuine Wills against frivolous claims, and civil partition suits.",
            },
          },
          {
            "@type": "Offer",
            "price": "49000",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Private Family Trust Formation & Registration India",
              "description":
                "Bespoke private family trust deed drafting under Indian Trusts Act 1882, Sub-Registrar registration, Trust PAN procurement, and estate ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            "price": "9990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Property Mutation & Dakhil Kharij Service India",
              "description":
                "Advocate-managed municipal and revenue mutation service covering MCD/DDA, BBMP e-Aasthi Khata, 7/12 Varas Nond, and Tehsildar Dakhil Kharij across India.",
            },
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/services#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.willdrafting.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.willdrafting.in/services",
        },
      ],
    },
  ],
};

interface ServiceCard {
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  isComingSoon?: boolean;
  illustrationSrc: string;
}

const services: ServiceCard[] = [
  {
    title: "Online Will Drafting & Lawyer Review",
    description:
      "Create a professionally structured legal Will online from the comfort of your home under the Indian Succession Act, 1925. Clearly document your wishes, allocate immovable and financial assets, appoint guardians for minor children, and have your Will verified by AMA Legal Solutions.",
    linkText: "Write your Will",
    linkHref: "/contact",
    illustrationSrc: "/images/online-will-drafting-og.jpg",
  },
  {
    title: "NRI & OCI Indian Will Drafting",
    description:
      "Specialized Two-Will estate planning for Non-Resident Indians holding immovable property, NRE/NRO accounts, and Demat shares across India, preventing foreign probate re-sealing delays under Section 228 of the Indian Succession Act.",
    linkText: "Explore NRI Will Services",
    linkHref: "/services/nri-will-india",
    illustrationSrc: "/images/nri-will-india-og.jpg",
  },
  {
    title: "Legal Heir",
    description:
      "Official Legal Heir Certificate documentation and assistance to establish rightful legal heirs under Indian succession laws for property mutation, insurance claims, and bank transfers.",
    linkText: "Explore Legal Heir Services",
    linkHref: "/services/legal-heir",
    illustrationSrc: "/images/legal-heir-og.jpg",
  },
  {
    title: "Relinquishment Deed",
    description:
      "Legally binding Relinquishment Deed (Haq Tyag) drafting and Sub-Registrar registration assistance to smoothly transfer inherited property shares among co-heirs without family friction.",
    linkText: "Explore Relinquishment Deed",
    linkHref: "/services/relinquishment-deed",
    illustrationSrc: "/images/relinquishment-deed-og.jpg",
  },
  {
    title: "Survivor Member Certificate",
    description:
      "Fast-track documentation and advisory for obtaining a Surviving Member Certificate (SMC) from revenue authorities to expedite municipal records update and estate transfers.",
    linkText: "Explore Survivor Certificate",
    linkHref: "/services/survivor-member-certificate",
    illustrationSrc: "/images/survivor-member-certificate-og.jpg",
  },
  {
    title: "Will Dispute & Probate Litigation",
    description:
      "High Court advocate representation to challenge forged or coerced Wills under the Indian Succession Act, lodge Section 284 caveats, and defend genuine testamentary bequests against vexatious claims.",
    linkText: "Explore Will Dispute Services",
    linkHref: "/services/will-dispute-contest-litigation-lawyer",
    illustrationSrc: "/images/will-dispute-contest-litigation-lawyer-og.jpg",
  },
  {
    title: "Property Mutation & Dakhil Kharij",
    description:
      "End-to-end advocate assistance for municipal property mutation (MCD, BMC, BBMP Khata) and land revenue Dakhil Kharij (7/12 Varas Nond, Tehsildar Khatauni) after a property owner's demise.",
    linkText: "Explore Property Mutation Services",
    linkHref: "/services/property-mutation-dakhil-kharij-service",
    illustrationSrc: "/images/property-mutation-dakhil-kharij-service-og.jpg",
  },
    {
    title: "Letters of Administration Lawyer",
    description:
      "Expert High Court and District Court advocate assistance for Letters of Administration under Sections 218 and 232 of the Indian Succession Act, 1925 to transfer intestate real estate and unlock bank lockers.",
    linkText: "Explore Letters of Administration",
    linkHref: "/services/letters-of-administration-lawyer",
    illustrationSrc: "/images/letters-of-administration-lawyer-og.jpg",
  },
{
    title: "Family Settlement Deed & Partition",
    description:
      "Ironclad Family Settlement Agreement and Partition Deed drafting by High Court advocates under the Registration Act, 1908 and Indian Stamp Act, 1899 to amicably divide ancestral property and resolve succession disputes.",
    linkText: "Explore Family Settlement Services",
    linkHref: "/services/family-settlement-deed-lawyer",
    illustrationSrc: "/images/family-settlement-deed-lawyer-og.jpg",
  },
  {
    title: "Private Family Trust Formation",
    description:
      "Bespoke private family trust deed drafting under the Indian Trusts Act, 1882, Sub-Registrar registration, Trust PAN procurement, and estate ring-fencing for HNI families and special needs dependents.",
    linkText: "Explore Private Trust Services",
    linkHref: "/services/private-family-trust-formation",
    illustrationSrc: "/images/private-family-trust-formation-og.jpg",
  },
];

interface PersonalLawRow {
  community: string;
  governingStatute: string;
  testamentaryLimit: string;
  executionRules: string;
  keyPlanningNote: string;
}

const PERSONAL_LAW_MATRIX: PersonalLawRow[] = [
  {
    community: "Hindu, Buddhist, Sikh & Jain (Male & Female)",
    governingStatute: "Hindu Succession Act, 1956 (Sections 6, 8, 15 & 30) read with Indian Succession Act, 1925",
    testamentaryLimit: "100% of self-acquired property + your undivided share in HUF / ancestral coparcenary property (Section 30)",
    executionRules: "Signed on plain A4 paper in the simultaneous presence of 2 independent adult witnesses (Section 63 ISA)",
    keyPlanningNote: "For married Hindu women, Section 15 creates distinct intestate rules based on source of property, making a written Will critical to protect your parents or children.",
  },
  {
    community: "Muslim Personal Law (Sunni & Shia - Wasiyat)",
    governingStatute: "Muslim Personal Law (Shariat) Application Act, 1937",
    testamentaryLimit: "Up to 1/3rd (one-third) of net estate after funeral expenses and debts without heir consent",
    executionRules: "Written Wasiyat attested by two adult witnesses recommended for bank, Demat & municipal mutation clarity",
    keyPlanningNote: "Bequests exceeding 1/3rd of the estate (or to an existing legal heir under Sunni law) require the express consent of surviving legal heirs after the testator's demise.",
  },
  {
    community: "Christian & Parsi Testators",
    governingStatute: "Indian Succession Act, 1925 (Part V Sections 31–49 for Christians; Part VI Sections 50–56 for Parsis)",
    testamentaryLimit: "100% testamentary freedom over all self-acquired movable and immovable assets",
    executionRules: "Mandatory written Will signed by testator and attested by at least 2 independent witnesses (Section 63 ISA)",
    keyPlanningNote: "Under Section 67 of the Indian Succession Act, never ask a beneficiary or their spouse to sign as an attesting witness, or their specific bequest becomes void.",
  },
  {
    community: "Inter-Faith & Civil Marriages",
    governingStatute: "Special Marriage Act, 1954 (Section 21) read with Indian Succession Act, 1925",
    testamentaryLimit: "100% testamentary freedom over owned estate",
    executionRules: "Standard Section 63 two-witness execution on plain paper; optional registration under Section 18 Registration Act",
    keyPlanningNote: "Registering a marriage under the Special Marriage Act shifts succession to the Indian Succession Act, 1925 (with exceptions for two Hindus under Section 21A).",
  },
  {
    community: "NRIs & OCIs Living Abroad (US, UK, UAE, Canada, AU, SG)",
    governingStatute: "Indian Succession Act, 1925 (Sections 5, 63 & 228) + FEMA (Non-Debt Instruments) Rules, 2019",
    testamentaryLimit: "100% of Indian residential/commercial property, NRE/NRO/FCNR bank accounts, mutual funds & Demat shares",
    executionRules: "Separate Indian Will ('Two-Will Strategy') signed before 2 witnesses with an explicit non-revocation territorial clause",
    keyPlanningNote: "Avoids 12–18 months of foreign probate re-sealing under Section 228 ISA and simplifies Form 15CA/15CB repatriation up to USD 1M/year.",
  },
];

export default function ServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-20">
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="mb-8 sm:mb-12 max-w-[1200px]">
            <div className="inline-flex items-center text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4 sm:mb-5">
              <span>Online Will Writing &amp; Estate Planning Services in India</span>
            </div>

            <h1 className="text-[2rem] sm:text-[2.2rem] lg:text-[3.4rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-4 sm:mb-5">
              Protect What You’ve Built. <br /> Secure Who You Leave Behind.
            </h1>

            <p className="text-[1.05rem] sm:text-[1.18rem] leading-[1.65] text-[#49585F] font-normal max-w-[760px]">
              <span className="font-bold">Lawyer-verified online Wills, estate planning, and succession solutions in India tailored to your personal law, family, and assets.</span> Ensure your residential property, NRE/NRO bank accounts, Demat investments, and minor children are protected through a court-ready Will printout under the Indian Succession Act, 1925 and Hindu Succession Act, 1956.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SERVICES CARDS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-[24px] overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#1B2A4A]/5"
              >
                <div className="relative w-full bg-gradient-to-b from-[#F5EBF4]/40 to-transparent flex items-center justify-center h-[220px] sm:h-[285px] overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={service.illustrationSrc}
                      alt={
                        service.title === "Online Will Drafting & Lawyer Review"
                          ? "Online Will Drafting and Lawyer Verification Services under Indian Succession Act - AMA Legal Solutions"
                          : service.title === "Legal Heir"
                            ? "Official Legal Heir Certificate Documentation and Verification Services in India"
                            : service.title === "Relinquishment Deed"
                              ? "Relinquishment Deed Haq Tyag Registration and Drafting Services in India"
                              : service.title === "Survivor Member Certificate"
                                ? "Surviving Member Certificate SMC Application and Verification in India"
                                : service.title === "Property Mutation & Dakhil Kharij"
                                  ? "Property Mutation and Dakhil Kharij Advocate Services in India - AMA Legal Solutions"
                                : service.title === "Will Dispute & Probate Litigation"
                                  ? "Will Dispute and Probate Litigation Lawyers in India - AMA Legal Solutions"
                                  : service.title === "Letters of Administration Lawyer" || service.title === "Letters of Administration"
                                  ? "Letters of Administration Court Representation and Advocate Petitions in India - AMA Legal Solutions"
                                  : service.title === "Family Settlement Deed & Partition"
                                    ? "Family Settlement Agreement and Partition Deed Drafting Services in India - AMA Legal Solutions"
                                    : service.title === "Private Family Trust Formation"
                                      ? "Private Family Trust Formation and Registration in India - AMA Legal Solutions"
                                      : service.title === "NRI & OCI Indian Will Drafting"
                                        ? "NRI and OCI Indian Will Drafting and Cross-Border Estate Planning Services in India"
                                        : !service.isComingSoon
                                          ? `${service.title} in India - AMA Legal Solutions`
                                          : "Estate planning and Power of Attorney services in India coming soon"
                      }
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`${service.illustrationSrc.endsWith(".jpg")
                          ? "object-cover group-hover:scale-105"
                          : "object-contain scale-[1.2]"
                        } transition-transform duration-300`}
                    />
                  </div>
                </div>

                <div className="p-8 sm:p-10 flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-[1.75rem] font-medium text-[#111827] mb-3 group-hover:text-[#C65378] transition-colors duration-200">
                      {service.title}
                    </h2>
                    <p className="text-[#49585F] text-[15px] sm:text-[16px] leading-[1.6] mb-8 font-normal">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    {service.isComingSoon ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] bg-[#F5EBF4] px-4 py-2 rounded-full">
                        Coming Soon
                      </span>
                    ) : (
                      <Link
                        href={service.linkHref || "/contact"}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#111827] group/link hover:text-[#C65378] transition-colors"
                      >
                        <span>{service.linkText}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            INDIAN PERSONAL LAW & TESTAMENTARY SUCCESSION MATRIX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="mb-8 sm:mb-12 max-w-3xl">
            <div className="inline-flex items-center text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <span>Indian Personal Law Coverage</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] lg:text-[2.85rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              How Will Drafting Works Across Every Personal Law in India
            </h2>
            <p className="text-[0.98rem] sm:text-[1.06rem] leading-[1.65] text-[#49585F]">
              Succession and testamentary limits in India depend on the personal law governing the testator and the location of the assets. Our platform and advocates at <span className="font-semibold text-[#111827]">AMA Legal Solutions</span> structure your Will in strict compliance with your governing statute:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[820px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Community / Category</th>
                    <th className="py-4 px-6 w-[22%]">Governing Indian Statute</th>
                    <th className="py-4 px-6 w-[20%]">What Can Be Willed</th>
                    <th className="py-4 px-6 w-[18%]">Execution &amp; Witness Rule</th>
                    <th className="py-4 px-6 w-[20%]">Critical Legal Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {PERSONAL_LAW_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F0]/50 transition-colors align-top">
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.community}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.governingStatute}
                      </td>
                      <td className="py-5 px-6 text-[#172228] font-medium">
                        {row.testamentaryLimit}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.executionRules}
                      </td>
                      <td className="py-5 px-6 text-[#49585F] text-[13.5px]">
                        {row.keyPlanningNote}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[24px] bg-white border border-[#172228]/10 p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1.5">
                  Specialized Cross-Border Service Silo
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-[#111827] mb-2">
                  Living Abroad in the USA, UK, UAE, Canada, Australia, or Singapore?
                </h3>
                <p className="text-sm text-[#49585F]">
                  Explore our dedicated NRI &amp; OCI Indian Will Hub covering the Two-Will Strategy, Section 228 probate exemption, FEMA agricultural land inheritance, and NRE/NRO Form 15CA/15CB repatriation.
                </p>
              </div>
              <div>
                <Link
                  href="/services/nri-will-india"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a83d5f] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 transition-colors"
                >
                  <span>Explore NRI Will Drafting in India</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] bg-white border border-[#172228]/10 p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1.5">
                  Free Interactive Statutory Tool
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-[#111827] mb-2">
                  Who Inherits Your Property If You Pass Away Without a Will?
                </h3>
                <p className="text-sm text-[#49585F]">
                  Use our Indian Intestate Succession &amp; Nominee Conflict Calculator to see exact Class I legal heir shares under Hindu, Muslim, Christian, and Parsi law.
                </p>
              </div>
              <div>
                <Link
                  href="/tools/succession-calculator"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 transition-colors"
                >
                  <span>Launch Indian Succession Calculator</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Process />
      </main>

      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
