import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Will Drafting Pricing India | ₹1,499 Flat Fee",
  description:
    "Draft legally valid Indian wills for a flat fee of ₹1,499. No hidden retainers or subscriptions. Instant court-ready PDF download & lifetime amendments.",
  alternates: {
    canonical: "https://www.willdrafting.in/pricing",
  },
  openGraph: {
    title: "Will Drafting Pricing India | ₹1,499 Flat Fee",
    description:
      "Draft legally valid Indian wills for a flat fee of ₹1,499. No hidden retainers or subscriptions. Instant court-ready PDF download & lifetime amendments.",
    url: "https://www.willdrafting.in/pricing",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting Pricing India | ₹1,499 Flat Fee",
    description:
      "Draft legally valid Indian wills for a flat fee of ₹1,499. No hidden retainers or subscriptions. Instant court-ready PDF download & lifetime amendments.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://www.willdrafting.in/pricing#product",
      "name": "Legal Will Drafting Service India",
      "description":
        "Statutory personal testamentary will drafting service compliant with the Indian Succession Act, 1925. Features comprehensive asset distribution, executor appointments, minor guardianship clauses, doctor certification template, and dual-witness attestation instructions.",
      "brand": {
        "@type": "Brand",
        "name": "WillDrafting.in",
      },
      "offers": {
        "@type": "Offer",
        "url": "https://www.willdrafting.in/pricing",
        "priceCurrency": "INR",
        "price": "1499",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "WillDrafting.in",
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/pricing#breadcrumb",
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
          "name": "Pricing",
          "item": "https://www.willdrafting.in/pricing",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/pricing#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are there any recurring subscription fees or hidden platform charges?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. WillDrafting operates on a strictly transparent one-time fee of ₹1,499. There are no recurring monthly or annual subscription fees, no per-revision charges, and no hidden advocate retainers. Once you purchase your draft, you receive permanent access to your secure digital vault and can generate updated PDF revisions whenever your asset distribution or family circumstances change.",
          },
        },
        {
          "@type": "Question",
          "name": "Is an online-drafted Will legally enforceable in Indian courts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, absolutely. Under Section 63 of the Indian Succession Act, 1925, any Will written in clear language, declaring testamentary intent, executed by an individual of sound mind, and signed in the presence of two independent witnesses is completely valid and enforceable before any civil court in India. A digital drafting engine ensures statutory clauses and legal requirements are properly structured.",
          },
        },
        {
          "@type": "Question",
          "name": "Do I need to purchase non-judicial stamp paper or have the Will notarized?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Under the Indian Stamp Act, 1899, a Will is completely exempt from stamp duty across all Indian states and Union Territories. You do not need to print it on stamp paper. Printing on plain white A4 paper is legally standard. Notarization is also purely optional under Indian law and does not replace the mandatory requirement of two independent witnesses.",
          },
        },
        {
          "@type": "Question",
          "name": "Is registration at the Sub-Registrar office mandatory for a valid Will?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Registration is purely optional under Section 18(e) of the Registration Act, 1908. An unregistered Will executed in accordance with Section 63 of the Indian Succession Act holds equal evidentiary value in court. Registration provides an additional layer of official record-keeping but is not a legal prerequisite for validity.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I edit and update my Will later if my assets change?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every ₹1,499 WillDrafting license includes unlimited lifetime revisions. If you acquire new real estate, sell mutual funds, open new bank accounts, or wish to change beneficiaries or executors, simply log in to your account, update your questionnaire, and generate an updated court-ready Will at no additional fee.",
          },
        },
        {
          "@type": "Question",
          "name": "Why is WillDrafting priced at ₹1,499 while law firms charge ₹25,000 or more?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Traditional law firms incur substantial overhead, hourly billing structures, and multiple manual drafting rounds for standard succession clauses. WillDrafting leverages legal technology to automate document assembly using court-vetted templates designed by seasoned estate advocates, eliminating manual legal overhead and passing the cost savings directly to Indian families.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I distribute ancestral property or only self-acquired assets?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under Indian succession law, a testator has testamentary power to bequeath 100% of their self-acquired properties, personal investments, savings, and movable assets. In the case of undivided ancestral coparcenary property (governed by the Hindu Succession Act), a testator can only bequeath their specific undivided share that would fall to them upon a deemed partition at the time of death.",
          },
        },
        {
          "@type": "Question",
          "name": "Which payment methods are accepted and how is financial security handled?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We accept all major Indian payment methods through RBI-licensed payment gateway partners (PayU), including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 50+ Indian banks, debit cards, and credit cards. All transactions are protected by 256-bit TLS encryption. We never store credit card credentials or bank passwords.",
          },
        },
      ],
    },
  ],
};

