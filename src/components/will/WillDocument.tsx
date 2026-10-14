import React from "react";
import { WillDraftingState, generateWillClauses, formatDDMMYYYY } from "@/lib/willDraftingStore";
import { normalizeWillState } from "@/lib/inputSanitizers";
import WillAssetDistributionTable from "@/components/wizard/WillAssetDistributionTable";

/**
 * Pure (hook-free) render of the statutory Will document. Used by the on-screen preview and by the
 * server-side PDF renderer, so both always show exactly the same text.
 */
export default function WillDocument({ state: rawState }: { state: WillDraftingState }) {
  const state = normalizeWillState(rawState, true);
  const testator = state.testator;

  const calculateAge = (dob?: string): number | null => {
    if (!dob) return null;
    const birth = new Date(dob);
    if (Number.isNaN(birth.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 0 ? age : null;
  };

  const testatorAge = calculateAge(testator.dob);
  const parentName = testator.fatherOrMotherName?.trim();
  const panNumber = testator.pan?.trim();
  const aadhaarNumber = testator.aadhaar?.trim();
  const phoneNumber = testator.phone?.trim();
  const emailAddress = testator.email?.trim();
  const maritalStatusLabel = testator.maritalStatus?.trim();
  const religionLawMap: Record<string, string> = {
    hindu: "Hindu (governed by the Hindu Succession Act, 1956 and Indian Succession Act, 1925)",
    sikh: "Sikh (governed by the Hindu Succession Act, 1956 and Indian Succession Act, 1925)",
    jain: "Jain (governed by the Hindu Succession Act, 1956 and Indian Succession Act, 1925)",
    buddhist: "Buddhist (governed by the Hindu Succession Act, 1956 and Indian Succession Act, 1925)",
    christian: "Christian (governed by the Indian Succession Act, 1925)",
    parsi: "Parsi (governed by the Indian Succession Act, 1925)",
    muslim: "Muslim (governed by Muslim Personal Law / Shariat)",
    other: "governed by the Indian Succession Act, 1925",
    secular: "governed by the Indian Succession Act, 1925",
  };
  const religionLabel = testator.religionPersonalLaw
    ? religionLawMap[testator.religionPersonalLaw.toLowerCase()] || testator.religionPersonalLaw
    : "";
  const fullAddress =
    [testator.address, testator.city, testator.state, testator.pincode].filter(Boolean).join(", ") ||
    "[Residential Address]";
  const hasEncumberedAssets = state.assets.some((a) => a.hasLoan || Boolean(a.loanDetails?.trim()));
  const hasNomineeOrFinancialAssets = state.assets.some(
    (a) =>
      Boolean(a.nomineeName?.trim()) ||
      a.category === "insurance" ||
      a.category === "bank_account" ||
      a.category === "investments" ||
      a.category === "shares" ||
      a.category === "mutual_funds"
  );

  const witnessLineStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "0.4rem",
    marginBottom: "0.45rem",
    fontSize: "0.86rem",
    lineHeight: 1.5,
  };

  const witnessBlankStyle: React.CSSProperties = {
    flex: 1,
    borderBottom: "1px solid #000000",
    minWidth: "40px",
    height: "1.05em",
    display: "inline-block",
  };

  const inlineBlank = (minWidth: string): React.CSSProperties => ({
    display: "inline-block",
    borderBottom: "1px solid #000000",
    minWidth,
    maxWidth: "100%",
    height: "1em",
    verticalAlign: "baseline",
    margin: "0 0.2rem",
  });

  return (
    <>
          {/* Formal Legal Header */}
          <div className="will-formal-header" style={{ textAlign: "center", borderBottom: "2px solid #000000", paddingBottom: "1.25rem", marginBottom: "1.75rem" }}>
            <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#000000", letterSpacing: "0.14em", marginBottom: "0.3rem", textTransform: "uppercase" }}>
              WILL DEED
            </div>
            <h1 style={{ fontFamily: "inherit", fontSize: "1.75rem", fontWeight: 800, color: "#000000", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              LAST WILL AND TESTAMENT OF
            </h1>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#000000", marginTop: "0.3rem", textTransform: "uppercase", letterSpacing: "0.02em" }}>
              {testator.fullName || "[TESTATOR FULL NAME]"}
            </div>
          </div>

          {/* Document Body */}
          <div className="will-document-body" style={{ display: "flex", flexDirection: "column", gap: "1.35rem", fontSize: "1rem", color: "#000000" }}>
            {/* Preamble / Declaration */}
            <div className="will-clause" style={{ textAlign: "justify", color: "#000000", lineHeight: 1.85, pageBreakInside: "avoid", breakInside: "avoid" }}>
              I, <strong>{testator.fullName || "[Testator Full Name]"}</strong>
              {parentName ? (
                <>
                  , {testator.gender === "female" ? "daughter of" : "son of"} <strong>{parentName}</strong>
                </>
              ) : null}
              {testatorAge !== null && testator.dob ? (
                <>
                  , aged about <strong>{testatorAge} years</strong> (Date of Birth: {formatDDMMYYYY(testator.dob)})
                </>
              ) : null}
              {maritalStatusLabel ? (
                <>
                  , marital status <strong>{maritalStatusLabel}</strong>
                </>
              ) : null}
              {religionLabel ? (
                <>
                  , by religion/personal law <strong>{religionLabel}</strong>
                </>
              ) : null}
              {panNumber && aadhaarNumber ? (
                <>
                  , holding Permanent Account Number (PAN) <strong>{panNumber}</strong> and Aadhaar Number{" "}
                  <strong>{aadhaarNumber}</strong>
                </>
              ) : panNumber ? (
                <>
                  , holding Permanent Account Number (PAN) <strong>{panNumber}</strong>
                </>
              ) : aadhaarNumber ? (
                <>
                  , holding Aadhaar Number <strong>{aadhaarNumber}</strong>
                </>
              ) : null}
              , presently residing at <strong>{fullAddress}</strong>
              {phoneNumber || emailAddress ? (
                <>
                  {" "}(Contact:{" "}
                  <strong>
                    {[phoneNumber ? `Tel: ${phoneNumber}` : "", emailAddress ? `Email: ${emailAddress}` : ""]
                      .filter(Boolean)
                      .join(", ")}
                  </strong>
                  )
                </>
              ) : null}
              {testator.workplace ? (
                <>
                  , and working at <strong>{testator.workplace}</strong>
                </>
              ) : null}
              , being of sound mind, in good health, and fully competent to make this Will, do hereby declare this to be my Last Will and Testament, made voluntarily and without any coercion, undue influence, or misrepresentation.
            </div>

            {/* Dynamically Compiled Clauses from State */}
            {(() => {
              // Always dynamically compile clauses from latest state to ensure all wishes, bequests & motives are included
              const freshlyCompiled = generateWillClauses(state);
              // If state has any clauses specifically marked as lawyer-edited, preserve those edits
              const rawClauses = freshlyCompiled.map((clause) => {
                const existing = state.clauses?.find((c) => c.id === clause.id);
                if (existing && existing.isLawyerEdited) {
                  return existing;
                }
                return clause;
              });
              const activeClauses = rawClauses.filter(
                (c) =>
                  c.id !== "cls-declaration" &&
                  c.category !== "Preamble" &&
                  !c.title.toLowerCase().includes("declaration of testator") &&
                  c.id !== "cls-attestation" &&
                  c.id !== "cls-execution" &&
                  c.category !== "Attestation" &&
                  c.category !== "Execution" &&
                  !c.title.toLowerCase().includes("attestation") &&
                  !c.title.toLowerCase().includes("execution")
              );
              return activeClauses.map((clause, idx) => {
                const isAssetClause =
                  clause.id === "cls-assets" ||
                  clause.id === "cls-specific-bequests" ||
                  clause.category === "Specific Bequests" ||
                  clause.title.toLowerCase().includes("movable & immovable");

                return (
                  <div
                    key={clause.id || idx}
                    className={isAssetClause ? "will-asset-clause" : "will-clause"}
                    style={{
                      textAlign: "justify",
                      pageBreakInside: isAssetClause ? "auto" : "avoid",
                      breakInside: isAssetClause ? "auto" : "avoid",
                      marginBottom: "1.1rem",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 800,
                        color: "#000000",
                        marginBottom: "0.45rem",
                        textTransform: "uppercase",
                        fontSize: "1rem",
                        letterSpacing: "0.02em",
                        pageBreakAfter: "avoid",
                        breakAfter: "avoid",
                      }}
                    >
                      {idx + 1}. {clause.title}
                    </div>

                    {isAssetClause ? (
                      <div className="will-asset-schedule">
                        <p
                          style={{
                            margin: "0 0 0.65rem 0",
                            color: "#000000",
                            lineHeight: 1.85,
                            pageBreakAfter: "avoid",
                            breakAfter: "avoid",
                          }}
                        >
                          I hereby devise, bequeath, and direct the devolution of my specific movable and immovable properties, including my respective undivided shares in jointly held properties, to the respective beneficiaries strictly in accordance with the Schedule of Asset Distribution set forth below:
                        </p>

                        <WillAssetDistributionTable
                          assets={state.assets}
                          allocations={state.allocations}
                          familyMembers={state.familyMembers}
                          residuaryBeneficiaryName={state.residuaryBeneficiaryName}
                        />

                        <p
                          style={{
                            margin: "0.45rem 0 0 0",
                            color: "#000000",
                            fontSize: "0.88rem",
                            lineHeight: 1.65,
                            fontStyle: "italic",
                            pageBreakInside: "avoid",
                            breakInside: "avoid",
                          }}
                        >
                          All beneficiaries named in the Schedule above shall take their respective devised shares absolutely and forever. If any specific bequest fails on account of prior demise of a beneficiary without surviving issues, such share shall fall into and be administered under the Residuary Clause herein.
                        </p>

                        {hasEncumberedAssets && (
                          <p
                            style={{
                              margin: "0.45rem 0 0 0",
                              color: "#000000",
                              fontSize: "0.86rem",
                              lineHeight: 1.6,
                              pageBreakInside: "avoid",
                              breakInside: "avoid",
                            }}
                          >
                            <strong>Encumbered Assets (Section 167, Indian Succession Act, 1925):</strong> Where any asset listed in the Schedule above is subject to an active mortgage, charge, or loan, unless expressly stipulated otherwise, the beneficiary to whom such asset is bequeathed shall take it subject to such encumbrance and shall be responsible for discharging the corresponding liability.
                          </p>
                        )}

                        {hasNomineeOrFinancialAssets && (
                          <p
                            style={{
                              margin: "0.45rem 0 0 0",
                              color: "#000000",
                              fontSize: "0.86rem",
                              lineHeight: 1.6,
                              pageBreakInside: "avoid",
                              breakInside: "avoid",
                            }}
                          >
                            <strong>Beneficial Ownership over Registered Nominees:</strong> Under settled Indian succession law, any person recorded as a registered nominee in respect of any bank account, deposit, security, or insurance policy acts strictly as a custodian/trustee to receive proceeds from the institution, and the ultimate legal and beneficial ownership shall vest solely in the beneficiaries specified in the Schedule above.
                          </p>
                        )}
                      </div>
                    ) : (
                      <div style={{ whiteSpace: "pre-line", color: "#000000", lineHeight: 1.85 }}>
                        {clause.currentText || clause.standardText}
                      </div>
                    )}
                  </div>
                );
              });
            })()}

            {/* Formal Execution & Testimonium Block */}
            <div className="will-testimonium" style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "2px solid #000000", color: "#000000", pageBreakInside: "avoid", breakInside: "avoid" }}>
              <p style={{ margin: "0 0 1.5rem", fontSize: "0.95rem", lineHeight: 1.85, textAlign: "justify" }}>
                <strong>IN WITNESS WHEREOF</strong>, I, the above-named Testator, <strong>{testator.fullName || "[TESTATOR FULL NAME]"}</strong>, have executed and set my hands and signature to this my Last Will and Testament on this <span style={inlineBlank("45px")} /> day of <span style={inlineBlank("130px")} />, 20<span style={inlineBlank("35px")} /> at {[testator.city, testator.state].filter(Boolean).join(", ") || "India"}.
              </p>

              <div className="will-sig-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1.5rem", pageBreakInside: "avoid", breakInside: "avoid" }}>
                <div>
                  <div style={{ fontSize: "0.9rem" }}>Date: ____ / ____ / 20____ (DD/MM/YYYY)</div>
                  <div style={{ fontSize: "0.9rem", marginTop: "0.4rem" }}>
                    Place: {[testator.city, testator.state].filter(Boolean).join(", ") || "India"}
                  </div>
                </div>
                <div style={{ textAlign: "center", minWidth: "220px" }}>
                  <div style={{ borderBottom: "1.5px solid #000000", marginBottom: "0.4rem", height: "35px" }} />
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", textTransform: "uppercase" }}>
                    {testator.fullName || "[TESTATOR FULL NAME]"}
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>(TESTATOR)</div>
                </div>
              </div>

              {/* Statutory Dual-Witness Attestation Clause (Section 63, Indian Succession Act, 1925) */}
              <div className="will-attestation" style={{ borderTop: "1.5px solid #000000", paddingTop: "1.5rem", marginBottom: "1.5rem", pageBreakInside: "avoid", breakInside: "avoid" }}>
                <div style={{ fontWeight: 800, fontSize: "1rem", textTransform: "uppercase", marginBottom: "0.65rem", letterSpacing: "0.02em" }}>
                  ATTESTATION CLAUSE (SECTION 63, INDIAN SUCCESSION ACT, 1925)
                </div>
                <p style={{ textAlign: "justify", fontSize: "0.92rem", lineHeight: 1.8, margin: "0 0 1.25rem" }}>
                  Signed, published, and declared by the above-named Testator, <strong>{testator.fullName || "[Testator Full Name]"}</strong>, as and for their Last Will and Testament, in the presence of us, who in their presence, at their request, and in the presence of each other, all being present at the same time, have subscribed our names as attesting witnesses:
                </p>

                {/* 2 Witnesses Structured Grid */}
                <div className="will-witness-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", pageBreakInside: "avoid", breakInside: "avoid" }}>
                  {/* Witness 1 */}
                  <div className="will-witness-box" style={{ padding: "1.1rem 1.2rem", border: "1.5px solid #000000", borderRadius: "4px", pageBreakInside: "avoid", breakInside: "avoid" }}>
                    <div style={{ fontWeight: 800, marginBottom: "0.65rem", fontSize: "0.9rem" }}>WITNESS 1:</div>
                    <div style={witnessLineStyle}>
                      <span style={{ whiteSpace: "nowrap" }}>Signature:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={witnessLineStyle}>
                      <span style={{ whiteSpace: "nowrap" }}>Full Name:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={witnessLineStyle}>
                      <span style={{ whiteSpace: "nowrap" }}>S/o, D/o, W/o:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={witnessLineStyle}>
                      <span style={{ whiteSpace: "nowrap" }}>Address:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={witnessLineStyle}>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={witnessLineStyle}>
                      <span style={{ whiteSpace: "nowrap" }}>Occupation:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={{ ...witnessLineStyle, marginBottom: 0 }}>
                      <span style={{ whiteSpace: "nowrap" }}>PAN / Aadhaar:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                  </div>

                  {/* Witness 2 */}
                  <div className="will-witness-box" style={{ padding: "1.1rem 1.2rem", border: "1.5px solid #000000", borderRadius: "4px", pageBreakInside: "avoid", breakInside: "avoid" }}>
                    <div style={{ fontWeight: 800, marginBottom: "0.65rem", fontSize: "0.9rem" }}>WITNESS 2:</div>
                    <div style={witnessLineStyle}>
                      <span style={{ whiteSpace: "nowrap" }}>Signature:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={witnessLineStyle}>
                      <span style={{ whiteSpace: "nowrap" }}>Full Name:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={witnessLineStyle}>
                      <span style={{ whiteSpace: "nowrap" }}>S/o, D/o, W/o:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={witnessLineStyle}>
                      <span style={{ whiteSpace: "nowrap" }}>Address:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={witnessLineStyle}>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={witnessLineStyle}>
                      <span style={{ whiteSpace: "nowrap" }}>Occupation:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={{ ...witnessLineStyle, marginBottom: 0 }}>
                      <span style={{ whiteSpace: "nowrap" }}>PAN / Aadhaar:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Annexure: Medical Fitness Certificate (Section 59, Indian Succession Act, 1925) */}
              <div
                className="will-medical-annexure will-page-break-before"
                style={{
                  paddingTop: "0.5rem",
                  pageBreakBefore: "always",
                  breakBefore: "page",
                  pageBreakInside: "avoid",
                  breakInside: "avoid",
                }}
              >
                <div style={{ textAlign: "center", borderBottom: "1.5px solid #000000", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    ANNEXURE – CERTIFICATE OF MEDICAL FITNESS
                  </div>
                  <div style={{ fontSize: "0.84rem", fontStyle: "italic", marginTop: "0.25rem" }}>
                    (Under Section 59 of the Indian Succession Act, 1925 – Testamentary Capacity)
                  </div>
                </div>

                <p style={{ textAlign: "justify", fontSize: "0.95rem", lineHeight: 2.0, margin: "0 0 1.25rem" }}>
                  I, Dr. <span style={inlineBlank("220px")} />, a Registered Medical Practitioner, holding Medical Council Registration No. <span style={inlineBlank("160px")} />, practicing at <span style={inlineBlank("260px")} />, do hereby solemnly certify that on this <span style={inlineBlank("45px")} /> day of <span style={inlineBlank("130px")} />, 20<span style={inlineBlank("35px")} />, at <span style={inlineBlank("70px")} /> hours, I have personally examined{" "}
                  <strong>{testator.fullName || "[Testator Full Name]"}</strong>
                  {parentName ? (
                    <>
                      , {testator.gender === "female" ? "daughter of" : "son of"} <strong>{parentName}</strong>
                    </>
                  ) : null}
                  , presently residing at <strong>{fullAddress}</strong>.
                </p>

                <p style={{ textAlign: "justify", fontSize: "0.95rem", lineHeight: 1.9, margin: "0 0 2.5rem" }}>
                  I hereby certify that the above-named Testator is in sound physical health and in possession of a sound disposing mind, memory, and understanding, and is fully conscious, lucid, and capable of understanding the nature, meaning, and legal consequences of executing this Last Will and Testament of their own free will and volition, without any sign of dementia, disorientation, duress, or undue influence.
                </p>

                <div className="will-sig-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
                  <div style={{ minWidth: "220px" }}>
                    <div style={witnessLineStyle}>
                      <span style={{ whiteSpace: "nowrap" }}>Date:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                    <div style={{ ...witnessLineStyle, marginTop: "0.6rem" }}>
                      <span style={{ whiteSpace: "nowrap" }}>Place:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                  </div>
                  <div style={{ textAlign: "center", minWidth: "240px" }}>
                    <div style={{ borderBottom: "1.5px solid #000000", marginBottom: "0.5rem", height: "35px" }} />
                    <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>Signature &amp; Stamp of Doctor</div>
                    <div style={{ fontSize: "0.82rem", marginTop: "0.15rem" }}>Registered Medical Practitioner</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem", fontSize: "0.82rem", marginTop: "0.35rem" }}>
                      <span style={{ whiteSpace: "nowrap" }}>Regn. No.:</span>
                      <span style={witnessBlankStyle} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  );
}
