"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  FileCode2,
  HelpCircle,
  Lock,
  ShieldCheck,
} from "lucide-react";
import styles from "./HowItWorksInteractive.module.css";

interface StepData {
  id: string;
  stepNumber: string;
  shortTitle: string;
  fullTitle: string;
  category: string;
  timeEstimate: string;
  statutoryBasis: string;
  summary: string;
  questionsAsked: string[];
  systemLogic: string[];
  sampleClauseTitle: string;
  sampleClause: string;
  pitfallPrevented: {
    title: string;
    description: string;
  };
}

const STEPS_DATA: StepData[] = [
  {
    id: "step-1",
    stepNumber: "01",
    shortTitle: "Personal Details",
    fullTitle: "Tell Us About Yourself & Your Legal Jurisdiction",
    category: "Step 1 of 7 · Foundation",
    timeEstimate: "2–3 mins",
    statutoryBasis: "Section 59, Indian Succession Act, 1925",
    summary:
      "We begin by establishing your full legal identity, sound testamentary capacity, and applicable personal succession law. Every prior testamentary instrument is formally revoked.",
    questionsAsked: [
      "What is your full legal name as per government records (Aadhaar / PAN)?",
      "What is your residential address, age (18+), and marital status?",
      "Which personal succession law governs your estate (Hindu, Muslim, Christian, Parsi, or Special Marriage Act)?",
      "Do you hold any prior Will, Codicil, or testamentary disposition that needs revocation?",
    ],
    systemLogic: [
      "Establishes statutory testamentary capacity (sound mind and free will) pursuant to Section 59 of the ISA 1925.",
      "Identifies whether Hindu Succession Act, 1956 or Indian Succession Act, 1925 dictates heirship rules.",
      "Automatically injects an absolute revocation clause to invalidate superseded previous drafts or conflicting codicils.",
    ],
    sampleClauseTitle: "Revocation & Declaration of Capacity Clause",
    sampleClause:
      "\"I, [Full Name], residing at [Address], aged [Age] years, holding PAN [PAN Number], being of sound disposing mind, memory, and understanding, and free from any coercion or undue influence, hereby declare this to be my Last Will and Testament, revoking all prior Wills, Codicils, and testamentary writings made by me.\"",
    pitfallPrevented: {
      title: "Conflicting Multiple Wills",
      description:
        "Without an explicit legal revocation clause, old forgotten drafts or informal notes can lead to prolonged court probate litigation between competing beneficiaries.",
    },
  },
  {
    id: "step-2",
    stepNumber: "02",
    shortTitle: "Family & Heirs",
    fullTitle: "Map Your Immediate Family & Legal Heirs",
    category: "Step 2 of 7 · Heirs & Dependents",
    timeEstimate: "3–4 mins",
    statutoryBasis: "Class I & Class II Heirs Framework",
    summary:
      "You catalog your spouse, children, parents, and dependents. The engine identifies minor children to automatically trigger statutory guardianship safeguards.",
    questionsAsked: [
      "Are you currently married? What is your spouse's full legal name?",
      "Do you have children? Are any of them currently minors (under 18 years of age)?",
      "Do you have surviving parents, siblings, or financially dependent relatives?",
      "Are there any specific family members you wish to include or exclude from inheritance?",
    ],
    systemLogic: [
      "Maps family hierarchy to detect legal Class I statutory heirs under Indian personal laws.",
      "Flags minor children under 18 to mandate testamentary guardian appointment under the Guardians & Wards Act, 1890.",
      "Prevents ambiguous references like 'my son' by requiring full names, DOB, and relationship mapping.",
    ],
    sampleClauseTitle: "Family Declaration Clause",
    sampleClause:
      "\"My immediate family comprises my spouse, [Spouse Name], and my children, namely [Child 1 Name], born on [DOB], and [Child 2 Name], born on [DOB]. In the event any of my children are minors at the time of my demise, the special guardianship clauses herein shall take immediate operational effect.\"",
    pitfallPrevented: {
      title: "Unrepresented Minor Children",
      description:
        "If both parents pass away without a testamentary guardian appointed in a Will, minor children become subject to traumatic, months-long court guardianship proceedings.",
    },
  },
  {
    id: "step-3",
    stepNumber: "03",
    shortTitle: "Asset Inventory",
    fullTitle: "Catalog What You've Built (Real Estate & Financial Holdings)",
    category: "Step 3 of 7 · Asset Inventory",
    timeEstimate: "4–5 mins",
    statutoryBasis: "Movable & Immovable Property Schedules",
    summary:
      "List your apartments, plots, bank deposits, mutual funds, Demat portfolios, vehicles, and jewelry. We help you resolve the dangerous 'Nomination vs Will' conflict.",
    questionsAsked: [
      "Do you own real estate (apartments, residential plots, ancestral land, commercial units)?",
      "Where are your primary bank accounts, Fixed Deposits, and mutual fund folios located?",
      "Do you have Demat accounts, listed equities, or Provident Funds (EPF/PPF)?",
      "Do you own gold/diamond jewelry, motor vehicles, or digital assets (crypto, domain names)?",
    ],
    systemLogic: [
      "Structures property with exact legal identifiers: Survey No., Khasra/Khata No., Flat No., Society Name, City & State.",
      "Captures Bank IFSC codes, Account Numbers, and Depository Participant (DP) IDs for seamless executor tracing.",
      "Embeds statutory clarification that testamentary distribution supersedes banking and society nominations.",
    ],
    sampleClauseTitle: "Asset Schedule & Nomination Override Clause",
    sampleClause:
      "\"I declare that any bank or housing society nominee appointed in respect of my accounts or property is a mere custodian in law, and absolute testamentary ownership of the asset listed in Schedule A shall vest solely in my designated beneficiary named herein.\"",
    pitfallPrevented: {
      title: "The Dangerous 'Nominee Myth'",
      description:
        "The Supreme Court has consistently held that a nominee is merely a temporary trustee, NOT the owner. Without a Will, the nominee cannot retain the asset if legal heirs dispute it.",
    },
  },
  {
    id: "step-4",
    stepNumber: "04",
    shortTitle: "Allocations & Wishes",
    fullTitle: "Express Your Wishes, Appoint Executors & Guardians",
    category: "Step 4 of 7 · Testamentary Directives",
    timeEstimate: "3–4 mins",
    statutoryBasis: "Section 222 & Residuary Bequests",
    summary:
      "Allocate specific items or percentage splits across heirs. Appoint a trusted Executor to administer your estate, and establish a mandatory Residuary Clause.",
    questionsAsked: [
      "How do you want your assets distributed (percentage splits or specific item bequests)?",
      "Whom do you appoint as your Primary Executor to manage probate and carry out your wishes?",
      "Who should serve as an Alternate Executor if your primary executor is unable or unwilling?",
      "If you have minor children, who will be their legally appointed Testamentary Guardian?",
      "Who should inherit your 'Residuary Estate' (all future acquired or unlisted assets)?",
    ],
    systemLogic: [
      "Runs strict 100% mathematical allocation verification across all beneficiary shares.",
      "Appoints Executor under Section 222 of ISA 1925 with comprehensive administrative powers.",
      "Inserts a mandatory Residuary Clause to ensure zero intestate gaps for future wealth.",
    ],
    sampleClauseTitle: "Residuary Estate & Survivorship Clause",
    sampleClause:
      "\"All the rest, residue, and remainder of my estate, both movable and immovable, of whatsoever nature and wheresoever situated, including any assets acquired after the execution of this Will, I give, devise, and bequeath entirely to [Residuary Beneficiary], with survivorship substitution to [Alternate Beneficiary].\"",
    pitfallPrevented: {
      title: "Intestacy on Future Wealth",
      description:
        "If you buy a new flat or open a mutual fund after making a Will without a Residuary Clause, that asset devolves under chaotic intestacy laws instead of your Will.",
    },
  },
  {
    id: "step-5",
    stepNumber: "05",
    shortTitle: "Health Check Engine",
    fullTitle: "Automated 7-Point Legal Health Check & Document Assembly",
    category: "Step 5 of 7 · Legal Technology",
    timeEstimate: "Instant (1 sec)",
    statutoryBasis: "7-Point Statutory Compliance Engine",
    summary:
      "Our proprietary rule engine analyzes your inputs against 7 critical legal checkpoints to detect fatal errors before generating a court-grade draft.",
    questionsAsked: [
      "Are all percentage splits mathematically balanced to exactly 100%?",
      "Is at least one adult, legally competent Executor appointed?",
      "Is an alternate executor or guardian designated for unexpected contingencies?",
      "Are any intended witnesses disqualified under Section 67 due to being beneficiaries?",
      "Are all immovable properties identified with conclusive boundary and registration details?",
    ],
    systemLogic: [
      "Evaluates complete state tree against Indian Succession Act, 1925 rules.",
      "Flags high-risk issues: Section 67 witness disqualification, missing residuary clause, unallocated shares.",
      "Dynamically compiles court-vetted testamentary clauses into structured formal paragraphs.",
    ],
    sampleClauseTitle: "Automated Statutory Health Verification",
    sampleClause:
      "\"[STATUS: ALL 7 STATUTORY CHECKS PASSED]\n1. 100% Allocation Balance: VERIFIED\n2. Primary & Alternate Executor: VERIFIED\n3. Minor Guardian Appointment: VERIFIED\n4. Section 67 Conflict Safeguard: VERIFIED\n5. Residuary Clause Completeness: VERIFIED\n6. Testamentary Capacity Declaration: VERIFIED\n7. Immovable Property Specification: VERIFIED\"",
    pitfallPrevented: {
      title: "Section 67 Disqualification Trap",
      description:
        "Under Section 67 of the ISA 1925, any bequest made to a person who signs as an attesting witness is completely void! Our engine prevents this fatal error automatically.",
    },
  },
  {
    id: "step-6",
    stepNumber: "06",
    shortTitle: "Advocate Review",
    fullTitle: "Independent Bar Council Advocate Review & Quality Control",
    category: "Step 6 of 7 · Legal Verification",
    timeEstimate: "24–48 hours",
    statutoryBasis: "Bar Council of India Standards",
    summary:
      "Seasoned estate advocates review your assembled draft for formal sufficiency, clarity of intent, and dispute-proofing before final issuance.",
    questionsAsked: [
      "Does the draft contain any ambiguous wording that could cause family friction?",
      "Are life-interest and absolute-interest clauses properly distinguished?",
      "Is the reason for any unequal distribution or disinheritance adequately articulated?",
      "Are local municipal and succession practices appropriately harmonized?",
    ],
    systemLogic: [
      "Draft routed to verified, practicing advocates experienced in estate planning and probate litigation.",
      "Advocate verifies clarity of title descriptions, specific bequests, and contingency provisions.",
      "Direct clarification workflow allows minor corrections before final document lock.",
    ],
    sampleClauseTitle: "Advocate Verification & Sufficiency Certification",
    sampleClause:
      "\"The structured testamentary clauses in this Will have been reviewed for legal sufficiency and compliance with the formalities prescribed under the Indian Succession Act, 1925. The provisions effectively express testamentary intent and eliminate ambiguities regarding succession.\"",
    pitfallPrevented: {
      title: "Ambiguous 'Life Interest' Clauses",
      description:
        "Vague wording like 'she can enjoy the house' often leads to massive court battles over whether the spouse gets full ownership or just a temporary right to live there.",
    },
  },
  {
    id: "step-7",
    stepNumber: "07",
    shortTitle: "Execution & Vault",
    fullTitle: "Two-Witness Attestation Kit & Encrypted Will Vault",
    category: "Step 7 of 7 · Legal Validity",
    timeEstimate: "Instant PDF + 15 min signing",
    statutoryBasis: "Section 63, Indian Succession Act, 1925",
    summary:
      "Download your court-ready PDF. Follow our strict 2-witness signing guide, attach the Doctor's Fitness Certificate, and access your encrypted digital vault for lifetime revisions.",
    questionsAsked: [
      "Do you know the exact rules for signing in the presence of two independent witnesses?",
      "Did you know that in India, a Will does NOT require stamp paper or compulsory registration to be 100% legal?",
      "How do you safely store your original physical Will and notify your appointed executor?",
    ],
    systemLogic: [
      "Generates court-formatted PDF with clean typography, page numbering ('Page X of Y'), and signature spaces on every page.",
      "Produces Step-by-Step Signing Guide with exact statutory attestation wording for 2 competent witnesses.",
      "Provides optional Registered Medical Practitioner (MBBS) Sound Mind Certificate template.",
      "Stores digital record in AES-256 encrypted Will Vault with free lifetime updates whenever your assets change.",
    ],
    sampleClauseTitle: "Statutory Attestation Clause (Section 63)",
    sampleClause:
      "\"Signed by the above-named Testator in our presence, all being present at the same time, and we, at their request, in their presence, and in the presence of each other, have hereunto subscribed our names as attesting witnesses pursuant to Section 63 of the Indian Succession Act, 1925.\"",
    pitfallPrevented: {
      title: "Defective Attestation Dismissal",
      description:
        "The #1 reason Wills are invalidated in Indian courts is defective witnessing (witnesses signing at different times or in separate rooms). Our checklist guarantees 100% procedural compliance.",
    },
  },
];

