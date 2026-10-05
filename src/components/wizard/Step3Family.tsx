"use client";

import React, { useState } from "react";import WizardButton from "./button";

import {
  WillDraftingState,
  FamilyMember,
  calculateIsMinor,
} from "@/lib/willDraftingStore";
import AppleSwitch from "@/components/dashboard/AppleSwitch";
import {
  Users,
  Heart,
  Baby,
  User,
  UserPlus,
  Plus,
  Trash2,
  X,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Sparkles,
  Info,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

interface Step3FamilyProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

export default function Step3Family({
  state,
  onUpdate,
  onNext,
  onBack,
  lang: propLang,
  onChangeLang: propOnChangeLang,
}: Step3FamilyProps) {
  const context = useLanguage();
  const currentLang = propLang || context.lang || "en";
  const isHi = currentLang === "hi";
  const handleToggleLang = propOnChangeLang || context.setLang;

  const [family, setFamily] = useState<FamilyMember[]>(state.familyMembers || []);
  const [modalOpen, setModalOpen] = useState(false);

  // Form state for adding/editing a member
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState<FamilyMember["relationship"]>("spouse");
  const [ageSlider, setAgeSlider] = useState<number>(35);
  const [useExactDob, setUseExactDob] = useState(false);
  const [exactDob, setExactDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [sameAddress, setSameAddress] = useState(true);
  const [customAddress, setCustomAddress] = useState("");
  const [customRelation, setCustomRelation] = useState("");
  const [modalGroup, setModalGroup] = useState<"parents" | "peers" | "children">("peers");

  // Open unified modal for any family relationship
  const handleOpenAdd = (defaultRel?: FamilyMember["relationship"]) => {
    const rel = defaultRel || "spouse";
    setRelationship(rel);
    if (rel === "father" || rel === "mother") setAgeSlider(68);
    else if (rel === "son" || rel === "daughter") setAgeSlider(14);
    else if (rel === "spouse") setAgeSlider(42);
    else setAgeSlider(38);

    setName("");
    setCustomRelation("");
    setUseExactDob(false);
    setExactDob("");
    setPhone("");
    setEmail("");
    setPan("");
    setSameAddress(true);
    setCustomAddress("");
    setModalOpen(true);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let finalDob = exactDob;
    if (!useExactDob || !exactDob) {
      const birthYear = new Date().getFullYear() - ageSlider;
      finalDob = `${birthYear}-06-15`;
    }

    const isMinor = ageSlider < 18;

    const newMember: FamilyMember = {
      id: `fam-${Date.now()}`,
      name: name.trim(),
      relationship,
      customRelationship:
        relationship === "other" && customRelation.trim()
          ? customRelation.trim()
          : undefined,
      dob: finalDob,
      isMinor,
      pan: pan.trim() ? pan.trim().toUpperCase() : undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      address: sameAddress
        ? "Same as your address (Will creator)"
        : customAddress.trim() || undefined,
      notes: relationship === "other" ? modalGroup : undefined,
    };

    const updatedFamily = [...family, newMember];
    setFamily(updatedFamily);
    onUpdate((prev) => ({
      ...prev,
      familyMembers: updatedFamily,
    }));

    setModalOpen(false);
  };

  const handleDeleteMember = (id: string) => {
    const updatedFamily = family.filter((f) => f.id !== id);
    setFamily(updatedFamily);
    onUpdate((prev) => ({
      ...prev,
      familyMembers: updatedFamily,
    }));
  };

  const getAge = (dobString: string) => {
    if (!dobString) return null;
    const diffMs = Date.now() - new Date(dobString).getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Relationship metadata with Lucide icons
  const relConfig: Record<
    FamilyMember["relationship"],
    { label: string; Icon: React.ElementType; color: string; desc: string }
  > = {
    spouse: { label: "Spouse", Icon: Heart, color: "#E11D48", desc: "Wife / Husband" },
    son: { label: "Son", Icon: Baby, color: "#2563EB", desc: "Male Child" },
    daughter: { label: "Daughter", Icon: Baby, color: "#DB2777", desc: "Female Child" },
    father: { label: "Father", Icon: Users, color: "#5F7E75", desc: "Paternal Ascendant" },
    mother: { label: "Mother", Icon: Users, color: "#C65378", desc: "Maternal Ascendant" },
    brother: { label: "Brother", Icon: UserPlus, color: "#49585F", desc: "Sibling" },
    sister: { label: "Sister", Icon: UserPlus, color: "#9333EA", desc: "Sibling" },
    other: { label: "Other Relative", Icon: User, color: "#64748B", desc: "Extended Family" },
  };

  const allowedRelations: FamilyMember["relationship"][] =
    modalGroup === "parents"
      ? ["father", "mother", "other"]
      : modalGroup === "children"
      ? ["son", "daughter", "other"]
      : ["spouse", "brother", "sister", "other"];

  // Group into generations for visual tree
  const parents = family.filter(
    (f) =>
      f.relationship === "father" ||
      f.relationship === "mother" ||
      (f.relationship === "other" &&
        ((f.notes || "").includes("parents") ||
          (f.customRelationship || "").toLowerCase().includes("grandparent") ||
          (f.customRelationship || "").toLowerCase().includes("father") ||
          (f.customRelationship || "").toLowerCase().includes("mother") ||
          (f.customRelationship || "").toLowerCase().includes("dada") ||
          (f.customRelationship || "").toLowerCase().includes("dadi") ||
          (f.customRelationship || "").toLowerCase().includes("nana") ||
          (f.customRelationship || "").toLowerCase().includes("nani")))
  );
  const children = family.filter(
    (f) =>
      f.relationship === "son" ||
      f.relationship === "daughter" ||
      (f.relationship === "other" &&
        ((f.notes || "").includes("children") ||
          (f.customRelationship || "").toLowerCase().includes("grandchild") ||
          (f.customRelationship || "").toLowerCase().includes("son") ||
          (f.customRelationship || "").toLowerCase().includes("daughter") ||
          (f.customRelationship || "").toLowerCase().includes("child") ||
          (f.customRelationship || "").toLowerCase().includes("pota") ||
          (f.customRelationship || "").toLowerCase().includes("poti") ||
          (f.customRelationship || "").toLowerCase().includes("naati")))
  );
  const immediate = family.filter(
    (f) => !parents.includes(f) && !children.includes(f)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", width: "100%", height: "100%", justifyContent: "space-between" }}>
      {/* Compact Header with Single Primary Add Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              {isHi ? "आपका पारिवारिक दायरा" : "Your Family Circle"}
            </h2>
            <span style={{ fontSize: "0.8rem", color: "var(--color-slate)", fontWeight: 600 }}>
              • {family.length} {isHi ? "पंजीकृत सदस्य" : "Registered"}
            </span>
          </div>
        </div>

        {/* Unified + Add Family Member Button, Audio Assistant & Language Toggle */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => handleOpenAdd()}
            className="btn btn-gold"
            style={{
              padding: "0.45rem 1rem",
              fontSize: "0.82rem",
              borderRadius: "10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontWeight: 700,
              boxShadow: "0 2px 10px rgba(198, 83, 120, 0.25)",
              cursor: "pointer",
            }}
          >
            <Plus size={15} /> {isHi ? "+ परिवार का सदस्य जोड़ें" : "+ Add Family Member"}
          </button>
          <AudioAssistantButton
            textToSpeak={
              isHi
                ? "अपने परिवार के किसी भी सदस्य को जोड़ने के लिए 'परिवार का सदस्य जोड़ें' बटन पर टैप करें।"
                : "Tap the Add Family Member button to add your spouse, children, parents, siblings, or any other relatives. You can choose any relationship."
            }
            label={isHi ? "सुनें 🔊" : "Listen 🔊"}
          />
          <LanguageToggle lang={currentLang} onChangeLang={handleToggleLang} size="sm" />
        </div>
      </div>

      {/* 3-Column Horizontal Generations Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr 1fr",
          gap: "0.85rem",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Column 1: Parents (Ascendants) */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            minHeight: 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(27, 42, 74, 0.05)", paddingBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-slate)" }}>
              {isHi ? "माता-पिता (पूर्वज)" : "Parents (Ascendants)"}
            </span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {parents.length === 0 ? (
              <div
                onClick={() => handleOpenAdd("father")}
                style={{
                  padding: "1.25rem 1rem",
                  borderRadius: "12px",
                  border: "1.5px dashed rgba(27, 42, 74, 0.12)",
                  backgroundColor: "rgba(27, 42, 74, 0.01)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  color: "var(--color-slate)",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <Users size={20} color="var(--color-slate)" />
                <span>{isHi ? "+ पिता या माता जोड़ें" : "+ Add Father or Mother"}</span>
              </div>
            ) : (
              parents.map((m) => renderFamilyNode(m))
            )}
          </div>
        </div>

        {/* Column 2: Testator (You) + Spouse + Siblings */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            minHeight: 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(27, 42, 74, 0.05)", paddingBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-navy)" }}>
              {isHi ? "आप एवं समकक्षी (जीवनसाथी / भाई-बहन)" : "You & Immediate Family (Spouse / Siblings)"}
            </span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {/* Testator Card (Self) */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(23, 34, 40, 0.03), rgba(198, 83, 120, 0.06))",
                borderRadius: "14px",
                border: "1.5px solid var(--color-gold)",
                padding: "0.75rem 0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  backgroundColor: "var(--color-navy)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <User size={18} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <h4 style={{ margin: 0, fontSize: "0.88rem", fontWeight: 800, color: "var(--color-navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {state.testator.fullName || (isHi ? "आप (वसीयतकर्ता)" : "You (Will Creator)")}
                  </h4>
                  <span style={{ fontSize: "0.64rem", fontWeight: 800, backgroundColor: "var(--color-gold)", color: "#FFFFFF", padding: "0.08rem 0.35rem", borderRadius: "999px" }}>
                    {isHi ? "वसीयतकर्ता" : "Creator"}
                  </span>
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--color-slate)", marginTop: "0.1rem" }}>
                  {isHi ? "स्वस्थ चित्त • कानूनी रूप से योग्य" : "Sound Mind • Legally qualified"}
                </div>
              </div>
            </div>

            {/* Immediate Family Members */}
            {immediate.map((m) => renderFamilyNode(m))}
          </div>
        </div>

        {/* Column 3: Children & Descendants */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            minHeight: 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(27, 42, 74, 0.05)", paddingBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-slate)" }}>
              {isHi ? "बच्चे एवं वंशज" : "Children & Descendants"}
            </span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {children.length === 0 ? (
              <div
                onClick={() => handleOpenAdd("son")}
                style={{
                  padding: "1.25rem 1rem",
                  borderRadius: "12px",
                  border: "1.5px dashed rgba(27, 42, 74, 0.12)",
                  backgroundColor: "rgba(27, 42, 74, 0.01)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  color: "var(--color-slate)",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <Baby size={20} color="var(--color-slate)" />
                <span>{isHi ? "+ बेटा या बेटी जोड़ें" : "+ Add Son or Daughter"}</span>
              </div>
            ) : (
              children.map((m) => renderFamilyNode(m))
            )}
          </div>
        </div>
      </div>

      {/* Wizard Button Footer */}
      <WizardButton onBack={onBack} onNext={onNext} />

      {/* Apple Sheet Modal for Adding/Configuring Family Member */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(23, 34, 40, 0.65)",
            backdropFilter: "blur(14px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "540px",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: "2rem 2.25rem",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle Bar */}
            <div
              style={{
                width: "42px",
                height: "4px",
                borderRadius: "999px",
                backgroundColor: "rgba(27, 42, 74, 0.2)",
                margin: "-0.5rem auto 1.5rem",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ margin: 0, color: "var(--color-navy)", fontSize: "1.35rem", fontWeight: 800 }}>
                  Add Family Member
                </h3>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.825rem", color: "var(--color-slate)" }}>
                  Registered as a recognized natural heir in your testament.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(27, 42, 74, 0.06)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-slate)",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMember} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Who is this person? / Relationship Dropdown */}
              <div>
                <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.45rem" }}>
                  {isHi ? "यह व्यक्ति कौन है? (संबंध चुनें) *" : "Who is this person? (Select Relationship) *"}
                </label>
                <div style={{ position: "relative", width: "100%" }}>
                  <select
                    value={relationship}
                    onChange={(e) => {
                      const rel = e.target.value as FamilyMember["relationship"];
                      setRelationship(rel);
                      if (rel === "father" || rel === "mother") setAgeSlider(68);
                      else if (rel === "son" || rel === "daughter") setAgeSlider(14);
                      else if (rel === "spouse") setAgeSlider(42);
                      else if (rel === "brother" || rel === "sister") setAgeSlider(38);
                    }}
                    style={{
                      width: "100%",
                      padding: "0.75rem 2.2rem 0.75rem 1rem",
                      borderRadius: "12px",
                      border: "1.5px solid rgba(27, 42, 74, 0.15)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--color-navy)",
                      backgroundColor: "#FFFFFF",
                      outline: "none",
                      cursor: "pointer",
                      appearance: "none",
                    }}
                  >
                    <option value="spouse">{isHi ? "जीवनसाथी (पति / पत्नी)" : "Spouse (Husband / Wife)"}</option>
                    <option value="son">{isHi ? "बेटा (Child — Son)" : "Child — Son"}</option>
                    <option value="daughter">{isHi ? "बेटी (Child — Daughter)" : "Child — Daughter"}</option>
                    <option value="father">{isHi ? "पिता (Parent — Father)" : "Parent — Father"}</option>
                    <option value="mother">{isHi ? "माता (Parent — Mother)" : "Parent — Mother"}</option>
                    <option value="brother">{isHi ? "भाई (Sibling — Brother)" : "Sibling — Brother"}</option>
                    <option value="sister">{isHi ? "बहन (Sibling — Sister)" : "Sibling — Sister"}</option>
                    <option value="other">{isHi ? "अन्य रिश्तेदार या आश्रित (दादा-दादी, पोता-पोती, चाचा, अन्य)" : "Other (Grandparent, Grandchild, Relative, Dependent)"}</option>
                  </select>
                  <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: "0.8rem" }}>
                    ▼
                  </div>
                </div>
              </div>

              {/* Full Legal Name */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Full Legal Name *
                  </label>
                  {/* Quick Salutation Chips */}
                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    {(relationship === "son" || (relationship === "daughter" && ageSlider < 18)
                      ? ["Master", "Miss"]
                      : ["Shri", "Smt.", "Dr."]
                    ).map((prefix) => (
                      <button
                        key={prefix}
                        type="button"
                        onClick={() => {
                          const clean = name.replace(/^(Master|Miss|Shri|Smt\.|Dr\.)\s*/i, "");
                          setName(`${prefix} ${clean}`.trim());
                        }}
                        style={{
                          padding: "0.15rem 0.45rem",
                          borderRadius: "999px",
                          fontSize: "0.675rem",
                          fontWeight: 600,
                          backgroundColor: name.startsWith(prefix) ? "var(--color-navy)" : "rgba(27, 42, 74, 0.05)",
                          color: name.startsWith(prefix) ? "#FFFFFF" : "var(--color-slate)",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {prefix}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  required
                  placeholder={
                    relationship === "spouse"
                      ? "e.g., Sunita Sharma"
                      : relationship === "son"
                      ? "e.g., Aryan Sharma"
                      : "e.g., Relative Name"
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.95rem",
                    color: "var(--color-navy)",
                    outline: "none",
                  }}
                />
              </div>

              {/* Custom Relationship Field (shown when Other Relative is selected) */}
              {relationship === "other" && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.825rem",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {isHi ? "विशिष्ट रिश्ता दर्ज करें *" : "Relationship with this Person *"}
                  </label>
                  <input
                    type="text"
                    required={relationship === "other"}
                    placeholder={isHi ? "उदा. दादा-दादी, पोता-पोती, चाचा, भतीजा" : "e.g., Grandparent, Grandchild, Maternal Uncle, Niece, Family Friend"}
                    value={customRelation}
                    onChange={(e) => setCustomRelation(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(27, 42, 74, 0.12)",
                      fontSize: "0.95rem",
                      color: "var(--color-navy)",
                      outline: "none",
                    }}
                  />
                  {/* Quick relation pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.5rem" }}>
                    {[
                      { en: "Grandparent", hi: "दादा / दादी" },
                      { en: "Grandchild", hi: "पोता / पोती" },
                      { en: "Daughter-in-law", hi: "बहू" },
                      { en: "Son-in-law", hi: "दामाद" },
                      { en: "Uncle / Aunt", hi: "चाचा / बुआ / मामा" },
                      { en: "Nephew / Niece", hi: "भतीजा / भांजा" },
                      { en: "Family Friend", hi: "पारिवारिक मित्र" },
                    ].map((q) => (
                      <button
                        key={q.en}
                        type="button"
                        onClick={() => {
                          setCustomRelation(isHi ? q.hi : q.en);
                          if (q.en === "Grandparent") setAgeSlider(75);
                          else if (q.en === "Grandchild") setAgeSlider(8);
                        }}
                        style={{
                          padding: "0.22rem 0.55rem",
                          borderRadius: "999px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          backgroundColor: customRelation === (isHi ? q.hi : q.en) ? "var(--color-navy)" : "rgba(27, 42, 74, 0.05)",
                          color: customRelation === (isHi ? q.hi : q.en) ? "#FFFFFF" : "var(--color-slate)",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {isHi ? q.hi : q.en}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Age Slider with Legal Capacity Indicator */}
              <div
                style={{
                  backgroundColor: "rgba(27, 42, 74, 0.02)",
                  borderRadius: "16px",
                  padding: "1.25rem",
                  border: "1px solid rgba(27, 42, 74, 0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Approximate Age
                  </span>

                  {/* Dynamic Status Badge */}
                  {ageSlider < 18 ? (
                    <span
                      style={{
                        fontSize: "0.725rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        backgroundColor: "rgba(225, 29, 72, 0.1)",
                        color: "#BE123C",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <AlertTriangle size={12} /> Minor (Guardian Legally Required)
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: "0.725rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        backgroundColor: "rgba(124, 148, 115, 0.15)",
                        color: "var(--color-sage)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <CheckCircle2 size={12} /> Adult Beneficiary (18+)
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-navy)" }}>
                    {ageSlider}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-slate)", fontWeight: 600 }}>
                    Years Old (Born approx. {new Date().getFullYear() - ageSlider})
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="95"
                  value={ageSlider}
                  onChange={(e) => setAgeSlider(parseInt(e.target.value, 10))}
                  style={{
                    width: "100%",
                    height: "8px",
                    borderRadius: "999px",
                    accentColor: ageSlider < 18 ? "#E11D48" : "var(--color-gold)",
                    cursor: "pointer",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem", fontSize: "0.7rem", color: "var(--color-slate)" }}>
                  <span>Infant (0y)</span>
                  <span style={{ color: "#BE123C", fontWeight: 700 }}>Majority Mark (18y)</span>
                  <span>Senior (95y)</span>
                </div>

                {/* Optional Exact DOB Toggle */}
                <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px dashed rgba(27, 42, 74, 0.1)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.775rem", color: "var(--color-slate)" }}>
                      Have exact passport / birth certificate date?
                    </span>
                    <button
                      type="button"
                      onClick={() => setUseExactDob(!useExactDob)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-navy)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {useExactDob ? "Use age slider" : "Enter exact date"}
                    </button>
                  </div>
                  {useExactDob && (
                    <input
                      type="date"
                      value={exactDob}
                      onChange={(e) => {
                        setExactDob(e.target.value);
                        if (e.target.value) {
                          const year = new Date(e.target.value).getFullYear();
                          if (!isNaN(year)) setAgeSlider(new Date().getFullYear() - year);
                        }
                      }}
                      style={{
                        marginTop: "0.5rem",
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(27, 42, 74, 0.15)",
                        fontSize: "0.85rem",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Optional Contact Fields (Phone & Address) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    {isHi ? "मोबाइल नंबर (ऐच्छिक)" : "Phone Number (Optional)"}
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    placeholder="9820098765"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(27, 42, 74, 0.12)",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="relative@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(27, 42, 74, 0.12)",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* PAN Number Field */}
              <div>
                <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                  Permanent Account Number (PAN) (Recommended for identification)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CJDPP6174L or UNGPS6807G"
                  maxLength={10}
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    outline: "none",
                  }}
                />
              </div>

              {/* Same Address Switch */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    backgroundColor: "rgba(27, 42, 74, 0.03)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      Resides at your address
                    </div>
                    <div style={{ fontSize: "0.725rem", color: "var(--color-slate)" }}>
                      {isHi ? "आपके स्थायी पते पर ही निवास करते हैं" : "Uses same home address as you (Will creator)"}
                    </div>
                  </div>
                  <AppleSwitch checked={sameAddress} onChange={setSameAddress} />
                </div>

                {!sameAddress && (
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.775rem",
                        fontWeight: 700,
                        color: "var(--color-navy)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      Residential Address *
                    </label>
                    <input
                      type="text"
                      required={!sameAddress}
                      placeholder="House/Flat No., Street, City, State & PIN Code"
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(27, 42, 74, 0.12)",
                        fontSize: "0.85rem",
                        color: "var(--color-navy)",
                        outline: "none",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: "0.8rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(27, 42, 74, 0.15)",
                    backgroundColor: "#FFFFFF",
                    color: "var(--color-navy)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{
                    flex: 2,
                    padding: "0.8rem",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(198, 83, 120, 0.3)",
                  }}
                >
                  Confirm & Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // Helper renderer for each relative card node in tree
  function renderFamilyNode(member: FamilyMember) {
    const age = getAge(member.dob);
    const cfg = relConfig[member.relationship] || relConfig.other;
    const NodeIcon = cfg.Icon;

    return (
      <div
        key={member.id}
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "1rem 1.15rem",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          transition: "all 0.15s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              backgroundColor: `${cfg.color}15`,
              color: cfg.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <NodeIcon size={20} />
          </div>

          <div>
            <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
              {member.name}
            </h4>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  backgroundColor: "rgba(27, 42, 74, 0.05)",
                  color: "var(--color-navy)",
                  padding: "0.1rem 0.45rem",
                  borderRadius: "999px",
                }}
              >
                {member.relationship === "other" && member.customRelationship
                  ? member.customRelationship
                  : cfg.label}
              </span>

              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  backgroundColor: member.isMinor ? "rgba(225, 29, 72, 0.1)" : "rgba(124, 148, 115, 0.15)",
                  color: member.isMinor ? "#BE123C" : "var(--color-sage)",
                  padding: "0.1rem 0.45rem",
                  borderRadius: "999px",
                }}
              >
                {member.isMinor ? `Minor (${age !== null ? `${age}y` : "<18"})` : `Adult (${age !== null ? `${age}y` : "18+"})`}
              </span>

              {member.pan && (
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    backgroundColor: "rgba(198, 83, 120, 0.12)",
                    color: "var(--color-navy)",
                    padding: "0.1rem 0.45rem",
                    borderRadius: "999px",
                    letterSpacing: "0.03em",
                  }}
                >
                  PAN: {member.pan}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleDeleteMember(member.id)}
          aria-label="Remove member"
          style={{
            background: "none",
            border: "none",
            color: "rgba(27, 42, 74, 0.3)",
            cursor: "pointer",
            padding: "0.35rem",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#E11D48")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(27, 42, 74, 0.3)")}
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  }
}
