"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  loadStoredWillState,
  setScenario,
  WillDraftingState,
  runLegalHealthCheck,
} from "@/lib/willDraftingStore";
import {
  Sparkles,
  ShieldAlert,
  RotateCcw,
  LayoutDashboard,
  FileText,
  UserCheck,
  ChevronUp,
  ChevronDown,
  X,
  ExternalLink,
} from "lucide-react";

export default function DemoToolbar() {
  const pathname = usePathname();
  const [state, setState] = useState<WillDraftingState | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState("");

  useEffect(() => {
    setState(loadStoredWillState());
    const handleUpdate = () => {
      setState(loadStoredWillState());
    };
    window.addEventListener("willdrafting_state_change", handleUpdate);
    return () => window.removeEventListener("willdrafting_state_change", handleUpdate);
  }, []);

  if (!state) return null;

  const issues = runLegalHealthCheck(state);
  const criticalCount = issues.filter((i) => i.severity === "critical" || i.severity === "warning").length;

  const handleScenarioSwitch = (key: "scenario_1" | "scenario_2" | "blank") => {
    const updated = setScenario(key);
    setState(updated);
    setCopiedMsg(
      key === "scenario_1"
        ? "Loaded Scenario 1 (Standard Married)"
        : key === "scenario_2"
        ? "Loaded Scenario 2 (Minor Child Edge Case)"
        : "Reset to Blank Draft"
    );
    setTimeout(() => setCopiedMsg(""), 2500);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.25rem",
        right: "1.25rem",
        zIndex: 99999,
        fontFamily: "var(--font-main)",
      }}
    >
      {/* Floating Trigger Pill */}
      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            backgroundColor: "var(--color-navy)",
            color: "#FFFFFF",
            border: "1.5px solid var(--color-gold)",
            padding: "0.55rem 0.95rem",
            borderRadius: "999px",
            boxShadow: "0 8px 24px rgba(27, 42, 74, 0.25)",
            cursor: "pointer",
            fontSize: "0.82rem",
            fontWeight: 600,
            transition: "var(--transition)",
          }}
          title="Open Demo & Scenario Controls"
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: criticalCount > 0 ? "#F59E0B" : "var(--color-sage)",
              boxShadow: `0 0 6px ${criticalCount > 0 ? "#F59E0B" : "var(--color-sage)"}`,
            }}
          />
          <Sparkles size={14} color="var(--color-gold)" />
          <span>Demo Controls</span>
          <span
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              padding: "0.15rem 0.45rem",
              borderRadius: "4px",
              fontSize: "0.72rem",
              color: "var(--color-cream)",
            }}
          >
            {state.testator.fullName ? state.testator.fullName.split(" ")[0] : "Draft"}
          </span>
          <ChevronUp size={14} />
        </button>
      ) : (
        /* Expanded Floating Card */
        <div
          style={{
            width: "360px",
            maxWidth: "calc(100vw - 2.5rem)",
            backgroundColor: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            border: "1.5px solid var(--color-navy)",
            boxShadow: "0 16px 40px rgba(27, 42, 74, 0.22)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "var(--color-navy)",
              color: "#FFFFFF",
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Sparkles size={16} color="var(--color-gold)" />
              <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>WillDrafting Demo Controls</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              style={{
                background: "none",
                border: "none",
                color: "#CBD5E1",
                cursor: "pointer",
                padding: "0.2rem",
                display: "flex",
                alignItems: "center",
              }}
              title="Close panel"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body Content */}
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {/* Active State Banner */}
            <div
              style={{
                backgroundColor: "var(--bg-page)",
                padding: "0.65rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-subtle)",
                fontSize: "0.8rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Active Profile:</span>
                <strong style={{ color: "var(--color-navy)" }}>{state.testator.fullName || "Unsaved Draft"}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--text-muted)" }}>Legal Health:</span>
                {criticalCount > 0 ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      color: "#B45309",
                      fontWeight: 600,
                    }}
                  >
                    <ShieldAlert size={12} /> {criticalCount} Warnings Detected
                  </span>
                ) : (
                  <span style={{ color: "var(--color-sage)", fontWeight: 600 }}>✓ All Checks Clear</span>
                )}
              </div>
            </div>

            {copiedMsg && (
              <div
                style={{
                  backgroundColor: "rgba(124, 148, 115, 0.15)",
                  color: "var(--color-navy)",
                  border: "1px solid var(--color-sage)",
                  padding: "0.4rem 0.6rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.75rem",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {copiedMsg}
              </div>
            )}

            {/* Load Scenario Presets */}
            <div>
              <label
                style={{
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  color: "var(--color-slate)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                1-Click Master Scenarios:
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                <button
                  type="button"
                  onClick={() => handleScenarioSwitch("scenario_1")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: state.testator.fullName.includes("Rajesh")
                      ? "rgba(27, 42, 74, 0.08)"
                      : "#FFFFFF",
                    border: state.testator.fullName.includes("Rajesh")
                      ? "1.5px solid var(--color-navy)"
                      : "1px solid var(--border-card)",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: "0.78rem",
                    color: "var(--color-navy)",
                    fontWeight: 600,
                  }}
                >
                  <div>
                    <div>Scenario 1: Married (Standard)</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 400 }}>
                      2 Adult Children, House, Investments, Spouse Executor
                    </div>
                  </div>
                  <span style={{ color: "var(--color-sage)", fontSize: "0.7rem", fontWeight: 700 }}>Clean</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleScenarioSwitch("scenario_2")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: state.testator.fullName.includes("Vikram")
                      ? "rgba(201, 162, 39, 0.12)"
                      : "#FFFFFF",
                    border: state.testator.fullName.includes("Vikram")
                      ? "1.5px solid var(--color-gold)"
                      : "1px solid var(--border-card)",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: "0.78rem",
                    color: "var(--color-navy)",
                    fontWeight: 600,
                  }}
                >
                  <div>
                    <div>Scenario 2: Minor Child (Edge Case)</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 400 }}>
                      Joint Flat, Minor Son, Missing Residuary Clause
                    </div>
                  </div>
                  <span style={{ color: "#D97706", fontSize: "0.7rem", fontWeight: 700 }}>Warnings</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleScenarioSwitch("blank")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.45rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "#FFFFFF",
                    border: "1px dashed var(--border-card)",
                    cursor: "pointer",
                    fontSize: "0.76rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <RotateCcw size={12} /> Start Fresh / Clear to Blank
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <label
                style={{
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  color: "var(--color-slate)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Jump to Workspaces:
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                <Link
                  href="/start"
                  onClick={() => setIsExpanded(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.45rem 0.6rem",
                    backgroundColor: pathname === "/start" ? "var(--color-navy)" : "var(--bg-page)",
                    color: pathname === "/start" ? "#FFFFFF" : "var(--color-navy)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <FileText size={13} /> Questionnaire
                </Link>

                <Link
                  href="/dashboard"
                  onClick={() => setIsExpanded(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.45rem 0.6rem",
                    backgroundColor: pathname.startsWith("/dashboard") ? "var(--color-navy)" : "var(--bg-page)",
                    color: pathname.startsWith("/dashboard") ? "#FFFFFF" : "var(--color-navy)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <LayoutDashboard size={13} /> Dashboard
                </Link>

                <Link
                  href="/lawyer"
                  onClick={() => setIsExpanded(false)}
                  style={{
                    gridColumn: "span 2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.35rem",
                    padding: "0.5rem 0.6rem",
                    backgroundColor: pathname === "/lawyer" ? "var(--color-navy)" : "var(--color-slate)",
                    color: "#FFFFFF",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <UserCheck size={14} color="var(--color-gold)" /> Reviewer Workspace (Lawyer Portal)
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
