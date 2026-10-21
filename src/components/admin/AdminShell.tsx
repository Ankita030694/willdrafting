"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

interface NavItem {
  label: string;
  href: string;
  shortcut?: string;
  badgeKey?: "users" | "drafts" | "transactions" | "blogs";
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Authority Console",
    items: [
      {
        label: "Dashboard",
        href: "/authority",
        shortcut: "⌘1",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="7" height="9" x="3" y="3" rx="1.5" />
            <rect width="7" height="5" x="14" y="3" rx="1.5" />
            <rect width="7" height="9" x="14" y="12" rx="1.5" />
            <rect width="7" height="5" x="3" y="16" rx="1.5" />
          </svg>
        ),
      },
      {
        label: "Users",
        href: "/authority/users",
        shortcut: "⌘2",
        badgeKey: "users",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        label: "Unpaid & Guest Drafts",
        href: "/authority/drafts",
        shortcut: "⌘3",
        badgeKey: "drafts",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        ),
      },
      {
        label: "Transactions",
        href: "/authority/transactions",
        shortcut: "⌘4",
        badgeKey: "transactions",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Editorial & AI Content",
    items: [
      {
        label: "Blogs Studio",
        href: "/authority/blogs",
        shortcut: "⌘5",
        badgeKey: "blogs",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        ),
      },
      {
        label: "AI Prompts",
        href: "/authority/prompts",
        shortcut: "⌘6",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="M4.93 4.93l2.83 2.83" />
            <path d="M16.24 16.24l2.83 2.83" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <path d="M4.93 19.07l2.83-2.83" />
            <path d="M16.24 7.76l2.83-2.83" />
          </svg>
        ),
      },
    ],
  },
];