interface MatrixRowItem {
  title: string;
  subtext: string;
  willDrafting: string;
  lawFirm: string;
  bankTrustee: string;
}

interface MatrixCategory {
  category: string;
  rows: MatrixRowItem[];
}

const MASTER_MATRIX: MatrixCategory[] = [
  {
    category: "Pricing & Engagement Model",
    rows: [
      {
        title: "Total Service Fee",
        subtext: "Initial cost to draft, compile, and produce the document",
        willDrafting: "₹1,499 flat one-time",
        lawFirm: "₹15,000 – ₹40,000 retainer",
        bankTrustee: "₹25,000 – ₹1,00,000 setup",
      },
      {
        title: "Future Document Amendments",
        subtext: "Cost to update assets, beneficiaries, or executor nominations",
        willDrafting: "Free lifetime revisions",
        lawFirm: "₹5,000 – ₹10,000 per amendment",
        bankTrustee: "Heavy corporate administrative fees",
      },
      {
        title: "Hidden & Recurring Retainers",
        subtext: "Annual account keeping, vault maintenance, or ongoing dues",
        willDrafting: "Zero (No subscriptions)",
        lawFirm: "Billed per hourly consultation",
        bankTrustee: "0.5% – 1% annual estate custody fee",
      },
      {
        title: "Completion Turnaround",
        subtext: "Time from questionnaire initiation to court-ready document",
        willDrafting: "15 minutes self-guided",
        lawFirm: "1 to 3 weeks across meetings",
        bankTrustee: "2 to 5 weeks institutional processing",
      },
    ],
  },
  {
    category: "Testamentary Clauses & Asset Coverage",
    rows: [
      {
        title: "Section 59 Sound Disposing Mind Declaration",
        subtext: "Affirmation of testamentary capacity and freedom from undue influence",
        willDrafting: "Included (Court-tested wording)",
        lawFirm: "Standard advocate draft",
        bankTrustee: "Standard institutional text",
      },
      {
        title: "Immovable Real Estate Allocation",
        subtext: "Specific allocation of residential flats, commercial plots, and ancestral shares",
        willDrafting: "Unlimited properties & shares",
        lawFirm: "Extra fee for multiple properties",
        bankTrustee: "Limited to trust schedule",
      },
      {
        title: "Financial Securities & Demat Portfolio",
        subtext: "Direct assignment of Demat equity folios, mutual funds, SGBs, and PPF",
        willDrafting: "Comprehensive scheduling",
        lawFirm: "Often requires extra schedules",
        bankTrustee: "Requires asset onboarding",
      },
      {
        title: "Universal Residuary Bequest Clause",
        subtext: "Vital catch-all safeguarding unlisted or future acquired assets from partial intestacy",
        willDrafting: "Included as standard safeguard",
        lawFirm: "Varies by advocate skill",
        bankTrustee: "Standard clause",
      },
    ],
  },
  {
    category: "Fiduciary Appointments & Dependent Protection",
    rows: [
      {
        title: "Executor & Alternate Executor Nomination",
        subtext: "Clear fiduciary powers to administer the estate, settle debts, and distribute assets",
        willDrafting: "Included with alternate backup",
        lawFirm: "Included (often pushes law firm)",
        bankTrustee: "Mandates bank as paid executor",
      },
      {
        title: "Minor Child Guardianship Nomination",
        subtext: "Appointment under the Guardians and Wards Act, 1890 in the event of parental demise",
        willDrafting: "Included with maintenance clauses",
        lawFirm: "May charge additional consult",
        bankTrustee: "Usually omitted from base fee",
      },
      {
        title: "Conditional Distribution & Vesting Ages",
        subtext: "Instructions specifying staggered asset vesting for minor children",
        willDrafting: "Structured in questionnaire",
        lawFirm: "Available on custom request",
        bankTrustee: "Requires setting up family trust",
      },
    ],
  },
  {
    category: "Execution, Attestation & Storage Kit",
    rows: [
      {
        title: "Section 63(c) Attestation Kit",
        subtext: "Visual execution guidelines and dual-witness legal attestation clause",
        willDrafting: "Included with signing guide",
        lawFirm: "Advocate witnesses at extra fee",
        bankTrustee: "Client must arrange witnesses",
      },
      {
        title: "Medical Practitioner Fitness Certificate Format",
        subtext: "Court-approved doctor certification format to eliminate capacity disputes",
        willDrafting: "Included in execution kit",
        lawFirm: "Rarely provided proactively",
        bankTrustee: "Third-party medical certificate required",
      },
      {
        title: "Encrypted Cloud Vault & Instant PDF",
        subtext: "Immediate high-resolution document download and permanent encrypted digital copy",
        willDrafting: "Instant PDF + AES-256 Vault",
        lawFirm: "Paper copy or unencrypted email",
        bankTrustee: "Paper documentation",
      },
    ],
  },
];

