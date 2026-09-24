import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorksInteractive from "@/components/how-it-works/HowItWorksInteractive";
import styles from "./how-it-works.module.css";
import {
  Clock,
  ShieldCheck,
  Scale,
  Award,
  Cpu,
  FileSignature,
  Check,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | WillDrafting.in — 7-Step Court-Vetted Legal Process",
  description:
    "Discover how WillDrafting turns simple questions into an enforceable testamentary Will under the Indian Succession Act, 1925. 15 minutes, automated 7-point legal health check, Bar Council advocate review, and execution kit.",
  alternates: {
    canonical: "https://www.willdrafting.in/how-it-works",
  },
  openGraph: {
    title: "How It Works | WillDrafting.in — 7-Step Court-Vetted Legal Process",
    description:
      "Discover how WillDrafting turns simple questions into an enforceable testamentary Will under the Indian Succession Act, 1925. 15 minutes, automated 7-point legal health check, Bar Council advocate review, and execution kit.",
    url: "https://www.willdrafting.in/how-it-works",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | WillDrafting.in — 7-Step Court-Vetted Legal Process",
    description:
      "Discover how WillDrafting turns simple questions into an enforceable testamentary Will under the Indian Succession Act, 1925. 15 minutes, automated 7-point legal health check, Bar Council advocate review, and execution kit.",
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
      "@type": "HowTo",
      "@id": "https://www.willdrafting.in/how-it-works#howto",
      "name": "How to Create a Legally Binding Will in India Online",
      "description":
        "A guided, step-by-step statutory process for compiling an enforceable testamentary Will under the Indian Succession Act, 1925.",
      "totalTime": "PT15M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": "1499",
      },
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Tell Us About Yourself & Jurisdiction",
          "text": "Provide legal name, residential address, and confirm personal succession law governing your estate.",
          "url": "https://www.willdrafting.in/how-it-works#step-1",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Map Immediate Family & Heirs",
          "text": "Catalog spouse, children, parents, and dependents to classify legal heirs and trigger minor child guardianship protections.",
          "url": "https://www.willdrafting.in/how-it-works#step-2",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Catalog Real Estate & Financial Holdings",
          "text": "List real estate, bank deposits, mutual funds, Demat shares, jewelry, and vehicles with exact legal identifiers.",
          "url": "https://www.willdrafting.in/how-it-works#step-3",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Allocate Assets & Appoint Executors",
          "text": "Assign percentage or specific bequests, appoint primary and alternate executors, and mandate residuary clauses.",
          "url": "https://www.willdrafting.in/how-it-works#step-4",
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Automated 7-Point Legal Health Check",
          "text": "The statutory rules engine audits for Section 67 witness disqualifications, 100% allocation balances, and ISA 1925 compliance.",
          "url": "https://www.willdrafting.in/how-it-works#step-5",
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": "Bar Council Advocate Review",
          "text": "An independent practicing estate advocate inspects the draft for formal sufficiency, clarity, and dispute-proofing.",
          "url": "https://www.willdrafting.in/how-it-works#step-6",
        },
        {
          "@type": "HowToStep",
          "position": 7,
          "name": "Two-Witness Attestation & Digital Vault",
          "text": "Print on plain A4 paper, sign in the physical presence of 2 independent witnesses, and store in an AES-256 digital vault.",
          "url": "https://www.willdrafting.in/how-it-works#step-7",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/how-it-works#breadcrumb",
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
          "name": "How It Works",
          "item": "https://www.willdrafting.in/how-it-works",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/how-it-works#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is an online Will legally valid and enforceable in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Under Section 63 of the Indian Succession Act, 1925, Indian law does not mandate that a Will be drawn up by an offline law firm or on judicial stamp paper. Once our platform generates your court-vetted testamentary document, you print it on standard plain paper and sign it in the physical presence of two independent attesting witnesses. This satisfies all statutory requirements for 100% legal validity across all Indian High Courts.",
          },
        },
        {
          "@type": "Question",
          "name": "Does an Indian Will require non-judicial stamp paper or court notary?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Under the Indian Stamp Act, 1899 and the Indian Succession Act, 1925, Wills are entirely exempt from stamp duty anywhere in India. Printing on non-judicial stamp paper or getting a notary stamp does NOT increase validity. What the law strictly mandates is valid attestation by two competent witnesses who physically observe the testator signing.",
          },
        },
        {
          "@type": "Question",
          "name": "Can an Executor or Beneficiary act as an attesting witness?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A beneficiary must NEVER sign as a witness. Under Section 67 of the Indian Succession Act, 1925, any bequest or legacy given to an attesting witness (or the spouse of a witness) is rendered completely void. While an executor who receives no beneficial interest can legally witness a Will in limited circumstances, WillDrafting's health check strictly recommends appointing two entirely independent witnesses (such as trusted friends, family doctors, or neighbors) to eliminate any conflict of interest.",
          },
        },
        {
          "@type": "Question",
          "name": "What happens if I acquire new property or assets after drafting my Will?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WillDrafting protects you in two ways: First, every draft automatically includes an airtight 'Residuary Estate' clause that directs all future acquired or omitted assets to your chosen primary beneficiary, preventing any property from falling into intestacy. Second, your flat ₹1,499 license includes unlimited lifetime revisions in your secure digital vault. Whenever you buy real estate, open new bank accounts, or alter allocations, simply update your answers and generate a refreshed document at no additional cost.",
          },
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Pricing & Transparency",
    willDrafting: "₹1,499 flat one-time (Zero subscriptions)",
    lawyer: "₹25,000 – ₹50,000+ hourly retainers",
    diy: "Free or ₹499 (often hidden renewals)",
  },
  {
    feature: "Completion Time",
    willDrafting: "15 minutes self-guided questionnaire",
    lawyer: "2–4 weeks (multiple office visits)",
    diy: "30 minutes (unassisted, confusing)",
  },
  {
    feature: "Statutory Health Check",
    willDrafting: "Automated 7-point rules engine (ISA 1925)",
    lawyer: "Manual review (subject to human oversight)",
    diy: "None (zero validation)",
  },
  {
    feature: "Advocate Verification",
    willDrafting: "Included (Practicing Bar Council advocates)",
    lawyer: "Included (Drafting advocate)",
    diy: "None (Zero legal accountability)",
  },
  {
    feature: "Section 67 Conflict Guard",
    willDrafting: "Automated witness disqualification check",
    lawyer: "Depends on lawyer diligence",
    diy: "None (frequent fatal errors)",
  },
  {
    feature: "Minor Child Guardianship",
    willDrafting: "Included (Guardians & Wards Act, 1890)",
    lawyer: "Billed as complex add-on clause",
    diy: "Rarely included or legally flawed",
  },
  {
    feature: "Future Amendments & Revisions",
    willDrafting: "Free lifetime revisions via digital vault",
    lawyer: "₹10,000 – ₹20,000 per amendment",
    diy: "Must purchase new template each time",
  },
  {
    feature: "Execution Kit & Instructions",
    willDrafting: "Step-by-step 2-witness guide + Doctor form",
    lawyer: "Vocal explanation or brief cover letter",
    diy: "Generic or missing attestation format",
  },
  {
    feature: "Digital Vault Storage",
    willDrafting: "AES-256 encrypted lifetime secure vault",
    lawyer: "Law firm physical file / personal email",
    diy: "Local unencrypted Word document",
  },
];

