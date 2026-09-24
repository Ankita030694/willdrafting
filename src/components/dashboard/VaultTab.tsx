"use client";

import React, { useState } from "react";
import {
  WillDraftingState,
  VaultDocument,
  uploadVaultDocument,
  deleteVaultDocument,
} from "@/lib/willDraftingStore";
import WillPreviewModal from "./WillPreviewModal";
import {
  FileText,
  Building,
  Landmark,
  ShieldCheck,
  CreditCard,
  Search,
  UploadCloud,
  X,
  Lock,
  Plus,
  Trash2,
  Download,
  Eye,
} from "lucide-react";

interface VaultTabProps {
  state: WillDraftingState;
  onStateChange: (newState: WillDraftingState) => void;
}

export default function VaultTab({ state, onStateChange }: VaultTabProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<VaultDocument | null>(null);
  const [isWillPreviewOpen, setIsWillPreviewOpen] = useState(false);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState<VaultDocument["category"]>("property_deed");
  const [uploadSize, setUploadSize] = useState("1.8 MB");

  const categories = [
    { id: "all", label: "All Documents" },
    { id: "will_draft", label: "Wills & Versions" },
    { id: "property_deed", label: "Property Deeds" },
    { id: "nomination", label: "Bank & Demat Nominations" },
    { id: "insurance", label: "Insurance Policies" },
    { id: "identity_proof", label: "Identity Proofs" },
  ];

  const documents = state.documents || [];

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const updated = uploadVaultDocument({
      title: uploadTitle.trim(),
      category: uploadCategory,
      fileSize: uploadSize,
      version: "v1.0",
    });

    onStateChange(updated);
    setUploadTitle("");
    setIsUploadOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this document from the Will Vault?")) {
      const updated = deleteVaultDocument(id);
      onStateChange(updated);
    }
  };

  const getDocIcon = (category: VaultDocument["category"]) => {
    switch (category) {
      case "will_draft":
        return <FileText size={24} color="var(--color-navy)" />;
      case "property_deed":
        return <Building size={24} color="var(--color-navy)" />;
      case "nomination":
        return <Landmark size={24} color="var(--color-gold)" />;
      case "insurance":
        return <ShieldCheck size={24} color="var(--color-sage)" />;
      case "identity_proof":
      default:
        return <CreditCard size={24} color="var(--color-slate)" />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Apple-Style Glass Banner */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          border: "1px solid var(--border-card)",
          padding: "2rem 2.5rem",
          boxShadow: "0 12px 36px -8px rgba(27, 42, 74, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gold)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
            Section 37 • Secure Document Vault
          </div>
          <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
            Will Vault & Legal Repository
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.35rem 0 0", maxWidth: "600px" }}>
            Encrypted document storage for executed Wills, conveyance deeds, bank nominations, and medical certificates.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* View Switcher (Apple Finder Style) */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "rgba(27, 42, 74, 0.06)",
              padding: "3px",
              borderRadius: "10px",
            }}
          >
            <button
              onClick={() => setViewMode("grid")}
              style={{
                padding: "0.4rem 0.65rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: viewMode === "grid" ? "#FFFFFF" : "transparent",
                color: viewMode === "grid" ? "var(--color-navy)" : "var(--color-slate)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                boxShadow: viewMode === "grid" ? "0 2px 6px rgba(27, 42, 74, 0.1)" : "none",
              }}
              title="Grid View (macOS Finder)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>

            <button
              onClick={() => setViewMode("list")}
              style={{
                padding: "0.4rem 0.65rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: viewMode === "list" ? "#FFFFFF" : "transparent",
                color: viewMode === "list" ? "var(--color-navy)" : "var(--color-slate)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                boxShadow: viewMode === "list" ? "0 2px 6px rgba(27, 42, 74, 0.1)" : "none",
              }}
              title="List View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="btn btn-gold"
            style={{
              padding: "0.6rem 1.35rem",
              fontSize: "0.85rem",
              borderRadius: "12px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            <span>+ Upload Document</span>
          </button>
        </div>
      </div>

      {/* Storage Meter */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid var(--border-card)",
          padding: "1rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ flex: 1, minWidth: "220px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.35rem" }}>
            <span style={{ fontWeight: 600, color: "var(--color-navy)" }}>Encrypted Storage Usage</span>
            <span style={{ color: "var(--text-muted)" }}>14.8 MB of 500 MB used</span>
          </div>
          <div style={{ height: "6px", backgroundColor: "rgba(27, 42, 74, 0.08)", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: "3%", height: "100%", backgroundColor: "var(--color-sage)" }} />
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative", minWidth: "240px" }}>
          <input
            type="text"
            placeholder="Search vault documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.45rem 0.85rem 0.45rem 2rem",
              borderRadius: "8px",
              border: "1px solid var(--border-card)",
              fontSize: "0.825rem",
              outline: "none",
            }}
          />
          <span style={{ position: "absolute", left: "0.65rem", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", color: "var(--text-muted)" }}>
            <Search size={14} />
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {categories.map((c) => {
          const isActive = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              style={{
                padding: "0.4rem 0.95rem",
                fontSize: "0.8rem",
                fontWeight: isActive ? 600 : 500,
                borderRadius: "999px",
                border: "none",
                backgroundColor: isActive ? "var(--color-navy)" : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "var(--color-slate)",
                boxShadow: "0 2px 6px rgba(27, 42, 74, 0.05)",
                cursor: "pointer",
                transition: "var(--transition)",
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* View: GRID (macOS Finder Style) */}
      {viewMode === "grid" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid var(--border-card)",
                padding: "1.5rem 1.25rem",
                boxShadow: "0 6px 20px rgba(27, 42, 74, 0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(27, 42, 74, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(27, 42, 74, 0.05)";
              }}
              onClick={() => {
                if (doc.category === "will_draft") setIsWillPreviewOpen(true);
                else setPreviewDoc(doc);
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  backgroundColor: doc.category === "will_draft" ? "rgba(201, 162, 39, 0.15)" : "var(--bg-page)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {getDocIcon(doc.category)}
              </div>

              <h4
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "var(--color-navy)",
                  margin: "0 0 0.25rem",
                  lineHeight: 1.35,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {doc.title}
              </h4>

              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "auto", paddingTop: "0.5rem" }}>
                {doc.version || "v1.0"} • {doc.fileSize}
              </div>

              <div style={{ display: "flex", gap: "0.35rem", marginTop: "0.75rem" }}>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    backgroundColor: "rgba(124, 148, 115, 0.15)",
                    color: "var(--color-navy)",
                    padding: "0.15rem 0.45rem",
                    borderRadius: "999px",
                  }}
                >
                  Verified
                </span>
              </div>
            </div>
          ))}

          {/* Quick Dropzone Tile */}
          <div
            onClick={() => setIsUploadOpen(true)}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              borderRadius: "20px",
              border: "2px dashed rgba(27, 42, 74, 0.2)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              cursor: "pointer",
              minHeight: "180px",
            }}
          >
            <UploadCloud size={32} color="var(--color-navy)" style={{ marginBottom: "0.5rem" }} />
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)" }}>Upload File</span>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>PDF, Scans, Deeds</span>
          </div>
        </div>
      )}

      {/* View: LIST */}
      {viewMode === "list" && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid var(--border-card)",
            overflow: "hidden",
            boxShadow: "0 6px 20px rgba(27, 42, 74, 0.05)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-page)", borderBottom: "1px solid var(--border-card)" }}>
                <th style={{ padding: "0.85rem 1.25rem", fontWeight: 700, color: "var(--color-navy)" }}>Name</th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "var(--color-navy)" }}>Category</th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "var(--color-navy)" }}>Size</th>
                <th style={{ padding: "0.85rem 1.25rem", fontWeight: 700, color: "var(--color-navy)", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.85rem 1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span>{getDocIcon(doc.category)}</span>
                      <span style={{ fontWeight: 600, color: "var(--color-navy)" }}>{doc.title}</span>
                    </div>
                  </td>
                  <td style={{ padding: "0.85rem 1rem", textTransform: "capitalize", color: "var(--color-slate)" }}>
                    {doc.category.replace("_", " ")}
                  </td>
                  <td style={{ padding: "0.85rem 1rem", color: "var(--text-muted)" }}>{doc.fileSize}</td>
                  <td style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>
                    <button
                      onClick={() => {
                        if (doc.category === "will_draft") setIsWillPreviewOpen(true);
                        else setPreviewDoc(doc);
                      }}
                      style={{
                        padding: "0.3rem 0.65rem",
                        borderRadius: "6px",
                        border: "1px solid var(--border-card)",
                        backgroundColor: "#FFFFFF",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                      }}
                    >
                      Quick Look
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(27, 42, 74, 0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setIsUploadOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "480px",
              padding: "2rem",
              boxShadow: "0 25px 50px -12px rgba(27, 42, 74, 0.35)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-navy)" }}>
              Upload to Will Vault
            </h3>

            <form onSubmit={handleUploadSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Registered Flat Conveyance Deed"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border-card)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Category *
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as VaultDocument["category"])}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border-card)",
                    fontSize: "0.9rem",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <option value="property_deed">Property Deed / Title Record</option>
                  <option value="nomination">Bank / Demat Nominee Declaration</option>
                  <option value="insurance">Insurance Policy Document</option>
                  <option value="identity_proof">Identity / Medical Fitness Proof</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border-card)",
                    backgroundColor: "#FFFFFF",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{
                    padding: "0.6rem 1.5rem",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Non-Will Quick Look Modal */}
      {previewDoc && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(27, 42, 74, 0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setPreviewDoc(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "480px",
              padding: "2rem",
              boxShadow: "0 25px 50px -12px rgba(27, 42, 74, 0.35)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "2rem" }}>{getDocIcon(previewDoc.category)}</span>
                <div>
                  <h3 style={{ margin: 0, color: "var(--color-navy)", fontSize: "1.15rem", fontWeight: 700 }}>
                    {previewDoc.title}
                  </h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {previewDoc.category.replace("_", " ").toUpperCase()} • {previewDoc.fileSize}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ backgroundColor: "var(--bg-page)", borderRadius: "14px", padding: "1.5rem", textAlign: "center", marginBottom: "1.5rem", border: "1px dashed var(--border-card)" }}>
              <div style={{ fontWeight: 600, color: "var(--color-navy)" }}>Verified Supporting Instrument</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                Uploaded on {previewDoc.dateAdded} • Stored with AES-256 Vault Encryption
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => handleDelete(previewDoc.id)}
                style={{ background: "none", border: "none", color: "#BE123C", fontSize: "0.8rem", cursor: "pointer" }}
              >
                Delete
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-gold"
                style={{ padding: "0.55rem 1.25rem", borderRadius: "10px", fontSize: "0.85rem" }}
              >
                Download Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Will Preview Modal */}
      <WillPreviewModal
        isOpen={isWillPreviewOpen}
        onClose={() => setIsWillPreviewOpen(false)}
        state={state}
      />
    </div>
  );
}
