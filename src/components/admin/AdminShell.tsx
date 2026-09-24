"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  shortcut?: string;
  badge?: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Operations",
    items: [
      {
        label: "Overview",
        href: "/authority",
        shortcut: "⌘1",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
        ),
      },
      {
        label: "Users",
        href: "/authority/users",
        shortcut: "⌘2",
        badge: "1.2k",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        label: "Transactions",
        href: "/authority/transactions",
        shortcut: "⌘3",
        badge: "₹7.3L",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Content & Tools",
    items: [
      {
        label: "Blogs",
        href: "/authority/blogs",
        shortcut: "⌘4",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
          </svg>
        ),
      },
      {
        label: "Draft Will",
        href: "/authority/draft",
        shortcut: "⌘5",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        ),
      },
    ],
  },
];

const COMMAND_ITEMS = [
  { label: "Overview", href: "/authority", category: "Operations" },
  { label: "Users Directory", href: "/authority/users", category: "Operations" },
  { label: "Transactions Ledger", href: "/authority/transactions", category: "Operations" },
  { label: "Blog Editor & Posts", href: "/authority/blogs", category: "Content" },
  { label: "Draft Will Compiler", href: "/authority/draft", category: "Tools" },
  { label: "Public Homepage", href: "/", category: "Navigation", external: true },
  { label: "Sign Out", href: "/nullify", category: "Account" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const openPalette = () => {
    setCommandSearch("");
    setSelectedCommandIndex(0);
    setCommandPaletteOpen(true);
  };

  // Global ⌘K keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => {
          if (!prev) {
            setCommandSearch("");
            setSelectedCommandIndex(0);
            return true;
          }
          return false;
        });
      } else if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus input when command palette opens
  useEffect(() => {
    if (commandPaletteOpen) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 40);
      return () => clearTimeout(timer);
    }
  }, [commandPaletteOpen]);

  const filteredCommands = COMMAND_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(commandSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(commandSearch.toLowerCase())
  );

  const handleCommandSelect = (index: number) => {
    const target = filteredCommands[index];
    if (!target) return;
    setCommandPaletteOpen(false);
    if (target.external) {
      window.open(target.href, "_blank");
    } else {
      router.push(target.href);
    }
  };

  const handleKeyDownInCommand = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedCommandIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedCommandIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleCommandSelect(selectedCommandIndex);
    }
  };

  const handleLogout = () => {
    router.push("/nullify");
  };

  // Find active item label for top bar
  const allNavItems = NAV_GROUPS.flatMap((g) => g.items);
  const currentNav = allNavItems.find((n) =>
    n.href === "/authority" ? pathname === "/authority" : pathname.startsWith(n.href)
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8FAFC", fontFamily: "inherit" }}>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(2px)",
            zIndex: 40,
          }}
        />
      )}

      {/* Modern High-Polish Sidebar (No AI Slop) */}
      <aside
        style={{
          width: "236px",
          backgroundColor: "#0B0F17",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 50,
          borderRight: "1px solid rgba(255, 255, 255, 0.07)",
          userSelect: "none",
        }}
        className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
      >
        {/* Workspace Brand Header */}
        <div
          style={{
            padding: "1rem 0.85rem 0.75rem 0.85rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {/* Monogram Badge */}
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "6px",
                background: "linear-gradient(145deg, #1E293B, #0F172A)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
              }}
            >
              WD
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
              <span style={{ fontSize: "0.86rem", fontWeight: 600, color: "#F8FAFC", letterSpacing: "-0.015em" }}>
                WillDrafting
              </span>
            </div>
          </div>
          <span
            style={{
              fontSize: "0.65rem",
              padding: "2px 6px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#94A3B8",
              borderRadius: "4px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Admin
          </span>
        </div>

        {/* Quick Search / Command Palette Trigger (Linear/Raycast style) */}
        <div style={{ padding: "0.65rem 0.75rem 0.25rem 0.75rem" }}>
          <button
            type="button"
            onClick={openPalette}
            style={{
              width: "100%",
              height: "32px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              borderRadius: "6px",
              padding: "0 0.55rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              color: "#64748B",
              fontSize: "0.78rem",
              transition: "all 0.12s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
              e.currentTarget.style.color = "#94A3B8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
              e.currentTarget.style.color = "#64748B";
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Quick jump...</span>
            </span>
            <kbd
              style={{
                fontSize: "0.65rem",
                padding: "1px 5px",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "3px",
                color: "#64748B",
                fontFamily: "monospace",
              }}
            >
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Hierarchical Grouped Navigation */}
        <nav
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0.5rem 0.65rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <div
                style={{
                  fontSize: "0.66rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#475569",
                  padding: "0.35rem 0.6rem 0.25rem 0.6rem",
                }}
              >
                {group.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {group.items.map((item) => {
                  const isActive =
                    item.href === "/authority"
                      ? pathname === "/authority"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      style={{
                        height: "33px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 0.65rem",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? "#FFFFFF" : "#94A3B8",
                        backgroundColor: isActive ? "rgba(255, 255, 255, 0.09)" : "transparent",
                        textDecoration: "none",
                        transition: "all 0.12s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                          e.currentTarget.style.color = "#F1F5F9";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#94A3B8";
                        }
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: isActive ? "#FFFFFF" : "#64748B",
                          }}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </span>

                      {/* Badge or Shortcut */}
                      {item.badge ? (
                        <span
                          style={{
                            fontSize: "0.68rem",
                            color: isActive ? "#E2E8F0" : "#64748B",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            padding: "1px 6px",
                            borderRadius: "4px",
                            fontWeight: 500,
                          }}
                        >
                          {item.badge}
                        </span>
                      ) : (
                        item.shortcut && (
                          <span
                            style={{
                              fontSize: "0.65rem",
                              color: "#475569",
                              fontFamily: "monospace",
                              opacity: isActive ? 0.7 : 0,
                              transition: "opacity 0.12s",
                            }}
                          >
                            {item.shortcut}
                          </span>
                        )
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quiet Utility Section */}
          <div>
            <div
              style={{
                fontSize: "0.66rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#475569",
                padding: "0.35rem 0.6rem 0.25rem 0.6rem",
              }}
            >
              External
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: "33px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 0.65rem",
                borderRadius: "6px",
                fontSize: "0.82rem",
                color: "#94A3B8",
                textDecoration: "none",
                transition: "all 0.12s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                e.currentTarget.style.color = "#F1F5F9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#94A3B8";
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ display: "flex", alignItems: "center", color: "#64748B" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <span>Live Website</span>
              </span>
              <span style={{ color: "#64748B", fontSize: "0.75rem" }}>↗</span>
            </a>
          </div>
        </nav>

        {/* Refined User Session Footer */}
        <div
          style={{
            padding: "0.75rem 0.85rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(0, 0, 0, 0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", minWidth: 0 }}>
            {/* User Avatar Monogram */}
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: "#1E293B",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "#E2E8F0",
                flexShrink: 0,
              }}
            >
              AD
            </div>
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0, lineHeight: 1.2 }}>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: "#F1F5F9",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Administrator
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  color: "#64748B",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                admin@willdrafting.in
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            aria-label="Sign Out"
            style={{
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              border: "1px solid transparent",
              borderRadius: "5px",
              color: "#64748B",
              cursor: "pointer",
              transition: "all 0.12s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.25)";
              e.currentTarget.style.color = "#F87171";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.color = "#64748B";
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Minimalist Top Bar */}
        <header
          style={{
            height: "3.25rem",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="admin-mobile-toggle"
              aria-label="Open sidebar"
              style={{
                background: "none",
                border: "none",
                color: "#0F172A",
                cursor: "pointer",
                padding: "0.25rem",
                display: "none",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            </button>
            <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 500 }}>
              Authority
            </span>
            <span style={{ fontSize: "0.82rem", color: "#CBD5E1" }}>/</span>
            <span style={{ fontSize: "0.86rem", fontWeight: 600, color: "#0F172A" }}>
              {currentNav?.label || "Overview"}
            </span>
          </div>

          {/* Quick Header Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              type="button"
              onClick={openPalette}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.78rem",
                color: "#64748B",
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                padding: "0.3rem 0.65rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search</span>
              <kbd
                className="admin-search-kbd"
                style={{
                  fontSize: "0.65rem",
                  padding: "1px 4px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "3px",
                  fontFamily: "monospace",
                }}
              >
                ⌘K
              </kbd>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.78rem",
                color: "#475569",
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
                padding: "0.3rem 0.65rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontWeight: 500,
              }}
            >
              <span>Live Site</span>
              <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>↗</span>
            </a>
          </div>
        </header>

        {/* Content Body */}
        <main className="admin-main-content" style={{ flex: 1, padding: "1.75rem", minWidth: 0 }}>
          {children}
        </main>
      </div>

      {/* Modern Command Palette Modal (Linear / Raycast inspired) */}
      {commandPaletteOpen && (
        <div
          onClick={() => setCommandPaletteOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(11, 15, 23, 0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "15vh",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "480px",
              backgroundColor: "#0F172A",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "10px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Search Input */}
            <div
              style={{
                padding: "0.85rem 1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={commandSearch}
                onChange={(e) => {
                  setCommandSearch(e.target.value);
                  setSelectedCommandIndex(0);
                }}
                onKeyDown={handleKeyDownInCommand}
                placeholder="Jump to section or action..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#FFFFFF",
                  fontSize: "0.9rem",
                }}
              />
              <span
                onClick={() => setCommandPaletteOpen(false)}
                style={{
                  fontSize: "0.68rem",
                  padding: "2px 5px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  color: "#94A3B8",
                  cursor: "pointer",
                }}
              >
                ESC
              </span>
            </div>

            {/* Results List */}
            <div style={{ maxHeight: "260px", overflowY: "auto", padding: "0.5rem" }}>
              {filteredCommands.length === 0 ? (
                <div style={{ padding: "1.5rem", textAlign: "center", color: "#64748B", fontSize: "0.82rem" }}>
                  No matching destinations found.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedCommandIndex;
                  return (
                    <div
                      key={cmd.href}
                      onClick={() => handleCommandSelect(idx)}
                      onMouseEnter={() => setSelectedCommandIndex(idx)}
                      style={{
                        padding: "0.6rem 0.75rem",
                        borderRadius: "6px",
                        backgroundColor: isSelected ? "rgba(255, 255, 255, 0.08)" : "transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "background 0.1s",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.84rem",
                          fontWeight: isSelected ? 500 : 400,
                          color: isSelected ? "#FFFFFF" : "#CBD5E1",
                        }}
                      >
                        {cmd.label}
                      </span>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          color: "#64748B",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {cmd.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Helper Footer */}
            <div
              style={{
                padding: "0.5rem 1rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.7rem",
                color: "#64748B",
              }}
            >
              <span>Navigation</span>
              <span>↑ ↓ to move · ↵ to select · esc to close</span>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for Sidebar & Main Content Responsive */}
      <style jsx global>{`
        @media (max-width: 860px) {
          .admin-sidebar {
            position: fixed !important;
            left: -245px !important;
            transition: left 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .admin-sidebar.open {
            left: 0 !important;
          }
          .admin-mobile-toggle {
            display: block !important;
          }
          .admin-main-content {
            padding: 1rem 0.85rem 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .admin-search-kbd {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
