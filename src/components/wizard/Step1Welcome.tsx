"use client";

import React from "react";
import { WillDraftingState } from "@/lib/willDraftingStore";
import {
  Sparkles,
  Clock,
  FileText,
  Lock,
  Scale,
  Users,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step1WelcomeProps {
  state: WillDraftingState;
  onNext: () => void;
}

export default function Step1Welcome({ onNext }: Step1WelcomeProps) {
  const roadmapItems = [
    {
      num: "01",
      title: "Personal & Family Structure",
      desc: "Testator personal law details, spouse, children, and immediate natural heirs.",
      Icon: Users,
    },
    {
      num: "02",
      title: "Assets & Wealth Register",
      desc: "Immovable properties, bank accounts, Demat portfolios, jewellery, and digital accounts.",
      Icon: Building,
    },
    {
      num: "03",
      title: "Allocations & Appointments",
      desc: "Percentage distributions, primary & alternate executors, and minor guardians.",
      Icon: Scale,
    },
    {
      num: "04",
      title: "Audit & Final Document",
      desc: "Automated 100-point legal audit, ISA clause generation, and printable certified Will.",
      Icon: FileText,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%", height: "100%", justifyContent: "space-between" }}>
      {/* Sleek Onboarding Hero Card */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(250, 247, 240, 0.9))",
          borderRadius: "20px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "1.5rem 1.75rem",
          boxShadow: "0 8px 30px rgba(27, 42, 74, 0.04)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          {/* Eyebrow Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "999px",
              backgroundColor: "rgba(201, 162, 39, 0.12)",
              color: "var(--color-navy)",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <Sparkles size={13} color="var(--color-gold)" />
            Legal-Tech Guided Will Drafter
          </div>

          {/* Quick Facts Chips & Audio Assistant */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <AudioAssistantButton
              textToSpeak="Welcome to Will Drafting! Making a will is an act of love to protect your family. It takes just 10 to 15 minutes. We guide you step by step in simple language. Tap Begin Questionnaire to start."
              label="Listen / सुनें 🔊"
            />
            {[
              { Icon: Clock, label: "10-15 Min" },
              { Icon: Scale, label: "ISA 1925 Compliant" },
              { Icon: Lock, label: "100% Private" },
              { Icon: ShieldCheck, label: "Legal Standards" },
            ].map((chip) => {
              const ChipIcon = chip.Icon;
              return (
                <div
                  key={chip.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "8px",
                    backgroundColor: "rgba(27, 42, 74, 0.04)",
                    fontSize: "0.74rem",
                    fontWeight: 600,
                    color: "var(--color-navy)",
                  }}
                >
                  <ChipIcon size={13} color="var(--color-slate)" />
                  <span>{chip.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h1
            style={{
              fontSize: "1.85rem",
              fontWeight: 800,
              color: "var(--color-navy)",
              lineHeight: 1.25,
              letterSpacing: "-0.025em",
              margin: "0 0 0.35rem",
            }}
          >
            Making a Will is an act of love, not fear.
          </h1>
          <div style={{ fontSize: "0.95rem", color: "#8A6D1B", fontWeight: 600, marginBottom: "0.45rem" }}>
            वसीयतनामा बनाना अपने परिवार की सुरक्षा का सबसे बड़ा कदम है
          </div>

          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-slate)",
              lineHeight: 1.55,
              margin: 0,
              maxWidth: "850px",
            }}
          >
            Taking 10 minutes today protects your loved ones from court disputes and delays. Simply tap and answer at your own pace—no complex legal paperwork required.
          </p>
        </div>
      </div>

      {/* 4-Phase Horizontal Grid */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)", margin: "0 0 0.65rem" }}>
          What you will complete in 4 simple phases:
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.85rem", flex: 1, minHeight: 0 }}>
          {roadmapItems.map((item) => {
            const ItemIcon = item.Icon;
            return (
              <div
                key={item.num}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid rgba(27, 42, 74, 0.08)",
                  padding: "1rem 1.15rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        backgroundColor: "rgba(27, 42, 74, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ItemIcon size={18} color="var(--color-navy)" />
                    </div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--color-gold)" }}>
                      {item.num}
                    </span>
                  </div>

                  <h4 style={{ margin: "0 0 0.3rem", fontSize: "0.92rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    {item.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--color-slate)", lineHeight: 1.45 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar: Clean Assurance + Action Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.85rem 1.25rem",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <ShieldCheck size={18} color="var(--color-sage)" />
          <span style={{ fontSize: "0.82rem", color: "var(--color-navy)", fontWeight: 500 }}>
            <strong>Private & Secure:</strong> All entries remain confidential. Clear descriptive identifiers are sufficient under Indian law.
          </span>
        </div>

        <button
          onClick={onNext}
          className="btn btn-gold"
          style={{
            padding: "0.75rem 1.85rem",
            borderRadius: "12px",
            fontSize: "0.95rem",
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 4px 16px rgba(201, 162, 39, 0.25)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <span>Begin Questionnaire</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
