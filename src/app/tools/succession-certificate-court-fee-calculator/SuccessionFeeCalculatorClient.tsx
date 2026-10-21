"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
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
  Award,
  Scale,
  Building,
  UserCheck,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  X,
  MapPin,
  Building2,
  Info,
  DollarSign,
  Gavel,
  Calculator,
  FileText,
  BadgePercent,
  Layers,
  ArrowUpRight,
  TrendingDown,
  Coins,
  Shield,
  FileSpreadsheet,
} from "lucide-react";

interface StateFeeRule {
  code: string;
  name: string;
  actName: string;
  rateDesc: string;
  hasCap: boolean;
  capAmount?: number;
  capDisplay: string;
  calculate: (val: number) => { fee: number; isCapped: boolean; effectiveRate: number; breakdown: string };
}

const STATE_FEE_RULES: Record<string, StateFeeRule> = {
  MH: {
    code: "MH",
    name: "Maharashtra",
    actName: "Maharashtra Court-fees Act, 1959 (Article 12)",
    rateDesc: "2% up to ₹50k, 4% to ₹2L, 6% to ₹3L, 7.5% above ₹3L (Max ₹75,000)",
    hasCap: true,
    capAmount: 75000,
    capDisplay: "₹75,000 Max Cap",
    calculate: (val: number) => {
      let fee = 0;
      let breakdown = "";
      if (val <= 50000) {
        fee = val * 0.02;
        breakdown = "2% on ₹" + val.toLocaleString("en-IN");
      } else if (val <= 200000) {
        fee = 50000 * 0.02 + (val - 50000) * 0.04;
        breakdown = "2% on ₹50k + 4% on ₹" + (val - 50000).toLocaleString("en-IN");
      } else if (val <= 300000) {
        fee = 50000 * 0.02 + 150000 * 0.04 + (val - 200000) * 0.06;
        breakdown = "2% on ₹50k + 4% on ₹1.5L + 6% on ₹" + (val - 200000).toLocaleString("en-IN");
      } else {
        fee = 50000 * 0.02 + 150000 * 0.04 + 100000 * 0.06 + (val - 300000) * 0.075;
        breakdown = "2% on ₹50k + 4% on ₹1.5L + 6% on ₹1L + 7.5% on balance";
      }
      const isCapped = fee > 75000;
      const finalFee = Math.min(fee, 75000);
      const effectiveRate = val > 0 ? (finalFee / val) * 100 : 0;
      return { fee: finalFee, isCapped, effectiveRate, breakdown };
    },
  },
  DL: {
    code: "DL",
    name: "Delhi (NCT)",
    actName: "Court Fees (Delhi Amendment) Act (Schedule I, Article 12)",
    rateDesc: "2.5% to 3.0% progressive scale (Capped ~₹75,000 in District Courts)",
    hasCap: true,
    capAmount: 75000,
    capDisplay: "₹75,000 Practical Cap",
    calculate: (val: number) => {
      let fee = 0;
      let breakdown = "";
      if (val <= 50000) {
        fee = val * 0.02;
        breakdown = "2% on ₹" + val.toLocaleString("en-IN");
      } else if (val <= 500000) {
        fee = 50000 * 0.02 + (val - 50000) * 0.025;
        breakdown = "2% on ₹50k + 2.5% on ₹" + (val - 50000).toLocaleString("en-IN");
      } else {
        fee = 50000 * 0.02 + 450000 * 0.025 + (val - 500000) * 0.03;
        breakdown = "2% on ₹50k + 2.5% on ₹4.5L + 3% on balance";
      }
      const isCapped = fee > 75000;
      const finalFee = Math.min(fee, 75000);
      const effectiveRate = val > 0 ? (finalFee / val) * 100 : 0;
      return { fee: finalFee, isCapped, effectiveRate, breakdown };
    },
  },
  KA: {
    code: "KA",
    name: "Karnataka",
    actName: "Karnataka Court-Fees and Suits Valuation Act, 1958 (Article 12)",
    rateDesc: "2.5% up to ₹15k, scaling to 5% - 7.5% (Max ₹10,00,000 Cap)",
    hasCap: true,
    capAmount: 1000000,
    capDisplay: "₹10,00,000 Max Cap",
    calculate: (val: number) => {
      let fee = 0;
      let breakdown = "";
      if (val <= 50000) {
        fee = val * 0.025;
        breakdown = "2.5% on ₹" + val.toLocaleString("en-IN");
      } else if (val <= 500000) {
        fee = 50000 * 0.025 + (val - 50000) * 0.04;
        breakdown = "2.5% on ₹50k + 4% on ₹" + (val - 50000).toLocaleString("en-IN");
      } else {
        fee = 50000 * 0.025 + 450000 * 0.04 + (val - 500000) * 0.055;
        breakdown = "2.5% on ₹50k + 4% on ₹4.5L + 5.5% on balance";
      }
      const isCapped = fee > 1000000;
      const finalFee = Math.min(fee, 1000000);
      const effectiveRate = val > 0 ? (finalFee / val) * 100 : 0;
      return { fee: finalFee, isCapped, effectiveRate, breakdown };
    },
  },
  TN: {
    code: "TN",
    name: "Tamil Nadu",
    actName: "Tamil Nadu Court-Fees and Suits Valuation Act, 1955 (Schedule I)",
    rateDesc: "2% up to ₹5,000; 3% on entire balance above ₹5,000 (No Cap)",
    hasCap: false,
    capDisplay: "No Ceiling Cap",
    calculate: (val: number) => {
      let fee = 0;
      let breakdown = "";
      if (val <= 5000) {
        fee = val * 0.02;
        breakdown = "2% up to ₹5,000";
      } else {
        fee = 5000 * 0.02 + (val - 5000) * 0.03;
        breakdown = "2% on ₹5,000 + 3% on ₹" + (val - 5000).toLocaleString("en-IN");
      }
      const effectiveRate = val > 0 ? (fee / val) * 100 : 0;
      return { fee, isCapped: false, effectiveRate, breakdown };
    },
  },
  TG: {
    code: "TG",
    name: "Telangana",
    actName: "Telangana Court-Fees and Suits Valuation Act, 1956 (Article 7)",
    rateDesc: "2% to 6% progressive slabs (6% on value exceeding ₹1,00,000)",
    hasCap: false,
    capDisplay: "No Ceiling Cap",
    calculate: (val: number) => {
      let fee = 0;
      let breakdown = "";
      if (val <= 5000) {
        fee = val * 0.02;
        breakdown = "2% on first ₹5k";
      } else if (val <= 25000) {
        fee = 100 + (val - 5000) * 0.03;
        breakdown = "2% on ₹5k + 3% on ₹" + (val - 5000).toLocaleString("en-IN");
      } else if (val <= 50000) {
        fee = 700 + (val - 25000) * 0.04;
        breakdown = "Slabs up to 4%";
      } else if (val <= 100000) {
        fee = 1700 + (val - 50000) * 0.05;
        breakdown = "Slabs up to 5%";
      } else {
        fee = 4200 + (val - 100000) * 0.06;
        breakdown = "Slabs + 6% on value over ₹1,00,000";
      }
      const effectiveRate = val > 0 ? (fee / val) * 100 : 0;
      return { fee, isCapped: false, effectiveRate, breakdown };
    },
  },
  AP: {
    code: "AP",
    name: "Andhra Pradesh",
    actName: "Andhra Pradesh Court-Fees Act, 1956 (Schedule I, Article 7)",
    rateDesc: "2% to 6% progressive slabs (6% on value exceeding ₹1,00,000)",
    hasCap: false,
    capDisplay: "No Ceiling Cap",
    calculate: (val: number) => {
      let fee = 0;
      let breakdown = "";
      if (val <= 5000) {
        fee = val * 0.02;
        breakdown = "2% on first ₹5k";
      } else if (val <= 25000) {
        fee = 100 + (val - 5000) * 0.03;
        breakdown = "2% on ₹5k + 3% on ₹" + (val - 5000).toLocaleString("en-IN");
      } else if (val <= 50000) {
        fee = 700 + (val - 25000) * 0.04;
        breakdown = "Slabs up to 4%";
      } else if (val <= 100000) {
        fee = 1700 + (val - 50000) * 0.05;
        breakdown = "Slabs up to 5%";
      } else {
        fee = 4200 + (val - 100000) * 0.06;
        breakdown = "Slabs + 6% on value over ₹1,00,000";
      }
      const effectiveRate = val > 0 ? (fee / val) * 100 : 0;
      return { fee, isCapped: false, effectiveRate, breakdown };
    },
  },
  WB: {
    code: "WB",
    name: "West Bengal",
    actName: "West Bengal Court-Fees Act, 1970 (Schedule I, Article 12)",
    rateDesc: "2% on first ₹10k, 3% to ₹50k, 4% to ₹1L, 5% on balance (No Cap)",
    hasCap: false,
    capDisplay: "No Ceiling Cap",
    calculate: (val: number) => {
      let fee = 0;
      let breakdown = "";
      if (val <= 10000) {
        fee = val * 0.02;
        breakdown = "2% on first ₹10k";
      } else if (val <= 50000) {
        fee = 200 + (val - 10000) * 0.03;
        breakdown = "2% on ₹10k + 3% on ₹" + (val - 10000).toLocaleString("en-IN");
      } else if (val <= 100000) {
        fee = 1400 + (val - 50000) * 0.04;
        breakdown = "Slabs up to 4%";
      } else {
        fee = 3400 + (val - 100000) * 0.05;
        breakdown = "Slabs + 5% on value over ₹1,00,000";
      }
      const effectiveRate = val > 0 ? (fee / val) * 100 : 0;
      return { fee, isCapped: false, effectiveRate, breakdown };
    },
  },
  UP: {
    code: "UP",
    name: "Uttar Pradesh",
    actName: "Court Fees Act, 1870 (UP State Amendment, Schedule I)",
    rateDesc: "2.5% to 6.5% progressive ad valorem slabs (High bracket rates)",
    hasCap: false,
    capDisplay: "Progressive (No Strict Cap)",
    calculate: (val: number) => {
      let fee = 0;
      let breakdown = "";
      if (val <= 50000) {
        fee = val * 0.025;
        breakdown = "2.5% on ₹" + val.toLocaleString("en-IN");
      } else if (val <= 300000) {
        fee = 1250 + (val - 50000) * 0.04;
        breakdown = "2.5% on ₹50k + 4% on ₹" + (val - 50000).toLocaleString("en-IN");
      } else if (val <= 1000000) {
        fee = 11250 + (val - 300000) * 0.055;
        breakdown = "Slabs up to 5.5%";
      } else {
        fee = 49750 + (val - 1000000) * 0.065;
        breakdown = "Slabs + 6.5% on value over ₹10 Lakhs";
      }
      const effectiveRate = val > 0 ? (fee / val) * 100 : 0;
      return { fee, isCapped: false, effectiveRate, breakdown };
    },
  },
  GJ: {
    code: "GJ",
    name: "Gujarat",
    actName: "Gujarat Court Fees Act, 2004 (Article 12)",
    rateDesc: "3.0% ad valorem on total movable valuation (Capped at ₹75,000)",
    hasCap: true,
    capAmount: 75000,
    capDisplay: "₹75,000 Max Cap",
    calculate: (val: number) => {
      const rawFee = val * 0.03;
      const isCapped = rawFee > 75000;
      const finalFee = Math.min(rawFee, 75000);
      const effectiveRate = val > 0 ? (finalFee / val) * 100 : 0;
      const breakdown = "3.0% ad valorem on ₹" + val.toLocaleString("en-IN");
      return { fee: finalFee, isCapped, effectiveRate, breakdown };
    },
  },
  RJ: {
    code: "RJ",
    name: "Rajasthan",
    actName: "Rajasthan Court Fees and Suits Valuation Act, 1961",
    rateDesc: "3.0% to 5.0% progressive scale (Capped at ₹75,000)",
    hasCap: true,
    capAmount: 75000,
    capDisplay: "₹75,000 Max Cap",
    calculate: (val: number) => {
      let fee = 0;
      if (val <= 100000) {
        fee = val * 0.03;
      } else if (val <= 500000) {
        fee = 3000 + (val - 100000) * 0.04;
      } else {
        fee = 19000 + (val - 500000) * 0.05;
      }
      const isCapped = fee > 75000;
      const finalFee = Math.min(fee, 75000);
      const effectiveRate = val > 0 ? (finalFee / val) * 100 : 0;
      const breakdown = "Slab 3% to 5% ad valorem";
      return { fee: finalFee, isCapped, effectiveRate, breakdown };
    },
  },
  KL: {
    code: "KL",
    name: "Kerala",
    actName: "Kerala Court-Fees and Suits Valuation Act, 1959",
    rateDesc: "1.0% to 2.0% ad valorem on movable aggregate debts & securities",
    hasCap: false,
    capDisplay: "Low Baseline Rate (1% - 2%)",
    calculate: (val: number) => {
      let fee = 0;
      if (val <= 1000000) {
        fee = val * 0.01;
      } else {
        fee = 10000 + (val - 1000000) * 0.02;
      }
      const effectiveRate = val > 0 ? (fee / val) * 100 : 0;
      const breakdown = "1% up to ₹10L + 2% on balance";
      return { fee, isCapped: false, effectiveRate, breakdown };
    },
  },
  PB: {
    code: "PB",
    name: "Punjab",
    actName: "Court Fees Act, 1870 (Punjab Amendment)",
    rateDesc: "2.5% to 4.0% progressive ad valorem slabs",
    hasCap: false,
    capDisplay: "Progressive Ad Valorem",
    calculate: (val: number) => {
      let fee = 0;
      if (val <= 100000) fee = val * 0.025;
      else if (val <= 500000) fee = 2500 + (val - 100000) * 0.032;
      else fee = 15300 + (val - 500000) * 0.04;
      const effectiveRate = val > 0 ? (fee / val) * 100 : 0;
      return { fee, isCapped: false, effectiveRate, breakdown: "2.5% to 4% progressive" };
    },
  },
  HR: {
    code: "HR",
    name: "Haryana",
    actName: "Court Fees (Haryana Amendment) Act",
    rateDesc: "2.5% to 4.0% progressive ad valorem slabs",
    hasCap: false,
    capDisplay: "Progressive Ad Valorem",
    calculate: (val: number) => {
      let fee = 0;
      if (val <= 100000) fee = val * 0.025;
      else if (val <= 500000) fee = 2500 + (val - 100000) * 0.032;
      else fee = 15300 + (val - 500000) * 0.04;
      const effectiveRate = val > 0 ? (fee / val) * 100 : 0;
      return { fee, isCapped: false, effectiveRate, breakdown: "2.5% to 4% progressive" };
    },
  },
  MP: {
    code: "MP",
    name: "Madhya Pradesh",
    actName: "Court Fees Act, 1870 (MP State Amendment)",
    rateDesc: "3.0% to 5.0% progressive slabs on valuation",
    hasCap: false,
    capDisplay: "Progressive Ad Valorem",
    calculate: (val: number) => {
      let fee = 0;
      if (val <= 100000) fee = val * 0.03;
      else if (val <= 500000) fee = 3000 + (val - 100000) * 0.04;
      else fee = 19000 + (val - 500000) * 0.05;
      const effectiveRate = val > 0 ? (fee / val) * 100 : 0;
      return { fee, isCapped: false, effectiveRate, breakdown: "3% to 5% progressive" };
    },
  },
  BR: {
    code: "BR",
    name: "Bihar",
    actName: "Court Fees (Bihar Amendment) Act",
    rateDesc: "3.5% to 6.0% progressive ad valorem scale",
    hasCap: false,
    capDisplay: "Progressive Ad Valorem",
    calculate: (val: number) => {
      let fee = 0;
      if (val <= 100000) fee = val * 0.035;
      else if (val <= 500000) fee = 3500 + (val - 100000) * 0.045;
      else fee = 21500 + (val - 500000) * 0.06;
      const effectiveRate = val > 0 ? (fee / val) * 100 : 0;
      return { fee, isCapped: false, effectiveRate, breakdown: "3.5% to 6% progressive" };
    },
  },
  GA: {
    code: "GA",
    name: "Goa",
    actName: "Goa Court-Fees and Suits Valuation Act",
    rateDesc: "2.0% to 3.5% ad valorem (Capped at ₹50,000)",
    hasCap: true,
    capAmount: 50000,
    capDisplay: "₹50,000 Max Cap",
    calculate: (val: number) => {
      let fee = val * 0.025;
      const isCapped = fee > 50000;
      const finalFee = Math.min(fee, 50000);
      const effectiveRate = val > 0 ? (finalFee / val) * 100 : 0;
      return { fee: finalFee, isCapped, effectiveRate, breakdown: "2.5% ad valorem (Max ₹50k)" };
    },
  },
  OD: {
    code: "OD",
    name: "Odisha",
    actName: "Court Fees (Odisha Amendment) Act",
    rateDesc: "2.5% to 5.0% progressive ad valorem scale",
    hasCap: false,
    capDisplay: "Progressive Ad Valorem",
    calculate: (val: number) => {
      let fee = 0;
      if (val <= 100000) fee = val * 0.025;
      else if (val <= 500000) fee = 2500 + (val - 100000) * 0.038;
      else fee = 17700 + (val - 500000) * 0.05;
      const effectiveRate = val > 0 ? (fee / val) * 100 : 0;
      return { fee, isCapped: false, effectiveRate, breakdown: "2.5% to 5% progressive" };
    },
  },
  OTHER: {
    code: "OTHER",
    name: "All Other States & UTs (Central Act 1870)",
    actName: "Court Fees Act, 1870 (Schedule I, Article 12 Baseline)",
    rateDesc: "2.5% to 4.0% average baseline across Indian Union Territories",
    hasCap: false,
    capDisplay: "Standard Baseline ~3%",
    calculate: (val: number) => {
      const fee = val * 0.03;
      const effectiveRate = 3.0;
      return { fee, isCapped: false, effectiveRate, breakdown: "3.0% central baseline ad valorem" };
    },
  },
};

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. What is a Succession Certificate & Why are Fees Charged?" },
  { id: "interactive-calculator", label: "2. Interactive Court Fee Calculator" },
  { id: "state-rates-and-caps", label: "3. State Court Fee Rates & Maximum Limits" },
  { id: "eligible-assets-matrix", label: "4. Bank Accounts vs Real Estate (Which Assets Qualify?)" },
  { id: "visual-blueprint", label: "5. Visual Guide to Getting a Succession Certificate" },
  { id: "step-by-step-sop", label: "6. Six Steps: From Filing Petition to Receiving Certificate" },
  { id: "hidden-costs-breakdown", label: "7. Hidden Costs (Lawyer Fees, Newspaper Notices & Guarantees)" },
  { id: "cost-time-comparison", label: "8. Succession Certificate vs Writing a Will (Cost Comparison)" },
  { id: "procedural-timeline", label: "9. Court Timeline & Expected Delays" },
  { id: "specialized-scenarios", label: "10. Common Real-Life Scenarios" },
  { id: "avoiding-court-fees", label: "11. How a Simple Will Saves ₹75,000+ in Court Fees" },
  { id: "institutional-profile", label: "12. Legal Backing & Support" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Relevant Laws & Official Portals" },
];