const FAQS = [
  {
    question: "Are there any recurring subscription fees or hidden platform charges?",
    answer:
      "No. WillDrafting operates on a strictly transparent one-time fee of ₹1,499. There are no recurring monthly or annual subscription fees, no per-revision charges, and no hidden advocate retainers. Once you purchase your draft, you receive permanent access to your secure digital vault and can generate updated PDF revisions whenever your asset distribution or family circumstances change.",
  },
  {
    question: "Is an online-drafted Will legally enforceable in Indian courts?",
    answer:
      "Yes, absolutely. Under Section 63 of the Indian Succession Act, 1925, any Will written in clear language, declaring testamentary intent, executed by an individual of sound mind, and signed in the presence of two independent witnesses is completely valid and enforceable before any civil court in India. A digital drafting engine ensures statutory clauses and legal requirements are properly structured.",
  },
  {
    question: "Do I need to purchase non-judicial stamp paper or have the Will notarized?",
    answer:
      "No. Under the Indian Stamp Act, 1899, a Will is completely exempt from stamp duty across all Indian states and Union Territories. You do not need to print it on stamp paper. Printing on plain white A4 paper is legally standard. Notarization is also purely optional under Indian law and does not replace the mandatory requirement of two independent witnesses.",
  },
  {
    question: "Is registration at the Sub-Registrar office mandatory for a valid Will?",
    answer:
      "Registration is purely optional under Section 18(e) of the Registration Act, 1908. An unregistered Will executed in accordance with Section 63 of the Indian Succession Act holds equal evidentiary value in court. Registration provides an additional layer of official record-keeping but is not a legal prerequisite for validity.",
  },
  {
    question: "Can I edit and update my Will later if my assets change?",
    answer:
      "Yes. Every ₹1,499 WillDrafting license includes unlimited lifetime revisions. If you acquire new real estate, sell mutual funds, open new bank accounts, or wish to change beneficiaries or executors, simply log in to your account, update your questionnaire, and generate an updated court-ready Will at no additional fee.",
  },
  {
    question: "Why is WillDrafting priced at ₹1,499 while law firms charge ₹25,000 or more?",
    answer:
      "Traditional law firms incur substantial overhead, hourly billing structures, and multiple manual drafting rounds for standard succession clauses. WillDrafting leverages legal technology to automate document assembly using court-vetted templates designed by seasoned estate advocates, eliminating manual legal overhead and passing the cost savings directly to Indian families.",
  },
  {
    question: "Can I distribute ancestral property or only self-acquired assets?",
    answer:
      "Under Indian succession law, a testator has testamentary power to bequeath 100% of their self-acquired properties, personal investments, savings, and movable assets. In the case of undivided ancestral coparcenary property (governed by the Hindu Succession Act), a testator can only bequeath their specific undivided share that would fall to them upon a deemed partition at the time of death.",
  },
  {
    question: "Which payment methods are accepted and how is financial security handled?",
    answer:
      "We accept all major Indian payment methods through RBI-licensed payment gateway partners (PayU), including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 50+ Indian banks, debit cards, and credit cards. All transactions are protected by 256-bit TLS encryption. We never store credit card credentials or bank passwords.",
  },
];

