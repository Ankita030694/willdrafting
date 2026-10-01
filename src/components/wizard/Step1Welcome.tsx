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
  Globe,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import LanguageToggle from "@/components/ui/LanguageToggle";

import WizardButton from "./button";
interface Step1WelcomeProps {
  state: WillDraftingState;
  onNext: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

export default function Step1Welcome({
  onNext,
  lang = "en",
  onChangeLang,
}: Step1WelcomeProps) {
  const isHi = lang === "hi";

  const roadmapItems = [
    {
      num: "01",
      title: "Personal & Family Structure",
      desc: "Testator personal law details, spouse, children, and immediate natural heirs.",
      hindiTitle: "व्यक्तिगत एवं पारिवारिक संरचना",
      hindiDesc: "वसीयतकर्ता का व्यक्तिगत कानून विवरण, जीवनसाथी, बच्चे और निकटतम कानूनी उत्तराधिकारी।",
      Icon: Users,
    },
    {
      num: "02",
      title: "Assets & Wealth Register",
      desc: "Immovable properties, bank accounts, Demat portfolios, jewellery, and digital accounts.",
      hindiTitle: "संपत्ति एवं धन रजिस्टर",
      hindiDesc: "अचल संपत्तियां, बैंक खाते, डीमैट पोर्टफोलियो, आभूषण और डिजिटल खाते।",
      Icon: Building,
    },
    {
      num: "03",
      title: "Allocations & Appointments",
      desc: "Percentage distributions, primary & alternate executors, and minor guardians.",
      hindiTitle: "बंटवारा एवं प्रबंधक नियुक्ति",
      hindiDesc: "संपत्ति का प्रतिशत बंटवारा, मुख्य व वैकल्पिक निष्पादक (Executor) और नाबालिगों के अभिभावक।",
      Icon: Scale,
    },
    {
      num: "04",
      title: "Audit & Final Document",
      desc: "Automated 100-point legal check, official clause formatting, and printable certified Will.",
      hindiTitle: "कानूनी जांच एवं अंतिम वसीयत",
      hindiDesc: "स्वचालित 100-बिंदु कानूनी ऑडिट, कानून सम्मत धाराएं और प्रिंट करने योग्य प्रमाणित वसीयत।",
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
          {/* Top-Left: Language Toggle + Eyebrow Pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexWrap: "wrap" }}>
            {/* Language Toggle Button (English / हिंदी) */}
            <LanguageToggle lang={lang} onChangeLang={onChangeLang || (() => {})} />

            {/* Eyebrow Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                backgroundColor: "rgba(198, 83, 120, 0.12)",
                color: "var(--color-gold)",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <Sparkles size={13} color="var(--color-gold)" />
              {isHi ? "कानूनी-तकनीक निर्देशित वसीयत निर्माता" : "Legal-Tech Guided Will Drafter"}
            </div>
          </div>

          {/* Quick Facts Chips & Audio Assistant */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <AudioAssistantButton
              textToSpeak={
                isHi
                  ? "विल ड्राफ्टिंग में आपका स्वागत है! वसीयतनामा बनाना अपने परिवार की सुरक्षा का सबसे बड़ा कदम है। इसमें केवल 10 से 15 मिनट लगते हैं। शुरू करने के लिए प्रश्नोत्तरी शुरू करें पर टैप करें।"
                  : "Welcome to Will Drafting! Making a will is an act of love to protect your family. It takes just 10 to 15 minutes. We guide you step by step in simple language. Tap Begin Questionnaire to start."
              }
              label={isHi ? "सुनें 🔊" : "Listen / सुनें 🔊"}
            />
            {[
              { Icon: Clock, label: isHi ? "10-15 मिनट" : "10-15 Min" },
              { Icon: Scale, label: isHi ? "भारतीय कानून मान्य" : "Indian Law Compliant" },
              { Icon: Lock, label: isHi ? "100% गोपनीय" : "100% Private" },
              { Icon: ShieldCheck, label: isHi ? "कानूनी मानक" : "Legal Standards" },
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
            {isHi
              ? "वसीयतनामा बनाना अपने परिवार के प्रति प्रेम का प्रतीक है, डर का नहीं।"
              : "Making a Will is an act of love, not fear."}
          </h1>
          <div style={{ fontSize: "0.95rem", color: "var(--color-gold)", fontWeight: 600, marginBottom: "0.45rem" }}>
            {isHi
              ? "वसीयतनामा बनाना अपने परिवार की सुरक्षा का सबसे बड़ा कदम है"
              : "Protect your loved ones from court disputes and probate delays."}
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
            {isHi
              ? "आज केवल 10 मिनट का समय निकालकर आप अपने प्रियजनों को अदालती विवादों और देरी से बचा सकते हैं। बिना किसी जटिल कानूनी कागजी कार्रवाई के अपनी गति से सरल प्रश्नों के उत्तर दें।"
              : "Taking 10 minutes today protects your loved ones from court disputes and delays. Simply tap and answer at your own pace—no complex legal paperwork required."}
          </p>
        </div>
      </div>

      {/* 4-Phase Horizontal Grid */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)", margin: "0 0 0.65rem" }}>
          {isHi
            ? "आप 4 सरल चरणों में क्या पूरा करेंगे:"
            : "What you will complete in 4 simple phases:"}
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
                  padding: "1.1rem 1.15rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
                  gap: "0.65rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

                <h4 style={{ margin: "0 0 0.15rem", fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)", lineHeight: 1.35 }}>
                  {isHi ? item.hindiTitle : item.title}
                </h4>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--color-slate)", lineHeight: 1.5 }}>
                  {isHi ? item.hindiDesc : item.desc}
                </p>
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
            {isHi ? (
              <>
                <strong>निजी और सुरक्षित:</strong> आपकी सभी प्रविष्टियां गोपनीय रहती हैं। भारतीय कानून के तहत स्पष्ट विवरण पर्याप्त हैं।
              </>
            ) : (
              <>
                <strong>Private & Secure:</strong> All entries remain confidential. Clear descriptive identifiers are sufficient under Indian law.
              </>
            )}
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
            boxShadow: "0 4px 16px rgba(198, 83, 120, 0.25)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <span>{isHi ? "प्रश्नोत्तरी शुरू करें →" : "Begin Questionnaire →"}</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
