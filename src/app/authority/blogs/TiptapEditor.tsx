"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  blogSlug?: string;
}

async function compressImageFile(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8
): Promise<{ dataUrl: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;
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
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({
            dataUrl: String(e.target?.result || ""),
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
      img.onerror = () => reject(new Error("Failed to process image"));
      img.src = String(e.target?.result || "");
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function TiptapEditor({
  content,
  onChange,
  placeholder = "Start writing your blog content...",
  blogSlug,
}: TiptapEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastExternalContent = useRef<string>(content);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});
  const [activeColor, setActiveColor] = useState("");
  const [inTable, setInTable] = useState(false);

  // Sync external content updates (e.g., AI generation or switching blogs)
  useEffect(() => {
    if (content !== lastExternalContent.current) {
      lastExternalContent.current = content;
      if (editorRef.current && editorRef.current.innerHTML !== content) {
        editorRef.current.innerHTML = content || "";
      }
    }
  }, [content]);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && content) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const syncFromDom = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    lastExternalContent.current = html;
    onChange(html);
  }, [onChange]);

  const findActiveTableElements = (): {
    table: HTMLTableElement | null;
    row: HTMLTableRowElement | null;
    cell: HTMLTableCellElement | null;
  } => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !editorRef.current) {
      return { table: null, row: null, cell: null };
    }
    let node: Node | null = sel.anchorNode;
    let cell: HTMLTableCellElement | null = null;
    let row: HTMLTableRowElement | null = null;
    let table: HTMLTableElement | null = null;

    while (node && node !== editorRef.current) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName.toUpperCase();
        if (!cell && (tag === "TD" || tag === "TH")) {
          cell = el as HTMLTableCellElement;
        }
        if (!row && tag === "TR") {
          row = el as HTMLTableRowElement;
        }
        if (!table && tag === "TABLE") {
          table = el as HTMLTableElement;
          break;
        }
      }
      node = node.parentNode;
    }

    return { table, row, cell };
  };

  const refreshSelectionState = useCallback(() => {
    try {
      const block = (document.queryCommandValue("formatBlock") || "").toLowerCase();
      const { table } = findActiveTableElements();
      setInTable(Boolean(table));
      setActiveFormats({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strike: document.queryCommandState("strikeThrough"),
        subscript: document.queryCommandState("subscript"),
        superscript: document.queryCommandState("superscript"),
        bulletList: document.queryCommandState("insertUnorderedList"),
        orderedList: document.queryCommandState("insertOrderedList"),
        alignLeft: document.queryCommandState("justifyLeft"),
        alignCenter: document.queryCommandState("justifyCenter"),
        alignRight: document.queryCommandState("justifyRight"),
        alignJustify: document.queryCommandState("justifyFull"),
        p: block === "p" || block === "div" || block === "",
        h1: block === "h1",
        h2: block === "h2",
        h3: block === "h3",
        h4: block === "h4",
        h5: block === "h5",
        h6: block === "h6",
        blockquote: block === "blockquote",
        pre: block === "pre",
      });
    } catch {
      // ignore selection state errors
    }
  }, []);

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    syncFromDom();
    refreshSelectionState();
  };

  const insertHtmlAtCursor = (htmlSnippet: string) => {
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, htmlSnippet);
    syncFromDom();
    refreshSelectionState();
  };

  const addLink = useCallback(() => {
    const url = window.prompt("Enter URL:");
    if (url) {
      exec("createLink", url.trim());
    }
  }, []);

  const removeLink = useCallback(() => {
    exec("unlink");
  }, []);

  const uploadAndInsertImage = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      try {
        setUploadingImage(true);
        const compressed = await compressImageFile(file, 1200, 1200, 0.8);
        const response = await fetch("/api/blog-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            base64: compressed.dataUrl,
            mimeType: compressed.mimeType,
            filename: file.name || `image_${Date.now()}.jpg`,
            kind: "inline",
            blogSlug: blogSlug || null,
          }),
        });

        const data = await response.json();
        if (!response.ok || !data.imageUrl) {
          throw new Error(data.error || "Failed to upload image");
        }

        insertHtmlAtCursor(
          `<img width={800} height={450} src="${data.imageUrl}" alt="${file.name.replace(/\.[^.]+$/, "")}" style="max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem 0;" />`
        );
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setUploadingImage(false);
      }
    },
    [blogSlug]
  );

  const addImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const addTable = useCallback(() => {
    const rows = parseInt(window.prompt("Number of rows:", "3") || "3", 10);
    const cols = parseInt(window.prompt("Number of columns:", "3") || "3", 10);

    if (rows > 0 && cols > 0) {
      const safeRows = Math.min(20, Math.max(1, rows));
      const safeCols = Math.min(10, Math.max(1, cols));
      const headerCells = Array.from(
        { length: safeCols },
        (_, c) => `<th>Header ${c + 1}</th>`
      ).join("");
      const bodyRows = Array.from({ length: Math.max(1, safeRows - 1) }, () => {
        const cells = Array.from({ length: safeCols }, () => `<td>&nbsp;</td>`).join("");
        return `<tr>${cells}</tr>`;
      }).join("");

      insertHtmlAtCursor(
        `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table><p><br/></p>`
      );
    }
  }, []);

  const addColumnBefore = useCallback(() => {
    const { table, cell } = findActiveTableElements();
    if (!table || !cell) return;
    const colIndex = cell.cellIndex;
    Array.from(table.rows).forEach((r) => {
      const isHeader = r.parentElement?.tagName.toUpperCase() === "THEAD" || r.cells[0]?.tagName.toUpperCase() === "TH";
      const newCell = document.createElement(isHeader ? "th" : "td");
      newCell.innerHTML = isHeader ? "Header" : "&nbsp;";
      const refCell = r.cells[colIndex] || null;
      r.insertBefore(newCell, refCell);
    });
    syncFromDom();
  }, [syncFromDom]);

  const addColumnAfter = useCallback(() => {
    const { table, cell } = findActiveTableElements();
    if (!table || !cell) return;
    const colIndex = cell.cellIndex;
    Array.from(table.rows).forEach((r) => {
      const isHeader = r.parentElement?.tagName.toUpperCase() === "THEAD" || r.cells[0]?.tagName.toUpperCase() === "TH";
      const newCell = document.createElement(isHeader ? "th" : "td");
      newCell.innerHTML = isHeader ? "Header" : "&nbsp;";
      const refCell = r.cells[colIndex + 1] || null;
      r.insertBefore(newCell, refCell);
    });
    syncFromDom();
  }, [syncFromDom]);

  const addRowBefore = useCallback(() => {
    const { table, row } = findActiveTableElements();
    if (!table || !row || !row.parentNode) return;
    const colCount = row.cells.length || 1;
    const newRow = document.createElement("tr");
    for (let i = 0; i < colCount; i++) {
      const td = document.createElement("td");
      td.innerHTML = "&nbsp;";
      newRow.appendChild(td);
    }
    row.parentNode.insertBefore(newRow, row);
    syncFromDom();
  }, [syncFromDom]);

  const addRowAfter = useCallback(() => {
    const { table, row } = findActiveTableElements();
    if (!table || !row || !row.parentNode) return;
    const colCount = row.cells.length || 1;
    const newRow = document.createElement("tr");
    for (let i = 0; i < colCount; i++) {
      const td = document.createElement("td");
      td.innerHTML = "&nbsp;";
      newRow.appendChild(td);
    }
    row.parentNode.insertBefore(newRow, row.nextSibling);
    syncFromDom();
  }, [syncFromDom]);

  const deleteTable = useCallback(() => {
    const { table } = findActiveTableElements();
    if (!table) return;
    table.remove();
    setInTable(false);
    syncFromDom();
  }, [syncFromDom]);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    const files = e.dataTransfer?.files;
    if (files && files.length > 0 && files[0].type.startsWith("image/")) {
      e.preventDefault();
      await uploadAndInsertImage(files[0]);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          await uploadAndInsertImage(file);
          return;
        }
      }
    }
  };

  const getBtnStyle = (active = false, disabled = false): React.CSSProperties => ({
    padding: "0.35rem 0.65rem",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: 600,
    border: active ? "1px solid #C65378" : "1px solid rgba(23, 34, 40, 0.14)",
    backgroundColor: active ? "#C65378" : "#FFFFFF",
    color: active ? "#FFFFFF" : "#172228",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "all 0.15s ease",
  });

  const dividerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.25rem",
    paddingRight: "0.5rem",
    borderRight: "1px solid rgba(23, 34, 40, 0.12)",
  };

  return (
    <div
      style={{
        border: "1px solid rgba(23, 34, 40, 0.15)",
        borderRadius: "12px",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            void uploadAndInsertImage(file);
            e.target.value = "";
          }
        }}
      />

      {/* Toolbar - Identical controls and working to AMA Legal Solutions */}
      <div
        style={{
          backgroundColor: "#FAF7F0",
          borderBottom: "1px solid rgba(23, 34, 40, 0.12)",
          padding: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        {/* Text Formatting */}
        <div style={dividerStyle}>
          <button
            type="button"
            onClick={() => exec("bold")}
            style={getBtnStyle(activeFormats.bold)}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => exec("italic")}
            style={getBtnStyle(activeFormats.italic)}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => exec("underline")}
            style={getBtnStyle(activeFormats.underline)}
            title="Underline"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => exec("strikeThrough")}
            style={getBtnStyle(activeFormats.strike)}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
          <button
            type="button"
            onClick={() => exec("subscript")}
            style={getBtnStyle(activeFormats.subscript)}
            title="Subscript"
          >
            X<sub>2</sub>
          </button>
          <button
            type="button"
            onClick={() => exec("superscript")}
            style={getBtnStyle(activeFormats.superscript)}
            title="Superscript"
          >
            X<sup>2</sup>
          </button>
        </div>

        {/* Headings */}
        <div style={dividerStyle}>
          <button
            type="button"
            onClick={() => exec("formatBlock", "P")}
            style={getBtnStyle(activeFormats.p)}
            title="Paragraph"
          >
            P
          </button>
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => exec("formatBlock", `H${level}`)}
              style={getBtnStyle(activeFormats[`h${level}`])}
              title={`Heading ${level}`}
            >
              H{level}
            </button>
          ))}
        </div>

        {/* Lists */}
        <div style={dividerStyle}>
          <button
            type="button"
            onClick={() => exec("insertUnorderedList")}
            style={getBtnStyle(activeFormats.bulletList)}
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => exec("insertOrderedList")}
            style={getBtnStyle(activeFormats.orderedList)}
            title="Numbered List"
          >
            1. List
          </button>
        </div>

        {/* Alignment */}
        <div style={dividerStyle}>
          <button
            type="button"
            onClick={() => exec("justifyLeft")}
            style={getBtnStyle(activeFormats.alignLeft)}
            title="Align Left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => exec("justifyCenter")}
            style={getBtnStyle(activeFormats.alignCenter)}
            title="Align Center"
          >
            ↔
          </button>
          <button
            type="button"
            onClick={() => exec("justifyRight")}
            style={getBtnStyle(activeFormats.alignRight)}
            title="Align Right"
          >
            →
          </button>
          <button
            type="button"
            onClick={() => exec("justifyFull")}
            style={getBtnStyle(activeFormats.alignJustify)}
            title="Justify"
          >
            ≡
          </button>
        </div>

        {/* Special Elements */}
        <div style={dividerStyle}>
          <button
            type="button"
            onClick={() => exec("formatBlock", "BLOCKQUOTE")}
            style={getBtnStyle(activeFormats.blockquote)}
            title="Quote"
          >
            &quot;Quote&quot;
          </button>
          <button
            type="button"
            onClick={() => exec("formatBlock", "PRE")}
            style={getBtnStyle(activeFormats.pre)}
            title="Code Block"
          >
            &lt;/&gt;
          </button>
          <button
            type="button"
            onClick={() => exec("insertHorizontalRule")}
            style={getBtnStyle(false)}
            title="Horizontal Line"
          >
            -
          </button>
        </div>

        {/* Color & Highlight */}
        <div style={dividerStyle}>
          <select
            value={activeColor}
            onChange={(e) => {
              const color = e.target.value;
              setActiveColor(color);
              if (color) {
                exec("foreColor", color);
              } else {
                exec("foreColor", "#172228");
              }
            }}
            style={{
              padding: "0.35rem 0.5rem",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 600,
              border: "1px solid rgba(23, 34, 40, 0.14)",
              backgroundColor: "#FFFFFF",
              color: "#172228",
              cursor: "pointer",
            }}
            title="Text Color"
          >
            <option value="">Text Color</option>
            <option value="#000000">Default</option>
            <option value="#6B7280">Gray</option>
            <option value="#EF4444">Red</option>
            <option value="#F97316">Orange</option>
            <option value="#EAB308">Yellow</option>
            <option value="#22C55E">Green</option>
            <option value="#3B82F6">Blue</option>
            <option value="#6366F1">Indigo</option>
            <option value="#A855F7">Purple</option>
            <option value="#EC4899">Pink</option>
          </select>

          <button
            type="button"
            onClick={() => exec("hiliteColor", "#FEF08A")}
            style={getBtnStyle(false)}
            title="Highlight"
          >
            <span style={{ backgroundColor: "#FEF08A", padding: "0 4px", borderRadius: "2px", color: "#172228" }}>
              H
            </span>
          </button>
        </div>

        {/* Links & Media */}
        <div style={dividerStyle}>
          <button
            type="button"
            onClick={addLink}
            style={getBtnStyle(false)}
            title="Add Link"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={removeLink}
            style={getBtnStyle(false)}
            title="Remove Link"
          >
            🔗❌
          </button>
          <button
            type="button"
            onClick={addImage}
            disabled={uploadingImage}
            style={getBtnStyle(false, uploadingImage)}
            title="Upload Image"
          >
            {uploadingImage ? "Uploading..." : "🖼️"}
          </button>
        </div>

        {/* Table */}
        <div style={dividerStyle}>
          <button
            type="button"
            onClick={addTable}
            style={getBtnStyle(false)}
            title="Insert Table"
          >
            Table
          </button>
          <button
            type="button"
            onClick={addColumnBefore}
            disabled={!inTable}
            style={getBtnStyle(false, !inTable)}
            title="Add Column Before"
          >
            ◀️|
          </button>
          <button
            type="button"
            onClick={addColumnAfter}
            disabled={!inTable}
            style={getBtnStyle(false, !inTable)}
            title="Add Column After"
          >
            |▶️
          </button>
          <button
            type="button"
            onClick={addRowBefore}
            disabled={!inTable}
            style={getBtnStyle(false, !inTable)}
            title="Add Row Before"
          >
            ▲_
          </button>
          <button
            type="button"
            onClick={addRowAfter}
            disabled={!inTable}
            style={getBtnStyle(false, !inTable)}
            title="Add Row After"
          >
            _▼
          </button>
          <button
            type="button"
            onClick={deleteTable}
            disabled={!inTable}
            style={getBtnStyle(false, !inTable)}
            title="Delete Table"
          >
            🗑️ Table
          </button>
        </div>

        {/* Undo/Redo & Clear */}
        <div style={{ display: "flex", gap: "0.25rem" }}>
          <button
            type="button"
            onClick={() => exec("undo")}
            style={getBtnStyle(false)}
            title="Undo"
          >
            ↩
          </button>
          <button
            type="button"
            onClick={() => exec("redo")}
            style={getBtnStyle(false)}
            title="Redo"
          >
            ↪
          </button>
          <button
            type="button"
            onClick={() => {
              exec("removeFormat");
              exec("formatBlock", "P");
            }}
            style={getBtnStyle(false)}
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncFromDom}
        onBlur={syncFromDom}
        onKeyUp={refreshSelectionState}
        onMouseUp={refreshSelectionState}
        onDrop={handleDrop}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className="tiptap-editor-content"
        style={{
          minHeight: "420px",
          maxHeight: "650px",
          overflowY: "auto",
          padding: "1.25rem",
          outline: "none",
          color: "#172228",
          fontSize: "0.95rem",
          lineHeight: 1.75,
        }}
      />

      {/* Custom Styles for Editor Content */}
      <style jsx global>{`
        .tiptap-editor-content:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .tiptap-editor-content h1 {
          font-size: 2rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #172228;
        }
        .tiptap-editor-content h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          color: #172228;
        }
        .tiptap-editor-content h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #172228;
        }
        .tiptap-editor-content h4 {
          font-size: 1.1rem;
          font-weight: bold;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
          color: #172228;
        }
        .tiptap-editor-content h5 {
          font-size: 1rem;
          font-weight: bold;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
          color: #172228;
        }
        .tiptap-editor-content h6 {
          font-size: 0.9rem;
          font-weight: bold;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
          color: #172228;
        }
        .tiptap-editor-content p {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        .tiptap-editor-content ul,
        .tiptap-editor-content ol {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .tiptap-editor-content ul {
          list-style-type: disc;
        }
        .tiptap-editor-content ol {
          list-style-type: decimal;
        }
        .tiptap-editor-content li {
          margin-bottom: 0.25rem;
        }
        .tiptap-editor-content blockquote {
          border-left: 4px solid #c65378;
          padding-left: 1rem;
          font-style: italic;
          margin: 1rem 0;
          color: #49585f;
          background: #faf7f0;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-radius: 0 8px 8px 0;
        }
        .tiptap-editor-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .tiptap-editor-content code {
          background-color: #f3f4f6;
          color: #1f2937;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
        }
        .tiptap-editor-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }
        .tiptap-editor-content hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 1.5rem 0;
        }
        .tiptap-editor-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        .tiptap-editor-content table td,
        .tiptap-editor-content table th {
          border: 1px solid #d1d5db;
          padding: 0.5rem;
          min-width: 100px;
        }
        .tiptap-editor-content table th {
          background-color: #faf7f0;
          font-weight: bold;
          text-align: left;
        }
        .tiptap-editor-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        .tiptap-editor-content a {
          color: #c65378;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
