"use client";

import React, { useState, useEffect } from "react";
import WizardButton from "./button";
import { WillDraftingState, SpecialWishes, generateWillClauses } from "@/lib/willDraftingStore";
import {
  Gem,
  Globe,
  Heart,
  HandHeart,
  Flame,
  CheckCircle2,
  Sparkles,
  Plus,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Check,
  Trash2,
  Pencil,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import AppleSwitch from "@/components/dashboard/AppleSwitch";
import { useLanguage } from "@/context/LanguageContext";
import { useWillStore } from "@/lib/useWillStore";
import InfoTooltip from "./InfoTooltip";

interface Step8SpecialWishesProps {
  state?: WillDraftingState;
  onUpdate?: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

type SpecialWishFieldKey = Exclude<keyof SpecialWishes, "hasNoSpecialWishes">;

interface CategoryConfig {
  key: SpecialWishFieldKey;
  label: string;
  hindiLabel: string;
  subtitle: string;
  hindiSubtitle: string;
  Icon: React.ElementType;
  color: string;
  desc: string;
  hindiDesc: string;
  tooltip: string;
  hindiTooltip: string;
  placeholder: string;
  suggestions: string[];
  hindiSuggestions: string[];
}

const CATEGORIES: CategoryConfig[] = [
  {
    key: "jewelleryInstructions",
    label: "Jewellery & Heirlooms",
    hindiLabel: "आभूषण एवं पारिवारिक धरोहर",
    subtitle: "Ancestral gold, watches, rings, art",
    hindiSubtitle: "पारिवारिक सोना, घड़ियां, अंगूठियां",
    Icon: Gem,
    color: "#C65378",
    desc: "Specific heirloom bequests (wedding jewellery, luxury watches, vintage art, ancestral artifacts).",
    hindiDesc: "पारिवारिक आभूषण, पूर्वजों की वस्तुएं, बहुमूल्य घड़ियां या कलाकृतियां किसे दी जाएं।",
    tooltip: "Specify who receives specific sentimental or high-value items (e.g., ancestral gold necklace, wedding ring, or vintage watch) to prevent family disputes over heirlooms.",
    hindiTooltip: "स्पष्ट लिखें कि विशेष आभूषण या पारिवारिक धरोहर (जैसे खानदानी हार, अंगूठी या घड़ी) किसे मिले ताकि परिवार में विवाद न हो।",
    placeholder: "e.g., Ancestral gold necklace to elder daughter; diamond solitaire ring to spouse...",
    suggestions: [
      "Ancestral gold necklace to elder daughter",
      "Vintage luxury wristwatch to son",
      "Diamond solitaire ring to spouse",
      "Divide all remaining gold ornaments equally among daughters",
    ],
    hindiSuggestions: [
      "खानदानी सोने का हार बड़ी बेटी को",
      "विंटेज घड़ी बेटे को",
      "हीरे की अंगूठी जीवनसाथी को",
      "शेष सभी आभूषण बेटियों में बराबर बांटे जाएं",
    ],
  },
  {
    key: "personalBelongings",
    label: "Personal Keepsakes",
    hindiLabel: "स्मृति-चिह्न व व्यक्तिगत वस्तुएं",
    subtitle: "Books, diaries, instruments, art",
    hindiSubtitle: "पुस्तकें, डायरियां, वाद्ययंत्र, संस्मरण",
    Icon: BookOpen,
    color: "#D97706",
    desc: "Books, journals, musical instruments, awards, and personal mementos.",
    hindiDesc: "पुस्तकें, डायरियां, पदक, वाद्ययंत्र और प्रिय स्मरणीय वस्तुएं।",
    tooltip: "List non-financial keepsakes such as personal libraries, handwritten journals, photo albums, musical instruments, or medals and who should inherit them.",
    hindiTooltip: "व्यक्तिगत पुस्तकें, डायरियां, फोटो एलबम, वाद्ययंत्र या पदक जैसी स्मरणीय वस्तुएं किसे सौंपी जाएं, यहां लिखें।",
    placeholder: "e.g., My library of rare books to university library; acoustic guitar to son...",
    suggestions: [
      "Personal library of books and journals to university department",
      "Musical instruments and personal memorabilia to son",
      "Handwritten diaries and family photo albums to spouse",
      "Framed awards and certificates to elder daughter",
    ],
    hindiSuggestions: [
      "पुस्तकों का संग्रह विश्वविद्यालय पुस्तकालय को",
      "वाद्ययंत्र और पदक बेटे को",
      "हाथ से लिखी डायरियां व फोटो एलबम जीवनसाथी को",
    ],
  },
  {
    key: "digitalAccounts",
    label: "Digital Accounts & Media",
    hindiLabel: "डिजिटल संपत्ति व सोशल मीडिया",
    subtitle: "Cloud photos, email, social profiles",
    hindiSubtitle: "क्लाउड फोटो, ईमेल, सोशल अकाउंट्स",
    Icon: Globe,
    color: "#2563EB",
    desc: "Cloud photo archives, email accounts, cryptocurrency hardware wallets, and social profile memorialization.",
    hindiDesc: "क्लाउड फोटो, पारिवारिक डिजिटल वॉल्ट, सोशल मीडिया अकाउंट या क्रिप्टो एसेट्स।",
    tooltip: "Instruct your Executor on how to handle your Google/Apple cloud photos, social media profiles, domain names, or crypto wallets. Never write raw passwords or seed phrases in a Will.",
    hindiTooltip: "अपने क्लाउड फोटो, सोशल मीडिया अकाउंट या डिजिटल संपत्ति के प्रबंधन के निर्देश दें। सुरक्षा के लिए वसीयत में कभी भी पासवर्ड या पिन न लिखें।",
    placeholder: "e.g., Apple ID & Google drive family photos transferred to spouse; delete social accounts...",
    suggestions: [
      "Transfer Apple ID & Google Photos family vault to spouse",
      "Permanently delete all social media accounts after 60 days",
      "Entrust hardware cryptocurrency seed phrase to Primary Executor",
      "Transfer digital domain names and creator IP to son",
    ],
    hindiSuggestions: [
      "एप्पल व गूगल फोटोज पारिवारिक वॉल्ट जीवनसाथी को सौंपा जाए",
      "60 दिनों के भीतर सोशल मीडिया अकाउंट स्थायी रूप से बंद किए जाएं",
      "डिजिटल डोमेन और ऑनलाइन संपत्तियां बेटे को हस्तांतरित हों",
    ],
  },
  {
    key: "petsCare",
    label: "Pet Care & Trust",
    hindiLabel: "पालतू जानवरों की देखभाल",
    subtitle: "Caregiver & maintenance fund",
    hindiSubtitle: "देखभालकर्ता व वित्तीय फंड",
    Icon: Heart,
    color: "#059669",
    desc: "Designated caregiver for domestic pets and dedicated funds for veterinary maintenance.",
    hindiDesc: "पालतू जानवरों का संरक्षक और उनके भोजन व इलाज हेतु सुरक्षित राशि।",
    tooltip: "Name a trusted person to care for your domestic pets and optionally earmark a maintenance fund from your estate for their food and veterinary expenses.",
    hindiTooltip: "अपने पालतू जानवरों की देखभाल के लिए किसी विश्वसनीय व्यक्ति का नाम लिखें और उनके भोजन व इलाज के लिए निश्चित राशि निर्धारित करें।",
    placeholder: "e.g., Family dog to be cared for by spouse with ₹2,00,000 maintenance fund...",
    suggestions: [
      "Entrust family pet to spouse with ₹2,00,000 maintenance fund",
      "Entrust pet to sibling with monthly veterinary allowance",
      "Rehome pet with animal welfare society with ₹50,000 donation",
    ],
    hindiSuggestions: [
      "पालतू जानवर की देखभाल जीवनसाथी को ₹2,00,000 फंड के साथ",
      "पालतू पशु की देखभाल भाई/बहन को मासिक खर्च के साथ",
      "पशु कल्याण संस्था को ₹50,000 दान के साथ सौंपा जाए",
    ],
  },
  {
    key: "charitableGifts",
    label: "Charitable Donations",
    hindiLabel: "दान एवं धर्मार्थ कार्य",
    subtitle: "NGOs, trusts, orphanages, causes",
    hindiSubtitle: "ट्रस्ट, अनाथालय, धर्मार्थ संस्थाएं",
    Icon: HandHeart,
    color: "#7C3AED",
    desc: "Optional donations to educational institutions, orphanages, hospitals, or religious trusts.",
    hindiDesc: "शिक्षा, अस्पताल, अनाथालय या धार्मिक ट्रस्ट को ऐच्छिक दान।",
    tooltip: "Specify any fixed amount or percentage of liquid funds you wish to donate to a registered NGO, hospital, orphanage, educational trust, or relief fund.",
    hindiTooltip: "यदि आप किसी पंजीकृत एनजीओ, अनाथालय, अस्पताल या धार्मिक ट्रस्ट को कोई निश्चित राशि या प्रतिशत दान करना चाहते हैं, तो उसका विवरण दें।",
    placeholder: "e.g., ₹1,00,000 to Prime Minister's National Relief Fund; ₹50,000 to local school...",
    suggestions: [
      "₹1,00,000 to Prime Minister's National Relief Fund",
      "₹50,000 to local orphan education trust",
      "5% of liquid mutual fund portfolio to cancer research foundation",
      "₹25,000 to local animal shelter",
    ],
    hindiSuggestions: [
      "₹1,00,000 प्रधानमंत्री राष्ट्रीय राहत कोष में",
      "₹50,000 स्थानीय अनाथालय शिक्षा ट्रस्ट को",
      "म्यूचुअल फंड पोर्टफोलियो का 5% कैंसर अनुसंधान केंद्र को",
    ],
  },
  {
    key: "funeralCeremonyWishes",
    label: "Funeral & Memorial Rites",
    hindiLabel: "अंतिम संस्कार एवं अंगदान",
    subtitle: "Ceremony preferences, organ pledge",
    hindiSubtitle: "संस्कार प्राथमिकताएं, अंगदान प्रतिज्ञा",
    Icon: Flame,
    color: "#DC2626",
    desc: "Rites, crematorium preferences, and anatomical organ donation declarations.",
    hindiDesc: "अंतिम संस्कार के नियम, श्मशान प्राथमिकता और मरणोपरांत अंगदान की घोषणा।",
    tooltip: "Record your wishes regarding religious or eco-friendly funeral ceremonies, ash immersion, and any pledge for organ or eye donation.",
    hindiTooltip: "अपने अंतिम संस्कार की रीति, अस्थि विसर्जन और मरणोपरांत नेत्र या अंगदान की इच्छा यहां दर्ज करें।",
    placeholder: "e.g., Vedic rituals with immediate family only; pledged organ donor...",
    suggestions: [
      "Pledged organ donor (corneas and organs to AIIMS / civil hospital)",
      "Simple Hindu Vedic antim sanskar in home city",
      "Eco-friendly electric cremation with immediate family only",
      "Scatter ashes in holy river Ganges (Haridwar / Rishikesh)",
    ],
    hindiSuggestions: [
      "मरणोपरांत अंगदान (नेत्र व आवश्यक अंग मेडिकल अस्पताल को)",
      "सादगीपूर्ण वैदिक अंतिम संस्कार केवल निकट परिजनों के साथ",
      "पर्यावरण-अनुकूल विद्युत शवदाह गृह में अंतिम संस्कार",
      "अस्थियां गंगाजी (हरिद्वार / ऋषिकेश) में विसर्जित की जाएं",
    ],
  },
  {
    key: "personalMessageToFamily",
    label: "Message to Family",
    hindiLabel: "परिवार के लिए संदेश व आशीर्वाद",
    subtitle: "Heartfelt words, values & blessings",
    hindiSubtitle: "सद्भाव, पारिवारिक मूल्य व आशीर्वाद",
    Icon: Sparkles,
    color: "#0D9488",
    desc: "Heartfelt advice, memories, moral values, and blessings for your loved ones.",
    hindiDesc: "परिवार के लिए प्रेमपूर्ण संदेश, जीवन के मूल्य और एकता का आशीर्वाद।",
    tooltip: "Write a warm, personal message of love, blessings, and moral guidance for your family to cherish alongside your legal Will.",
    hindiTooltip: "अपने परिवार के लिए प्रेम, एकता और आशीर्वाद का व्यक्तिगत संदेश लिखें जो आपकी वसीयत के साथ सुरक्षित रहेगा।",
    placeholder: "e.g., To my beloved family: Always stand united, support each other with love, and live with integrity...",
    suggestions: [
      "Always stand united, support each other with love, and live with integrity.",
      "Treat each other with kindness, respect our elders, and cherish family traditions.",
      "Invest in education and character above all material wealth.",
      "Forgive quickly, love unconditionally, and remember me with joy.",
    ],
    hindiSuggestions: [
      "सदा एकजुट रहें, आपस में प्रेम रखें और ईमानदारी से जीवन जिएं।",
      "एक-दूसरे का आदर करें और पारिवारिक संस्कारों को बनाए रखें।",
      "शिक्षा और अच्छे चरित्र को सबसे बड़ा धन समझें।",
    ],
  },
];

export default function Step8SpecialWishes({
  state: propState,
  onUpdate: propOnUpdate,
  onNext,
  onBack,
  lang: propLang,
}: Step8SpecialWishesProps) {
  const storeState = useWillStore((s) => s.state);
  const storeUpdateState = useWillStore((s) => s.updateState);
  const state = propState || storeState;
  const onUpdate = propOnUpdate || storeUpdateState;

  const context = useLanguage();
  const isHi = propLang === "hi" || context.lang === "hi";

  // TURNED OFF BY DEFAULT:
  // Checked false by default unless user explicitly turned it ON or has existing content
  const [hasSpecialWishes, setHasSpecialWishes] = useState<boolean>(() => {
    if (state.specialWishes?.hasNoSpecialWishes === false) return true;
    if (state.specialWishes?.hasNoSpecialWishes === true) return false;
    const hasAny = state.specialWishes
      ? Object.entries(state.specialWishes).some(
          ([k, v]) => k !== "hasNoSpecialWishes" && typeof v === "string" && v.trim().length > 0
        )
      : false;
    return hasAny;
  });

  const [wishes, setWishes] = useState<SpecialWishes>(() => {
    if (state.specialWishes) {
      return {
        hasNoSpecialWishes: state.specialWishes.hasNoSpecialWishes ?? true,
        jewelleryInstructions: state.specialWishes.jewelleryInstructions || "",
        personalBelongings: state.specialWishes.personalBelongings || "",
        petsCare: state.specialWishes.petsCare || "",
        charitableGifts: state.specialWishes.charitableGifts || "",
        digitalAccounts: state.specialWishes.digitalAccounts || "",
        funeralCeremonyWishes: state.specialWishes.funeralCeremonyWishes || "",
        personalMessageToFamily: state.specialWishes.personalMessageToFamily || "",
      };
    }
    return {
      hasNoSpecialWishes: true,
      jewelleryInstructions: "",
      personalBelongings: "",
      petsCare: "",
      charitableGifts: "",
      digitalAccounts: "",
      funeralCeremonyWishes: "",
      personalMessageToFamily: "",
    };
  });

  useEffect(() => {
    if (state.specialWishes) {
      setWishes({
        hasNoSpecialWishes: state.specialWishes.hasNoSpecialWishes ?? true,
        jewelleryInstructions: state.specialWishes.jewelleryInstructions || "",
        personalBelongings: state.specialWishes.personalBelongings || "",
        petsCare: state.specialWishes.petsCare || "",
        charitableGifts: state.specialWishes.charitableGifts || "",
        digitalAccounts: state.specialWishes.digitalAccounts || "",
        funeralCeremonyWishes: state.specialWishes.funeralCeremonyWishes || "",
        personalMessageToFamily: state.specialWishes.personalMessageToFamily || "",
      });
      if (typeof state.specialWishes.hasNoSpecialWishes === "boolean") {
        setHasSpecialWishes(!state.specialWishes.hasNoSpecialWishes);
      } else {
        const hasAny = Object.entries(state.specialWishes).some(
          ([k, v]) => k !== "hasNoSpecialWishes" && typeof v === "string" && v.trim().length > 0
        );
        setHasSpecialWishes(hasAny);
      }
    }
  }, [state.specialWishes]);

  // Active category selected for editing (like the selected asset box in Step 4)
  const [activeCategoryKey, setActiveCategoryKey] = useState<SpecialWishFieldKey>("jewelleryInstructions");

  const activeCategory =
    CATEGORIES.find((c) => c.key === activeCategoryKey) || CATEGORIES[0];

  const currentWishValue = (wishes[activeCategoryKey] as string) || "";

  const handleUpdateWish = (key: SpecialWishFieldKey, val: string) => {
    setWishes((prev) => {
      const next = {
        ...prev,
        [key]: val,
      };
      const hasAnyContent = Object.entries(next).some(
        ([k, v]) => k !== "hasNoSpecialWishes" && typeof v === "string" && v.trim().length > 0
      );
      if (hasAnyContent && !hasSpecialWishes) {
        setHasSpecialWishes(true);
      }
      onUpdate((statePrev) => {
        const nextState: WillDraftingState = {
          ...statePrev,
          specialWishes: {
            ...next,
            hasNoSpecialWishes: false,
          },
        };
        return {
          ...nextState,
          clauses: generateWillClauses(nextState),
        };
      });
      return next;
    });
  };

  const handleToggleHasSpecialWishes = (checked: boolean) => {
    setHasSpecialWishes(checked);
    onUpdate((statePrev) => {
      const nextState: WillDraftingState = {
        ...statePrev,
        specialWishes: {
          ...(statePrev.specialWishes || wishes),
          hasNoSpecialWishes: !checked,
        },
      };
      return {
        ...nextState,
        clauses: generateWillClauses(nextState),
      };
    });
  };

  const appendSuggestion = (key: SpecialWishFieldKey, text: string) => {
    const current = (wishes[key] as string) || "";
    if (!current.trim()) {
      handleUpdateWish(key, text);
    } else if (!current.includes(text)) {
      handleUpdateWish(key, `${current.trim()}; ${text}`);
    }
  };

  const handleNextCategory = () => {
    const currentIndex = CATEGORIES.findIndex((c) => c.key === activeCategoryKey);
    if (currentIndex < CATEGORIES.length - 1) {
      setActiveCategoryKey(CATEGORIES[currentIndex + 1].key);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasAnyContent = Object.entries(wishes).some(
      ([k, v]) => k !== "hasNoSpecialWishes" && typeof v === "string" && v.trim().length > 0
    );
    const finalHasNoSpecialWishes = hasAnyContent ? false : !hasSpecialWishes;
    onUpdate((prev) => {
      const nextState: WillDraftingState = {
        ...prev,
        specialWishes: {
          ...wishes,
          hasNoSpecialWishes: finalHasNoSpecialWishes,
        },
      };
      return {
        ...nextState,
        clauses: generateWillClauses(nextState),
      };
    });
    onNext();
  };

  // Count configured wishes
  const configuredCount = CATEGORIES.filter(
    (c) => ((wishes[c.key] as string) || "").trim().length > 0
  ).length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              {isHi ? "विशेष इच्छाएं एवं वसीयत" : "Special Wishes & Sentimental Directives"}
            </h2>
            {hasSpecialWishes ? (
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--color-gold)",
                  backgroundColor: "rgba(198, 83, 120, 0.12)",
                  padding: "0.15rem 0.55rem",
                  borderRadius: "999px",
                }}
              >
                {isHi ? `${configuredCount} / ${CATEGORIES.length} दर्ज` : `${configuredCount} of ${CATEGORIES.length} Configured`}
              </span>
            ) : (
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--color-slate)",
                  backgroundColor: "rgba(27, 42, 74, 0.06)",
                  padding: "0.15rem 0.55rem",
                  borderRadius: "999px",
                }}
              >
                {isHi ? "बंद (वैकल्पिक)" : "Turned OFF (Optional)"}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <AudioAssistantButton
            textToSpeak={
              isHi
                ? "क्या आपकी कोई विशेष इच्छाएं हैं जैसे पारिवारिक आभूषण, पालतू जानवरों की देखभाल या धार्मिक कार्य? यह विकल्प डिफ़ॉल्ट रूप से बंद है। यदि आप जोड़ना चाहते हैं, तो 'मेरी विशेष इच्छाएं हैं' चालू करें।"
                : "Do you have special wishes like heirloom jewellery, pet care, digital legacy, funeral rites, or charity? This is turned off by default. Turn ON 'I have special wishes' to specify categories."
            }
            label={isHi ? "सुनें 🔊" : "Listen 🔊"}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Toggle Card: "I have special wishes" (TURNED OFF BY DEFAULT) */}
        <div
          onClick={() => handleToggleHasSpecialWishes(!hasSpecialWishes)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.1rem 1.4rem",
            borderRadius: "16px",
            backgroundColor: hasSpecialWishes ? "rgba(198, 83, 120, 0.05)" : "#FFFFFF",
            border: hasSpecialWishes
              ? "1.5px solid var(--color-gold)"
              : "1px solid rgba(27, 42, 74, 0.12)",
            boxShadow: hasSpecialWishes
              ? "0 4px 16px rgba(198, 83, 120, 0.08)"
              : "0 2px 8px rgba(0, 0, 0, 0.02)",
            transition: "all 0.2s ease",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                backgroundColor: hasSpecialWishes ? "var(--color-gold)" : "rgba(27, 42, 74, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: hasSpecialWishes ? "#FFFFFF" : "var(--color-navy)",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-navy)" }}>
                  {isHi ? "मेरी विशेष इच्छाएं हैं" : "I have special wishes"}
                </span>
                <InfoTooltip
                  text="Optional toggle: Turn this ON only if you want to include specific clauses for heirloom jewellery, keepsakes, digital accounts, pet care, charity, or funeral preferences."
                  hindiText="वैकल्पिक: यदि आप पारिवारिक आभूषण, डिजिटल अकाउंट, पालतू जानवर, दान या अंतिम संस्कार से जुड़े विशेष निर्देश जोड़ना चाहते हैं, तो इसे चालू करें।"
                />
              </div>
              <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "var(--color-slate)", lineHeight: 1.35 }}>
                {hasSpecialWishes
                  ? (isHi
                      ? "नीचे दिए गए किसी भी वर्ग (आभूषण, पालतू पशु, दान, अंतिम संस्कार) पर टैप करके अपनी विशेष इच्छाएं दर्ज करें।"
                      : "Select categories below with icons to record heirloom jewellery, pet care, digital legacy, funeral preferences, or charitable gifts.")
                  : (isHi
                      ? "पारिवारिक आभूषण, पालतू जानवरों की देखभाल, दान, डिजिटल संपत्ति या अंतिम संस्कार की प्राथमिकताएं जोड़ने के लिए चालू करें।"
                      : "Turn ON to record heirloom jewellery, pet care, digital legacy, funeral preferences, or charitable gifts.")}
              </p>
            </div>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}
          >
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 800,
                color: hasSpecialWishes ? "var(--color-gold)" : "var(--color-slate)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {hasSpecialWishes ? "ON" : "OFF"}
            </span>
            <AppleSwitch
              checked={hasSpecialWishes}
              onChange={handleToggleHasSpecialWishes}
              activeColor="var(--color-gold)"
            />
          </div>
        </div>

        {/* STATE 1: TURNED OFF (DEFAULT) - Simple, clear skip card */}
        {!hasSpecialWishes ? (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "18px",
              border: "1.5px dashed rgba(27, 42, 74, 0.12)",
              padding: "2.5rem 1.5rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "rgba(95, 126, 117, 0.1)",
                color: "var(--color-sage)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle2 size={26} />
            </div>
            <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)" }}>
              {isHi ? "मानक वसीयत वितरण (कोई विशेष इच्छा नहीं)" : "Standard Will Distribution (No Special Wishes)"}
            </h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-slate)", maxWidth: "480px", lineHeight: 1.5 }}>
              {isHi
                ? "आपकी सभी संपत्तियां चरण 5 में तय किए गए मुख्य और वैकल्पिक लाभार्थियों को उनके प्रतिशत के अनुसार हस्तांतरित की जाएंगी। आप सीधे अगले चरण पर आगे बढ़ सकते हैं।"
                : "Your estate will be distributed strictly according to your asset allocations in Step 5 and the statutory residuary safety net. You can proceed directly to motivation and final review."}
            </p>
            <button
              type="button"
              onClick={() => handleToggleHasSpecialWishes(true)}
              style={{
                marginTop: "0.4rem",
                padding: "0.45rem 1rem",
                borderRadius: "999px",
                border: "1px solid rgba(198, 83, 120, 0.3)",
                backgroundColor: "rgba(198, 83, 120, 0.06)",
                color: "var(--color-gold)",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <Sparkles size={14} />
              {isHi ? "+ विशेष इच्छाएं जोड़ने के लिए चालू करें" : "+ Turn ON to add heirlooms, pet trusts or funeral rites"}
            </button>
          </div>
        ) : (
          /* STATE 2: TURNED ON - Rich Assets-Style UI with Category Boxes & Icons */
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* 1. Category Boxes Grid (Exact same pattern as Step 4 Assets) */}
            <div
              className="wishes-category-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: "0.75rem",
                width: "100%",
              }}
            >
              {CATEGORIES.map((cat) => {
                const CatIcon = cat.Icon;
                const isSelected = activeCategoryKey === cat.key;
                const wishVal = ((wishes[cat.key] as string) || "").trim();
                const hasWish = wishVal.length > 0;

                return (
                  <div
                    key={cat.key}
                    className="wishes-category-card"
                    onClick={() => setActiveCategoryKey(cat.key)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "16px",
                      border: isSelected ? `2px solid ${cat.color}` : "1px solid rgba(27, 42, 74, 0.1)",
                      padding: "0.85rem 1rem",
                      boxShadow: isSelected
                        ? `0 6px 20px ${cat.color}22`
                        : "0 2px 8px rgba(0, 0, 0, 0.02)",
                      cursor: "pointer",
                      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "0.6rem",
                      position: "relative",
                    }}
                  >
                    {/* Top Row: Icon Container on Left, Plus/Check on Top Right */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          backgroundColor: `${cat.color}18`,
                          color: cat.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <CatIcon size={20} strokeWidth={2.2} />
                      </div>

                      {/* Status / Plus Badge at Top Right */}
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: hasWish ? "rgba(95, 126, 117, 0.15)" : `${cat.color}15`,
                          color: hasWish ? "var(--color-sage)" : cat.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {hasWish ? <Check size={16} strokeWidth={3} /> : <Plus size={15} strokeWidth={3} />}
                      </div>
                    </div>

                    {/* Bottom Details: Category Title & Status */}
                    <div>
                      <h4 style={{ margin: "0 0 0.15rem", fontSize: "0.88rem", fontWeight: 700, color: "var(--color-navy)", display: "flex", alignItems: "center" }}>
                        {isHi ? cat.hindiLabel : cat.label}
                        <InfoTooltip text={cat.tooltip} hindiText={cat.hindiTooltip} />
                      </h4>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.72rem" }}>
                        {hasWish ? (
                          <span style={{ fontWeight: 700, color: "#166534" }}>
                            {isHi ? "✓ दर्ज है" : "✓ Configured"}
                          </span>
                        ) : (
                          <span style={{ color: "var(--color-slate)", fontWeight: 500 }}>
                            {isHi ? "शामिल नहीं" : "Not specified"}
                          </span>
                        )}

                        {isSelected && (
                          <span style={{ color: cat.color, fontWeight: 700, fontSize: "0.68rem" }}>
                            {isHi ? "सक्रिय" : "Active"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. Active Category Editor Card (Styled like Step 4 Asset Entry) */}
            <div
              className="wishes-editor-card"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: `1.5px solid ${activeCategory.color}35`,
                padding: "1.35rem 1.6rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
                boxShadow: "0 8px 30px rgba(27, 42, 74, 0.04)",
              }}
            >
              {/* Category Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      backgroundColor: `${activeCategory.color}18`,
                      color: activeCategory.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <activeCategory.Icon size={22} strokeWidth={2.2} />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        color: activeCategory.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {isHi ? "श्रेणी" : "Category"}
                    </span>
                    <h3 style={{ margin: "0.1rem 0 0", fontSize: "1.15rem", fontWeight: 800, color: "var(--color-navy)" }}>
                      {isHi ? activeCategory.hindiLabel : activeCategory.label}
                    </h3>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {currentWishValue.trim().length > 0 && (
                    <span
                      style={{
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        color: "#166534",
                        backgroundColor: "rgba(22, 101, 52, 0.1)",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                      }}
                    >
                      ✓ {isHi ? "सहेजा गया" : "Saved"}
                    </span>
                  )}
                </div>
              </div>

              <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--color-slate)", lineHeight: 1.45 }}>
                {isHi ? activeCategory.hindiDesc : activeCategory.desc}
              </p>

              {/* Text Input Area */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={{ fontSize: "0.76rem", fontWeight: 800, color: "var(--color-navy)", textTransform: "uppercase", letterSpacing: "0.03em", display: "flex", alignItems: "center" }}>
                  {isHi ? `आपके निर्देश (${activeCategory.hindiLabel}):` : `Your Directive (${activeCategory.label}):`}
                  <InfoTooltip text={activeCategory.tooltip} hindiText={activeCategory.hindiTooltip} />
                </label>
                <textarea
                  rows={3}
                  value={currentWishValue}
                  onChange={(e) => handleUpdateWish(activeCategoryKey, e.target.value)}
                  placeholder={isHi ? "उदा. अपनी विशिष्ट इच्छाएं यहां दर्ज करें..." : activeCategory.placeholder}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    border: "1.5px solid rgba(23, 34, 40, 0.15)",
                    fontSize: "0.88rem",
                    color: "var(--color-navy)",
                    backgroundColor: "#FAFBFC",
                    outline: "none",
                    fontFamily: "var(--font-main)",
                    lineHeight: 1.5,
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Quick Suggestions Strip (Clickable Chips like Step 4) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-slate)" }}>
                  {isHi ? "त्वरित सुझाव (जोड़ने के लिए टैप करें):" : "Quick suggestions (tap to add):"}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {(isHi ? activeCategory.hindiSuggestions : activeCategory.suggestions).map((sug, idx) => {
                    const alreadyIncluded = currentWishValue.includes(sug);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => appendSuggestion(activeCategoryKey, sug)}
                        style={{
                          padding: "0.3rem 0.75rem",
                          borderRadius: "999px",
                          border: alreadyIncluded
                            ? "1px solid var(--color-sage)"
                            : "1px solid rgba(27, 42, 74, 0.12)",
                          backgroundColor: alreadyIncluded
                            ? "rgba(95, 126, 117, 0.1)"
                            : "#FFFFFF",
                          color: alreadyIncluded ? "var(--color-sage)" : "var(--color-navy)",
                          fontSize: "0.75rem",
                          fontWeight: alreadyIncluded ? 700 : 500,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {alreadyIncluded ? <Check size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={2.5} />}
                        <span>{sug}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Bar inside active card */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.6rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(23, 34, 40, 0.08)",
                }}
              >
                <div>
                  {currentWishValue.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleUpdateWish(activeCategoryKey, "")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-slate)",
                        fontSize: "0.76rem",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        padding: "0.2rem 0.4rem",
                      }}
                    >
                      <RotateCcw size={12} /> {isHi ? "हटाएं / रीसेट करें" : "Clear this wish"}
                    </button>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={handleNextCategory}
                    style={{
                      padding: "0.45rem 1rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(27, 42, 74, 0.15)",
                      backgroundColor: "#FFFFFF",
                      color: "var(--color-navy)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <span>{isHi ? "अगला विकल्प →" : "Next Category →"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Summary of Configured Wishes (Like Registered Assets List in Step 4) */}
            {configuredCount > 0 && (
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "18px",
                  border: "1px solid rgba(27, 42, 74, 0.08)",
                  padding: "1.1rem 1.35rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800, color: "var(--color-navy)" }}>
                    {isHi ? `दर्ज की गई इच्छाएं (${configuredCount})` : `Configured Wishes Summary (${configuredCount})`}
                  </h4>
                  <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "var(--color-sage)" }}>
                    ✓ {isHi ? "वसीयत में शामिल" : "Included in Will"}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {CATEGORIES.filter((c) => ((wishes[c.key] as string) || "").trim().length > 0).map((cat) => {
                    const CatIcon = cat.Icon;
                    const val = (wishes[cat.key] as string) || "";
                    return (
                      <div
                        key={cat.key}
                        className="wish-summary-item"
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: "0.75rem",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "12px",
                          backgroundColor: "#FAFBFC",
                          border: "1px solid rgba(27, 42, 74, 0.06)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", minWidth: 0, flex: 1 }}>
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "8px",
                              backgroundColor: `${cat.color}18`,
                              color: cat.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: "2px",
                            }}
                          >
                            <CatIcon size={16} />
                          </div>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--color-navy)" }}>
                              {isHi ? cat.hindiLabel : cat.label}
                            </div>
                            <div style={{ fontSize: "0.76rem", color: "var(--color-slate)", marginTop: "2px", lineHeight: 1.4 }}>
                              {val}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexShrink: 0 }}>
                          <button
                            type="button"
                            onClick={() => setActiveCategoryKey(cat.key)}
                            title={isHi ? "संपादित करें" : "Edit Wish"}
                            style={{
                              padding: "0.3rem 0.6rem",
                              borderRadius: "8px",
                              border: "1px solid rgba(27, 42, 74, 0.12)",
                              backgroundColor: "#FFFFFF",
                              color: "var(--color-navy)",
                              fontSize: "0.74rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <Pencil size={12} />
                            <span>{isHi ? "संपादित करें" : "Edit"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleUpdateWish(cat.key, "")}
                            title={isHi ? "हटाएं" : "Remove Wish"}
                            style={{
                              padding: "0.3rem 0.55rem",
                              borderRadius: "8px",
                              border: "1px solid rgba(220, 38, 38, 0.2)",
                              backgroundColor: "rgba(220, 38, 38, 0.05)",
                              color: "#DC2626",
                              fontSize: "0.74rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <Trash2 size={12} />
                            <span>{isHi ? "हटाएं" : "Remove"}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wizard Button Footer */}
        <div style={{ marginTop: "1rem" }}>
          <WizardButton onBack={onBack} isSubmit={true} />
        </div>
      </form>
    </div>
  );
}