const FAQS_DATA = [
  {
    q: "Is an online Will legally valid and enforceable in India?",
    a: "Yes. Under Section 63 of the Indian Succession Act, 1925, Indian law does not require a Will to be prepared by an offline law firm or printed on judicial stamp paper. Once our platform generates your court-vetted testamentary document, you print it on standard plain paper and sign it in the physical presence of two independent attesting witnesses. This satisfies every statutory requirement for 100% legal validity across all Indian courts.",
  },
  {
    q: "Do I need non-judicial stamp paper or court notary registration?",
    a: "No. Under the Indian Stamp Act, 1899 and the Indian Succession Act, 1925, Wills are entirely exempt from stamp duty anywhere in India. Printing on stamp paper or getting a notary stamp does NOT enhance legal validity. The statutory core of a valid Will is the physical attestation by two competent witnesses who watch you sign and sign in each other's presence.",
  },
  {
    q: "Can a beneficiary or executor act as an attesting witness?",
    a: "A beneficiary must NEVER sign as a witness. Under Section 67 of the Indian Succession Act, 1925, any bequest or legacy given to an attesting witness (or their spouse) is rendered completely void in law! While an executor with no beneficial interest may witness in limited scenarios, our automated health check strictly mandates appointing two independent witnesses (such as trusted friends or neighbors) to eliminate any conflict of interest.",
  },
  {
    q: "What is the difference between a Nominee and a Beneficiary in a Will?",
    a: "A nominee is merely a temporary custodian appointed to receive funds from a bank or society upon death; they do NOT own the asset. The Supreme Court of India has settled that a nominee holds the asset as a trustee for the legal heirs. A Will is the only legal instrument that conveys absolute, permanent ownership and overrides bank nominations.",
  },
  {
    q: "What happens if I acquire new property or mutual funds after making my Will?",
    a: "Every Will drafted on our platform includes an airtight 'Residuary Estate' clause that automatically covers any future acquired assets, preventing them from falling into intestate succession. Furthermore, your flat ₹1,499 license includes unlimited lifetime revisions in your secure digital vault. When your assets or family situation change, simply log in and generate an updated Will at no extra fee.",
  },
  {
    q: "How does the Bar Council advocate verification work?",
    a: "Once our legal technology engine compiles your structured answers and passes the 7-point statutory health check, your draft is reviewed by verified, practicing estate advocates. The reviewing advocate inspects the document for formal sufficiency, clarity of bequests, absence of internal conflicts, and strict compliance with the Indian Succession Act, 1925 before final issuance.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <Navbar />

      <main>
        {/* Breadcrumb Navigation Bar */}
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
                  How It Works
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroContent}>
              <span className={styles.heroEyebrow}>
                Statutory Testamentary Architecture
              </span>
              <h1 className={styles.heroTitle}>
                How WillDrafting Works: From Simple Questions to a Court-Ready Will
              </h1>
              <p className={styles.heroSubtitle}>
                You don&apos;t need legal knowledge or expensive advocate retainers. Answer plain-English questions about your family and assets. Our statutory engine compiles your wishes into court-vetted clauses, verified by practicing advocates under the Indian Succession Act, 1925.
              </p>

              {/* Trust & Metric Highlights */}
              <div className={styles.heroStatsRow}>
                <div className={styles.heroStatItem}>
                  <Clock size={16} className={styles.heroStatIcon} />
                  <span>15 Mins Guided Process</span>
                </div>
                <div className={styles.heroStatItem}>
                  <Scale size={16} className={styles.heroStatIcon} />
                  <span>ISA 1925 Section 63 Compliant</span>
                </div>
                <div className={styles.heroStatItem}>
                  <Award size={16} className={styles.heroStatIcon} />
                  <span>Bar Council Advocate Review</span>
                </div>
                <div className={styles.heroStatItem}>
                  <ShieldCheck size={16} className={styles.heroStatIcon} />
                  <span>₹1,499 Flat One-Time (No Subscriptions)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: The Interactive 7-Step Workflow */}
        <section className={styles.workflowSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>The 7-Step Statutory Journey</span>
              <h2 className={styles.sectionTitle}>
                How Your Everyday Wishes Become an Enforceable Will
              </h2>
              <p className={styles.sectionSubtitle}>
                Click through each step below to inspect the plain-English questions asked, the legal logic applied behind the scenes, sample statutory clauses generated, and fatal court pitfalls prevented.
              </p>
            </div>

            <HowItWorksInteractive />
          </div>
        </section>

        {/* Section 2: The 3-Pillar Architectural Foundation */}
        <section className={styles.pillarsSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Architectural Integrity</span>
              <h2 className={styles.sectionTitle}>
                Built on Three Uncompromising Pillars
              </h2>
              <p className={styles.sectionSubtitle}>
                Why WillDrafting delivers unmatched reliability compared to generic downloadable internet templates and slow offline law practices.
              </p>
            </div>

            <div className={styles.pillarsGrid}>
              {/* Pillar 1: Technology Engine */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconWrap}>
                  <Cpu size={26} />
                </div>
                <span className={styles.pillarNumber}>Pillar 01 · Technology</span>
                <h3 className={styles.pillarTitle}>Deterministic Legal Rules Engine</h3>
                <p className={styles.pillarDesc}>
                  We do not use unconstrained AI chatbots that hallucinate legal terms. Our system uses a rigorous, deterministic decision tree that verifies 7 statutory checkpoints and selects verified clauses drafted by senior succession advocates.
                </p>
                <ul className={styles.pillarFeatures}>
                  <li className={styles.pillarFeatureItem}>
                    <Check size={15} className={styles.pillarCheck} />
                    100% allocation mathematical validation
                  </li>
                  <li className={styles.pillarFeatureItem}>
                    <Check size={15} className={styles.pillarCheck} />
                    Automatic Section 67 witness conflict detection
                  </li>
                  <li className={styles.pillarFeatureItem}>
                    <Check size={15} className={styles.pillarCheck} />
                    Mandatory residuary estate protection
                  </li>
                </ul>
              </div>

              {/* Pillar 2: Advocate Verification */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconWrap}>
                  <Scale size={26} />
                </div>
                <span className={styles.pillarNumber}>Pillar 02 · Human Legal Expertise</span>
                <h3 className={styles.pillarTitle}>Bar Council Advocate Review</h3>
                <p className={styles.pillarDesc}>
                  Every assembled Will is reviewed by practicing advocates enrolled with the Bar Council. Advocates inspect the document for formal sufficiency, unambiguous asset descriptions, and strict consistency with Indian succession jurisprudence.
                </p>
                <ul className={styles.pillarFeatures}>
                  <li className={styles.pillarFeatureItem}>
                    <Check size={15} className={styles.pillarCheck} />
                    Verification of absolute vs life interest clauses
                  </li>
                  <li className={styles.pillarFeatureItem}>
                    <Check size={15} className={styles.pillarCheck} />
                    Clear articulation of unequal bequests
                  </li>
                  <li className={styles.pillarFeatureItem}>
                    <Check size={15} className={styles.pillarCheck} />
                    Quality assurance before final PDF issuance
                  </li>
                </ul>
              </div>

              {/* Pillar 3: Execution Protocol */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconWrap}>
                  <FileSignature size={26} />
                </div>
                <span className={styles.pillarNumber}>Pillar 03 · Statutory Execution</span>
                <h3 className={styles.pillarTitle}>Two-Witness Attestation & Vault</h3>
                <p className={styles.pillarDesc}>
                  A Will is only as valid as its signing ceremony. We equip you with a court-vetted execution kit following Section 63 of the ISA 1925, an optional Doctor&apos;s Sound Mind Certificate, and encrypted digital vault storage for lifetime revisions.
                </p>
                <ul className={styles.pillarFeatures}>
                  <li className={styles.pillarFeatureItem}>
                    <Check size={15} className={styles.pillarCheck} />
                    Plain paper legal validity (No stamp paper needed)
                  </li>
                  <li className={styles.pillarFeatureItem}>
                    <Check size={15} className={styles.pillarCheck} />
                    Registered Medical Practitioner certificate form
                  </li>
                  <li className={styles.pillarFeatureItem}>
                    <Check size={15} className={styles.pillarCheck} />
                    AES-256 encrypted vault with free lifetime updates
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Execution Protocol Deep-Dive */}
        <section className={styles.executionSection}>
          <div className="container">
            <div className={styles.executionCard}>
              <div className={styles.executionHeader}>
                <span className={styles.executionEyebrow}>Statutory Execution Protocol</span>
                <h2 className={styles.executionTitle}>
                  How to Make Your Will 100% Legally Binding in India
                </h2>
                <p className={styles.executionSubtitle}>
                  Section 63 of the Indian Succession Act, 1925 establishes exact statutory rules for attestation. Follow these three steps to guarantee court enforceability:
                </p>
              </div>

              <div className={styles.executionStepsGrid}>
                {/* Step 1 */}
                <div className={styles.executionStepItem}>
                  <span className={styles.executionStepNumber}>01</span>
                  <h3 className={styles.executionStepHeading}>Print on Standard Plain Paper</h3>
                  <p className={styles.executionStepText}>
                    Download your court-ready PDF and print on ordinary white A4 paper. Under the Indian Stamp Act, 1899, Wills are completely exempt from stamp duty. Non-judicial stamp paper is NOT legally required.
                  </p>
                </div>

                {/* Step 2 */}
                <div className={styles.executionStepItem}>
                  <span className={styles.executionStepNumber}>02</span>
                  <h3 className={styles.executionStepHeading}>Sign in Dual-Witness Presence</h3>
                  <p className={styles.executionStepText}>
                    Sign at the bottom of every page and sign the final attestation clause in the simultaneous physical presence of two independent witnesses (neither of whom can be a beneficiary or their spouse).
                  </p>
                </div>

                {/* Step 3 */}
                <div className={styles.executionStepItem}>
                  <span className={styles.executionStepNumber}>03</span>
                  <h3 className={styles.executionStepHeading}>Witness Attestation Ceremony</h3>
                  <p className={styles.executionStepText}>
                    Both witnesses subscribe their full names, residential addresses, and signatures in the physical presence of the testator and each other, conclusively fulfilling Section 63 requirements.
                  </p>
                </div>
              </div>

              {/* Callout Notice */}
              <div className={styles.executionCallout}>
                <AlertCircle size={22} className={styles.calloutIcon} />
                <p className={styles.calloutText}>
                  <strong>Is Registration at the Sub-Registrar Mandatory in India?</strong> No. Under Section 18 of the Registration Act, 1908, the registration of a Will is entirely optional. An unregistered Will executed in compliance with Section 63 carries identical legal force as a registered Will.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Systematic Comparison Matrix */}
        <section className={styles.comparisonSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Clear Comparative Analysis</span>
              <h2 className={styles.sectionTitle}>
                How WillDrafting Compares to Other Options
              </h2>
              <p className={styles.sectionSubtitle}>
                See why thousands of Indian families choose WillDrafting over risky free templates or expensive, delayed law-firm retainers.
              </p>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th className={styles.colFeature}>Feature & Legal Safeguard</th>
                    <th className={styles.colWillDrafting}>WillDrafting.in (₹1,499)</th>
                    <th className={styles.colLawyer}>Traditional Law Firm</th>
                    <th className={styles.colDIY}>Generic Word Template</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? styles.tableRowHighlight : ""}>
                      <td style={{ fontWeight: 600, color: "#1B2A4A" }}>{row.feature}</td>
                      <td className={styles.tableCellWillDrafting}>{row.willDrafting}</td>
                      <td>{row.lawyer}</td>
                      <td>{row.diy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: FAQs on the Drafting Process */}
        <section className={styles.faqSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Common Questions</span>
              <h2 className={styles.sectionTitle}>
                Frequently Asked Questions About the Process
              </h2>
              <p className={styles.sectionSubtitle}>
                Everything you need to know about the legal validity, execution requirements, and drafting process.
              </p>
            </div>

            <div className={styles.faqGrid}>
              {FAQS_DATA.map((faq, idx) => (
                <div key={idx} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.q}</h3>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: High-Conversion CTA Banner */}
        <section className={styles.ctaBannerSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Protect Your Family&apos;s Future in the Next 15 Minutes
              </h2>
              <p className={styles.ctaSubtitle}>
                No advocate retainers. No complex legal paperwork. Answer guided questions, receive court-vetted testamentary clauses, and secure your life&apos;s hard-earned assets for a flat ₹1,499 one-time fee.
              </p>

              <div className={styles.ctaActions}>
                <Link href="/start" className={styles.primaryCta}>
                  <span>Start My Will Now (₹1,499)</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/pricing" className={styles.secondaryCta}>
                  View Transparent Pricing
                </Link>
              </div>

              <div className={styles.ctaGuarantee}>
                <span className={styles.guaranteeItem}>
                  <Check size={14} color="#C9A227" /> Free Unlimited Lifetime Revisions
                </span>
                <span className={styles.guaranteeItem}>
                  <Check size={14} color="#C9A227" /> Indian Succession Act 1925 Compliant
                </span>
                <span className={styles.guaranteeItem}>
                  <Check size={14} color="#C9A227" /> Bar Council Advocate Review
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
