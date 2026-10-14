"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import WizardButton from "./button";
import { useLanguage } from "@/context/LanguageContext";
import { WillDraftingState } from "@/lib/willDraftingStore";
import { useWillStore } from "@/lib/useWillStore";
import { Check, ShieldCheck, ArrowRight, Lock, UserCheck } from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import PaywallModal from "@/components/dashboard/PaywallModal";
import EmailOtpAuth from "@/components/auth/EmailOtpAuth";

import { PlanId } from "@/lib/authTypes";
import { PLANS, PLAN_TIERS, quotePlanUpgrade, toRupeeString, IS_TEST_PRICING } from "@/lib/plans";

interface Step13PlanSelectProps {
  state?: WillDraftingState;
  onUpdate?: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

/** Submits a hidden form to redirect the user to PayU checkout */
function postToPayu(action: string, fields: Record<string, string>) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = action;
  form.style.display = "none";
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

export default function Step13PlanSelect({
  state: propState,
  onUpdate: propOnUpdate,
  onNext,
  onBack,
}: Step13PlanSelectProps) {
  const storeState = useWillStore((s) => s.state);
  const storeUpdateState = useWillStore((s) => s.updateState);
  const state = propState || storeState;
  const onUpdate = propOnUpdate || storeUpdateState;
  const router = useRouter();
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const { data: session, status, update } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [dbPaid, setDbPaid] = useState<boolean>(false);
  const [userPlanId, setUserPlanId] = useState<PlanId>("essential");
  const [activePlanName, setActivePlanName] = useState<string>("Auto Verified (Essential Will)");
  const [paidAmount, setPaidAmount] = useState<number>(PLANS.essential.priceRupees);

  const [upgradingPlanId, setUpgradingPlanId] = useState<PlanId | null>(null);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    const checkLivePaymentStatus = async () => {
      try {
        const res = await fetch("/api/payment/user-status", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (data.paymentStatus === "paid" && isMounted) {
          setDbPaid(true);
          const sessionUserPlanId = (session?.user as { planId?: PlanId } | undefined)?.planId;
          const pid = (data.planId as PlanId) || sessionUserPlanId || "essential";
          setUserPlanId(pid);
          if (pid === "lawyer_verified") setActivePlanName(isHi ? "मैन्युअल सत्यापित (वकील सत्यापित)" : "Manually Verified (Lawyer Verified)");
          else if (pid === "premium") setActivePlanName(isHi ? "वकील से जुड़ें" : "Connect to Lawyer");
          else setActivePlanName(isHi ? "ऑटो सत्यापित (आवश्यक वसीयत)" : "Auto Verified (Essential Will)");
          if (typeof data.paidAmount === "number") {
            setPaidAmount(data.paidAmount);
          }
          if (session?.user?.paymentStatus !== "paid") {
            await update();
          }
        }
      } catch {
        // ignore
      }
    };
    checkLivePaymentStatus();
    return () => {
      isMounted = false;
    };
  }, [isHi]);

  const isAlreadyPaid =
    dbPaid ||
    session?.user?.paymentStatus === "paid";

  const [selectedPlan, setSelectedPlan] = useState<WillDraftingState["selectedPlan"]>(
    state.selectedPlan || "essential"
  );

  useEffect(() => {
    if (state.selectedPlan) {
      setSelectedPlan(state.selectedPlan);
    }
  }, [state.selectedPlan]);

  const [paywallOpen, setPaywallOpen] = useState(false);

  // Inline auth (passwordless) for unauthenticated users
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");