export default function PricingPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <Navbar />

      <main>
        {/* Breadcrumb Bar */}
        <div className={styles.breadcrumbBar}>
          <div className="container">
            <nav aria-label="Breadcrumb">
              <ol className={styles.breadcrumbList}>
                <li>
                  <Link href="/" className={styles.breadcrumbLink}>
                    Home
                  </Link>
                </li>
                <li className={styles.breadcrumbSep}>/</li>
                <li aria-current="page" className={styles.breadcrumbCurrent}>
                  Pricing
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroContent}>
              <span className={styles.heroEyebrow}>Statutory Estate Planning</span>
              {/* Single strict H1 (<70 chars) */}
              <h1 className={styles.heroTitle}>
                Transparent, One-Time Will Drafting Pricing in India
              </h1>
              <p className={styles.heroSubtitle}>
                Draft a legally binding, court-vetted Will under the Indian Succession Act, 1925 for a flat fee of ₹1,499.
                No recurring retainers, no advocate markups, and lifetime free revisions.
              </p>
            </div>
          </div>
        </section>

        {/* Primary Pricing Plan Showcase */}
        <section className={styles.pricingHeroSection}>
          <div className="container">
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <div className={styles.planHeaderLeft}>
                  <h2 className={styles.planName}>Complete Personal Testamentary Will</h2>
                  <p className={styles.planTagline}>
                    Comprehensive personal succession plan covering all immovable, movable, and financial holdings across India.
                  </p>
                </div>
                <div className={styles.planHeaderRight}>
                  <div className={styles.planPrice}>₹1,499</div>
                  <div className={styles.planBillingType}>flat one-time fee · zero subscriptions</div>
                </div>
              </div>

              <div className={styles.planBody}>
                <div className={styles.planGrid}>
                  {[
                    "Complete statutory Will compliant with the Indian Succession Act, 1925",
                    "Unlimited free revisions for life as assets or family circumstances evolve",
                    "Primary and alternate executor nominations with administration powers",
                    "Testamentary guardianship nomination for minor children (Guardians & Wards Act, 1890)",
                    "Exhaustive asset scheduling: Real estate, Demat shares, mutual funds, FDs & lockers",
                    "Universal residuary bequest clause preventing partial intestacy in civil court",
                    "Dual-witness attestation kit with Section 63(c) execution blueprint",
                    "Registered Medical Practitioner (RMP) mental fitness certificate template",
                  ].map((bullet, idx) => (
                    <div key={idx} className={styles.planBullet}>
                      <span className={styles.checkMark}>✓</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.planFooterBar}>
                <p className={styles.planFooterNote}>
                  <strong>Free to begin:</strong> Complete your full questionnaire and review your distribution preview before paying.
                </p>
                <Link href="/start" className={styles.ctaButton}>
                  <span>Start Drafting Your Will</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Master Comparison & Statutory Matrix */}
        <section className={styles.matrixSection}>
          <div className="container">
            <div className={styles.matrixHeader}>
              <span className={styles.matrixEyebrow}>Detailed Specifications</span>
              <h2 className={styles.matrixTitle}>
                Full Feature &amp; Statutory Comparison Matrix
              </h2>
              <p className={styles.matrixSubtitle}>
                A complete breakdown of our automated testamentary platform against traditional advocate retainers and institutional bank trustees.
              </p>
            </div>

            <div className={styles.scrollHint}>
              ← Swipe horizontally to view full comparison matrix →
            </div>

            <div className={styles.matrixContainer}>
              <div className={styles.matrixScroll}>
                <table className={styles.matrixTable}>
                  <thead className={styles.matrixThead}>
                    <tr>
                      <th>Feature &amp; Statutory Provision</th>
                      <th className={styles.highlightCol}>WillDrafting.in (₹1,499)</th>
                      <th>Traditional Law Firm</th>
                      <th>Bank Trustee Desk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MASTER_MATRIX.map((cat) => (
                      <tr key={`cat-${cat.category}`} className={styles.categoryHeaderRow}>
                        <td colSpan={4}>{cat.category}</td>
                      </tr>
                    ))}
                    {MASTER_MATRIX.flatMap((cat) =>
                      cat.rows.map((row) => (
                        <tr key={row.title} className={styles.matrixRow}>
                          <td className={styles.featureNameCell}>
                            <div className={styles.featureTitle}>{row.title}</div>
                            <p className={styles.featureSubtext}>{row.subtext}</p>
                          </td>
                          <td className={styles.matrixValueHighlight}>{row.willDrafting}</td>
                          <td className={styles.matrixValueCompetitor}>{row.lawFirm}</td>
                          <td className={styles.matrixValueCompetitor}>{row.bankTrustee}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Statutory Legal Foundation */}
        <section className={styles.foundationSection}>
          <div className="container">
            <div className={styles.foundationHeader}>
              <span className={styles.matrixEyebrow}>Legal Grounding</span>
              <h2 className={styles.matrixTitle}>
                Statutory Enforceability Under Indian Jurisprudence
              </h2>
              <p className={styles.matrixSubtitle}>
                Indian law has well-defined statutory requirements for testamentary validity. Our drafting engine adheres strictly to these principles.
              </p>
            </div>

            <div className={styles.foundationGrid}>
              <div className={styles.foundationItem}>
                <div className={styles.statuteCitation}>Indian Succession Act, 1925</div>
                <h3 className={styles.foundationTitle}>Section 63 Attestation Mandate</h3>
                <p className={styles.foundationDesc}>
                  Under Section 63(c), a Will must be executed by the testator in the physical presence of at least two independent attesting witnesses.
                  Our execution blueprint specifies witness eligibility to prevent probate contestation.
                </p>
              </div>

              <div className={styles.foundationItem}>
                <div className={styles.statuteCitation}>Indian Stamp Act, 1899</div>
                <h3 className={styles.foundationTitle}>Exempt from Stamp Duty</h3>
                <p className={styles.foundationDesc}>
                  Under Schedule I of the Indian Stamp Act, 1899, testamentary wills are completely exempt from stamp duty across all Indian states.
                  A Will printed on plain white A4 paper is 100% admissible in any court of law.
                </p>
              </div>

              <div className={styles.foundationItem}>
                <div className={styles.statuteCitation}>Registration Act, 1908</div>
                <h3 className={styles.foundationTitle}>Section 18 Optional Registration</h3>
                <p className={styles.foundationDesc}>
                  Section 18(e) classifies Will registration as entirely optional. In landmark decisions such as <em>Ishwardeo Narain Singh v. Smt. Kamta Devi</em>,
                  the Supreme Court of India reaffirmed that an unregistered Will holds equal legal standing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial FAQ Section */}
        <section className={styles.faqSection}>
          <div className="container">
            <div className={styles.faqHeader}>
              <span className={styles.matrixEyebrow}>Common Questions</span>
              <h2 className={styles.matrixTitle}>
                Frequently Asked Questions About Will Pricing
              </h2>
              <p className={styles.matrixSubtitle}>
                Clear, straightforward answers about our flat-fee estate planning platform and Indian succession law.
              </p>
            </div>

            <div className={styles.faqList}>
              {FAQS.map((faq) => (
                <details key={faq.question} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{faq.question}</span>
                    <span className={styles.faqSummaryIcon}>+</span>
                  </summary>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Understated Bottom Action */}
        <section className={styles.bottomSection}>
          <div className="container">
            <div className={styles.bottomContent}>
              <h2 className={styles.bottomTitle}>
                Write Your Will Today for ₹1,499
              </h2>
              <p className={styles.bottomText}>
                No credit card required to start. Complete your confidential questionnaire and review your distribution summary before paying.
              </p>
              <div className={styles.bottomActions}>
                <Link href="/start" className={styles.ctaButton}>
                  <span>Start Questionnaire Free</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/login" className={styles.secondaryLink}>
                  Sign in to existing account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
