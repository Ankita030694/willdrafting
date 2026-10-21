"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export interface PromptProfile {
  id: string;
  name: string;
  description: string;
  coreInstructions: string;
  targetWordCount: number;
  isDefault: boolean;
}

export default function AuthorityPromptsPage() {
  const [prompts, setPrompts] = useState<PromptProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptProfile | null>(null);

  const emptyPromptState: Omit<PromptProfile, "id"> = {
    name: "",
    description: "",
    coreInstructions: "",
    targetWordCount: 2500,
    isDefault: false,
  };

  const [newPrompt, setNewPrompt] = useState<Omit<PromptProfile, "id">>(emptyPromptState);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/prompts");
      if (!res.ok) throw new Error("Failed to load prompt profiles");
      const data = await res.json();
      setPrompts(Array.isArray(data.prompts) ? data.prompts : []);
    } catch (error) {
      console.error("Error fetching prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const seedDefaultPrompts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "seed" }),
      });
      if (!res.ok) throw new Error("Failed to seed default prompts");
      await fetchPrompts();
      alert("Default prompts have been seeded successfully!");
    } catch (error) {
      console.error("Error seeding default prompts:", error);
      alert("Failed to seed default prompts.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/admin/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPrompt?.id || "",
          ...newPrompt,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save prompt profile");

      setEditingPrompt(null);
      setNewPrompt(emptyPromptState);
      setIsCreating(false);
      await fetchPrompts();
    } catch (error) {
      console.error("Error saving prompt:", error);
      alert("Failed to save prompt profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrompt = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this prompt profile?")) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/prompts?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete prompt profile");
      await fetchPrompts();
    } catch (error) {
      console.error("Error deleting prompt:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (prompt: PromptProfile) => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prompt, isDefault: true }),
      });
      if (!res.ok) throw new Error("Failed to set default profile");
      await fetchPrompts();
    } catch (error) {
      console.error("Error setting default:", error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (prompt: PromptProfile) => {
    setEditingPrompt(prompt);
    setNewPrompt({
      name: prompt.name,
      description: prompt.description,
      coreInstructions: prompt.coreInstructions,
      targetWordCount: prompt.targetWordCount || 2500,
      isDefault: prompt.isDefault,
    });
    setIsCreating(true);
  };

  const cancelEditing = () => {
    setEditingPrompt(null);
    setIsCreating(false);
    setNewPrompt(emptyPromptState);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem 0.9rem",
    borderRadius: "10px",
    border: "1px solid rgba(23, 34, 40, 0.16)",
    backgroundColor: "#FAF7F0",
    fontSize: "0.875rem",
    color: "#172228",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "#49585F",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "0.4rem",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: "1360px", margin: "0 auto" }}>
      {/* Action Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#172228", margin: 0 }}>
            AI Prompt Configurations
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#49585F", margin: "0.25rem 0 0 0" }}>
            Manage custom writing styles and core system instructions for the AI Blog Generator.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
          <Link
            href="/authority/blogs"
            style={{
              padding: "0.6rem 1rem",
              fontSize: "0.84rem",
              fontWeight: 600,
              color: "#172228",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(23, 34, 40, 0.15)",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            ← Back to Blogs
          </Link>

          {prompts.length === 0 && (
            <button
              type="button"
              onClick={seedDefaultPrompts}
              style={{
                padding: "0.6rem 1.05rem",
                fontSize: "0.84rem",
                fontWeight: 600,
                color: "#065F46",
                backgroundColor: "#ECFDF5",
                border: "1px solid #A7F3D0",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Seed Default Prompts
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (!isCreating) {
                setIsCreating(true);
              } else {
                cancelEditing();
              }
            }}
            style={{
              padding: "0.6rem 1.2rem",
              fontSize: "0.84rem",
              fontWeight: 700,
              color: "#FFFFFF",
              backgroundColor: "#C65378",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(198, 83, 120, 0.25)",
            }}
          >
            {isCreating ? "Close Editor" : "+ Create New Profile"}
          </button>
        </div>
      </div>

      {/* Create / Edit Form */}
      {isCreating && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(23, 34, 40, 0.12)",
            borderRadius: "16px",
            padding: "1.75rem",
            boxShadow: "0 8px 28px rgba(23, 34, 40, 0.05)",
          }}
        >
          <div
            style={{
              paddingBottom: "1rem",
              marginBottom: "1.5rem",
              borderBottom: "1px solid rgba(23, 34, 40, 0.1)",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#172228", margin: 0 }}>
              {editingPrompt ? "Modify Prompt Profile" : "Create New Prompt Profile"}
            </h2>
          </div>

          <form
            onSubmit={handleCreateOrUpdatePrompt}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>Profile Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Comprehensive Succession Law Guide"
                  value={newPrompt.name}
                  onChange={(e) => setNewPrompt({ ...newPrompt, name: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Target Word Count *</label>
                <input
                  type="number"
                  required
                  min={500}
                  max={10000}
                  step={100}
                  value={newPrompt.targetWordCount}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, targetWordCount: Number(e.target.value) })
                  }
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Internal Description</label>
              <input
                type="text"
                placeholder="Brief summary of when to use this profile..."
                value={newPrompt.description}
                onChange={(e) => setNewPrompt({ ...newPrompt, description: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                Core Style &amp; Tone Instructions *
                <span
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    textTransform: "none",
                    color: "#49585F",
                    marginTop: "0.25rem",
                  }}
                >
                  Write the exact instructions for how the AI should tone, format, and structure the content. Note: The system automatically appends JSON and HTML output formatting rules to the end of this prompt, so you only need to focus on writing style, legal citations, and structure here.
                </span>
              </label>
              <textarea
                rows={12}
                required
                placeholder="Enter detailed system instructions here..."
                value={newPrompt.coreInstructions}
                onChange={(e) =>
                  setNewPrompt({ ...newPrompt, coreInstructions: e.target.value })
                }
                style={{
                  ...inputStyle,
                  fontFamily: "monospace",
                  lineHeight: 1.6,
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                id="isDefault"
                checked={newPrompt.isDefault}
                onChange={(e) => setNewPrompt({ ...newPrompt, isDefault: e.target.checked })}
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
              <label
                htmlFor="isDefault"
                style={{ fontSize: "0.86rem", fontWeight: 600, color: "#172228", cursor: "pointer" }}
              >
                Set as Default Profile
              </label>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.85rem",
                paddingTop: "1rem",
                borderTop: "1px solid rgba(23, 34, 40, 0.1)",
              }}
            >
              <button
                type="button"
                onClick={cancelEditing}
                style={{
                  padding: "0.65rem 1.35rem",
                  fontSize: "0.86rem",
                  fontWeight: 600,
                  color: "#172228",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(23, 34, 40, 0.2)",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "0.65rem 1.5rem",
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  backgroundColor: "#C65378",
                  border: "none",
                  borderRadius: "10px",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading
                  ? "Saving..."
                  : editingPrompt
                  ? "Update Profile"
                  : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing Prompts Table */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(23, 34, 40, 0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(23, 34, 40, 0.03)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#FAF7F0", borderBottom: "1px solid rgba(23, 34, 40, 0.1)" }}>
                <th style={{ padding: "0.9rem 1.25rem", fontSize: "0.74rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase" }}>
                  Profile Name
                </th>
                <th style={{ padding: "0.9rem 1.25rem", fontSize: "0.74rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase" }}>
                  Description
                </th>
                <th style={{ padding: "0.9rem 1.25rem", fontSize: "0.74rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase" }}>
                  Word Count
                </th>
                <th style={{ padding: "0.9rem 1.25rem", fontSize: "0.74rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase" }}>
                  Status
                </th>
                <th style={{ padding: "0.9rem 1.25rem", fontSize: "0.74rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && prompts.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "#49585F" }}>
                    Loading prompt profiles...
                  </td>
                </tr>
              ) : prompts.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "#49585F" }}>
                    No prompt profiles found. Click &quot;Seed Default Prompts&quot; above to initialize.
                  </td>
                </tr>
              ) : (
                prompts.map((prompt) => (
                  <tr key={prompt.id} style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.08)" }}>
                    <td style={{ padding: "1rem 1.25rem", whiteSpace: "nowrap" }}>
                      <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#172228" }}>
                        {prompt.name}
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ fontSize: "0.84rem", color: "#49585F", maxWidth: "460px" }}>
                        {prompt.description}
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.25rem", whiteSpace: "nowrap", fontSize: "0.84rem", color: "#49585F" }}>
                      ~{prompt.targetWordCount || 2500} words
                    </td>
                    <td style={{ padding: "1rem 1.25rem", whiteSpace: "nowrap" }}>
                      {prompt.isDefault ? (
                        <span
                          style={{
                            padding: "3px 10px",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            borderRadius: "999px",
                            backgroundColor: "#ECFDF5",
                            color: "#065F46",
                            border: "1px solid #A7F3D0",
                          }}
                        >
                          Default Profile
                        </span>
                      ) : (
                        <span
                          style={{
                            padding: "3px 10px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            borderRadius: "999px",
                            backgroundColor: "#FAF7F0",
                            color: "#49585F",
                          }}
                        >
                          Available
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "1rem 1.25rem", textAlign: "right", whiteSpace: "nowrap" }}>
                      <div style={{ display: "inline-flex", gap: "0.65rem", alignItems: "center" }}>
                        {!prompt.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefault(prompt)}
                            style={{
                              padding: "0.35rem 0.7rem",
                              fontSize: "0.76rem",
                              fontWeight: 600,
                              color: "#065F46",
                              backgroundColor: "#ECFDF5",
                              border: "1px solid #A7F3D0",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => startEditing(prompt)}
                          style={{
                            padding: "0.35rem 0.7rem",
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            color: "#C65378",
                            backgroundColor: "rgba(198, 83, 120, 0.1)",
                            border: "1px solid rgba(198, 83, 120, 0.25)",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePrompt(prompt.id)}
                          style={{
                            padding: "0.35rem 0.7rem",
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            color: "#DC2626",
                            backgroundColor: "#FEF2F2",
                            border: "1px solid #FECACA",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
