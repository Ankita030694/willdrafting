"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Scale,
  Lock,
  PhoneCall,
  Sparkles,
  RefreshCw,
  Landmark,
  Check,
  X,
  FileCheck,
  Gavel,
  Calculator,
  Copy,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  Layers,
  AlertCircle,
  Eye,
  Activity,
  HeartHandshake,
  Video,
  Award,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Statutory Rules: Will Contest Law" },
  { id: "interactive-calculator", label: "2. Interactive Challenge Risk Calculator" },
  { id: "suspicious-circumstances-doctrine", label: "3. Kavita Kanwar & Suspicious Circumstances" },
  { id: "grounds-for-challenging-will", label: "4. Top 6 Grounds for Challenging a Will" },
  { id: "registered-vs-unregistered-wills", label: "5. Unregistered vs Registered Wills in Court" },
  { id: "section-67-witness-pitfalls", label: "6. Attestation Pitfalls: Section 67 Void Bequests" },
  { id: "video-medical-fitness-protocol", label: "7. Video Recording & Doctor Certificate Protocol" },
  { id: "comparison-table-grounds", label: "8. Grounds of Challenge vs Standard of Proof" },
  { id: "step-by-step-fortification-sop", label: "9. 5-Point Will Fortification Protocol" },
  { id: "practical-court-case-studies", label: "10. Supreme Court & High Court Case Studies" },
  { id: "copy-paste-legal-templates", label: "11. Disinheritance Recitals & Fortification Checklist" },
  { id: "institutional-advocate-profile", label: "12. Legal Backing & Advocate Profile" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations-portals", label: "14. Statutory Citations & Official Portals" },
];

const FAQS = [
  {
    q: "Can my Will be challenged in court in India?",
    a: "Yes. Any legal heir or interested person who would inherit under intestate succession can challenge a Will by filing a caveat or lawsuit in civil court. Common grounds include lack of sound mind under Section 59, undue influence or coercion under Section 61, suspicious circumstances under Kavita Kanwar (2020 SC), or failure to comply with two-witness attestation under Section 63.",
  },
  {
    q: "Can I legally disinherit my married daughter or son in my Will?",
    a: "Yes. In India, a person has complete testamentary freedom over self-acquired property and can exclude any child or legal heir. However, under the Supreme Court ruling in Shivakumar v. Sharanabasappa (2020), total exclusion of natural heirs is treated as a suspicious circumstance unless the Will explicitly recites the factual, rational reasons for their exclusion.",
  },
  {
    q: "Does registering a Will make it 100% unchallengeable?",
    a: "No. While registration under Book 3 of the Registration Act, 1908 creates a strong statutory presumption of regular execution and authentic signature, it does not bar a challenge. As held by the Supreme Court in Murthy v. C. Saradambal (2022), if the testator lacked cognitive testamentary capacity or was under undue influence, even a registered Will can be declared null and void.",
  },
  {
    q: "What happens if a beneficiary was present when the Will was drafted and signed?",
    a: "Under the landmark Supreme Court decision in Kavita Kanwar v. Pamela Mehta (2020), active participation by a major beneficiary (such as hiring the lawyer, dictating terms, arranging witnesses, or staying in the room during execution) casts a heavy cloud of judicial suspicion. The court will deny probate unless the beneficiary proves beyond doubt that the testator acted with independent free will.",
  },
  {
    q: "Can a beneficiary also sign as an attesting witness to the Will?",
    a: "Never. Under Section 67 of the Indian Succession Act, 1925, if a person to whom any bequest or legacy is given signs as an attesting witness, the Will remains valid but the bequest to that person (or their spouse) becomes completely void. Always use two independent witnesses who have zero financial interest in the estate.",
  },
  {
    q: "Why is a doctor's certificate essential for testators above age 70?",
    a: "Under Section 59 of the Indian Succession Act, a testator must possess a sound disposing state of mind. When a Will is executed by a senior citizen, disinherited relatives frequently allege dementia, memory loss, or delirium. A contemporaneous certificate from a registered MBBS or MD doctor issued on the day of signing provides vital court proof to defeat such allegations.",
  },
  {
    q: "How can I make my Will unchallengeable in court in India?",
    a: "Follow the 5-point fortification protocol: (1) Obtain a same-day doctor certificate of mental capacity, (2) Keep all beneficiaries outside the room during drafting and execution, (3) Include clear recital clauses explaining unequal shares or disinheritance, (4) Register the Will before the Sub-Registrar Office, and (5) Record a continuous video of the testator answering testamentary capacity questions.",
  },
];

