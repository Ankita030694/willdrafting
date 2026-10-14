"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { WillDraftingState } from "@/lib/willDraftingStore";
import { useWillStore } from "@/lib/useWillStore";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { areAllDetailsFilled } from "@/components/wizard/WizardStepProgressBar";
import {
  LayoutDashboard,
  User,
  Users,
  Landmark,
  PieChart,
  Scale,
  ShieldCheck,
  ScrollText,
  HeartHandshake,
  Search,
  Activity,
  Cpu,
  Tag,
  FileText,
  Check,
  Lock,
  ChevronDown,
  LogOut,
  LogIn,
} from "lucide-react";

interface SidebarStepItem {
  num: number;
  displayNum?: number;
  isWelcome?: boolean;
  title: string;
  hindi: string;
  icon: React.ElementType;
  optionalNote?: string;
}

interface SidebarPhaseItem {
  id: string;
  title: string;
  hindiTitle: string;
  steps: SidebarStepItem[];
}

interface WizardSidebarProps {
  currentStep: number;
  onJumpToStep: (step: number) => void;
  state?: WillDraftingState;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
  hideDashboardLink?: boolean;
}

export default function WizardSidebar({
  currentStep,
  onJumpToStep,
  state: propState,
  lang = "en",
  onChangeLang,
  hideDashboardLink = false,
}: WizardSidebarProps) {
  const storeState = useWillStore((s) => s.state);
  const state = propState || storeState;
  const { data: session } = useSession();
  const isHi = lang === "hi";
  const hasMinors = state.familyMembers.some((f) => f.isMinor);

  // Plan selection & the final Will are only revealed once the user has filled in their details
  // (or reached the review stage / already paid) — payment is asked for at the finalise & download point.
  const isPaid = session?.user?.paymentStatus === "paid";
  const showPaymentSteps = isPaid || currentStep >= 10 || areAllDetailsFilled(state);

  const userDisplayName = session?.user?.name || state.testator.fullName || "User";
  const userEmail = session?.user?.email || state.testator.email || "";
  const initials = (userDisplayName || "U")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

  const phases: SidebarPhaseItem[] = [
    {
      id: "phase-1",
      title: "Phase 1: Personal & Family",
      hindiTitle: "व्यक्तिगत एवं परिवार",
      steps: [
        { num: 1, isWelcome: true, title: "Dashboard", hindi: "डैशबोर्ड", icon: LayoutDashboard },
        { num: 2, displayNum: 1, title: "About You", hindi: "अपनी जानकारी", icon: User },
        { num: 3, displayNum: 2, title: "My Family", hindi: "परिवार", icon: Users },
      ],
    },
    {
      id: "phase-2",
      title: "Phase 2: Estate & Wealth",
      hindiTitle: "संपत्ति एवं धन",
      steps: [
        { num: 4, displayNum: 3, title: "Assets Register", hindi: "संपत्ति", icon: Landmark },
        { num: 5, displayNum: 4, title: "Allocations", hindi: "बंटवारा", icon: PieChart },
        { num: 6, displayNum: 5, title: "Executors", hindi: "प्रबंधक", icon: Scale },
        { num: 7, displayNum: 6, title: "Testamentary Guardians", hindi: "अभिभावक", icon: ShieldCheck, optionalNote: !hasMinors ? "(No Minors)" : undefined },
      ],
    },
    {
      id: "phase-3",
      title: "Phase 3: Directives & Intent",
      hindiTitle: "विशेष इच्छाएं",
      steps: [
        { num: 8, displayNum: 7, title: "Special Wishes", hindi: "उपहार", icon: ScrollText },
        { num: 9, displayNum: 8, title: "Emotional Purpose", hindi: "संदेश", icon: HeartHandshake },
      ],
    },
    {
      id: "phase-4",
      title: "Phase 4: Verification & Will",
      hindiTitle: "कानूनी वसीयत",
      steps: [
        { num: 10, displayNum: 9, title: "Full Review", hindi: "समीक्षा", icon: Search },
        { num: 11, displayNum: 10, title: "Legal Health Check", hindi: "कानूनी जांच", icon: Activity },
        { num: 12, displayNum: 11, title: "Clause Assembly", hindi: "संकलन", icon: Cpu },
        ...(showPaymentSteps
          ? [
              { num: 13, displayNum: 12, title: "Plan Selection", hindi: "योजना", icon: Tag },
              { num: 14, displayNum: 13, title: "Final Will Document", hindi: "मूल वसीयत", icon: FileText },
            ]
          : []),
      ],
    },
  ];

  const getActivePhaseId = (stepNum: number) => {
    if (stepNum <= 3) return "phase-1";
    if (stepNum <= 7) return "phase-2";
    if (stepNum <= 9) return "phase-3";
    return "phase-4";
  };

  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>(() => {
    const activeId = getActivePhaseId(currentStep);
    return {
      "phase-1": activeId === "phase-1",
      "phase-2": activeId === "phase-2",
      "phase-3": activeId === "phase-3",
      "phase-4": activeId === "phase-4",
    };
  });

  useEffect(() => {
    const activeId = getActivePhaseId(currentStep);
    setOpenPhases((prev) => ({
      ...prev,
      [activeId]: true,
    }));
  }, [currentStep]);

  const togglePhase = (phaseId: string) => {
    setOpenPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  const totalSteps = 13;
  const progressPercent =
    currentStep <= 1
      ? 0
      : Math.min(100, Math.round(((currentStep - 1) / totalSteps) * 100));


  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "#FAF7F0",
        backdropFilter: "blur(28px) saturate(190%)",
        color: "#172228",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        borderRight: "1px solid rgba(23, 34, 40, 0.08)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
      className="wizard-sidebar-container"
    >
      {/* macOS-style Header & Return Action */}
      <div
        style={{
          padding: "1rem 1rem",
          borderBottom: "1px solid rgba(23, 34, 40, 0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="/Logofinal.svg"
              alt="WillDrafting.in"
              width={125}
              height={32}
              style={{ height: "32px", width: "auto", objectFit: "contain" }}
              priority
            />
          </Link>

          {!hideDashboardLink && currentStep > 1 && (
            <Link
              href="/start/dashboard"
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "#172228",
                padding: "0.3rem 0.65rem",
                borderRadius: "999px",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(23, 34, 40, 0.1)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                transition: "all 0.15s ease",
                boxShadow: "0 1px 3px rgba(23, 34, 40, 0.04)",
              }}
            >
              <span>←</span> {isHi ? "डैशबोर्ड" : "Dashboard"}
            </Link>
          )}
        </div>
      </div>

      {/* Stepper List */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.75rem 0.65rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.45rem",
        }}
      >
        {phases.map((phase) => {
          const isOpen = !!openPhases[phase.id];
          const hasActiveStep = phase.steps.some((s) => s.num === currentStep);
          const allPhaseCompleted = phase.steps.every((s) => currentStep > s.num);

          return (
            <div
              key={phase.id}
              style={{
                borderRadius: "12px",
                backgroundColor: isOpen ? "rgba(23, 34, 40, 0.02)" : "transparent",
                border: isOpen
                  ? "1px solid rgba(23, 34, 40, 0.06)"
                  : "1px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              <button
                type="button"
                onClick={() => togglePhase(phase.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.4rem",
                  padding: "0.55rem 0.6rem",
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  color: hasActiveStep
                    ? "#C65378"
                    : allPhaseCompleted
                    ? "#172228"
                    : "#49585F",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(23, 34, 40, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: hasActiveStep ? "#C65378" : "inherit",
                    }}
                  >
                    {isHi ? phase.hindiTitle : phase.title}
                  </span>
                </div>

                <ChevronDown
                  size={15}
                  style={{
                    flexShrink: 0,
                    color: hasActiveStep ? "#C65378" : "#49585F",
                    opacity: 0.85,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.15rem",
                      padding: "0.15rem 0.35rem 0.45rem",
                    }}
                  >
                    {phase.steps.map((step) => {
                      const isActive = currentStep === step.num;
                      const isCompleted = currentStep > step.num;

                      return (
                        <button
                          key={step.num}
                          onClick={() => onJumpToStep(step.num)}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.55rem",
                            padding: "0.4rem 0.6rem",
                            borderRadius: "10px",
                            backgroundColor: isActive
                              ? "rgba(198, 83, 120, 0.09)"
                              : "transparent",
                            border: isActive ? "1px solid rgba(198, 83, 120, 0.2)" : "1px solid transparent",
                            borderLeft: isActive ? "3px solid #C65378" : "1px solid transparent",
                            color: isActive
                              ? "#C65378"
                              : isCompleted
                              ? "#172228"
                              : "#49585F",
                            cursor: "pointer",
                            fontSize: "0.78rem",
                            fontWeight: isActive ? 700 : isCompleted ? 600 : 500,
                            textAlign: "left",
                            transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                            position: "relative",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) e.currentTarget.style.backgroundColor = "rgba(23, 34, 40, 0.04)";
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          {/* Indicator Dot/Badge */}
                          <span
                            style={{
                              width: "22px",
                              height: "22px",
                              borderRadius: "50%",
                              backgroundColor: isActive
                                ? "#C65378"
                                : isCompleted
                                ? "#5F7E75"
                                : "rgba(23, 34, 40, 0.08)",
                              color: isActive || isCompleted ? "#FFFFFF" : "#49585F",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.7rem",
                              fontWeight: 800,
                              flexShrink: 0,
                              boxShadow: isActive ? "0 2px 6px rgba(198, 83, 120, 0.3)" : "none",
                            }}
                          >
                            {isCompleted ? (
                              <Check size={12} strokeWidth={3} />
                            ) : step.isWelcome ? (
                              <LayoutDashboard size={11} strokeWidth={2.5} />
                            ) : (
                              step.displayNum ?? (step.num - 1)
                            )}
                          </span>

                          {/* Step Icon */}
                          {React.createElement(step.icon, {
                            size: 15,
                            style: {
                              flexShrink: 0,
                              color: isActive
                                ? "#C65378"
                                : isCompleted
                                ? "#5F7E75"
                                : "#49585F",
                            },
                          })}

                          <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {isHi && step.hindi ? step.hindi : step.title}
                            </span>
                          </div>

                          {step.optionalNote && (
                            <span style={{ fontSize: "0.65rem", color: "#49585F" }}>
                              {isHi ? "(नाबालिग नहीं)" : step.optionalNote}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* User Account & Logout Footer */}
      <div
        style={{
          marginTop: "auto",
          padding: "0.75rem 0.85rem",
          borderTop: "1px solid rgba(23, 34, 40, 0.08)",
          backgroundColor: "#FFFFFF",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", minWidth: 0, flex: 1 }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "var(--color-navy)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#172228",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {userDisplayName}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#55636D",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {userEmail || (session?.user ? "Logged In" : "Guest Mode")}
              </div>
            </div>
          </div>

          {session?.user ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              title="Sign out of your account"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.35rem 0.6rem",
                borderRadius: "8px",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                backgroundColor: "rgba(239, 68, 68, 0.08)",
                color: "#DC2626",
                fontSize: "0.72rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
                flexShrink: 0,
              }}
            >
              <LogOut size={12} />
              <span>{isHi ? "लॉगआउट" : "Logout"}</span>
            </button>
          ) : (
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.35rem 0.6rem",
                borderRadius: "8px",
                border: "1px solid rgba(23, 34, 40, 0.15)",
                backgroundColor: "rgba(23, 34, 40, 0.04)",
                color: "#172228",
                fontSize: "0.72rem",
                fontWeight: 600,
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <LogIn size={12} />
              <span>{isHi ? "लॉगिन" : "Login"}</span>
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}

