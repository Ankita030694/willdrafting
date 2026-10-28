"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
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
  BookOpen,
  Award,
  Scale,
  UserCheck,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Copy,
  Calculator,
  Users,
  FileText,
  Percent,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

// School type definition
type SchoolOfLaw = "sunni" | "shia";
type DeceasedGender = "male" | "female";

interface HeirShareResult {
  id: string;
  relation: string;
  count: number;
  individualSharePct: number;
  totalSharePct: number;
  totalAmount: number;
  individualAmount: number;
  quranicFraction: string;
  classification: "Sharer (Zawil-Furuz)" | "Residuary (Asabah)" | "Distant Kindred (Zawil-Arham)" | "Excluded (Mahjub)" | "Legatee (Musi-lahu)";
  ruleNote: string;
}

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Legal Framework (Shariat Act 1937)" },
  { id: "interactive-calculator", label: "2. Islamic Shares & Wasiyat Tool" },
  { id: "estate-order", label: "3. Priority Order of Estate Charges" },
  { id: "wasiyat-rule", label: "4. The 1/3rd Wasiyat Bequest Cap" },
  { id: "sunni-vs-shia", label: "5. Sunni Hanafi vs Shia Comparison" },
  { id: "quranic-sharers", label: "6. Quranic Sharers (Zawil-Furuz)" },
  { id: "residuaries-asabah", label: "7. Residuaries (Asabah) Rules" },
  { id: "daughter-dilemma", label: "8. Protecting Daughters' Rights" },
  { id: "aul-and-radd", label: "9. Doctrine of Aul & Radd Math" },
  { id: "hiba-vs-will", label: "10. Lifetime Gift (Hiba) vs Wasiyat" },
  { id: "step-by-step-sop", label: "11. Estate Distribution SOP" },
  { id: "succession-certificate", label: "12. Court Succession Certificate" },
  { id: "legal-clauses", label: "13. Sharia Will Drafting Clauses" },
  { id: "institutional-profile", label: "14. Institutional Profile & Trust" },
  { id: "faq", label: "15. Muslim Inheritance FAQs" },
  { id: "statutory-citations", label: "16. Statutory Authority & Acts" },
];

