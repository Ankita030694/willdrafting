"use client";

import React, { useState, useEffect } from "react";import WizardButton from "./button";

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
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
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
  Pencil,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { sanitizeNameInput, sanitizePan, normalizeEmail, toTitleCaseText } from "@/lib/inputSanitizers";
import { useWillStore } from "@/lib/useWillStore";
import InfoTooltip from "@/components/wizard/InfoTooltip";

interface Step3FamilyProps {
  state?: WillDraftingState;
  onUpdate?: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

export default function Step3Family({
  state: propState,
  onUpdate: propOnUpdate,
  onNext,
  onBack,
  lang: propLang,
  onChangeLang: propOnChangeLang,
}: Step3FamilyProps) {
  const storeState = useWillStore((s) => s.state);
  const storeUpdateState = useWillStore((s) => s.updateState);
  const state = propState || storeState;
  const onUpdate = propOnUpdate || storeUpdateState;

  const context = useLanguage();
  const currentLang = propLang || context.lang || "en";
  const isHi = currentLang === "hi";
  const handleToggleLang = propOnChangeLang || context.setLang;

  const [family, setFamily] = useState<FamilyMember[]>(state.familyMembers || []);

  useEffect(() => {
    setFamily(state.familyMembers || []);
  }, [state.familyMembers]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [modalError, setModalError] = useState("");
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);

  // Form state for adding/editing a member
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState<FamilyMember["relationship"]>("spouse");
  const [exactDob, setExactDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [sameAddress, setSameAddress] = useState(true);
  const [customAddress, setCustomAddress] = useState("");
  const [customRelation, setCustomRelation] = useState("");
  const [modalGroup, setModalGroup] = useState<"parents" | "peers" | "children">("peers");

  // Open unified modal for adding any family relationship
  const handleOpenAdd = (defaultRel?: FamilyMember["relationship"]) => {
    const rel = defaultRel || "spouse";
    setEditingMemberId(null);
    setRelationship(rel);
    setName("");
    setCustomRelation("");
    setExactDob("");
    setPhone("");
    setEmail("");
    setPan("");
    setSameAddress(true);
    setCustomAddress("");
    setModalError("");
    setModalOpen(true);
  };

  // Open unified modal for editing an existing family member
  const handleOpenEdit = (member: FamilyMember) => {
    setEditingMemberId(member.id);
    setRelationship(member.relationship);
    setName(member.name || "");
    setCustomRelation(member.customRelationship || "");
    setExactDob(member.dob || "");
    setPhone(member.phone || "");
    setEmail(member.email || "");
    setPan(member.pan || "");
    const isDefaultAddr = !member.address || member.address === "Same as your address (Will creator)";
    setSameAddress(isDefaultAddr);
    setCustomAddress(isDefaultAddr ? "" : member.address || "");
    if (member.relationship === "father" || member.relationship === "mother" || (member.notes || "").includes("parents")) {
      setModalGroup("parents");
    } else if (member.relationship === "son" || member.relationship === "daughter" || (member.notes || "").includes("children")) {
      setModalGroup("children");
    } else {
      setModalGroup("peers");
    }
    setModalError("");
    setModalOpen(true);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedName = sanitizeNameInput(name).trim();
    if (!cleanedName) {
      setModalError(
        isHi
          ? "कृपया इस पारिवारिक सदस्य का पूरा कानूनी नाम दर्ज करें।"
          : "Please enter the family member's full legal name as per official ID."
      );
      return;
    }
    if (relationship === "other" && !sanitizeNameInput(customRelation).trim()) {
      setModalError(
        isHi
          ? "कृपया इस व्यक्ति के साथ अपना रिश्ता दर्ज करें।"
          : "Please specify your relationship with this person."
      );
      return;
    }
    if (!exactDob) {
      setModalError(
        isHi
          ? "कृपया जन्म तिथि दर्ज करें ताकि उम्र और कानूनी स्थिति जांची जा सके।"
          : "Please provide their date of birth to calculate age and legal minority status."
      );
      return;
    }
    if (phone.trim()) {
      const cleanPhone = phone.replace(/\D/g, "");
      if (cleanPhone.length !== 10) {
        setModalError(
          isHi
            ? "मोबाइल नंबर ठीक 10 अंकों का होना चाहिए।"
            : "Mobile number must contain exactly 10 digits."
        );
        return;
      }
    }
    if (pan.trim()) {
      const cleanPan = sanitizePan(pan);
      if (cleanPan.length !== 10) {
        setModalError(
          isHi
            ? "पैन नंबर 10 अक्षरों का होना चाहिए (उदा. ABCDE1234F)।"
            : "PAN must be a valid 10-character alphanumeric code (e.g., ABCDE1234F)."
        );
        return;
      }
    }

    const finalDob = exactDob;
    const isMinor = calculateIsMinor(finalDob);

    const memberPayload: FamilyMember = {
      id: editingMemberId || `fam-${Date.now()}`,
      name: cleanedName,
      relationship,
      customRelationship:
        relationship === "other" && sanitizeNameInput(customRelation).trim()
          ? sanitizeNameInput(customRelation).trim()
          : undefined,
      dob: finalDob,
      isMinor,
      pan: pan.trim() ? sanitizePan(pan) : undefined,
      phone: phone.trim() ? phone.replace(/\D/g, "").slice(0, 10) : undefined,
      email: email.trim() ? normalizeEmail(email) : undefined,
      address: sameAddress
        ? "Same as your address (Will creator)"
        : customAddress.trim() || undefined,
      notes: relationship === "other" ? modalGroup : undefined,
    };

    const updatedFamily = editingMemberId
      ? family.map((f) => (f.id === editingMemberId ? memberPayload : f))
      : [...family, memberPayload];

    setFamily(updatedFamily);
    setShowEmptyWarning(false);
    onUpdate((prev) => ({
      ...prev,
      familyMembers: updatedFamily,
      allocations: editingMemberId
        ? (prev.allocations || []).map((a) =>
            a.beneficiaryId === editingMemberId
              ? { ...a, beneficiaryName: cleanedName }
              : a
          )
        : prev.allocations,
      residuaryBeneficiaryName:
        editingMemberId && prev.residuaryBeneficiaryId === editingMemberId
          ? cleanedName
          : prev.residuaryBeneficiaryName,
      residuaryAlternateName:
        editingMemberId && prev.residuaryAlternateId === editingMemberId
          ? cleanedName
          : prev.residuaryAlternateName,
    }));

    setEditingMemberId(null);
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

  const handleProceed = () => {
    if (family.length === 0) {
      setShowEmptyWarning(true);
      return;
    }
    onUpdate((prev) => ({
      ...prev,
      familyMembers: family,
    }));
    onNext();
  };

  const getAge = (dobString: string) => {
    if (!dobString) return null;
    const diffMs = Date.now() - new Date(dobString).getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Age derived from the DOB being entered in the add-member modal
  const modalAge = exactDob ? getAge(exactDob) : null;
  const isMinorNow = modalAge !== null && modalAge < 18;

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

  // Smart "add more" tiles shown beneath existing records in each column
  const hasRel = (r: FamilyMember["relationship"]) => family.some((f) => f.relationship === r);

  const openAddFor = (
    group: "parents" | "peers" | "children",
    rel: FamilyMember["relationship"]
  ) => {
    setModalGroup(group);
    handleOpenAdd(rel);
  };

  const renderAddMoreTile = (label: string, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.4rem",
        width: "100%",
        padding: "0.75rem 1rem",
        borderRadius: "14px",
        border: "1.5px dashed rgba(198, 83, 120, 0.35)",
        backgroundColor: "rgba(198, 83, 120, 0.03)",
        color: "var(--color-gold)",
        fontSize: "0.8rem",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.15s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(198, 83, 120, 0.09)";
        e.currentTarget.style.borderColor = "var(--color-gold)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(198, 83, 120, 0.03)";
        e.currentTarget.style.borderColor = "rgba(198, 83, 120, 0.35)";
      }}
    >
      <Plus size={14} /> {label}
    </button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
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
        <div className="wizard-step-header-meta" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
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
              whiteSpace: "nowrap",
            }}
          >
            <Plus size={15} /> {isHi ? "परिवार का सदस्य जोड़ें" : "Add Family Member"}
          </button>
          <AudioAssistantButton
            textToSpeak={
              isHi
                ? "महत्वपूर्ण निर्देश: परिवार सूची में केवल उन्हीं व्यक्तियों को जोड़ें जिन्हें आप अपनी संपत्ति का मालिकाना हक देना चाहते हैं। नया सदस्य जोड़ने के लिए परिवार का सदस्य जोड़ें बटन पर टैप करें।"
                : "Directive: Only add people who are meant to have ownership of your assets. Tap the Add Family Member button to add each intended beneficiary."
            }
            label={isHi ? "सुनें" : "Listen"}
          />
          <LanguageToggle lang={currentLang} onChangeLang={handleToggleLang} size="sm" />
        </div>
      </div>

      {/* Asset Ownership Directive Callout Banner */}
      <div
        className="family-directive-banner"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.75rem 1rem",
          borderRadius: "14px",
          backgroundColor: "rgba(198, 83, 120, 0.08)",
          border: "1.5px solid rgba(198, 83, 120, 0.25)",
          color: "var(--color-navy)",
          fontSize: "0.85rem",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(198, 83, 120, 0.08)",
        }}
      >
        <ShieldAlert size={20} style={{ color: "var(--color-gold)", flexShrink: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                backgroundColor: "var(--color-gold)",
                padding: "0.15rem 0.45rem",
                borderRadius: "4px",
              }}
            >
              {isHi ? "महत्वपूर्ण निर्देश" : "Directive"}
            </span>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)" }}>
              {isHi
                ? "केवल उन्हीं व्यक्तियों को जोड़ें जिन्हें आप अपनी संपत्ति का मालिकाना हक देना चाहते हैं"
                : "Only add people who are meant to have ownership of your assets"}
            </span>
          </div>
          <span style={{ fontSize: "0.76rem", color: "var(--color-slate)", fontWeight: 500 }}>
            {isHi
              ? "पारिवारिक दायरे में केवल वे वारिसदार और लाभार्थी होने चाहिए जिन्हें वसीयत के जरिए आपकी संपत्ति या हिस्सा मिलना है।"
              : "Your family register should only include beneficiaries and heirs who will inherit or receive a share of your assets."}
          </span>
        </div>
      </div>

      {/* 3-Column Horizontal Generations Grid */}
      <div
        className="family-generations-grid"
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
          className="family-column-card"
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
              <>
                {parents.map((m) => renderFamilyNode(m))}
                {!hasRel("father")
                  ? renderAddMoreTile(isHi ? "पिता जोड़ें" : "Add Father", () => openAddFor("parents", "father"))
                  : !hasRel("mother")
                  ? renderAddMoreTile(isHi ? "माता जोड़ें" : "Add Mother", () => openAddFor("parents", "mother"))
                  : renderAddMoreTile(
                      isHi ? "दादा-दादी / अन्य जोड़ें" : "Add Grandparent / Other",
                      () => openAddFor("parents", "other")
                    )}
              </>
            )}
          </div>
        </div>

        {/* Column 2: Testator (You) + Spouse + Siblings */}
        <div
          className="family-column-card"
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
            {!hasRel("spouse")
              ? renderAddMoreTile(isHi ? "जीवनसाथी / भाई-बहन जोड़ें" : "Add Spouse / Siblings", () => openAddFor("peers", "spouse"))
              : renderAddMoreTile(
                  isHi ? "भाई / बहन / अन्य जोड़ें" : "Add Sibling / Other Relative",
                  () => openAddFor("peers", "brother")
                )}
          </div>
        </div>

        {/* Column 3: Children & Descendants */}
        <div
          className="family-column-card"
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
              <>
                {children.map((m) => renderFamilyNode(m))}
                {renderAddMoreTile(
                  isHi ? "एक और बेटा / बेटी जोड़ें" : "Add Another Son or Daughter",
                  () => openAddFor("children", "son")
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Empty Family Warning Banner */}
      {showEmptyWarning && (
        <div
          role="alert"
          style={{
            padding: "1rem 1.25rem",
            backgroundColor: "#FFFBEB",
            border: "1.5px solid #FCD34D",
            borderRadius: "16px",
            color: "#92400E",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <AlertCircle size={20} color="#D97706" style={{ flexShrink: 0, marginTop: "0.15rem" }} />
            <div>
              <strong style={{ fontSize: "0.925rem", display: "block", marginBottom: "0.25rem", color: "#78350F" }}>
                {isHi ? "कोई पारिवारिक सदस्य या लाभार्थी नहीं जोड़ा गया" : "No Beneficiaries Added Yet"}
              </strong>
              <span style={{ fontSize: "0.825rem", lineHeight: 1.5 }}>
                {isHi
                  ? "अपनी संपत्ति किसी को सौंपने के लिए आपको कम से कम एक व्यक्ति (जैसे जीवनसाथी, बच्चे, माता-पिता आदि) को जोड़ना होगा। क्या आप अभी किसी को जोड़ना चाहते हैं?"
                  : "You haven't added anyone yet. You'll need someone to leave your assets to in the next steps. Would you like to add someone now?"}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.65rem", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => {
                setShowEmptyWarning(false);
                handleOpenAdd("spouse");
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
              {isHi ? "+ सदस्य जोड़ें" : "+ Add Member"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowEmptyWarning(false);
                onUpdate((prev) => ({ ...prev, familyMembers: family }));
                onNext();
              }}
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "10px",
                fontSize: "0.8rem",
                fontWeight: 600,
                backgroundColor: "transparent",
                border: "1px solid #D97706",
                color: "#78350F",
                cursor: "pointer",
              }}
            >
              {isHi ? "बिना सदस्य के आगे बढ़ें" : "Proceed Anyway"}
            </button>
          </div>
        </div>
      )}

      {/* Wizard Button Footer */}
      <WizardButton onBack={onBack} onNext={handleProceed} />

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
            className="wizard-modal-sheet"
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

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div>
                <h3 style={{ margin: 0, color: "var(--color-navy)", fontSize: "1.35rem", fontWeight: 800 }}>
                  {editingMemberId
                    ? isHi
                      ? "परिवार के सदस्य को संपादित करें"
                      : "Edit Family Member"
                    : isHi
                    ? "परिवार का सदस्य जोड़ें"
                    : "Add Family Member"}
                </h3>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.825rem", color: "var(--color-slate)" }}>
                  {isHi ? "आपकी वसीयत में प्राकृतिक उत्तराधिकारी के रूप में पंजीकृत।" : "Registered as a recognized natural heir in your testament."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingMemberId(null);
                  setModalOpen(false);
                }}
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

            <form onSubmit={handleAddMember} style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
              {/* Directive Reminder in Modal */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.55rem 0.85rem",
                  borderRadius: "10px",
                  backgroundColor: "rgba(198, 83, 120, 0.08)",
                  border: "1px solid rgba(198, 83, 120, 0.2)",
                  fontSize: "0.78rem",
                  color: "var(--color-navy)",
                  fontWeight: 600,
                }}
              >
                <Info size={15} style={{ color: "var(--color-gold)", flexShrink: 0 }} />
                <span>
                  {isHi
                    ? "निर्देश: केवल उन्हीं व्यक्तियों को जोड़ें जिन्हें आप अपनी संपत्ति का मालिकाना हक देना चाहते हैं।"
                    : "Directive: Only add people who are meant to have ownership of your assets."}
                </span>
              </div>

              {/* Actionable Human Error Notice in Modal */}
              {modalError && (
                <div
                  role="alert"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.65rem 0.95rem",
                    borderRadius: "12px",
                    backgroundColor: "rgba(225, 29, 72, 0.08)",
                    border: "1.5px solid #FDA4AF",
                    color: "#BE123C",
                    fontSize: "0.825rem",
                    fontWeight: 600,
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Who is this person? / Relationship Dropdown */}
              <div>
                <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.45rem" }}>
                  <span>{isHi ? "यह व्यक्ति कौन है? (संबंध चुनें) *" : "Who is this person? (Select Relationship) *"}</span>
                  <InfoTooltip
                    text="Select how this beneficiary is related to you. Identifying close Class I legal heirs (Spouse, Children, Mother) vs. extended family or friends helps prevent ambiguity and future legal challenges."
                    hindiText="चुनें कि यह लाभार्थी आपसे कैसे संबंधित है। प्रथम श्रेणी (Class I) के कानूनी उत्तराधिकारियों (जीवनसाथी, बच्चे, माता) और अन्य रिश्तेदारों या मित्रों की स्पष्ट पहचान भविष्य के कानूनी विवादों को रोकती है।"
                  />
                </label>
                <div style={{ position: "relative", width: "100%" }}>
                  <select
                    value={relationship}
                    onChange={(e) => {
                      const rel = e.target.value as FamilyMember["relationship"];
                      setRelationship(rel);
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
                    <option value="son">{isHi ? "बेटा" : "Son"}</option>
                    <option value="daughter">{isHi ? "बेटी" : "Daughter"}</option>
                    <option value="father">{isHi ? "पिता" : "Father"}</option>
                    <option value="mother">{isHi ? "माता" : "Mother"}</option>
                    <option value="brother">{isHi ? "भाई" : "Brother"}</option>
                    <option value="sister">{isHi ? "बहन" : "Sister"}</option>
                    <option value="other">{isHi ? "अन्य रिश्तेदार या आश्रित" : "Other Relative or Dependent"}</option>
                  </select>
                  <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: "0.8rem" }}>
                    ▼
                  </div>
                </div>
              </div>

              {/* Full Legal Name */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    <span>{isHi ? "पूर्ण कानूनी नाम *" : "Full Legal Name *"}</span>
                    <InfoTooltip
                      text="Enter this person's full legal name exactly as printed on their Aadhaar card, PAN card, or birth certificate. Banks and registrars require an exact name match before transferring assets."
                      hindiText="इस व्यक्ति का पूरा कानूनी नाम ठीक वैसे ही दर्ज करें जैसा उनके आधार कार्ड, पैन कार्ड या जन्म प्रमाण पत्र पर लिखा है। संपत्ति हस्तांतरण के समय बैंकों और रजिस्ट्रार को सटीक नाम मिलान की आवश्यकता होती है।"
                    />
                  </label>
                  {/* Quick Salutation Chips */}
                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    {(relationship === "son" || (relationship === "daughter" && isMinorNow)
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
                  onChange={(e) => setName(sanitizeNameInput(e.target.value))}
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
                      display: "inline-flex",
                      alignItems: "center",
                      fontSize: "0.825rem",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    <span>{isHi ? "विशिष्ट रिश्ता दर्ज करें *" : "Relationship with this Person *"}</span>
                    <InfoTooltip
                      text="Specify your exact relationship with this beneficiary (e.g., 'Grandson', 'Nephew', 'Daughter-in-law', 'Family Friend', or 'Domestic Helper')."
                      hindiText="इस लाभार्थी के साथ अपना सटीक संबंध स्पष्ट करें (जैसे, 'पोता', 'भतीजा', 'बहू', 'पारिवारिक मित्र' या 'सहयोगी')।"
                    />
                  </label>
                  <input
                    type="text"
                    required={relationship === "other"}
                    placeholder={isHi ? "उदा. दादा-दादी, पोता-पोती, चाचा, भतीजा" : "e.g., Grandparent, Grandchild, Maternal Uncle, Niece, Family Friend"}
                    value={customRelation}
                    onChange={(e) => setCustomRelation(sanitizeNameInput(e.target.value))}
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

              {/* Date of Birth (required) with Legal Capacity Indicator */}
              <div
                style={{
                  backgroundColor: "rgba(27, 42, 74, 0.02)",
                  borderRadius: "16px",
                  padding: "1.25rem",
                  border: "1px solid rgba(27, 42, 74, 0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem", gap: "0.5rem", flexWrap: "wrap" }}>
                  <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    <span>{isHi ? "जन्म तिथि *" : "Date of Birth *"}</span>
                    <InfoTooltip
                      text="Select the beneficiary's date of birth. If they are under 18 years old today, the system automatically flags them as a Minor and unlocks Step 7 (Testamentary Guardian & Minor Property Trust clauses)."
                      hindiText="लाभार्थी की जन्म तिथि चुनें। यदि उनकी आयु 18 वर्ष से कम है, तो सिस्टम स्वतः उन्हें नाबालिग के रूप में चिह्नित करेगा और चरण 7 (कानूनी अभिभावक और माइनर प्रॉपर्टी ट्रस्ट प्रावधान) को सक्रिय कर देगा।"
                    />
                  </label>
                  {modalAge !== null && (
                    modalAge < 18 ? (
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
                        <AlertTriangle size={12} /> {isHi ? "नाबालिग (कानूनी अभिभावक आवश्यक)" : "Minor (Guardian Legally Required)"}
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
                        <CheckCircle2 size={12} /> {isHi ? "वयस्क वारिसदार (18+ वर्ष)" : "Adult Beneficiary (18+)"}
                      </span>
                    )
                  )}
                </div>
                <input
                  type="date"
                  required
                  value={exactDob}
                  min="1900-01-01"
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setExactDob(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(27, 42, 74, 0.15)",
                    fontSize: "0.95rem",
                    color: "var(--color-navy)",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                {modalAge !== null && (
                  <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-slate)" }}>
                    {isHi ? `आयु: ${modalAge} वर्ष` : `Age: ${modalAge} years`}
                  </div>
                )}
              </div>

              {/* Optional Contact Fields (Phone & Address) */}
              <div className="wizard-modal-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.775rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    <span>{isHi ? "मोबाइल नंबर (ऐच्छिक)" : "Phone Number (Optional)"}</span>
                    <InfoTooltip
                      text="Enter their 10-digit mobile number (or parent's number if a minor) so your Executor can promptly reach them during estate distribution."
                      hindiText="उनका 10-अंकों का मोबाइल नंबर दर्ज करें (या नाबालिग होने पर माता-पिता का नंबर) ताकि वसीयत निष्पादन के समय आपका निष्पादक (Executor) उनसे आसानी से संपर्क कर सके।"
                    />
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    placeholder="Enter 10-digit number"
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
                  <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.775rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    <span>{isHi ? "ईमेल (ऐच्छिक)" : "Email (Optional)"}</span>
                    <InfoTooltip
                      text="Enter their email address so the Executor can send official notices and documents when administering the Will."
                      hindiText="उनका ईमेल पता दर्ज करें ताकि वसीयत के प्रशासन के दौरान निष्पादक उन्हें आधिकारिक सूचनाएं और दस्तावेज भेज सके।"
                    />
                  </label>
                  <input
                    type="email"
                    placeholder="relative@email.com"
                    value={email}
                    onChange={(e) => setEmail(normalizeEmail(e.target.value))}
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
                <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.775rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                  <span>{isHi ? "स्थायी खाता संख्या (पैन) (पहचान के लिए अनुशंसित)" : "Permanent Account Number (PAN) (Recommended for identification)"}</span>
                  <InfoTooltip
                    text="Enter the beneficiary's 10-character PAN (if available). Mentioning a beneficiary's PAN in the Will eliminates identity disputes when transferring Demat shares, mutual funds, or bank deposits."
                    hindiText="यदि उपलब्ध हो तो लाभार्थी का 10-अक्षरों का पैन नंबर दर्ज करें। वसीयत में लाभार्थी का पैन उल्लेख करने से डीमैट शेयर, म्यूचुअल फंड या बैंक जमा हस्तांतरित करते समय पहचान संबंधी कोई विवाद नहीं होता।"
                  />
                </label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  value={pan}
                  onChange={(e) => setPan(sanitizePan(e.target.value))}
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
                    <div style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      <span>{isHi ? "आपके पते पर ही निवास करते हैं" : "Resides at your address"}</span>
                      <InfoTooltip
                        text="Keep this switched ON if this family member lives at the same permanent residential address as you. Switch it OFF to enter a separate address for them."
                        hindiText="यदि यह पारिवारिक सदस्य आपके स्थायी आवासीय पते पर ही रहता है, तो इसे चालू (ON) रखें। यदि उनका पता अलग है, तो इसे बंद (OFF) करके उनका पता दर्ज करें।"
                      />
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
                        display: "inline-flex",
                        alignItems: "center",
                        fontSize: "0.775rem",
                        fontWeight: 700,
                        color: "var(--color-navy)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <span>{isHi ? "आवासीय पता *" : "Residential Address *"}</span>
                      <InfoTooltip
                        text="Enter the complete current residential address of this beneficiary (including City, State, and PIN Code) for accurate legal identification."
                        hindiText="सटीक कानूनी पहचान के लिए इस लाभार्थी का पूरा वर्तमान आवासीय पता (शहर, राज्य और पिन कोड सहित) दर्ज करें।"
                      />
                    </label>
                    <input
                      type="text"
                      required={!sameAddress}
                      placeholder="House/Flat No., Street, City, State & PIN Code"
                      value={customAddress}
                      onChange={(e) => setCustomAddress(toTitleCaseText(e.target.value))}
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
              <div className="wizard-modal-actions" style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditingMemberId(null);
                    setModalOpen(false);
                  }}
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
                  {isHi ? "रद्द करें" : "Cancel"}
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
                  {editingMemberId
                    ? isHi
                      ? "परिवर्तन सहेजें"
                      : "Save Changes"
                    : isHi
                    ? "सदस्य की पुष्टि करें और सहेजें"
                    : "Confirm & Save Member"}
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
        className="family-member-node"
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
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0, flex: 1, cursor: "pointer" }}
          onClick={() => handleOpenEdit(member)}
          title={isHi ? "संपादित करने के लिए क्लिक करें" : "Click to edit member details"}
        >
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

          <div style={{ minWidth: 0 }}>
            <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
              {member.name}
            </h4>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.2rem" }}>
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

        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => handleOpenEdit(member)}
            aria-label="Edit member"
            title={isHi ? "सदस्य संपादित करें" : "Edit member"}
            style={{
              background: "rgba(27, 42, 74, 0.05)",
              border: "1px solid rgba(27, 42, 74, 0.1)",
              color: "var(--color-navy)",
              cursor: "pointer",
              padding: "0.35rem 0.55rem",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              transition: "all 0.15s ease",
            }}
          >
            <Pencil size={13} />
            <span>{isHi ? "संपादित" : "Edit"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleDeleteMember(member.id)}
            aria-label="Remove member"
            title={isHi ? "सदस्य हटाएं" : "Remove member"}
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
      </div>
    );
  }
}
