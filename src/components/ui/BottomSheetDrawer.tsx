"use client";

import React, { useEffect } from "react";

interface BottomSheetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  hindiTitle?: string;
  children: React.ReactNode;
  maxHeight?: string;
}

export default function BottomSheetDrawer({
  isOpen,
  onClose,
  title,
  hindiTitle,
  children,
  maxHeight = "85vh",
}: BottomSheetDrawerProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 29, 56, 0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          maxHeight,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -10px 30px rgba(15, 29, 56, 0.2)",
          animation: "slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          overflow: "hidden",
        }}
      >
        {/* Drag Handle Bar */}
        <div
          style={{
            padding: "0.75rem 0 0.35rem 0",
            display: "flex",
            justifyContent: "center",
            cursor: "grab",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "5px",
              backgroundColor: "rgba(27, 42, 74, 0.2)",
              borderRadius: "9999px",
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            padding: "0.5rem 1.25rem 0.85rem 1.25rem",
            borderBottom: "1px solid rgba(27, 42, 74, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)" }}>
              {title}
            </h3>
            {hindiTitle && (
              <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 500 }}>
                {hindiTitle}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(27, 42, 74, 0.05)",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748B",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            padding: "1.25rem",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            flex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
