"use client";

import React, { useState } from "react";

export default function AuthorityDraftPage() {
  const [formData, setFormData] = useState({
    testatorName: "Rajesh Kumar Sharma",
    testatorAge: "54",
    fatherOrSpouseName: "Late Sh. Ram Prakash Sharma",
    residentialAddress: "B-402, Green Park Apartments, New Delhi 110016",
    state: "Delhi",
    maritalStatus: "Married",
    primaryBeneficiary: "Sunita Sharma (Spouse - 100% share)",
    executorName: "Rohit Sharma (Brother)",
    executorAddress: "C-12, Sector 15, Noida, Uttar Pradesh",
  });

  const [generating, setGenerating] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedPdf(true);
    }, 800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "700px" }}>
      {/* Title */}
      <h1 style={{ fontSize: "1.4rem", color: "var(--color-navy)", fontWeight: 700, margin: 0 }}>
        Draft Will
      </h1>

      {/* Form */}
      <div style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid #E2E8F0" }}>
        <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div className="authority-form-row" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "0.75rem" }}>
            <div>
              <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                Testator Full Name *
              </label>
              <input
                name="testatorName"
                type="text"
                required
                value={formData.testatorName}
                onChange={handleChange}
                className="form-input"
                style={{ fontSize: "0.85rem", padding: "0.5rem" }}
              />
            </div>
            <div>
              <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                Age *
              </label>
              <input
                name="testatorAge"
                type="number"
                required
                value={formData.testatorAge}
                onChange={handleChange}
                className="form-input"
                style={{ fontSize: "0.85rem", padding: "0.5rem" }}
              />
            </div>
          </div>

          <div className="authority-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                Father&apos;s / Spouse Name *
              </label>
              <input
                name="fatherOrSpouseName"
                type="text"
                required
                value={formData.fatherOrSpouseName}
                onChange={handleChange}
                className="form-input"
                style={{ fontSize: "0.85rem", padding: "0.5rem" }}
              />
            </div>
            <div>
              <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                State *
              </label>
              <input
                name="state"
                type="text"
                required
                value={formData.state}
                onChange={handleChange}
                className="form-input"
                style={{ fontSize: "0.85rem", padding: "0.5rem" }}
              />
            </div>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
              Address *
            </label>
            <input
              name="residentialAddress"
              type="text"
              required
              value={formData.residentialAddress}
              onChange={handleChange}
              className="form-input"
              style={{ fontSize: "0.85rem", padding: "0.5rem" }}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
              Beneficiary & Asset Distribution *
            </label>
            <textarea
              name="primaryBeneficiary"
              required
              rows={2}
              value={formData.primaryBeneficiary}
              onChange={handleChange}
              className="form-input"
              style={{ fontSize: "0.85rem", padding: "0.5rem", resize: "vertical" }}
            />
          </div>

          <div className="authority-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                Executor *
              </label>
              <input
                name="executorName"
                type="text"
                required
                value={formData.executorName}
                onChange={handleChange}
                className="form-input"
                style={{ fontSize: "0.85rem", padding: "0.5rem" }}
              />
            </div>
            <div>
              <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                Executor Address *
              </label>
              <input
                name="executorAddress"
                type="text"
                required
                value={formData.executorAddress}
                onChange={handleChange}
                className="form-input"
                style={{ fontSize: "0.85rem", padding: "0.5rem" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.75rem" }}>
            <button
              type="submit"
              disabled={generating}
              style={{
                padding: "0.55rem 1.15rem",
                fontSize: "0.85rem",
                backgroundColor: "#0F172A",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "4px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {generating ? "Compiling..." : "Generate PDF"}
            </button>
          </div>
        </form>

        {generatedPdf && (
          <div
            style={{
              marginTop: "1.25rem",
              padding: "0.85rem 1rem",
              backgroundColor: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "#166534", fontWeight: 600 }}>
              Will generated successfully.
            </span>
            <button
              type="button"
              onClick={() => alert("Downloading Last_Will.pdf...")}
              style={{
                padding: "0.35rem 0.75rem",
                fontSize: "0.78rem",
                backgroundColor: "#166534",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "4px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Download PDF
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          :global(.authority-form-row) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
