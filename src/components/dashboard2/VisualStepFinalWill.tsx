"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WillDraftingState } from "@/lib/willDraftingStore";
import AppleSwitch from "@/components/dashboard/AppleSwitch";
import {
  Check,
  Printer,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  FileCheck,
  Download,
  Share2,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface VisualStepFinalWillProps {
  state: WillDraftingState;
  onBack: () => void;
}

export default function VisualStepFinalWill({
  state,
  onBack,
}: VisualStepFinalWillProps) {
  const [showWatermark, setShowWatermark] = useState(false);
  const testator = state.testator;
  const isMale = testator.gender === "male";

  const handlePrint = () => {
    window.print();
  };

  const speechIntro =
    "Congratulations! Your Last Will and Testament is fully compiled with all legal clauses, startup equities, and asset distributions under Section 63 of the Indian Succession Act 1925. You can print it on normal A4 paper or save it as a PDF.";

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1.25rem 1rem 6rem" }}>
      {/* Top Action Ribbon */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "18px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "1rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(46, 125, 50, 0.3)",
              flexShrink: 0,
            }}
          >
            <Check size={22} strokeWidth={3} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "var(--color-navy)" }}>
                Your Will Deed is Ready
              </h2>
              <span style={{ fontSize: "0.72rem", background: "rgba(201, 162, 39, 0.15)", color: "var(--color-navy)", padding: "0.15rem 0.5rem", borderRadius: "8px", fontWeight: 800 }}>
                100% COMPLETE
              </span>
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-slate)", marginTop: "0.15rem" }}>
              Indian Succession Act 1925 • Valid across all High Courts of India
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
          <AudioAssistantButton textToSpeak={speechIntro} label="Listen / सुनें 🔊" />

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--color-slate)", fontWeight: 600 }}>Watermark:</span>
            <AppleSwitch checked={showWatermark} onChange={setShowWatermark} />
          </div>

          <button
            onClick={handlePrint}
            style={{
              padding: "0.65rem 1.25rem",
              fontSize: "0.88rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, var(--color-gold) 0%, #b38b19 100%)",
              color: "#FFFFFF",
              border: "none",
              cursor: "pointer",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              boxShadow: "0 3px 12px rgba(201, 162, 39, 0.3)",
            }}
          >
            <Printer size={16} /> Print / Save as PDF
          </button>

          <button
            onClick={onBack}
            style={{
              padding: "0.65rem 1rem",
              fontSize: "0.85rem",
              borderRadius: "12px",
              background: "#F1F5F9",
              color: "var(--color-navy)",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <ArrowLeft size={15} /> Edit Answers
          </button>
        </div>
      </div>

      {/* Printable Legal Document Container */}
      <div
        id="printable-final-will"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "22px",
          border: "1px solid rgba(27, 42, 74, 0.12)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.05)",
          padding: "3rem 3.5rem",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          color: "#0F172A",
          lineHeight: 1.85,
          position: "relative",
          marginBottom: "2rem",
        }}
      >
        {/* Draft Watermark */}
        {showWatermark && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-35deg)",
              fontSize: "5.5rem",
              fontWeight: 900,
              color: "rgba(201, 162, 39, 0.07)",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              letterSpacing: "0.15em",
              userSelect: "none",
            }}
          >
            DRAFT • WILLDRAFTING.COM
          </div>
        )}

        {/* Formal Legal Header */}
        <div style={{ textAlign: "center", borderBottom: "2px solid #0F172A", paddingBottom: "1.75rem", marginBottom: "2.25rem" }}>
          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--color-navy)", letterSpacing: "0.1em", marginBottom: "0.4rem", textTransform: "uppercase" }}>
            WILL DEED
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            LAST WILL AND TESTAMENT OF
          </h1>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-gold)", marginTop: "0.5rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            {testator.fullName || "DR. ROHIT SRIVASTAVA"}
          </div>
        </div>

        {/* Legal Text Body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", fontSize: "1rem" }}>
          {/* Preamble / Declaration */}
          <div style={{ textAlign: "justify", lineHeight: 1.9 }}>
            I, <strong>{testator.fullName || "Dr. Rohit Srivastava"}</strong>, {isMale ? "son of" : "daughter of"}{" "}
            <strong>{testator.fatherOrMotherName || "Late Mrs. Manju Srivastava"}</strong>, aged about{" "}
            {testator.dob ? new Date().getFullYear() - new Date(testator.dob).getFullYear() : "[X]"} years, holding Permanent Account Number (PAN){" "}
            <strong>{testator.pan || "BAZPS9068N"}</strong> and Aadhaar Number{" "}
            <strong>{testator.aadhaar || "3546 XXXX XXXX"}</strong>, presently residing at{" "}
            <strong>
              {[testator.address, testator.city, testator.state, testator.pincode].filter(Boolean).join(", ") ||
                "201 Barberry, Nahar Amrit Shakti, Chandivali, Mumbai – 400072"}
            </strong>
            , and working at{" "}
            <strong>
              {testator.workplace || "Room 505, Department of Biosciences and Bioengineering, Indian Institute of Technology Bombay, Powai, Mumbai – 400076"}
            </strong>
            , being of sound mind, in good health, and fully competent to make this Will, do hereby declare this to be my Last Will and Testament, made voluntarily and without any coercion, undue influence, or misrepresentation, and hereby revoke all prior Wills and testamentary dispositions made by me.
          </div>

          {/* Compiled Clauses */}
          {state.clauses && state.clauses.length > 0 ? (
            state.clauses.map((clause, idx) => (
              <div key={clause.id || idx} style={{ textAlign: "justify" }}>
                <div style={{ fontWeight: 800, color: "#0F172A", marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "1rem", letterSpacing: "0.02em" }}>
                  {clause.clauseNumber || idx + 1}. {clause.title}
                </div>
                <div style={{ whiteSpace: "pre-line", color: "#1E293B", lineHeight: 1.9 }}>
                  {clause.currentText || clause.standardText}
                </div>
              </div>
            ))
          ) : (
            <div>Compiling authoritative legal clauses...</div>
          )}

          {/* Signatures & Attestation Section */}
          <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid #CBD5E1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
              <div>
                <p style={{ margin: "0 0 0.5rem", fontSize: "0.95rem" }}>
                  IN WITNESS WHEREOF, I, the Testator above named, have hereunto set my hands on this ______ day of ____________, 202__ at Mumbai.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4rem" }}>
              <div>
                <div style={{ fontSize: "0.9rem", color: "#64748B" }}>Date: _________________</div>
                <div style={{ fontSize: "0.9rem", color: "#64748B", marginTop: "0.3rem" }}>Place: Mumbai, Maharashtra</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ borderBottom: "1.5px solid #0F172A", width: "220px", marginBottom: "0.5rem" }}></div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>{testator.fullName || "DR. ROHIT SRIVASTAVA"}</div>
                <div style={{ fontSize: "0.85rem", color: "#64748B" }}>(TESTATOR)</div>
              </div>
            </div>

            {/* Attestation Clause */}
            <div style={{ textAlign: "justify", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "2rem" }}>
              Signed, published, and declared by the above-named Testator, <strong>{testator.fullName || "Dr. Rohit Srivastava"}</strong>, as and for his Last Will and Testament, in the presence of us, who in his presence, at his request, and in the presence of each other, all being present at the same time, have subscribed our names as attesting witnesses:
            </div>

            {/* 2 Witnesses Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {/* Witness 1 */}
              <div style={{ padding: "1.25rem", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
                <div style={{ fontWeight: 800, marginBottom: "0.75rem", fontSize: "0.9rem" }}>WITNESS 1:</div>
                <div style={{ fontSize: "0.85rem", lineHeight: 2 }}>
                  Signature: ___________________________<br />
                  Name: _______________________________<br />
                  Son / Daughter of: ___________________<br />
                  Address: ____________________________<br />
                  Occupation: __________________________<br />
                  PAN / Aadhaar: _______________________
                </div>
              </div>

              {/* Witness 2 */}
              <div style={{ padding: "1.25rem", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
                <div style={{ fontWeight: 800, marginBottom: "0.75rem", fontSize: "0.9rem" }}>WITNESS 2:</div>
                <div style={{ fontSize: "0.85rem", lineHeight: 2 }}>
                  Signature: ___________________________<br />
                  Name: _______________________________<br />
                  Son / Daughter of: ___________________<br />
                  Address: ____________________________<br />
                  Occupation: __________________________<br />
                  PAN / Aadhaar: _______________________
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "3.5rem", paddingTop: "1.5rem", borderTop: "1px dashed #CBD5E1", fontSize: "0.75rem", color: "#94A3B8", textAlign: "center" }}>
          Certified Compliant with Section 63, Indian Succession Act, 1925 • Generated on WillDrafting.com
        </div>
      </div>

      {/* 4 Statutory Execution Rules */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "22px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "1.75rem 2rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.25rem" }}>
          <ShieldCheck size={26} color="var(--color-gold)" />
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
            4 Golden Rules for Signing Your Will (ISA Section 63)
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          {[
            {
              step: "1",
              title: "Print on Plain White A4 Paper",
              desc: "Non-judicial stamp paper is NOT required in India. Normal white 80+ GSM paper is legally sound and valid.",
            },
            {
              step: "2",
              title: "Sign Every Single Page",
              desc: "Sign at the bottom of each page to prevent substitution. Sign your full signature on the final page.",
            },
            {
              step: "3",
              title: "2 Independent Adult Witnesses",
              desc: "Must NOT be beneficiaries under this Will (e.g. friends, colleagues, doctor, or family lawyer).",
            },
            {
              step: "4",
              title: "Sign Together in One Room",
              desc: "All three (you and both witnesses) must see each other sign at the same time on the same date.",
            },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                background: "#F8FAFC",
                borderRadius: "14px",
                padding: "1.1rem",
                border: "1px solid #E2E8F0",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--color-navy)",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.6rem",
                }}
              >
                {item.step}
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--color-slate)", lineHeight: 1.45 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