export default function HowItWorksInteractive() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEPS_DATA[activeStepIndex];

  return (
    <div className={styles.interactiveContainer}>
      {/* Step Navigation Pill Bar */}
      <div className={styles.stepNavigation}>
        <div className={styles.stepNavScroll}>
          {STEPS_DATA.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            const isCompleted = activeStepIndex > idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`${styles.stepNavButton} ${isSelected ? styles.stepNavButtonActive : ""}`}
                aria-selected={isSelected}
                role="tab"
              >
                <span className={styles.stepNavNumber}>
                  {isCompleted ? "✓" : step.stepNumber}
                </span>
                <span className={styles.stepNavTitle}>{step.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className={styles.stageGrid}>
        {/* Left Column: Questionnaire & System Flow */}
        <div className={styles.stageMain}>
          <div className={styles.stageCard}>
            {/* Stage Header */}
            <div className={styles.stageHeader}>
              <div className={styles.stageBadgeRow}>
                <span className={styles.stageCategoryBadge}>{activeStep.category}</span>
                <span className={styles.stageTimeBadge}>
                  <Clock size={12} /> {activeStep.timeEstimate}
                </span>
                <span className={styles.stageStatuteBadge}>
                  <Scale size={12} /> {activeStep.statutoryBasis}
                </span>
              </div>
              <h3 className={styles.stageTitle}>
                {activeStep.stepNumber}. {activeStep.fullTitle}
              </h3>
              <p className={styles.stageSummary}>{activeStep.summary}</p>
            </div>

            {/* Questions Asked Section */}
            <div className={styles.sectionBlock}>
              <h4 className={styles.sectionBlockTitle}>
                <HelpCircle size={16} className={styles.sectionIcon} />
                Simple, Plain-English Questions You Answer:
              </h4>
              <ul className={styles.questionsList}>
                {activeStep.questionsAsked.map((question, qIdx) => (
                  <li key={qIdx} className={styles.questionItem}>
                    <span className={styles.questionBullet}>Q{qIdx + 1}</span>
                    <span className={styles.questionText}>{question}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Behind The Scenes Engine Logic */}
            <div className={styles.sectionBlock}>
              <h4 className={styles.sectionBlockTitle}>
                <Sparkles size={16} className={styles.sectionIconGold} />
                What the Legal Engine Does Behind the Scenes:
              </h4>
              <div className={styles.logicGrid}>
                {activeStep.systemLogic.map((logic, lIdx) => (
                  <div key={lIdx} className={styles.logicItem}>
                    <CheckCircle2 size={16} className={styles.logicCheckIcon} />
                    <span>{logic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Navigation Controls */}
            <div className={styles.stageNavControls}>
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className={styles.prevButton}
              >
                ← Previous Step
              </button>

              <div className={styles.stepProgressText}>
                Step {activeStepIndex + 1} of {STEPS_DATA.length}
              </div>

              {activeStepIndex < STEPS_DATA.length - 1 ? (
                <button
                  onClick={() => setActiveStepIndex((prev) => Math.min(STEPS_DATA.length - 1, prev + 1))}
                  className={styles.nextButton}
                >
                  Next: {STEPS_DATA[activeStepIndex + 1].shortTitle} →
                </button>
              ) : (
                <Link href="/start" className={styles.finishCtaButton}>
                  Start My Will (15 Mins) →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code/Clause Preview & Pitfall Avoidance */}
        <div className={styles.stageSidebar}>
          {/* Court-Grade Clause Preview Card */}
          <div className={styles.clauseCard}>
            <div className={styles.clauseHeader}>
              <div className={styles.clauseHeaderLeft}>
                <FileCode2 size={16} className={styles.clauseIcon} />
                <span className={styles.clauseTitle}>{activeStep.sampleClauseTitle}</span>
              </div>
              <span className={styles.clauseBadge}>Court-Vetted</span>
            </div>
            <pre className={styles.clauseBody}>
              <code>{activeStep.sampleClause}</code>
            </pre>
            <div className={styles.clauseFooter}>
              <ShieldCheck size={14} className={styles.shieldIcon} />
              <span>Compliant with Indian Succession Act, 1925</span>
            </div>
          </div>

          {/* Pitfall Prevented Card */}
          <div className={styles.pitfallCard}>
            <div className={styles.pitfallHeader}>
              <AlertTriangle size={18} className={styles.pitfallIcon} />
              <h5 className={styles.pitfallTitle}>Legal Pitfall Prevented:</h5>
            </div>
            <h6 className={styles.pitfallSubTitle}>{activeStep.pitfallPrevented.title}</h6>
            <p className={styles.pitfallDesc}>{activeStep.pitfallPrevented.description}</p>
          </div>

          {/* Quick Stats Box */}
          <div className={styles.trustBox}>
            <div className={styles.trustItem}>
              <Lock size={15} className={styles.trustIcon} />
              <div>
                <strong>256-Bit Vault Security</strong>
                <p>Private document repository with zero third-party disclosure.</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <Award size={15} className={styles.trustIcon} />
              <div>
                <strong>Bar Council Advocate Review</strong>
                <p>Every Will verified for statutory consistency and validity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
