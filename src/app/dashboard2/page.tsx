"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  WillDraftingState,
  loadStoredWillState,
  saveStoredWillState,
  generateWillClauses,
  SCENARIO_1_STANDARD_MARRIED,
} from "@/lib/willDraftingStore";
import VisualWillWizard from "@/components/dashboard2/VisualWillWizard";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FileText,
  Users,
  Building,
  Scale,
  Award,
  CheckCircle2,
  Printer,
  ChevronRight,
  RotateCcw,
  ExternalLink,
  Layers,
  HeartHandshake,
} from "lucide-react";

function Dashboard2Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wizardParam = searchParams.get("wizard");

  const [state, setState] = useState<WillDraftingState>(() => {
    const s = loadStoredWillState();
    if (!s.clauses || s.clauses.length === 0) {
      s.clauses = generateWillClauses(s);
    }
    return s;
  });

  const [isWizardOpen, setIsWizardOpen] = useState(wizardParam === "true");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loaded = loadStoredWillState();
    if (!loaded.clauses || loaded.clauses.length === 0) {
      loaded.clauses = generateWillClauses(loaded);
    }
    setState(loaded);

    const handleStateChange = () => {
      setState(loadStoredWillState());
    };
    window.addEventListener("willdrafting_state_change", handleStateChange);
    return () => {
      window.removeEventListener("willdrafting_state_change", handleStateChange);
    };
  }, []);

  useEffect(() => {
    setIsWizardOpen(wizardParam === "true");
  }, [wizardParam]);

  if (!mounted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
        <div style={{ color: "var(--color-navy)", fontWeight: 700 }}>Loading Dashboard 2.0...</div>
      </div>
    );
  }

  // If in wizard mode, render the full visual wizard
  if (isWizardOpen) {
    return <VisualWillWizard />;
  }

  const testator = state.testator;
  const totalAssetsValue = state.assets.reduce((sum, a) => sum + (a.approximateValue || 0), 0);
  const startupCount = state.assets.filter((a) => a.typeDetails?.includes("Startup") || a.category === "business").length;

  const audioSummary = `Welcome to your visual estate dashboard, Dr. Rohit Srivastava! Your estate is valued at approximately ${Math.round(totalAssetsValue / 100000) / 100} Crore Rupees, including ${startupCount} deep tech startups in Schedule A and ${state.familyMembers.length} listed family members. Your will is 100 percent legally compliant under the Indian Succession Act 1925.`;

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", color: "var(--color-navy)", paddingBottom: "5rem" }}>
      {/* Top Navbar */}
      <header
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid rgba(27, 42, 74, 0.08)",
          position: "sticky",
          top: 0,
          zIndex: 30,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: "1160px",
            margin: "0 auto",
            padding: "0.85rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, var(--color-navy) 0%, #1a2f55 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                boxShadow: "0 2px 8px rgba(27, 42, 74, 0.2)",
              }}
            >
              🏛️
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--color-navy)", letterSpacing: "-0.01em" }}>
                WillDrafting<span style={{ color: "var(--color-gold)" }}>.com</span>
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-slate)" }}>
                Visual Estate Architecture • ISA 1925 Compliant
              </div>
            </div>
          </div>

          {/* Quick Nav Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "rgba(46, 125, 50, 0.08)",
                border: "1px solid rgba(46, 125, 50, 0.2)",
                padding: "0.4rem 0.85rem",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#2E7D32",
              }}
            >
              <ShieldCheck size={16} /> Will Deed Certified Ready
            </div>

            <Link
              href="/dashboard"
              style={{
                fontSize: "0.8rem",
                color: "var(--color-slate)",
                textDecoration: "none",
                padding: "0.4rem 0.85rem",
                borderRadius: "10px",
                border: "1px solid rgba(27, 42, 74, 0.12)",
                background: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <ExternalLink size={13} /> View Classic Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: "1160px", margin: "0 auto", padding: "1.75rem 1.25rem 0" }}>
        {/* Welcome Hero Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            borderRadius: "24px",
            padding: "2rem 2.25rem",
            color: "#FFFFFF",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
            marginBottom: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Ambient Background Accent */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201, 162, 39, 0.25) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
            <div style={{ maxWidth: "680px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  background: "rgba(201, 162, 39, 0.2)",
                  color: "var(--color-gold)",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  padding: "0.3rem 0.75rem",
                  borderRadius: "20px",
                  marginBottom: "0.85rem",
                }}
              >
                <Sparkles size={14} /> NEW VISUAL WILL ARCHITECTURE (नया आसान तरीका)
              </div>

              <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 0.5rem", letterSpacing: "-0.01em" }}>
                Namaste, {testator.fullName || "Dr. Rohit Srivastava"}!
              </h1>

              <p style={{ fontSize: "0.95rem", color: "#94A3B8", margin: "0 0 1.25rem", lineHeight: 1.55 }}>
                Your complete legal will deed is ready under the Indian Succession Act 1925. Experience the tap-first visual wizard designed so anyone can review and update their estate without confusing paperwork.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setIsWizardOpen(true)}
                  style={{
                    padding: "0.8rem 1.6rem",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, var(--color-gold) 0%, #b38b19 100%)",
                    color: "#FFFFFF",
                    fontSize: "0.98rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(201, 162, 39, 0.35)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "transform 0.15s ease",
                  }}
                >
                  <Sparkles size={18} /> Open Visual Will Builder →
                </button>

                <AudioAssistantButton textToSpeak={audioSummary} label="Listen to Summary 🔊" />
              </div>
            </div>

            {/* Testator Card Quick Pill */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(8px)",
                borderRadius: "18px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "1.25rem 1.5rem",
                minWidth: "260px",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
                Testator Profile
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.25rem" }}>
                {testator.fullName}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--color-gold)", marginBottom: "0.6rem" }}>
                PAN: {testator.pan} • Aadhaar: {testator.aadhaar}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.4 }}>
                📍 IIT Bombay, Powai, Mumbai
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {/* Card 1: Total Value */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              border: "1px solid rgba(27, 42, 74, 0.08)",
              padding: "1.25rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-slate)" }}>Total Estate Value</span>
              <span style={{ fontSize: "1.3rem" }}>💎</span>
            </div>
            <div style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--color-navy)" }}>
              ₹{(totalAssetsValue / 10000000).toFixed(2)} Cr
            </div>
            <div style={{ fontSize: "0.75rem", color: "#2E7D32", fontWeight: 600, marginTop: "0.2rem" }}>
              Across 10 distinct asset classes
            </div>
          </div>

          {/* Card 2: Schedule A Startups */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              border: "1px solid rgba(27, 42, 74, 0.08)",
              padding: "1.25rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-slate)" }}>Schedule A Startups</span>
              <span style={{ fontSize: "1.3rem" }}>🚀</span>
            </div>
            <div style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--color-navy)" }}>
              {startupCount} Companies
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-slate)", marginTop: "0.2rem" }}>
              Biotech & Medtech ventures (CIN attached)
            </div>
          </div>

          {/* Card 3: Beneficiaries */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              border: "1px solid rgba(27, 42, 74, 0.08)",
              padding: "1.25rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-slate)" }}>Beneficiaries</span>
              <span style={{ fontSize: "1.3rem" }}>👨‍👩‍👧</span>
            </div>
            <div style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--color-navy)" }}>
              {state.familyMembers.length} Members
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-slate)", marginTop: "0.2rem" }}>
              Spouse, Daughter, Brother, Co-founder
            </div>
          </div>

          {/* Card 4: Legal Status */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              border: "1px solid rgba(27, 42, 74, 0.08)",
              padding: "1.25rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-slate)" }}>Legal Status</span>
              <span style={{ fontSize: "1.3rem" }}>⚖️</span>
            </div>
            <div style={{ fontSize: "1.65rem", fontWeight: 800, color: "#2E7D32" }}>
              100% Ready
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-slate)", marginTop: "0.2rem" }}>
              Section 63 ISA 1925 Attestation Ready
            </div>
          </div>
        </div>

        {/* 6 Visual Step Hub Section */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
                Visual Will Hub (वसीयत के 6 आसान चरण)
              </h2>
              <p style={{ fontSize: "0.85rem", color: "var(--color-slate)", margin: "0.25rem 0 0" }}>
                Tap any card to jump directly into that visual step
              </p>
            </div>

            <button
              onClick={() => setIsWizardOpen(true)}
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--color-gold)",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              Start from Step 1 <ArrowRight size={14} />
            </button>
          </div>

          {/* 6 Grid Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
            {/* Step 1: Identity */}
            <div
              onClick={() => setIsWizardOpen(true)}
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "1.5px solid rgba(27, 42, 74, 0.08)",
                padding: "1.35rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(27, 42, 74, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    👤
                  </div>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-navy)" }}>
                      1. Who Are You? (आपकी पहचान)
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                      Personal & Workplace Identity
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="#94A3B8" />
              </div>
              <div style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.45, background: "#F8FAFC", padding: "0.65rem 0.85rem", borderRadius: "10px" }}>
                <strong>{testator.fullName}</strong> • IIT Bombay Faculty • PAN {testator.pan}
              </div>
            </div>

            {/* Step 2: Family */}
            <div
              onClick={() => setIsWizardOpen(true)}
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "1.5px solid rgba(27, 42, 74, 0.08)",
                padding: "1.35rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(27, 42, 74, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    👨‍👩‍👧
                  </div>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-navy)" }}>
                      2. Family Members (परिवार के सदस्य)
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                      Beneficiaries & Legal Heirs
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="#94A3B8" />
              </div>
              <div style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.45, background: "#F8FAFC", padding: "0.65rem 0.85rem", borderRadius: "10px" }}>
                Mrs. Alpana Prakash (Spouse), Ms. Aarohi Shankar (Daughter), Mr. Amit Srivastava (Brother)
              </div>
            </div>

            {/* Step 3: Assets */}
            <div
              onClick={() => setIsWizardOpen(true)}
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "1.5px solid rgba(27, 42, 74, 0.08)",
                padding: "1.35rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(27, 42, 74, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    🏦
                  </div>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-navy)" }}>
                      3. Assets & Schedule A (संपत्तियां)
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                      Properties, Startups, Accounts
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="#94A3B8" />
              </div>
              <div style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.45, background: "#F8FAFC", padding: "0.65rem 0.85rem", borderRadius: "10px" }}>
                4 Immovable Properties • 13 Startup Equities • 5 Bank Accounts • Valuables & Locker
              </div>
            </div>

            {/* Step 4: Allocations */}
            <div
              onClick={() => setIsWizardOpen(true)}
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "1.5px solid rgba(27, 42, 74, 0.08)",
                padding: "1.35rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(27, 42, 74, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    ⚖️
                  </div>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-navy)" }}>
                      4. Asset Allocations (बंटवारा)
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                      Percentages & Specific Bequests
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="#94A3B8" />
              </div>
              <div style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.45, background: "#F8FAFC", padding: "0.65rem 0.85rem", borderRadius: "10px" }}>
                100% to Spouse • 50/50 Maternal Properties to Brother • Clinicosis 49% Dr. Arnab Ghosh
              </div>
            </div>

            {/* Step 5: Executors */}
            <div
              onClick={() => setIsWizardOpen(true)}
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "1.5px solid rgba(27, 42, 74, 0.08)",
                padding: "1.35rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(27, 42, 74, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    🤝
                  </div>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-navy)" }}>
                      5. Will Executors (प्रबंधक)
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                      Primary & Alternate Captains
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="#94A3B8" />
              </div>
              <div style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.45, background: "#F8FAFC", padding: "0.65rem 0.85rem", borderRadius: "10px" }}>
                Primary: <strong>{state.executorPrimary.name || "Mr. Ashok Ajmera"}</strong> • Alternate: <strong>{state.executorAlternate.name || "Mrs. Alpana Prakash"}</strong>
              </div>
            </div>

            {/* Step 6: Final Will */}
            <div
              onClick={() => setIsWizardOpen(true)}
              style={{
                background: "linear-gradient(135deg, rgba(201, 162, 39, 0.08) 0%, rgba(201, 162, 39, 0.02) 100%)",
                borderRadius: "18px",
                border: "2px solid var(--color-gold)",
                padding: "1.35rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 16px rgba(201, 162, 39, 0.12)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "var(--color-gold)", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    📜
                  </div>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-navy)" }}>
                      6. Final Legal Will Deed (वसीयतनामा)
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-gold)", fontWeight: 700 }}>
                      Word-for-Word Legal Text Ready
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="var(--color-gold)" />
              </div>
              <div style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.45, background: "#FFFFFF", padding: "0.65rem 0.85rem", borderRadius: "10px" }}>
                11 Legal Clauses • Schedule A Attached • Attestation & Execution Guide Ready
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard2Page() {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <Dashboard2Content />
    </Suspense>
  );
}
