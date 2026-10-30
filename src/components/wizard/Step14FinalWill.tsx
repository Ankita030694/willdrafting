"use client";

import React, { useState } from "react";
import WizardButton from "./button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { WillDraftingState } from "@/lib/willDraftingStore";
import { useWillStore } from "@/lib/useWillStore";
import { downloadWillPdf, unlockWillOnServer } from "@/lib/willSync";
import AppleSwitch from "@/components/dashboard/AppleSwitch";
import WillDocument from "@/components/will/WillDocument";
import PaywallModal from "@/components/dashboard/PaywallModal";
import {
  Check,
  Printer,
  LayoutDashboard,
  FileText,
  ShieldCheck,
  ArrowLeft,
  Download,
  Lock,
  AlertCircle,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import { useLanguage } from "@/context/LanguageContext";
import WillVerificationModal from "./WillVerificationModal";
import PaymentReturnBanner from "@/components/dashboard/PaymentReturnBanner";
import InfoTooltip from "./InfoTooltip";

interface Step14FinalWillProps {
  state?: WillDraftingState;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

export default function Step14FinalWill({ state: propState, onBack }: Step14FinalWillProps) {
  const storeState = useWillStore((s) => s.state);
  const state = propState || storeState;
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const { data: session, update } = useSession();
  const [dbPaid, setDbPaid] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);

  React.useEffect(() => {
    let isMounted = true;
    const checkLivePaymentStatus = async () => {
      try {
        const res = await fetch("/api/payment/user-status", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (data.paymentStatus === "paid" && isMounted) {
          setDbPaid(true);
          if (session?.user?.paymentStatus !== "paid") {
            await update();
          }
        }
      } catch {
        // ignore
      } finally {
        if (isMounted) setLoadingStatus(false);
      }
    };
    checkLivePaymentStatus();
    return () => {
      isMounted = false;
    };
  }, []);

  const isPaid = dbPaid || session?.user?.paymentStatus === "paid";

  const [paywallOpen, setPaywallOpen] = useState(false);
  const isVerified = Boolean(state.detailsVerified);
  const [downloadError, setDownloadError] = useState("");
  const [showWatermark, setShowWatermark] = useState(false);

  const printWithServerAuth = async () => {
    setDownloadError("");
    const auth = await downloadWillPdf();
    if (!auth.ok) {
      if (auth.status === 402) setPaywallOpen(true);
      setDownloadError(auth.error || "Download is not available.");
      return;
    }
  };

  const handlePrint = () => {
    if (!isPaid) {
      setPaywallOpen(true);
      return;
    }
    if (!isVerified) {
      window.location.href = "/start/09";
      return;
    }
    void printWithServerAuth();
  };

  if (loadingStatus && !isPaid) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#172228", fontWeight: 600 }}>
          <div style={{ width: "24px", height: "24px", border: "3px solid #E2E8F0", borderTopColor: "#C65378", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
          <span>{isHi ? "वसीयत सत्यापन जांचा जा रहा है..." : "Verifying Will Access & Payment..."}</span>
        </div>
      </div>
    );
  }



  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        width: "100%",
        minHeight: "100%",
      }}
    >
      <PaymentReturnBanner />
      {/* Apple-style Action Strip */}
      <div
        className="final-will-top-bar"
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "0.75rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          boxShadow: "0 2px 10px rgba(27, 42, 74, 0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: isPaid ? "var(--color-sage)" : "rgba(198, 83, 120, 0.15)",
              color: isPaid ? "#FFFFFF" : "#C65378",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isPaid ? "0 2px 8px rgba(124, 148, 115, 0.35)" : "none",
              flexShrink: 0,
            }}
          >
            {isPaid ? <Check size={18} strokeWidth={3} /> : <Lock size={18} />}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "var(--color-navy)" }}>
              {isPaid
                ? (isHi ? "आपकी वसीयत कानूनी रूप से तैयार है" : "Your Will is Legally Compiled & Ready")
                : (isHi ? "अंतिम वसीयत लॉक है • भुगतान आवश्यक" : "Final Will Document Locked • Payment Required")}
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              {isPaid
                ? (isHi
                    ? `संस्करण ${state.version || "v1.2"} • भारतीय कानून अनुसार मान्य • हस्ताक्षर हेतु तैयार`
                    : `Version ${state.version || "v1.2"} • Indian Law Compliant • Ready to Sign`)
                : (isHi
                    ? "अपनी पूर्ण कानूनी वसीयत को देखने और डाउनलोड करने के लिए कृपया योजना का भुगतान पूरा करें"
                    : "Complete your plan payment to unlock, view, and download your official legal Will")}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
          <AudioAssistantButton
            textToSpeak={
              isPaid
                ? "Congratulations! Here is your complete Last Will and Testament. You can print it on normal A4 paper or save it as a PDF."
                : "Your Last Will and Testament has been compiled. Please complete payment to unlock and view your official Will document."
            }
            hindiText={
              isPaid
                ? "बधाई हो! यह आपकी पूर्ण अंतिम वसीयत है। आप इसे सामान्य A4 कागज पर प्रिंट कर सकते हैं या PDF के रूप में सहेज सकते हैं।"
                : "आपकी अंतिम वसीयत तैयार हो चुकी है। अपने आधिकारिक वसीयत दस्तावेज को देखने और डाउनलोड करने के लिए कृपया भुगतान पूरा करें।"
            }
            label={isHi ? "सुनें 🔊" : "Listen 🔊"}
          />
          {isPaid && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--color-slate)", fontWeight: 600, display: "inline-flex", alignItems: "center" }}>
                {isHi ? "वॉटरमार्क:" : "Watermark:"}
                <InfoTooltip
                  text="Keep OFF when printing your final Will for physical signing with witnesses. Turn ON only if printing a 'DRAFT COPY' watermarked preview for review."
                  hindiText="गवाहों के साथ अंतिम हस्ताक्षर के लिए प्रिंट करते समय इसे बंद (OFF) रखें। केवल समीक्षा हेतु 'DRAFT COPY' वॉटरमार्क के लिए इसे चालू करें।"
                />
              </span>
              <AppleSwitch checked={showWatermark} onChange={setShowWatermark} />
            </div>
          )}

          <button
            onClick={handlePrint}
            className="btn btn-gold"
            style={{
              padding: "0.55rem 1.15rem",
              fontSize: "0.85rem",
              borderRadius: "10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              fontWeight: 700,
              boxShadow: "0 2px 10px rgba(198, 83, 120, 0.25)",
              cursor: "pointer",
            }}
          >
            {isPaid ? (
              isVerified ? (
                <>
                  <Printer size={15} />{" "}
                  {isHi ? "प्रिंट करें / PDF सहेजें" : "Print / Save as PDF"}
                </>
              ) : (
                <>
                  <ShieldCheck size={15} />{" "}
                  {isHi ? "🔒 विवरण सत्यापित करें व डाउनलोड करें" : "🔒 Verify Details to Download"}
                </>
              )
            ) : isHi ? (
              "🔒 वसीयत अनलॉक करें"
            ) : (
              "🔒 Pay to Unlock Will"
            )}
          </button>

          <Link
            href="/dashboard"
            style={{
              padding: "0.55rem 1.15rem",
              fontSize: "0.85rem",
              borderRadius: "10px",
              backgroundColor: "var(--color-navy)",
              color: "#FFFFFF",
              textDecoration: "none",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            <LayoutDashboard size={14} /> {isHi ? "डैशबोर्ड →" : "Dashboard →"}
          </Link>
        </div>
      </div>

      {/* Verification Status Banner */}
      {isPaid && !isVerified && (
        <div
          style={{
            background: "#FFFBEB",
            border: "1px solid #FDE68A",
            borderRadius: "14px",
            padding: "0.75rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
            boxShadow: "0 2px 8px rgba(245, 158, 11, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontSize: "1.1rem" }}>🔒</span>
            <div>
              <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "#92400E" }}>
                {isHi ? "1-by-1 समीक्षा और OTP सत्यापन लंबित है" : "1-by-1 Details Review & OTP Verification Pending"}
              </div>
              <div style={{ fontSize: "0.76rem", color: "#B45309" }}>
                {isHi
                  ? "कृपया चरण 9 (समीक्षा) पर जाकर सभी विवरणों को 1-by-1 सत्यापित करें और अंत में OTP दर्ज कर विवरण लॉक करें।"
                  : "Please complete the 1-by-1 category review in Step 9 (Full Review) and enter your OTP to permanently lock your details."}
              </div>
            </div>
          </div>
          <Link
            href="/start/09"
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "10px",
              backgroundColor: "#C65378",
              color: "#FFFFFF",
              fontSize: "0.8rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(198, 83, 120, 0.25)",
            }}
          >
            {isHi ? "चरण 9 में सत्यापित करें →" : "Verify Details in Step 9 →"}
          </Link>
        </div>
      )}

      {isPaid && isVerified && (
        <div
          style={{
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: "14px",
            padding: "0.6rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "#16A34A",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Check size={13} strokeWidth={3} />
          </div>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#166534" }}>
            {isHi
              ? "सभी विवरण ईमेल OTP द्वारा सत्यापित और स्थायी रूप से लॉक • न्यायालय-मान्य वसीयत डाउनलोड हेतु तैयार"
              : "All details verified via Email OTP & permanently locked • Court-ready Will unlocked for direct download"}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.72rem",
              fontWeight: 800,
              color: "#166534",
              backgroundColor: "#DCFCE7",
              padding: "0.2rem 0.6rem",
              borderRadius: "999px",
            }}
          >
            🔒 {isHi ? "स्थायी रूप से लॉक" : "Permanently Locked"}
          </span>
        </div>
      )}
      {downloadError && (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            borderRadius: "12px",
            backgroundColor: "rgba(225, 29, 72, 0.08)",
            border: "1.5px solid #FDA4AF",
            color: "#BE123C",
            fontSize: "0.85rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{downloadError}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setDownloadError("");
              void printWithServerAuth();
            }}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "8px",
              backgroundColor: "#BE123C",
              color: "#FFFFFF",
              fontSize: "0.75rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            {isHi ? "पुनः प्रयास करें" : "Try Again"}
          </button>
        </div>
      )}

      {/* Strict Payment Gate: Will Document is ONLY rendered in the DOM when payment is verified */}
      {isPaid ? (
        <div
          id="printable-final-will"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
            padding: "2.5rem 3rem",
            fontFamily: "var(--font-main)",
            color: "#1E293B",
            lineHeight: 1.75,
            position: "relative",
            width: "100%",
            height: "auto",
            minHeight: "auto",
            overflow: "visible",
          }}
        >
          {showWatermark && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    transform: "rotate(-25deg)",
                    fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
                    fontWeight: 900,
                    color: "rgba(198, 83, 120, 0.08)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  DRAFT COPY
                </div>
              ))}
            </div>
          )}

          <div
            className={!isVerified ? "unverified-will-read-only" : undefined}
            style={{
              userSelect: isVerified ? "text" : "none",
              WebkitUserSelect: isVerified ? "text" : "none",
              pointerEvents: "auto",
              color: "#000000",
              fontFamily: "'Times New Roman', Times, Georgia, serif",
              position: "relative",
              zIndex: 1,
            }}
          >
            {!isVerified && (
              <style>{`@media print { .unverified-will-read-only { display: none !important; } }`}</style>
            )}
            <WillDocument state={state} />
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1.5px solid rgba(198, 83, 120, 0.25)",
            boxShadow: "0 8px 30px rgba(23, 34, 40, 0.06)",
            padding: "3.5rem 2rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.2rem",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              backgroundColor: "rgba(198, 83, 120, 0.1)",
              color: "#C65378",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lock size={32} />
          </div>

          <div style={{ maxWidth: "540px" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.4rem", fontWeight: 800, color: "var(--color-navy)" }}>
              {loadingStatus
                ? (isHi ? "भुगतान स्थिति की जांच की जा रही है..." : "Verifying Payment Status...")
                : (isHi ? "आपकी वसीयत सुरक्षित रूप से लॉक है" : "Your Final Will is Securely Locked")}
            </h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--color-slate)", lineHeight: 1.6 }}>
              {isHi
                ? "सुरक्षा कारणों से भुगतान पूरा होने से पहले कानूनी वसीयत दस्तावेज प्रदर्शित नहीं किया जाता है। अपनी पूर्ण वसीयत को देखने और आधिकारिक न्यायालय-मान्य PDF डाउनलोड करने के लिए कृपया योजना का भुगतान पूरा करें।"
                : "For document security, your drafted Last Will and Testament is strictly hidden until payment is completed. Complete your plan payment to unlock, view, and download your official court-ready Will."}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
            <button
              type="button"
              onClick={() => setPaywallOpen(true)}
              className="btn btn-gold"
              style={{
                padding: "0.85rem 1.85rem",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(198, 83, 120, 0.25)",
              }}
            >
              {isHi ? "भुगतान करें और वसीयत अनलॉक करें (₹2,490 से) →" : "Complete Payment to Unlock Will (From ₹2,490) →"}
            </button>
            <button
              type="button"
              onClick={onBack}
              style={{
                padding: "0.85rem 1.4rem",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: 700,
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(27, 42, 74, 0.18)",
                color: "var(--color-navy)",
                cursor: "pointer",
              }}
            >
              {isHi ? "← योजना चयन पर वापस जाएं" : "← Back to Plan Selection"}
            </button>
          </div>
        </div>
      )}

      {/* 4 Golden Rules for Signing Your Will (ISA Section 63) */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "1.5rem 1.75rem",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
          <ShieldCheck size={22} color="var(--color-gold)" />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
            {isHi ? "वसीयत पर हस्ताक्षर करने के 4 महत्वपूर्ण कानूनी नियम (धारा 63)" : "4 Golden Statutory Rules for Executing Your Will (ISA Section 63)"}
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.85rem" }}>
          {[
            {
              step: "1",
              title: isHi ? "सादे A4 कागज पर प्रिंट करें" : "Print on Plain White A4 Paper",
              desc: isHi
                ? "भारत में वसीयत के लिए स्टांप पेपर की कोई आवश्यकता नहीं है। सामान्य सफेद 80+ GSM कागज पूर्ण रूप से कानूनी है।"
                : "Stamp paper is NOT legally required in India. Normal white 80+ GSM A4 paper is 100% valid.",
            },
            {
              step: "2",
              title: isHi ? "प्रत्येक पृष्ठ पर हस्ताक्षर करें" : "Sign Every Single Page",
              desc: isHi
                ? "किसी भी बदलाव को रोकने के लिए प्रत्येक पृष्ठ के नीचे हस्ताक्षर करें और अंतिम पृष्ठ पर पूर्ण हस्ताक्षर करें।"
                : "Sign at the bottom of each page to prevent substitution. Sign full signature on the final page.",
            },
            {
              step: "3",
              title: isHi ? "2 स्वतंत्र बालिग गवाह" : "2 Independent Adult Witnesses",
              desc: isHi
                ? "गवाह इस वसीयत के लाभार्थी नहीं होने चाहिए (जैसे मित्र, सहकर्मी, पारिवारिक डॉक्टर या वकील)।"
                : "Witnesses must NOT be beneficiaries under this Will (e.g. friends, colleagues, doctor, or lawyer).",
            },
            {
              step: "4",
              title: isHi ? "एक कमरे में साथ हस्ताक्षर करें" : "Sign Together in One Room",
              desc: isHi
                ? "तीनों (आप और दोनों गवाह) एक ही समय, एक ही तारीख पर एक-दूसरे को हस्ताक्षर करते हुए देखें।"
                : "All three (you and both witnesses) must see each other sign at the same time on the same date.",
            },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                background: "#F8FAFC",
                borderRadius: "12px",
                padding: "0.95rem",
                border: "1px solid #E2E8F0",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "var(--color-navy)",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.45rem",
                }}
              >
                {item.step}
              </div>
              <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--color-navy)", marginBottom: "0.25rem" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-slate)", lineHeight: 1.45 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Bottom Navigation */}
      <div
        className="final-will-bottom-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.6rem 1rem",
          borderRadius: "14px",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          boxShadow: "0 2px 10px rgba(27, 42, 74, 0.03)",
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "0.65rem 1.4rem",
            borderRadius: "10px",
            border: "1px solid rgba(27, 42, 74, 0.15)",
            backgroundColor: "#FFFFFF",
            color: "var(--color-navy)",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <ArrowLeft size={16} /> {isHi ? "पीछे" : "Back"}
        </button>

        <Link
          href="/dashboard"
          className="btn btn-gold"
          style={{
            padding: "0.65rem 1.85rem",
            borderRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 4px 16px rgba(198, 83, 120, 0.25)",
          }}
        >
          <span>{isHi ? "ग्राहक डैशबोर्ड पर जाएं" : "Go to Customer Dashboard"}</span>
          <span>→</span>
        </Link>
      </div>

      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
      />
    </div>
  );
}
