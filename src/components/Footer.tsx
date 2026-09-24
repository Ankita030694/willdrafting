"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Lock, FileCheck, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0B1120",
        color: "#94A3B8",
        padding: "4.5rem 0 2.5rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        fontSize: "0.88rem",
      }}
    >
      <div className="container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Main Footer Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3.5rem",
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand Logo & Brand Promise */}
          <div>
            <div style={{ marginBottom: "1.2rem" }}>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
                <Image
                  src="/images/Without Text.svg"
                  alt="Logo"
                  width={56}
                  height={36}
                  style={{
                    height: "36px",
                    width: "auto",
                    display: "block",
                    objectFit: "contain",
                  }}
                />
              </Link>
            </div>

            <p style={{ lineHeight: 1.65, color: "#94A3B8", marginBottom: "1.25rem" }}>
              “Your wishes. Your family. Legally protected.”
            </p>
            <p style={{ lineHeight: 1.65, color: "#64748B", fontSize: "0.82rem" }}>
              India’s dedicated LegalTech Will platform. Answer simple questions, organize your assets, and receive a
              custom testamentary document reviewed by practicing advocates under the Indian Succession Act, 1925.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.2rem" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "#10B981", fontSize: "0.78rem" }}>
                <Lock size={12} /> 256-Bit Vault Security
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "#38BDF8", fontSize: "0.78rem" }}>
                <Shield size={12} /> Bar Council Advocate Review
              </span>
            </div>
          </div>

          {/* Col 2: Platform Solutions */}
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.2rem" }}>
              Estate Solutions
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", padding: 0 }}>
              <li>
                <Link href="/start" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Create My Will (Guided Wizard)
                </Link>
              </li>
              <li>
                <Link href="/why-make-a-will" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Why Make a Will
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  How It Works (7 Steps)
                </Link>
              </li>
              <li>
                <Link href="/pricing" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Pricing Plans (₹999 / ₹2,499)
                </Link>
              </li>
              <li>
                <Link href="/lawyer-verification" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Lawyer Verification Protocol
                </Link>
              </li>
              <li>
                <Link href="/registration-assistance" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Execution & Will Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal Knowledge Hub */}
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.2rem" }}>
              Legal Resources
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", padding: 0 }}>
              <li>
                <Link href="/resources" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Knowledge Hub Overview
                </Link>
              </li>
              <li>
                <Link href="/resources?cat=wills" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  What Makes a Will Valid?
                </Link>
              </li>
              <li>
                <Link href="/resources?cat=family" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Minor Guardianship in India
                </Link>
              </li>
              <li>
                <Link href="/resources?cat=assets" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Nomination vs Will Legal Conflict
                </Link>
              </li>
              <li>
                <Link href="/resources?cat=estate" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Probate Process & Jurisdiction
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.2rem" }}>
              Platform & Access
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", padding: 0 }}>
              <li>
                <Link href="/dashboard" style={{ color: "#818CF8", textDecoration: "none", fontWeight: 500 }}>
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/vault" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Will Vault & Document Storage
                </Link>
              </li>
              <li>
                <Link href="/lawyer" style={{ color: "#C9A227", textDecoration: "none", fontWeight: 500 }}>
                  Lawyer Review Workspace
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  About WillDrafting.com
                </Link>
              </li>
              <li>
                <Link href="/support" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Help & Client Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box as required in Master Context §10 & §50 */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "8px",
            padding: "1.2rem 1.5rem",
            marginBottom: "2rem",
            fontSize: "0.78rem",
            lineHeight: 1.6,
            color: "#64748B",
          }}
        >
          <strong style={{ color: "#94A3B8" }}>Legal Disclaimer: </strong>
          WillDrafting.com is an estate-planning legal technology platform and document automation software. Use of this
          platform does not create an attorney-client relationship between you and WillDrafting.com. In plans containing
          Lawyer Verification, independent licensed advocates review the structured output for formal sufficiency and
          consistency with instructions. Nothing on this website constitutes legal advice on contested litigation or tax
          counseling. Final validity depends on proper execution and attestation by two competent witnesses pursuant to
          Section 63 of the Indian Succession Act, 1925.
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.8rem",
            color: "#64748B",
          }}
        >
          <div>© {new Date().getFullYear()} WillDrafting Technologies Pvt. Ltd. All rights reserved.</div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Data Security Charter</span>
            <span>Grievance Officer</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.footer-grid) {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 600px) {
          :global(.footer-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
