"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  Scale,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";

type PersonalLaw =
  | "hindu"
  | "muslim_sunni"
  | "muslim_shia"
  | "christian"
  | "parsi";

type Gender = "male" | "female";

type HinduFemalePropertySource =
  | "general_self_acquired"
  | "inherited_from_parents"
  | "inherited_from_husband_inlaws";

type AssetType =
  | "bank_fd"
  | "demat_mf"
  | "life_insurance"
  | "housing_society"
  | "epf_gratuity";

interface ShareItem {
  heirLabel: string;
  categoryBadge: string;
  fractionLabel: string;
  percentage: number;
  amountINR: number;
  legalNote: string;
}

interface CalculationResult {
  statuteTitle: string;
  statuteCitation: string;
  summaryAlert: string;
  testamentaryFreedomNote: string;
  shares: ShareItem[];
}

function formatINR(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export default function SuccessionCalculator() {
  const [activeTab, setActiveTab] = useState<"intestate" | "nominee">("intestate");

  // Intestate Calculator State
  const [law, setLaw] = useState<PersonalLaw>("hindu");
  const [gender, setGender] = useState<Gender>("male");
  const [hinduFemaleSource, setHinduFemaleSource] =
    useState<HinduFemalePropertySource>("general_self_acquired");
  const [estateValueCrores, setEstateValueCrores] = useState<number>(2); // Default ₹2 Crore

  const [hasSpouse, setHasSpouse] = useState<boolean>(true);
  const [sonsCount, setSonsCount] = useState<number>(1);
  const [daughtersCount, setDaughtersCount] = useState<number>(1);
  const [hasMother, setHasMother] = useState<boolean>(true);
  const [hasFather, setHasFather] = useState<boolean>(false);
  const [predeceasedChildBranches, setPredeceasedChildBranches] =
    useState<number>(0);

  // Nominee Checker State
  const [assetType, setAssetType] = useState<AssetType>("demat_mf");
  const [nomineeRelation, setNomineeRelation] = useState<string>(
    "One Child / Brother / Parent (Single Nominee)"
  );
  const [intendedBeneficiary, setIntendedBeneficiary] = useState<string>(
    "Spouse & All Children Equally"
  );
  const [hasWrittenWill, setHasWrittenWill] = useState<boolean>(false);

  const totalEstateINR = estateValueCrores * 10000000;

  const result: CalculationResult = useMemo(() => {
    const childrenTotal =
      sonsCount + daughtersCount + predeceasedChildBranches;

    // =========================================================================
    // 1. HINDU, BUDDHIST, JAIN, SIKH (HINDU SUCCESSION ACT, 1956)
    // =========================================================================
    if (law === "hindu") {
      if (gender === "male") {
        // Section 8 & Schedule Class I Heirs: Spouse, Sons, Daughters, Mother, Predeceased Child Branches
        const classOneUnits =
          (hasSpouse ? 1 : 0) +
          sonsCount +
          daughtersCount +
          predeceasedChildBranches +
          (hasMother ? 1 : 0);

        if (classOneUnits > 0) {
          const unitPct = 100 / classOneUnits;
          const unitAmt = totalEstateINR / classOneUnits;
          const shares: ShareItem[] = [];

          if (hasSpouse) {
            shares.push({
              heirLabel: "Surviving Wife (Widow)",
              categoryBadge: "Class I Legal Heir (Sec 8 & 10)",
              fractionLabel: `1 / ${classOneUnits}`,
              percentage: unitPct,
              amountINR: unitAmt,
              legalNote:
                "Takes 1 equal Class I share alongside children and surviving mother.",
            });
          }
          if (sonsCount > 0) {
            shares.push({
              heirLabel:
                sonsCount === 1 ? "Son (1)" : `Sons (${sonsCount} × equal share)`,
              categoryBadge: "Class I Legal Heir (Sec 8)",
              fractionLabel: `${sonsCount} / ${classOneUnits}`,
              percentage: unitPct * sonsCount,
              amountINR: unitAmt * sonsCount,
              legalNote:
                sonsCount === 1
                  ? "Receives 1 equal Class I unit."
                  : `Each son receives 1/${classOneUnits} (${unitPct.toFixed(1)}%).`,
            });
          }
          if (daughtersCount > 0) {
            shares.push({
              heirLabel:
                daughtersCount === 1
                  ? "Daughter (1)"
                  : `Daughters (${daughtersCount} × equal share)`,
              categoryBadge: "Class I Legal Heir (Sec 8 & Sec 6)",
              fractionLabel: `${daughtersCount} / ${classOneUnits}`,
              percentage: unitPct * daughtersCount,
              amountINR: unitAmt * daughtersCount,
              legalNote:
                "Married and unmarried daughters take an equal share on par with sons.",
            });
          }
          if (hasMother) {
            shares.push({
              heirLabel: "Surviving Mother",
              categoryBadge: "Class I Legal Heir (Sec 8)",
              fractionLabel: `1 / ${classOneUnits}`,
              percentage: unitPct,
              amountINR: unitAmt,
              legalNote:
                "Mother is a Class I heir of a Hindu male and takes an equal share with the widow and children! (Father is Class II).",
            });
          }
          if (predeceasedChildBranches > 0) {
            shares.push({
              heirLabel: `Branch of Predeceased Child (${predeceasedChildBranches})`,
              categoryBadge: "Class I Per Stirpes (Sec 10 Rule 3)",
              fractionLabel: `${predeceasedChildBranches} / ${classOneUnits}`,
              percentage: unitPct * predeceasedChildBranches,
              amountINR: unitAmt * predeceasedChildBranches,
              legalNote:
                "Heirs in the branch of each predeceased son/daughter divide 1 unit among themselves.",
            });
          }

          return {
            statuteTitle:
              "Hindu Succession Act, 1956 - Section 8 & 10 (Male Dying Intestate)",
            statuteCitation: "Section 8(a) read with Class I of the Schedule",
            summaryAlert: hasSpouse
              ? `Without a Will, your Wife does NOT inherit 100% of your estate, she receives only ${unitPct.toFixed(
                  1
                )}% (${formatINR(
                  unitAmt
                )}). Every Class I heir (including your mother and each child) must sign NOCs or approach the court for asset transmission.`
              : `Your estate is split equally into ${classOneUnits} Class I shares (${unitPct.toFixed(
                  1
                )}% per unit) without regard to your personal wishes.`,
            testamentaryFreedomNote:
              "Under Section 30 of the Hindu Succession Act, 1956, you can execute a Will to bequeath 100% of your self-acquired property, and your undivided coparcenary share in ancestral property, to your spouse or any person in any proportion you choose.",
            shares,
          };
        }

        if (hasFather) {
          return {
            statuteTitle:
              "Hindu Succession Act, 1956 - Section 8(b) (Class II Entry I)",
            statuteCitation: "Section 8(b) & Class II Entry I of the Schedule",
            summaryAlert:
              "Because there are no surviving Class I legal heirs (no widow, children, or mother), 100% of the estate devolves upon the Father under Class II Entry I.",
            testamentaryFreedomNote:
              "A valid Will under Section 30 overrides intestate schedules completely.",
            shares: [
              {
                heirLabel: "Surviving Father",
                categoryBadge: "Class II - Entry I Heir",
                fractionLabel: "1 / 1",
                percentage: 100,
                amountINR: totalEstateINR,
                legalNote:
                  "Under the Schedule to the Hindu Succession Act, Father is placed in Class II Entry I and inherits only when no Class I heir survives.",
              },
            ],
          };
        }

        return {
          statuteTitle: "Hindu Succession Act, 1956 - Class II / Agnates / Cognates",
          statuteCitation: "Section 8(b)–(d) of the Hindu Succession Act, 1956",
          summaryAlert:
            "With no surviving Class I heirs or Father, the estate passes to Class II Entry II heirs (brothers, sisters, grandchildren of predeceased children) or distant agnates/cognates.",
          testamentaryFreedomNote:
            "Drafting a Will allows you to leave 100% of your estate to your chosen relatives, friends, or charitable trusts without distant relatives filing Succession Certificate claims.",
          shares: [
            {
              heirLabel: "Siblings / Class II Heirs / Agnates & Cognates",
              categoryBadge: "Class II Entry II+",
              fractionLabel: "1 / 1",
              percentage: 100,
              amountINR: totalEstateINR,
              legalNote:
                "Divided equally among surviving brothers, sisters, and children of predeceased siblings.",
            },
          ],
        };
      } else {
        // HINDU FEMALE (Section 15 & Section 16)
        // Check Section 15(2) Reversion Rules if NO children or predeceased child branches survive!
        if (
          childrenTotal === 0 &&
          hinduFemaleSource === "inherited_from_parents"
        ) {
          const parentsCount = (hasFather ? 1 : 0) + (hasMother ? 1 : 0);
          return {
            statuteTitle:
              "Hindu Succession Act, 1956 - Section 15(2)(a) Special Reversion Rule",
            statuteCitation: "Section 15(2)(a) of the Hindu Succession Act, 1956",
            summaryAlert:
              "CRITICAL STATUTORY RULE: When a Hindu female dies without children, property inherited by her from her Father or Mother does NOT go to her Husband, it reverts to the heirs of her Father under Section 15(2)(a)!",
            testamentaryFreedomNote:
              "Section 15(2)(a) applies ONLY if she dies intestate (without a Will). By executing a simple Will under Section 30, a Hindu woman can bequeath 100% of property inherited from her parents to her husband or anyone else!",
            shares: [
              {
                heirLabel:
                  parentsCount > 0
                    ? "Father's Heirs (Surviving Parents / Maternal Natal Family)"
                    : "Heirs of the Woman's Father (Brothers / Sisters / Natal Family)",
                categoryBadge: "Section 15(2)(a) Reversion",
                fractionLabel: "1 / 1",
                percentage: 100,
                amountINR: totalEstateINR,
                legalNote:
                  "Husband is excluded from property inherited from her father/mother if she leaves no issue and no Will.",
              },
            ],
          };
        }

        // General Rule under Section 15(1)(a): Sons, Daughters, Predeceased Child Branches, and Husband
        const sec15aUnits =
          (hasSpouse ? 1 : 0) +
          sonsCount +
          daughtersCount +
          predeceasedChildBranches;

        if (sec15aUnits > 0) {
          const unitPct = 100 / sec15aUnits;
          const unitAmt = totalEstateINR / sec15aUnits;
          const shares: ShareItem[] = [];

          if (hasSpouse) {
            shares.push({
              heirLabel: "Surviving Husband",
              categoryBadge: "Section 15(1)(a) Entry I",
              fractionLabel: `1 / ${sec15aUnits}`,
              percentage: unitPct,
              amountINR: unitAmt,
              legalNote:
                "Takes 1 equal share alongside sons and daughters under Section 15(1)(a).",
            });
          }
          if (sonsCount > 0) {
            shares.push({
              heirLabel:
                sonsCount === 1 ? "Son (1)" : `Sons (${sonsCount} × equal share)`,
              categoryBadge: "Section 15(1)(a) Entry I",
              fractionLabel: `${sonsCount} / ${sec15aUnits}`,
              percentage: unitPct * sonsCount,
              amountINR: unitAmt * sonsCount,
              legalNote: "Each son receives 1 equal share.",
            });
          }
          if (daughtersCount > 0) {
            shares.push({
              heirLabel:
                daughtersCount === 1
                  ? "Daughter (1)"
                  : `Daughters (${daughtersCount} × equal share)`,
              categoryBadge: "Section 15(1)(a) Entry I",
              fractionLabel: `${daughtersCount} / ${sec15aUnits}`,
              percentage: unitPct * daughtersCount,
              amountINR: unitAmt * daughtersCount,
              legalNote: "Each daughter receives 1 equal share.",
            });
          }
          if (predeceasedChildBranches > 0) {
            shares.push({
              heirLabel: `Children of Predeceased Child (${predeceasedChildBranches})`,
              categoryBadge: "Section 15(1)(a) Per Stirpes",
              fractionLabel: `${predeceasedChildBranches} / ${sec15aUnits}`,
              percentage: unitPct * predeceasedChildBranches,
              amountINR: unitAmt * predeceasedChildBranches,
              legalNote: "Takes the share the predeceased son/daughter would have taken.",
            });
          }

          return {
            statuteTitle:
              "Hindu Succession Act, 1956 - Section 15(1)(a) (Female Dying Intestate)",
            statuteCitation: "Section 15(1)(a) & Section 16 of the Act",
            summaryAlert:
              hasMother || hasFather
                ? "Notice under Section 15(1): A Hindu woman's own Mother and Father do NOT inherit under Entry (a) when her husband or children survive, unless she leaves a Will providing for her parents!"
                : `Your estate is divided equally into ${sec15aUnits} shares (${unitPct.toFixed(
                    1
                  )}% each) between your husband and children.`,
            testamentaryFreedomNote:
              "Many working Hindu women wish to leave a portion of their self-acquired savings or flat to their own aging parents. Without a Will, Section 15(1) excludes her parents whenever a husband or child survives.",
            shares,
          };
        }

        // If no husband and no children: Section 15(1)(b) -> Heirs of Husband (unless Sec 15(2) applies)
        return {
          statuteTitle:
            "Hindu Succession Act, 1956 - Section 15(1)(b)–(c) (Heirs of Husband / Parents)",
          statuteCitation: "Section 15(1)(b) & (c) of the Hindu Succession Act, 1956",
          summaryAlert:
            "Under Section 15(1)(b), when a Hindu woman dies intestate without a surviving husband or children, her self-acquired property devolves upon the heirs of her husband before her own parents (currently under Constitutional scrutiny in the Supreme Court), making a written Will indispensable.",
          testamentaryFreedomNote:
            "Executing a Will under Section 30 overrides Section 15(1)(b) completely and guarantees your self-acquired wealth goes to your own parents, siblings, or chosen beneficiaries.",
          shares: [
            {
              heirLabel:
                hasMother || hasFather
                  ? "Heirs of Husband (Sec 15(1)(b)) / Parents (Sec 15(1)(c))"
                  : "Statutory Heirs under Section 15(1)(b)–(e)",
              categoryBadge: "Section 15(1)(b)–(c)",
              fractionLabel: "1 / 1",
              percentage: 100,
              amountINR: totalEstateINR,
              legalNote:
                "Subject to Section 15(1)(b) priority unless overridden by a valid Will.",
            },
          ],
        };
      }
    }

    // =========================================================================
    // 2. MUSLIM PERSONAL LAW - SUNNI (HANAFI) & SHIA (ITHNA ASHARI)
    // =========================================================================
    if (law === "muslim_sunni" || law === "muslim_shia") {
      const isSunni = law === "muslim_sunni";
      const shares: ShareItem[] = [];
      let fixedFractionAllocated = 0;

      const hasDescendants = childrenTotal > 0;

      // 1. Spouse (Quranic Sharer)
      if (hasSpouse) {
        if (gender === "male") {
          // Wife takes 1/8 if children exist, 1/4 if no children
          const wifeShare = hasDescendants ? 1 / 8 : 1 / 4;
          fixedFractionAllocated += wifeShare;
          shares.push({
            heirLabel: "Surviving Wife (Widow)",
            categoryBadge: "Quranic Sharer (Zawil-Furud)",
            fractionLabel: hasDescendants ? "1 / 8" : "1 / 4",
            percentage: wifeShare * 100,
            amountINR: totalEstateINR * wifeShare,
            legalNote: hasDescendants
              ? "Wife receives fixed 1/8th (12.5%) when children/descendants survive."
              : "Wife receives fixed 1/4th (25%) when no children survive.",
          });
        } else {
          // Husband takes 1/4 if children exist, 1/2 if no children
          const husbandShare = hasDescendants ? 1 / 4 : 1 / 2;
          fixedFractionAllocated += husbandShare;
          shares.push({
            heirLabel: "Surviving Husband",
            categoryBadge: "Quranic Sharer (Zawil-Furud)",
            fractionLabel: hasDescendants ? "1 / 4" : "1 / 2",
            percentage: husbandShare * 100,
            amountINR: totalEstateINR * husbandShare,
            legalNote: hasDescendants
              ? "Husband receives fixed 1/4th (25%) when children survive."
              : "Husband receives fixed 1/2 (50%) when no children survive.",
          });
        }
      }

      // 2. Mother (Quranic Sharer)
      if (hasMother) {
        const motherShare = hasDescendants ? 1 / 6 : 1 / 3;
        fixedFractionAllocated += motherShare;
        shares.push({
          heirLabel: "Surviving Mother",
          categoryBadge: "Quranic Sharer (Zawil-Furud)",
          fractionLabel: hasDescendants ? "1 / 6" : "1 / 3",
          percentage: motherShare * 100,
          amountINR: totalEstateINR * motherShare,
          legalNote: hasDescendants
            ? "Mother receives fixed 1/6th (16.67%) when children survive."
            : "Mother receives 1/3rd when no children survive.",
        });
      }

      // 3. Father (Quranic Sharer when descendants exist)
      if (hasFather && hasDescendants) {
        const fatherShare = 1 / 6;
        fixedFractionAllocated += fatherShare;
        shares.push({
          heirLabel: "Surviving Father",
          categoryBadge: "Quranic Sharer (Zawil-Furud)",
          fractionLabel: "1 / 6",
          percentage: fatherShare * 100,
          amountINR: totalEstateINR * fatherShare,
          legalNote:
            "Father receives fixed 1/6th (16.67%) as Quranic Sharer when sons/descendants survive.",
        });
      }

      const residue = Math.max(0, 1 - fixedFractionAllocated);

      // 4. Children / Residuaries
      if (sonsCount > 0 || daughtersCount > 0) {
        if (sonsCount > 0) {
          // Sons and daughters take residue in 2:1 ratio (2 parts per son, 1 part per daughter)
          const totalResidueParts = sonsCount * 2 + daughtersCount;
          const singlePart = residue / totalResidueParts;

          shares.push({
            heirLabel:
              sonsCount === 1
                ? "Son (1)"
                : `Sons (${sonsCount} - 2 parts each)`,
            categoryBadge: "Residuary (Asabah)",
            fractionLabel: `${((singlePart * 2 * sonsCount) * 100).toFixed(1)}% of Estate`,
            percentage: singlePart * 2 * sonsCount * 100,
            amountINR: totalEstateINR * (singlePart * 2 * sonsCount),
            legalNote:
              "Under Quranic residue rules (Surah An-Nisa 4:11), a son takes double the share of a daughter from the residue.",
          });

          if (daughtersCount > 0) {
            shares.push({
              heirLabel:
                daughtersCount === 1
                  ? "Daughter (1)"
                  : `Daughters (${daughtersCount} - 1 part each)`,
              categoryBadge: "Residuary with Son (Asabah bi-ghayriha)",
              fractionLabel: `${((singlePart * daughtersCount) * 100).toFixed(1)}% of Estate`,
              percentage: singlePart * daughtersCount * 100,
              amountINR: totalEstateINR * (singlePart * daughtersCount),
              legalNote:
                "Takes 1 part per daughter alongside son(s) from the remaining net estate.",
            });
          }
        } else {
          // Only Daughters (No Sons)
          const daughtersFixed =
            daughtersCount === 1 ? 1 / 2 : 2 / 3;
          const actualDaughterShare = Math.min(residue, daughtersFixed);
          const remainingAfterDaughters = Math.max(
            0,
            residue - actualDaughterShare
          );

          shares.push({
            heirLabel:
              daughtersCount === 1
                ? "Daughter (1 - Sole Daughter)"
                : `Daughters (${daughtersCount} - Shared 2/3rds)`,
            categoryBadge: "Quranic Sharer (+ Radd if no Asabah)",
            fractionLabel:
              daughtersCount === 1 ? "1 / 2 (+ Radd)" : "2 / 3 (+ Radd)",
            percentage:
              (isSunni && hasFather
                ? actualDaughterShare
                : residue) * 100,
            amountINR:
              totalEstateINR *
              (isSunni && hasFather ? actualDaughterShare : residue),
            legalNote: isSunni
              ? "With no sons, 1 daughter takes 1/2 (2+ daughters share 2/3rds); under Sunni law, distant agnates/Father take residue unless Radd applies."
              : "Under Shia Ithna Ashari Class I rules, daughters exclude distant collaterals and take the remainder by Return (Radd).",
          });

          if (isSunni && hasFather && remainingAfterDaughters > 0) {
            shares.push({
              heirLabel: "Father (Additional Residuary Share)",
              categoryBadge: "Residuary (Asabah)",
              fractionLabel: `${(remainingAfterDaughters * 100).toFixed(1)}%`,
              percentage: remainingAfterDaughters * 100,
              amountINR: totalEstateINR * remainingAfterDaughters,
              legalNote:
                "When only daughters survive without sons, the Father takes both his 1/6th Quranic share and the remaining residue.",
            });
          }
        }
      } else if (residue > 0) {
        shares.push({
          heirLabel: hasFather
            ? "Surviving Father (Residuary)"
            : "Quranic Residuaries (Asabah) / Return (Radd)",
          categoryBadge: "Residuary / Radd Distribution",
          fractionLabel: `${(residue * 100).toFixed(1)}%`,
          percentage: residue * 100,
          amountINR: totalEstateINR * residue,
          legalNote:
            "Remaining estate passes to Father/Residuaries or returns (Radd) proportionately to Quranic sharers.",
        });
      }

      return {
        statuteTitle: isSunni
          ? "Muslim Personal Law (Shariat) Application Act, 1937 - Sunni (Hanafi) Faraid"
          : "Muslim Personal Law (Shariat) Application Act, 1937 - Shia (Ithna Ashari) Faraid",
        statuteCitation:
          "Section 2, Shariat Application Act, 1937 & Wasiyat 1/3rd Rule",
        summaryAlert: `Under Islamic Inheritance Law, you can execute a Wasiyat (Will) for up to ONE-THIRD (1/3rd = ${formatINR(
          totalEstateINR / 3
        )}) of your net estate. ${
          predeceasedChildBranches > 0
            ? "IMPORTANT: Orphaned grandchildren of a predeceased child are excluded by surviving sons in classical Faraid, making a 1/3rd Wasiyat essential to protect them!"
            : ""
        }`,
        testamentaryFreedomNote: isSunni
          ? "Under Sunni (Hanafi) law, your Wasiyat can bequeath up to 1/3rd of your net estate to any non-heir (such as an orphaned grandchild or charity) without anyone's consent. A bequest to an existing legal heir requires other heirs' consent after death."
          : "Under Shia (Ithna Ashari) law, your Wasiyat can validly bequeath up to 1/3rd of your net estate to ANY person, including an existing legal heir (such as your wife or daughter), without needing other heirs' consent!",
        shares,
      };
    }

    // =========================================================================
    // 3. CHRISTIAN / SPECIAL MARRIAGE ACT (INDIAN SUCCESSION ACT, 1925 - SECTIONS 31–49)
    // =========================================================================
    if (law === "christian") {
      const shares: ShareItem[] = [];
      const linealUnits = sonsCount + daughtersCount + predeceasedChildBranches;

      if (hasSpouse && linealUnits > 0) {
        // Section 33(a): Widow/Widower takes 1/3rd; lineal descendants divide 2/3rds equally
        const spouseShare = 1 / 3;
        const childShareTotal = 2 / 3;
        const perChildShare = childShareTotal / linealUnits;

        shares.push({
          heirLabel:
            gender === "male" ? "Surviving Wife (Widow)" : "Surviving Husband (Widower)",
          categoryBadge: "Section 33(a) Indian Succession Act",
          fractionLabel: "1 / 3",
          percentage: 33.33,
          amountINR: totalEstateINR * spouseShare,
          legalNote:
            "Under Section 33(a) of the Indian Succession Act, 1925, the surviving spouse takes a fixed 1/3rd share when lineal descendants survive.",
        });

        shares.push({
          heirLabel: `Children / Lineal Descendants (${linealUnits} × equal share of 2/3rds)`,
          categoryBadge: "Sections 36–40 Indian Succession Act",
          fractionLabel: "2 / 3 (Divided Equally)",
          percentage: 66.67,
          amountINR: totalEstateINR * childShareTotal,
          legalNote: `Sons and daughters share the remaining 2/3rds equally (${(
            perChildShare * 100
          ).toFixed(1)}% / ${formatINR(totalEstateINR * perChildShare)} each).`,
        });
      } else if (!hasSpouse && linealUnits > 0) {
        shares.push({
          heirLabel: `Children / Lineal Descendants (${linealUnits} × equal share)`,
          categoryBadge: "Section 33(c) & 37 Indian Succession Act",
          fractionLabel: `1 / ${linealUnits} each`,
          percentage: 100,
          amountINR: totalEstateINR,
          legalNote:
            "With no surviving spouse, 100% of the estate is divided equally among all surviving children and branches of predeceased children.",
        });
      } else if (hasSpouse && linealUnits === 0 && (hasFather || hasMother)) {
        // Section 33(b): Spouse takes 1/2, Father (or Mother/Siblings under Sec 42-43) takes 1/2
        shares.push({
          heirLabel: "Surviving Spouse",
          categoryBadge: "Section 33(b) Indian Succession Act",
          fractionLabel: "1 / 2",
          percentage: 50,
          amountINR: totalEstateINR * 0.5,
          legalNote:
            "When no children survive but kindred (parents/siblings) survive, the spouse receives only 50% (1/2) of the estate.",
        });
        shares.push({
          heirLabel: hasFather
            ? "Surviving Father (Section 42)"
            : "Surviving Mother & Siblings (Section 43)",
          categoryBadge: "Kindred Share (Sec 41–43)",
          fractionLabel: "1 / 2",
          percentage: 50,
          amountINR: totalEstateINR * 0.5,
          legalNote:
            "The remaining 50% passes to the Father (Sec 42), or if the Father is deceased, equally among Mother, Brothers, and Sisters (Sec 43).",
        });
      } else {
        shares.push({
          heirLabel: hasSpouse ? "Surviving Spouse (Sole Heir)" : "Next of Kin (Sections 42–48)",
          categoryBadge: "Section 33 / 42–48 ISA 1925",
          fractionLabel: "1 / 1",
          percentage: 100,
          amountINR: totalEstateINR,
          legalNote:
            "Passes to the surviving spouse if no kindred exist, or to parents/siblings if unmarried.",
        });
      }

      return {
        statuteTitle:
          "Indian Succession Act, 1925 - Part V, Sections 31–49 (Christian & Special Marriage Act)",
        statuteCitation: "Sections 33, 37, 42 & 43 of the Indian Succession Act, 1925",
        summaryAlert:
          hasSpouse && linealUnits === 0 && (hasFather || hasMother)
            ? "CRITICAL ALERT (Section 33(b)): If a Christian or Special Marriage Act couple has no children and one spouse dies without a Will, the surviving spouse gets ONLY 50%, the other 50% goes to parents/siblings!"
            : "Without a Will, your spouse receives only 33.33% (1/3rd) when children survive, and your surviving parents receive 0% unless you name them in a Will.",
        testamentaryFreedomNote:
          "Under Section 59 of the Indian Succession Act, 1925, executing a Will gives you 100% freedom to distribute your entire estate to your spouse, children, or parents in whatever proportion you choose.",
        shares,
      };
    }

    // =========================================================================
    // 4. PARSI INTESTATE SUCCESSION (INDIAN SUCCESSION ACT, 1925 - SECTIONS 50–56)
    // =========================================================================
    const parsiParents = (hasFather ? 1 : 0) + (hasMother ? 1 : 0);
    // Under Section 51 (as amended in 1991): Widow/Widower and each child take equal shares, and each surviving parent takes HALF the share of a child!
    const childSpouseUnits =
      (hasSpouse ? 1 : 0) +
      sonsCount +
      daughtersCount +
      predeceasedChildBranches;
    const totalHalfUnits = childSpouseUnits * 2 + parsiParents;

    const shares: ShareItem[] = [];
    if (totalHalfUnits > 0) {
      const fullSharePct = (2 / totalHalfUnits) * 100;
      const halfSharePct = (1 / totalHalfUnits) * 100;

      if (hasSpouse) {
        shares.push({
          heirLabel: "Surviving Spouse",
          categoryBadge: "Section 51(1) Indian Succession Act",
          fractionLabel: `2 / ${totalHalfUnits}`,
          percentage: fullSharePct,
          amountINR: totalEstateINR * (2 / totalHalfUnits),
          legalNote: "Receives 1 full share equal to the share of a child.",
        });
      }
      if (sonsCount + daughtersCount + predeceasedChildBranches > 0) {
        const count = sonsCount + daughtersCount + predeceasedChildBranches;
        shares.push({
          heirLabel: `Children (${count} × equal share)`,
          categoryBadge: "Section 51(1) Indian Succession Act",
          fractionLabel: `${count * 2} / ${totalHalfUnits}`,
          percentage: fullSharePct * count,
          amountINR: totalEstateINR * ((count * 2) / totalHalfUnits),
          legalNote:
            "After the 1991 Amendment, Parsi sons and daughters inherit equal shares.",
        });
      }
      if (parsiParents > 0) {
        shares.push({
          heirLabel:
            parsiParents === 2
              ? "Surviving Father & Mother (Half-child share each)"
              : hasFather
              ? "Surviving Father (Half-child share)"
              : "Surviving Mother (Half-child share)",
          categoryBadge: "Section 51(2) Indian Succession Act",
          fractionLabel: `${parsiParents} / ${totalHalfUnits}`,
          percentage: halfSharePct * parsiParents,
          amountINR: totalEstateINR * (parsiParents / totalHalfUnits),
          legalNote:
            "Under Section 51(2), each surviving parent of a Parsi intestate receives a share equal to HALF the share of a child.",
        });
      }
    }

    return {
      statuteTitle:
        "Indian Succession Act, 1925 - Part V, Sections 50–56 (Parsi Intestate Rules)",
      statuteCitation: "Section 51 of the Indian Succession Act, 1925 (1991 Amendment)",
      summaryAlert:
        "Under Section 51, your estate is divided so the spouse and each child take equal shares while each surviving parent takes half the share of a child.",
      testamentaryFreedomNote:
        "Under Section 59 of the Indian Succession Act, 1925, a Parsi testator has 100% testamentary freedom to allocate their estate via a written Will.",
      shares,
    };
  }, [
    law,
    gender,
    hinduFemaleSource,
    totalEstateINR,
    hasSpouse,
    sonsCount,
    daughtersCount,
    hasMother,
    hasFather,
    predeceasedChildBranches,
  ]);

  // Nominee Conflict Evaluation
  const nomineeVerdict = useMemo(() => {
    const isMismatch =
      nomineeRelation !== intendedBeneficiary &&
      !nomineeRelation.includes("Matches");

    const assetMap: Record<
      AssetType,
      {
        title: string;
        statute: string;
        caseLaw: string;
        custodianRule: string;
        ownershipRule: string;
      }
    > = {
      demat_mf: {
        title: "Demat Account, Shares & Mutual Fund Folios",
        statute: "Section 72 Companies Act, 2013 & Depositories Act, 1996",
        caseLaw: "Shakti Yezdani v. Jayanand Jayant Salgaonkar (Supreme Court, Dec 2023)",
        custodianRule:
          "Depository Participant (Zerodha, Groww, CDSL/NSDL, AMC) transfers units into the Nominee's Demat account to discharge institutional liability.",
        ownershipRule:
          "The Nominee is STRICTLY A FIDUCIARY TRUSTEE. In Shakti Yezdani (2023), the Supreme Court ruled that Companies Act / Depositories Act nominations DO NOT override your Will or succession law.",
      },
      bank_fd: {
        title: "Bank Savings, Fixed Deposits (FD), NRE / NRO Accounts & Lockers",
        statute: "Section 45ZA & 45ZE of the Banking Regulation Act, 1949",
        caseLaw: "Ram Chander Talwar v. Devender Kumar Talwar (Supreme Court, 2010)",
        custodianRule:
          "The bank releases the deposit balance to the registered nominee(s) and obtains a valid legal discharge.",
        ownershipRule:
          "The money still belongs to the beneficiaries named in your Will (or all Class I legal heirs equally if you have no Will). Any excluded heir can sue the nominee for recovery.",
      },
      life_insurance: {
        title: "Life Insurance Policies (Term & Endowment Plans)",
        statute: "Section 39 of the Insurance Act, 1938 (2015 Amendment)",
        caseLaw: "Smt. Sarbati Devi v. Smt. Usha Devi (1984 SC)",
        custodianRule:
          "Under Section 39(7) (2015 Amendment), a spouse, parent, or child named as a 'Beneficial Nominee' receives beneficial title, whereas any other nominee is merely a collector trustee.",
        ownershipRule:
          "Even where a spouse/child is nominated, if you intend the insurance payout to be split in specific ratios or placed in a minor child trust, your Will and policy nomination must be synchronized.",
      },
      housing_society: {
        title: "Cooperative Housing Society Flat & Real Estate",
        statute: "State Cooperative Societies Acts (e.g., MCS Act Sec 30 / DCS Act)",
        caseLaw: "Indrani Wahi v. Registrar of Co-operative Societies (Supreme Court, 2016)",
        custodianRule:
          "The Cooperative Housing Society transfers the share certificate provisionally into the nominee's name for society billing and representation.",
        ownershipRule:
          "Society nomination NEVER transfers legal title to the flat! Title to immovable property passes strictly by a valid Will or intestate succession law.",
      },
      epf_gratuity: {
        title: "Employees' Provident Fund (EPF) & Statutory Gratuity",
        statute: "Para 61 EPF Scheme, 1952 & Section 6 Payment of Gratuity Act, 1972",
        caseLaw: "Statutory Family Definition Rule",
        custodianRule:
          "EPFO and employers can validly accept nominations ONLY in favor of defined 'Family Members' (spouse, children, dependent parents).",
        ownershipRule:
          "Unlike bank FDs, EPF and Gratuity rules confer direct statutory entitlement on eligible family nominees, and any nomination made before marriage automatically becomes invalid upon marriage!",
      },
    };

    return {
      ...assetMap[assetType],
      isMismatch,
      riskLevel: !hasWrittenWill || isMismatch ? "HIGH LITIGATION RISK" : "PROTECTED",
    };
  }, [assetType, nomineeRelation, intendedBeneficiary, hasWrittenWill]);

  return (
    <div className="w-full space-y-10">
      {/* Top Mode Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#F4EFE6] p-2 rounded-2xl border border-[#172228]/10">
        <button
          type="button"
          onClick={() => setActiveTab("intestate")}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "intestate"
              ? "bg-[#172228] text-white shadow-sm"
              : "text-[#49585F] hover:text-[#172228]"
          }`}
        >
          <Calculator className="w-4 h-4 text-[#C65378]" />
          <span>1. Intestate Share Calculator (No Will)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("nominee")}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "nominee"
              ? "bg-[#172228] text-white shadow-sm"
              : "text-[#49585F] hover:text-[#172228]"
          }`}
        >
          <Scale className="w-4 h-4 text-[#C65378]" />
          <span>2. Will vs. Bank/Demat Nomination Checker</span>
        </button>
      </div>

      {activeTab === "intestate" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT INPUT PANEL (5 Columns) */}
          <div className="lg:col-span-5 bg-white border border-[#172228]/12 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#172228]/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
                Step-by-Step Statutory Inputs
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-[#111827]">
                Configure Family & Estate Profile
              </h3>
            </div>

            {/* 1. Personal Law Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#374151]">
                1. Applicable Personal Succession Law
              </label>
              <select
                value={law}
                onChange={(e) => setLaw(e.target.value as PersonalLaw)}
                className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-4 py-3 text-sm font-medium text-[#172228] focus:outline-none focus:border-[#C65378]"
              >
                <option value="hindu">
                  Hindu, Buddhist, Jain or Sikh (Hindu Succession Act, 1956)
                </option>
                <option value="muslim_sunni">
                  Muslim - Sunni Hanafi School (Shariat Act, 1937)
                </option>
                <option value="muslim_shia">
                  Muslim - Shia Ithna Ashari School (Shariat Act, 1937)
                </option>
                <option value="christian">
                  Christian / Special Marriage Act (Indian Succession Act, 1925)
                </option>
                <option value="parsi">
                  Parsi (Indian Succession Act, 1925 - Sec 50–56)
                </option>
              </select>
            </div>

            {/* 2. Gender of Property Owner */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#374151]">
                2. Gender of Property Owner (Testator)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                    gender === "male"
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#49585F] border-[#172228]/15 hover:border-[#172228]/40"
                  }`}
                >
                  Male Owner
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                    gender === "female"
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#49585F] border-[#172228]/15 hover:border-[#172228]/40"
                  }`}
                >
                  Female Owner
                </button>
              </div>
            </div>

            {/* Special Hindu Female Source Selector (Sec 15(1) vs Sec 15(2)) */}
            {law === "hindu" && gender === "female" && (
              <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#C65378]/30 space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378]">
                  Hindu Female Property Source (Sec 15(1) vs Sec 15(2))
                </label>
                <select
                  value={hinduFemaleSource}
                  onChange={(e) =>
                    setHinduFemaleSource(
                      e.target.value as HinduFemalePropertySource
                    )
                  }
                  className="w-full rounded-xl border border-[#172228]/20 bg-white px-3.5 py-2.5 text-xs font-medium text-[#172228]"
                >
                  <option value="general_self_acquired">
                    Self-Acquired / Purchased / Gifted Property (Sec 15(1))
                  </option>
                  <option value="inherited_from_parents">
                    Property Inherited from Father or Mother (Sec 15(2)(a))
                  </option>
                  <option value="inherited_from_husband_inlaws">
                    Property Inherited from Husband or Father-in-Law (Sec 15(2)(b))
                  </option>
                </select>
              </div>
            )}

            {/* 3. Surviving Family Members */}
            <div className="space-y-3 pt-1">
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#374151]">
                3. Surviving Family Members
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/12 cursor-pointer">
                  <span className="text-xs font-semibold text-[#172228]">
                    Spouse Alive?
                  </span>
                  <input
                    type="checkbox"
                    checked={hasSpouse}
                    onChange={(e) => setHasSpouse(e.target.checked)}
                    className="h-4 w-4 accent-[#C65378]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/12 cursor-pointer">
                  <span className="text-xs font-semibold text-[#172228]">
                    Mother Alive?
                  </span>
                  <input
                    type="checkbox"
                    checked={hasMother}
                    onChange={(e) => setHasMother(e.target.checked)}
                    className="h-4 w-4 accent-[#C65378]"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/12 cursor-pointer">
                  <span className="text-xs font-semibold text-[#172228]">
                    Father Alive?
                  </span>
                  <input
                    type="checkbox"
                    checked={hasFather}
                    onChange={(e) => setHasFather(e.target.checked)}
                    className="h-4 w-4 accent-[#C65378]"
                  />
                </label>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/12">
                  <span className="text-xs font-semibold text-[#172228]">
                    Sons:
                  </span>
                  <select
                    value={sonsCount}
                    onChange={(e) => setSonsCount(Number(e.target.value))}
                    className="bg-white border border-[#172228]/20 rounded-lg px-2 py-1 text-xs font-bold"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/12">
                  <span className="text-xs font-semibold text-[#172228]">
                    Daughters:
                  </span>
                  <select
                    value={daughtersCount}
                    onChange={(e) => setDaughtersCount(Number(e.target.value))}
                    className="bg-white border border-[#172228]/20 rounded-lg px-2 py-1 text-xs font-bold"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/12">
                  <span className="text-xs font-semibold text-[#172228]">
                    Predeceased Child Branch:
                  </span>
                  <select
                    value={predeceasedChildBranches}
                    onChange={(e) =>
                      setPredeceasedChildBranches(Number(e.target.value))
                    }
                    className="bg-white border border-[#172228]/20 rounded-lg px-2 py-1 text-xs font-bold"
                  >
                    {[0, 1, 2].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Estimated Net Estate Value */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#374151]">
                  4. Estimated Net Estate Value
                </label>
                <span className="text-sm font-bold text-[#C65378]">
                  ₹{estateValueCrores} Crore ({formatINR(totalEstateINR)})
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={20}
                step={0.5}
                value={estateValueCrores}
                onChange={(e) => setEstateValueCrores(Number(e.target.value))}
                className="w-full accent-[#C65378] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#6B7280]">
                <span>₹50 Lakh</span>
                <span>₹5 Crore</span>
                <span>₹10 Crore</span>
                <span>₹20 Crore</span>
              </div>
            </div>
          </div>

          {/* RIGHT OUTPUT PANEL (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Statutory Header Card */}
            <div className="bg-[#172228] text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FAF7F0] bg-[#C65378] px-3 py-1 rounded-full">
                  <Users className="w-3.5 h-3.5" />
                  <span>Intestate Distribution (If You Die Without a Will)</span>
                </span>
                <span className="text-xs text-[#DFCEBF] font-mono">
                  {result.statuteCitation}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-medium leading-snug text-white">
                {result.statuteTitle}
              </h3>

              {/* Warning Banner */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm leading-relaxed text-[#FAF7F0]">
                  {result.summaryAlert}
                </p>
              </div>
            </div>

            {/* Share Breakdown Cards */}
            <div className="bg-white border border-[#172228]/12 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#172228]/10 pb-4">
                <h3 className="text-lg font-semibold text-[#111827]">
                  Statutory Legal Heir Share Breakdown
                </h3>
                <span className="text-xs font-semibold text-[#6B7280]">
                  Total Estate: {formatINR(totalEstateINR)}
                </span>
              </div>

              <div className="space-y-4">
                {result.shares.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-base font-semibold text-[#111827] block">
                          {item.heirLabel}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C65378]">
                          {item.categoryBadge}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-bold text-[#172228] block">
                          {formatINR(item.amountINR)}
                        </span>
                        <span className="text-xs font-semibold text-[#49585F]">
                          Share: {item.fractionLabel} ({item.percentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-[#172228]/10 overflow-hidden">
                      <div
                        className="h-full bg-[#C65378] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(4, item.percentage))}%`,
                        }}
                      />
                    </div>

                    <p className="text-xs text-[#49585F] leading-relaxed">
                      {item.legalNote}
                    </p>
                  </div>
                ))}
              </div>

              {/* How a Will Changes This Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F4EFE6] border-l-4 border-[#C65378] space-y-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#172228]">
                      How Drafting a Will Overrides This Statutory Split
                    </h4>
                    <p className="text-xs sm:text-sm text-[#374151] leading-relaxed mt-1">
                      {result.testamentaryFreedomNote}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    href="/start"
                    className="inline-flex items-center gap-2 bg-[#172228] text-white hover:bg-[#C65378] text-xs sm:text-sm font-semibold py-3 px-5 rounded-xl transition-colors"
                  >
                    <span>Lock Your Custom Asset Shares in a Will</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] hover:text-[#C65378] py-2 px-3"
                  >
                    <span>Compare Fixed-Fee Plans (₹2,490+)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* =====================================================================
           TAB 2: WILL VS. BANK / DEMAT / INSURANCE NOMINATION CHECKER
           ===================================================================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Inputs */}
          <div className="lg:col-span-5 bg-white border border-[#172228]/12 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#172228]/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
                Supreme Court Precedent Checker
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-[#111827]">
                Check Your Asset Nomination Risk
              </h3>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#374151]">
                1. Select Financial or Property Asset Type
              </label>
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value as AssetType)}
                className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-4 py-3 text-sm font-medium text-[#172228]"
              >
                <option value="demat_mf">
                  Demat Account (Zerodha/Groww/CDSL) & Mutual Funds
                </option>
                <option value="bank_fd">
                  Bank Savings, Fixed Deposit (FD) & NRE/NRO Accounts
                </option>
                <option value="housing_society">
                  Cooperative Housing Society Flat / Apartment Share
                </option>
                <option value="life_insurance">
                  Life Insurance Policy (Section 39 Insurance Act)
                </option>
                <option value="epf_gratuity">
                  Employees&apos; Provident Fund (EPF) & Gratuity
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#374151]">
                2. Who Is Currently Recorded as the Nominee in the App/Bank?
              </label>
              <select
                value={nomineeRelation}
                onChange={(e) => setNomineeRelation(e.target.value)}
                className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-4 py-3 text-sm font-medium text-[#172228]"
              >
                <option value="One Child / Brother / Parent (Single Nominee)">
                  Only 1 Person (e.g., Elder Son, Brother, or One Parent)
                </option>
                <option value="Spouse Only (100% Nominee)">
                  Spouse Only (100% Nominee on Portal)
                </option>
                <option value="No Nominee Registered Yet">
                  No Nominee Registered / Don&apos;t Remember
                </option>
                <option value="Matches Intended Beneficiaries Exactly">
                  Matches Intended Beneficiaries in Exact Percentage
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#374151]">
                3. Who Do You Want to Permanently Own & Keep This Money?
              </label>
              <select
                value={intendedBeneficiary}
                onChange={(e) => setIntendedBeneficiary(e.target.value)}
                className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-4 py-3 text-sm font-medium text-[#172228]"
              >
                <option value="Spouse & All Children Equally">
                  Spouse & All Children in Specific Shares
                </option>
                <option value="Spouse 100% Sole Owner">
                  Spouse 100% Sole Owner (Excluding Others)
                </option>
                <option value="Specific Child / Trust / Parent">
                  A Specific Child, Aging Parent, or Minor Trust
                </option>
              </select>
            </div>

            <label className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/15 cursor-pointer">
              <span className="text-xs font-bold text-[#172228]">
                Do you have a signed, two-witness Will covering this asset?
              </span>
              <input
                type="checkbox"
                checked={hasWrittenWill}
                onChange={(e) => setHasWrittenWill(e.target.checked)}
                className="h-4 w-4 accent-[#C65378]"
              />
            </label>
          </div>

          {/* Right Verdict Output */}
          <div className="lg:col-span-7 bg-white border border-[#172228]/12 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#172228]/10 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7280] block">
                  {nomineeVerdict.statute}
                </span>
                <h3 className="text-xl sm:text-2xl font-medium text-[#111827]">
                  {nomineeVerdict.title}
                </h3>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full ${
                  nomineeVerdict.riskLevel === "HIGH LITIGATION RISK"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {nomineeVerdict.riskLevel === "HIGH LITIGATION RISK" ? (
                  <ShieldAlert className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                <span>{nomineeVerdict.riskLevel}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7280]">
                  Step 1: Who Gets Immediate Release?
                </span>
                <p className="text-sm text-[#172228] leading-relaxed font-medium">
                  {nomineeVerdict.custodianRule}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#C65378]/30 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378]">
                  Step 2: Who Legally Owns the Asset?
                </span>
                <p className="text-sm text-[#172228] leading-relaxed font-medium">
                  {nomineeVerdict.ownershipRule}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#172228] text-white space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#DFCEBF] block">
                Binding Supreme Court Precedent: {nomineeVerdict.caseLaw}
              </span>
              <p className="text-xs sm:text-sm text-[#FAF7F0] leading-relaxed">
                {!hasWrittenWill
                  ? "Because you do NOT have a written Will, the nominee is legally bound to split this asset among ALL statutory legal heirs (see Tab 1). Even if you nominated your spouse 100% on the bank/Demat portal, other legal heirs can claim their statutory share unless you execute a valid Will."
                  : "Because you have a written Will, your Will's beneficiary clause legally governs ownership. Ensure the nominee recorded in your bank/Demat portal matches the primary legatee named in your Will so there is zero friction during transmission."}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 bg-[#C65378] hover:bg-[#b04567] text-white text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-xl transition-colors"
                >
                  <span>Align Your Nominations in a Legal Will</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blogs/nominee-vs-legal-heir-india-supreme-court-rule"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DFCEBF] hover:text-white py-2 px-2"
                >
                  <span>Read Full Shakti Yezdani (2023) Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