const COMMAND_ITEMS = [
  { label: "Dashboard Overview", href: "/authority", category: "Authority Console" },
  { label: "Users & Accounts Registry", href: "/authority/users", category: "Authority Console" },
  { label: "Unpaid Will Drafts & Guest Sessions", href: "/authority/drafts", category: "Authority Console" },
  { label: "Transactions & Orders Ledger", href: "/authority/transactions", category: "Authority Console" },
  { label: "Blogs & AI Article Studio", href: "/authority/blogs", category: "Editorial & AI" },
  { label: "AI Prompt Profiles Manager", href: "/authority/prompts", category: "Editorial & AI" },
  { label: "Sign Out", href: "/nullify", category: "Session" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [badges, setBadges] = useState<{
    users?: string;
    drafts?: string;
    transactions?: string;
    blogs?: string;
  }>({});

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/overview")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!mounted || !data?.stats) return;
        const s = data.stats;
        const unpaidDraftsCount = Number(s.loggedInUnpaidWills || 0) + Number(s.guestWills || 0);
        setBadges((prev) => ({
          ...prev,
          users: String(s.totalAccounts ?? 0),
          drafts: String(unpaidDraftsCount),
          transactions: String(
            (s.paidOrdersCount ?? 0) + (s.pendingOrdersCount ?? 0) + (s.failedOrdersCount ?? 0)
          ),
        }));
      })
      .catch(() => {});

    fetch("/api/admin/blogs")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!mounted || !Array.isArray(data?.blogs)) return;
        setBadges((prev) => ({
          ...prev,
          blogs: String(data.blogs.length),
        }));
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, [pathname]);

  const openPalette = () => {
    setCommandSearch("");
    setSelectedCommandIndex(0);
    setCommandPaletteOpen(true);
  };

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

  useEffect(() => {
    if (commandPaletteOpen) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 40);
      return () => clearTimeout(timer);
    }
  }, [commandPaletteOpen]);

  const filteredCommands = COMMAND_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(commandSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(commandSearch.toLowerCase())
  );

  const handleCommandSelect = (index: number) => {
    const target = filteredCommands[index];
    if (!target) return;
    setCommandPaletteOpen(false);
    if (target.href === "/nullify") {
      void signOut({ callbackUrl: "/nullify" });
      return;
    }
    router.push(target.href);
  };

  const handleKeyDownInCommand = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedCommandIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedCommandIndex(
        (prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length)
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleCommandSelect(selectedCommandIndex);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/nullify" });
  };

  const allNavItems = NAV_GROUPS.flatMap((g) => g.items);
  const currentNav = allNavItems.find((n) =>
    n.href === "/authority"
      ? pathname === "/authority" || pathname === "/authority/overview"
      : pathname.startsWith(n.href)
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#FAF7F0",
        color: "#172228",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(23, 34, 40, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 40,
          }}
        />
      )}

      {/* Warm Cream Editorial Sidebar (Matching WizardSidebar & Bento Theme) */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "#FAF7F0",
          color: "#172228",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 50,
          borderRight: "1px solid rgba(23, 34, 40, 0.08)",
          userSelect: "none",
        }}
        className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: "1rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(23, 34, 40, 0.08)",
          }}
        >
          <Link href="/authority" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="/Logofinal.svg"
              alt="WillDrafting.in"
              width={125}
              height={32}
              style={{ height: "30px", width: "auto", objectFit: "contain" }}
              priority
            />
          </Link>
          <span
            style={{
              fontSize: "0.65rem",
              padding: "3px 8px",
              backgroundColor: "rgba(198, 83, 120, 0.1)",
              color: "#C65378",
              borderRadius: "999px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Authority
          </span>
        </div>

        {/* Quick Search / Command Palette Trigger */}
        <div style={{ padding: "0.85rem 0.85rem 0.25rem 0.85rem" }}>
          <button
            type="button"
            onClick={openPalette}
            style={{
              width: "100%",
              height: "36px",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(23, 34, 40, 0.1)",
              borderRadius: "10px",
              padding: "0 0.7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              color: "#49585F",
              fontSize: "0.8rem",
              boxShadow: "0 1px 3px rgba(23, 34, 40, 0.03)",
              transition: "all 0.15s ease",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C65378" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span style={{ fontWeight: 500 }}>Quick jump...</span>
            </span>
            <kbd
              style={{
                fontSize: "0.66rem",
                padding: "2px 6px",
                backgroundColor: "#FAF7F0",
                border: "1px solid rgba(23, 34, 40, 0.1)",
                borderRadius: "5px",
                color: "#49585F",
                fontFamily: "monospace",
                fontWeight: 600,
              }}
            >
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0.65rem 0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#49585F",
                  padding: "0.4rem 0.6rem 0.4rem 0.6rem",
                }}
              >
                {group.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {group.items.map((item) => {
                  const isActive =
                    item.href === "/authority"
                      ? pathname === "/authority" || pathname === "/authority/overview"
                      : pathname.startsWith(item.href);

                  const badgeVal = item.badgeKey ? badges[item.badgeKey] : undefined;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      style={{
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 0.75rem",
                        borderRadius: "10px",
                        fontSize: "0.84rem",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#FFFFFF" : "#172228",
                        backgroundColor: isActive ? "#C65378" : "transparent",
                        boxShadow: isActive ? "0 4px 12px rgba(198, 83, 120, 0.25)" : "none",
                        textDecoration: "none",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "rgba(23, 34, 40, 0.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: isActive ? "#FFFFFF" : "#C65378",
                          }}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </span>

                      {badgeVal !== undefined ? (
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: isActive ? "#FFFFFF" : "#49585F",
                            backgroundColor: isActive
                              ? "rgba(255, 255, 255, 0.22)"
                              : "#FFFFFF",
                            border: isActive ? "none" : "1px solid rgba(23, 34, 40, 0.08)",
                            padding: "1px 7px",
                            borderRadius: "999px",
                            fontWeight: 700,
                          }}
                        >
                          {badgeVal}
                        </span>
                      ) : (
                        item.shortcut && (
                          <span
                            style={{
                              fontSize: "0.66rem",
                              color: isActive ? "rgba(255,255,255,0.8)" : "#49585F",
                              fontFamily: "monospace",
                              opacity: isActive ? 0.9 : 0.5,
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
        </nav>

        {/* User Session Footer */}
        <div
          style={{
            padding: "0.85rem 0.9rem",
            borderTop: "1px solid rgba(23, 34, 40, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                backgroundColor: "rgba(198, 83, 120, 0.12)",
                border: "1px solid rgba(198, 83, 120, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#C65378",
                flexShrink: 0,
              }}
            >
              {session?.user?.name ? session.user.name.substring(0, 2).toUpperCase() : "SA"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0, lineHeight: 1.25 }}>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#172228",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {session?.user?.name || "Super Admin"}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#49585F",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {session?.user?.email || "admin@willdrafting.in"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            aria-label="Sign Out"
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FAF7F0",
              border: "1px solid rgba(23, 34, 40, 0.08)",
              borderRadius: "8px",
              color: "#49585F",
              cursor: "pointer",
              transition: "all 0.15s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(198, 83, 120, 0.1)";
              e.currentTarget.style.color = "#C65378";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FAF7F0";
              e.currentTarget.style.color = "#49585F";
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, backgroundColor: "#FAF7F0" }}>
        {/* Top Header Bar (Matching bento-top-header) */}
        <header
          style={{
            height: "56px",
            backgroundColor: "#FAF7F0",
            borderBottom: "1px solid rgba(23, 34, 40, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          {/* Breadcrumb + Live Chip */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="admin-mobile-toggle"
              aria-label="Open sidebar"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(23, 34, 40, 0.1)",
                borderRadius: "8px",
                color: "#172228",
                cursor: "pointer",
                padding: "0.35rem 0.45rem",
                display: "none",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            </button>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                backgroundColor: "rgba(198, 83, 120, 0.1)",
                color: "#C65378",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "0.22rem 0.65rem",
                borderRadius: "999px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#C65378",
                }}
              />
              Authority
            </span>

            <span style={{ fontSize: "0.82rem", color: "rgba(23, 34, 40, 0.25)" }}>/</span>
            <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#172228" }}>
              {currentNav?.label || "Dashboard"}
            </span>
          </div>

          {/* Right Header Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <button
              type="button"
              onClick={openPalette}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#49585F",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(23, 34, 40, 0.08)",
                padding: "0.35rem 0.75rem",
                borderRadius: "999px",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(23, 34, 40, 0.02)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C65378" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Jump</span>
              <kbd
                className="admin-search-kbd"
                style={{
                  fontSize: "0.65rem",
                  padding: "1px 5px",
                  backgroundColor: "#FAF7F0",
                  border: "1px solid rgba(23, 34, 40, 0.1)",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                }}
              >
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#172228",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(23, 34, 40, 0.1)",
                borderRadius: "999px",
                padding: "0.35rem 0.85rem",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(23, 34, 40, 0.02)",
              }}
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Main Body */}
        <main className="admin-main-content" style={{ flex: 1, padding: "1.5rem", minWidth: 0 }}>
          {children}
        </main>
      </div>

      {/* Warm Cream & Berry Rose Command Palette Modal */}
      {commandPaletteOpen && (
        <div
          onClick={() => setCommandPaletteOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(23, 34, 40, 0.55)",
            backdropFilter: "blur(6px)",
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
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(23, 34, 40, 0.1)",
              borderRadius: "16px",
              boxShadow: "0 20px 45px -10px rgba(23, 34, 40, 0.25)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "0.9rem 1.1rem",
                borderBottom: "1px solid rgba(23, 34, 40, 0.08)",
                backgroundColor: "#FAF7F0",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C65378" strokeWidth="2.2">
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
                placeholder="Jump to Authority screen..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#172228",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              />
              <span
                onClick={() => setCommandPaletteOpen(false)}
                style={{
                  fontSize: "0.68rem",
                  padding: "2px 6px",
                  borderRadius: "5px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(23, 34, 40, 0.1)",
                  color: "#49585F",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ESC
              </span>
            </div>

            <div style={{ maxHeight: "260px", overflowY: "auto", padding: "0.5rem" }}>
              {filteredCommands.length === 0 ? (
                <div style={{ padding: "1.5rem", textAlign: "center", color: "#49585F", fontSize: "0.82rem" }}>
                  No matching screens found.
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
                        padding: "0.65rem 0.85rem",
                        borderRadius: "10px",
                        backgroundColor: isSelected ? "rgba(198, 83, 120, 0.1)" : "transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "background 0.1s",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? "#C65378" : "#172228",
                        }}
                      >
                        {cmd.label}
                      </span>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          color: "#49585F",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          fontWeight: 600,
                        }}
                      >
                        {cmd.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 860px) {
          .admin-sidebar {
            position: fixed !important;
            left: -265px !important;
            transition: left 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .admin-sidebar.open {
            left: 0 !important;
          }
          .admin-mobile-toggle {
            display: flex !important;
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
