"use client";

import React, { useState } from "react";
import Link from "next/link";
import WizardButton from "./button";
import { useLanguage } from "@/context/LanguageContext";
import {
  WillDraftingState,
  runLegalHealthCheck,
} from "@/lib/willDraftingStore";
import { useWillStore } from "@/lib/useWillStore";
import {
  ShieldCheck,
  AlertTriangle,
  Check,
  AlertCircle,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step11HealthCheckProps {
  state?: WillDraftingState;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

const issueStepTargets: Record<string, { path: string; label: string; hindiLabel: string }> = {
  "chk-testator-non-natural": { path: "/start/01", label: "Fix Legal Name (Step 1)", hindiLabel: "कानूनी नाम सुधारें" },
  "chk-testator-dob-missing": { path: "/start/01", label: "Add Date of Birth (Step 1)", hindiLabel: "जन्म तिथि जोड़ें" },
  "chk-testator-minor": { path: "/start/01", label: "Verify Date of Birth (Step 1)", hindiLabel: "जन्म तिथि जांचें" },
  "chk-testator-identity-incomplete": { path: "/start/01", label: "Complete Profile (Step 1)", hindiLabel: "प्रोफाइल पूरा करें" },
  "chk-marital-family-mismatch": { path: "/start/02", label: "Review Family (Step 2)", hindiLabel: "परिवार विवरण जांचें" },
  "chk-disinherited-natural-heir": { path: "/start/04", label: "Review Allocations (Step 4)", hindiLabel: "बंटवारा समीक्षा करें" },
  "chk-unallocated-non-relative": { path: "/start/02", label: "Review Family Directory (Step 2)", hindiLabel: "परिवार सूची जांचें" },
  "chk-minor-beneficiary": { path: "/start/06", label: "Go to Guardians (Step 6)", hindiLabel: "अभिभावक चरण पर जाएं" },
  "chk-guardian-missing": { path: "/start/06", label: "Go to Guardians (Step 6)", hindiLabel: "अभिभावक चरण पर जाएं" },
  "chk-guardian-conflict": { path: "/start/06", label: "Fix Guardians (Step 6)", hindiLabel: "अभिभावक सुधारें" },
  "chk-joint-property": { path: "/start/03", label: "Review Assets (Step 3)", hindiLabel: "संपत्ति समीक्षा करें" },
  "chk-encumbered-asset-loan": { path: "/start/03", label: "Review Asset Loans (Step 3)", hindiLabel: "ऋण विवरण जांचें" },
  "chk-insurance-nominee-mismatch": { path: "/start/03", label: "Review Insurance (Step 3)", hindiLabel: "बीमा नामांकित जांचें" },
  "chk-foreign-immovable-property": { path: "/start/03", label: "Review Property Location (Step 3)", hindiLabel: "संपत्ति स्थान जांचें" },
  "chk-jewellery-wish-conflict": { path: "/start/07", label: "Review Special Wishes (Step 7)", hindiLabel: "विशेष इच्छाएं जांचें" },
  "chk-muslim-personal-law": { path: "/start/01", label: "Review Personal Law (Step 1)", hindiLabel: "पर्सनल लॉ समीक्षा करें" },
  "chk-residuary-missing": { path: "/start/04", label: "Go to Allocations (Step 4)", hindiLabel: "बंटवारा चरण पर जाएं" },
  "chk-residuary-duplicate": { path: "/start/04", label: "Fix Residuary Heirs (Step 4)", hindiLabel: "अवशिष्ट वारिस सुधारें" },
  "chk-no-assets": { path: "/start/03", label: "Add Assets (Step 3)", hindiLabel: "संपत्ति जोड़ें" },
  "chk-allocation-imbalance": { path: "/start/04", label: "Fix Allocations (Step 4)", hindiLabel: "बंटवारा ठीक करें" },
  "chk-orphan-allocation": { path: "/start/04", label: "Review Beneficiaries (Step 4)", hindiLabel: "लाभार्थी जांचें" },
  "chk-executor-missing": { path: "/start/05", label: "Assign Executor (Step 5)", hindiLabel: "प्रबंधक नियुक्त करें" },
  "chk-executor-conflict": { path: "/start/05", label: "Fix Executor (Step 5)", hindiLabel: "प्रबंधक सुधारें" },
  "chk-executor-details-incomplete": { path: "/start/05", label: "Complete Executor Info (Step 5)", hindiLabel: "प्रबंधक विवरण पूरा करें" },
  "chk-alt-executor-missing": { path: "/start/05", label: "Add Backup Executor (Step 5)", hindiLabel: "बैकअप प्रबंधक जोड़ें" },
  "chk-revocation-conflict": { path: "/start/01", label: "Review Profile (Step 1)", hindiLabel: "प्रोफाइल समीक्षा करें" },
};

const issueTranslations: Record<string, { title: string; explanation?: string; guidance?: string }> = {
  "chk-testator-non-natural": {
    title: "वसीयतकर्ता का नाम किसी कंपनी या फर्म जैसा प्रतीत होता है",
    explanation: "भारतीय उत्तराधिकार अधिनियम, 1925 की धारा 59 के तहत केवल एक जीवित प्राकृतिक व्यक्ति ही वैध वसीयत बना सकता है, कोई कंपनी या फर्म नहीं।",
    guidance: "कृपया कंपनी के नाम के स्थान पर अपना व्यक्तिगत कानूनी नाम दर्ज करें।",
  },
  "chk-testator-dob-missing": {
    title: "वसीयतकर्ता की जन्म तिथि अनुपस्थित है",
    explanation: "धारा 59 के तहत वसीयतकर्ता का वयस्क (18+ वर्ष) होना अनिवार्य है।",
    guidance: "प्रोफाइल चरण में जाकर अपनी सही जन्म तिथि दर्ज करें।",
  },
  "chk-testator-minor": {
    title: "वसीयतकर्ता की आयु 18 वर्ष से कम है",
    explanation: "भारतीय कानून के अंतर्गत नाबालिग व्यक्ति कानूनी रूप से वसीयत निष्पादित नहीं कर सकता।",
    guidance: "कृपया अपनी जन्म तिथि की जांच करें।",
  },
  "chk-testator-identity-incomplete": {
    title: "वसीयतकर्ता के पहचान विवरण अधूरे हैं",
    explanation: "पिता/माता/पति का नाम, पैन/आधार या पूर्ण आवासीय पता अनुपस्थित होने से प्रोबेट में कठिनाई हो सकती है।",
    guidance: "प्रोफाइल चरण में अपना पैन/आधार, माता-पिता का नाम और पूरा पता जोड़ें।",
  },
  "chk-marital-family-mismatch": {
    title: "वैवाहिक स्थिति और परिवार के सदस्यों में असंगति",
    explanation: "आपने अपनी वैवाहिक स्थिति 'विवाहित' चुनी है लेकिन परिवार सूची में जीवनसाथी (पति/पत्नी) का नाम नहीं जोड़ा है।",
    guidance: "परिवार चरण में अपने जीवनसाथी का विवरण जोड़ें या वैवाहिक स्थिति अपडेट करें।",
  },
  "chk-disinherited-natural-heir": {
    title: "प्रथम श्रेणी के कानूनी उत्तराधिकारी को कोई संपत्ति आवंटित नहीं है",
    explanation: "प्रथम श्रेणी के उत्तराधिकारी को शून्य हिस्सा मिलने पर वसीयत ने इसका स्पष्ट कारण दर्ज किया है ताकि भविष्य में विवाद न हो।",
    guidance: "सत्यापित करें कि यह बहिष्करण आपकी इच्छा के अनुरूप है।",
  },
  "chk-unallocated-non-relative": {
    title: "गैर-रिश्तेदार सदस्य को कोई संपत्ति आवंटित नहीं की गई है",
    explanation: "आपने परिवार सूची में एक गैर-रिश्तेदार जोड़ा है, किंतु उन्हें कोई संपत्ति या जिम्मेदारी नहीं दी गई है।",
    guidance: "उन्हें संपत्ति आवंटित करें या सूची से हटाएं।",
  },
  "chk-minor-beneficiary": {
    title: "नाबालिग लाभार्थी आवंटन पाया गया",
    explanation: "आपने नाबालिग को सीधे संपत्ति आवंटित की है। भारतीय उत्तराधिकार कानून के अनुसार 18 वर्ष से कम आयु का बच्चा सीधे संपत्ति का प्रबंधन नहीं कर सकता।",
    guidance: "नाबालिग के लिए वसीयत अभिभावक नियुक्त करें और ट्रस्ट क्लॉज जोड़ें।",
  },
  "chk-guardian-missing": {
    title: "नाबालिग बच्चों के लिए अभिभावक का अभाव",
    explanation: "आपके परिवार में नाबालिग बच्चे हैं, लेकिन आपने उनके लिए कोई कानूनी अभिभावक नियुक्त नहीं किया है।",
    guidance: "अभिभावक चरण में जाकर प्राथमिक व वैकल्पिक अभिभावक नामित करें।",
  },
  "chk-guardian-conflict": {
    title: "अभिभावक नियुक्ति में हितों का टकराव या त्रुटि",
    explanation: "अभिभावक का नाम वसीयतकर्ता के समान है या प्राथमिक और वैकल्पिक अभिभावक एक ही व्यक्ति हैं।",
    guidance: "दो अलग-अलग वयस्क व्यक्तियों को प्राथमिक और वैकल्पिक अभिभावक नियुक्त करें।",
  },
  "chk-joint-property": {
    title: "संयुक्त स्वामित्व वाली संपत्ति पाई गई",
    explanation: "यह संपत्ति संयुक्त स्वामित्व में है। भारतीय कानून के तहत आप केवल अपने हिस्से की ही वसीयत कर सकते हैं।",
    guidance: "पुष्टि करें कि आपके पास अपना विशिष्ट व अविभाजित हिस्सा है।",
  },
  "chk-encumbered-asset-loan": {
    title: "ऋण / बंधक वाली संपत्ति (धारा 167)",
    explanation: "भारतीय उत्तराधिकार अधिनियम की धारा 167 के तहत बंधक या ऋण वाली संपत्ति का दायित्व संबंधित लाभार्थी पर जाता है।",
    guidance: "यदि आप चाहते हैं कि ऋण अन्य निधि से चुकाया जाए, तो विशेष निर्देश में उल्लेख करें।",
  },
  "chk-insurance-nominee-mismatch": {
    title: "बीमा नॉमिनी और वसीयत लाभार्थी अलग-अलग हैं",
    explanation: "भारतीय कानून के अनुसार पंजीकृत नॉमिनी केवल ट्रस्टी होता है और वास्तविक अधिकार वसीयत के लाभार्थी का होता है।",
    guidance: "सुगम दावे के लिए बीमा कंपनी में नॉमिनी रिकॉर्ड अपडेट करें।",
  },
  "chk-foreign-immovable-property": {
    title: "भारत के बाहर स्थित अचल संपत्ति (धारा 5)",
    explanation: "भारतीय उत्तराधिकार अधिनियम की धारा 5 के अनुसार अचल संपत्ति का उत्तराधिकार उस देश के कानून (lex situs) द्वारा शासित होता है जहां संपत्ति स्थित है।",
    guidance: "विदेशी अचल संपत्ति के लिए संबंधित देश के कानून के अनुसार पूरक वसीयत या प्रमाणीकरण सुनिश्चित करें।",
  },
  "chk-jewellery-wish-conflict": {
    title: "आभूषण अनुसूची और विशेष इच्छाओं में संभावित विरोधाभास (धारा 88)",
    explanation: "आपने संपत्ति तालिका में आभूषण सूचीबद्ध किए हैं और विशेष इच्छाओं में भी आभूषण निर्देश लिखे हैं।",
    guidance: "सुनिश्चित करें कि विशेष इच्छा केवल शेष/अनिर्दिष्ट आभूषणों पर लागू हो।",
  },
  "chk-muslim-personal-law": {
    title: "मुस्लिम पर्सनल लॉ (शरियत) एक-तिहाई वसीयत नियम",
    explanation: "मुस्लिम पर्सनल लॉ के अंतर्गत कानूनी उत्तराधिकारियों की सहमति के बिना कुल संपत्ति के एक-तिहाई (1/3) से अधिक की वसीयत नहीं की जा सकती।",
    guidance: "सुनिश्चित करें कि आवंटन शरियत नियमों के अनुरूप है या उत्तराधिकारियों की सहमति प्राप्त है।",
  },
  "chk-residuary-missing": {
    title: "अवशिष्ट संपत्ति धारा का अभाव",
    explanation: "आपने अवशिष्ट वारिसदार नामित नहीं किया है। भविष्य की या अनिर्दिष्ट संपत्ति कानूनी नियमों के तहत चली जाएगी।",
    guidance: "सभी शेष संपत्ति प्राप्त करने के लिए अवशिष्ट वारिसदार नियुक्त करें।",
  },
  "chk-residuary-duplicate": {
    title: "प्राथमिक और वैकल्पिक अवशिष्ट वारिसदार समान हैं",
    explanation: "एक ही व्यक्ति को प्राथमिक और वैकल्पिक अवशिष्ट लाभार्थी बनाने से बैकअप सुरक्षा समाप्त हो जाती है।",
    guidance: "अलग-अलग व्यक्तियों को प्राथमिक और वैकल्पिक अवशिष्ट लाभार्थी चुनें।",
  },
  "chk-no-assets": {
    title: "कोई विशिष्ट संपत्ति सूचीबद्ध नहीं है",
    explanation: "आपने संपत्ति रजिस्टर में कोई संपत्ति नहीं जोड़ी है।",
    guidance: "स्पष्ट बंटवारे के लिए अपनी प्रमुख चल व अचल संपत्तियां जोड़ें।",
  },
  "chk-allocation-imbalance": {
    title: "संपत्ति का 100% आवंटन नहीं हुआ है",
    explanation: "संपत्तियों का कुल आवंटन 100% नहीं है। विवाद से बचने के लिए आवंटन ठीक 100% होना आवश्यक है।",
    guidance: "बंटवारा चरण में जाकर प्रतिशत को 100% तक समायोजित करें।",
  },
  "chk-orphan-allocation": {
    title: "हटाए गए लाभार्थी को आवंटन",
    explanation: "कुछ संपत्ति आवंटन ऐसे लाभार्थी को संदर्भित करते हैं जो परिवार सूची में नहीं हैं।",
    guidance: "बंटवारा चरण में जाकर लाभार्थी आवंटन को अपडेट करें।",
  },
  "chk-executor-missing": {
    title: "प्राथमिक वसीयत निष्पादक नियुक्त नहीं है",
    explanation: "बिना निष्पादक के वसीयत को न्यायालय से प्रशासन पत्र प्राप्त करने की आवश्यकता होती है, जिससे भारी विलंब होता है।",
    guidance: "किसी विश्वसनीय वयस्क सदस्य को अपना प्राथमिक निष्पादक नियुक्त करें।",
  },
  "chk-executor-conflict": {
    title: "निष्पादक नियुक्ति में त्रुटि",
    explanation: "वसीयतकर्ता स्वयं निष्पादक नहीं हो सकता, और प्राथमिक व वैकल्पिक निष्पादक अलग-अलग व्यक्ति होने चाहिए।",
    guidance: "दो अलग-अलग विश्वसनीय वयस्क व्यक्तियों को निष्पादक नियुक्त करें।",
  },
  "chk-executor-details-incomplete": {
    title: "निष्पादक का पता या संपर्क विवरण अधूरा है",
    explanation: "निष्पादक की स्पष्ट पहचान के लिए उनका शहर/पता और संबंध दर्ज होना आवश्यक है।",
    guidance: "निष्पादक चरण में जाकर उनका पूरा पता और संबंध जोड़ें।",
  },
  "chk-alt-executor-missing": {
    title: "कोई वैकल्पिक निष्पादक नियुक्त नहीं है",
    explanation: "यदि प्राथमिक निष्पादक कार्य करने में असमर्थ रहता है, तो कोई बैकअप प्रबंधक नहीं होगा।",
    guidance: "सुरक्षा के लिए एक द्वितीयक वैकल्पिक निष्पादक नियुक्त करने की सलाह दी जाती है।",
  },
  "chk-testator-competence": {
    title: "वसीयतकर्ता की कानूनी क्षमता सत्यापित",
    explanation: "पूर्ण नाम, वयस्क आयु और स्वस्थ मानसिक स्थिति प्रमाणित है।",
    guidance: "सत्यापित",
  },
  "chk-executor-valid": {
    title: "वसीयत निष्पादक नियुक्त",
    explanation: "वसीयत निष्पादन और संपत्ति हस्तांतरण के लिए प्राथमिक निष्पादक नामित किया गया है।",
    guidance: "सत्यापित",
  },
};

export default function Step11HealthCheck({
  state: propState,
  onNext,
  onBack,
}: Step11HealthCheckProps) {
  const storeState = useWillStore((s) => s.state);
  const state = propState || storeState;
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const issues = runLegalHealthCheck(state);
  const critical = issues.filter((i) => i.severity === "critical");
  const warnings = issues.filter((i) => i.severity === "warning" || i.severity === "advisory");
  const passes = issues.filter((i) => i.severity === "pass");

  const hasBlocks = critical.length > 0;
  const [showBlockWarning, setShowBlockWarning] = useState(false);
  const score = Math.max(55, 100 - critical.length * 18 - warnings.length * 4);

  // Circular progress
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        width: "100%",
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "0.35rem" }}>
          <div className="wizard-step-header-meta" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AudioAssistantButton
              textToSpeak="Our legal check has verified your will against Indian inheritance rules. Your will readiness score is displayed here."
              hindiText="हमारी कानूनी जांच ने भारतीय उत्तराधिकार नियमों के अनुसार आपकी वसीयत का सत्यापन किया है। आपका अनुपालन स्कोर यहां प्रदर्शित है।"
              label={isHi ? "सुनें 🔊" : "Listen 🔊"}
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              {isHi
                ? "कानूनी आवश्यकता जांच (भारतीय उत्तराधिकार कानून के तहत)"
                : "Legal requirement check (Under Indian succession law)"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            {isHi ? "कानूनी अनुपालन एवं स्वास्थ्य जांच" : "Legal Health Check Engine"}
          </h2>
        </div>
      </div>

      {/* Main 2-Column Bento Grid */}
      <div className="healthcheck-grid">
        {/* Left Column: Audit Score Gauge Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            boxShadow: "0 4px 20px rgba(27, 42, 74, 0.03)",
            padding: "1.5rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "1rem",
          }}
        >
          {/* Circular Progress Gauge */}
          <div style={{ position: "relative", width: "110px", height: "110px" }}>
            <svg width="110" height="110" viewBox="0 0 92 92" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="46" cy="46" r={radius} stroke="rgba(27, 42, 74, 0.08)" strokeWidth="8" fill="none" />
              <circle
                cx="46"
                cy="46"
                r={radius}
                stroke={hasBlocks ? "#E11D48" : "var(--color-sage)"}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                style={{ transition: "stroke-dashoffset 0.4s ease" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--color-navy)", lineHeight: 1 }}>
                {score}
              </span>
              <span style={{ fontSize: "0.62rem", color: "var(--text-muted)", fontWeight: 700, marginTop: "3px" }}>
                {isHi ? "ऑडिट स्कोर" : "AUDIT SCORE"}
              </span>
            </div>
          </div>

          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.2rem 0.65rem",
                borderRadius: "999px",
                backgroundColor: hasBlocks ? "rgba(225, 29, 72, 0.1)" : "rgba(124, 148, 115, 0.15)",
                color: hasBlocks ? "#BE123C" : "var(--color-sage)",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "0.45rem",
              }}
            >
              {hasBlocks ? <AlertTriangle size={12} /> : <ShieldCheck size={12} />}
              {hasBlocks ? (isHi ? "सूचनाएं मिलीं" : "Notices Detected") : (isHi ? "ऑडिट पास" : "Audit Passed")}
            </div>

            <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.05rem", fontWeight: 800, color: "var(--color-navy)" }}>
              {hasBlocks
                ? (isHi ? "ध्यान देने योग्य विषय" : "Attention Required")
                : (isHi ? "कानूनी आवश्यकताएं सत्यापित" : "Legal Requirements Verified")}
            </h3>
            <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--color-slate)", lineHeight: 1.4 }}>
              {isHi
                ? `भारतीय कानून के अनुसार ${issues.length} कानूनी जांच बिंदु सत्यापित किए गए।`
                : `${issues.length} legal checkpoints verified according to Indian law.`}
            </p>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(27, 42, 74, 0.08)",
            }}
          >
            <div style={{ backgroundColor: "rgba(124, 148, 115, 0.08)", padding: "0.5rem", borderRadius: "10px" }}>
              <span style={{ display: "block", fontSize: "1.1rem", fontWeight: 800, color: "var(--color-sage)" }}>
                {passes.length}
              </span>
              <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--color-navy)" }}>
                {isHi ? "सफल जांच" : "Passed Checks"}
              </span>
            </div>
            <div style={{ backgroundColor: "rgba(198, 83, 120, 0.08)", padding: "0.5rem", borderRadius: "10px" }}>
              <span style={{ display: "block", fontSize: "1.1rem", fontWeight: 800, color: "var(--color-gold)" }}>
                {critical.length + warnings.length}
              </span>
              <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--color-navy)" }}>
                {isHi ? "सलाह / सूचनाएं" : "Advisories"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Scrollable Checkpoints */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            overflowY: "auto",
            minHeight: 0,
            paddingRight: "0.25rem",
          }}
        >
          {issues.map((issue) => {
            const isCritical = issue.severity === "critical";
            const isWarning = issue.severity === "warning";
            const isPass = issue.severity === "pass";

            const trans = issueTranslations[issue.id];
            const displayTitle = isHi && trans?.title ? trans.title : issue.title;
            const displayExplanation = isHi && trans?.explanation ? trans.explanation : issue.explanation;
            const displayGuidance = isHi && trans?.guidance ? trans.guidance : issue.actionRecommendation;

            const severityLabel = isHi
              ? isCritical
                ? "गंभीर"
                : isWarning
                ? "चेतावनी"
                : "सफल"
              : issue.severity;

            return (
              <div
                key={issue.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  border: isCritical ? "1.5px solid #FDA4AF" : "1px solid rgba(27, 42, 74, 0.08)",
                  padding: "0.85rem 1.1rem",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: isCritical ? "#E11D48" : isWarning ? "var(--color-gold)" : "var(--color-sage)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    flexShrink: 0,
                    marginTop: "0.1rem",
                  }}
                >
                  {isPass ? <Check size={14} strokeWidth={3} /> : <AlertCircle size={14} strokeWidth={2.5} />}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                    <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      {displayTitle}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        padding: "0.15rem 0.45rem",
                        borderRadius: "5px",
                        textTransform: "uppercase",
                        backgroundColor: isCritical ? "rgba(225, 29, 72, 0.1)" : isWarning ? "rgba(198, 83, 120, 0.12)" : "rgba(124, 148, 115, 0.12)",
                        color: isCritical ? "#E11D48" : isWarning ? "var(--color-gold)" : "var(--color-sage)",
                      }}
                    >
                      {severityLabel}
                    </span>
                  </div>

                  <p style={{ margin: "0.25rem 0 0", fontSize: "0.78rem", color: "var(--color-charcoal)", lineHeight: 1.4 }}>
                    {displayExplanation}
                  </p>

                  {displayGuidance && (
                    <div
                      style={{
                        fontSize: "0.74rem",
                        color: "var(--color-navy)",
                        backgroundColor: "rgba(27, 42, 74, 0.03)",
                        padding: "0.4rem 0.65rem",
                        borderRadius: "8px",
                        marginTop: "0.35rem",
                        lineHeight: 1.35,
                      }}
                    >
                      <strong>{isHi ? "सलाह:" : "Tip:"}</strong> {displayGuidance}
                    </div>
                  )}

                  {!isPass && !state.detailsVerified && issueStepTargets[issue.id] && (
                    <div style={{ marginTop: "0.65rem", display: "flex", justifyContent: "flex-end" }}>
                      <Link
                        href={issueStepTargets[issue.id].path}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "0.35rem 0.75rem",
                          borderRadius: "8px",
                          backgroundColor: isCritical ? "#E11D48" : "#172228",
                          color: "#FFFFFF",
                          textDecoration: "none",
                        }}
                      >
                        {isHi ? issueStepTargets[issue.id].hindiLabel : issueStepTargets[issue.id].label} →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Issues Alert Banner */}
      {showBlockWarning && critical.length > 0 && !state.detailsVerified && (
        <div
          role="alert"
          style={{
            padding: "1rem 1.25rem",
            backgroundColor: "#FEF2F2",
            border: "1.5px solid #FDA4AF",
            borderRadius: "16px",
            color: "#991B1B",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <AlertCircle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: "0.15rem" }} />
            <div>
              <strong style={{ fontSize: "0.925rem", display: "block", marginBottom: "0.25rem", color: "#991B1B" }}>
                {isHi ? "कुछ जरूरी बिंदु अभी बाकी हैं" : "Important items need your attention"}
              </strong>
              <span style={{ fontSize: "0.825rem", lineHeight: 1.5 }}>
                {isHi
                  ? "आपकी वसीयत में कुछ जरूरी चीजें अधूरी हैं (जैसे वसीयत प्रबंधक नियुक्त करना)। हम दस्तावेज बनाने से पहले इन्हें पूरा करने की सलाह देते हैं।"
                  : "Your will has some unfinished details (like appointing an executor). We recommend resolving these before generating your final will."}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.65rem", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => {
                setShowBlockWarning(false);
                window.scrollTo({ top: 250, behavior: "smooth" });
              }}
              className="btn btn-gold"
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "10px",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {isHi ? "कमियां ठीक करें (सलाह)" : "Fix Issues (Recommended)"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowBlockWarning(false);
                onNext();
              }}
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "10px",
                fontSize: "0.8rem",
                fontWeight: 600,
                backgroundColor: "transparent",
                border: "1px solid #DC2626",
                color: "#991B1B",
                cursor: "pointer",
              }}
            >
              {isHi ? "फिर भी आगे बढ़ें" : "Continue Anyway"}
            </button>
          </div>
        </div>
      )}

      {/* Wizard Button Footer */}
      <WizardButton
        onBack={onBack}
        onNext={() => {
          if (hasBlocks && !showBlockWarning && !state.detailsVerified) {
            setShowBlockWarning(true);
            return;
          }
          setShowBlockWarning(false);
          onNext();
        }}
      />
    </div>
  );
}
