"use client";

import React, { useState } from "react";
import Link from "next/link";

const clauses = [
  {
    id: "revocation",
    title: "1. Declaration of Sound Mind & Revocation",
    statute: "Section 59 & Section 62",
    summary: "Confirms full mental competency and revokes all prior wills, codicils, and oral dispositions.",
    legalText: `I, [TESTATOR FULL NAME], son/daughter of [FATHER/SPOUSE NAME], aged about [AGE] years, residing at [RESIDENTIAL ADDRESS], do hereby declare this to be my Last Will and Testament.

1. I am making this Will out of my own free volition and sound disposing state of mind, memory, and understanding, without any coercion, fraud, or undue influence.

2. I hereby revoke, cancel, and annul all former Wills, Codicils, and testamentary dispositions made by me at any time prior to this date, and declare this present document to be my sole operative Last Will.`,
  },
  {
    id: "executors",
    title: "2. Appointment of Executors & Administrators",
    statute: "Section 222",
    summary: "Appoints a primary executor and an alternate to administer the estate and represent you before institutions.",
    legalText: `3. I hereby nominate and appoint my [RELATIONSHIP], [PRIMARY EXECUTOR NAME], residing at [ADDRESS], to be the sole Executor of this my Last Will and Testament.

4. If the said Executor predeceases me, or is unable, incapacitated, or unwilling to act, I appoint [ALTERNATE EXECUTOR NAME] to act as the Alternate Executor with identical powers, authorities, and fiduciary discretions to collect, claim, and distribute my estate according to the terms set forth herein.`,
  },
  {
    id: "bequests",
    title: "3. Specific Asset Devolutions",
    statute: "Part VI, Chapters I-VII",
    summary: "Directs transfer of immovable properties, bank deposits, mutual funds, gold, and digital accounts.",
    legalText: `5. IMMOVABLE PROPERTY: My ownership share in residential property situated at [PROPERTY ADDRESS] shall devolve upon [BENEFICIARY 1 NAME] absolutely and forever, free from all encumbrances.

6. FINANCIAL INVESTMENTS: All funds held in Savings Bank Accounts, Fixed Deposits, Public Provident Fund (PPF), Mutual Fund folios, and Demat accounts listed in the Schedule of Assets shall be distributed to [BENEFICIARY 2 NAME] and [BENEFICIARY 3 NAME] in equal shares.

7. RESIDUARY ESTATE: All other assets, movable or immovable, belonging to me at the time of my demise and not specifically mentioned herein shall devolve upon [RESIDUARY HEIR].`,
  },
  {
    id: "guardians",
    title: "4. Guardianship for Minor Children",
    statute: "Guardians and Wards Act, 1890",
    summary: "Names the chosen guardian to care for minor children and protect their inherited property until adulthood.",
    legalText: `8. In the event that my spouse does not survive me, I hereby appoint [GUARDIAN NAME], residing at [GUARDIAN ADDRESS], to be the legal guardian of the person and property of my minor children, [CHILD 1 NAME] and [CHILD 2 NAME], until they attain the age of majority.

The guardian shall have full power to manage the assets bequeathed to my minor children strictly for their health, education, maintenance, and welfare.`,
  },
  {
    id: "attestation",
    title: "5. Execution & Two-Witness Attestation",
    statute: "Section 63(c)",
    summary: "Statutory attestation clause signed concurrently by the testator and two independent adult witnesses.",
    legalText: `IN WITNESS WHEREOF, I, the Testator above-named, have set my signature to this my Last Will and Testament on this [DAY] day of [MONTH, YEAR] at [CITY, STATE] in the presence of the attesting witnesses named below.

___________________________
Signature of Testator

ATTESTATION BY WITNESSES:
Signed by the Testator in our joint presence, and we, at their request, in their presence, and in the presence of each other, have subscribed our names as attesting witnesses hereto.

Witness 1: [FULL NAME, AGE, ADDRESS, SIGNATURE]
Witness 2: [FULL NAME, AGE, ADDRESS, SIGNATURE]`,
  },
];