  const plans = [
    {
      id: "essential" as const,
      name: isHi ? "ऑटो सत्यापित (आवश्यक वसीयत)" : "Auto Verified (Essential Will)",
      price: IS_TEST_PRICING ? "₹1" : "₹2,490",
      priceRupees: PLANS.essential.priceRupees,
      desc: isHi
        ? "भारतीय उत्तराधिकार नियमों के अनुसार आधिकारिक स्वचालित वसीयत प्रारूप।"
        : "Official automated Will draft complying with Indian succession rules.",
      features: isHi
        ? [
            "संपूर्ण कानूनी वसीयत दस्तावेज (PDF)",
            "चरण-दर-चरण हस्ताक्षर एवं साक्षी मार्गदर्शिका",
            "भारतीय उत्तराधिकार अधिनियम अनुपालन",
          ]
        : [
            "Full Legal Will Document (PDF)",
            "Step-by-Step Signing & Witness Guide",
            "Indian Succession Act Compliance",
          ],
      recommended: true,
    },
    {
      id: "lawyer_verified" as const,
      name: isHi ? "मैन्युअल सत्यापित (वकील सत्यापित)" : "Manually Verified (Lawyer Verified)",
      price: IS_TEST_PRICING ? "₹2" : "₹4,990",
      priceRupees: PLANS.lawyer_verified.priceRupees,
      desc: isHi
        ? "बार काउंसिल के योग्य उत्तराधिकार योजना वकील द्वारा पंक्ति-दर-पंक्ति समीक्षा एवं डिजिटल प्रमाणन।"
        : "Line-by-line review and digital certification by a qualified Bar Council estate planning advocate.",
      features: isHi
        ? [
            "ऑटो सत्यापित की सभी सुविधाएं",
            "उच्च न्यायालय के वकील द्वारा विस्तृत समीक्षा",
          ]
        : [
            "Everything in Auto Verified",
            "Line-by-Line Review by High Court Advocate",
          ],
      recommended: false,
    },
    {
      id: "premium" as const,
      name: isHi ? "वकील से जुड़ें (वकील सत्यापित अथवा आगे के प्रश्न)" : "Connect to Lawyer (Lawyer Verified or for further queries)",
      price: IS_TEST_PRICING ? "₹3" : "₹9,990",
      priceRupees: PLANS.premium.priceRupees,
      desc: isHi
        ? "वकील आपके साथ सीधे फोन कॉल पर जुड़ेंगे, वसीयत सत्यापन और आपके सभी कानूनी प्रश्नों का समाधान।"
        : "Advocate will connect on call for Will verification and resolution for all your legal queries.",
      features: isHi
        ? [
            "वकील सत्यापित की सभी सुविधाएं",
            "वकील फोन कॉल पर सीधे जुड़ेंगे",
            "विस्तृत प्रश्नों और शंकाओं का समाधान",
          ]
        : [
            "Everything in Lawyer Verified",
            "Advocate Will Connect on Call",
            "Complete Clarification for Further Queries",
          ],
      recommended: false,
    },
  ];

  const handleConfirmPlan = () => {
    onUpdate((prev) => ({
      ...prev,
      selectedPlan,
      willStatus: selectedPlan === "lawyer_verified" ? "approved" : "finalised",
    }));
    onNext();
  };

