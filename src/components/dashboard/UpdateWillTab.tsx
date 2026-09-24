"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WillDraftingState, updateWillVersion } from "@/lib/willDraftingStore";
import {
  Heart,
  Baby,
  Home,
  TrendingUp,
  Scale,
  ShieldAlert,
  Users,
  Globe,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface UpdateWillTabProps {
  state: WillDraftingState;
  onStateChange: (newState: WillDraftingState) => void;
}

interface LifeEvent {
  id: string;
  title: string;
  description: string;
  Icon: React.ElementType;
  color: string;
  recommendedStep: number;
  legalImplication: string;
}

export default function UpdateWillTab({ state, onStateChange }: UpdateWillTabProps) {
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);
  const [versionSuccessMessage, setVersionSuccessMessage] = useState("");

  const lifeEvents: LifeEvent[] = [
    {
      id: "marriage",
      title: "Marriage or Remarriage",
      description: "Ensure your new spouse is provided for and nominations align with your legal intentions.",
      Icon: Heart,
      color: "#E11D48",
      recommendedStep: 3,
      legalImplication:
        "Under Indian personal law, marriage alters the statutory rights of legal heirs. Updating your Will ensures complete testamentary certainty for your spouse.",
    },
    {
      id: "new_child",
      title: "Birth or Adoption of a Child",
      description: "Appoint legal guardians and testamentary trustees for minors to avoid court guardianship.",
      Icon: Baby,
      color: "#2563EB",
      recommendedStep: 3,
      legalImplication:
        "Minors cannot legally hold title to property until age 18. Section 60 of the Indian Succession Act allows appointment of testamentary guardians.",
    },
    {
      id: "new_property",
      title: "Acquired New Property or Flat",
      description: "Add newly purchased real estate so it does not fall into partial intestacy or dispute.",
      Icon: Home,
      color: "var(--color-navy)",
      recommendedStep: 4,
      legalImplication:
        "Even with a residuary clause, specifically detailing immovable properties with survey/flat numbers provides undisputed title to your legatees.",
    },
    {
      id: "investments",
      title: "New Investments or Business Venture",
      description: "Distribute newly created Demat accounts, mutual funds, startup shares, or firm equity.",
      Icon: TrendingUp,
      color: "var(--color-gold)",
      recommendedStep: 4,
      legalImplication:
        "Nominees are mere trustees under Indian corporate law (Ram Chander Talwar v. Devinder Kumar Talwar). Your Will supersedes nominee records.",
    },
    {
      id: "divorce",
      title: "Divorce or Legal Separation",
      description: "Revoke prior spousal bequests and reassign executorship and estate distribution.",
      Icon: Scale,
      color: "#64748B",
      recommendedStep: 5,
      legalImplication:
        "Divorce decrees do not automatically cancel prior Wills in India unless an express revocation or amended Will is formally executed.",
    },
    {
      id: "beneficiary_passed",
      title: "Beneficiary or Executor Passed Away",
      description: "Reallocate expired shares and appoint replacement primary or alternate executors.",
      Icon: ShieldAlert,
      color: "#D97706",
      recommendedStep: 5,
      legalImplication:
        "Bequests to a predeceased beneficiary lapse under Section 105 of the Indian Succession Act, falling into the residuary estate or intestacy.",
    },
    {
      id: "executor_change",
      title: "Change in Executor or Guardian",
      description: "Designate a more accessible, capable, or trusted fiduciary residing in India.",
      Icon: Users,
      color: "var(--color-sage)",
      recommendedStep: 6,
      legalImplication:
        "Executors carry legal fiduciary liability for administering your estate and obtaining probate. Having willing, active executors is paramount.",
    },
    {
      id: "nri_relocation",
      title: "NRI Status or Relocation",
      description: "Address cross-border assets, repatriation rules, and FEMA compliance for beneficiaries.",
      Icon: Globe,
      color: "#0891B2",
      recommendedStep: 2,
      legalImplication:
        "Immovable property in India is governed by the lex loci rei sitae (law of India), while movable estate follows your domicile at death.",
    },
  ];

  const handleCreateNewVersion = (event: LifeEvent) => {
    const updated = updateWillVersion(`Life Event: ${event.title}`);
    onStateChange(updated);
    setVersionSuccessMessage(`Created new draft version ${updated.version}! Previous version archived in Will Vault.`);
    setSelectedEvent(null);
    setTimeout(() => setVersionSuccessMessage(""), 5000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Hero Banner */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-card)",
          padding: "2.25rem 2rem",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
          Section 38 • Lifecycle Management
        </div>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
          Life changes. Your Will should too.
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: "0.5rem 0 0", maxWidth: "700px" }}>
          Under Indian law, your Will speaks from the date of death, not the date of execution. Whenever your family structure, financial portfolio, or intentions change, updating your Will ensures complete testamentary certainty and eliminates disputes.
        </p>
      </div>

      {/* Success Notification */}
      {versionSuccessMessage && (
        <div
          style={{
            padding: "1rem 1.25rem",
            backgroundColor: "rgba(124, 148, 115, 0.15)",
            border: "1px solid var(--color-sage)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-navy)",
            fontSize: "0.9rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-sage)" }}></span>
          {versionSuccessMessage}
        </div>
      )}

      {/* Event Cards Grid */}
      <div>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "1rem" }}>
          Did anything change recently in your life?
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {lifeEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => setSelectedEvent(evt)}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-card)",
                padding: "1.5rem",
                boxShadow: "var(--shadow-sm)",
                cursor: "pointer",
                transition: "var(--transition)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-gold)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-card)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: `${evt.color}15`, color: evt.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.85rem" }}>
                  <evt.Icon size={24} />
                </div>
                <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--color-navy)" }}>
                  {evt.title}
                </h4>
                <p style={{ margin: "0.4rem 0 1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {evt.description}
                </p>
              </div>

              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--color-slate)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                Update this module →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Life Event Update Assistant Modal */}
      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(27, 42, 74, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-lg)",
              width: "100%",
              maxWidth: "580px",
              padding: "2rem",
              boxShadow: "var(--shadow-lg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1rem" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: `${selectedEvent.color}15`, color: selectedEvent.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <selectedEvent.Icon size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, color: "var(--color-navy)", fontSize: "1.25rem", fontWeight: 700 }}>
                  Update Will: {selectedEvent.title}
                </h3>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Current Version: {state.version || "v1.2"} • Next: v1.3
                </span>
              </div>
            </div>

            {/* Legal Implication Box */}
            <div
              style={{
                backgroundColor: "var(--bg-page)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                border: "1px solid var(--border-card)",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                Legal Context (Indian Succession Act 1925)
              </div>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-charcoal)" }}>
                {selectedEvent.legalImplication}
              </p>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Updating creates a new version of your Will while securely retaining all previous executed drafts in your Will Vault. Our Legal Health Check will automatically re-verify your modifications.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setSelectedEvent(null)}
                style={{
                  padding: "0.6rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-card)",
                  backgroundColor: "#FFFFFF",
                  color: "var(--color-slate)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => handleCreateNewVersion(selectedEvent)}
                style={{
                  padding: "0.6rem 1.15rem",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--color-navy)",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Archive & Bump Version
              </button>

              <Link
                href={`/start?step=${selectedEvent.recommendedStep}`}
                className="btn btn-gold"
                style={{
                  padding: "0.6rem 1.35rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                Edit in Questionnaire Wizard →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
