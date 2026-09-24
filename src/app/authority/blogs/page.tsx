"use client";

import React, { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  author: string;
  status: "PUBLISHED" | "DRAFT";
  createdAt: string;
}

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog_01",
    title: "Is a Will Valid on Plain Paper in India? The Legal Truth",
    slug: "is-will-valid-on-plain-paper-india",
    category: "Legal Insights",
    excerpt: "Under the Indian Succession Act, 1925, a will does NOT require stamp paper or registration to be court-valid.",
    author: "Senior Advocate",
    status: "PUBLISHED",
    createdAt: "2026-09-05",
  },
  {
    id: "blog_02",
    title: "How to Appoint Guardians for Minor Children in an Indian Will",
    slug: "appoint-guardians-minor-children-will",
    category: "Estate Planning",
    excerpt: "Crucial guidelines on appointing primary and alternate legal guardians to protect your minor children.",
    author: "Legal Desk",
    status: "PUBLISHED",
    createdAt: "2026-09-02",
  },
  {
    id: "blog_03",
    title: "Intestacy Laws in India: What Happens if You Die Without a Will?",
    slug: "intestacy-laws-india-without-will",
    category: "Succession Law",
    excerpt: "An overview of the Hindu Succession Act, Indian Succession Act, and personal laws governing intestate succession.",
    author: "Editorial Team",
    status: "DRAFT",
    createdAt: "2026-09-01",
  },
];

export default function AuthorityBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Legal Insights",
    excerpt: "",
    author: "Editorial Team",
    status: "DRAFT" as "PUBLISHED" | "DRAFT",
  });

  const handleOpenCreate = () => {
    setFormData({
      title: "",
      slug: "",
      category: "Legal Insights",
      excerpt: "",
      author: "Editorial Team",
      status: "PUBLISHED",
    });
    setEditingBlog(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      author: post.author,
      status: post.status,
    });
    setEditingBlog(post);
    setIsCreating(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug === "" || !editingBlog ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : prev.slug,
    }));
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBlog) {
      setBlogs((prev) =>
        prev.map((b) => (b.id === editingBlog.id ? { ...b, ...formData } : b))
      );
    } else {
      const newPost: BlogPost = {
        id: `blog_${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setBlogs([newPost, ...blogs]);
    }

    setIsCreating(false);
    setEditingBlog(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this article?")) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: b.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" } : b
      )
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ fontSize: "1.4rem", color: "var(--color-navy)", fontWeight: 700, margin: 0 }}>
          Blogs
        </h1>
        <button
          type="button"
          onClick={handleOpenCreate}
          style={{
            padding: "0.45rem 0.85rem",
            fontSize: "0.82rem",
            backgroundColor: "#0F172A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          New Post
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "var(--radius-md)", border: "1px solid #E2E8F0", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E2E8F0", textAlign: "left" }}>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Title</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Category</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Author</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Date</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--color-slate)" }}>
                  No articles found.
                </td>
              </tr>
            ) : (
              blogs.map((b) => (
                <tr key={b.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "0.7rem 0.75rem", maxWidth: "340px" }}>
                    <div style={{ fontWeight: 600, color: "var(--color-navy)" }}>{b.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--color-slate)", fontFamily: "monospace" }}>
                      /blog/{b.slug}
                    </div>
                  </td>
                  <td style={{ padding: "0.7rem 0.75rem", color: "var(--color-slate)" }}>{b.category}</td>
                  <td style={{ padding: "0.7rem 0.75rem", color: "var(--color-slate)" }}>{b.author}</td>
                  <td style={{ padding: "0.7rem 0.75rem" }}>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(b.id)}
                      style={{
                        padding: "0.15rem 0.45rem",
                        borderRadius: "3px",
                        border: "none",
                        backgroundColor: b.status === "PUBLISHED" ? "#DCFCE7" : "#F1F5F9",
                        color: b.status === "PUBLISHED" ? "#166534" : "#64748B",
                        fontWeight: 600,
                        fontSize: "0.72rem",
                        cursor: "pointer",
                      }}
                    >
                      {b.status}
                    </button>
                  </td>
                  <td style={{ padding: "0.7rem 0.75rem", color: "var(--color-slate)", fontSize: "0.75rem" }}>
                    {b.createdAt}
                  </td>
                  <td style={{ padding: "0.7rem 0.75rem", textAlign: "right", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(b)}
                        style={{ padding: "0.25rem 0.55rem", fontSize: "0.75rem", border: "1px solid #CBD5E1", background: "#FFFFFF", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(b.id)}
                        style={{ padding: "0.25rem 0.55rem", fontSize: "0.75rem", border: "1px solid #CBD5E1", background: "#FEF2F2", color: "#DC2626", borderRadius: "4px", cursor: "pointer" }}
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

      {/* MODAL: CREATE / EDIT */}
      {isCreating && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCreating(false);
          }}
        >
          <div style={{ width: "100%", maxWidth: "500px", backgroundColor: "#FFFFFF", borderRadius: "8px", padding: "1.5rem", border: "1px solid #E2E8F0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
                {editingBlog ? "Edit Post" : "New Post"}
              </h2>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                style={{ background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#64748B" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePost} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div>
                <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Article title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="form-input"
                  style={{ fontSize: "0.85rem", padding: "0.5rem" }}
                  autoFocus
                />
              </div>

              <div className="authority-form-row" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="form-input"
                    style={{ fontSize: "0.82rem", padding: "0.5rem", fontFamily: "monospace" }}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-input"
                    style={{ fontSize: "0.82rem", padding: "0.5rem" }}
                  >
                    <option value="Legal Insights">Legal Insights</option>
                    <option value="Estate Planning">Estate Planning</option>
                    <option value="Succession Law">Succession Law</option>
                    <option value="Guides">Guides</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                  Excerpt *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Short description..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="form-input"
                  style={{ fontSize: "0.82rem", padding: "0.5rem", resize: "vertical" }}
                />
              </div>

              <div className="authority-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                    Author *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="form-input"
                    style={{ fontSize: "0.82rem", padding: "0.5rem" }}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "PUBLISHED" | "DRAFT" })}
                    className="form-input"
                    style={{ fontSize: "0.82rem", padding: "0.5rem" }}
                  >
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem", background: "none", border: "1px solid #CBD5E1", borderRadius: "4px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "0.45rem 0.95rem", fontSize: "0.82rem", background: "#0F172A", color: "#FFFFFF", border: "none", borderRadius: "4px", fontWeight: 600, cursor: "pointer" }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responsive adjustments */}
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
