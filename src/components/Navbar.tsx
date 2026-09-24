"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      style={{
        backgroundColor: "var(--bg-header)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Main Bar */}
      <div className="container">
        <nav
          className="navbar-main"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4.75rem",
          }}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Image
              src="/images/Without Text.svg"
              alt="Logo"
              width={56}
              height={36}
              className="navbar-logo"
              style={{
                height: "36px",
                width: "auto",
                display: "block",
                objectFit: "contain",
              }}
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <div
            className="nav-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Link
              href="/how-it-works"
              style={{
                color: pathname === "/how-it-works" ? "#FFFFFF" : "rgba(255, 255, 255, 0.82)",
                fontSize: "0.9rem",
                fontWeight: pathname === "/how-it-works" ? 600 : 500,
                textDecoration: "none",
              }}
            >
              How It Works
            </Link>

            <Link
              href="/why-make-a-will"
              style={{
                color: pathname === "/why-make-a-will" ? "#FFFFFF" : "rgba(255, 255, 255, 0.82)",
                fontSize: "0.9rem",
                fontWeight: pathname === "/why-make-a-will" ? 600 : 500,
                textDecoration: "none",
              }}
            >
              Why Make a Will
            </Link>

            <Link
              href="/pricing"
              style={{
                color: pathname === "/pricing" ? "#FFFFFF" : "rgba(255, 255, 255, 0.82)",
                fontSize: "0.9rem",
                fontWeight: pathname === "/pricing" ? 600 : 500,
                textDecoration: "none",
              }}
            >
              Pricing
            </Link>

            <Link
              href="/lawyer-verification"
              style={{
                color: pathname === "/lawyer-verification" ? "#FFFFFF" : "rgba(255, 255, 255, 0.82)",
                fontSize: "0.9rem",
                fontWeight: pathname === "/lawyer-verification" ? 600 : 500,
                textDecoration: "none",
              }}
            >
              Lawyer Verification
            </Link>

            <Link
              href="/resources"
              style={{
                color: pathname === "/resources" ? "#FFFFFF" : "rgba(255, 255, 255, 0.82)",
                fontSize: "0.9rem",
                fontWeight: pathname === "/resources" ? 600 : 500,
                textDecoration: "none",
              }}
            >
              Knowledge Hub
            </Link>
          </div>

          {/* Desktop Actions */}
          <div
            className="nav-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
            }}
          >
            <Link
              href="/dashboard"
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: "0.9rem",
                fontWeight: 500,
                padding: "0.4rem 0.6rem",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Link>

            <Link
              href="/start"
              className="btn btn-gold"
              style={{
                padding: "0.6rem 1.35rem",
                fontSize: "0.875rem",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
              }}
            >
              <span>Start My Will</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-mobile-toggle"
            aria-label="Toggle navigation"
            style={{
              background: "none",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              padding: "0.5rem",
              display: "none",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="nav-mobile-drawer"
          style={{
            backgroundColor: "var(--bg-navy-deep)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "1.25rem 1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
          }}
        >
          <Link
            href="/how-it-works"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#FFFFFF", fontSize: "0.95rem", padding: "0.25rem 0", textDecoration: "none" }}
          >
            How It Works
          </Link>
          <Link
            href="/why-make-a-will"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#FFFFFF", fontSize: "0.95rem", padding: "0.25rem 0", textDecoration: "none" }}
          >
            Why Make a Will
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#FFFFFF", fontSize: "0.95rem", padding: "0.25rem 0", textDecoration: "none" }}
          >
            Pricing
          </Link>
          <Link
            href="/lawyer-verification"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#FFFFFF", fontSize: "0.95rem", padding: "0.25rem 0", textDecoration: "none" }}
          >
            Lawyer Verification
          </Link>
          <Link
            href="/resources"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#FFFFFF", fontSize: "0.95rem", padding: "0.25rem 0", textDecoration: "none" }}
          >
            Knowledge Hub
          </Link>
          <div
            style={{
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              style={{ color: "var(--color-gold)", fontWeight: 600, fontSize: "0.92rem", padding: "0.25rem 0", textDecoration: "none" }}
            >
              Customer Dashboard →
            </Link>
            <Link
              href="/start"
              onClick={() => setMobileOpen(false)}
              className="btn btn-gold"
              style={{ width: "100%", padding: "0.85rem", textAlign: "center", textDecoration: "none" }}
            >
              Start My Will
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          :global(.nav-desktop) {
            display: none !important;
          }
          :global(.nav-mobile-toggle) {
            display: flex !important;
            align-items: center;
            justify-content: center;
            min-width: 44px;
            min-height: 44px;
          }
          :global(.navbar-main) {
            height: 3.75rem !important;
          }
          :global(.navbar-logo) {
            height: 26px !important;
          }
        }
      `}</style>
    </header>
  );
}