  const handleUpgrade = async (targetPlanId: PlanId) => {
    setUpgradingPlanId(targetPlanId);
    setUpgradeError(null);
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: targetPlanId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        router.push("/login?callbackUrl=/start/12");
        return;
      }
      if (!res.ok) {
        throw new Error(data.error || "Could not start upgrade.");
      }
      postToPayu(data.action, data.fields);
    } catch (err: unknown) {
      setUpgradeError(err instanceof Error ? err.message : "Upgrade failed.");
      setUpgradingPlanId(null);
    }
  };

  const currentPaidRupees = (paidAmount).toLocaleString("en-IN");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        width: "100%",
      }}
    >
      {/* Top Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35rem" }}>
          <div className="wizard-step-header-meta" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AudioAssistantButton
              textToSpeak="Select your legal plan. You can also upgrade to lawyer verification or connect with an advocate at any time with your existing payment deducted."
              hindiText="अपनी कानूनी योजना चुनें। आप किसी भी समय वकील सत्यापन या सीधे परामर्श में अपग्रेड कर सकते हैं, आपका पुराना भुगतान घटा दिया जाएगा।"
              label={isHi ? "सुनें 🔊" : "Listen 🔊"}
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              {isHi
                ? "पारदर्शी शुल्क • भारतीय उत्तराधिकार अधिनियम के अनुसार मान्य"
                : "Transparent Pricing • Indian Succession Act Compliant"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            {isAlreadyPaid
              ? isHi
                ? "योजना अपग्रेड एवं कानूनी सत्यापन विकल्प"
                : "Plan Upgrade & Legal Certification Tiers"
              : isHi
              ? "अपनी कानूनी सत्यापन योजना चुनें"
              : "Choose your legal certification tier"}
          </h2>
        </div>
      </div>

      {/* Active Plan Status Banner (When Paid) */}
      {isAlreadyPaid && (
        <div
          style={{
            backgroundColor: "#F0FDF4",
            border: "1.5px solid #22C55E",
            borderRadius: "16px",
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            boxShadow: "0 6px 20px rgba(34, 197, 94, 0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#166534",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Check size={22} strokeWidth={3} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.15rem" }}>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    backgroundColor: "rgba(22, 101, 52, 0.12)",
                    color: "#166534",
                  }}
                >
                  <ShieldCheck size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "3px" }} />
                  {isHi ? "योजना सक्रिय है • भुगतान सत्यापित" : "Plan Active • Payment Verified"}
                </span>
                <span style={{ fontSize: "0.76rem", color: "#15803D", fontWeight: 600 }}>
                  ({session?.user?.email})
                </span>
              </div>
              <h3 style={{ margin: "0.2rem 0 0.15rem", fontSize: "1.15rem", fontWeight: 800, color: "#14532D" }}>
                {isHi ? `आपकी ${activePlanName} योजना सक्रिय है` : `Your ${activePlanName} Plan is Active`}
              </h3>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#166534", lineHeight: 1.45 }}>
                {isHi
                  ? `आपकी अंतिम वसीयत पूरी तरह अनलॉक है। नीचे दी गई उच्च योजनाओं में अपग्रेड करने पर आपके द्वारा पहले दिए गए ₹${currentPaidRupees} स्वतः घटा दिए जाएंगे।`
                  : `Your Last Will and Testament is fully unlocked. You can upgrade to a higher tier anytime — your paid ₹${currentPaidRupees} is automatically deducted.`}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={onNext}
              className="btn btn-gold"
              style={{
                padding: "0.65rem 1.4rem",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(198, 83, 120, 0.25)",
              }}
            >
              {isHi ? "अपनी मूल वसीयत देखें (चरण 14) →" : "View Final Will (Step 14) →"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/start/dashboard")}
              style={{
                padding: "0.65rem 1.1rem",
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #BBF7D0",
                color: "#166534",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              {isHi ? "डैशबोर्ड" : "Dashboard"}
            </button>
          </div>
        </div>
      )}

      {/* Upgrade Section Heading when Paid */}
      {isAlreadyPaid && (
        <div style={{ marginTop: "0.25rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.2rem 0.65rem", borderRadius: "999px", backgroundColor: "rgba(198, 83, 120, 0.1)", color: "var(--color-gold)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            ★ {isHi ? "योजना अपग्रेड विकल्प" : "Upgrade Plan • Differential Pricing"}
          </div>
          <h3 style={{ margin: "0.35rem 0 0.15rem", fontSize: "1.25rem", fontWeight: 800, color: "var(--color-navy)" }}>
            {isHi ? "उच्च योजना में अपग्रेड करें (वर्तमान भुगतान स्वतः घटाया गया)" : "Select a Higher Plan (Current Paid Amount Deducted)"}
          </h3>
          <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--color-slate)" }}>
            {isHi
              ? `आपकी पूर्व भुगतान राशि ₹${currentPaidRupees} घटा दी गई है। आपको केवल शेष राशि का भुगतान करना है।`
              : `Your existing payment of ₹${currentPaidRupees} is credited in full. Pay only the difference below to upgrade.`}
          </p>
        </div>
      )}

      {/* Upgrade Error Notice */}
      {upgradeError && (
        <div role="alert" style={{ padding: "0.75rem 1rem", backgroundColor: "rgba(220, 38, 38, 0.08)", border: "1px solid rgba(220, 38, 38, 0.25)", color: "#991B1B", borderRadius: "10px", fontSize: "0.85rem" }}>
          {upgradeError}
        </div>
      )}

      {/* Authenticated State vs Auth Required Card (Only when Unpaid) */}
      {!isAlreadyPaid && (
        isAuthenticated ? (
          <div
            style={{
              backgroundColor: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: "12px",
              padding: "0.85rem 1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "#166534",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UserCheck size={16} />
              </div>
              <div>
                <span style={{ fontSize: "0.86rem", fontWeight: 600, color: "#166534" }}>
                  {isHi ? "खाता सत्यापित:" : "Account Verified:"} {session?.user?.name || session?.user?.email}
                </span>
                <span style={{ fontSize: "0.76rem", color: "#15803D", marginLeft: "0.5rem" }}>
                  ({session?.user?.email})
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              style={{
                background: "none",
                border: "1px solid #166534",
                color: "#166534",
                borderRadius: "6px",
                padding: "0.3rem 0.75rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {isHi ? "पहले डैशबोर्ड देखें →" : "Explore Dashboard First →"}
            </button>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1.5px solid var(--color-navy)",
              borderRadius: "16px",
              padding: "1.5rem",
              boxShadow: "0 8px 30px rgba(27, 42, 74, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
              <Lock size={18} color="var(--color-navy)" />
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)" }}>
                {isHi
                  ? "अपनी वसीयत सुरक्षित रखने के लिए खाता बनाएं"
                  : "Create Account to Finalize & Vault Your Will"}
              </h3>
            </div>
            <p style={{ margin: "0 0 1rem", fontSize: "0.82rem", color: "#64748B", lineHeight: 1.4 }}>
              {isHi
                ? "आपकी प्रश्नावली तैयार है। अंतिम कानूनी वसीयत देखने और भारतीय कानून के तहत सुरक्षित करने के लिए इसे अपनी निजी तिजोरी में सहेजें।"
                : "Your estate questionnaire is ready. Save it to your private vault to view the final compiled legal deed and protect it under Indian law."}
            </p>

            {/* Mode Switch Tabs */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                style={{
                  flex: 1,
                  padding: "0.45rem",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  backgroundColor: authMode === "signup" ? "var(--color-navy)" : "#F1F5F9",
                  color: authMode === "signup" ? "#FFFFFF" : "#64748B",
                  cursor: "pointer",
                }}
              >
                {isHi ? "खाता बनाएं" : "Create Account"}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signin")}
                style={{
                  flex: 1,
                  padding: "0.45rem",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  backgroundColor: authMode === "signin" ? "var(--color-navy)" : "#F1F5F9",
                  color: authMode === "signin" ? "#FFFFFF" : "#64748B",
                  cursor: "pointer",
                }}
              >
                {isHi ? "लॉग इन करें" : "Sign In"}
              </button>
            </div>

            <EmailOtpAuth
              key={authMode}
              mode={authMode}
              initialName={state.testator?.fullName || ""}
              initialEmail={state.testator?.email || ""}
              initialPhone={state.testator?.phone || ""}
              interestedPlanId={selectedPlan}
              onSuccess={() => router.refresh()}
            />

            <div style={{ display: "flex", justifyContent: "center", marginTop: "0.85rem" }}>
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: window.location.href })}
                style={{
                  padding: "0.6rem 1rem",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  color: "#0F172A",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                {isHi ? "Google से जारी रखें" : "Continue with Google"}
              </button>
            </div>
          </div>
        )
      )}

      {/* Plan Cards 3-Column Grid */}
      <div className="plans-grid">
        {plans.map((p) => {
          const isSelected = selectedPlan === p.id;
          const isCurrentActivePlan = isAlreadyPaid && userPlanId === p.id;
          const isLowerTier = isAlreadyPaid && PLAN_TIERS[p.id] < PLAN_TIERS[userPlanId];
          const isHigherTier = isAlreadyPaid && PLAN_TIERS[p.id] > PLAN_TIERS[userPlanId];
          const upgradeQuote = isHigherTier ? quotePlanUpgrade(userPlanId, p.id) : null;
          const isUpgradingThis = upgradingPlanId === p.id;

          const upgradeAmountRupees = upgradeQuote
            ? (upgradeQuote.upgradeAmount).toLocaleString("en-IN")
            : null;
          const targetPriceRupees = upgradeQuote
            ? (upgradeQuote.targetPrice).toLocaleString("en-IN")
            : null;

          return (
            <div
              key={p.id}
              onClick={() => {
                if (!isAlreadyPaid) setSelectedPlan(p.id);
              }}
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: isCurrentActivePlan
                  ? "2.5px solid #22C55E"
                  : isSelected && !isAlreadyPaid
                  ? "2.5px solid var(--color-gold)"
                  : "1px solid rgba(27, 42, 74, 0.08)",
                padding: "1.25rem 1.35rem",
                boxShadow: isCurrentActivePlan
                  ? "0 8px 30px rgba(34, 197, 94, 0.12)"
                  : isSelected && !isAlreadyPaid
                  ? "0 8px 30px rgba(198, 83, 120, 0.15)"
                  : "0 2px 10px rgba(0, 0, 0, 0.02)",
                cursor: isAlreadyPaid ? "default" : "pointer",
                transition: "all 0.18s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Badge */}
              {isCurrentActivePlan ? (
                <div
                  style={{
                    position: "absolute",
                    top: "-11px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#166534",
                    color: "#FFFFFF",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    padding: "0.2rem 0.75rem",
                    borderRadius: "999px",
                    letterSpacing: "0.05em",
                    boxShadow: "0 2px 8px rgba(22, 101, 52, 0.35)",
                  }}
                >
                  {isHi ? "वर्तमान सक्रिय योजना (भुगतान पूर्ण)" : "Current Active Plan (Paid)"}
                </div>
              ) : isHigherTier ? (
                <div
                  style={{
                    position: "absolute",
                    top: "-11px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "var(--color-gold)",
                    color: "#FFFFFF",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    padding: "0.2rem 0.75rem",
                    borderRadius: "999px",
                    letterSpacing: "0.05em",
                    boxShadow: "0 2px 8px rgba(198, 83, 120, 0.35)",
                  }}
                >
                  {isHi ? "अपग्रेड उपलब्ध" : "Upgrade Available"}
                </div>
              ) : p.recommended && !isAlreadyPaid ? (
                <div
                  style={{
                    position: "absolute",
                    top: "-11px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "var(--color-gold)",
                    color: "#FFFFFF",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    padding: "0.2rem 0.75rem",
                    borderRadius: "999px",
                    letterSpacing: "0.05em",
                    boxShadow: "0 2px 8px rgba(198, 83, 120, 0.35)",
                  }}
                >
                  {isHi ? "अनुशंसित" : "Recommended"}
                </div>
              ) : null}

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "var(--color-navy)" }}>
                    {p.name}
                  </h4>
                  {isCurrentActivePlan ? (
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        backgroundColor: "#166534",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </div>
                  ) : !isAlreadyPaid && (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: isSelected ? "2.5px solid var(--color-gold)" : "2px solid rgba(27, 42, 74, 0.2)",
                        backgroundColor: isSelected ? "var(--color-gold)" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>

                {/* Price Display */}
                {isHigherTier && upgradeQuote ? (
                  <div style={{ margin: "0.4rem 0 0.6rem" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                      <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-navy)" }}>
                        ₹{upgradeAmountRupees}
                      </span>
                      <span style={{ fontSize: "0.85rem", textDecoration: "line-through", color: "#94A3B8" }}>
                        ₹{targetPriceRupees}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "6px",
                        backgroundColor: "#DCFCE7",
                        color: "#166534",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        marginTop: "0.2rem",
                      }}
                    >
                      <span>- ₹{currentPaidRupees} {isHi ? "वर्तमान भुगतान घटाया गया" : "Paid Credit Applied"}</span>
                    </div>
                  </div>
                ) : isCurrentActivePlan ? (
                  <div style={{ margin: "0.4rem 0 0.6rem" }}>
                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#166534" }}>
                      ₹{currentPaidRupees}
                    </div>
                    <div style={{ fontSize: "0.74rem", color: "#15803D", fontWeight: 600 }}>
                      {isHi ? "सक्रिय • कोई अतिरिक्त शुल्क नहीं" : "Active • Fully Paid"}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-navy)", margin: "0.3rem 0" }}>
                    {p.price}
                  </div>
                )}

                <p style={{ fontSize: "0.78rem", color: "var(--color-slate)", margin: "0 0 0.85rem", lineHeight: 1.4 }}>
                  {p.desc}
                </p>

                <div style={{ height: "1px", backgroundColor: "rgba(27, 42, 74, 0.06)", marginBottom: "0.85rem" }} />

                {/* Features List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {p.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.45rem", fontSize: "0.78rem", color: "var(--color-charcoal)" }}>
                      <Check size={13} color="var(--color-sage)" strokeWidth={3} style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: "1rem" }}>
                {isCurrentActivePlan ? (
                  <button
                    type="button"
                    disabled
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      backgroundColor: "rgba(22, 101, 52, 0.12)",
                      color: "#166534",
                      border: "1px solid #BBF7D0",
                      cursor: "default",
                    }}
                  >
                    {isHi ? "वर्तमान सक्रिय योजना ✓" : "Current Active Tier ✓"}
                  </button>
                ) : isLowerTier ? (
                  <button
                    type="button"
                    disabled
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      backgroundColor: "#F1F5F9",
                      color: "#94A3B8",
                      border: "none",
                      cursor: "not-allowed",
                    }}
                  >
                    {isHi ? "वर्तमान योजना में सम्मिलित" : "Included in Current Tier"}
                  </button>
                ) : isHigherTier ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpgrade(p.id);
                    }}
                    disabled={Boolean(upgradingPlanId)}
                    className="btn btn-gold"
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      cursor: upgradingPlanId ? "not-allowed" : "pointer",
                      boxShadow: "0 3px 12px rgba(198, 83, 120, 0.25)",
                      opacity: upgradingPlanId && !isUpgradingThis ? 0.6 : 1,
                    }}
                  >
                    {isUpgradingThis
                      ? isHi
                        ? "PayU पर भेजा जा रहा है..."
                        : "Redirecting to PayU..."
                      : isHi
                      ? `₹${upgradeAmountRupees} में अपग्रेड करें →`
                      : `Upgrade for ₹${upgradeAmountRupees} →`}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(p.id);
                    }}
                    className={isSelected ? "btn btn-gold" : "btn"}
                    style={{
                      width: "100%",
                      padding: "0.55rem",
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      backgroundColor: isSelected ? "var(--color-gold)" : "rgba(27, 42, 74, 0.05)",
                      color: isSelected ? "#FFFFFF" : "var(--color-navy)",
                      border: "none",
                    }}
                  >
                    {isSelected ? (isHi ? "चयनित ✓" : "Selected ✓") : (isHi ? "योजना चुनें" : "Select Tier")}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Actions & Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #E2E8F0" }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "0.6rem 1.25rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #CBD5E1",
            color: "#475569",
            cursor: "pointer",
          }}
        >
          {isHi ? "← पीछे" : "← Back"}
        </button>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => router.push("/start/dashboard")}
            style={{
              padding: "0.6rem 1rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              borderRadius: "8px",
              backgroundColor: "transparent",
              border: "1px solid var(--color-navy)",
              color: "var(--color-navy)",
              cursor: "pointer",
            }}
          >
            {isHi ? "डैशबोर्ड पर जाएं" : "Go to Dashboard"}
          </button>

          {isAlreadyPaid ? (
            <button
              type="button"
              onClick={onNext}
              className="btn btn-gold"
              style={{
                padding: "0.6rem 1.5rem",
                fontSize: "0.85rem",
                fontWeight: 700,
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                cursor: "pointer",
              }}
            >
              {isHi ? "अपनी मूल वसीयत देखें (चरण 14) →" : "View Final Will (Step 14) →"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setPaywallOpen(true)}
              className="btn btn-gold"
              style={{
                padding: "0.6rem 1.5rem",
                fontSize: "0.85rem",
                fontWeight: 700,
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                cursor: "pointer",
              }}
            >
              {isHi ? "भुगतान करें और वसीयत अनलॉक करें →" : "Pay & Unlock Will Now →"}
            </button>
          )}
        </div>
      </div>

      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onUnlocked={() => {
          handleConfirmPlan();
        }}
      />
    </div>
  );
}