const FAQS = [
  {
    q: "How much court fee do I have to pay for a succession certificate?",
    a: "Court fees are calculated as a percentage of the total money in bank accounts, fixed deposits, and shares being claimed (known as ad valorem fee under the Court Fees Act, 1870). Rates usually range between 2% and 7.5% depending on your state. Some states set a maximum limit (for example, Maharashtra and Gujarat cap it at ₹75,000, while Karnataka caps it at ₹10,00,000). Other states have no maximum cap.",
  },
  {
    q: "Do I pay the court fee when filing the case or at the end?",
    a: "You only pay a very small token fee (usually ₹50 to ₹200) when filing the petition in court. The main court fee (the 2% to 7.5% percentage) is paid at the very end (under Section 379 of the Indian Succession Act), only after the judge approves your petition and before the official sealed certificate is handed to you.",
  },
  {
    q: "Can I get a succession certificate for a house, flat, or land?",
    a: "No! Under Section 370 of the Indian Succession Act, 1925, a Succession Certificate is strictly for movable assets (bank accounts, fixed deposits, shares, mutual funds, or money owed to the deceased). It can NEVER be issued for land, flats, or houses. For inherited real estate without a Will, legal heirs must obtain a Legal Heir Certificate from the local revenue office (Tehsildar) or apply for Letters of Administration in court.",
  },
  {
    q: "How does writing a Will save my family from paying court fees?",
    a: "A Succession Certificate is only needed when someone dies without a Will. If the deceased wrote a valid Will appointing an executor and naming beneficiaries, banks and mutual funds transfer the money directly based on the Will and death certificate. This completely saves your family from paying 2% to 7.5% court fees (up to ₹75,000+), ₹10,000+ in newspaper ads, and waiting 6 to 9 months in court.",
  },
  {
    q: "Why do banks ask for a succession certificate even if a nominee exists?",
    a: "Under Indian law (upheld by the Supreme Court in Sarbati Devi and Shakti Yezdani), a nominee is only a temporary trustee or caretaker, not the owner of the money. If the bank balance is large (usually over ₹5 Lakhs to ₹15 Lakhs, depending on the bank) or if other relatives raise objections, banks demand a court succession certificate so that the bank is legally protected from any lawsuits.",
  },
  {
    q: "What is the maximum court fee limit in Maharashtra and Delhi?",
    a: "In Maharashtra, the fee is capped at a maximum of ₹75,000 under the Maharashtra Court-fees Act, 1959, whether the family is claiming ₹25 Lakhs or ₹5 Crore. In Delhi, progressive rates generally average around 2.5% to 3%, with district courts generally observing practical administrative caps around ₹75,000.",
  },
  {
    q: "Are women, widows, or children exempt from court fees in any state?",
    a: "Yes. Some states offer special court fee discounts or total exemptions for women and widows. For example, Maharashtra has issued government notifications exempting female litigants from court fees in certain family and inheritance cases, subject to income limits. Always ask your lawyer to check your state's current fee rules.",
  },
  {
    q: "What other hidden costs are involved besides the court fee?",
    a: "Along with the court percentage fee, you will also need to pay for: (1) Newspaper advertisements: Mandatory public notices in two daily newspapers (one English, one local language), costing around ₹6,000 to ₹12,000. (2) Lawyer fees: Usually ₹25,000 to ₹60,000 depending on the court. (3) Surety / Guarantor bond: Stamp paper for an indemnity bond (Section 375). (4) Court paperwork and typing: ₹2,000 to ₹5,000.",
  },
  {
    q: "How long does it take to get a succession certificate from court?",
    a: "If no family member objects (uncontested), it typically takes 4 to 8 months. The court must issue newspaper notices giving the public 30 to 45 days to raise any objections, verify family identity documents, calculate the court fees, and prepare the final sealed certificate.",
  },
  {
    q: "What is a surety bond in a succession certificate case?",
    a: "Under Section 375 of the Indian Succession Act, the court usually asks the person receiving the certificate to bring one or two 'sureties' (guarantors who own property or hold government jobs). They sign a bond promising that if any other rightful heir shows up later, the money will not be stolen or misused. This is an extra step that requires arranging guarantors.",
  },
];

export default function SuccessionFeeCalculatorClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculator State
  const [selectedStateCode, setSelectedStateCode] = useState<string>("MH");
  const [assetValue, setAssetValue] = useState<number>(2500000); // default ₹25 Lakhs
  const [inputValue, setInputValue] = useState<string>("25,00,000");

  // Asset category checklist
  const [categories, setCategories] = useState({
    bankAccounts: true,
    fixedDeposits: true,
    dematShares: true,
    mutualFunds: true,
    insurancePF: false,
    otherDebts: false,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-100px 0px -40% 0px",
      threshold: 0.05,
    });

    const elements = document.querySelectorAll("section[id], div[id].scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleValueChange = (num: number) => {
    const clamped = Math.max(10000, Math.min(num, 100000000)); // ₹10k to ₹10 Crore
    setAssetValue(clamped);
    setInputValue(clamped.toLocaleString("en-IN"));
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (!raw) {
      setInputValue("");
      setAssetValue(0);
      return;
    }
    const num = parseInt(raw, 10);
    setInputValue(num.toLocaleString("en-IN"));
    setAssetValue(num);
  };

  const currentRule = useMemo(() => {
    return STATE_FEE_RULES[selectedStateCode] || STATE_FEE_RULES.OTHER;
  }, [selectedStateCode]);

  const calculationResult = useMemo(() => {
    return currentRule.calculate(assetValue);
  }, [currentRule, assetValue]);

  // Secondary expenses estimation
  const secondaryCosts = useMemo(() => {
    const paperCost = 8000;
    const lawyerCost = assetValue > 5000000 ? 50000 : 35000;
    const suretyStamp = assetValue > 5000000 ? 5000 : 2500;
    const miscCost = 2500;
    const totalExtra = paperCost + lawyerCost + suretyStamp + miscCost;
    const totalProcessCost = calculationResult.fee + totalExtra;
    const willCost = 2999;
    const totalSavings = Math.max(0, totalProcessCost - willCost);
    return {
      paperCost,
      lawyerCost,
      suretyStamp,
      miscCost,
      totalExtra,
      totalProcessCost,
      totalSavings,
    };
  }, [assetValue, calculationResult.fee]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Calculator className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INTERACTIVE STATUTORY CALCULATOR</span>
          </div>

          {/* H1 Title: Single H1 on page, 30-65 chars, distinct from title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Succession Certificate Court Fee Calculator &amp; State Rates
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate accurate ad valorem court fees for bank accounts, shares, and securities across
            all Indian states. Learn statutory caps, hidden legal expenses, and discover why making a
            Will avoids court fees entirely.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Court Fees</span>
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Will to Avoid Fees</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2% – 7.5%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                AD VALOREM STATE RATES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">28 States &amp; UTs</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STATUTORY SCHEDULES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹75,000</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MAX STATUTORY STATE CAPS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">₹0 Court Fee</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                100% AVOIDABLE WITH A WILL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content Area)
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
              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>Print Fee Summary</span>
                </button>
              </div>
            </div>

            {/* Statutory Compliance Badge */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-rose-300 font-bold uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C65378]" />
                <span>STATUTORY COMPLIANCE</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Verified under Part X, Indian Succession Act, 1925 and State Court Fees Acts as of 2026.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL & CALCULATOR CONTENT
              ===================================================================== */}
          <main className="space-y-8 md:space-y-12 min-w-0">
            {/* -----------------------------------------------------------------
                SECTION 0: EXECUTIVE SUMMARY BRIEF BOX
                ----------------------------------------------------------------- */}
            <div className="rounded-2xl bg-white border border-slate-200/90 border-l-[6px] border-l-[#C65378] p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378] mb-3">
                <Shield className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: COURT FEES ON SUCCESSION CERTIFICATES</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Ad Valorem Assessment:</strong> Under Section 379 of the Indian Succession Act,
                    court fees are assessed as a percentage (2% to 7.5%) of the total movable debts and securities.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Limitation to Movables:</strong> Section 370 prohibits succession certificates
                    for real estate (land, apartments, houses). It applies only to bank balances, FDs, shares, and PF.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>State Maximum Caps:</strong> Certain progressive states enforce statutory ceilings (e.g.,
                    ₹75,000 in Maharashtra and Gujarat; ₹10,00,000 in Karnataka), while other states scale without caps.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Avoidable by Drafting a Will:</strong> A valid Will with an executor bypasses the
                    entire court petition, newspaper citations, and saves families between ₹40,000 and ₹1,50,000+ in fees.
                  </span>
                </li>
              </ul>
            </div>

            {/* -----------------------------------------------------------------
                SECTION 1: STATUTORY FRAMEWORK
                ----------------------------------------------------------------- */}
            <section id="statutory-framework" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL BASIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                1. Statutory Framework: Part X ISA 1925
              </h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  When an individual passes away in India without leaving behind a valid Will (known as dying intestate),
                  banks, asset management companies, and post offices freeze all accounts in the deceased person's name.
                  To unlock these funds, the legal heirs must obtain a formal document known as a{" "}
                  <strong>Succession Certificate</strong> from the competent civil court.
                </p>
                <p>
                  This process is strictly governed by <strong>Part X (Sections 370 to 390)</strong> of the Indian
                  Succession Act, 1925. Under <strong>Section 370</strong>, the certificate can only be granted with respect
                  to any <em>debt or security</em>. It does not confer title over immovable real estate such as agricultural
                  land or residential apartments.
                </p>
                <p>
                  Under <strong>Section 379(1)</strong> of the Act, every petition for a succession certificate must be
                  accompanied by a deposit of court fees payable under the relevant State Court Fees Act. The court fee is
                  an <em>ad valorem levy</em>, meaning the government calculates the fee as a direct percentage of the
                  total market value of the assets claimed.
                </p>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 2: INTERACTIVE CALCULATOR TOOL
                ----------------------------------------------------------------- */}
            <section id="interactive-calculator" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>ONLINE TOOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                2. Interactive Court Fee Calculator by State
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Select your state and enter the total valuation of the deceased person's movable assets (bank balances,
                fixed deposits, mutual funds, and shares) to estimate the statutory court fees and procedural costs.
              </p>

              {/* Calculator Box Container */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 sm:p-7 space-y-6">
                {/* State Selection Dropdown */}
                <div>
                  <label htmlFor="state-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Step 1: Select Filing State or Union Territory
                  </label>
                  <div className="relative">
                    <select
                      id="state-select"
                      value={selectedStateCode}
                      onChange={(e) => setSelectedStateCode(e.target.value)}
                      className="w-full bg-[#FAF7F0] border border-slate-300 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-[#172228] focus:outline-hidden focus:ring-2 focus:ring-[#C65378]"
                    >
                      {Object.values(STATE_FEE_RULES).map((rule) => (
                        <option key={rule.code} value={rule.code}>
                          {rule.name} {rule.hasCap ? `(${rule.capDisplay})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                    <span>Governing statute: {currentRule.actName}</span>
                  </p>
                </div>

                {/* Asset Value Input & Preset Buttons */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="asset-input" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Step 2: Total Movable Debts &amp; Securities Value (₹)
                    </label>
                    <span className="text-xs font-semibold text-[#C65378]">
                      ₹{assetValue.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="relative mb-3">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                      ₹
                    </div>
                    <input
                      id="asset-input"
                      type="text"
                      value={inputValue}
                      onChange={handleManualInput}
                      placeholder="e.g. 25,00,000"
                      className="w-full pl-8 pr-4 py-3 bg-[#FAF7F0] border border-slate-300 rounded-xl text-base sm:text-lg font-bold text-[#172228] focus:outline-hidden focus:ring-2 focus:ring-[#C65378]"
                    />
                  </div>

                  {/* Range Slider */}
                  <input
                    type="range"
                    min="50000"
                    max="20000000"
                    step="50000"
                    value={assetValue}
                    onChange={(e) => handleValueChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C65378] mb-3"
                  />

                  {/* Preset Value Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { label: "₹5 Lakh", val: 500000 },
                      { label: "₹10 Lakh", val: 1000000 },
                      { label: "₹25 Lakh", val: 2500000 },
                      { label: "₹50 Lakh", val: 5000000 },
                      { label: "₹1 Crore", val: 10000000 },
                      { label: "₹2 Crore", val: 20000000 },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => handleValueChange(preset.val)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                          assetValue === preset.val
                            ? "bg-[#172228] text-white border-[#172228]"
                            : "bg-white text-slate-700 border-slate-200 hover:border-[#C65378] hover:text-[#C65378]"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Movable Asset Classification Checkbox helper */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Included Asset Categories (Movable Only):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categories.bankAccounts}
                        onChange={(e) => setCategories({ ...categories, bankAccounts: e.target.checked })}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>Savings / Current</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categories.fixedDeposits}
                        onChange={(e) => setCategories({ ...categories, fixedDeposits: e.target.checked })}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>Fixed Deposits (FD)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categories.dematShares}
                        onChange={(e) => setCategories({ ...categories, dematShares: e.target.checked })}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>Demat Shares</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categories.mutualFunds}
                        onChange={(e) => setCategories({ ...categories, mutualFunds: e.target.checked })}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>Mutual Funds</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categories.insurancePF}
                        onChange={(e) => setCategories({ ...categories, insurancePF: e.target.checked })}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>PPF / Gratuity / LIC</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categories.otherDebts}
                        onChange={(e) => setCategories({ ...categories, otherDebts: e.target.checked })}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>Other Debts / Bonds</span>
                    </label>
                  </div>
                </div>

                {/* Calculation Output Cards */}
                <div className="bg-[#FAF7F0] rounded-xl p-5 border border-slate-200/90 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#49585F]">
                        Estimated Ad Valorem Court Fee
                      </span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#C65378]">
                        ₹{Math.round(calculationResult.fee).toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#49585F]">
                        Effective Rate
                      </span>
                      <div className="text-lg sm:text-xl font-bold text-[#172228]">
                        {calculationResult.effectiveRate.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  {/* Formula Breakdown & Cap notice */}
                  <div className="text-xs space-y-1.5 text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Calculation Basis:</span>
                      <span className="font-mono text-slate-800">{calculationResult.breakdown}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Statutory Ceiling Status:</span>
                      <span
                        className={`font-bold ${
                          calculationResult.isCapped ? "text-emerald-700" : "text-slate-700"
                        }`}
                      >
                        {calculationResult.isCapped
                          ? `Statutory Cap Applied (${currentRule.capDisplay})`
                          : currentRule.capDisplay}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span className="font-semibold">Estimated Total Hidden Costs (Papers, Lawyer, Surety):</span>
                      <span className="font-bold text-slate-800">
                        +₹{secondaryCosts.totalExtra.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 font-bold text-slate-900 text-sm">
                      <span>Total Estimated Cost of Succession Certificate:</span>
                      <span className="text-rose-700 font-extrabold">
                        ₹{Math.round(secondaryCosts.totalProcessCost).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Prominent High-Impact Callout: A Will Avoids This Cost Entirely */}
                  <div className="mt-4 rounded-xl bg-[#172228] text-white p-4 sm:p-5 relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#C65378]/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>100% COST AVOIDANCE AVAILABLE</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-extrabold text-white">
                          A Will Avoids This Entire Cost (₹0 Court Fee)
                        </h3>
                        <p className="text-xs text-slate-300 max-w-lg mt-1 leading-relaxed">
                          By executing a legally valid Will today, your family avoids this{" "}
                          <span className="text-rose-300 font-bold">
                            ₹{Math.round(secondaryCosts.totalProcessCost).toLocaleString("en-IN")}
                          </span>{" "}
                          expense, skips 6 months of court visits, and claims assets seamlessly.
                        </p>
                      </div>
                      <button
                        onClick={handleStartDraft}
                        className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs sm:text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5"
                      >
                        <span>Draft Your Will</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Secondary CTA to Succession Certificate Service */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 bg-blue-50/60 rounded-xl p-3.5 border border-blue-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Need experienced advocates to file for a succession certificate in your local district court?</span>
                  </div>
                  <Link
                    href="/service/succession-certificate"
                    className="shrink-0 text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 hover:underline"
                  >
                    <span>Succession Legal Services</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 3: STATE BY STATE RATES AND CAPS TABLE
                ----------------------------------------------------------------- */}
            <section id="state-rates-and-caps" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <BadgePercent className="w-4 h-4" />
                <span>STATE COMPARISON</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                3. State-by-State Court Fee Slabs &amp; Maximum Caps
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Because court fees fall under the State List of the Seventh Schedule of the Indian Constitution,
                each state legislature amends the Court Fees Act, 1870. The table below outlines the governing statute,
                rate formulas, maximum caps, and sample court fees on a representative ₹25 Lakh estate.
              </p>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4 font-bold">State / UT</th>
                        <th className="py-3 px-4 font-bold">Governing Legislation</th>
                        <th className="py-3 px-4 font-bold">Ad Valorem Slab Rate</th>
                        <th className="py-3 px-4 font-bold">Maximum Cap</th>
                        <th className="py-3 px-4 font-bold text-right">Fee on ₹25 Lakhs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#172228]">Maharashtra</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Maharashtra Court-fees Act (Art. 12)</td>
                        <td className="py-3 px-4">2% up to ₹50k, scaling to 7.5%</td>
                        <td className="py-3 px-4 font-bold text-emerald-700">₹75,000 (Strict Cap)</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#172228]">₹75,000</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-[#172228]">Delhi (NCT)</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Court Fees (Delhi Amendment) Act</td>
                        <td className="py-3 px-4">2.5% to 3.0% progressive</td>
                        <td className="py-3 px-4 font-bold text-emerald-700">₹75,000 (District Cap)</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#172228]">₹72,250</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#172228]">Karnataka</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Karnataka Court-Fees Act, 1958</td>
                        <td className="py-3 px-4">2.5% to 5.5% progressive</td>
                        <td className="py-3 px-4 font-bold text-slate-800">₹10,00,000 Ceiling</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#172228]">₹1,29,250</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-[#172228]">Tamil Nadu</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Tamil Nadu Court-Fees Act, 1955</td>
                        <td className="py-3 px-4">2% on first ₹5k; 3% on balance</td>
                        <td className="py-3 px-4 text-amber-700 font-semibold">No General Ceiling</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#172228]">₹74,950</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#172228]">Telangana</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Telangana Court-Fees Act, 1956</td>
                        <td className="py-3 px-4">2% to 6% (6% over ₹1 Lakh)</td>
                        <td className="py-3 px-4 text-rose-700 font-semibold">Uncapped (6%)</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#172228]">₹1,48,200</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-[#172228]">Andhra Pradesh</td>
                        <td className="py-3 px-4 text-xs text-slate-500">AP Court-Fees Act, 1956</td>
                        <td className="py-3 px-4">2% to 6% (6% over ₹1 Lakh)</td>
                        <td className="py-3 px-4 text-rose-700 font-semibold">Uncapped (6%)</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#172228]">₹1,48,200</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#172228]">West Bengal</td>
                        <td className="py-3 px-4 text-xs text-slate-500">West Bengal Court-Fees Act, 1970</td>
                        <td className="py-3 px-4">2% to 5% (5% over ₹1 Lakh)</td>
                        <td className="py-3 px-4 text-rose-700 font-semibold">Uncapped (5%)</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#172228]">₹1,23,400</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-[#172228]">Uttar Pradesh</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Court Fees Act, 1870 (UP Amend.)</td>
                        <td className="py-3 px-4">2.5% to 6.5% progressive</td>
                        <td className="py-3 px-4 text-rose-700 font-semibold">Uncapped (6.5%)</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#172228]">₹1,47,250</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#172228]">Gujarat</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Gujarat Court Fees Act, 2004</td>
                        <td className="py-3 px-4">3.0% ad valorem</td>
                        <td className="py-3 px-4 font-bold text-emerald-700">₹75,000 (Strict Cap)</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#172228]">₹75,000</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-[#172228]">Kerala</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Kerala Court-Fees Act, 1959</td>
                        <td className="py-3 px-4">1.0% to 2.0% ad valorem</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Low Baseline</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#172228]">₹40,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                  <span>* Rates reflect 2026 state statutory schedules for uncontested succession petitions.</span>
                  <span className="font-semibold text-slate-700">Verified by AMA Legal Solutions</span>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 4: ELIGIBLE ASSETS MATRIX
                ----------------------------------------------------------------- */}
            <section id="eligible-assets-matrix" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>ASSET CLASSIFICATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                4. Eligible Assets: Movable Debts vs Real Estate
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                A critical legal error made by petitioners is including real estate within a succession certificate
                petition. Under Section 370 of the Indian Succession Act, civil courts have no jurisdiction to grant
                a certificate for immovable properties.
              </p>

              {/* 2-Column Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Eligible Column */}
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Eligible: Movable Debts &amp; Securities</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Court fees apply only to the items below. The certificate provides full statutory discharge:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Bank Accounts:</strong> Savings, Current, and Fixed Deposits.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Demat Accounts:</strong> Equity shares, bonds, and debentures.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Mutual Funds:</strong> Units held across AMCs and registrars.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Government Securities:</strong> Sovereign gold bonds, NSC, and PPF.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Employment Benefits:</strong> Unpaid salary, gratuity, and insurance.</span>
                    </li>
                  </ul>
                </div>

                {/* Ineligible Column */}
                <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-extrabold text-sm sm:text-base">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>Excluded: Immovable Real Estate</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Section 370 prohibits these assets. Petitioning for them causes court rejection:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✗</span>
                      <span><strong>Residential Apartments:</strong> Flats, builder floors, and villas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✗</span>
                      <span><strong>Agricultural Land:</strong> Inherited agricultural farmland.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✗</span>
                      <span><strong>Commercial Plots:</strong> Retail shops, offices, and warehouses.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✗</span>
                      <span><strong>Required Remedy:</strong> Legal Heir Certificate for mutation, or Probate / LOA.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✗</span>
                      <span><strong>Best Alternative:</strong> A comprehensive Will covering both land &amp; cash.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 5: VISUAL BLUEPRINT
                ----------------------------------------------------------------- */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>VISUAL BLUEPRINT</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                5. Visual Blueprint: Court Fee Assessment SOP
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                The diagram below illustrates the complete statutory journey from the freezing of bank debts upon
                an intestate death, to petition valuation, ad valorem fee assessment, newspaper citation, and final grant.
              </p>

              {/* Infographic Container */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs">
                <div className="relative w-full aspect-16/9 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                  <Image
                    src="/images/succession-certificate-fee-flow-infographic.svg"
                    alt="Succession Certificate Court Fee Assessment and Issuance SOP Workflow under Indian Succession Act 1925"
                    fill
                    className="object-contain hover:scale-[1.01] transition-transform duration-300"
                    priority={false}
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 px-1 text-xs text-slate-500">
                  <span>Figure 1: Statutory stages of succession certificate court fee calculation and issuance.</span>
                  <a
                    href="/images/succession-certificate-fee-flow-infographic.svg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#C65378] hover:underline"
                  >
                    <span>View High-Resolution Vector</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 6: STEP-BY-STEP SOP
                ----------------------------------------------------------------- */}
            <section id="step-by-step-sop" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PROCEDURAL GUIDE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                6. Step-by-Step SOP: Six Stages from Petition to Grant
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Obtaining a succession certificate requires strict adherence to civil court procedure under the Code
                of Civil Procedure, 1908 and Part X of the Indian Succession Act, 1925:
              </p>

              <div className="space-y-4">
                {[
                  {
                    num: "1",
                    title: "Stage 1: Asset Identification & Valuation Audit",
                    desc: "Compile exact account numbers, depository DP IDs, folio details, and accrued interest balances as of the date of death. Securities like listed shares must be valued using official stock exchange closing prices.",
                  },
                  {
                    num: "2",
                    title: "Stage 2: Drafting & Verifying Petition under Section 372",
                    desc: "Draft the formal petition before the competent District Judge. It must detail the deceased person's ordinary residence, exact time of death, family pedigree tree, absence of any Will, and list of all Class I legal heirs.",
                  },
                  {
                    num: "3",
                    title: "Stage 3: Court Filing & Public Newspaper Citation",
                    desc: "File the petition with an initial nominal court fee. The District Judge orders issuance of public citations in two prominent local daily newspapers (one English, one vernacular) granting 30 to 45 days for objections.",
                  },
                  {
                    num: "4",
                    title: "Stage 4: Legal Heir Service & Recording Evidence",
                    desc: "Serve formal summons on all surviving legal heirs. Heirs who agree to the petition file affidavits of No Objection (NOC). The petitioner appears before court to record formal testimony (examination-in-chief).",
                  },
                  {
                    num: "5",
                    title: "Stage 5: Final Pronouncement & Ad Valorem Court Fee Deposit",
                    desc: "If no caveats or third-party objections are filed, the court delivers judgment granting the certificate. Under Section 379, the petitioner deposits the calculated ad valorem court fee via judicial stamp paper or e-Court fee receipt.",
                  },
                  {
                    num: "6",
                    title: "Stage 6: Execution of Surety Bond & Certificate Sealing",
                    desc: "The petitioner executes a personal surety bond under Section 375 with solvent sureties to indemnify the court. The registry issues the physical certificate under the judicial seal for submission to banks and AMCs.",
                  },
                ].map((stage) => (
                  <div key={stage.num} className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-extrabold flex items-center justify-center shrink-0 text-sm">
                      {stage.num}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#172228] mb-1">{stage.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{stage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 7: HIDDEN COSTS BREAKDOWN
                ----------------------------------------------------------------- */}
            <section id="hidden-costs-breakdown" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>EXPENSE AUDIT</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                7. Hidden Costs: Publication, Sureties &amp; Stamp Duty
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Families often budget solely for the ad valorem court fee, only to be surprised by substantial
                ancillary expenses. The table below provides an itemized breakdown of mandatory expenditures:
              </p>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4 font-bold">Cost Category</th>
                      <th className="py-3 px-4 font-bold">Statutory Purpose</th>
                      <th className="py-3 px-4 font-bold">Typical Price Range</th>
                      <th className="py-3 px-4 font-bold">Mandatory?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Ad Valorem Court Fee</td>
                      <td className="py-3 px-4 text-xs text-slate-500">Government fee on movable asset value</td>
                      <td className="py-3 px-4 font-mono font-bold text-rose-700">2% – 7.5% (Up to ₹75k or uncapped)</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Yes (Section 379)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Newspaper Citation Notice</td>
                      <td className="py-3 px-4 text-xs text-slate-500">Public advertisement in 2 newspapers</td>
                      <td className="py-3 px-4 font-mono">₹6,000 – ₹12,000</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Yes (Court Order)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Advocate Professional Fee</td>
                      <td className="py-3 px-4 text-xs text-slate-500">Drafting petition, witness examination, court hearings</td>
                      <td className="py-3 px-4 font-mono">₹25,000 – ₹60,000</td>
                      <td className="py-3 px-4 text-slate-700 font-semibold">Standard Practice</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Surety Bond Stamp Duty</td>
                      <td className="py-3 px-4 text-xs text-slate-500">Non-judicial stamp paper for indemnity bond</td>
                      <td className="py-3 px-4 font-mono">₹2,000 – ₹6,000</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Yes (Section 375)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Process &amp; Copying Charges</td>
                      <td className="py-3 px-4 text-xs text-slate-500">Registry summon service and certified copies</td>
                      <td className="py-3 px-4 font-mono">₹1,500 – ₹3,500</td>
                      <td className="py-3 px-4 text-slate-700 font-semibold">Yes (Registry Rules)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 8: SUCCESSION CERTIFICATE VS WILL COMPARISON
                ----------------------------------------------------------------- */}
            <section id="cost-time-comparison" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <TrendingDown className="w-4 h-4" />
                <span>HEAD-TO-HEAD</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                8. Cost &amp; Time Comparison: Succession Certificate vs Will
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Evaluating the stark contrast between dying intestate (requiring a court succession certificate)
                and proactive estate planning through a legally valid Will:
              </p>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4 font-bold">Comparison Feature</th>
                      <th className="py-3 px-4 font-bold text-rose-300">Succession Certificate (No Will)</th>
                      <th className="py-3 px-4 font-bold text-emerald-300">Legally Valid Will (WillDrafting)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Government Court Fees</td>
                      <td className="py-3 px-4 font-mono text-rose-700 font-bold">2% to 7.5% (₹75k to ₹10L)</td>
                      <td className="py-3 px-4 font-mono text-emerald-700 font-bold">₹0 Court Fee</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Time Required for Clearance</td>
                      <td className="py-3 px-4 text-rose-700">4 to 8 months in District Court</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">15 minutes to draft online</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Asset Scope Covered</td>
                      <td className="py-3 px-4 text-slate-600">Movable debts &amp; securities only</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">All Movable + Immovable Real Estate</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Public Newspaper Citation</td>
                      <td className="py-3 px-4 text-slate-600">Mandatory (Inviting public claims)</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Zero Public Citations Needed</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Surety Indemnity Bond</td>
                      <td className="py-3 px-4 text-slate-600">Mandatory under Section 375</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Not Required</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Total Family Expense</td>
                      <td className="py-3 px-4 font-mono text-rose-700 font-bold">₹40,000 to ₹1,50,000+</td>
                      <td className="py-3 px-4 font-mono text-emerald-700 font-bold">One-time ₹1,999 to ₹3,999</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 9: PROCEDURAL TIMELINE TABLE
                ----------------------------------------------------------------- */}
            <section id="procedural-timeline" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>TIMELINE MILESTONES</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                9. Procedural Timeline: Petition to Asset Release
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                The expected progression for an uncontested succession certificate petition in Indian District Courts:
              </p>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4 font-bold">Phase</th>
                      <th className="py-3 px-4 font-bold">Milestone Action</th>
                      <th className="py-3 px-4 font-bold">Statutory Authority</th>
                      <th className="py-3 px-4 font-bold">Timeframe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Weeks 1 – 2</td>
                      <td className="py-3 px-4">Asset documentation collection &amp; drafting petition</td>
                      <td className="py-3 px-4 text-xs text-slate-500">Advocate Drafting</td>
                      <td className="py-3 px-4 font-mono">10 to 14 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Weeks 3 – 4</td>
                      <td className="py-3 px-4">Court registry filing, case numbering &amp; preliminary scrutiny</td>
                      <td className="py-3 px-4 text-xs text-slate-500">District Court Filing Section</td>
                      <td className="py-3 px-4 font-mono">7 to 10 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Weeks 5 – 10</td>
                      <td className="py-3 px-4">Public citations published; 30-45 day objection window</td>
                      <td className="py-3 px-4 text-xs text-slate-500">Section 373(1)(a) ISA</td>
                      <td className="py-3 px-4 font-mono text-amber-700 font-bold">30 to 45 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Weeks 11 – 16</td>
                      <td className="py-3 px-4">NOCs from legal heirs; recording petitioner evidence</td>
                      <td className="py-3 px-4 text-xs text-slate-500">District Judge Bench</td>
                      <td className="py-3 px-4 font-mono">20 to 30 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Weeks 17 – 20</td>
                      <td className="py-3 px-4">Judgment pronounced; ad valorem court fee deposited</td>
                      <td className="py-3 px-4 text-xs text-slate-500">Section 379 ISA 1925</td>
                      <td className="py-3 px-4 font-mono">10 to 15 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-[#172228]">Weeks 21 – 24+</td>
                      <td className="py-3 px-4">Surety bond furnished; sealed certificate issued</td>
                      <td className="py-3 px-4 text-xs text-slate-500">Section 375 &amp; 381 ISA</td>
                      <td className="py-3 px-4 font-mono text-emerald-700 font-bold">Final Clearance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 10: FOUR SPECIALIZED SCENARIOS
                ----------------------------------------------------------------- */}
            <section id="specialized-scenarios" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>CASE STUDIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                10. Four Specialized Scenarios: Complex Estate Situations
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Real-world succession certificate petitions frequently involve intricate legal nuances:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#172228]">
                    Scenario 1: Minor Heirs Among the Claimants
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When one of the legal heirs is a minor (under 18), the natural guardian must represent them under
                    Order XXXII of the CPC. The court ensures the minor's share is safeguarded, frequently requiring
                    the petitioner to deposit the minor's share in a fixed deposit until they attain majority.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#172228]">
                    Scenario 2: NRI Deceased with Indian Accounts
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If an NRI passes away leaving NRE/NRO fixed deposits in India without a Will, foreign letters
                    of probate cannot be used directly. An Indian succession certificate must be filed in the District Court
                    under Section 371 where the bank branches are situated, requiring apostilled Power of Attorney.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#172228]">
                    Scenario 3: Excluded Heir Files a Caveat
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If an estranged sibling or child lodges a Caveat under Section 284/373, the petition converts into
                    a contested testamentary civil suit. The court cannot grant summary certificate until full evidence
                    and family tree genuineness are adjudicated, extending timelines by 2 to 3 years.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#172228]">
                    Scenario 4: Multi-State Bank Accounts &amp; Shares
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 380 of the Indian Succession Act, a succession certificate granted by any District
                    Judge has effect throughout the entire territory of India. Legal heirs do not need separate petitions
                    for accounts in Delhi, Mumbai, and Bengaluru; a single certificate covers all listed national debts.
                  </p>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 11: AVOIDING COURT FEES WITH A WILL
                ----------------------------------------------------------------- */}
            <section id="avoiding-court-fees" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>PERMANENT REMEDY</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                11. The Permanent Solution: How a Will Avoids Court Fees
              </h2>
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  A succession certificate is not a mandatory requirement of Indian law if a person has drafted a
                  legally sound Will. The sole reason families undergo this costly court ordeal is that the deceased
                  failed to document their wishes during their lifetime.
                </p>
                <div className="bg-gradient-to-br from-[#172228] to-[#24343D] text-white rounded-2xl p-6 sm:p-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>DEFENSIVE ESTATE PLANNING</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Protect Your Heirs from Court Slabs and Delays
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                    Drafting a Will on WillDrafting.in takes just 15 minutes. It allows you to designate an executor,
                    specify bank and demat bequests, and ensure that your family receives your assets directly through
                    bank nomination and transmission forms without ever petitioning the District Court.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleStartDraft}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Start Your Will Online (₹1,999)</span>
                    </button>
                    <Link
                      href="/templates/will-format-india"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors"
                    >
                      <span>View Free Will Format</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 12: INSTITUTIONAL PROFILE
                ----------------------------------------------------------------- */}
            <section id="institutional-profile" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL AUTHORITY</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                12. Institutional Verification: AMA Legal Solutions
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  <strong>WillDrafting.in</strong> is powered by <strong>AMA Legal Solutions</strong>, an elite pan-India
                  legal advisory firm with over a decade of specialized courtroom experience before High Courts and District
                  Courts in testamentary, probate, and succession matters.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="font-extrabold text-[#172228] text-base">15,000+</div>
                    <div className="text-xs text-slate-500 mt-0.5">Estates Successfully Assessed</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="font-extrabold text-[#172228] text-base">₹500Cr+</div>
                    <div className="text-xs text-slate-500 mt-0.5">Movable Assets Transferred</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="font-extrabold text-[#172228] text-base">Pan-India</div>
                    <div className="text-xs text-slate-500 mt-0.5">High Court Bar Enrollment</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 text-xs font-medium text-slate-600">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg">Bar Council of India Verified</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg">Indian Succession Act Compliance</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg">Strict Client Confidentiality</span>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 13: FREQUENTLY ASKED QUESTIONS
                ----------------------------------------------------------------- */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                13. Frequently Asked Questions: Succession Certificate Fees
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Common questions regarding court fee rates, statutory caps, timelines, and exemptions across Indian courts:
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.q}
                      className="bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#172228] hover:text-[#C65378] transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAF7F0]/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 14: CITATIONS & OUTBOUND PORTALS
                ----------------------------------------------------------------- */}
            <section id="statutory-citations" className="scroll-target space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>AUTHORITY CITATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                14. Citations &amp; Verified Government Portals
              </h2>
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <p>
                  This guide and calculator are compiled based on primary Indian statutory provisions and leading
                  judicial pronouncements:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li><strong>Part X, Indian Succession Act, 1925:</strong> Sections 370, 371, 372, 373, 375, 379, 380, 381.</li>
                  <li><strong>Court Fees Act, 1870:</strong> Schedule I, Article 12 (Certificates under Act XXXIX of 1925).</li>
                  <li><strong>Maharashtra Court-fees Act, 1959:</strong> Schedule I, Article 10 &amp; 12 (₹75,000 maximum cap).</li>
                  <li><strong>Supreme Court of India:</strong> <em>Sarbati Devi v. Usha Devi (1984 1 SCC 424)</em> (Nominee rights vs Legal Heirs).</li>
                  <li><strong>Supreme Court of India:</strong> <em>Shakti Yezdani v. Jayanand Jayant Salgaonkar (2023)</em> (Companies Act transmission).</li>
                </ul>

                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Verified Government Portals:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://ecourts.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>eCourts Services India</span>
                    </a>
                    <a
                      href="https://www.indiacode.nic.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>India Code Legislative Portal</span>
                    </a>
                    <a
                      href="https://delhihighcourt.nic.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Delhi High Court Rules</span>
                    </a>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Related Internal Guides &amp; Tools:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/service/succession-certificate"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-[#C65378] font-semibold"
                    >
                      <span>Succession Certificate Lawyer Service</span>
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-[#C65378] font-semibold"
                    >
                      <span>Hindu Succession Calculator</span>
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-[#C65378] font-semibold"
                    >
                      <span>Probate Requirement Checker</span>
                    </Link>
                    <Link
                      href="/blogs/legal-heir-certificate-vs-succession-certificate"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-[#C65378] font-semibold"
                    >
                      <span>Legal Heir vs Succession Certificate</span>
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-[#C65378] font-semibold"
                    >
                      <span>Valid Will Format India</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author, CTA, Trust Cards)
              ===================================================================== */}
          <aside className="space-y-5 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-extrabold flex items-center justify-center text-base">
                  AM
                </div>
                <div>
                  <div className="font-extrabold text-[#172228] text-sm">Adv. A. M. Agarwal</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in civil succession petitions, testamentary probate, and estate distribution
                under the Indian Succession Act with over 14 years of High Court litigation experience.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Verified Legal Author</span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <Check className="w-3.5 h-3.5" /> High Court Bar
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: EMERGENCY CTA CARD */}
            <div className="hidden lg:block bg-[#172228] text-white rounded-3xl p-6 text-center space-y-4 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C65378]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-300 text-[10px] font-bold uppercase tracking-wider">
                <Gavel className="w-3.5 h-3.5 text-[#C65378]" />
                <span>CONFIDENTIAL LEGAL CONSULTATION</span>
              </div>
              <h3 className="text-lg font-extrabold text-white leading-snug">
                Need Help Getting a Succession Certificate?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our advocates draft and file Section 372 petitions, publish newspaper citations, and manage
                court appearances across all District Courts.
              </p>
              <Link
                href="/service/succession-certificate"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs transition-transform hover:-translate-y-0.5 shadow-md"
              >
                <span>Consult Our Succession Lawyers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>100% Confidential &amp; Advocate-Client Privileged</span>
              </div>
            </div>

            {/* CARD 3: TRUST CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#172228] pb-1 border-b border-slate-100">
                WHY FAMILIES TRUST US
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Statutory Precision:</strong> Updated with 2026 state court fee schedules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Hidden Costs:</strong> Honest upfront estimates on citations &amp; bonds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Courtroom Backed:</strong> Handled by senior High Court advocates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Pan-India Services:</strong> Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata.</span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED ESTATE TOOLS */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#172228] pb-1 border-b border-slate-100">
                RELATED ESTATE TOOLS
              </div>
              <div className="space-y-2">
                <Link
                  href="/tools/probate-checker"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/50 transition-colors"
                >
                  <div className="font-bold text-xs text-[#172228]">Probate Requirement Checker</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Check if your Will needs court probate →</div>
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/50 transition-colors"
                >
                  <div className="font-bold text-xs text-[#172228]">Hindu Succession Calculator</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Calculate Class I legal heir shares →</div>
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/50 transition-colors"
                >
                  <div className="font-bold text-xs text-[#172228]">Legally Valid Will Format</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Printable Section 63 compliant template →</div>
                </Link>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/service/succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Succession Certificate Lawyers
                </Link>
                <Link
                  href="/blogs/legal-heir-certificate-vs-succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Legal Heir vs Succession Certificate
                </Link>
                <Link
                  href="/tools/probate-checker"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Is Probate Required in India?
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Free Will Format India
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}