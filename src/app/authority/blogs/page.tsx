"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TiptapEditor from "./TiptapEditor";

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
}

export interface Review {
  id?: string;
  name: string;
  rating: number;
  review: string;
}

export interface Blog {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image: string;
  imageId?: string | null;
  infographic?: string;
  infographicId?: string | null;
  created: number;
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  author: string;
  authorRole?: string;
  category?: string;
  readTime?: string;
  status?: "PUBLISHED" | "DRAFT";
  keywords?: string[];
  shortVersion?: string[];
  actionSteps?: string[];
  faqs?: FAQ[];
  reviews?: Review[];
}

interface PromptProfile {
  id: string;
  name: string;
  description: string;
  coreInstructions: string;
  targetWordCount: number;
  isDefault: boolean;
}

const WILLDRAFTING_AUTHORS: Array<{ name: string; role: string }> = [
  {
    name: "Advocate Anuj Anand Malik",
    role: "Senior Succession Counsel, WillDrafting.in",
  },
];

async function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8
): Promise<{ dataUrl: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({
            dataUrl: String(event.target?.result || ""),
            mimeType: file.type || "image/jpeg",
          });
          return;
        }
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const outMime = "image/jpeg";
        resolve({
          dataUrl: canvas.toDataURL(outMime, quality),
          mimeType: outMime,
        });
      };
      img.onerror = (error) => reject(error);
      img.src = event.target?.result as string;
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export default function AuthorityBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingInfographic, setUploadingInfographic] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [infographicPreview, setInfographicPreview] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // AI Article Generation States
  const [primaryKeyword, setPrimaryKeyword] = useState("");
  const [prompts, setPrompts] = useState<PromptProfile[]>([]);
  const [selectedPromptId, setSelectedPromptId] = useState<string>("");
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);

  // AI Image & Infographic Generation States
  const [imagePrompt, setImagePrompt] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [generatedImageId, setGeneratedImageId] = useState<string | null>(null);

  const [infographicPrompt, setInfographicPrompt] = useState("");
  const [isGeneratingInfographic, setIsGeneratingInfographic] = useState(false);
  const [generatedInfographicUrl, setGeneratedInfographicUrl] = useState<string | null>(null);
  const [generatedInfographicId, setGeneratedInfographicId] = useState<string | null>(null);

  const emptyBlogState: Omit<Blog, "id"> = {
    title: "",
    subtitle: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    image: "",
    imageId: null,
    infographic: "",
    infographicId: null,
    created: Date.now(),
    metaTitle: "",
    metaDescription: "",
    slug: "",
    author: WILLDRAFTING_AUTHORS[0].name,
    authorRole: WILLDRAFTING_AUTHORS[0].role,
    category: "Indian Succession Law",
    readTime: "10 min",
    status: "PUBLISHED",
    keywords: [],
    shortVersion: [],
    actionSteps: [],
    faqs: [],
    reviews: [],
  };

  const [newBlog, setNewBlog] = useState<Omit<Blog, "id">>(emptyBlogState);

  const fetchBlogsAndPrompts = async () => {
    try {
      setLoading(true);
      const [blogsRes, promptsRes] = await Promise.all([
        fetch("/api/admin/blogs"),
        fetch("/api/admin/prompts"),
      ]);

      if (blogsRes.ok) {
        const bData = await blogsRes.json();
        const rawList = Array.isArray(bData.blogs) ? bData.blogs : [];
        const mapped: Blog[] = rawList.map((b: any) => ({
          id: b.id,
          title: b.title || "",
          subtitle: b.subtitle || "",
          description: b.description || "",
          date: b.date || new Date().toISOString().split("T")[0],
          image: b.image || "",
          imageId: b.imageId || null,
          infographic: b.infographic || "",
          infographicId: b.infographicId || null,
          created: b.createdAt ? new Date(b.createdAt).getTime() : Date.now(),
          metaTitle: b.metaTitle || "",
          metaDescription: b.metaDescription || "",
          slug: b.slug || "",
          author: b.author || WILLDRAFTING_AUTHORS[0].name,
          authorRole: b.authorRole || WILLDRAFTING_AUTHORS[0].role,
          category: b.category || "Indian Succession Law",
          readTime: b.readTime || "10 min",
          status: b.status || "PUBLISHED",
          keywords: Array.isArray(b.keywords) ? b.keywords : [],
          shortVersion: Array.isArray(b.shortVersion) ? b.shortVersion : [],
          actionSteps: Array.isArray(b.actionSteps) ? b.actionSteps : [],
          faqs: Array.isArray(b.faqs) ? b.faqs : [],
          reviews: Array.isArray(b.reviews) ? b.reviews : [],
        }));
        setBlogs(mapped);
      }

      if (promptsRes.ok) {
        const pData = await promptsRes.json();
        const promptList: PromptProfile[] = Array.isArray(pData.prompts) ? pData.prompts : [];
        setPrompts(promptList);
        const def = promptList.find((p) => p.isDefault) || promptList[0];
        if (def) {
          setSelectedPromptId(def.id);
        }
      }
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsAndPrompts();
  }, []);

  // Auto-save form state to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isCreating && (newBlog.title || newBlog.description || newBlog.subtitle)) {
        const autoSaveData = {
          newBlog,
          imagePreview,
          infographicPreview,
          editingBlogId: editingBlog?.id || null,
          timestamp: Date.now(),
        };
        try {
          localStorage.setItem("willdrafting_blogAutoSave", JSON.stringify(autoSaveData));
        } catch {
          // ignore storage quota errors
        }
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [newBlog, imagePreview, infographicPreview, isCreating, editingBlog]);

  const loadAutoSavedData = () => {
    try {
      const savedData = localStorage.getItem("willdrafting_blogAutoSave");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        const isRecent = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
        if (isRecent && parsed.newBlog) {
          if (
            window.confirm(
              "Found unsaved work from a previous session. Would you like to restore it?"
            )
          ) {
            setNewBlog(parsed.newBlog);
            setImagePreview(parsed.imagePreview || null);
            setInfographicPreview(parsed.infographicPreview || null);
            setIsCreating(true);
            return true;
          } else {
            localStorage.removeItem("willdrafting_blogAutoSave");
          }
        } else {
          localStorage.removeItem("willdrafting_blogAutoSave");
        }
      }
    } catch (error) {
      console.error("Error loading auto-saved data:", error);
      localStorage.removeItem("willdrafting_blogAutoSave");
    }
    return false;
  };

  const clearAutoSavedData = () => {
    localStorage.removeItem("willdrafting_blogAutoSave");
  };

  // Auto-generate URL slug and default metaTitle from title
  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    setNewBlog((prev) => ({
      ...prev,
      title,
      slug,
      metaTitle: prev.metaTitle === "" || prev.metaTitle === prev.title ? title : prev.metaTitle,
    }));
  };

  const handleAuthorChange = (authorName: string) => {
    const found = WILLDRAFTING_AUTHORS.find((a) => a.name === authorName);
    setNewBlog((prev) => ({
      ...prev,
      author: authorName,
      authorRole: found?.role || prev.authorRole || "Succession & Estate Counsel, WillDrafting.in",
    }));
  };

  // =========================================================================
  // AI Blog Generation (ChatGPT)
  // =========================================================================
  const handleGenerateArticle = async () => {
    if (!primaryKeyword.trim()) {
      alert("Please enter a primary keyword or topic first.");
      return;
    }

    try {
      setIsGeneratingArticle(true);
      const response = await fetch("/api/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primaryKeyword: primaryKeyword.trim(),
          promptId: selectedPromptId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const errorMsg = data.details
          ? `${data.error}: ${data.details}`
          : data.error || "Failed to generate blog";
        throw new Error(errorMsg);
      }

      const generatedFaqs: FAQ[] = Array.isArray(data.faqs)
        ? data.faqs.map((faq: any, index: number) => ({
            id: `gen-faq-${Date.now()}-${index}`,
            question: faq.question || "",
            answer: faq.answer || "",
          }))
        : [];

      const generatedReviews: Review[] = Array.isArray(data.reviews)
        ? data.reviews.map((rev: any, index: number) => ({
            id: `gen-rev-${Date.now()}-${index}`,
            name: rev.name || "Verified Client",
            rating: Number(rev.rating) || 5,
            review: rev.review || "",
          }))
        : [];

      setNewBlog((prev) => ({
        ...prev,
        title: data.title || prev.title,
        subtitle: data.subtitle || prev.subtitle,
        slug: data.slug || prev.slug,
        metaTitle: data.metaTitle || data.title || prev.metaTitle,
        metaDescription: data.metaDescription || data.subtitle || prev.metaDescription,
        description: data.description || prev.description,
        category: data.category || prev.category,
        readTime: data.readTime || prev.readTime,
        keywords: Array.isArray(data.keywords) ? data.keywords : prev.keywords,
        shortVersion: Array.isArray(data.shortVersion) ? data.shortVersion : prev.shortVersion,
        actionSteps: Array.isArray(data.actionSteps) ? data.actionSteps : prev.actionSteps,
        faqs: generatedFaqs.length > 0 ? generatedFaqs : prev.faqs,
        reviews: generatedReviews.length > 0 ? generatedReviews : prev.reviews,
      }));

      if (data.suggestedImagePrompt) {
        setImagePrompt(data.suggestedImagePrompt);
      }
      if (data.suggestedInfographicPrompt) {
        setInfographicPrompt(data.suggestedInfographicPrompt);
      }

      alert("Blog content, FAQs, and image prompts generated! Please review the fields below.");
    } catch (error) {
      console.error("Error generating blog:", error);
      alert(error instanceof Error ? error.message : "Failed to generate blog");
    } finally {
      setIsGeneratingArticle(false);
    }
  };

  // =========================================================================
  // 1. Featured Cover Image (AI Generate + Save & Use as Cover + Local Upload)
  // =========================================================================
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim() && !newBlog.title.trim()) {
      alert("Please enter a prompt or blog title for the cover image.");
      return;
    }

    try {
      setIsGeneratingImage(true);
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: imagePrompt.trim(),
          blogTitle: newBlog.title.trim(),
          kind: "cover",
          blogSlug: newBlog.slug || null,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.imageUrl) {
        const errorMsg = data.details
          ? `${data.error}: ${data.details}`
          : data.error || "Failed to generate cover image";
        throw new Error(errorMsg);
      }

      setGeneratedImageUrl(data.imageUrl);
      setGeneratedImageId(data.imageId || null);
    } catch (error) {
      console.error("Error generating cover image:", error);
      alert(error instanceof Error ? error.message : "Failed to generate cover image");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleUploadGeneratedImage = async () => {
    if (!generatedImageUrl) return;
    try {
      setUploadingImage(true);
      setNewBlog((prev) => ({
        ...prev,
        image: generatedImageUrl,
        imageId: generatedImageId || prev.imageId || null,
      }));
      setImagePreview(generatedImageUrl);
      setGeneratedImageUrl(null);
      setGeneratedImageId(null);
      setImagePrompt("");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    try {
      setUploadingImage(true);
      const compressed = await compressImage(file, 1200, 1200, 0.82);
      const response = await fetch("/api/blog-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64: compressed.dataUrl,
          mimeType: compressed.mimeType,
          filename: file.name,
          kind: "cover",
          blogSlug: newBlog.slug || null,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.imageUrl) {
        throw new Error(data.error || "Failed to upload cover image");
      }

      setNewBlog((prev) => ({
        ...prev,
        image: data.imageUrl,
        imageId: data.imageId || null,
      }));
      setImagePreview(data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("Image size should be less than 10MB.");
        return;
      }
      void handleImageUpload(file);
    }
  };

  // =========================================================================
  // 2. Topic Infographic (AI Generate + Save & Set as Infographic + Local Upload)
  // =========================================================================
  const handleGenerateInfographic = async () => {
    if (!infographicPrompt.trim() && !newBlog.title.trim()) {
      alert("Please enter a prompt or blog title for the infographic.");
      return;
    }

    try {
      setIsGeneratingInfographic(true);
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: infographicPrompt.trim(),
          blogTitle: newBlog.title.trim(),
          kind: "infographic",
          blogSlug: newBlog.slug || null,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.imageUrl) {
        const errorMsg = data.details
          ? `${data.error}: ${data.details}`
          : data.error || "Failed to generate infographic";
        throw new Error(errorMsg);
      }

      setGeneratedInfographicUrl(data.imageUrl);
      setGeneratedInfographicId(data.imageId || null);
    } catch (error) {
      console.error("Error generating infographic:", error);
      alert(error instanceof Error ? error.message : "Failed to generate infographic");
    } finally {
      setIsGeneratingInfographic(false);
    }
  };

  const handleUploadGeneratedInfographic = async () => {
    if (!generatedInfographicUrl) return;
    try {
      setUploadingInfographic(true);
      setNewBlog((prev) => ({
        ...prev,
        infographic: generatedInfographicUrl,
        infographicId: generatedInfographicId || prev.infographicId || null,
      }));
      setInfographicPreview(generatedInfographicUrl);
      setGeneratedInfographicUrl(null);
      setGeneratedInfographicId(null);
      setInfographicPrompt("");
    } finally {
      setUploadingInfographic(false);
    }
  };

  const handleInfographicUpload = async (file: File) => {
    if (!file) return;
    try {
      setUploadingInfographic(true);
      const compressed = await compressImage(file, 1400, 1400, 0.85);
      const response = await fetch("/api/blog-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64: compressed.dataUrl,
          mimeType: compressed.mimeType,
          filename: file.name,
          kind: "infographic",
          blogSlug: newBlog.slug || null,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.imageUrl) {
        throw new Error(data.error || "Failed to upload infographic");
      }

      setNewBlog((prev) => ({
        ...prev,
        infographic: data.imageUrl,
        infographicId: data.imageId || null,
      }));
      setInfographicPreview(data.imageUrl);
    } catch (error) {
      console.error("Error uploading infographic:", error);
      alert("Failed to upload infographic. Please try again.");
    } finally {
      setUploadingInfographic(false);
    }
  };

  const handleInfographicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file for the infographic.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("Infographic size should be less than 10MB.");
        return;
      }
      void handleInfographicUpload(file);
    }
  };

  // =========================================================================
  // FAQ & Review Management (Identical to AMA Legal Solutions)
  // =========================================================================
  const addFAQ = () => {
    setNewBlog((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { id: Date.now().toString(), question: "", answer: "" }],
    }));
  };

  const removeFAQ = (index: number) => {
    setNewBlog((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, i) => i !== index),
    }));
  };

  const handleFAQChange = (index: number, field: "question" | "answer", value: string) => {
    setNewBlog((prev) => {
      const updated = [...(prev.faqs || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, faqs: updated };
    });
  };

  const addReview = () => {
    setNewBlog((prev) => ({
      ...prev,
      reviews: [
        ...(prev.reviews || []),
        { id: Date.now().toString(), name: "", rating: 5, review: "" },
      ],
    }));
  };

  const removeReview = (index: number) => {
    setNewBlog((prev) => ({
      ...prev,
      reviews: (prev.reviews || []).filter((_, i) => i !== index),
    }));
  };

  const handleReviewChange = (
    index: number,
    field: "name" | "rating" | "review",
    value: string | number
  ) => {
    setNewBlog((prev) => {
      const updated = [...(prev.reviews || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, reviews: updated };
    });
  };

  // =========================================================================
  // Create / Update / Delete / Edit Blog
  // =========================================================================
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const finalCoverImage = newBlog.image || generatedImageUrl || "";
      const finalInfographic = newBlog.infographic || generatedInfographicUrl || "";

      const payload = {
        ...newBlog,
        image: finalCoverImage,
        imageId: newBlog.imageId || generatedImageId || null,
        infographic: finalInfographic,
        infographicId: newBlog.infographicId || generatedInfographicId || null,
        metaTitle: newBlog.metaTitle || `${newBlog.title} | WillDrafting.in`,
        metaDescription: newBlog.metaDescription || newBlog.subtitle || newBlog.title,
      };

      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to publish blog post");
      }

      setNewBlog(emptyBlogState);
      setImagePreview(null);
      setInfographicPreview(null);
      setGeneratedImageUrl(null);
      setGeneratedInfographicUrl(null);
      setIsCreating(false);
      clearAutoSavedData();
      await fetchBlogsAndPrompts();
    } catch (error) {
      console.error("Error creating blog:", error);
      alert(error instanceof Error ? error.message : "Failed to publish blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.id) return;

    try {
      setLoading(true);
      const finalCoverImage = newBlog.image || generatedImageUrl || "";
      const finalInfographic = newBlog.infographic || generatedInfographicUrl || "";

      const payload = {
        ...newBlog,
        image: finalCoverImage,
        imageId: newBlog.imageId || generatedImageId || null,
        infographic: finalInfographic,
        infographicId: newBlog.infographicId || generatedInfographicId || null,
        metaTitle: newBlog.metaTitle || `${newBlog.title} | WillDrafting.in`,
        metaDescription: newBlog.metaDescription || newBlog.subtitle || newBlog.title,
      };

      const res = await fetch(`/api/admin/blogs/${editingBlog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update blog post");
      }

      setEditingBlog(null);
      setNewBlog(emptyBlogState);
      setImagePreview(null);
      setInfographicPreview(null);
      setGeneratedImageUrl(null);
      setGeneratedInfographicUrl(null);
      setIsCreating(false);
      clearAutoSavedData();
      await fetchBlogsAndPrompts();
    } catch (error) {
      console.error("Error updating blog:", error);
      alert(error instanceof Error ? error.message : "Failed to update blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      await fetchBlogsAndPrompts();
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (blog: Blog) => {
    setEditingBlog(blog);
    setNewBlog({
      title: blog.title || "",
      subtitle: blog.subtitle || "",
      description: blog.description || "",
      date: blog.date || new Date().toISOString().split("T")[0],
      image: blog.image || "",
      imageId: blog.imageId || null,
      infographic: blog.infographic || "",
      infographicId: blog.infographicId || null,
      created: blog.created || Date.now(),
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      slug: blog.slug || "",
      author: blog.author || WILLDRAFTING_AUTHORS[0].name,
      authorRole: blog.authorRole || WILLDRAFTING_AUTHORS[0].role,
      category: blog.category || "Indian Succession Law",
      readTime: blog.readTime || "10 min",
      status: blog.status || "PUBLISHED",
      keywords: blog.keywords || [],
      shortVersion: blog.shortVersion || [],
      actionSteps: blog.actionSteps || [],
      faqs: blog.faqs || [],
      reviews: blog.reviews || [],
    });
    setImagePreview(blog.image || null);
    setInfographicPreview(blog.infographic || null);
    setGeneratedImageUrl(null);
    setGeneratedInfographicUrl(null);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditing = () => {
    setEditingBlog(null);
    setIsCreating(false);
    setImagePreview(null);
    setInfographicPreview(null);
    setGeneratedImageUrl(null);
    setGeneratedInfographicUrl(null);
    setNewBlog(emptyBlogState);
    clearAutoSavedData();
  };

  // Filter and search blogs
  const filteredBlogs = blogs.filter((blog) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      (blog.title || "").toLowerCase().includes(q) ||
      (blog.subtitle || "").toLowerCase().includes(q) ||
      (blog.author || "").toLowerCase().includes(q);
    const matchesFilter = filterBy === "all" || blog.author === filterBy;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalItems = filteredBlogs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const exportToCSV = () => {
    if (blogs.length === 0) {
      alert("No data to export");
      return;
    }

    const csvHeaders = [
      "ID",
      "Title",
      "Subtitle",
      "Author",
      "Date",
      "Slug",
      "Image URL",
      "Infographic URL",
      "FAQs Count",
      "Reviews Count",
    ];
    const csvRows = [csvHeaders.join(",")];

    blogs.forEach((b) => {
      const escapeCSV = (str: any) => {
        if (str === null || str === undefined) return '""';
        const stringified = String(str);
        return `"${stringified.replace(/"/g, '""')}"`;
      };

      const row = [
        escapeCSV(b.id),
        escapeCSV(b.title),
        escapeCSV(b.subtitle),
        escapeCSV(b.author),
        escapeCSV(b.date),
        escapeCSV(b.slug),
        escapeCSV(b.image),
        escapeCSV(b.infographic),
        escapeCSV(b.faqs?.length || 0),
        escapeCSV(b.reviews?.length || 0),
      ];
      csvRows.push(row.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `blogs_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            Curated Blog Dashboard
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#49585F", margin: "0.25rem 0 0 0" }}>
            Manage, optimize, and publish high-intent legal blogs.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
          <Link
            href="/authority/prompts"
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
            AI Prompts
          </Link>

          <button
            type="button"
            onClick={exportToCSV}
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
            Export CSV
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isCreating) {
                const restored = loadAutoSavedData();
                if (!restored) {
                  setIsCreating(true);
                }
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
            {isCreating ? "Close Editor" : "+ Write Blog Post"}
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(23, 34, 40, 0.1)",
            borderRadius: "14px",
            padding: "1.25rem 1.5rem",
            boxShadow: "0 2px 6px rgba(23, 34, 40, 0.03)",
          }}
        >
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase", margin: 0 }}>
            Total Published Blogs
          </p>
          <p style={{ fontSize: "1.85rem", fontWeight: 800, color: "#172228", margin: "0.35rem 0 0 0" }}>
            {blogs.length}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(23, 34, 40, 0.1)",
            borderRadius: "14px",
            padding: "1.25rem 1.5rem",
            boxShadow: "0 2px 6px rgba(23, 34, 40, 0.03)",
          }}
        >
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase", margin: 0 }}>
            TOC &amp; SEO Enriched
          </p>
          <p style={{ fontSize: "1.85rem", fontWeight: 800, color: "#059669", margin: "0.35rem 0 0 0" }}>
            {blogs.filter((b) => b.metaTitle && b.metaDescription).length}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(23, 34, 40, 0.1)",
            borderRadius: "14px",
            padding: "1.25rem 1.5rem",
            boxShadow: "0 2px 6px rgba(23, 34, 40, 0.03)",
          }}
        >
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase", margin: 0 }}>
            FAQs Embedded
          </p>
          <p style={{ fontSize: "1.85rem", fontWeight: 800, color: "#C65378", margin: "0.35rem 0 0 0" }}>
            {blogs.reduce((acc, b) => acc + (b.faqs?.length || 0), 0)}
          </p>
        </div>
      </div>

      {/* Create / Edit Blog Form */}
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
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "1rem",
              marginBottom: "1.5rem",
              borderBottom: "1px solid rgba(23, 34, 40, 0.1)",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#172228", margin: 0 }}>
                {editingBlog ? "Modify Blog Post Details" : "Publish a New Blog Post"}
              </h2>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#49585F",
                  backgroundColor: "#FAF7F0",
                  border: "1px solid rgba(23, 34, 40, 0.12)",
                  padding: "3px 10px",
                  borderRadius: "999px",
                }}
              >
                Auto-save Active
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (loadAutoSavedData()) {
                  alert("Draft restored!");
                } else {
                  alert("No recent draft found in browser cache.");
                }
              }}
              style={{
                padding: "0.4rem 0.85rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#172228",
                backgroundColor: "#FAF7F0",
                border: "1px solid rgba(23, 34, 40, 0.14)",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Restore Draft
            </button>
          </div>

          <form
            onSubmit={editingBlog ? handleUpdateBlog : handleCreateBlog}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* AI Writeup Auto-Generator (ChatGPT) - Identical to AMA */}
            <div
              style={{
                backgroundColor: "#FAF7F0",
                border: "1px solid rgba(198, 83, 120, 0.25)",
                borderRadius: "14px",
                padding: "1.25rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#172228",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.65rem",
                }}
              >
                <span>✨ AI Writeup Auto-Generator (ChatGPT)</span>
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <textarea
                  rows={5}
                  value={primaryKeyword}
                  onChange={(e) => setPrimaryKeyword(e.target.value)}
                  placeholder="Enter primary keyword, draft notes, or transcripts for the legal blog here..."
                  disabled={isGeneratingArticle}
                  style={{
                    ...inputStyle,
                    backgroundColor: "#FFFFFF",
                    resize: "vertical",
                    lineHeight: 1.6,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  {prompts.length > 0 && (
                    <div style={{ flex: "1 1 280px" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.74rem",
                          fontWeight: 600,
                          color: "#49585F",
                          marginBottom: "0.3rem",
                        }}
                      >
                        Select AI Prompt Profile
                      </label>
                      <select
                        value={selectedPromptId}
                        onChange={(e) => setSelectedPromptId(e.target.value)}
                        disabled={isGeneratingArticle}
                        style={{
                          ...inputStyle,
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        {prompts.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} {p.isDefault ? "(Default)" : ""} - ~{p.targetWordCount || 2500} words
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleGenerateArticle}
                    disabled={isGeneratingArticle || !primaryKeyword.trim()}
                    style={{
                      padding: "0.7rem 1.4rem",
                      fontSize: "0.86rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      backgroundColor:
                        isGeneratingArticle || !primaryKeyword.trim()
                          ? "#9CA3AF"
                          : "#172228",
                      border: "none",
                      borderRadius: "10px",
                      cursor:
                        isGeneratingArticle || !primaryKeyword.trim()
                          ? "not-allowed"
                          : "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isGeneratingArticle ? "Generating Content..." : "✨ Generate Blog with AI"}
                  </button>
                </div>
              </div>
              <p style={{ fontSize: "0.76rem", color: "#49585F", margin: "0.6rem 0 0 0" }}>
                Automatically writes the full blog post, title, URL slug, FAQs, and image prompts.
              </p>
            </div>

            {/* Main Form Fields - Identical 2-Column Grid to AMA Legal Solutions */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
              {/* Title */}
              <div>
                <label style={labelStyle}>Blog Title *</label>
                <input
                  type="text"
                  required
                  value={newBlog.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., How to Draft and Register a Valid Will in India"
                  style={inputStyle}
                />
              </div>

              {/* Subtitle */}
              <div>
                <label style={labelStyle}>Subtitle Block</label>
                <input
                  type="text"
                  value={newBlog.subtitle}
                  onChange={(e) => setNewBlog({ ...newBlog, subtitle: e.target.value })}
                  placeholder="e.g., Step-by-step legal breakdown under the Indian Succession Act"
                  style={inputStyle}
                />
              </div>

              {/* Slug */}
              <div>
                <label style={labelStyle}>
                  URL Slug *{" "}
                  <span style={{ fontWeight: 400, textTransform: "none", color: "#6B7280", fontStyle: "italic" }}>
                    (only letters, numbers, hyphens)
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={newBlog.slug}
                  onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                  placeholder="e.g., how-to-draft-valid-will-india"
                  style={{ ...inputStyle, fontFamily: "monospace" }}
                />
              </div>

              {/* Meta Title */}
              <div>
                <label style={labelStyle}>Custom Meta Title</label>
                <input
                  type="text"
                  value={newBlog.metaTitle || ""}
                  onChange={(e) => setNewBlog({ ...newBlog, metaTitle: e.target.value })}
                  placeholder="Defaults to post title if left blank"
                  style={inputStyle}
                />
              </div>

              {/* Meta Description */}
              <div>
                <label style={labelStyle}>Custom Meta Description</label>
                <input
                  type="text"
                  value={newBlog.metaDescription || ""}
                  onChange={(e) => setNewBlog({ ...newBlog, metaDescription: e.target.value })}
                  placeholder="Short description for Google snippet"
                  style={inputStyle}
                />
              </div>

              {/* Date */}
              <div>
                <label style={labelStyle}>Publication Date *</label>
                <input
                  type="date"
                  required
                  value={newBlog.date}
                  onChange={(e) => setNewBlog({ ...newBlog, date: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Author */}
              <div>
                <label style={labelStyle}>Featured Author Profile</label>
                <select
                  value={newBlog.author}
                  onChange={(e) => handleAuthorChange(e.target.value)}
                  style={inputStyle}
                >
                  {WILLDRAFTING_AUTHORS.map((a) => (
                    <option key={a.name} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Media Uploads: 1. Cover Image & 2. Topic Infographic */}
            <div
              style={{
                backgroundColor: "#FAF7F0",
                border: "1px solid rgba(23, 34, 40, 0.12)",
                borderRadius: "14px",
                padding: "1.35rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* 1. Featured Cover Image */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#172228",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: "0.75rem",
                  }}
                >
                  1. Featured Cover Image *{" "}
                  <span style={{ fontWeight: 400, textTransform: "none", color: "#49585F" }}>
                    (and AI Cover Generation)
                  </span>
                </label>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {/* AI Cover Generation Input */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
                    <input
                      type="text"
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="Describe cover image for AI generation..."
                      disabled={isGeneratingImage || uploadingImage}
                      style={{ ...inputStyle, flex: "1 1 280px", backgroundColor: "#FFFFFF" }}
                    />
                    <button
                      type="button"
                      onClick={handleGenerateImage}
                      disabled={isGeneratingImage || uploadingImage || !imagePrompt.trim()}
                      style={{
                        padding: "0.65rem 1.2rem",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        backgroundColor:
                          isGeneratingImage || uploadingImage || !imagePrompt.trim()
                            ? "#9CA3AF"
                            : "#C65378",
                        border: "none",
                        borderRadius: "10px",
                        cursor:
                          isGeneratingImage || uploadingImage || !imagePrompt.trim()
                            ? "not-allowed"
                            : "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isGeneratingImage ? "Generating..." : "✨ Generate Cover AI"}
                    </button>
                  </div>

                  {/* Generated Cover Preview */}
                  {generatedImageUrl && (
                    <div
                      style={{
                        padding: "1rem",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid rgba(198, 83, 120, 0.35)",
                        borderRadius: "12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          color: "#C65378",
                          textTransform: "uppercase",
                        }}
                      >
                        AI Cover Image Ready
                      </span>
                      <img width={800} height={450}
                        src={generatedImageUrl}
                        alt="AI Generated Cover"
                        style={{
                          maxHeight: "220px",
                          width: "auto",
                          borderRadius: "8px",
                          border: "1px solid rgba(23, 34, 40, 0.1)",
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleUploadGeneratedImage}
                        disabled={uploadingImage}
                        style={{
                          padding: "0.55rem 1.2rem",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#FFFFFF",
                          backgroundColor: "#059669",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        {uploadingImage ? "Saving Cover..." : "Save & Use as Cover"}
                      </button>
                    </div>
                  )}

                  {/* Cover URL & Local Upload */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", alignItems: "center" }}>
                    <input
                      type="text"
                      required={!generatedImageUrl}
                      value={newBlog.image}
                      onChange={(e) => {
                        setNewBlog({ ...newBlog, image: e.target.value });
                        setImagePreview(e.target.value || null);
                      }}
                      placeholder="Cover image URL..."
                      style={{ ...inputStyle, flex: "1 1 280px", backgroundColor: "#FFFFFF" }}
                    />
                    <div style={{ position: "relative" }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploadingImage}
                        id="cover-upload-input"
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="cover-upload-input"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "0.65rem 1.15rem",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#172228",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid rgba(23, 34, 40, 0.18)",
                          borderRadius: "10px",
                          cursor: uploadingImage ? "not-allowed" : "pointer",
                        }}
                      >
                        {uploadingImage ? "Uploading..." : "Upload Local"}
                      </label>
                    </div>
                  </div>

                  {/* Active Cover Image Preview */}
                  {(imagePreview || newBlog.image) && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.85rem",
                        padding: "0.65rem 0.9rem",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px",
                        border: "1px solid rgba(23, 34, 40, 0.1)",
                      }}
                    >
                      <img width={800} height={450}
                        src={imagePreview || newBlog.image}
                        alt="Cover Preview"
                        style={{
                          height: "52px",
                          width: "80px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          border: "1px solid rgba(23, 34, 40, 0.1)",
                        }}
                      />
                      <div>
                        <span style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#059669" }}>
                          Cover Image Active
                        </span>
                        <span style={{ fontSize: "0.74rem", color: "#49585F" }}>
                          Link: {newBlog.image}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid rgba(23, 34, 40, 0.1)", margin: 0 }} />

              {/* 2. Topic Infographic */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#172228",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: "0.75rem",
                  }}
                >
                  2. Topic Infographic (Charts, Data &amp; Graphs) -{" "}
                  <span style={{ fontWeight: 400, textTransform: "none", color: "#49585F" }}>
                    Optional
                  </span>
                </label>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {/* AI Infographic Generation Input */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
                    <input
                      type="text"
                      value={infographicPrompt}
                      onChange={(e) => setInfographicPrompt(e.target.value)}
                      placeholder="Describe data/stats for AI infographic..."
                      disabled={isGeneratingInfographic || uploadingInfographic}
                      style={{ ...inputStyle, flex: "1 1 280px", backgroundColor: "#FFFFFF" }}
                    />
                    <button
                      type="button"
                      onClick={handleGenerateInfographic}
                      disabled={
                        isGeneratingInfographic || uploadingInfographic || !infographicPrompt.trim()
                      }
                      style={{
                        padding: "0.65rem 1.2rem",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        backgroundColor:
                          isGeneratingInfographic ||
                          uploadingInfographic ||
                          !infographicPrompt.trim()
                            ? "#9CA3AF"
                            : "#172228",
                        border: "none",
                        borderRadius: "10px",
                        cursor:
                          isGeneratingInfographic ||
                          uploadingInfographic ||
                          !infographicPrompt.trim()
                            ? "not-allowed"
                            : "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isGeneratingInfographic ? "Generating..." : "📊 Generate Infographic AI"}
                    </button>
                  </div>

                  {/* Generated Infographic Preview */}
                  {generatedInfographicUrl && (
                    <div
                      style={{
                        padding: "1rem",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid rgba(23, 34, 40, 0.25)",
                        borderRadius: "12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          color: "#172228",
                          textTransform: "uppercase",
                        }}
                      >
                        AI Infographic Ready
                      </span>
                      <img width={800} height={450}
                        src={generatedInfographicUrl}
                        alt="AI Generated Infographic"
                        style={{
                          maxHeight: "220px",
                          width: "auto",
                          borderRadius: "8px",
                          border: "1px solid rgba(23, 34, 40, 0.1)",
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleUploadGeneratedInfographic}
                        disabled={uploadingInfographic}
                        style={{
                          padding: "0.55rem 1.2rem",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#FFFFFF",
                          backgroundColor: "#059669",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        {uploadingInfographic ? "Saving Infographic..." : "Save & Set as Infographic"}
                      </button>
                    </div>
                  )}

                  {/* Infographic URL & Local Upload */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", alignItems: "center" }}>
                    <input
                      type="text"
                      value={newBlog.infographic || ""}
                      onChange={(e) => {
                        setNewBlog({ ...newBlog, infographic: e.target.value });
                        setInfographicPreview(e.target.value || null);
                      }}
                      placeholder="Infographic image URL (optional)..."
                      style={{ ...inputStyle, flex: "1 1 280px", backgroundColor: "#FFFFFF" }}
                    />
                    <div style={{ position: "relative" }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleInfographicFileChange}
                        disabled={uploadingInfographic}
                        id="infographic-upload-input"
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="infographic-upload-input"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "0.65rem 1.15rem",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#172228",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid rgba(23, 34, 40, 0.18)",
                          borderRadius: "10px",
                          cursor: uploadingInfographic ? "not-allowed" : "pointer",
                        }}
                      >
                        {uploadingInfographic ? "Uploading..." : "Upload Local"}
                      </label>
                    </div>

                    {(infographicPreview || newBlog.infographic) && (
                      <button
                        type="button"
                        onClick={() => {
                          setNewBlog({ ...newBlog, infographic: "", infographicId: null });
                          setInfographicPreview(null);
                        }}
                        style={{
                          padding: "0.65rem 0.95rem",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#DC2626",
                          backgroundColor: "#FEF2F2",
                          border: "1px solid #FECACA",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Active Infographic Preview */}
                  {(infographicPreview || newBlog.infographic) && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.85rem",
                        padding: "0.65rem 0.9rem",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px",
                        border: "1px solid rgba(23, 34, 40, 0.1)",
                      }}
                    >
                      <img width={800} height={450}
                        src={infographicPreview || newBlog.infographic}
                        alt="Infographic Preview"
                        style={{
                          height: "52px",
                          width: "80px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          border: "1px solid rgba(23, 34, 40, 0.1)",
                        }}
                      />
                      <div>
                        <span style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#172228" }}>
                          Infographic Active
                        </span>
                        <span style={{ fontSize: "0.74rem", color: "#49585F" }}>
                          Placed automatically in the middle of the blog post ({newBlog.infographic})
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Blog Content Body (TiptapEditor) */}
            <div>
              <label style={labelStyle}>Detailed Blog Content Body</label>
              <TiptapEditor
                content={newBlog.description}
                onChange={(content) => setNewBlog({ ...newBlog, description: content })}
                placeholder="Start writing or paste your detailed blog content here..."
                blogSlug={newBlog.slug}
              />
            </div>

            {/* FAQs Section */}
            <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(23, 34, 40, 0.1)" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#172228", margin: 0 }}>
                    Crawlable Q&amp;A (FAQ Schema)
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "#49585F", margin: "0.2rem 0 0 0" }}>
                    Add common questions and answers for readers and search engines.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addFAQ}
                  style={{
                    padding: "0.45rem 0.9rem",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#C65378",
                    backgroundColor: "rgba(198, 83, 120, 0.1)",
                    border: "1px solid rgba(198, 83, 120, 0.25)",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  + Add FAQ Item
                </button>
              </div>

              {(newBlog.faqs || []).length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "1.5rem",
                    backgroundColor: "#FAF7F0",
                    borderRadius: "12px",
                    border: "1px dashed rgba(23, 34, 40, 0.2)",
                    color: "#49585F",
                    fontSize: "0.84rem",
                  }}
                >
                  No FAQs added yet. Click &quot;+ Add FAQ Item&quot; to add questions.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {(newBlog.faqs || []).map((faq, index) => (
                    <div
                      key={faq.id || index}
                      style={{
                        backgroundColor: "#FAF7F0",
                        padding: "1rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(23, 34, 40, 0.12)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.65rem",
                        }}
                      >
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#172228", textTransform: "uppercase" }}>
                          Question #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFAQ(index)}
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: "#DC2626",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Remove Question
                        </button>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        <input
                          type="text"
                          placeholder="Question (e.g., Is registration of a Will mandatory in India?)"
                          value={faq.question}
                          onChange={(e) => handleFAQChange(index, "question", e.target.value)}
                          style={{ ...inputStyle, backgroundColor: "#FFFFFF" }}
                        />
                        <textarea
                          rows={3}
                          placeholder="Detailed Answer..."
                          value={faq.answer}
                          onChange={(e) => handleFAQChange(index, "answer", e.target.value)}
                          style={{ ...inputStyle, backgroundColor: "#FFFFFF", resize: "vertical" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Client Testimonials (Review Schema) */}
            <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(23, 34, 40, 0.1)" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#172228", margin: 0 }}>
                    Client Testimonials (Review Schema)
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "#49585F", margin: "0.2rem 0 0 0" }}>
                    Add client reviews for this topic.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addReview}
                  style={{
                    padding: "0.45rem 0.9rem",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#059669",
                    backgroundColor: "#ECFDF5",
                    border: "1px solid #A7F3D0",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  + Add Review
                </button>
              </div>

              {(newBlog.reviews || []).length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "1.5rem",
                    backgroundColor: "#FAF7F0",
                    borderRadius: "12px",
                    border: "1px dashed rgba(23, 34, 40, 0.2)",
                    color: "#49585F",
                    fontSize: "0.84rem",
                  }}
                >
                  No reviews added yet. Click &quot;+ Add Review&quot; to add client testimonials.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {(newBlog.reviews || []).map((rev, index) => (
                    <div
                      key={rev.id || index}
                      style={{
                        backgroundColor: "#FAF7F0",
                        padding: "1rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(23, 34, 40, 0.12)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.65rem",
                        }}
                      >
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#172228", textTransform: "uppercase" }}>
                          Review #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeReview(index)}
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: "#DC2626",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Remove Review
                        </button>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "0.75rem", marginBottom: "0.6rem" }}>
                        <input
                          type="text"
                          placeholder="Client Name"
                          value={rev.name}
                          onChange={(e) => handleReviewChange(index, "name", e.target.value)}
                          style={{ ...inputStyle, backgroundColor: "#FFFFFF" }}
                        />
                        <select
                          value={rev.rating}
                          onChange={(e) => handleReviewChange(index, "rating", Number(e.target.value))}
                          style={{ ...inputStyle, backgroundColor: "#FFFFFF" }}
                        >
                          {[5, 4, 3, 2, 1].map((num) => (
                            <option key={num} value={num}>
                              {num} Stars
                            </option>
                          ))}
                        </select>
                      </div>

                      <textarea
                        rows={3}
                        placeholder="Client Review..."
                        value={rev.review}
                        onChange={(e) => handleReviewChange(index, "review", e.target.value)}
                        style={{ ...inputStyle, backgroundColor: "#FFFFFF", resize: "vertical" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
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
                  ? "Saving Changes..."
                  : editingBlog
                  ? "Update Blog Post"
                  : "Publish Blog Post"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(23, 34, 40, 0.1)",
          borderRadius: "14px",
          padding: "1rem 1.25rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Search blogs by title, subtitle, or author..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{ ...inputStyle, flex: "1 1 320px" }}
        />

        <select
          value={filterBy}
          onChange={(e) => {
            setFilterBy(e.target.value);
            setCurrentPage(1);
          }}
          style={{ ...inputStyle, width: "auto", minWidth: "220px" }}
        >
          <option value="all">All Authors</option>
          {WILLDRAFTING_AUTHORS.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* Blogs Table */}
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
                  Blog Details
                </th>
                <th style={{ padding: "0.9rem 1.25rem", fontSize: "0.74rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase" }}>
                  Publication Date
                </th>
                <th style={{ padding: "0.9rem 1.25rem", fontSize: "0.74rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase" }}>
                  Author
                </th>
                <th style={{ padding: "0.9rem 1.25rem", fontSize: "0.74rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase" }}>
                  SEO Assets
                </th>
                <th style={{ padding: "0.9rem 1.25rem", fontSize: "0.74rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "#49585F" }}>
                    Loading blogs...
                  </td>
                </tr>
              ) : currentBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "#49585F" }}>
                    No blog posts found. Click &quot;+ Write Blog Post&quot; above to create one.
                  </td>
                </tr>
              ) : (
                currentBlogs.map((blog) => (
                  <tr key={blog.id} style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.08)" }}>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                        {blog.image ? (
                          <img width={800} height={450}
                            src={blog.image}
                            alt=""
                            style={{
                              height: "48px",
                              width: "72px",
                              objectFit: "cover",
                              borderRadius: "6px",
                              border: "1px solid rgba(23, 34, 40, 0.1)",
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              height: "48px",
                              width: "72px",
                              borderRadius: "6px",
                              backgroundColor: "#FAF7F0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.7rem",
                              color: "#49585F",
                              flexShrink: 0,
                            }}
                          >
                            No Img
                          </div>
                        )}
                        <div>
                          <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#172228" }}>
                            {blog.title}
                          </div>
                          <div style={{ fontSize: "0.78rem", color: "#49585F", marginTop: "2px" }}>
                            {blog.subtitle}
                          </div>
                          <div style={{ fontSize: "0.72rem", fontFamily: "monospace", color: "#C65378", marginTop: "2px" }}>
                            /blogs/{blog.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: "1rem 1.25rem", fontSize: "0.84rem", color: "#172228", whiteSpace: "nowrap" }}>
                      {blog.date}
                    </td>

                    <td style={{ padding: "1rem 1.25rem", whiteSpace: "nowrap" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          borderRadius: "999px",
                          backgroundColor: "#FAF7F0",
                          color: "#172228",
                          border: "1px solid rgba(23, 34, 40, 0.12)",
                        }}
                      >
                        {blog.author}
                      </span>
                    </td>

                    <td style={{ padding: "1rem 1.25rem", whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <span
                          style={{
                            padding: "2px 8px",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            borderRadius: "6px",
                            backgroundColor:
                              (blog.faqs?.length || 0) > 0 ? "#ECFDF5" : "#F3F4F6",
                            color: (blog.faqs?.length || 0) > 0 ? "#065F46" : "#6B7280",
                          }}
                        >
                          {blog.faqs?.length || 0} FAQs
                        </span>
                        <span
                          style={{
                            padding: "2px 8px",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            borderRadius: "6px",
                            backgroundColor:
                              (blog.reviews?.length || 0) > 0
                                ? "rgba(198, 83, 120, 0.12)"
                                : "#F3F4F6",
                            color:
                              (blog.reviews?.length || 0) > 0 ? "#C65378" : "#6B7280",
                          }}
                        >
                          {blog.reviews?.length || 0} Reviews
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: "1rem 1.25rem", textAlign: "right", whiteSpace: "nowrap" }}>
                      <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                        <Link
                          href={`/blogs/${blog.slug}`}
                          target="_blank"
                          style={{
                            padding: "0.35rem 0.7rem",
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            color: "#172228",
                            backgroundColor: "#FAF7F0",
                            border: "1px solid rgba(23, 34, 40, 0.15)",
                            borderRadius: "6px",
                            textDecoration: "none",
                          }}
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          onClick={() => startEditing(blog)}
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
                          onClick={() => blog.id && handleDeleteBlog(blog.id)}
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

        {/* Pagination */}
        {totalItems > 0 && (
          <div
            style={{
              padding: "0.9rem 1.25rem",
              backgroundColor: "#FAF7F0",
              borderTop: "1px solid rgba(23, 34, 40, 0.08)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.82rem",
              color: "#49585F",
            }}
          >
            <div>
              Showing <strong>{indexOfFirstItem + 1}</strong> to{" "}
              <strong>{Math.min(indexOfLastItem, totalItems)}</strong> of{" "}
              <strong>{totalItems}</strong> results
            </div>

            <div style={{ display: "flex", gap: "0.35rem" }}>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: "6px",
                  border: "1px solid rgba(23, 34, 40, 0.15)",
                  backgroundColor: "#FFFFFF",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: "6px",
                  border: "1px solid rgba(23, 34, 40, 0.15)",
                  backgroundColor: "#FFFFFF",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