export default function MuslimInheritanceCalculatorClient() {
  const router = useRouter();
  const { status } = useSession();
  const printRef = useRef<HTMLDivElement>(null);

  // Active section tracking for TOC
  const [activeId, setActiveId] = useState<string>("statutory-framework");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  useEffect(() => {
    const targets = document.querySelectorAll(".scroll-target");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -40% 0px",
        threshold: 0.05,
      }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  // -------------------------------------------------------------
  // Calculator States
  // -------------------------------------------------------------
  const [school, setSchool] = useState<SchoolOfLaw>("sunni");
  const [gender, setGender] = useState<DeceasedGender>("male");

  // Financials
  const [grossEstate, setGrossEstate] = useState<number>(5000000); // 50 Lakhs
  const [funeralExpenses, setFuneralExpenses] = useState<number>(50000);
  const [debts, setDebts] = useState<number>(150000);
  const [unpaidMahr, setUnpaidMahr] = useState<number>(100000);

  // Wasiyat (Testamentary Bequest)
  const [wasiyatPct, setWasiyatPct] = useState<number>(10);
  const [allowExceedOneThird, setAllowExceedOneThird] = useState<boolean>(false);
  const [wasiyatToHeir, setWasiyatToHeir] = useState<boolean>(false);

  // Family structure
  const [wivesCount, setWivesCount] = useState<number>(1);
  const [husbandPresent, setHusbandPresent] = useState<boolean>(true);
  const [sonsCount, setSonsCount] = useState<number>(1);
  const [daughtersCount, setDaughtersCount] = useState<number>(2);
  const [fatherAlive, setFatherAlive] = useState<boolean>(false);
  const [motherAlive, setMotherAlive] = useState<boolean>(true);
  const [fullBrothersCount, setFullBrothersCount] = useState<number>(0);
  const [fullSistersCount, setFullSistersCount] = useState<number>(0);

  // UI state
  const [copiedClauseIndex, setCopiedClauseIndex] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handlePrint = () => {
    window.print();
  };

  const handleResetCalculator = () => {
    setSchool("sunni");
    setGender("male");
    setGrossEstate(5000000);
    setFuneralExpenses(50000);
    setDebts(150000);
    setUnpaidMahr(100000);
    setWasiyatPct(10);
    setAllowExceedOneThird(false);
    setWasiyatToHeir(false);
    setWivesCount(1);
    setHusbandPresent(true);
    setSonsCount(1);
    setDaughtersCount(2);
    setFatherAlive(false);
    setMotherAlive(true);
    setFullBrothersCount(0);
    setFullSistersCount(0);
  };

  // Auth handler for Will creation
  const handleStartWill = () => {
    if (status === "authenticated") {
      router.push("/start");
    } else {
      window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
    }
  };

  // -------------------------------------------------------------
  // Preset Scenarios
  // -------------------------------------------------------------
  const applyPreset = (presetKey: string) => {
    if (presetKey === "daughter_brothers") {
      setSchool("sunni");
      setGender("male");
      setGrossEstate(6000000);
      setFuneralExpenses(50000);
      setDebts(150000);
      setUnpaidMahr(100000);
      setWasiyatPct(0);
      setWivesCount(1);
      setSonsCount(0);
      setDaughtersCount(2);
      setFatherAlive(false);
      setMotherAlive(false);
      setFullBrothersCount(2);
      setFullSistersCount(0);
    } else if (presetKey === "standard_family") {
      setSchool("sunni");
      setGender("male");
      setGrossEstate(10000000);
      setFuneralExpenses(50000);
      setDebts(200000);
      setUnpaidMahr(150000);
      setWasiyatPct(15);
      setWivesCount(1);
      setSonsCount(1);
      setDaughtersCount(2);
      setFatherAlive(true);
      setMotherAlive(true);
      setFullBrothersCount(1);
      setFullSistersCount(1);
    } else if (presetKey === "aul_scenario") {
      setSchool("sunni");
      setGender("female");
      setGrossEstate(4000000);
      setFuneralExpenses(40000);
      setDebts(60000);
      setUnpaidMahr(0);
      setWasiyatPct(0);
      setHusbandPresent(true);
      setSonsCount(0);
      setDaughtersCount(2);
      setFatherAlive(true);
      setMotherAlive(true);
      setFullBrothersCount(1);
      setFullSistersCount(0);
    } else if (presetKey === "shia_daughter_only") {
      setSchool("shia");
      setGender("male");
      setGrossEstate(5000000);
      setFuneralExpenses(50000);
      setDebts(100000);
      setUnpaidMahr(100000);
      setWasiyatPct(25);
      setWivesCount(1);
      setSonsCount(0);
      setDaughtersCount(1);
      setFatherAlive(false);
      setMotherAlive(true);
      setFullBrothersCount(2);
      setFullSistersCount(1);
    } else if (presetKey === "radd_scenario") {
      setSchool("sunni");
      setGender("male");
      setGrossEstate(3000000);
      setFuneralExpenses(30000);
      setDebts(70000);
      setUnpaidMahr(0);
      setWasiyatPct(0);
      setWivesCount(0);
      setSonsCount(0);
      setDaughtersCount(1);
      setFatherAlive(false);
      setMotherAlive(true);
      setFullBrothersCount(0);
      setFullSistersCount(0);
    }
  };

  // -------------------------------------------------------------
  // Calculations
  // -------------------------------------------------------------
  const totalDeductions = useMemo(() => {
    const mahr = gender === "male" && wivesCount > 0 ? unpaidMahr : 0;
    return funeralExpenses + debts + mahr;
  }, [funeralExpenses, debts, unpaidMahr, gender, wivesCount]);

  const netEstate = useMemo(() => {
    return Math.max(0, grossEstate - totalDeductions);
  }, [grossEstate, totalDeductions]);

  const effectiveWasiyatPct = useMemo(() => {
    if (allowExceedOneThird) {
      return wasiyatPct;
    }
    return Math.min(wasiyatPct, 33.3333);
  }, [wasiyatPct, allowExceedOneThird]);

  const wasiyatAmount = useMemo(() => {
    return (netEstate * effectiveWasiyatPct) / 100;
  }, [netEstate, effectiveWasiyatPct]);

  const faraidPool = useMemo(() => {
    return Math.max(0, netEstate - wasiyatAmount);
  }, [netEstate, wasiyatAmount]);

  // Faraid Mathematical Solver
  const calculationResults = useMemo(() => {
    const list: HeirShareResult[] = [];
    let adjustmentApplied: "none" | "aul" | "radd" = "none";
    let aulDetails = "";
    let raddDetails = "";

    const hasChildren = sonsCount > 0 || daughtersCount > 0;
    const hasSons = sonsCount > 0;
    const hasDaughters = daughtersCount > 0;
    const totalSiblings = fullBrothersCount + fullSistersCount;

    // 1. Legatee / Wasiyat Entry if > 0
    if (effectiveWasiyatPct > 0) {
      list.push({
        id: "wasiyat_bequest",
        relation: wasiyatToHeir ? "Wasiyat Legatee (Legal Heir)" : "Wasiyat Legatee (Non-Heir / Charity)",
        count: 1,
        individualSharePct: effectiveWasiyatPct,
        totalSharePct: effectiveWasiyatPct,
        totalAmount: wasiyatAmount,
        individualAmount: wasiyatAmount,
        quranicFraction: `${effectiveWasiyatPct.toFixed(1)}% of Estate`,
        classification: "Legatee (Musi-lahu)",
        ruleNote: wasiyatToHeir
          ? school === "sunni"
            ? "Subject to unanimous post-death consent of all other legal heirs (Ghulam Mohammad v. Ghulam Husain)."
            : "Under Shia law, bequest up to 1/3rd to an heir is valid without other heirs' consent."
          : "Permissible up to 1/3rd of net estate without heirs' consent under Islamic jurisprudence.",
      });
    }

    if (faraidPool <= 0) {
      return {
        heirs: list,
        adjustmentApplied,
        aulDetails,
        raddDetails,
      };
    }

    // =========================================================
    // SUNNI (HANAFI) JURISPRUDENCE SOLVER
    // =========================================================
    if (school === "sunni") {
      // Step A: Determine Quranic Sharers (Zawil-Furuz)
      interface RawSharer {
        id: string;
        relation: string;
        count: number;
        num: number;
        den: number;
        rule: string;
      }
      const rawSharers: RawSharer[] = [];

      // 1. Surviving Spouse
      if (gender === "male" && wivesCount > 0) {
        if (hasChildren) {
          rawSharers.push({
            id: "wife",
            relation: wivesCount > 1 ? `Wives (${wivesCount})` : "Wife",
            count: wivesCount,
            num: 1,
            den: 8,
            rule: "Quran Surah An-Nisa 4:12 (1/8th share when children exist; divided equally among wives)",
          });
        } else {
          rawSharers.push({
            id: "wife",
            relation: wivesCount > 1 ? `Wives (${wivesCount})` : "Wife",
            count: wivesCount,
            num: 1,
            den: 4,
            rule: "Quran Surah An-Nisa 4:12 (1/4th share when no children exist)",
          });
        }
      } else if (gender === "female" && husbandPresent) {
        if (hasChildren) {
          rawSharers.push({
            id: "husband",
            relation: "Husband",
            count: 1,
            num: 1,
            den: 4,
            rule: "Quran Surah An-Nisa 4:12 (1/4th share when children exist)",
          });
        } else {
          rawSharers.push({
            id: "husband",
            relation: "Husband",
            count: 1,
            num: 1,
            den: 2,
            rule: "Quran Surah An-Nisa 4:12 (1/2 share when no children exist)",
          });
        }
      }

      // 2. Mother
      if (motherAlive) {
        if (hasChildren || totalSiblings >= 2) {
          rawSharers.push({
            id: "mother",
            relation: "Mother",
            count: 1,
            num: 1,
            den: 6,
            rule: "Quran Surah An-Nisa 4:11 (1/6th share when children or 2+ siblings exist)",
          });
        } else {
          // If surviving with father and spouse only: Umariyatan rule (1/3 of residue)
          rawSharers.push({
            id: "mother",
            relation: "Mother",
            count: 1,
            num: 1,
            den: 3,
            rule: "Quran Surah An-Nisa 4:11 (1/3rd share when no children and max 1 sibling)",
          });
        }
      }

      // 3. Father (Sharer role)
      if (fatherAlive) {
        if (hasSons) {
          rawSharers.push({
            id: "father",
            relation: "Father",
            count: 1,
            num: 1,
            den: 6,
            rule: "Quran Surah An-Nisa 4:11 (1/6th share as Quranic Sharer when sons exist)",
          });
        } else if (hasDaughters) {
          rawSharers.push({
            id: "father",
            relation: "Father",
            count: 1,
            num: 1,
            den: 6,
            rule: "Quran Surah An-Nisa 4:11 (1/6th as Sharer PLUS Asabah residuary rights)",
          });
        }
      }

      // 4. Daughters (Sharers only if NO sons)
      if (!hasSons && hasDaughters) {
        if (daughtersCount === 1) {
          rawSharers.push({
            id: "daughter",
            relation: "Daughter (Single)",
            count: 1,
            num: 1,
            den: 2,
            rule: "Quran Surah An-Nisa 4:11 (1/2 share for a single daughter in absence of sons)",
          });
        } else {
          rawSharers.push({
            id: "daughter",
            relation: `Daughters (${daughtersCount})`,
            count: daughtersCount,
            num: 2,
            den: 3,
            rule: "Quran Surah An-Nisa 4:11 (2/3rds collective share divided equally among 2+ daughters)",
          });
        }
      }

      // Find common denominator (LCM of 2, 3, 4, 6, 8 is 24)
      const baseDenom = 24;
      let totalNumerator = 0;
      rawSharers.forEach((s) => {
        totalNumerator += (s.num * baseDenom) / s.den;
      });

      // Check if Residuaries exist
      const residuariesExist =
        hasSons ||
        (!hasSons && fatherAlive) ||
        (!hasSons && !fatherAlive && fullBrothersCount > 0) ||
        (!hasSons && !fatherAlive && fullBrothersCount === 0 && fullSistersCount > 0 && hasDaughters);

      // CASE 1: AUL (Sum of Sharers > baseDenom = 24)
      if (totalNumerator > baseDenom) {
        adjustmentApplied = "aul";
        const newDenom = totalNumerator;
        aulDetails = `Sum of Quranic Sharers exceeded 1 (${totalNumerator}/${baseDenom}). Under Sunni Hanafi doctrine of Aul, the base is proportionally increased to ${newDenom} to balance the estate without excluding any Quranic sharer.`;

        rawSharers.forEach((s) => {
          const heirNum = (s.num * baseDenom) / s.den;
          const shareOfFaraid = heirNum / newDenom;
          const totalAmt = faraidPool * shareOfFaraid;
          const totalPct = (shareOfFaraid * (100 - effectiveWasiyatPct));

          list.push({
            id: s.id,
            relation: s.relation,
            count: s.count,
            individualSharePct: totalPct / s.count,
            totalSharePct: totalPct,
            totalAmount: totalAmt,
            individualAmount: totalAmt / s.count,
            quranicFraction: `${heirNum}/${newDenom} (Aul)`,
            classification: "Sharer (Zawil-Furuz)",
            ruleNote: `${s.rule}. Adjusted proportionally under Aul.`,
          });
        });

        // Residuaries get 0 in Aul
        if (hasSons) {
          list.push({
            id: "sons_excluded",
            relation: `Sons (${sonsCount})`,
            count: sonsCount,
            individualSharePct: 0,
            totalSharePct: 0,
            totalAmount: 0,
            individualAmount: 0,
            quranicFraction: "0%",
            classification: "Residuary (Asabah)",
            ruleNote: "Estate completely exhausted by Quranic Sharers under Aul.",
          });
        }
      }
      // CASE 2: SHARERS + RESIDUARIES (totalNumerator <= 24)
      else if (residuariesExist) {
        // Add Sharers first
        rawSharers.forEach((s) => {
          const shareOfFaraid = s.num / s.den;
          const totalAmt = faraidPool * shareOfFaraid;
          const totalPct = (shareOfFaraid * (100 - effectiveWasiyatPct));

          list.push({
            id: s.id,
            relation: s.relation,
            count: s.count,
            individualSharePct: totalPct / s.count,
            totalSharePct: totalPct,
            totalAmount: totalAmt,
            individualAmount: totalAmt / s.count,
            quranicFraction: `${s.num}/${s.den}`,
            classification: "Sharer (Zawil-Furuz)",
            ruleNote: s.rule,
          });
        });

        const residueNumerator = baseDenom - totalNumerator;
        const residueShareOfFaraid = residueNumerator / baseDenom;
        const residueAmount = faraidPool * residueShareOfFaraid;
        const residuePct = residueShareOfFaraid * (100 - effectiveWasiyatPct);

        // Distribute Residue:
        // Priority 1: Sons & Daughters (Asabah bi-Ghayriha, 2:1 ratio)
        if (hasSons) {
          const parts = sonsCount * 2 + daughtersCount * 1;
          const partAmt = residueAmount / parts;
          const partPct = residuePct / parts;

          list.push({
            id: "sons",
            relation: `Sons (${sonsCount})`,
            count: sonsCount,
            individualSharePct: partPct * 2,
            totalSharePct: partPct * 2 * sonsCount,
            totalAmount: partAmt * 2 * sonsCount,
            individualAmount: partAmt * 2,
            quranicFraction: `Residue (${sonsCount * 2}/${parts})`,
            classification: "Residuary (Asabah)",
            ruleNote: "Quran Surah An-Nisa 4:11: Male inherits double the female share (2:1 ratio).",
          });

          if (hasDaughters) {
            list.push({
              id: "daughters",
              relation: `Daughters (${daughtersCount})`,
              count: daughtersCount,
              individualSharePct: partPct,
              totalSharePct: partPct * daughtersCount,
              totalAmount: partAmt * daughtersCount,
              individualAmount: partAmt,
              quranicFraction: `Residue (${daughtersCount}/${parts})`,
              classification: "Residuary (Asabah)",
              ruleNote: "Became Residuaries alongside brothers (Asabah bi-Ghayriha).",
            });
          }

          // Full brothers & sisters are excluded by sons
          if (fullBrothersCount > 0) {
            list.push({
              id: "brothers_excluded",
              relation: `Full Brothers (${fullBrothersCount})`,
              count: fullBrothersCount,
              individualSharePct: 0,
              totalSharePct: 0,
              totalAmount: 0,
              individualAmount: 0,
              quranicFraction: "0%",
              classification: "Excluded (Mahjub)",
              ruleNote: "Completely excluded by presence of surviving son(s).",
            });
          }
        }
        // Priority 2: Father takes residue (if only daughters or no children)
        else if (fatherAlive) {
          const fatherResidueAmt = residueAmount;
          const fatherResiduePct = residuePct;

          if (hasDaughters) {
            // Father already got 1/6th as Sharer, gets residue as well
            const existingFather = list.find((h) => h.id === "father");
            if (existingFather) {
              existingFather.totalAmount += fatherResidueAmt;
              existingFather.individualAmount += fatherResidueAmt;
              existingFather.totalSharePct += fatherResiduePct;
              existingFather.individualSharePct += fatherResiduePct;
              existingFather.quranicFraction += ` + Residue (${residueNumerator}/24)`;
              existingFather.classification = "Residuary (Asabah)";
              existingFather.ruleNote += " Plus inherited all remaining residue as agnatic residuary.";
            }
          } else {
            // Pure residuary
            list.push({
              id: "father",
              relation: "Father",
              count: 1,
              individualSharePct: fatherResiduePct,
              totalSharePct: fatherResiduePct,
              totalAmount: fatherResidueAmt,
              individualAmount: fatherResidueAmt,
              quranicFraction: `Residue (${residueNumerator}/24)`,
              classification: "Residuary (Asabah)",
              ruleNote: "Inherits entire remaining residue as primary agnatic heir.",
            });
          }

          // Brothers excluded by father
          if (fullBrothersCount > 0) {
            list.push({
              id: "brothers_excluded",
              relation: `Full Brothers (${fullBrothersCount})`,
              count: fullBrothersCount,
              individualSharePct: 0,
              totalSharePct: 0,
              totalAmount: 0,
              individualAmount: 0,
              quranicFraction: "0%",
              classification: "Excluded (Mahjub)",
              ruleNote: "Completely excluded by presence of surviving Father.",
            });
          }
        }
        // Priority 3: Full Brothers (and Sisters) take residue
        else if (fullBrothersCount > 0) {
          const brotherParts = fullBrothersCount * 2 + fullSistersCount * 1;
          const partAmt = residueAmount / brotherParts;
          const partPct = residuePct / brotherParts;

          list.push({
            id: "brothers",
            relation: `Full Brothers (${fullBrothersCount})`,
            count: fullBrothersCount,
            individualSharePct: partPct * 2,
            totalSharePct: partPct * 2 * fullBrothersCount,
            totalAmount: partAmt * 2 * fullBrothersCount,
            individualAmount: partAmt * 2,
            quranicFraction: `Residue (${fullBrothersCount * 2}/${brotherParts})`,
            classification: "Residuary (Asabah)",
            ruleNote: hasDaughters
              ? "Crucial Sunni Rule: Brothers inherit remaining residue when deceased leaves only daughters."
              : "Inherits residue as agnatic heir in absence of children and father.",
          });

          if (fullSistersCount > 0) {
            list.push({
              id: "sisters",
              relation: `Full Sisters (${fullSistersCount})`,
              count: fullSistersCount,
              individualSharePct: partPct,
              totalSharePct: partPct * fullSistersCount,
              totalAmount: partAmt * fullSistersCount,
              individualAmount: partAmt,
              quranicFraction: `Residue (${fullSistersCount}/${brotherParts})`,
              classification: "Residuary (Asabah)",
              ruleNote: "Inherits residue alongside brothers in 2:1 ratio.",
            });
          }
        }
        // Priority 4: Full Sisters with daughters (Asabah ma'a Ghayriha)
        else if (hasDaughters && fullSistersCount > 0 && fullBrothersCount === 0) {
          list.push({
            id: "sisters_asabah",
            relation: `Full Sisters (${fullSistersCount})`,
            count: fullSistersCount,
            individualSharePct: residuePct / fullSistersCount,
            totalSharePct: residuePct,
            totalAmount: residueAmount,
            individualAmount: residueAmount / fullSistersCount,
            quranicFraction: `Residue (${residueNumerator}/24)`,
            classification: "Residuary (Asabah)",
            ruleNote: "Prophetic Hadith: Sisters become residuaries with daughters (Asabah ma'a Ghayriha).",
          });
        }
      }
      // CASE 3: RADD (No Residuaries & totalNumerator < 24)
      else {
        adjustmentApplied = "radd";
        raddDetails = `Quranic Sharers did not exhaust the estate (${totalNumerator}/${baseDenom}) and no agnatic residuaries (Asabah) survived. Under the Sunni doctrine of Radd, the residue returns proportionally to blood sharers.`;

        // Spouse does not participate in classical Radd if blood sharers exist
        const spouseSharer = rawSharers.find((s) => s.id === "wife" || s.id === "husband");
        const bloodSharers = rawSharers.filter((s) => s.id !== "wife" && s.id !== "husband");

        if (bloodSharers.length > 0) {
          let spouseFaraidShare = 0;
          if (spouseSharer) {
            spouseFaraidShare = spouseSharer.num / spouseSharer.den;
            const spouseAmt = faraidPool * spouseFaraidShare;
            const spousePct = spouseFaraidShare * (100 - effectiveWasiyatPct);

            list.push({
              id: spouseSharer.id,
              relation: spouseSharer.relation,
              count: spouseSharer.count,
              individualSharePct: spousePct / spouseSharer.count,
              totalSharePct: spousePct,
              totalAmount: spouseAmt,
              individualAmount: spouseAmt / spouseSharer.count,
              quranicFraction: `${spouseSharer.num}/${spouseSharer.den}`,
              classification: "Sharer (Zawil-Furuz)",
              ruleNote: `${spouseSharer.rule}. Spouse does not participate in classical Radd return.`,
            });
          }

          const remForBlood = 1 - spouseFaraidShare;
          let bloodNumeratorSum = 0;
          bloodSharers.forEach((s) => {
            bloodNumeratorSum += (s.num * baseDenom) / s.den;
          });

          bloodSharers.forEach((s) => {
            const heirWeight = ((s.num * baseDenom) / s.den) / bloodNumeratorSum;
            const shareOfFaraid = remForBlood * heirWeight;
            const totalAmt = faraidPool * shareOfFaraid;
            const totalPct = shareOfFaraid * (100 - effectiveWasiyatPct);

            list.push({
              id: s.id,
              relation: s.relation,
              count: s.count,
              individualSharePct: totalPct / s.count,
              totalSharePct: totalPct,
              totalAmount: totalAmt,
              individualAmount: totalAmt / s.count,
              quranicFraction: `Radd Adjusted`,
              classification: "Sharer (Zawil-Furuz)",
              ruleNote: `${s.rule}. Share augmented proportionally by residue under Doctrine of Radd.`,
            });
          });
        } else if (spouseSharer) {
          // Only spouse survived: under modern Indian judicial practice, takes entire residue to prevent escheat
          const totalAmt = faraidPool;
          const totalPct = 100 - effectiveWasiyatPct;

          list.push({
            id: spouseSharer.id,
            relation: spouseSharer.relation,
            count: spouseSharer.count,
            individualSharePct: totalPct / spouseSharer.count,
            totalSharePct: totalPct,
            totalAmount: totalAmt,
            individualAmount: totalAmt / spouseSharer.count,
            quranicFraction: `100% (Radd)`,
            classification: "Sharer (Zawil-Furuz)",
            ruleNote: "Sole surviving heir takes entire estate by return (Radd) under Indian High Court precedents.",
          });
        }
      }
    }
    // =========================================================
    // SHIA (ITHNA-ASHARI) JURISPRUDENCE SOLVER
    // =========================================================
    else {
      // Shia Classification:
      // Class I: Parents & Children (and descendants).
      // Class II: Grandparents & Siblings.
      // Rule: Class I completely excludes Class II!

      const hasClassI = hasChildren || fatherAlive || motherAlive;

      // 1. Surviving Spouse (Sabab)
      let spouseShare = 0;
      let spouseRelation = "";
      let spouseRule = "";
      let spouseCount = 1;

      if (gender === "male" && wivesCount > 0) {
        spouseCount = wivesCount;
        spouseRelation = wivesCount > 1 ? `Wives (${wivesCount})` : "Wife";
        if (hasChildren) {
          spouseShare = 1 / 8;
          spouseRule = "Quran Surah An-Nisa 4:12 (1/8th share when children exist)";
        } else {
          spouseShare = 1 / 4;
          spouseRule = "Quran Surah An-Nisa 4:12 (1/4th share when no children exist)";
        }
      } else if (gender === "female" && husbandPresent) {
        spouseRelation = "Husband";
        if (hasChildren) {
          spouseShare = 1 / 4;
          spouseRule = "Quran Surah An-Nisa 4:12 (1/4th share when children exist)";
        } else {
          spouseShare = 1 / 2;
          spouseRule = "Quran Surah An-Nisa 4:12 (1/2 share when no children exist)";
        }
      }

      if (spouseShare > 0) {
        const spouseAmt = faraidPool * spouseShare;
        const spousePct = spouseShare * (100 - effectiveWasiyatPct);
        list.push({
          id: "spouse",
          relation: spouseRelation,
          count: spouseCount,
          individualSharePct: spousePct / spouseCount,
          totalSharePct: spousePct,
          totalAmount: spouseAmt,
          individualAmount: spouseAmt / spouseCount,
          quranicFraction: spouseShare === 0.125 ? "1/8" : spouseShare === 0.25 ? "1/4" : "1/2",
          classification: "Sharer (Zawil-Furuz)",
          ruleNote: spouseRule,
        });
      }

      const poolAfterSpouse = faraidPool * (1 - spouseShare);
      const pctAfterSpouse = (1 - spouseShare) * (100 - effectiveWasiyatPct);

      // CLASS I HEIRS DISTRIBUTION
      if (hasClassI) {
        // Brothers & Sisters are completely excluded under Shia Class I rule!
        if (fullBrothersCount > 0 || fullSistersCount > 0) {
          list.push({
            id: "siblings_shia_excluded",
            relation: `Siblings (${fullBrothersCount} Brothers, ${fullSistersCount} Sisters)`,
            count: fullBrothersCount + fullSistersCount,
            individualSharePct: 0,
            totalSharePct: 0,
            totalAmount: 0,
            individualAmount: 0,
            quranicFraction: "0%",
            classification: "Excluded (Mahjub)",
            ruleNote: "Fundamental Shia Rule: Class I heirs (daughters/parents) completely exclude Class II heirs (brothers/sisters).",
          });
        }

        // Subcase A: Sons exist (Residuary division)
        if (hasSons) {
          let parentsShare = 0;
          if (fatherAlive) {
            parentsShare += 1 / 6;
            const fatherAmt = faraidPool * (1 / 6);
            const fatherPct = (1 / 6) * (100 - effectiveWasiyatPct);
            list.push({
              id: "father_shia",
              relation: "Father",
              count: 1,
              individualSharePct: fatherPct,
              totalSharePct: fatherPct,
              totalAmount: fatherAmt,
              individualAmount: fatherAmt,
              quranicFraction: "1/6",
              classification: "Sharer (Zawil-Furuz)",
              ruleNote: "Quran Surah An-Nisa 4:11 (1/6th Quranic share with children)",
            });
          }
          if (motherAlive) {
            parentsShare += 1 / 6;
            const motherAmt = faraidPool * (1 / 6);
            const motherPct = (1 / 6) * (100 - effectiveWasiyatPct);
            list.push({
              id: "mother_shia",
              relation: "Mother",
              count: 1,
              individualSharePct: motherPct,
              totalSharePct: motherPct,
              totalAmount: motherAmt,
              individualAmount: motherAmt,
              quranicFraction: "1/6",
              classification: "Sharer (Zawil-Furuz)",
              ruleNote: "Quran Surah An-Nisa 4:11 (1/6th Quranic share with children)",
            });
          }

          const remForChildren = faraidPool * (1 - spouseShare - parentsShare);
          const remPctForChildren = (1 - spouseShare - parentsShare) * (100 - effectiveWasiyatPct);
          const parts = sonsCount * 2 + daughtersCount * 1;
          const partAmt = remForChildren / parts;
          const partPct = remPctForChildren / parts;

          list.push({
            id: "sons_shia",
            relation: `Sons (${sonsCount})`,
            count: sonsCount,
            individualSharePct: partPct * 2,
            totalSharePct: partPct * 2 * sonsCount,
            totalAmount: partAmt * 2 * sonsCount,
            individualAmount: partAmt * 2,
            quranicFraction: `Residue (${sonsCount * 2}/${parts})`,
            classification: "Residuary (Asabah)",
            ruleNote: "Quran Surah An-Nisa 4:11 (2:1 ratio for sons and daughters)",
          });

          if (hasDaughters) {
            list.push({
              id: "daughters_shia",
              relation: `Daughters (${daughtersCount})`,
              count: daughtersCount,
              individualSharePct: partPct,
              totalSharePct: partPct * daughtersCount,
              totalAmount: partAmt * daughtersCount,
              individualAmount: partAmt,
              quranicFraction: `Residue (${daughtersCount}/${parts})`,
              classification: "Residuary (Asabah)",
              ruleNote: "Residuary share alongside brothers under Shia Class I rules.",
            });
          }
        }
        // Subcase B: Only Daughters (No sons)
        else if (hasDaughters) {
          // If only daughters and mother/father:
          const dFraction = daughtersCount === 1 ? 1 / 2 : 2 / 3;
          const mFraction = motherAlive ? 1 / 6 : 0;
          const fFraction = fatherAlive ? 1 / 6 : 0;

          const totalSharerRatio = dFraction + mFraction + fFraction;

          // Under Shia Law: NO AUL! Deficit falls solely on daughters.
          // Surplus (Radd) is returned proportionally to daughters and parents.
          adjustmentApplied = "radd";
          raddDetails = "Under Shia (Ithna-Ashari) law, residue returns (Radd) to the daughter(s) and parents. Brothers receive zero.";

          // Relative distribution of poolAfterSpouse
          const daughterRatio = dFraction / totalSharerRatio;
          const daughterTotalAmt = poolAfterSpouse * daughterRatio;
          const daughterTotalPct = pctAfterSpouse * daughterRatio;

          list.push({
            id: "daughters_shia",
            relation: daughtersCount === 1 ? "Daughter (Single)" : `Daughters (${daughtersCount})`,
            count: daughtersCount,
            individualSharePct: daughterTotalPct / daughtersCount,
            totalSharePct: daughterTotalPct,
            totalAmount: daughterTotalAmt,
            individualAmount: daughterTotalAmt / daughtersCount,
            quranicFraction: daughtersCount === 1 ? "1/2 + Shia Radd" : "2/3 + Shia Radd",
            classification: "Sharer (Zawil-Furuz)",
            ruleNote: "Under Shia law, takes fixed Quranic share plus proportionate return of all remaining residue.",
          });

          if (motherAlive) {
            const motherRatio = mFraction / totalSharerRatio;
            const motherAmt = poolAfterSpouse * motherRatio;
            const motherPct = pctAfterSpouse * motherRatio;
            list.push({
              id: "mother_shia",
              relation: "Mother",
              count: 1,
              individualSharePct: motherPct,
              totalSharePct: motherPct,
              totalAmount: motherAmt,
              individualAmount: motherAmt,
              quranicFraction: "1/6 + Shia Radd",
              classification: "Sharer (Zawil-Furuz)",
              ruleNote: "Takes 1/6th plus proportionate return under Shia Class I rules.",
            });
          }

          if (fatherAlive) {
            const fatherRatio = fFraction / totalSharerRatio;
            const fatherAmt = poolAfterSpouse * fatherRatio;
            const fatherPct = pctAfterSpouse * fatherRatio;
            list.push({
              id: "father_shia",
              relation: "Father",
              count: 1,
              individualSharePct: fatherPct,
              totalSharePct: fatherPct,
              totalAmount: fatherAmt,
              individualAmount: fatherAmt,
              quranicFraction: "1/6 + Shia Radd",
              classification: "Sharer (Zawil-Furuz)",
              ruleNote: "Takes 1/6th plus proportionate return under Shia Class I rules.",
            });
          }
        }
        // Subcase C: No children, only parents
        else {
          if (motherAlive && fatherAlive) {
            const motherAmt = poolAfterSpouse * (1 / 3);
            const motherPct = pctAfterSpouse * (1 / 3);
            const fatherAmt = poolAfterSpouse * (2 / 3);
            const fatherPct = pctAfterSpouse * (2 / 3);

            list.push({
              id: "mother_shia",
              relation: "Mother",
              count: 1,
              individualSharePct: motherPct,
              totalSharePct: motherPct,
              totalAmount: motherAmt,
              individualAmount: motherAmt,
              quranicFraction: "1/3",
              classification: "Sharer (Zawil-Furuz)",
              ruleNote: "Quran Surah An-Nisa 4:11 (1/3rd share when no children)",
            });

            list.push({
              id: "father_shia",
              relation: "Father",
              count: 1,
              individualSharePct: fatherPct,
              totalSharePct: fatherPct,
              totalAmount: fatherAmt,
              individualAmount: fatherAmt,
              quranicFraction: "2/3 (Residue)",
              classification: "Residuary (Asabah)",
              ruleNote: "Inherits entire remaining residue under Shia Class I rules.",
            });
          } else if (motherAlive) {
            list.push({
              id: "mother_shia",
              relation: "Mother",
              count: 1,
              individualSharePct: pctAfterSpouse,
              totalSharePct: pctAfterSpouse,
              totalAmount: poolAfterSpouse,
              individualAmount: poolAfterSpouse,
              quranicFraction: "100% of Class I",
              classification: "Sharer (Zawil-Furuz)",
              ruleNote: "Sole surviving Class I heir takes entire estate by return (Radd).",
            });
          } else if (fatherAlive) {
            list.push({
              id: "father_shia",
              relation: "Father",
              count: 1,
              individualSharePct: pctAfterSpouse,
              totalSharePct: pctAfterSpouse,
              totalAmount: poolAfterSpouse,
              individualAmount: poolAfterSpouse,
              quranicFraction: "100% of Class I",
              classification: "Residuary (Asabah)",
              ruleNote: "Sole surviving Class I heir takes entire estate.",
            });
          }
        }
      }
      // CLASS II HEIRS (No children, no parents)
      else if (fullBrothersCount > 0 || fullSistersCount > 0) {
        const parts = fullBrothersCount * 2 + fullSistersCount * 1;
        const partAmt = poolAfterSpouse / parts;
        const partPct = pctAfterSpouse / parts;

        if (fullBrothersCount > 0) {
          list.push({
            id: "brothers_shia",
            relation: `Full Brothers (${fullBrothersCount})`,
            count: fullBrothersCount,
            individualSharePct: partPct * 2,
            totalSharePct: partPct * 2 * fullBrothersCount,
            totalAmount: partAmt * 2 * fullBrothersCount,
            individualAmount: partAmt * 2,
            quranicFraction: `Residue (${fullBrothersCount * 2}/${parts})`,
            classification: "Residuary (Asabah)",
            ruleNote: "Inherit under Shia Class II rules in 2:1 ratio in absence of Class I heirs.",
          });
        }
        if (fullSistersCount > 0) {
          list.push({
            id: "sisters_shia",
            relation: `Full Sisters (${fullSistersCount})`,
            count: fullSistersCount,
            individualSharePct: partPct,
            totalSharePct: partPct * fullSistersCount,
            totalAmount: partAmt * fullSistersCount,
            individualAmount: partAmt,
            quranicFraction: `Residue (${fullSistersCount}/${parts})`,
            classification: "Residuary (Asabah)",
            ruleNote: "Inherit alongside brothers under Shia Class II rules.",
          });
        }
      }
    }

    return {
      heirs: list,
      adjustmentApplied,
      aulDetails,
      raddDetails,
    };
  }, [
    school,
    gender,
    faraidPool,
    effectiveWasiyatPct,
    wasiyatAmount,
    wasiyatToHeir,
    wivesCount,
    husbandPresent,
    sonsCount,
    daughtersCount,
    fatherAlive,
    motherAlive,
    fullBrothersCount,
    fullSistersCount,
  ]);

  // Copy helper
  const handleCopyClause = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedClauseIndex(index);
    setTimeout(() => setCopiedClauseIndex(null), 3000);
  };

  // Format currency in Indian numbering
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white antialiased">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Dark Navy Brand Canvas)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        {/* Decorative ambient gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>SHARIAT ACT, 1937 • SECTIONS 2 &amp; UNCODIFIED PRINCIPLES</span>
          </div>

          {/* H1 Title: Single H1 on page, 30-65 chars */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Muslim Inheritance &amp; Faraid Share Calculator India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate statutory Islamic inheritance shares among widows, daughters, sons, and siblings under Shariat Act, 1937. See how the 1/3rd Wasiyat bequest interacts with the 2/3rd Faraid estate.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <span>Calculate Islamic Shares</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartWill}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Sharia-Compliant Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Max 1/3rd</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                WASIYAT (WILL) BEQUEST CAP
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">12 Classes</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ZAWIL-FURUZ QURANIC SHARERS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sunni &amp; Shia</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                HANAFI &amp; ITHNA-ASHARI RULES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Exempt</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PROBATE UNDER SEC 213(2) ISA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE COLLAPSIBLE TOC (STICKY BELOW HEADER ON PHONES/TABLETS)
          ========================================================================= */}
      <div className="lg:hidden sticky top-[84px] sm:top-[88px] z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-y border-slate-200/80 px-3 sm:px-4 py-2 mt-4 sm:mt-6 mb-4 shadow-xs">
        <div className="relative max-w-7xl mx-auto">
          <button
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 shadow-xs text-xs font-mono tracking-wider uppercase text-slate-800 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#C65378] shrink-0" />
              <span className="font-bold text-[#C65378] shrink-0">TOC:</span>
              <span className="truncate text-slate-700">
                {currentActiveToc?.label}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                mobileTocOpen ? "rotate-180 text-[#C65378]" : ""
              }`}
            />
          </button>

          {mobileTocOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-3 z-40 max-h-[60vh] overflow-y-auto space-y-1">
              {TOC_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileTocOpen(false);
                      const el = document.getElementById(item.id);
                      if (el) {
                        const yOffset = -140;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                    className={`flex items-center px-3 py-2.5 rounded-xl text-xs font-mono tracking-[0.12em] uppercase transition-all ${
                      isActive
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-4 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <span
                      className={`mr-2.5 shrink-0 ${
                        isActive ? "w-4 h-[1.5px] bg-[#C65378]" : "w-2.5 h-[1px] bg-slate-300"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

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
                Governed under Muslim Personal Law (Shariat) Application Act, 1937, Section 213(2) of the Indian Succession Act, 1925, and Mulla&apos;s Principles of Mahomedan Law (Chapters VI–VIII).
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
                <span>EXECUTIVE BRIEF: MUSLIM SUCCESSION &amp; WASIYAT RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Shariat Act 1937 Precedence:</strong> Under Section 2 of the Muslim Personal Law (Shariat) Application Act, 1937, personal law governs all questions of Muslim intestate succession, completely superseding contrary customs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>1/3rd Testamentary Bequest Cap:</strong> A Muslim cannot bequeath more than one-third (1/3rd) of their net estate via Wasiyat (Will). In Sunni Hanafi law, bequests to legal heirs are void without unanimous post-death consent.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Probate Mandate:</strong> Under Section 213(2) of the Indian Succession Act, 1925, probate is completely exempt for Muslim Wills across India, including in Mumbai, Chennai, and Kolkata.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Sunni vs Shia Jurisprudence:</strong> Sunni Hanafi law divides the estate between Quranic Sharers (Zawil-Furuz) and Residuaries (Asabah), whereas Shia Ithna-Ashari law organizes blood heirs into three mutually exclusive consanguineous classes.
                  </span>
                </li>
              </ul>
            </div>
            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Framework: Shariat Act, 1937 &amp; Mulla Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In India, the succession of a deceased Muslim is governed primarily by personal law rather than the general
                  Indian Succession Act, 1925. Under Section 2 of the <strong>Muslim Personal Law (Shariat) Application Act,
                  1937</strong>, all questions relating to intestate succession, special property of females, marriage, dower
                  (Mahr), gifts (Hiba), and trusts are governed strictly by the rule of decision under Muslim Personal Law (Shariat).
                </p>
                <p>
                  Unlike Hindu succession, which was comprehensively codified in the Hindu Succession Act, 1956, Muslim
                  succession remains largely uncodified statutory personal law. The rules recognized and enforced by the
                  Supreme Court of India and state High Courts originate from authoritative classical treatises, foremost among
                  them being <strong>Sir Dinshaw Fardunji Mulla&apos;s Principles of Mahomedan Law</strong> (Chapters VI through XIII).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                    <h3 className="font-bold text-[#172228] flex items-center gap-2 text-sm sm:text-base">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>When Muslim Personal Law Applies</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Applies automatically to any person professing the religion of Islam who dies domiciled in India. Covers
                      both ancestral properties and self-acquired movable and immovable assets.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl border border-amber-200/90 p-5 shadow-xs space-y-2">
                    <h3 className="font-bold text-amber-900 flex items-center gap-2 text-sm sm:text-base">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>The Special Marriage Act Exception</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      If a Muslim marries under the Special Marriage Act, 1954 to another person (or registers their Nikah under
                      Section 15 of that Act), Section 21 dictates that succession to their estate is governed by the Indian
                      Succession Act, 1925, and NOT by Muslim Personal Law.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE INHERITANCE CALCULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Muslim Inheritance &amp; Wasiyat Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Configure your school of jurisprudence, estate valuation, deductions, and surviving family heirs below to compute precise Quranic shares, residuary allocations, and Wasiyat bequests.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
{/* Preset Scenarios */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Quick Scenarios:</span>
                  <button
                    onClick={() => applyPreset("daughter_brothers")}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-300 transition-colors"
                  >
                    Daughters + Brothers
                  </button>
                  <button
                    onClick={() => applyPreset("standard_family")}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-300 transition-colors"
                  >
                    1 Son + 2 Daughters
                  </button>
                  <button
                    onClick={() => applyPreset("aul_scenario")}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-300 transition-colors"
                  >
                    Aul Case
                  </button>
                  <button
                    onClick={() => applyPreset("shia_daughter_only")}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-300 transition-colors"
                  >
                    Shia Class I
                  </button>
                </div>

              {/* Calculator Form Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                {/* Left Column: Configuration Inputs */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Step 1: School of Law & Deceased Gender */}
                  <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-4">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
                      School of Jurisprudence &amp; Deceased Profile
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* School Toggle */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          School of Muslim Law
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setSchool("sunni")}
                            className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                              school === "sunni"
                                ? "bg-emerald-700 text-white border-emerald-800 shadow-sm"
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            Sunni (Hanafi)
                          </button>
                          <button
                            type="button"
                            onClick={() => setSchool("shia")}
                            className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                              school === "shia"
                                ? "bg-emerald-700 text-white border-emerald-800 shadow-sm"
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            Shia (Ithna-Ashari)
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1.5">
                          {school === "sunni"
                            ? "Major school in India. Uses Zawil-Furuz, Asabah, Aul, and Radd."
                            : "Uses 3 consanguineous classes (Nasab). Class I excludes brothers."}
                        </p>
                      </div>

                      {/* Deceased Gender */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Deceased Person
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setGender("male");
                              if (wivesCount === 0) setWivesCount(1);
                            }}
                            className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                              gender === "male"
                                ? "bg-[#172228] text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            Male (Husband)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setGender("female");
                              setHusbandPresent(true);
                            }}
                            className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                              gender === "female"
                                ? "bg-[#172228] text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            Female (Wife)
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1.5">
                          Determines whether surviving spouse is Wife (1/8 or 1/4) or Husband (1/4 or 1/2).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Financial Valuation & Statutory Deductions */}
                  <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-4">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">2</span>
                      Gross Estate &amp; Priority Statutory Deductions
                    </h3>

                    <div className="space-y-4">
                      {/* Gross Estate */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs font-bold text-slate-700 uppercase">
                            Gross Estate Value (Movable &amp; Immovable)
                          </label>
                          <span className="text-sm font-extrabold text-[#172228]">{formatINR(grossEstate)}</span>
                        </div>
                        <input
                          type="range"
                          min="500000"
                          max="50000000"
                          step="100000"
                          value={grossEstate}
                          onChange={(e) => setGrossEstate(Number(e.target.value))}
                          className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                        />
                      </div>

                      {/* Three-column inputs for prior statutory deductions */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">
                            Funeral &amp; Burial (Tajheez)
                          </label>
                          <input
                            type="number"
                            value={funeralExpenses}
                            onChange={(e) => setFuneralExpenses(Math.max(0, Number(e.target.value)))}
                            className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">
                            Debts to Creditors (Duyun)
                          </label>
                          <input
                            type="number"
                            value={debts}
                            onChange={(e) => setDebts(Math.max(0, Number(e.target.value)))}
                            className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                        {gender === "male" && wivesCount > 0 ? (
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                              Unpaid Mahr (Dower to Wife)
                            </label>
                            <input
                              type="number"
                              value={unpaidMahr}
                              onChange={(e) => setUnpaidMahr(Math.max(0, Number(e.target.value)))}
                              className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                          </div>
                        ) : (
                          <div className="opacity-50">
                            <label className="block text-xs font-semibold text-slate-400 mb-1">
                              Unpaid Mahr
                            </label>
                            <div className="px-3 py-2 rounded-xl text-xs bg-slate-100 border border-slate-200 text-slate-500">
                              N/A for Female Deceased
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Net Estate Banner */}
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-emerald-900">
                          Net Inheritable Estate (Gross minus Deductions):
                        </span>
                        <span className="font-extrabold text-emerald-950 text-base">{formatINR(netEstate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Wasiyat (Will / Bequest) Slider */}
                  <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-4">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">3</span>
                      Wasiyat (Testamentary Bequest / Will)
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs font-bold text-slate-700 uppercase">
                            Wasiyat Bequest Percentage:
                          </label>
                          <span className="text-sm font-extrabold text-[#C65378]">
                            {effectiveWasiyatPct.toFixed(1)}% ({formatINR(wasiyatAmount)})
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={allowExceedOneThird ? 100 : 33.33}
                          step="1"
                          value={wasiyatPct}
                          onChange={(e) => setWasiyatPct(Number(e.target.value))}
                          className="w-full accent-[#C65378] cursor-pointer h-2 bg-slate-200 rounded-lg"
                        />
                        <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                          <span>0% (No Wasiyat)</span>
                          <span className="font-semibold text-slate-700">1/3rd Sharia Cap (33.33%)</span>
                          {allowExceedOneThird && <span>100% (Full Will)</span>}
                        </div>
                      </div>

                      {/* Wasiyat Checkboxes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={wasiyatToHeir}
                            onChange={(e) => setWasiyatToHeir(e.target.checked)}
                            className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <div>
                            <span className="font-bold text-slate-800 block">Bequest is to a Legal Heir</span>
                            <span className="text-[11px] text-slate-500">
                              {school === "sunni"
                                ? "Sunni law requires consent of all other heirs after death."
                                : "Shia law allows 1/3rd to heir without other heirs' consent."}
                            </span>
                          </div>
                        </label>

                        <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={allowExceedOneThird}
                            onChange={(e) => setAllowExceedOneThird(e.target.checked)}
                            className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
                          />
                          <div>
                            <span className="font-bold text-slate-800 block">Exceed 1/3rd Cap</span>
                            <span className="text-[11px] text-slate-500">
                              Valid only if all legal heirs grant consent after testator&apos;s death.
                            </span>
                          </div>
                        </label>
                      </div>

                      {/* Remaining Faraid Pool */}
                      <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-amber-900">
                          Remaining Pool for Faraid (Quranic Inheritance):
                        </span>
                        <span className="font-extrabold text-amber-950 text-base">{formatINR(faraidPool)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Surviving Legal Heirs */}
                  <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-4">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">4</span>
                      Surviving Legal Heirs at Time of Death
                    </h3>

                    <div className="space-y-4">
                      {/* Spouse Configuration */}
                      {gender === "male" ? (
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Surviving Wives (0 to 4)
                          </label>
                          <div className="flex items-center gap-2">
                            {[0, 1, 2, 3, 4].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setWivesCount(num)}
                                className={`w-10 h-10 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                                  wivesCount === num
                                    ? "bg-emerald-700 text-white border-emerald-800 shadow-sm"
                                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Surviving Husband
                          </label>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setHusbandPresent(true)}
                              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                                husbandPresent
                                  ? "bg-emerald-700 text-white border-emerald-800 shadow-sm"
                                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              Yes (Alive)
                            </button>
                            <button
                              type="button"
                              onClick={() => setHusbandPresent(false)}
                              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                                !husbandPresent
                                  ? "bg-slate-700 text-white border-slate-800 shadow-sm"
                                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              No (Predeceased)
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Children: Sons and Daughters */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Number of Sons
                          </label>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {[0, 1, 2, 3, 4, 5].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setSonsCount(num)}
                                className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                                  sonsCount === num
                                    ? "bg-emerald-700 text-white border-emerald-800 shadow-sm"
                                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Number of Daughters
                          </label>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {[0, 1, 2, 3, 4, 5].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setDaughtersCount(num)}
                                className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                                  daughtersCount === num
                                    ? "bg-emerald-700 text-white border-emerald-800 shadow-sm"
                                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Parents: Father and Mother */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Father Alive?
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setFatherAlive(true)}
                              className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                                fatherAlive
                                  ? "bg-emerald-700 text-white border-emerald-800"
                                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setFatherAlive(false)}
                              className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                                !fatherAlive
                                  ? "bg-slate-700 text-white border-slate-800"
                                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              No
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Mother Alive?
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setMotherAlive(true)}
                              className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                                motherAlive
                                  ? "bg-emerald-700 text-white border-emerald-800"
                                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setMotherAlive(false)}
                              className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                                !motherAlive
                                  ? "bg-slate-700 text-white border-slate-800"
                                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Siblings: Brothers and Sisters */}
                      <div className="pt-2 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-bold text-slate-700 uppercase">
                            Siblings of Deceased (Brothers &amp; Sisters)
                          </label>
                          <span className="text-[11px] text-slate-500">
                            Relevant if no son or father alive
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <span className="block text-xs text-slate-600 mb-1">Full Brothers</span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {[0, 1, 2, 3, 4].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => setFullBrothersCount(num)}
                                  className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                                    fullBrothersCount === num
                                      ? "bg-emerald-700 text-white border-emerald-800"
                                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="block text-xs text-slate-600 mb-1">Full Sisters</span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {[0, 1, 2, 3, 4].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => setFullSistersCount(num)}
                                  className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                                    fullSistersCount === num
                                      ? "bg-emerald-700 text-white border-emerald-800"
                                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reset & Quick Print Action Strip */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={handleResetCalculator}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Default Values</span>
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Calculation Report</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Dynamic Real-Time Results Card */}
                <div className="lg:col-span-5 space-y-6">
                  <div
                    ref={printRef}
                    className="bg-[#172228] text-white p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-xl relative"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                      <div>
                        <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                          Statutory Result
                        </div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                          Inheritance Distribution Sheet
                        </h3>
                      </div>
                      <button
                        onClick={() => window.print()}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 text-xs flex items-center gap-1.5"
                        title="Print / Save PDF Report"
                      >
                        <Printer className="w-4 h-4 text-amber-400" />
                        Print / PDF
                      </button>
                    </div>

                    {/* Summary Matrix */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5">
                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <div className="text-[11px] text-slate-400">Net Inheritable Estate</div>
                        <div className="text-sm sm:text-base md:text-lg font-bold text-white mt-0.5 truncate">
                          {formatINR(netEstate)}
                        </div>
                      </div>
                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <div className="text-[11px] text-slate-400">Wasiyat (Bequest)</div>
                        <div className="text-sm sm:text-base md:text-lg font-bold text-[#C65378] mt-0.5 truncate">
                          {formatINR(wasiyatAmount)}
                        </div>
                      </div>
                    </div>

                    {/* Special Adjustments Notice */}
                    {calculationResults.adjustmentApplied === "aul" && (
                      <div className="mb-4 p-3 rounded-xl bg-amber-950/60 border border-amber-600/50 text-xs text-amber-200">
                        <div className="font-bold flex items-center gap-1.5 text-amber-300">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Doctrine of Aul Applied
                        </div>
                        <p className="mt-1 text-[11px] leading-relaxed text-amber-200/90">
                          {calculationResults.aulDetails}
                        </p>
                      </div>
                    )}

                    {calculationResults.adjustmentApplied === "radd" && (
                      <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-600/50 text-xs text-emerald-200">
                        <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Doctrine of Radd Applied
                        </div>
                        <p className="mt-1 text-[11px] leading-relaxed text-emerald-200/90">
                          {calculationResults.raddDetails}
                        </p>
                      </div>
                    )}

                    {/* Visual Proportional Progress Bar */}
                    <div className="mb-5">
                      <div className="text-[11px] text-slate-400 mb-1.5 flex justify-between">
                        <span>Estate Allocation Breakdown</span>
                        <span>100% Total</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex">
                        {calculationResults.heirs.map((heir, idx) => {
                          const colors = [
                            "bg-[#C65378]",
                            "bg-emerald-500",
                            "bg-cyan-500",
                            "bg-amber-400",
                            "bg-purple-500",
                            "bg-indigo-400",
                            "bg-rose-400",
                          ];
                          const color = colors[idx % colors.length];
                          return (
                            <div
                              key={heir.id}
                              style={{ width: `${Math.max(0, heir.totalSharePct)}%` }}
                              className={`${color} h-full transition-all duration-300`}
                              title={`${heir.relation}: ${heir.totalSharePct.toFixed(1)}%`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Detailed Heir Shares List */}
                    <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                      {calculationResults.heirs.map((heir) => (
                        <div
                          key={heir.id}
                          className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                                {heir.relation}
                                <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                  {heir.quranicFraction}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                Class: {heir.classification}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-sm font-extrabold text-emerald-400">
                                {formatINR(heir.totalAmount)}
                              </div>
                              <div className="text-[11px] text-slate-300 font-semibold">
                                {heir.totalSharePct.toFixed(2)}%
                              </div>
                            </div>
                          </div>

                          {heir.count > 1 && (
                            <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                              <span>Per Person ({heir.count} heirs):</span>
                              <span className="font-bold text-slate-200">
                                {formatINR(heir.individualAmount)} ({heir.individualSharePct.toFixed(2)}% each)
                              </span>
                            </div>
                          )}

                          <div className="mt-1.5 text-[10.5px] text-slate-400 italic">
                            {heir.ruleNote}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Conversion CTA Box inside Result Card */}
                    <div className="mt-6 pt-5 border-t border-slate-800 text-center space-y-3">
                      <div className="text-xs text-slate-300">
                        Want to protect your family or execute a challenge-proof Sharia Will?
                      </div>
                      <button
                        onClick={handleStartWill}
                        className="w-full py-3 px-4 rounded-xl bg-[#C65378] hover:bg-[#a13c5d] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Draft Your Legal Will (₹1,499)
                      </button>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-1 text-xs text-amber-300 hover:text-amber-200 font-medium transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        Book High Court Advocate Consultation &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
            {/* VISUAL INFOGRAPHIC BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL BLUEPRINT: MUSLIM INHERITANCE &amp; WASIYAT RULES</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Shariat Act 1937</span>
              </div>
              <div className="relative w-full aspect-[1376/768] rounded-xl overflow-hidden bg-slate-50">
                <Image
                  src="/images/muslim-inheritance-faraid-wasiyat-calculator-og.jpg"
                  alt="Muslim Inheritance Faraid and Wasiyat Calculator Statutory Guide India"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>
            {/* SECTION 3: ESTATE ORDER */}
            <section id="estate-order" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>ESTATE ADMINISTRATION SEQUENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Estate Order: Funeral, Debts, Mahr &amp; Net Residue
              </h3>

              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Section 217 of Mulla&apos;s Principles of Mahomedan Law and established Indian court rulings, the
                  estate of a deceased Muslim is not distributed to heirs immediately. It must pass through four strict
                  statutory priorities in sequential order before any heir receives a single rupee.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                    <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs mb-2">
                      1
                    </div>
                    <h3 className="font-bold text-[#172228] text-sm">Funeral Expenses (Tajheez)</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Burial, shroud, and grave costs suitable to the deceased&apos;s status, excluding extravagant ceremonies.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                    <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs mb-2">
                      2
                    </div>
                    <h3 className="font-bold text-[#172228] text-sm">Debts to Creditors (Duyun)</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      All commercial, personal, bank loans, and statutory dues must be cleared in full from the gross estate.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-rose-200/90 p-5 shadow-xs space-y-2">
                    <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs mb-2">
                      3
                    </div>
                    <h3 className="font-bold text-rose-950 text-sm">Unpaid Mahr (Dower)</h3>
                    <p className="text-xs text-rose-900 leading-relaxed">
                      Unpaid prompt or deferred dower ranks as an unsecured priority debt against the estate before heirs inherit.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-emerald-200/90 p-5 shadow-xs space-y-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs mb-2">
                      4
                    </div>
                    <h3 className="font-bold text-emerald-950 text-sm">Wasiyat (Max 1/3rd)</h3>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      Valid bequests up to 1/3rd of the remaining net estate are carved out before dividing the Faraid pool.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* SECTION 4: THE 1/3RD WASIYAT RULE */}
            <section id="wasiyat-rule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Percent className="w-4 h-4" />
                <span>TESTAMENTARY LIMITS IN ISLAM</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. The 1/3rd Wasiyat Rule: Testamentary Bequest Limits
              </h3>

              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Muslim personal law, a person does not have unrestricted freedom of testation. Unlike Hindu or English
                  common law where a testator can Will away 100% of their property to anyone, an Indian Muslim can dispose
                  of at most <strong>one-third (1/3rd) of their net estate</strong> by Will (Wasiyat).
                </p>
                <p>
                  The remaining <strong>two-thirds (2/3rds)</strong> belongs inviolably to the Quranic legal heirs as defined
                  under Faraid. Any bequest exceeding 1/3rd is legally void (inchoate) unless all legal heirs grant express or
                  implied consent after the death of the testator.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                    <h3 className="font-extrabold text-[#172228] text-base mb-2">
                      Sunni (Hanafi) Bequest-to-Heir Rule
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Based on the Prophetic tradition <em>&quot;La wasiyata li warith&quot;</em> (There is no bequest to an heir),
                      a Sunni Muslim cannot bequeath even a single rupee within the 1/3rd limit to a legal heir without the
                      unanimous consent of all other legal heirs given after the testator&apos;s death. A bequest to a non-heir,
                      foster child, or charitable trust is valid without anyone&apos;s consent.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-emerald-200/90 p-5 shadow-xs space-y-2">
                    <h3 className="font-extrabold text-emerald-950 text-base mb-2">
                      Shia (Ithna-Ashari) Bequest-to-Heir Privilege
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                      Under Shia Ithna-Ashari law, as codified in Section 117 of Mulla, a testator can freely bequeath up to
                      one-third of their estate to <strong>any person, including a legal heir</strong>, without requiring the
                      consent of other heirs. This allows a Shia parent to bequeath an extra 1/3rd to a daughter or dependent
                      spouse outright.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* SECTION 5: SUNNI VS SHIA RULES COMPARED */}
            <section id="sunni-vs-shia" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>JURISPRUDENCE BREAKDOWN</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Sunni Hanafi vs Shia Ithna Ashari Rules Compared
              </h3>

              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The distinction between Sunni Hanafi and Shia Ithna-Ashari succession law is one of the most critical and
                  misunderstood areas in Indian estate planning. Review this side-by-side statutory comparison matrix:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <table className="w-full min-w-[560px] text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white uppercase text-[11px] font-black tracking-wider">
                      <tr>
                        <th className="p-3.5">Succession Principle</th>
                        <th className="p-3.5 text-amber-300">Sunni (Hanafi) Law</th>
                        <th className="p-3.5 text-emerald-300">Shia (Ithna-Ashari) Law</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">Bequest to an Heir</td>
                        <td className="p-3.5 text-slate-700">
                          Invalid unless all other legal heirs consent after testator&apos;s death.
                        </td>
                        <td className="p-3.5 text-emerald-950 bg-emerald-50/30 font-medium">
                          Valid up to 1/3rd of net estate without needing any heir&apos;s consent.
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">Classification of Heirs</td>
                        <td className="p-3.5 text-slate-700">
                          3 Classes: Sharers (Zawil-Furuz), Residuaries (Asabah), Distant Kindred.
                        </td>
                        <td className="p-3.5 text-emerald-950 bg-emerald-50/30 font-medium">
                          3 Classes by blood (Nasab): Class I (Parents &amp; Children), Class II (Grandparents &amp; Siblings), Class III (Uncles/Aunts).
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">Daughter vs Brothers</td>
                        <td className="p-3.5 text-slate-700">
                          Daughters take fixed 1/2 or 2/3. Remaining residue passes to deceased&apos;s brothers.
                        </td>
                        <td className="p-3.5 text-emerald-950 bg-emerald-50/30 font-medium">
                          Daughter (Class I) completely excludes brothers (Class II) from inheriting any share.
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">Doctrine of Aul (Increase)</td>
                        <td className="p-3.5 text-slate-700">
                          Recognized. Denominator increased; all Quranic sharers suffer proportionate reduction.
                        </td>
                        <td className="p-3.5 text-emerald-950 bg-emerald-50/30 font-medium">
                          Not recognized. Deficit falls exclusively upon daughters or full sisters.
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">Childless Widow Land Rights</td>
                        <td className="p-3.5 text-slate-700">
                          Inherits 1/4th of all assets, including agricultural and residential land.
                        </td>
                        <td className="p-3.5 text-emerald-950 bg-emerald-50/30 font-medium">
                          Inherits value of trees/buildings, but no direct share in the corpus of land.
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">Primogeniture (Habua)</td>
                        <td className="p-3.5 text-slate-700">
                          Not recognized. All sons inherit equally as residuaries.
                        </td>
                        <td className="p-3.5 text-emerald-950 bg-emerald-50/30 font-medium">
                          Eldest son is entitled to father&apos;s Quran, sword, ring, and clothes (Habua).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            {/* SECTION 6: QURANIC SHARERS */}
            <section id="quranic-sharers" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>FIXED QURANIC FRACTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Quranic Sharers: Zawil Furuz Fixed Portions
              </h3>

              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Sunni Islamic jurisprudence, there are 12 primary relations recognized as <strong>Quranic Sharers
                  (Zawil-Furuz)</strong> whose fractional shares are specifically ordained in Surah An-Nisa of the Holy Quran.
                  Sharers are satisfied first out of the net Faraid pool:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1.5">
                    <div className="font-bold text-[#172228] text-sm">Wife / Wives</div>
                    <div className="text-xs text-emerald-700 font-bold">1/8 (with children) or 1/4 (no children)</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Multiple wives divide the 1/8th or 1/4th equally among themselves.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1.5">
                    <div className="font-bold text-[#172228] text-sm">Husband</div>
                    <div className="text-xs text-emerald-700 font-bold">1/4 (with children) or 1/2 (no children)</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Takes 1/4th of deceased wife&apos;s estate if she left children; 1/2 if no children.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1.5">
                    <div className="font-bold text-[#172228] text-sm">Mother</div>
                    <div className="text-xs text-emerald-700 font-bold">1/6 (children/2+ siblings) or 1/3 (default)</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Reduced from 1/3 to 1/6 if deceased left children or two or more brothers/sisters.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1.5">
                    <div className="font-bold text-[#172228] text-sm">Father</div>
                    <div className="text-xs text-emerald-700 font-bold">1/6 as Sharer + Residuary</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Takes 1/6th as Sharer when sons exist. Takes 1/6th + residue with daughters; pure residue if no children.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1.5">
                    <div className="font-bold text-[#172228] text-sm">Daughter (No Sons)</div>
                    <div className="text-xs text-emerald-700 font-bold">1/2 (single) or 2/3 (two or more)</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Single daughter takes half; two or more daughters share two-thirds equally.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1.5">
                    <div className="font-bold text-[#172228] text-sm">Full Sister (No Children/Brothers)</div>
                    <div className="text-xs text-emerald-700 font-bold">1/2 (single) or 2/3 (two or more)</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Inherits Quranic quota only in absence of child, grandchild, father, or full brother.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* SECTION 7: RESIDUARIES (ASABAH) */}
            <section id="residuaries-asabah" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>RESIDUE DISTRIBUTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Residuaries: Asabah Inheritance &amp; Male-Female Ratio
              </h3>

              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Heirs who take the balance remaining after Quranic Sharers receive their prescribed portions are known as
                  <strong>Residuaries (Asabah)</strong>. If there are no Sharers, Residuaries take the entire estate.
                </p>
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                    The 2 to 1 Male-to-Female Inheritance Ratio Explained
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Surah An-Nisa 4:11, where both male and female children survive, the son converts the daughter from a
                    Quranic Sharer into a Residuary in another&apos;s right (<em>Asabah bi-Ghayriha</em>). The residue is divided
                    so that each son receives double the portion of each daughter. In classical Islamic jurisprudence, this
                    differential is legally grounded in the husband and son&apos;s mandatory statutory duty of maintenance
                    (<em>Nafaqah</em>) towards the family, whereas female heirs retain absolute separate ownership of their
                    inheritance and Mahr without any legal obligation to contribute to household expenses.
                  </p>
                </div>
              </div>
            </section>
            {/* SECTION 8: DAUGHTER DILEMMA */}
            <section id="daughter-dilemma" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>CRITICAL SUCCESSION SCENARIO</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. The Daughter-Only Dilemma: Agnatic Heirs &amp; Solutions
              </h3>

              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  One of the most frequent legal queries faced by advocates at AMA Legal Solutions occurs when a Sunni Muslim
                  dies leaving only daughters and no sons. Under Sunni (Hanafi) law:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                  <li>A single daughter takes exactly <strong>1/2 (50%)</strong> of the Faraid estate.</li>
                  <li>Two or more daughters take a collective <strong>2/3rds (66.67%)</strong> shared equally.</li>
                  <li>
                    The remaining <strong>1/2 or 1/3rd</strong> passes by agnatic right to the deceased&apos;s father, or in his
                    absence, to the <strong>deceased&apos;s full brothers and paternal uncles</strong>!
                  </li>
                </ul>
                <p>
                  In many contemporary Indian families, parents do not wish ancestral or hard-earned residential homes to be
                  co-owned by distant uncles or estranged brothers. How do experienced Indian advocates resolve this?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-2xl border border-emerald-200/90 p-5 shadow-xs space-y-2">
                    <h3 className="font-bold text-emerald-950 text-sm">Strategy 1: Lifetime Gift (Hiba)</h3>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      Execute a registered gift deed during lifetime. Muslim law places zero restrictions on lifetime gifts; you can gift 100% of property to daughters.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl border border-cyan-200/90 p-5 shadow-xs space-y-2">
                    <h3 className="font-bold text-cyan-950 text-sm">Strategy 2: 1/3rd Wasiyat Bequest</h3>
                    <p className="text-xs text-cyan-900 leading-relaxed">
                      Bequeath 1/3rd of the estate through a Will to a trust or grandchild, significantly reducing the residual share passing to brothers.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* SECTION 9: DOCTRINE OF AUL & RADD */}
            <section id="aul-and-radd" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Percent className="w-4 h-4" />
                <span>MATHEMATICAL BALANCES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Mathematical Adjustments: Doctrine of Aul &amp; Radd
              </h3>

              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Because Quranic shares are prescribed as distinct fractions (1/8, 1/4, 1/2, 2/3, 1/6, 1/3), their mathematical
                  sum occasionally exceeds unity (1) or falls short when no residuaries exist. Islamic jurisprudence resolves this
                  through two sophisticated doctrines:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                  <div className="bg-white rounded-2xl border border-amber-200/90 p-5 shadow-xs space-y-2">
                    <h3 className="font-bold text-amber-950 text-base">Doctrine of Aul (Increase / Proportional Reduction)</h3>
                    <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                      Applies when the sum of fractions exceeds 1. Example: Husband (1/4 = 3/12), 2 Daughters (2/3 = 8/12),
                      Mother (1/6 = 2/12), Father (1/6 = 2/12). Sum = 15/12. Under Aul, the base increases from 12 to 15:
                    </p>
                    <ul className="text-xs text-amber-950 space-y-1 font-medium list-disc pl-4">
                      <li>Husband: 3/15 (20%)</li>
                      <li>2 Daughters: 8/15 (53.33% total, 26.67% each)</li>
                      <li>Mother: 2/15 (13.33%)</li>
                      <li>Father: 2/15 (13.33%)</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl border border-emerald-200/90 p-5 shadow-xs space-y-2">
                    <h3 className="font-bold text-emerald-950 text-base">Doctrine of Radd (Return / Proportional Increase)</h3>
                    <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                      Applies when the sum of fractions is less than 1 and no residuaries exist. Example: Mother (1/6) + 1 Daughter (1/2 = 3/6).
                      Sum = 4/6. The remaining 2/6 returns proportionally to the blood sharers:
                    </p>
                    <ul className="text-xs text-emerald-950 space-y-1 font-medium list-disc pl-4">
                      <li>Daughter receives 3/4 (75% of estate)</li>
                      <li>Mother receives 1/4 (25% of estate)</li>
                      <li>Surviving spouse does not participate in classical Radd if blood heirs exist.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            {/* SECTION 10: LIFETIME GIFT (HIBA) VS WILL */}
            <section id="hiba-vs-will" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>STRATEGIC ESTATE PLANNING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Lifetime Gift vs Will: Hiba for Complete Ownership
              </h3>

              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many Indian Muslims mistakenly assume that a Will can transfer 100% of their property to a beloved child. As
                  explained, the 1/3rd cap and prohibition against bequests to heirs make this impossible through a testamentary
                  Will alone. To pass complete ownership, Indian Muslims utilize <strong>Hiba (Gift)</strong> during their lifetime:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <table className="w-full min-w-[560px] text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white uppercase text-[11px] font-black tracking-wider">
                      <tr>
                        <th className="p-3.5">Parameter</th>
                        <th className="p-3.5 text-amber-300">Lifetime Gift (Hiba)</th>
                        <th className="p-3.5 text-rose-300">Will (Wasiyat)</th>
                        <th className="p-3.5 text-cyan-300">Intestate Succession (Faraid)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">Property Quantum</td>
                        <td className="p-3.5 font-semibold text-emerald-700">100% (No limits)</td>
                        <td className="p-3.5 text-slate-700">Max 1/3rd without consent</td>
                        <td className="p-3.5 text-slate-700">100% divided in fixed shares</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">When Operative</td>
                        <td className="p-3.5 text-slate-700">Immediately during lifetime</td>
                        <td className="p-3.5 text-slate-700">Only upon death of testator</td>
                        <td className="p-3.5 text-slate-700">Immediately upon death</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">Can Gift to Legal Heir?</td>
                        <td className="p-3.5 font-semibold text-emerald-700">Yes, 100% valid</td>
                        <td className="p-3.5 text-slate-700">Requires other heirs&apos; consent (Sunni)</td>
                        <td className="p-3.5 text-slate-700">Fixed statutory percentages</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">Revocability</td>
                        <td className="p-3.5 text-slate-700">Irrevocable once possession delivered</td>
                        <td className="p-3.5 font-semibold text-emerald-700">100% revocable anytime during life</td>
                        <td className="p-3.5 text-slate-700">Irrevocable statutory law</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            {/* SECTION 11: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>ESTATE LIQUIDATION PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Step-by-Step SOP: Settling a Muslim Estate in India
              </h3>

              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                      Obtain Municipal Death Certificate &amp; Legal Heir Certificate
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Apply to the municipal corporation or Revenue Tehsildar / Sub-Divisional Magistrate (SDM) with an
                      affidavit detailing all surviving legal heirs according to Muslim Personal Law.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                      Liquidate Funeral Costs &amp; Discharge Debts (Including Mahr)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Pay burial bills and settle outstanding debts. The widow must be paid her unpaid Mahr amount from estate
                      funds before any heir divides remaining assets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                      Verify and Execute 1/3rd Wasiyat (Will)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Check if the deceased left an executed Wasiyat. If within 1/3rd to a non-heir, transfer the bequest
                      immediately. If to an heir (under Sunni law), obtain written consent from all other legal heirs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                      Divide Remaining Faraid Estate &amp; File for Property Mutation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Submit the Legal Heir Certificate and inheritance computation sheet to the Sub-Registrar and Municipal
                      Revenue Office to mutate land records, electricity meters, and society shares into the names of all heirs.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* SECTION 12: SUCCESSION CERTIFICATE */}
            <section id="succession-certificate" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>COURT INSTRUMENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Succession Certificate vs Letters of Administration
              </h3>

              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Section 213(2) of the Indian Succession Act, 1925, Muslims are explicitly exempt from the mandatory
                  probate requirement across all Indian jurisdictions, including Mumbai, Kolkata, and Chennai. However, banks
                  and registrars frequently require court certificates for high-value asset transmission:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                      Succession Certificate (Sec 370-390 ISA)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Required for movable securities such as bank fixed deposits, mutual funds, demat shares, and government
                      bonds when financial institutions refuse to release funds based on a simple heir certificate. Court fee
                      ranges from 2% to 6% depending on the state.
                    </p>
                    <Link
                      href="/tools/succession-certificate-court-fee-calculator"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] pt-1 hover:underline"
                    >
                      <span>Check State Court Fees with Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                      Letters of Administration (Sec 218 ISA)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Granted by a District Court or High Court to administer both movable and immovable assets when substantial
                      disputes arise between legal heirs or when complex properties across multiple states must be managed.
                    </p>
                    <Link
                      href="/tools/probate-checker"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] pt-1 hover:underline"
                    >
                      <span>Check Court Requirement with Probate Checker</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            {/* SECTION 13: READY-TO-USE LEGAL CLAUSES */}
            <section id="legal-clauses" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Copy className="w-4 h-4" />
                <span>ADVOCATE-DRAFTED LEGAL CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Copy-Paste Legal Wasiyat Clauses &amp; Heir Consent
              </h3>

              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use these standard legal clauses in your Sharia-compliant Will or estate settlement deed:
              </p>

              <div className="space-y-4 mt-6">
                {/* Clause 1: 1/3rd Bequest Clause */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
                      Clause 1: Standard 1/3rd Wasiyat Bequest to Non-Heir / Charity
                    </span>
                    <button
                      onClick={() =>
                        handleCopyClause(
                          `I, [Testator Name], hereby declare and bequeath out of my own free will that a portion not exceeding one-third (1/3rd) of my net estate (after deduction of all funeral expenses, statutory debts, and unpaid Mahr) shall be bequeathed absolutely to [Name of Non-Heir / Charitable Trust / Ward]. This bequest is strictly within the testamentary limits ordained by the Muslim Personal Law (Shariat) Application Act, 1937, and does not require the consent of any legal heir.`,
                          1
                        )
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                    >
                      {copiedClauseIndex === 1 ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Clause
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs text-slate-800 whitespace-pre-wrap break-words font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-x-auto">
                    {`I, [Testator Name], hereby declare and bequeath out of my own free will that a portion not exceeding one-third (1/3rd) of my net estate (after deduction of all funeral expenses, statutory debts, and unpaid Mahr) shall be bequeathed absolutely to [Name of Non-Heir / Charitable Trust / Ward]. This bequest is strictly within the testamentary limits ordained by the Muslim Personal Law (Shariat) Application Act, 1937, and does not require the consent of any legal heir.`}
                  </pre>
                </div>

                {/* Clause 2: Heir Consent Clause (Sunni) */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
                      Clause 2: Post-Death Heir Consent Clause (Sunni Hanafi Law)
                    </span>
                    <button
                      onClick={() =>
                        handleCopyClause(
                          `We, the undersigned, being all the adult, competent legal heirs of the late [Deceased Name] under Sunni Hanafi law, hereby confirm that we have read the Will dated [Date] bequeathing [Asset Description] to [Beneficiary Heir Name]. In accordance with the requirement laid down in Ghulam Mohammad v. Ghulam Husain (AIR 1932 PC 81), we hereby give our free, voluntary, and unequivocal consent to the said bequest and relinquish all our respective claims over the said asset.`,
                          2
                        )
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                    >
                      {copiedClauseIndex === 2 ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Clause
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs text-slate-800 whitespace-pre-wrap break-words font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-x-auto">
                    {`We, the undersigned, being all the adult, competent legal heirs of the late [Deceased Name] under Sunni Hanafi law, hereby confirm that we have read the Will dated [Date] bequeathing [Asset Description] to [Beneficiary Heir Name]. In accordance with the requirement laid down in Ghulam Mohammad v. Ghulam Husain (AIR 1932 PC 81), we hereby give our free, voluntary, and unequivocal consent to the said bequest and relinquish all our respective claims over the said asset.`}
                  </pre>
                </div>

                {/* Clause 3: Mahr Priority Clause */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
                      Clause 3: Priority Discharge of Unpaid Mahr (Dower)
                    </span>
                    <button
                      onClick={() =>
                        handleCopyClause(
                          `I direct my executor/legal heirs that before any distribution of my estate is made under Faraid or Wasiyat, my outstanding and unpaid Mahr (dower) amounting to INR [Amount in Words and Figures] shall be paid immediately and in full to my surviving wife, [Wife Name]. This debt shall have priority as an unsecured charge over all other testamentary dispositions.`,
                          3
                        )
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                    >
                      {copiedClauseIndex === 3 ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Clause
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs text-slate-800 whitespace-pre-wrap break-words font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-x-auto">
                    {`I direct my executor/legal heirs that before any distribution of my estate is made under Faraid or Wasiyat, my outstanding and unpaid Mahr (dower) amounting to INR [Amount in Words and Figures] shall be paid immediately and in full to my surviving wife, [Wife Name]. This debt shall have priority as an unsecured charge over all other testamentary dispositions.`}
                  </pre>
                </div>
              </div>
            </section>
            {/* SECTION 14: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>INSTITUTIONAL TRUST &amp; EXPERTISE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Institutional Profile: Legal Excellence &amp; Trust
              </h3>

              <div className="rounded-3xl bg-[#172228] text-white p-6 sm:p-8 md:p-10 shadow-xl space-y-6">
                <div className="max-w-3xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Legal Integrity &amp; High Court Experience</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                    WillDrafting.in is powered by <strong>AMA Legal Solutions</strong>, an elite pan-India legal practice
                    specializing in High Court succession petitions, Muslim personal law estates, NRI property disputes, and
                    probate litigation. All mathematical algorithms in this tool have been independently audited against Mulla&apos;s
                    Principles of Mahomedan Law and prevailing Indian Supreme Court precedents.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white text-sm">Bar Council Compliant</div>
                      <div className="text-xs text-slate-400">Strict adherence to Indian legal ethics</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-6 h-6 text-cyan-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white text-sm">Advocate Reviewed</div>
                      <div className="text-xs text-slate-400">Customized Sharia estate plans</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white text-sm">100% Confidential</div>
                      <div className="text-xs text-slate-400">Encrypted data protection</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* SECTION 15: FREQUENTLY ASKED QUESTIONS */}
            <section id="faq" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>CLEAR ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Frequently Asked Questions: Muslim Inheritance India
              </h3>

              <div className="mt-6 space-y-3">
                {[
                  {
                    q: "Which law governs Muslim inheritance and Wills in India?",
                    a: "Muslim inheritance in India is governed by the Muslim Personal Law (Shariat) Application Act, 1937 and uncodified principles compiled in Sir Dinshaw Mulla's Principles of Mahomedan Law. The Indian Succession Act, 1925 does not apply unless the marriage was registered under the Special Marriage Act, 1954.",
                  },
                  {
                    q: "What is the 1/3rd Wasiyat (Will) rule in Islamic law in India?",
                    a: "A Muslim can bequeath at most one-third (1/3rd) of their net estate (after paying funeral expenses and debts) through a Will (Wasiyat). Under Sunni Hanafi law, this 1/3rd can only go to non-heirs; a bequest to a legal heir is invalid unless all other heirs consent after the testator's death. Under Shia law, up to 1/3rd can be bequeathed to an heir or non-heir without consent.",
                  },
                  {
                    q: "What share does a widow or wife inherit under Muslim law?",
                    a: "A surviving wife inherits 1/8th (one-eighth) of the net inheritable estate if the deceased left children or agnatic grandchildren. If the deceased left no children or grandchildren, the wife inherits 1/4th (one-fourth). If there are multiple wives, they share this 1/8th or 1/4th equally among themselves.",
                  },
                  {
                    q: "What share does a husband inherit upon his wife's death?",
                    a: "A surviving husband inherits 1/4th (one-fourth) of his deceased wife's net estate if there are surviving children or agnatic grandchildren. If there are no children or agnatic descendants, the husband inherits 1/2 (half) of the net estate.",
                  },
                  {
                    q: "What share do daughters inherit under Muslim succession in India?",
                    a: "If a deceased leaves only one daughter and no sons, she receives 1/2 (half) of the estate as a Quranic Sharer. Two or more daughters together receive 2/3rds (two-thirds) divided equally. If sons also exist, daughters become Residuaries with the sons, where each son receives double the share of each daughter (2:1 ratio).",
                  },
                  {
                    q: "Why do brothers inherit when a Sunni Muslim dies leaving only daughters?",
                    a: "Under Sunni (Hanafi) law, daughters are Quranic Sharers entitled to a maximum collective share of 2/3rds (or 1/2 for an only daughter). The remaining residue (1/3rd or 1/2) passes to agnatic residuaries (Asabah), which includes the deceased's father, grandfather, or full brothers and their sons. To prevent brothers from inheriting ancestral estate away from daughters, parents frequently execute lifetime gifts (Hiba) or maximum 1/3rd Wasiyat bequests.",
                  },
                  {
                    q: "How does Shia inheritance law differ from Sunni law regarding daughters and brothers?",
                    a: "Under Shia (Ithna-Ashari) law, heirs are organized into three distinct consanguineous classes (Nasab). Class I consists of parents and children/descendants, while Class II consists of grandparents and brothers/sisters. Any surviving heir in Class I completely excludes everyone in Class II. Therefore, in Shia law, a daughter completely excludes the deceased's brothers from inheriting any share.",
                  },
                  {
                    q: "What is the Doctrine of Aul (Increase) in Muslim inheritance?",
                    a: "The Doctrine of Aul applies when the fractional sum of all Quranic Sharers exceeds unity (1). To balance the estate, the common denominator is increased to match the sum of numerators, proportionally reducing each sharer's allocation without depriving any Quranic heir. Sunni law recognizes Aul across common bases of 6, 12, and 24, whereas Shia law does not apply Aul and instead deducts any deficit solely from daughters or full sisters.",
                  },
                  {
                    q: "What is the Doctrine of Radd (Return) in Islamic succession?",
                    a: "The Doctrine of Radd applies when the sum of Quranic Sharers is less than unity (1) and there are no residuaries (Asabah) to take the remainder. The surplus is returned proportionally to the Quranic blood-sharers. Under classical Hanafi law, the surviving spouse does not participate in Radd unless no other blood relative or distant kindred exists.",
                  },
                  {
                    q: "Is probate mandatory for a Muslim Will (Wasiyat) in India?",
                    a: "No. Under Section 213(2) of the Indian Succession Act, 1925, probate is explicitly exempt for Wills made by Muslims across all states in India, including Mumbai, Chennai, and Kolkata. An executor or legatee under a valid Muslim Will can enforce rights without seeking probate from a High Court, though an application for Letters of Administration or Legal Heir Certificate is often obtained for municipal mutation.",
                  },
                  {
                    q: "Can a Muslim give 100% of their property to a daughter through a lifetime gift (Hiba)?",
                    a: "Yes. The 1/3rd testamentary restriction applies only to a Will (Wasiyat) that takes effect after death. During their lifetime, a Muslim has absolute freedom to gift (Hiba) up to 100% of their self-acquired or ancestral property to a daughter, wife, or any person. A valid Hiba requires declaration (Ijab), acceptance (Qabul), and delivery of possession (Qabda), and cannot be challenged under Faraid rules after death.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-[#172228] text-sm sm:text-base hover:bg-slate-50 transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                          openFaqIndex === idx ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            {/* SECTION 16: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>LEGAL CITATIONS &amp; AUTHORITIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                16. Statutory Citations: Acts, Precedents &amp; Legal Texts
              </h3>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>1. Muslim Personal Law (Shariat) Application Act, 1937:</strong> Section 2 (Application of Personal Law to Muslims regarding succession, marriage, dower, gifts, and trusts).
                </p>
                <p>
                  <strong>2. Sir Dinshaw Fardunji Mulla:</strong> <em>Principles of Mahomedan Law</em> (22nd/23rd Editions), Chapters VI (General Principles of Inheritance), VII (Hanafi Law of Inheritance), VIII (Shia Law of Inheritance), IX (Wills / Wasiyat), and XIII (Gifts / Hiba).
                </p>
                <p>
                  <strong>3. Privy Council Landmark Precedent:</strong> <em>Ghulam Mohammad v. Ghulam Husain (AIR 1932 PC 81)</em>: Establishing that a bequest to an heir under Sunni law is invalid without post-death consent of all other legal heirs.
                </p>
                <p>
                  <strong>4. Supreme Court of India:</strong> <em>Gulam Husain Kutubuddin Maner v. Abdool Rashid Abdulrajak Maner (1969) 2 SCR 267</em>: Clarifying the operation of spes successionis and renunciation of inheritance under Muslim law.
                </p>
                <p>
                  <strong>5. Patna High Court:</strong> <em>Abdul Manan Khan v. Mirtaza Khan (AIR 1991 Pat 154)</em>: Reaffirming the 1/3rd testamentary limitation on Muslim Wills.
                </p>
                <p>
                  <strong>6. Indian Succession Act, 1925:</strong> Section 213(2) (Exemption of Muslim Wills from mandatory probate), Section 217, and Section 370 (Succession Certificates for debts and securities).
                </p>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Muslim Personal Law (Shariat) Application Act, 1937</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Succession Calculators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Capital Gains Tax on Inherited Property
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Hindu Legal Heir Share Calculator
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Drafting Document Checklist
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Legal Will Template
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            {/* FINAL DUAL CONVERSION CTA BANNER */}
            <div className="rounded-3xl bg-gradient-to-r from-[#172228] via-[#212F35] to-[#172228] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl text-center space-y-6">
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-rose-200 border border-white/15">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>Pan-India Legal Will &amp; Sharia Estate Planning</span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  Protect Your Estate &amp; Honor Statutory Sharia Rights
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                  Whether you want to draft a legally binding 1/3rd Wasiyat for charity, secure complete ownership for your
                  daughters through a registered Hiba deed, or settle a deceased family estate in court, our senior High Court
                  advocates ensure 100% statutory compliance.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
                  <button
                    onClick={handleStartWill}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#C65378] hover:bg-[#a13c5d] text-white font-extrabold text-sm sm:text-base shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Draft Online Sharia Will (₹1,499)</span>
                  </button>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-5 h-5 text-amber-300" />
                    <span>Consult High Court Advocate</span>
                  </Link>
                </div>
              </div>
            </div>
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
                Specialist in Indian testamentary jurisprudence, High Court succession petitions, Muslim Personal Law (Shariat) estate settlement, and cross-border NRI estate structuring.
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
                  <span>PREVENT FUTURE FAMILY DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Daughters &amp; Spouse with a Sharia Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Draft a legally compliant 1/3rd Wasiyat bequest, record unpaid Mahr dower charges, or structure registered lifetime gifts (Hiba) to secure your family&apos;s financial future.
                </p>
                <button
                  onClick={handleStartWill}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Sharia Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Shariat Act Compliant &amp; Lawyer Verified</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>HIGH COURT SUCCESSION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Disputed Muslim Estate or Inheritance Lawsuit?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our High Court advocates represent legal heirs in Section 370 Succession Certificates, partition suits, and Hiba challenge litigation across India.
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
                      <strong>Shariat Act 1937 Precision:</strong> Rigorously incorporates classical Zawil-Furuz and Asabah ratios.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Aul &amp; Radd Mathematical Solvers:</strong> Automatically balances deficit or surplus estate fractions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Probate Exemption:</strong> Verified compliance under Section 213(2) of Indian Succession Act.
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
          <span>Faraid Calculator</span>
        </a>
        <button
          onClick={handleStartWill}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft Sharia Will</span>
        </button>
      </div>
    </div>
  );
}
