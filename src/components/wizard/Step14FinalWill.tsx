"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WillDraftingState } from "@/lib/willDraftingStore";
import AppleSwitch from "@/components/dashboard/AppleSwitch";
import {
  Check,
  Printer,
  LayoutDashboard,
  FileText,
  ShieldCheck,
  ArrowLeft,
  Download,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step14FinalWillProps {
  state: WillDraftingState;
  onBack: () => void;
}

export default function Step14FinalWill({ state, onBack }: Step14FinalWillProps) {
  const [showWatermark, setShowWatermark] = useState(false);
  const testator = state.testator;
  const isMale = testator.gender === "male";
  const pronounTitle = isMale ? "Mr." : testator.gender === "female" ? "Ms." : "";
  const sonDaughterOf = isMale ? "son of" : "daughter of";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* Apple-style Action Strip */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "0.75rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          boxShadow: "0 2px 10px rgba(27, 42, 74, 0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "var(--color-sage)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(124, 148, 115, 0.35)",
              flexShrink: 0,
            }}
          >
            <Check size={18} strokeWidth={3} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "var(--color-navy)" }}>
              Your Will is Legally Compiled & Ready
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              Version {state.version || "v1.2"} • ISA 1925 Compliant • Attestation Ready
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
          <AudioAssistantButton
            textToSpeak="Congratulations! Here is your complete Last Will and Testament. You can print it on normal A4 paper or save it as a PDF."
            label="Listen / सुनें 🔊"
          />
          {/* Watermark AppleSwitch */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Watermark:</span>
            <AppleSwitch checked={showWatermark} onChange={setShowWatermark} />
          </div>

          <button
            onClick={handlePrint}
            className="btn btn-gold"
            style={{
              padding: "0.55rem 1.15rem",
              fontSize: "0.85rem",
              borderRadius: "10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              fontWeight: 700,
              boxShadow: "0 2px 10px rgba(201, 162, 39, 0.25)",
              cursor: "pointer",
            }}
          >
            <Printer size={15} /> Print / Save as PDF
          </button>

          <Link
            href="/dashboard"
            style={{
              padding: "0.55rem 1.15rem",
              fontSize: "0.85rem",
              borderRadius: "10px",
              backgroundColor: "var(--color-navy)",
              color: "#FFFFFF",
              textDecoration: "none",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            <LayoutDashboard size={14} /> Dashboard →
          </Link>
        </div>
      </div>

      {/* Apple Preview / Paper Document Viewport */}
      <div
        id="printable-final-will"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
          padding: "2.5rem 3rem",
          fontFamily: "var(--font-main)",
          color: "#1E293B",
          lineHeight: 1.75,
          position: "relative",
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
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
              fontSize: "5rem",
              fontWeight: 900,
              color: "rgba(201, 162, 39, 0.08)",
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
        <div style={{ textAlign: "center", borderBottom: "2px solid #0F172A", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-navy)", letterSpacing: "0.08em", marginBottom: "0.35rem", textTransform: "uppercase" }}>
            WILL DEED
          </div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            LAST WILL AND TESTAMENT OF
          </h1>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--color-gold)", marginTop: "0.35rem", textTransform: "uppercase", letterSpacing: "0.02em" }}>
            {testator.fullName || "DR. ROHIT SRIVASTAVA"}
          </div>
        </div>

        {/* Document Body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "0.95rem" }}>
          {/* Preamble / Declaration */}
          <div style={{ textAlign: "justify", color: "#1E293B", lineHeight: 1.85 }}>
            I, <strong>{testator.fullName || "Dr. Rohit Srivastava"}</strong>, {testator.gender === "female" ? "daughter of" : "son of"}{" "}
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

          {/* Clauses from Store */}
          {state.clauses && state.clauses.length > 0 ? (
            state.clauses.map((clause, idx) => (
              <div key={clause.id || idx} style={{ textAlign: "justify" }}>
                <div style={{ fontWeight: 800, color: "#0F172A", marginBottom: "0.45rem", textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.02em" }}>
                  {clause.clauseNumber || idx + 1}. {clause.title}
                </div>
                <div style={{ whiteSpace: "pre-line", color: "#1E293B", lineHeight: 1.85 }}>
                  {clause.currentText || clause.standardText}
                </div>
              </div>
            ))
          ) : (
            <div>Compiling authoritative legal clauses...</div>
          )}
        </div>

        {/* Seal Footer */}
        <div style={{ marginTop: "3.5rem", paddingTop: "1.5rem", borderTop: "1px dashed #CBD5E1", fontSize: "0.75rem", color: "#94A3B8", textAlign: "center" }}>
          Generated via WillDrafting.com • Certified Compliant with Section 63, Indian Succession Act, 1925
        </div>
      </div>

      {/* Execution Instructions Section (Section 35) */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "22px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "1.75rem 2rem",
          boxShadow: "0 4px 24px rgba(27, 42, 74, 0.03)",
        }}
      >
        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-navy)", margin: "0 0 1rem" }}>
          Next Step: 4 Statutory Execution Rules (Section 63 ISA 1925)
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {[
            {
              step: "01",
              title: "Print on Plain Paper",
              desc: "Print on standard A4 white bond paper. Non-judicial stamp paper is NOT required under Indian law.",
            },
            {
              step: "02",
              title: "Sign Every Page",
              desc: "Sign or initial at the bottom corner of each page, and sign in full on the final execution block.",
            },
            {
              step: "03",
              title: "Two Independent Witnesses",
              desc: "Two adult witnesses must see you sign. Neither witness can be a beneficiary under the Will.",
            },
            {
              step: "04",
              title: "Safe Vault Custody",
              desc: "Store original in a fireproof locker and upload a scanned copy to your WillDrafting Vault.",
            },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                backgroundColor: "rgba(27, 42, 74, 0.02)",
                borderRadius: "16px",
                padding: "1.15rem 1.25rem",
                border: "1px solid rgba(27, 42, 74, 0.05)",
              }}
            >
              <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-gold)", marginBottom: "0.25rem" }}>
                RULE {item.step}
              </div>
              <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
                {item.title}
              </h4>
              <p style={{ margin: "0.35rem 0 0", fontSize: "0.825rem", color: "var(--color-slate)", lineHeight: 1.45 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.6rem 1rem",
          borderRadius: "14px",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          boxShadow: "0 2px 10px rgba(27, 42, 74, 0.03)",
          marginTop: "auto",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "0.65rem 1.4rem",
            borderRadius: "10px",
            border: "1px solid rgba(27, 42, 74, 0.15)",
            backgroundColor: "#FFFFFF",
            color: "var(--color-navy)",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <Link
          href="/dashboard"
          className="btn btn-gold"
          style={{
            padding: "0.65rem 1.85rem",
            borderRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 4px 16px rgba(201, 162, 39, 0.25)",
          }}
        >
          <span>Go to Customer Dashboard</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