export default function WillPreviewSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="clauses" className="section" style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="clause-header-wrap" style={{ maxWidth: "680px", margin: "0 auto 3rem auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(1.55rem, 4.5vw, 2.5rem)",
              color: "var(--color-navy)",
              marginBottom: "0.85rem",
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            Court-tested clauses, automatically customized.
          </h2>
          <p style={{ fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)", color: "var(--color-charcoal)", lineHeight: 1.65, margin: 0 }}>
            Every sentence in your WillDrafting document is structured in accordance with settled Indian succession
            jurisprudence to minimize probate objections.
          </p>
        </div>

        {/* Clause Explorer Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-editorial)",
          }}
          className="clause-split"
        >
          {/* Left Column: Clause Index */}
          <div
            className="clause-nav-col"
            style={{
              backgroundColor: "var(--bg-card-subtle)",
              padding: "1.75rem",
              borderRight: "1px solid var(--border-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.75rem" }}>
              Standard Sections in Your Will
            </div>

            {clauses.map((c, i) => {
              const isSelected = activeIdx === i;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.9rem 1rem",
                    borderRadius: "var(--radius-md)",
                    border: isSelected ? "1px solid var(--color-navy)" : "1px solid transparent",
                    backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                    boxShadow: isSelected ? "0 1px 3px rgba(27,42,74,0.06)" : "none",
                    cursor: "pointer",
                    transition: "var(--transition)",
                  }}
                >
                  <div style={{ fontSize: "0.9rem", fontWeight: isSelected ? 600 : 500, color: isSelected ? "var(--color-navy)" : "var(--color-slate)", marginBottom: "0.2rem" }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: isSelected ? "var(--color-sage)" : "var(--text-muted)" }}>
                    {c.statute}
                  </div>
                </button>
              );
            })}

            <div style={{ marginTop: "auto", paddingTop: "1.25rem", borderTop: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--color-slate)", lineHeight: 1.5 }}>
                All clauses are dynamically generated based on your questionnaire responses.
              </div>
            </div>
          </div>

          {/* Right Column: Legal Text Parchment */}
          <div className="clause-preview-col" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-subtle)" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-sage)", fontWeight: 600 }}>
                    {clauses[activeIdx].statute}
                  </span>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--color-navy)", marginTop: "0.2rem" }}>
                    {clauses[activeIdx].title}
                  </h3>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", backgroundColor: "var(--bg-page)", padding: "0.2rem 0.5rem", borderRadius: "var(--radius-sm)" }}>
                  Clause {activeIdx + 1} of 5
                </span>
              </div>

              <p style={{ fontSize: "0.875rem", color: "var(--color-slate)", marginBottom: "1rem", fontStyle: "italic" }}>
                {clauses[activeIdx].summary}
              </p>

              {/* Document Text Box */}
              <div
                className="clause-text-box"
                style={{
                  backgroundColor: "var(--bg-page)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.5rem",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                  color: "var(--color-charcoal)",
                  whiteSpace: "pre-line",
                  maxHeight: "320px",
                  overflowY: "auto",
                }}
              >
                {clauses[activeIdx].legalText}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1.25rem", borderTop: "1px solid var(--border-subtle)", marginTop: "1.5rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Included in standard member draft
              </span>
              <Link href="/start" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-navy)" }}>
                Draft your will now →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .clause-header-wrap {
            margin-bottom: 2rem !important;
          }
          :global(.clause-split) {
            grid-template-columns: 1fr !important;
          }
          :global(.clause-nav-col) {
            border-right: none !important;
            border-bottom: 1px solid var(--border-subtle) !important;
            padding: 1.25rem 1.15rem !important;
          }
          :global(.clause-preview-col) {
            padding: 1.25rem 1.15rem !important;
          }
          :global(.clause-text-box) {
            padding: 1rem !important;
            font-size: 0.85rem !important;
            max-height: 250px !important;
          }
        }
      `}</style>
    </section>
  );
}