export default function WillContestRiskCalculatorClient() {
  const { status } = useSession();
  const router = useRouter();

  const handleStartDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (status === "authenticated") {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const [activeId, setActiveId] = useState<string>("statutory-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedMedicalClause, setCopiedMedicalClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Calculator Form State
  const [testatorAge, setTestatorAge] = useState<"under_60" | "60_to_70" | "71_to_80" | "above_80">("71_to_80");
  const [distributionPattern, setDistributionPattern] = useState<
    "equal" | "unequal_justified" | "unequal_unjustified" | "disinherit_child" | "sole_outsider"
  >("unequal_unjustified");
  const [beneficiaryRole, setBeneficiaryRole] = useState<"zero" | "in_room" | "arranged_lawyer" | "secret_custody">(
    "in_room"
  );
  const [medicalCapacity, setMedicalCapacity] = useState<
    "doctor_certified" | "general_fit" | "no_cert_healthy" | "ill_no_cert"
  >("no_cert_healthy");
  const [registrationStatus, setRegistrationStatus] = useState<
    "sro_registered" | "notarized" | "unregistered_typed" | "handwritten_deathbed"
  >("notarized");
  const [witnessIntegrity, setWitnessIntegrity] = useState<
    "independent_professionals" | "family_friends" | "beneficiary_relative" | "beneficiary_himself" | "untraceable_strangers"
  >("family_friends");
  const [videoRecording, setVideoRecording] = useState<"full_video_bsa" | "basic_mobile" | "no_video">("no_video");
  const [propertyNature, setPropertyNature] = useState<"self_acquired" | "ancestral_coparcenary" | "disputed_title">(
    "self_acquired"
  );

  // Remediation Toggles (What-If Simulator)
  const [simulateDoctorCert, setSimulateDoctorCert] = useState<boolean>(false);
  const [simulateSRO, setSimulateSRO] = useState<boolean>(false);
  const [simulateJustification, setSimulateJustification] = useState<boolean>(false);
  const [simulateVideo, setSimulateVideo] = useState<boolean>(false);

  // 1. Scoring Logic
  let ageRisk = 0;
  if (testatorAge === "under_60") ageRisk = 0;
  else if (testatorAge === "60_to_70") ageRisk = 5;
  else if (testatorAge === "71_to_80") ageRisk = 12;
  else if (testatorAge === "above_80") ageRisk = 20;

  let distributionRisk = 0;
  let effectiveDistPattern = distributionPattern;
  if (simulateJustification && (distributionPattern === "unequal_unjustified" || distributionPattern === "disinherit_child")) {
    effectiveDistPattern = "unequal_justified";
  }

  if (effectiveDistPattern === "equal") distributionRisk = 0;
  else if (effectiveDistPattern === "unequal_justified") distributionRisk = 8;
  else if (effectiveDistPattern === "unequal_unjustified") distributionRisk = 22;
  else if (effectiveDistPattern === "disinherit_child") distributionRisk = 28;
  else if (effectiveDistPattern === "sole_outsider") distributionRisk = 30;

  let beneficiaryRisk = 0;
  if (beneficiaryRole === "zero") beneficiaryRisk = 0;
  else if (beneficiaryRole === "in_room") beneficiaryRisk = 14;
  else if (beneficiaryRole === "arranged_lawyer") beneficiaryRisk = 24;
  else if (beneficiaryRole === "secret_custody") beneficiaryRisk = 20;

  let effectiveMedical = medicalCapacity;
  if (simulateDoctorCert && (medicalCapacity === "no_cert_healthy" || medicalCapacity === "ill_no_cert")) {
    effectiveMedical = "doctor_certified";
  }

  let capacityRisk = 0;
  if (effectiveMedical === "doctor_certified") capacityRisk = 0;
  else if (effectiveMedical === "general_fit") capacityRisk = 4;
  else if (effectiveMedical === "no_cert_healthy") capacityRisk = 12;
  else if (effectiveMedical === "ill_no_cert") capacityRisk = 26;

  let effectiveReg = registrationStatus;
  if (simulateSRO && (registrationStatus === "notarized" || registrationStatus === "unregistered_typed" || registrationStatus === "handwritten_deathbed")) {
    effectiveReg = "sro_registered";
  }

  let regRisk = 0;
  if (effectiveReg === "sro_registered") regRisk = 0;
  else if (effectiveReg === "notarized") regRisk = 10;
  else if (effectiveReg === "unregistered_typed") regRisk = 16;
  else if (effectiveReg === "handwritten_deathbed") regRisk = 24;

  let witnessRisk = 0;
  let isSec67Void = false;
  if (witnessIntegrity === "independent_professionals") witnessRisk = 0;
  else if (witnessIntegrity === "family_friends") witnessRisk = 5;
  else if (witnessIntegrity === "beneficiary_relative") witnessRisk = 14;
  else if (witnessIntegrity === "beneficiary_himself") {
    witnessRisk = 35;
    isSec67Void = true;
  } else if (witnessIntegrity === "untraceable_strangers") witnessRisk = 22;

  let effectiveVideo = videoRecording;
  if (simulateVideo && videoRecording === "no_video") {
    effectiveVideo = "full_video_bsa";
  }

  let videoRisk = 0;
  if (effectiveVideo === "full_video_bsa") videoRisk = 0;
  else if (effectiveVideo === "basic_mobile") videoRisk = 3;
  else if (effectiveVideo === "no_video") videoRisk = 8;

  let propertyRisk = 0;
  if (propertyNature === "self_acquired") propertyRisk = 0;
  else if (propertyNature === "ancestral_coparcenary") propertyRisk = 14;
  else if (propertyNature === "disputed_title") propertyRisk = 22;

  // Raw sum calculation
  const rawTotal = ageRisk + distributionRisk + beneficiaryRisk + capacityRisk + regRisk + witnessRisk + videoRisk + propertyRisk;
  // Normalized score capped between 0 and 100
  const litigationScore = Math.min(100, Math.max(5, Math.round((rawTotal / 140) * 100)));

  // Risk Classification
  let riskTier: "LOW" | "MODERATE" | "HIGH" | "CRITICAL" = "LOW";
  let riskColor = "emerald";
  let riskLabel = "Low Dispute Risk";
  let courtForecast = "High probability of probate grant. Strong statutory defense under Section 63.";

  if (litigationScore <= 25 && !isSec67Void) {
    riskTier = "LOW";
    riskColor = "emerald";
    riskLabel = "Low Dispute Risk";
    courtForecast = "Court scrutiny will be standard. Strong statutory defense under Section 63 with minimal caveat risk.";
  } else if (litigationScore <= 50 && !isSec67Void) {
    riskTier = "MODERATE";
    riskColor = "amber";
    riskLabel = "Moderate Contest Vulnerability";
    courtForecast = "Disgruntled legal heirs can delay probate by filing caveats. Fortification steps recommended.";
  } else if (litigationScore <= 75 && !isSec67Void) {
    riskTier = "HIGH";
    riskColor = "rose";
    riskLabel = "High Judicial Scrutiny Alert";
    courtForecast = "High probability of trial contest under Kavita Kanwar & Shivakumar doctrines. Heavy burden of proof on propounder.";
  } else {
    riskTier = "CRITICAL";
    riskColor = "red";
    riskLabel = isSec67Void ? "Critical Risk: Section 67 Void Bequest" : "Critical Contest Hazard: Probate Denial Probable";
    courtForecast = isSec67Void
      ? "Under Section 67 of the Indian Succession Act, bequests to attesting witness beneficiaries are completely VOID by operation of law!"
      : "Severe suspicious circumstances surround the Will. Indian High Courts routinely set aside such Wills unless dispelled with ironclad proof.";
  }

  // Active Red Flags List
  const triggeredFlags: string[] = [];
  if (isSec67Void) {
    triggeredFlags.push("CRITICAL STATUTORY VIOLATION: Beneficiary signed as witness (Bequest void under ISA Section 67).");
  }
  if (beneficiaryRole === "arranged_lawyer" || beneficiaryRole === "in_room") {
    triggeredFlags.push("Kavita Kanwar Suspicious Circumstance: Beneficiary took active role or was present during execution.");
  }
  if (effectiveDistPattern === "unequal_unjustified" || effectiveDistPattern === "disinherit_child") {
    triggeredFlags.push("Shivakumar Red Flag: Natural Class I heirs disinherited or unequally treated without explicit recital reasons.");
  }
  if (testatorAge === "above_80" || effectiveMedical === "ill_no_cert") {
    triggeredFlags.push("Section 59 Testamentary Capacity Hazard: Advanced age or illness without contemporaneous doctor certificate.");
  }
  if (effectiveReg === "unregistered_typed" || effectiveReg === "handwritten_deathbed") {
    triggeredFlags.push("Unregistered Status: Absence of SRO biometric verification increases forgery & coercion allegations.");
  }
  if (witnessIntegrity === "untraceable_strangers") {
    triggeredFlags.push("BSA Section 67 Attestation Hazard: Inability to produce at least one attesting witness will collapse probate.");
  }
  if (propertyNature === "ancestral_coparcenary") {
    triggeredFlags.push("HSA Section 30 Coparcenary Limit: Testator can only bequeath their undivided notional share, not the entire ancestral property.");
  }

  const handleResetCalculator = () => {
    setTestatorAge("under_60");
    setDistributionPattern("equal");
    setBeneficiaryRole("zero");
    setMedicalCapacity("doctor_certified");
    setRegistrationStatus("sro_registered");
    setWitnessIntegrity("independent_professionals");
    setVideoRecording("full_video_bsa");
    setPropertyNature("self_acquired");
    setSimulateDoctorCert(false);
    setSimulateSRO(false);
    setSimulateJustification(false);
    setSimulateVideo(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const copyClauseToClipboard = () => {
    const text = `STATUTORY RECITAL CLAUSE FOR DISINHERITANCE OR UNEQUAL DISTRIBUTION (SHIVAKUMAR V. SHARANABASAPPA COMPLIANCE):
"WHEREAS I am blessed with two sons, namely [Name of Son 1] and [Name of Son 2], and one daughter, namely [Name of Daughter].

AND WHEREAS I have consciously made unequal testamentary dispositions in this my Last Will and Testament, specifically bequeathing the entirety of my residential property situated at [Address] exclusively in favour of my younger son, [Name of Son 2].

AND WHEREAS I hereby declare that this disposition is made after mature reflection, with full knowledge and sound disposing state of mind, for the following rational and genuine reasons:
1. I have during my lifetime already provided substantial financial assistance and capital to my elder son [Name of Son 1] towards the purchase of his independent commercial premises vide Registered Deed No. [Deed No.] dated [Date], which is equal to his fair patrimonial share.
2. My younger son [Name of Son 2] and his family have continuously resided with me, provided personal medical care, nursing, companionship, and looked after my day-to-day welfare throughout my advanced age and chronic ailments.
3. My daughter [Name of Daughter] is happily settled in her matrimonial home, and I have gifted her movable jewellery and cash securities during her wedding and subsequent occasions to her complete satisfaction.

I expressly state that my exclusion of [Name of Son 1] from my residential property is not due to any anger, delusion, undue influence, or coercion, but represents my conscious, voluntary, and considered testamentary decision."`;
    navigator.clipboard.writeText(text);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyMedicalClauseToClipboard = () => {
    const text = `DOCTOR TESTAMENTARY CAPACITY CERTIFICATION CLAUSE (SECTION 59 COMPLIANCE):
"I, Dr. [Full Name of Doctor], MBBS/MD, Registered Medical Practitioner bearing MCI / State Medical Council Registration No. [Registration No.], practicing at [Clinic/Hospital Address], do hereby certify that:

1. I have this day, [Date of Will Execution], personally examined Mr./Mrs. [Testator Full Name], aged [Age] years, residing at [Testator Address], whom I have known as a patient for [Number] years / who was presented to me for cognitive evaluation.
2. I conducted a comprehensive clinical examination including Mini-Mental State Examination (MMSE) and testamentary assessment questions regarding his/her identity, family relationships, nature and extent of assets, and comprehension of testamentary succession.
3. I find that the testator is completely alert, oriented in time, place, and person, possesses sound memory, understanding, and cognitive faculties, and is fully capable of exercising independent judgment and making a valid Last Will and Testament.
4. He/she is in a sound and disposing state of mind within the statutory meaning of Section 59 of the Indian Succession Act, 1925."

Dated this [Day] day of [Month], [Year] at [City].
Signature of Medical Practitioner: _______________________
Official Seal & Registration Stamp: [Seal]`;
    navigator.clipboard.writeText(text);
    setCopiedMedicalClause(true);
    setTimeout(() => setCopiedMedicalClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `5-POINT COURT-PROOF WILL FORTIFICATION CHECKLIST (INDIAN SUCCESSION ACT):
1. Medical Certificate on Date of Execution: Obtain a signed certificate from a registered MBBS or MD doctor verifying sound disposing mind under Section 59. Have the doctor sign as one of the two attesting witnesses if possible.
2. Complete Exclusion of Beneficiaries: Ensure all beneficiaries and their spouses remain completely absent from drafting consultations, scribe rooms, and the signing venue to defeat Kavita Kanwar suspicious circumstances allegations.
3. Clear Recital of Disinheritance Reasons: Explicitly write factual, verifiable reasons why any Class I legal heir is excluded or receives a reduced share, complying with the Supreme Court benchmark in Shivakumar v. Sharanabasappa.
4. Sub-Registrar Office Book 3 Registration: Present the Will for voluntary registration under Book 3 at the local SRO with biometric fingerprinting and photographs to activate statutory presumption of genuine execution under Sections 58 and 60 of the Registration Act.
5. Continuous Video Recording with Q&A: Record unedited video of the testator answering questions about date, family, property, and voluntary execution, preserving digital hash and certificate under Section 63 of Bharatiya Sakshya Adhiniyam, 2023.`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 59, 61, 63 &amp; 67</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Can My Will Be Challenged in Court? Dispute Risk Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Assess whether your Will can withstand civil court challenge and probate caveats in India.
            Quantify litigation risks based on <strong>testator age, legal heir exclusion, beneficiary role,
            and doctor certification</strong> under landmark Supreme Court rulings.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Will Contest Risk</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Challenge-Proof Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Kavita Kanwar</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                2020 SC SUSPICION RULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 67</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                VOID BENEFICIARY WITNESS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Shivakumar 2020</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                EXCLUSION RECITAL MANDATE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 59</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SOUND TESTAMENTARY CAPACITY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Tool)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>TABLE OF CONTENTS</span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 px-2.5 rounded-lg transition-colors leading-snug ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Statutory Compliance Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 59, 61, 63, 67, 276 &amp; 278 of the Indian Succession Act,
                1925, read with Sections 18, 58 &amp; 60 of the Registration Act, 1908, and landmark
                Supreme Court precedents <em>Kavita Kanwar (2020)</em> and <em>Shivakumar (2020)</em>.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: WILL CONTEST PRINCIPLES IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Burden of Proof on Propounder:</strong> Under Section 68 of the Indian Evidence
                    Act (now Section 67 of BSA 2023), the person presenting the Will for probate must prove
                    valid execution by examining at least one attesting witness in court.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Doctrine of Suspicious Circumstances:</strong> As established in <em>Venkatachala
                    Iyengar (1959 SC)</em> and reaffirmed in <em>Shivakumar (2020 SC)</em>, any unnatural
                    disposition, beneficiary involvement, or physical infirmity casts a cloud of suspicion
                    that the propounder must dispel.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Beneficiary Participation Taint:</strong> The Supreme Court in <em>Kavita Kanwar
                    (2020)</em> held that when a major beneficiary plays an active role in drafting or
                    procuring the Will, probate will be refused unless clear explanation is recorded.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 67 Disqualification:</strong> If a beneficiary or their spouse signs
                    the Will as an attesting witness, the bequest to that person is entirely void under
                    Section 67 of the Indian Succession Act, 1925.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Rules: Will Contest Law in India
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In India, making a Last Will and Testament is a fundamental legal right. Under the Indian
                  Succession Act, 1925, any adult of sound mind can bequeath self-acquired property to any
                  person, trust, or charity. However, testators often ask: <em>can my Will be challenged in
                  court by disgruntled children, relatives, or excluded legal heirs?</em>
                </p>
                <p>
                  The answer is yes. Any legal heir who would have inherited property under intestate
                  succession (such as the Hindu Succession Act, 1956 or Indian Succession Act) has the
                  statutory standing to lodge a caveat or file a civil challenge against the Will.
                </p>
                <p>
                  Indian testamentary jurisprudence rests on three critical statutory pillars:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                  <li>
                    <strong>Section 59 (Sound Mind &amp; Capacity):</strong> The testator must understand
                    the nature of their act, the extent of their assets, and the claims of natural heirs.
                    A person suffering from severe dementia, delirium, or intoxication lacks testamentary
                    capacity.
                  </li>
                  <li>
                    <strong>Section 61 (Fraud, Coercion &amp; Importunity):</strong> A Will obtained by
                    undue influence, physical restraint, deception, or overpowering moral pressure is null
                    and void.
                  </li>
                  <li>
                    <strong>Section 63 (Mandatory Attestation Formalities):</strong> The Will must be signed
                    or marked by the testator and attested by <strong>two or more witnesses</strong>, each
                    of whom saw the testator sign or received a personal acknowledgment of signature.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE RISK AUDIT TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Will Contest &amp; Challenge Risk Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your parameters below to evaluate how an Indian civil court or probate bench would
                view your Will under the landmark <em>Kavita Kanwar</em> and <em>Shivakumar</em> precedents.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* 1. Testator Age */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>1. Testator Age at Execution of Will</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-semibold">Section 59 Scrutiny</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "under_60", label: "Under 60 Yrs", note: "Standard capacity" },
                      { id: "60_to_70", label: "60 to 70 Yrs", note: "Mild inquiry" },
                      { id: "71_to_80", label: "71 to 80 Yrs", note: "Heightened scrutiny" },
                      { id: "above_80", label: "Above 80 Yrs", note: "Doctor cert vital" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTestatorAge(item.id as typeof testatorAge)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          testatorAge === item.id
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-xs font-bold">{item.label}</div>
                        <div className={`text-[10px] mt-0.5 ${testatorAge === item.id ? "text-slate-300" : "text-slate-500"}`}>
                          {item.note}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Distribution Pattern & Natural Heirs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>2. Estate Distribution Among Class I Legal Heirs</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-semibold">Shivakumar Benchmark</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {[
                      {
                        id: "equal",
                        title: "Equal Distribution",
                        desc: "All children & spouse receive equitable shares",
                      },
                      {
                        id: "unequal_justified",
                        title: "Unequal With Recital Reasons",
                        desc: "Explicitly explains why one child gets more or less",
                      },
                      {
                        id: "unequal_unjustified",
                        title: "Unequal Without Reasons",
                        desc: "Vast disparity with zero explanation in text",
                      },
                      {
                        id: "disinherit_child",
                        title: "Total Child Disinheritance",
                        desc: "Excludes son or daughter completely with no reasons",
                      },
                      {
                        id: "sole_outsider",
                        title: "Bequest to Outsider",
                        desc: "Leaves entire estate to caretaker, driver, or friend",
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDistributionPattern(item.id as typeof distributionPattern)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          distributionPattern === item.id
                            ? "bg-[#C65378] text-white border-[#C65378] shadow-xs"
                            : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight">{item.title}</div>
                        <div className={`text-[11px] mt-1 leading-normal ${distributionPattern === item.id ? "text-rose-100" : "text-slate-500"}`}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Beneficiary Role in Execution */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>3. Beneficiary Active Role in Execution</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-semibold">Kavita Kanwar Doctrine</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {[
                      {
                        id: "zero",
                        title: "Zero Involvement",
                        desc: "Beneficiary completely absent from lawyer consultation & signing",
                      },
                      {
                        id: "in_room",
                        title: "Present in Room",
                        desc: "Beneficiary was physically present during execution",
                      },
                      {
                        id: "arranged_lawyer",
                        title: "Arranged Lawyer & Scribe",
                        desc: "Beneficiary hired lawyer, gave instructions & brought witnesses",
                      },
                      {
                        id: "secret_custody",
                        title: "Secret Private Custody",
                        desc: "Kept Will hidden until after testator demise",
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setBeneficiaryRole(item.id as typeof beneficiaryRole)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          beneficiaryRole === item.id
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight">{item.title}</div>
                        <div className={`text-[10px] mt-1 ${beneficiaryRole === item.id ? "text-slate-300" : "text-slate-500"}`}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Medical Capacity & Doctor Certificate */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>4. Doctor Certification &amp; Mental State</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-semibold">Section 59 Compliance</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {[
                      {
                        id: "doctor_certified",
                        title: "Same-Day MBBS/MD Cert",
                        desc: "Doctor examined mental fitness on execution date",
                      },
                      {
                        id: "general_fit",
                        title: "General Fitness Note",
                        desc: "Routine fitness slip from family physician",
                      },
                      {
                        id: "no_cert_healthy",
                        title: "No Cert (Physically Fit)",
                        desc: "Testator was active, but no medical slip taken",
                      },
                      {
                        id: "ill_no_cert",
                        title: "Ill / Bedridden Without Cert",
                        desc: "Hospitalized, stroke, or cognitive decline",
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMedicalCapacity(item.id as typeof medicalCapacity)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          medicalCapacity === item.id
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight">{item.title}</div>
                        <div className={`text-[10px] mt-1 ${medicalCapacity === item.id ? "text-slate-300" : "text-slate-500"}`}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Registration & Execution Status */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>5. Registration &amp; Execution Setting</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-semibold">Registration Act Book 3</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {[
                      {
                        id: "sro_registered",
                        title: "SRO Book 3 Registered",
                        desc: "Biometrics & photos captured before Sub-Registrar",
                      },
                      {
                        id: "notarized",
                        title: "Notarized on Stamp",
                        desc: "Signed before Notary Public (not registered)",
                      },
                      {
                        id: "unregistered_typed",
                        title: "Unregistered Typed Paper",
                        desc: "Executed on plain or non-judicial stamp paper",
                      },
                      {
                        id: "handwritten_deathbed",
                        title: "Handwritten Deathbed",
                        desc: "Executed in hospital / emergency without formalities",
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRegistrationStatus(item.id as typeof registrationStatus)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          registrationStatus === item.id
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight">{item.title}</div>
                        <div className={`text-[10px] mt-1 ${registrationStatus === item.id ? "text-slate-300" : "text-slate-500"}`}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Attesting Witness Quality */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>6. Attesting Witness Profile</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-semibold">Section 63 &amp; 67 Compliance</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {[
                      {
                        id: "independent_professionals",
                        title: "Independent Professionals",
                        desc: "Practicing advocate and doctor younger than testator",
                      },
                      {
                        id: "family_friends",
                        title: "Neutral Family Friends",
                        desc: "Respected acquaintances with zero financial interest",
                      },
                      {
                        id: "beneficiary_relative",
                        title: "Beneficiary In-Laws / Relatives",
                        desc: "Close associates of the primary beneficiary",
                      },
                      {
                        id: "beneficiary_himself",
                        title: "Beneficiary Signed as Witness",
                        desc: "CRITICAL: ISA Sec 67 renders bequest totally void",
                      },
                      {
                        id: "untraceable_strangers",
                        title: "Untraceable Strangers / Elderly",
                        desc: "Witnesses cannot be located or summons cannot be served",
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setWitnessIntegrity(item.id as typeof witnessIntegrity)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          witnessIntegrity === item.id
                            ? item.id === "beneficiary_himself"
                              ? "bg-red-700 text-white border-red-700 shadow-xs"
                              : "bg-[#C65378] text-white border-[#C65378] shadow-xs"
                            : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight">{item.title}</div>
                        <div className={`text-[10px] mt-1 ${witnessIntegrity === item.id ? "text-white/80" : "text-slate-500"}`}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 7. Audio-Visual Recording & Property Nature */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>7. Audio-Visual Recording</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "full_video_bsa", label: "Full Video + Q&A" },
                        { id: "basic_mobile", label: "Basic Clip" },
                        { id: "no_video", label: "No Recording" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setVideoRecording(item.id as typeof videoRecording)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                            videoRecording === item.id
                              ? "bg-slate-900 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>8. Title Nature of Bequeathed Assets</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "self_acquired", label: "100% Self-Acquired" },
                        { id: "ancestral_coparcenary", label: "HUF Coparcenary" },
                        { id: "disputed_title", label: "Disputed / Litigated" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPropertyNature(item.id as typeof propertyNature)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                            propertyNature === item.id
                              ? "bg-slate-900 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reset & Print Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleResetCalculator}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Low Risk Baseline</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Risk Audit Report</span>
                  </button>
                </div>

                {/* =========================================================================
                    SCORECARD DIAGNOSTIC RESULTS
                    ========================================================================= */}
                <div className="space-y-6 pt-2">
                  <div
                    className={`p-6 rounded-3xl border ${
                      riskTier === "LOW"
                        ? "bg-emerald-50/70 border-emerald-300 text-emerald-950"
                        : riskTier === "MODERATE"
                        ? "bg-amber-50/70 border-amber-300 text-amber-950"
                        : riskTier === "HIGH"
                        ? "bg-rose-50/80 border-rose-300 text-rose-950"
                        : "bg-red-50 border-red-300 text-red-950"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/70 shadow-2xs mb-2">
                          <Gavel className="w-3 h-3 text-[#C65378]" />
                          <span>JUDICIAL CONTEST RISK ASSESSMENT</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black">{riskLabel}</h3>
                        <p className="text-xs sm:text-sm mt-1 opacity-90">{courtForecast}</p>
                      </div>

                      <div className="flex items-baseline gap-2 shrink-0 bg-white/80 px-5 py-3 rounded-2xl border border-black/5 shadow-xs">
                        <span className="text-4xl sm:text-5xl font-black tracking-tight">{litigationScore}</span>
                        <span className="text-sm font-bold text-slate-500">/ 100</span>
                      </div>
                    </div>

                    {/* Score Bar Meter */}
                    <div className="pt-4 space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>Litigation Vulnerability Gauge</span>
                        <span>{litigationScore}% Vulnerability</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-200/80 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            litigationScore <= 25
                              ? "bg-emerald-600"
                              : litigationScore <= 50
                              ? "bg-amber-500"
                              : litigationScore <= 75
                              ? "bg-rose-600"
                              : "bg-red-700"
                          }`}
                          style={{ width: `${litigationScore}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>0% (Unchallengeable)</span>
                        <span>25% (Low)</span>
                        <span>50% (Moderate)</span>
                        <span>75% (High)</span>
                        <span>100% (Critical Void)</span>
                      </div>
                    </div>

                    {/* Triggered Legal Red Flags */}
                    {triggeredFlags.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-black/10 space-y-2">
                        <div className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Detected Judicial Red Flags in Indian Court:</span>
                        </div>
                        <ul className="space-y-1.5 text-xs">
                          {triggeredFlags.map((flag, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-800">
                              <X className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* WHAT-IF FORTIFICATION SIMULATOR */}
                  <div className="bg-[#FAF7F0] rounded-2xl border border-slate-200 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800">
                        <Sliders className="w-4 h-4 text-[#C65378]" />
                        <span>Interactive Fortification Simulator: Watch Your Score Drop</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#C65378] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        Live Impact
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Toggle standard Indian legal safeguards below to simulate how adding statutory protections
                      reduces contest risk:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                        <input
                          type="checkbox"
                          checked={simulateDoctorCert}
                          onChange={(e) => setSimulateDoctorCert(e.target.checked)}
                          className="w-4 h-4 accent-[#C65378] rounded cursor-pointer"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-800">Add Same-Day Doctor Certificate</div>
                          <div className="text-[10px] text-slate-500">Defeats Section 59 capacity challenge</div>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                        <input
                          type="checkbox"
                          checked={simulateSRO}
                          onChange={(e) => setSimulateSRO(e.target.checked)}
                          className="w-4 h-4 accent-[#C65378] rounded cursor-pointer"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-800">Add Sub-Registrar Registration</div>
                          <div className="text-[10px] text-slate-500">Activates Section 58/60 presumption</div>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                        <input
                          type="checkbox"
                          checked={simulateJustification}
                          onChange={(e) => setSimulateJustification(e.target.checked)}
                          className="w-4 h-4 accent-[#C65378] rounded cursor-pointer"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-800">Add Disinheritance Recital Clause</div>
                          <div className="text-[10px] text-slate-500">Dispels Shivakumar suspicion</div>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                        <input
                          type="checkbox"
                          checked={simulateVideo}
                          onChange={(e) => setSimulateVideo(e.target.checked)}
                          className="w-4 h-4 accent-[#C65378] rounded cursor-pointer"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-800">Add Continuous Video Recording</div>
                          <div className="text-[10px] text-slate-500">Section 63 BSA electronic proof</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: WILL CONTEST RISK AUDIT</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Indian Succession Act 1925</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/will-contest-challenge-risk-calculator-og.jpg"
                  alt="Can My Will Be Challenged in Court India - Litigation Risk Scorecard and Fortification"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
            </div>

            {/* SECTION 3: SUSPICIOUS CIRCUMSTANCES DOCTRINE */}
            <section id="suspicious-circumstances-doctrine" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Kavita Kanwar &amp; Shivakumar: Suspicious Circumstances
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In a probate or civil suit regarding a Will, Indian courts do not act as ordinary civil
                  courts evaluating the balance of probabilities. The Supreme Court has repeatedly held
                  that the court functions as a <strong>court of conscience</strong>. The propounder of
                  the Will must not only prove the formal compliance of Section 63, but also satisfy the
                  conscience of the court that the instrument represents the free, voluntary, and capable
                  testament of the deceased.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Kavita Kanwar v. Pamela Mehta (2020) 19 SCC 508</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    In this landmark ruling, the Supreme Court held that where a major beneficiary plays an
                    active role in the execution of the Will (such as drafting instructions, arranging the
                    lawyer, bringing the witnesses, or being present during signing), a thick cloud of
                    suspicion is cast. If the Will also excludes other natural heirs without plausible
                    explanation, probate will be refused. The court reiterated that the active participation
                    of the propounder-beneficiary is a decisive suspicious circumstance.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Shivakumar v. Sharanabasappa (2020) 11 SCC 648</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A three-judge bench of the Supreme Court comprehensively analyzed suspicious circumstances.
                    The court clarified that mere exclusion of natural legal heirs is not per se invalid,
                    because the very purpose of making a Will is to alter the normal line of intestate
                    succession. However, the propounder must demonstrate that the exclusion was intentional,
                    rational, and supported by reasons, rather than being the product of coercion, fraud, or
                    testamentary incapacity.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: TOP 6 GROUNDS FOR CHALLENGING A WILL */}
            <section id="grounds-for-challenging-will" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LEGAL GROUNDS OF ACTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Top 6 Grounds for Challenging a Will in Indian Court
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    num: "01",
                    title: "Lack of Testamentary Capacity (Section 59)",
                    desc: "Alleging that the testator suffered from Alzheimer's, severe dementia, delirium, or coma, rendering them unable to comprehend what they were signing.",
                  },
                  {
                    num: "02",
                    title: "Undue Influence & Coercion (Section 61)",
                    desc: "Proving that a dominant caregiver or child overpowered the testator's free agency through emotional blackmail, isolation, or physical confinement.",
                  },
                  {
                    num: "03",
                    title: "Defective Attestation (Section 63)",
                    desc: "Showing that two witnesses were not present, did not see the testator sign, did not sign in the testator's presence, or signed before the testator did.",
                  },
                  {
                    num: "04",
                    title: "Forgery & Fabricated Signatures",
                    desc: "Disputing the genuineness of the signature or thumb impression through Forensic State Handwriting Examiners or CFSL handwriting reports.",
                  },
                  {
                    num: "05",
                    title: "Beneficiary Witness Taint (Section 67)",
                    desc: "Demonstrating that the primary beneficiary or their spouse signed as an attesting witness, triggering statutory forfeiture of the entire legacy.",
                  },
                  {
                    num: "06",
                    title: "Revocation by Subsequent Valid Will",
                    desc: "Producing a later dated registered Will or Codicil executed by the testator that explicitly revokes all prior testamentary instruments.",
                  },
                ].map((item) => (
                  <div key={item.num} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="text-xs font-black text-[#C65378] tracking-wider uppercase">
                      Ground {item.num}
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: REGISTERED VS UNREGISTERED WILLS */}
            <section id="registered-vs-unregistered-wills" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Lock className="w-4 h-4" />
                <span>EVIDENTIARY VALUE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Unregistered vs Registered Wills: Court Evidentiary Weight
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Section 18(e) of the Registration Act, 1908, the registration of a Will in India is
                  optional, not mandatory. An unregistered Will written on a simple sheet of plain paper is
                  fully valid in law if it satisfies the execution and attestation requirements of Section 63.
                </p>
                <p>
                  However, from a courtroom litigation defense perspective, the difference is profound:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Registered Will (Book 3 at SRO)</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>Official Sub-Registrar verifies identity with Aadhaar and biometrics.</li>
                      <li>Endorsement under Sections 58 &amp; 60 carries strong statutory presumption of regular execution.</li>
                      <li>Government archive retains duplicate microfilmed copy, eliminating post-death document tampering.</li>
                      <li>Shifts heavy evidentiary burden onto challenger to prove forgery or impersonation.</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Unregistered Will (Plain / Stamp Paper)</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>Challengers routinely allege the document was created after the testator passed away.</li>
                      <li>No government third-party record verifies execution date or physical presence.</li>
                      <li>Propounder bears 100% burden to summon and examine attesting witnesses under BSA Section 67.</li>
                      <li>Vulnerable to probate caveators seeking interim injunctions on bank accounts and property.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: ATTESTATION PITFALLS & SECTION 67 */}
            <section id="section-67-witness-pitfalls" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Eye className="w-4 h-4" />
                <span>STATUTORY FORFEITURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Attestation Pitfalls: Section 67 Void Bequest Hazards
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  One of the most dangerous, irreversible traps in Indian Will drafting involves <strong>Section 67
                  of the Indian Succession Act, 1925</strong>. It provides:
                </p>
                <div className="p-4 rounded-2xl bg-rose-50 border-l-4 border-l-rose-600 border border-rose-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <em>&ldquo;A Will shall not be deemed to be insufficiently attested by reason of any benefit being given
                  by it to any person attesting it, or to his or her wife or husband; but the bequest shall be void so
                  far only as concerns such person or any person claiming under him or her.&rdquo;</em>
                </div>
                <p>
                  This means that if a father bequeaths his apartment to his son, and that son (or the son&rsquo;s
                  wife) signs the Will as an attesting witness, the Will is not thrown out, but the <strong>bequest to
                  the son is declared 100% void by operation of law</strong>! The apartment falls back into intestate
                  succession, and all other siblings inherit equal statutory shares.
                </p>
                <p>
                  Additionally, under Section 67 of Bharatiya Sakshya Adhiniyam, 2023 (former Section 68 of the
                  Indian Evidence Act), at least one attesting witness must appear in court to depose in the witness
                  box. If you choose elderly or untraceable witnesses, your beneficiaries will face insurmountable
                  delays proving the Will.
                </p>
              </div>
            </section>

            {/* SECTION 7: VIDEO RECORDING & MEDICAL FITNESS */}
            <section id="video-medical-fitness-protocol" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Video className="w-4 h-4" />
                <span>EVIDENTIARY FORTIFICATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Video Recording &amp; Medical Fitness Certification Protocol
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To make a Will practically unchallengeable in court, succession litigators recommend combining
                  a same-day medical certificate with an uninterrupted audio-visual recording.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-[#C65378]" />
                      <span>Doctor Mental Capacity Assessment</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      An MBBS or MD physician conducts a brief Mini-Mental State Examination (MMSE). The doctor
                      asks questions regarding orientation, date, names of family members, and extent of assets,
                      then signs a medical certificate on their official letterhead certifying sound disposing
                      mind under Section 59.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#C65378]" />
                      <span>Video Attestation Protocol (BSA Section 63)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Record a continuous, unedited video of the signing session. The testator states their name,
                      confirms they have read or had the Will read to them, explains why certain heirs are excluded,
                      and signs in the presence of both witnesses. The file hash is preserved with a Section 63
                      BSA electronic certificate.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table-grounds" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>JUDICIAL MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparison Table: Grounds of Challenge vs Standard of Proof
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                How Indian courts allocate the burden of proof when legal heirs challenge a Will:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Ground of Challenge</th>
                      <th className="py-3.5 px-4">Challenger Initial Burden</th>
                      <th className="py-3.5 px-4">Propounder Defense Requirement</th>
                      <th className="py-3.5 px-4">Leading Supreme Court Precedent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Lack of Sound Mind (Sec 59)</td>
                      <td className="py-3 px-4">Hospital discharge summaries, psychiatric records</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Same-day doctor fitness certificate</td>
                      <td className="py-3 px-4">Murthy v. C. Saradambal (2022 SC)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Undue Influence (Sec 61)</td>
                      <td className="py-3 px-4">Proof of dominant fiduciary position &amp; confinement</td>
                      <td className="py-3 px-4">Proof of independent legal advice &amp; free will</td>
                      <td className="py-3 px-4">Afsar Shaikh v. Soleman Bibi (1976 SC)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Beneficiary Taint</td>
                      <td className="py-3 px-4">Evidence of beneficiary procuring scribe/lawyer</td>
                      <td className="py-3 px-4 font-bold text-rose-700">Dispelling all suspicion beyond doubt</td>
                      <td className="py-3 px-4">Kavita Kanwar v. Pamela Mehta (2020 SC)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Disinheritance of Children</td>
                      <td className="py-3 px-4">Showing Class I status &amp; unnatural exclusion</td>
                      <td className="py-3 px-4">Factual justification clause in Will recitals</td>
                      <td className="py-3 px-4">Shivakumar v. Sharanabasappa (2020 SC)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Defective Attestation (Sec 63)</td>
                      <td className="py-3 px-4">Cross-examination of witness in court box</td>
                      <td className="py-3 px-4">Examining attesting witness under BSA Sec 67</td>
                      <td className="py-3 px-4">Janki Narayan Bhoir (2003 SC)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP FORTIFICATION SOP */}
            <section id="step-by-step-fortification-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>ACTIONABLE SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: 5-Point Will Fortification Protocol
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Commission Same-Day MBBS/MD Mental Fitness Certificate",
                    desc: "On the exact morning of Will execution, have a registered physician conduct a cognitive exam and sign a certificate confirming sound disposing memory and understanding under Section 59.",
                  },
                  {
                    step: 2,
                    title: "Draft Specific Justification Recitals for Excluded Heirs",
                    desc: "Never disinherit a child silently. Insert a respectful, factual recital detailing lifetime gifts, separate properties already given, or lack of support, satisfying the Shivakumar v. Sharanabasappa standard.",
                  },
                  {
                    step: 3,
                    title: "Strictly Exclude All Beneficiaries from Drafting & Signing",
                    desc: "Ensure the beneficiary never emails the draft, visits the lawyer's chamber, or enters the signing room. Independent execution directly defeats the Kavita Kanwar suspicious circumstance taint.",
                  },
                  {
                    step: 4,
                    title: "Select Two Independent, Younger Professional Witnesses",
                    desc: "Choose attesting witnesses who have zero financial interest in the Will, are 15-20 years younger than the testator, and reside permanently in the same city. Have the doctor sign as one witness.",
                  },
                  {
                    step: 5,
                    title: "Complete Sub-Registrar Office Book 3 Registration & Video",
                    desc: "Present the Will before the Sub-Registrar of Assurances for biometric fingerprinting, and capture an unedited video of the execution session with Section 63 BSA electronic preservation.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-court-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>REAL-WORLD VERDICTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Supreme Court &amp; High Court Rulings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case A: Disinherited Son Challenge in Delhi High Court
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Will Upheld
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An 82-year-old father bequeathed his entire Greater Kailash bungalow to his unmarried
                    daughter, completely excluding his wealthy NRI elder son. The son challenged the Will
                    alleging dementia and undue influence.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Key Evidence Produced:</span>
                      <span className="font-bold text-slate-900">Same-Day Doctor MMSE Score (28/30)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Recital Clause:</span>
                      <span className="font-bold text-slate-900">Detailed Son&rsquo;s US settlement &amp; gifts</span>
                    </div>
                    <div className="pt-1 text-emerald-700 font-bold flex justify-between border-t border-slate-200">
                      <span>Court Holding:</span>
                      <span>Probate Granted; Challenge Dismissed with Costs</span>
                    </div>
                  </div>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case B: Beneficiary Presence in Mumbai Probate Suit
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                      Will Struck Down
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A younger son engaged his own lawyer to draft his ailing mother&rsquo;s Will leaving 100% of
                    her South Mumbai flat to him, attended the execution, and kept the unregistered Will secret
                    for 3 years until after her death.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Judicial Precedent Applied:</span>
                      <span className="font-bold text-rose-700">Kavita Kanwar v. Pamela Mehta (2020)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Medical Proof:</span>
                      <span className="font-bold text-slate-900">Zero doctor certificate during hospital care</span>
                    </div>
                    <div className="pt-1 text-red-700 font-black flex justify-between border-t border-slate-200">
                      <span>Court Holding:</span>
                      <span>Probate Refused; Intestate Succession Ordered</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: COPY-PASTE LEGAL RECITAL CLAUSES */}
            <section id="copy-paste-legal-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>VERIFIED LEGAL CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Copy-Pasteable Legal Recital Clauses &amp; Fortification Checklist
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Copy and paste these verified clauses into your draft to safeguard against judicial suspicion:
              </p>

              {/* Template Box 1: Disinheritance Recital */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                      Clause 1: Disinheritance / Unequal Distribution Recital (Shivakumar Protection)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold text-xs transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedClause ? "Copied to Clipboard!" : "Copy Clause"}</span>
                  </button>
                </div>
                <pre className="text-[11px] leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap font-mono border border-slate-200/80">
                  {`"WHEREAS I am blessed with two sons, namely [Name of Son 1] and [Name of Son 2], and one daughter, namely [Name of Daughter].

AND WHEREAS I have consciously made unequal testamentary dispositions in this my Last Will and Testament, specifically bequeathing the entirety of my residential property situated at [Address] exclusively in favour of my younger son, [Name of Son 2].

AND WHEREAS I hereby declare that this disposition is made after mature reflection, with full knowledge and sound disposing state of mind, for the following rational and genuine reasons:
1. I have during my lifetime already provided substantial financial assistance and capital to my elder son [Name of Son 1] towards the purchase of his independent commercial premises vide Registered Deed No. [Deed No.] dated [Date], which is equal to his fair patrimonial share.
2. My younger son [Name of Son 2] and his family have continuously resided with me, provided personal medical care, nursing, companionship, and looked after my day-to-day welfare throughout my advanced age and chronic ailments.
3. My daughter [Name of Daughter] is happily settled in her matrimonial home, and I have gifted her movable jewellery and cash securities during her wedding and subsequent occasions to her complete satisfaction.

I expressly state that my exclusion of [Name of Son 1] from my residential property is not due to any anger, delusion, undue influence, or coercion, but represents my conscious, voluntary, and considered testamentary decision."`}
                </pre>
              </div>

              {/* Template Box 2: Medical Fitness Certificate */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-[#C65378]" />
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                      Clause 2: Doctor Sound Disposing Mind Certificate (Section 59 Compliance)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={copyMedicalClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold text-xs transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedMedicalClause ? "Copied to Clipboard!" : "Copy Clause"}</span>
                  </button>
                </div>
                <pre className="text-[11px] leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap font-mono border border-slate-200/80">
                  {`"I, Dr. [Full Name of Doctor], MBBS/MD, Registered Medical Practitioner bearing MCI / State Medical Council Registration No. [Registration No.], practicing at [Clinic/Hospital Address], do hereby certify that:

1. I have this day, [Date of Will Execution], personally examined Mr./Mrs. [Testator Full Name], aged [Age] years, residing at [Testator Address], whom I have known as a patient for [Number] years / who was presented to me for cognitive evaluation.
2. I conducted a comprehensive clinical examination including Mini-Mental State Examination (MMSE) and testamentary assessment questions regarding his/her identity, family relationships, nature and extent of assets, and comprehension of testamentary succession.
3. I find that the testator is completely alert, oriented in time, place, and person, possesses sound memory, understanding, and cognitive faculties, and is fully capable of exercising independent judgment and making a valid Last Will and Testament.
4. He/she is in a sound and disposing state of mind within the statutory meaning of Section 59 of the Indian Succession Act, 1925."

Dated this [Day] day of [Month], [Year] at [City].
Signature of Medical Practitioner: _______________________
Official Seal & Registration Stamp: [Seal]`}
                </pre>
              </div>

              {/* Template Box 3: Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                      Checklist: 5-Point Court-Proof Will Fortification Protocol
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold text-xs transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedChecklist ? "Copied!" : "Copy Checklist"}</span>
                  </button>
                </div>
                <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#C65378]">1.</span>
                    <span><strong>Same-Day Doctor Examination:</strong> Obtain cognitive certificate on the date of execution.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#C65378]">2.</span>
                    <span><strong>Beneficiary Exclusion:</strong> Keep all legatees outside during drafting and signing.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#C65378]">3.</span>
                    <span><strong>Specific Exclusion Recitals:</strong> Detail rational reasons for disinheriting any Class I heir.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#C65378]">4.</span>
                    <span><strong>SRO Book 3 Registration:</strong> Register voluntarily before the Sub-Registrar.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#C65378]">5.</span>
                    <span><strong>Video Recording:</strong> Maintain continuous video with BSA Section 63 electronic certification.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: LEGAL BACKING & ADVOCATE PROFILE */}
            <section id="institutional-advocate-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>INSTITUTIONAL CREDENTIALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Legal Backing &amp; Senior Succession Advocate Profile
              </h3>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C65378] font-black text-xl flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">Advocate Anuj Anand Malik</h3>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Succession &amp; Testamentary Counsel • AMA Legal Solutions
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Bar Council of Delhi • Supreme Court &amp; High Court of Delhi Practice
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Advocate Anuj Anand Malik leads the testamentary succession and estate dispute practice at
                  AMA Legal Solutions. With extensive experience in contentious probate petitions, testamentary
                  caveat litigation, suspicious circumstances defense under <em>Kavita Kanwar</em>, and
                  high-stakes family property settlements across Delhi NCR, Mumbai, Bengaluru, and Chandigarh,
                  the firm advises high-net-worth families, senior citizens, and NRIs on drafting unchallengeable
                  Wills.
                </p>
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-700 font-semibold">Specialization: High Court Probate &amp; Will Contests</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Consult Counsel via Desk</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Will Contest Risks
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS & PORTALS */}
            <section id="statutory-citations-portals" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ExternalLink className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; Official Judicial Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Governing Provisions of Indian Succession &amp; Evidence Laws:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Indian Succession Act, 1925:</strong> Section 59 (testamentary capacity),
                      Section 61 (fraud, coercion, undue influence), Section 63 (execution of unprivileged
                      Wills), Section 67 (bequest to attesting witness void).
                    </li>
                    <li>
                      <strong>Bharatiya Sakshya Adhiniyam, 2023:</strong> Section 63 (electronic records &amp;
                      video evidence admissibility), Section 67 (proof of execution of document required by law
                      to be attested).
                    </li>
                    <li>
                      <strong>Registration Act, 1908:</strong> Section 18(e) (optional registration of Wills),
                      Section 58 &amp; 60 (presumption of due execution on registration in Book 3).
                    </li>
                    <li>
                      <strong>Supreme Court of India:</strong> <em>Kavita Kanwar v. Pamela Mehta (2020)</em>,
                      <em>Shivakumar v. Sharanabasappa (2020)</em>, <em>Murthy v. C. Saradambal (2022)</em>.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>India Code: Indian Succession Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://services.ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>e-Courts Services (Probate &amp; Caveats)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Judgments</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Hub-and-Spoke Links */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Calculators &amp; Legal Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/will-validity-section-63-audit-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Section 63 Will Validity Audit
                    </Link>
                    <Link
                      href="/tools/witness-eligibility-section-67-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Section 67 Witness Eligibility Checker
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Classifier
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Inherited Property Capital Gains Calculator
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Registration Support Desk
                    </Link>
                    <Link
                      href="/tools"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      All Legal Succession Tools
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Indian testamentary jurisprudence, High Court probate petitions, Section
                63 attestation audits, and Kavita Kanwar suspicious circumstances defense.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT COURT WILL CONTESTS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft an Unchallengeable Legal Will Online
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our guided succession engine automatically integrates Section 59 capacity recitals,
                  Shivakumar disinheritance justifications, and Section 67 witness safeguards.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>HIGH-STAKES WILL SCRUTINY DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Excluding a Child or Facing a Caveat Threat?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our senior succession litigators review existing Wills, structure video attestation
                  protocols, and manage Sub-Registrar Book 3 registrations pan-India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Supreme Court Rigour:</strong> Built around <em>Kavita Kanwar</em> and <em>Shivakumar</em> tests.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 67 Immunity:</strong> Prevents accidental forfeiture by beneficiary witnesses.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Evidence Act BSA Proof:</strong> Complete video attestation protocol.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FLOATING MOBILE ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <a
          href="#interactive-calculator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Risk Calculator</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}
