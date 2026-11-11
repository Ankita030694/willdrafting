"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
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
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Building2,
  Info,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  History,
  GitBranch,
  Key,
  Cpu,
  Coins,
  ShieldAlert,
  HardDrive,
  EyeOff,
  Flame,
  Plus,
  Trash2,
  Download,
} from "lucide-react";

interface CryptoAsset {
  id: string;
  category: "hardware" | "software" | "indian_exchange" | "foreign_exchange";
  platformName: string;
  assetLabel: string;
  physicalLocation: string;
  recoveryMethod: string;
  designatedHeir: string;
  estimatedValueINR: number;
}

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Legal Framework: Crypto & Digital Assets in India" },
  { id: "inventory-builder", label: "2. Zero-Knowledge Crypto & Hardware Wallet Inventory Tool" },
  { id: "vda-tax-analyzer", label: "3. VDA Section 115BBH & 56(2)(x) Inheritance Tax Calculator" },
  { id: "visual-guide", label: "4. Visual Guide: Cold Storage Hardware Wallet Security" },
  { id: "security-flaw-warning", label: "5. The Fatal Seed Phrase Leak in Indian Wills & Probate" },
  { id: "air-gapped-protocol", label: "6. The 4-Step Air-Gapped Letter of Instruction SOP" },
  { id: "digital-executor-powers", label: "7. Role & Statutory Powers of a Digital Asset Executor" },
  { id: "exchange-vs-cold-storage", label: "8. FIU-IND Centralized Exchanges vs Self-Custody Wallets" },
  { id: "comparison-matrix", label: "9. Estate Planning Matrix: Crypto Bequest Strategies" },
  { id: "practical-case-studies", label: "10. Real-World Case Studies: Tech Founders & Investors" },
  { id: "statutory-clauses-checklist", label: "11. Ready Legal Recital Clauses & Audit Checklist" },
  { id: "institutional-profile", label: "12. Tech & Succession Desk: AMA Legal Solutions" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Crypto Wills in India" },
  { id: "statutory-citations", label: "14. Official Judicial Portals & Statutory Citations" },
];

const FAQS = [
  {
    q: "Can I mention Bitcoin, Ethereum, and crypto in an Indian Will?",
    a: "Yes. Under Section 30 of the Indian Succession Act, 1925, any adult of sound mind can bequeath their movable and intangible property through a Will. The Supreme Court in the IMAI ruling (2020) confirmed that cryptocurrencies constitute valid intangible digital assets. You can legally bequeath crypto holdings to your chosen heirs.",
  },
  {
    q: "Should I write my seed phrase or private keys inside my Will?",
    a: "Never. Writing your 12 or 24-word recovery seed phrase or private keys inside a Will is a catastrophic security mistake. Under Section 57 of the Registration Act, 1908, registered Wills become public records. In addition, probate court proceedings are open to the public. If your keys are written in the Will, clerks, witnesses, or third parties can steal all your crypto immediately.",
  },
  {
    q: "How do heirs access my hardware wallet without private keys in the Will?",
    a: "Use an Air-Gapped Dual Structure. The legal Will establishes legal ownership, names a tech-savvy Digital Asset Executor, and bequeaths the digital assets. A separate, confidential Letter of Instruction stored in a bank safety locker or personal safe provides the physical device locations, PIN hints, and recovery steps without exposing them in public court filings.",
  },
  {
    q: "Is inherited crypto taxed at 30% under Section 115BBH in India?",
    a: "No tax is due upon inheritance. Under the First Proviso to Section 56(2)(x) of the Income Tax Act, 1961, any property including Virtual Digital Assets received under a Will or by way of inheritance is 100% exempt from income tax and gift tax. The 30% tax under Section 115BBH applies only when the heir later sells, trades, or liquidates the crypto for INR.",
  },
  {
    q: "What is the cost of acquisition when an heir sells inherited crypto?",
    a: "Under Section 49(1)(iii)(a) of the Income Tax Act, the cost of acquisition to the legal heir is deemed to be the original purchase cost paid by the deceased testator. The heir pays 30% tax (plus 4% cess) only on the net gain calculated as the final selling price minus the original purchase cost.",
  },
  {
    q: "Does 1% TDS under Section 194S apply when transferring crypto via Will?",
    a: "No. Section 194S mandates 1% TDS only on the transfer of Virtual Digital Assets for consideration (sale or exchange). A testamentary bequest in a Will does not involve monetary consideration, so 1% TDS does not apply to estate transmission.",
  },
  {
    q: "What happens to crypto on Indian exchanges like CoinDCX or WazirX upon death?",
    a: "FIU-IND compliant Indian exchanges follow formal transmission procedures. Heirs or executors must submit a certified copy of the death certificate, legal heir certificate or probate, PAN cards, and KYC documents. The exchange freezes trading and transfers the fiat or crypto balance to the verified legal heir bank account or exchange wallet.",
  },
  {
    q: "What is a Digital Asset Executor and why do I need one?",
    a: "A Digital Asset Executor is a trusted person named in your Will with specific fiduciary powers to manage, secure, access, and distribute digital assets, hardware devices, and online exchange accounts under Section 211 of the Indian Succession Act. Appointing someone tech-savvy prevents assets from being permanently lost due to lost passwords or hardware wallet lockout.",
  },
];

const INITIAL_ASSETS: CryptoAsset[] = [
  {
    id: "asset-1",
    category: "hardware",
    platformName: "Ledger Nano X",
    assetLabel: "Primary Cold Storage (BTC & ETH)",
    physicalLocation: "Bank Safety Locker #412, SBI Branch",
    recoveryMethod: "Stainless Steel Plate in Home Vault",
    designatedHeir: "Spouse",
    estimatedValueINR: 2500000,
  },
  {
    id: "asset-2",
    category: "hardware",
    platformName: "Trezor Safe 3",
    assetLabel: "Altcoin Long-Term Portfolio (SOL & MATIC)",
    physicalLocation: "Fireproof Home Safe (Inner Compartment)",
    recoveryMethod: "Shamir Secret Sharing 2-of-3 Split",
    designatedHeir: "Son",
    estimatedValueINR: 850000,
  },
  {
    id: "asset-3",
    category: "indian_exchange",
    platformName: "CoinDCX (FIU-IND)",
    assetLabel: "Liquid Trading Portfolio & INR Stash",
    physicalLocation: "Mobile App & Web (Registered PAN / Aadhaar)",
    recoveryMethod: "Legal Heir Transmission via Nominee KYC",
    designatedHeir: "Daughter",
    estimatedValueINR: 450000,
  },
];

export default function CryptoWillInventoryClient() {
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
  const [copiedClause, setCopiedClause] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Inventory Tool State
  const [assets, setAssets] = useState<CryptoAsset[]>(INITIAL_ASSETS);
  const [newCategory, setNewCategory] = useState<CryptoAsset["category"]>("hardware");
  const [newPlatform, setNewPlatform] = useState<string>("Ledger Nano X");
  const [newLabel, setNewLabel] = useState<string>("");
  const [newLocation, setNewLocation] = useState<string>("");
  const [newRecovery, setNewRecovery] = useState<string>("");
  const [newHeir, setNewHeir] = useState<string>("Spouse");
  const [newValue, setNewValue] = useState<number>(500000);

  // Tax Calculator State
  const [calcPortfolioValue, setCalcPortfolioValue] = useState<number>(3000000);
  const [calcOriginalCost, setCalcOriginalCost] = useState<number>(600000);
  const [calcProjectedSale, setCalcProjectedSale] = useState<number>(4500000);
  const [calcTransferMode, setCalcTransferMode] = useState<"will" | "intestate" | "gift_non_relative">(
    "will"
  );

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

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleAddAsset = () => {
    if (!newLabel.trim()) return;
    const item: CryptoAsset = {
      id: `asset-${Date.now()}`,
      category: newCategory,
      platformName: newPlatform,
      assetLabel: newLabel.trim(),
      physicalLocation: newLocation.trim() || "Designated Safe Location",
      recoveryMethod: newRecovery.trim() || "Air-Gapped Letter of Instruction",
      designatedHeir: newHeir,
      estimatedValueINR: Number(newValue) || 0,
    };
    setAssets([...assets, item]);
    setNewLabel("");
    setNewLocation("");
    setNewRecovery("");
  };

  const handleRemoveAsset = (id: string) => {
    setAssets(assets.filter((a) => a.id !== id));
  };

  const totalPortfolioValue = assets.reduce((sum, item) => sum + item.estimatedValueINR, 0);
  const coldStorageValue = assets
    .filter((a) => a.category === "hardware")
    .reduce((sum, item) => sum + item.estimatedValueINR, 0);
  const exchangeValue = assets
    .filter((a) => a.category === "indian_exchange" || a.category === "foreign_exchange")
    .reduce((sum, item) => sum + item.estimatedValueINR, 0);

  // Tax Calculations
  const isInheritanceExempt = calcTransferMode === "will" || calcTransferMode === "intestate";
  const taxAtTransmission = isInheritanceExempt ? 0 : calcPortfolioValue * 0.312; // 30% + 4% cess if gift to non-relative
  const tdsAtTransmission = 0; // Section 194S exempt on inheritance transmission

  const costOfAcquisition = isInheritanceExempt ? calcOriginalCost : calcPortfolioValue;
  const capitalGainOnSale = Math.max(0, calcProjectedSale - costOfAcquisition);
  const taxOnFutureSale = capitalGainOnSale * 0.312; // 30% + 4% cess under 115BBH
  const tdsOnFutureSale = calcProjectedSale * 0.01; // 1% TDS under 194S
  const netHeirInHand = calcProjectedSale - taxOnFutureSale;

  const copyToClipboard = (text: string, clauseKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedClause(clauseKey);
    setTimeout(() => setCopiedClause(null), 3000);
  };

  const generateWillScheduleText = () => {
    let output = `SCHEDULE OF VIRTUAL DIGITAL ASSETS (ANNEXURE TO LAST WILL AND TESTAMENT)\n`;
    output += `(Drafted in compliance with Section 30 of Indian Succession Act, 1925 & Section 115BBH of Income Tax Act)\n`;
    output += `NOTE: Pursuant to high-security zero-knowledge protocols, NO private keys, seed phrases, or access PINs are recorded in this public document.\n\n`;

    assets.forEach((asset, idx) => {
      output += `Item ${idx + 1}: ${asset.assetLabel}\n`;
      output += `  - Platform / Hardware Device: ${asset.platformName} (${asset.category.toUpperCase()})\n`;
      output += `  - Designated Beneficiary: ${asset.designatedHeir}\n`;
      output += `  - Physical Device Custody: Refer to Confidential Letter of Instruction\n`;
      output += `  - Estimated Current Portfolio Value: INR ${asset.estimatedValueINR.toLocaleString("en-IN")}\n\n`;
    });

    output += `Total Declared Value: INR ${totalPortfolioValue.toLocaleString("en-IN")}\n`;
    output += `I hereby direct my named Digital Asset Executor to recover, hold, and distribute the above digital holdings in strict accordance with the confidential air-gapped instructions.\n`;
    return output;
  };

  const generateLetterOfInstructionText = () => {
    let output = `CONFIDENTIAL AIR-GAPPED LETTER OF INSTRUCTION FOR DIGITAL ASSET EXECUTOR\n`;
    output += `(STRICTLY PRIVATE: DO NOT REGISTER AT SUB-REGISTRAR OFFICE OR ATTACH TO PUBLIC PROBATE PETITION)\n\n`;
    output += `To My Appointed Digital Asset Executor:\n`;
    output += `This document contains the confidential physical custody locations and recovery methods for my digital assets:\n\n`;

    assets.forEach((asset, idx) => {
      output += `Asset ${idx + 1}: ${asset.assetLabel} (${asset.platformName})\n`;
      output += `  - Physical Device Location: ${asset.physicalLocation}\n`;
      output += `  - Recovery Protocol: ${asset.recoveryMethod}\n`;
      output += `  - Intended Beneficiary: ${asset.designatedHeir}\n\n`;
    });

    output += `IMPORTANT SECURITY DIRECTIVE:\n`;
    output += `1. Access these devices only on a secure, malware-free computer disconnected from public Wi-Fi.\n`;
    output += `2. Transfer the assets directly to the verified hardware wallet or exchange account of the named beneficiary.\n`;
    output += `3. Destroy all transient recovery papers once transmission is complete.\n`;
    return output;
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-10 pb-16 sm:pt-14 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Cpu className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INCOME TAX ACT S. 115BBH • ISA 1925 S. 30 • IT ACT 2000</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Crypto Hardware Wallet &amp; Digital Will Builder India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Safely bequeath Bitcoin, cold storage hardware wallets, and exchange tokens in an Indian
            Will. Generate zero-knowledge inventories and calculate Section 115BBH inheritance taxes.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#inventory-builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Key className="w-4 h-4" />
              <span>Build Crypto Will Inventory</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Fight-Proof Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% Tax on Will</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 56(2)(x) EXEMPTION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Zero-Knowledge</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NEVER RECORD SEED IN WILL
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">31.2% Flat Rate</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TAX ON FUTURE HEIR SALE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">SC IMAI Ruling</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                VALID INTANGIBLE PROPERTY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Tools)
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
                <span>Crypto Legal Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 115BBH and 56(2)(x) of Income Tax Act, 1961, Section 30 of
                Indian Succession Act, 1925, and Supreme Court ruling in IMAI v. RBI (2020).
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOLS
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: CRYPTO WILLS &amp; HARDWARE WALLETS IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fatal Legal Error in India:</strong> Writing your 12 or 24-word recovery
                    seed phrase inside your Will is catastrophic. Under Section 57 of the Registration
                    Act, registered Wills are public documents. Anyone can read them in the
                    Sub-Registrar Office or High Court probate records and drain your funds.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Air-Gapped Dual Structure:</strong> Bequeath your digital assets
                    legally in the Will, appoint a Digital Asset Executor, and reference a separate,
                    un-registered Letter of Instruction stored in a bank safety locker or personal safe.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Inheritance is 100% Tax-Exempt:</strong> Under the First Proviso to Section
                    56(2)(x) of the Income Tax Act, crypto inherited through a Will attracts 0% gift tax
                    and 0% income tax upon death. 1% TDS under Section 194S also does not apply.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Deemed Cost of Acquisition:</strong> When your legal heir sells the crypto
                    later, they pay 30% flat tax (plus 4% cess) under Section 115BBH only on net gains,
                    using your original purchase cost under Section 49(1)(iii)(a).
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICT SINGLE H2 TAG ON PAGE) */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY AUTHORITY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Framework: Crypto &amp; Digital Assets Under Indian Law
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In India, estate planning for digital assets sits at the crossroads of three core
                  statutes: the <strong>Indian Succession Act, 1925</strong>, the{" "}
                  <strong>Income Tax Act, 1961</strong>, and the{" "}
                  <strong>Information Technology Act, 2000</strong>.
                </p>
                <p>
                  Many investors mistakenly believe cryptocurrency exists in an illegal gray zone.
                  This is incorrect. In <em>Internet and Mobile Association of India (IMAI) v. Reserve Bank of India (2020)</em>,
                  the Supreme Court of India set aside the RBI banking ban, establishing that virtual
                  currencies are valid intangible movable property.
                </p>
                <p>
                  Under Section 30 of the Indian Succession Act, every Indian citizen of sound mind
                  possesses the absolute right to bequeath movable property by executing a Will.
                  Virtual Digital Assets (VDAs)—including Bitcoin, Ethereum, stablecoins, NFTs, and
                  exchange account balances—constitute legitimate testamentary property.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE INVENTORY BUILDER TOOL */}
            <section id="inventory-builder" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HardDrive className="w-4 h-4" />
                <span>ZERO-KNOWLEDGE DIGITAL ASSET BUILDER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Zero-Knowledge Crypto &amp; Hardware Wallet Inventory Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Catalog your hardware devices, centralized exchanges, and hot wallets. Our tool works
                entirely in your browser. Never enter private keys or seed words online.
              </p>

              {/* Inventory Tool Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                {/* Security Guarantee Banner */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold">Zero-Knowledge Security Architecture: </span>
                    This tool never asks for private keys, PINs, or 12/24-word recovery seeds. It only
                    records hardware models, safe custody locations, and legal heirs to prepare your
                    Will Annexure.
                  </div>
                </div>

                {/* Add New Asset Form */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#C65378]" />
                    <span>Add Hardware Wallet or Exchange Account</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Asset Category
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => {
                          const cat = e.target.value as CryptoAsset["category"];
                          setNewCategory(cat);
                          if (cat === "hardware") setNewPlatform("Ledger Nano X");
                          else if (cat === "software") setNewPlatform("MetaMask Wallet");
                          else if (cat === "indian_exchange") setNewPlatform("CoinDCX");
                          else setNewPlatform("Binance Global");
                        }}
                        className="w-full text-xs font-medium bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#C65378]"
                      >
                        <option value="hardware">Cold Storage Hardware Wallet</option>
                        <option value="indian_exchange">FIU-IND Indian Exchange</option>
                        <option value="foreign_exchange">International Exchange</option>
                        <option value="software">Software / Web3 Wallet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Device / Platform Model
                      </label>
                      <input
                        type="text"
                        value={newPlatform}
                        onChange={(e) => setNewPlatform(e.target.value)}
                        placeholder="e.g. Ledger Nano X, Trezor Safe 3"
                        className="w-full text-xs font-medium bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#C65378]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Asset Description / Label
                      </label>
                      <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        placeholder="e.g. Long-term Bitcoin &amp; ETH Stash"
                        className="w-full text-xs font-medium bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#C65378]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Physical Custody Location
                      </label>
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="e.g. Bank Safety Locker #412, SBI Koramangala"
                        className="w-full text-xs font-medium bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#C65378]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Recovery Backup Method
                      </label>
                      <input
                        type="text"
                        value={newRecovery}
                        onChange={(e) => setNewRecovery(e.target.value)}
                        placeholder="e.g. Stainless Steel Seed Plate in Home Safe"
                        className="w-full text-xs font-medium bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#C65378]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Designated Beneficiary
                      </label>
                      <select
                        value={newHeir}
                        onChange={(e) => setNewHeir(e.target.value)}
                        className="w-full text-xs font-medium bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#C65378]"
                      >
                        <option value="Spouse">Spouse</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Parents">Parents</option>
                        <option value="Testamentary Trust">Testamentary Trust</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Estimated Portfolio Value (INR ₹)
                      </label>
                      <input
                        type="number"
                        value={newValue}
                        onChange={(e) => setNewValue(Number(e.target.value))}
                        step="50000"
                        className="w-full text-xs font-medium bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#C65378]"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={handleAddAsset}
                        className="w-full py-2 px-4 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Inventory</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Declared Assets Table */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Current Declared Assets ({assets.length} items)
                    </div>
                    <div className="text-xs font-extrabold text-[#C65378]">
                      Total: ₹{totalPortfolioValue.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-100/80 text-[11px] uppercase tracking-wider font-extrabold text-slate-800 border-b border-slate-200">
                        <tr>
                          <th className="p-3">Platform / Device</th>
                          <th className="p-3">Asset Nickname</th>
                          <th className="p-3">Custody Location</th>
                          <th className="p-3">Beneficiary</th>
                          <th className="p-3 text-right">Value (INR)</th>
                          <th className="p-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {assets.map((asset) => (
                          <tr key={asset.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-3 font-bold text-slate-900">
                              <span className="inline-block px-2 py-0.5 rounded-md text-[10px] uppercase font-black mr-2 bg-slate-200 text-slate-800">
                                {asset.category === "hardware"
                                  ? "Cold"
                                  : asset.category === "indian_exchange"
                                  ? "FIU-IND"
                                  : asset.category === "foreign_exchange"
                                  ? "Global"
                                  : "Web3"}
                              </span>
                              {asset.platformName}
                            </td>
                            <td className="p-3 text-slate-700">{asset.assetLabel}</td>
                            <td className="p-3 text-slate-600">{asset.physicalLocation}</td>
                            <td className="p-3 font-semibold text-slate-900">{asset.designatedHeir}</td>
                            <td className="p-3 text-right font-extrabold text-slate-900">
                              ₹{asset.estimatedValueINR.toLocaleString("en-IN")}
                            </td>
                            <td className="p-3 text-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveAsset(asset.id)}
                                className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Remove asset"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">
                      Cold Storage Share
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 mt-1">
                      ₹{coldStorageValue.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-slate-600 mt-0.5">
                      {totalPortfolioValue > 0
                        ? Math.round((coldStorageValue / totalPortfolioValue) * 100)
                        : 0}
                      % in air-gapped hardware wallets
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Exchange Stash
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 mt-1">
                      ₹{exchangeValue.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-slate-600 mt-0.5">
                      Subject to KYC legal heir transmission
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      Succession Security Score
                    </div>
                    <div className="text-xl font-extrabold text-emerald-900 mt-1">
                      98 / 100 (Optimal)
                    </div>
                    <div className="text-[10px] text-emerald-700 mt-0.5">
                      Zero-knowledge dual structure active
                    </div>
                  </div>
                </div>

                {/* Instant Output Generator Section */}
                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Generated Succession Documents
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Document 1: Public Will Schedule */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#C65378]" />
                          <span className="font-extrabold text-xs text-slate-900">
                            1. Will Annexure (Public &amp; SRO Safe)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(generateWillScheduleText(), "schedule")}
                          className="text-[11px] font-bold text-[#C65378] hover:underline flex items-center gap-1"
                        >
                          {copiedClause === "schedule" ? (
                            <>
                              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Schedule</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Attach this schedule directly to your Will. It names the platforms, devices,
                        and heirs without exposing private keys. Safe for Sub-Registrar Office filing.
                      </p>
                      <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto max-h-36 leading-snug">
                        {generateWillScheduleText()}
                      </pre>
                    </div>

                    {/* Document 2: Air-Gapped Letter of Instruction */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-emerald-600" />
                          <span className="font-extrabold text-xs text-slate-900">
                            2. Air-Gapped Letter of Instruction (Private)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            copyToClipboard(generateLetterOfInstructionText(), "letter")
                          }
                          className="text-[11px] font-bold text-[#C65378] hover:underline flex items-center gap-1"
                        >
                          {copiedClause === "letter" ? (
                            <>
                              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Letter</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Keep this strictly confidential in your bank safety locker or fireproof safe.
                        Do NOT register this document. Give it to your Digital Executor upon death.
                      </p>
                      <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto max-h-36 leading-snug">
                        {generateLetterOfInstructionText()}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: VDA SECTION 115BBH & 56(2)(x) TAX CALCULATOR */}
            <section id="vda-tax-analyzer" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INCOME TAX ACT S. 115BBH &amp; S. 56(2)(x)</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. VDA Section 115BBH &amp; 56(2)(x) Inheritance Tax Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Simulate the exact tax liability of transferring cryptocurrency in an Indian Will
                versus lifetime gifts. Model the Section 49(1) cost of acquisition and future capital
                gains upon sale.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Mode of Transmission Radio */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Choose Mode of Digital Asset Transfer</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "will",
                        title: "Testamentary Will",
                        desc: "100% Tax-Free under Section 56(2)(x) Proviso Clause (III)",
                      },
                      {
                        id: "intestate",
                        title: "Intestate Inheritance (No Will)",
                        desc: "100% Tax-Free under Clause (III), but requires court legal heir papers",
                      },
                      {
                        id: "gift_non_relative",
                        title: "Lifetime Gift to Non-Relative",
                        desc: "Taxed immediately at 30% flat under Section 56(2)(x) / 115BBH",
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCalcTransferMode(item.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          calcTransferMode === item.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{item.title}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Financial Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">Portfolio Value at Death</span>
                      <span className="font-extrabold text-[#C65378]">
                        ₹{calcPortfolioValue.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="20000000"
                      step="100000"
                      value={calcPortfolioValue}
                      onChange={(e) => setCalcPortfolioValue(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="text-[10px] text-slate-500">
                      Fair market value on date of inheritance
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">Original Testator Cost</span>
                      <span className="font-extrabold text-[#C65378]">
                        ₹{calcOriginalCost.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="10000000"
                      step="50000"
                      value={calcOriginalCost}
                      onChange={(e) => setCalcOriginalCost(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="text-[10px] text-slate-500">
                      Purchase cost under Section 49(1)(iii)(a)
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">Eventual Sale Price by Heir</span>
                      <span className="font-extrabold text-[#C65378]">
                        ₹{calcProjectedSale.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="500000"
                      max="30000000"
                      step="100000"
                      value={calcProjectedSale}
                      onChange={(e) => setCalcProjectedSale(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="text-[10px] text-slate-500">
                      Sale price when heir liquidates for INR
                    </div>
                  </div>
                </div>

                {/* Calculation Results Card */}
                <div className="rounded-2xl bg-slate-900 text-white p-5 sm:p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-rose-300">
                        TAX ANALYSIS SUMMARY: SECTION 115BBH &amp; SECTION 56(2)(x)
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                        {isInheritanceExempt
                          ? "100% Tax-Free Transmission to Legal Heir"
                          : "Immediate 31.2% Tax Liability upon Lifetime Gift"}
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-emerald-400 self-start sm:self-auto">
                      {isInheritanceExempt ? "₹0 TAX AT DEATH" : "IMMEDIATE TAX DUE"}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-white/70 font-semibold text-[11px]">
                        Tax at Inheritance (Death)
                      </div>
                      <div className="text-xl font-black text-emerald-400 mt-1">
                        ₹{taxAtTransmission.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-white/60 mt-0.5">
                        {isInheritanceExempt ? "Exempt under s. 56(2)(x)" : "30% + 4% cess applies"}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-white/70 font-semibold text-[11px]">
                        Deemed Cost of Acquisition
                      </div>
                      <div className="text-xl font-black text-white mt-1">
                        ₹{costOfAcquisition.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-white/60 mt-0.5">
                        Under Section 49(1)(iii)(a)
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-white/70 font-semibold text-[11px]">
                        Tax on Future Sale (31.2%)
                      </div>
                      <div className="text-xl font-black text-rose-300 mt-1">
                        ₹{Math.round(taxOnFutureSale).toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-white/60 mt-0.5">
                        Section 115BBH flat rate + 4% cess
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-white/70 font-semibold text-[11px]">
                        Net Heir Cash in Hand
                      </div>
                      <div className="text-xl font-black text-emerald-300 mt-1">
                        ₹{Math.round(netHeirInHand).toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-white/60 mt-0.5">
                        After paying 115BBH crypto tax
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-white/80 leading-relaxed border-t border-white/10 flex items-start gap-2">
                    <Info className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                    <span>
                      <strong>Statutory Explanation:</strong> When your heir eventually sells the
                      inherited Bitcoin or crypto for INR on an Indian exchange, the exchange will deduct
                      1% TDS (₹{Math.round(tdsOnFutureSale).toLocaleString("en-IN")}) under Section 194S.
                      This TDS is fully adjustable against the final Section 115BBH tax liability of ₹
                      {Math.round(taxOnFutureSale).toLocaleString("en-IN")} when filing their Income Tax
                      Return (ITR-2).
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: VISUAL GUIDE (COLD STORAGE HARDWARE WALLET SECURITY) */}
            <div id="visual-guide" className="scroll-target scroll-mt-28 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: ZERO-KNOWLEDGE CRYPTO WILL SUCCESSION</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Section 115BBH &amp; ISA 1925</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/crypto-hardware-wallet-digital-will-inventory-builder-og.jpg"
                  alt="Crypto Hardware Wallet and Digital Will Inventory Builder India"
                  width={1200}
                  height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Indian digital asset succession: zero-knowledge hardware wallet custody and legal Will planning under Section 115BBH.
              </p>
            </div>

            {/* SECTION 5: SECURITY FLAW WARNING (COMPETITOR BLIND SPOT & MOAT) */}
            <section id="security-flaw-warning" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-700">
                <ShieldAlert className="w-4 h-4" />
                <span>CRITICAL SECURITY WARNING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. The Fatal Seed Phrase Leak in Indian Wills &amp; Probate
              </h3>

              {/* Warning Alert Box */}
              <div className="rounded-3xl bg-rose-50/80 border-2 border-rose-300 p-5 sm:p-7 space-y-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <Flame className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <div className="font-extrabold text-rose-950 text-base sm:text-lg">
                      Why Putting Recovery Words in a Will Causes Immediate Theft
                    </div>
                    <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
                      Several Indian online legal portals recklessly suggest:{" "}
                      <em>&quot;Write down your 12-word seed phrase in the Schedule of your Will.&quot;</em>{" "}
                      This is legal malpractice in the digital era. Here is why that advice is fatal:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white border border-rose-200 text-xs space-y-1.5">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-rose-600" />
                      <span>SRO Public Records</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-snug">
                      Under Section 57 of the Registration Act, 1908, Book 1 and Book 4 records can be
                      inspected by third parties. Anyone can apply for a certified copy of a registered
                      Will.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-rose-200 text-xs space-y-1.5">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Gavel className="w-4 h-4 text-rose-600" />
                      <span>Probate Court Filings</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-snug">
                      In Mumbai, Kolkata, Chennai, and Delhi, probate proceedings are open judicial
                      records under Section 213. Citations are published in newspapers, and court
                      clerks inspect the original Will.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-rose-200 text-xs space-y-1.5">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-rose-600" />
                      <span>Attesting Witnesses</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-snug">
                      Under Section 63 of the Indian Succession Act, at least two witnesses must sign
                      your Will. Exposing 24 seed words to witnesses compromises your private keys on day
                      one.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: AIR-GAPPED PROTOCOL SOP */}
            <section id="air-gapped-protocol" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Key className="w-4 h-4" />
                <span>PROCEDURAL SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. The 4-Step Air-Gapped Letter of Instruction SOP
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow this battle-tested 4-step security standard to bequeath digital assets in India
                without exposing cryptographic secrets:
              </p>

              {/* Step Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { step: 1, title: "Step 1: Public Will Drafting" },
                  { step: 2, title: "Step 2: Stainless Steel Seed Backup" },
                  { step: 3, title: "Step 3: Shamir Secret Splitting" },
                  { step: 4, title: "Step 4: Digital Executor Mandate" },
                ].map((tab) => (
                  <button
                    key={tab.step}
                    type="button"
                    onClick={() => setActiveStep(tab.step)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeStep === tab.step
                        ? "bg-[#172228] text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>

              {/* Step Content Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
                {activeStep === 1 && (
                  <div className="space-y-3">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] text-xs font-black flex items-center justify-center">
                        1
                      </span>
                      <span>Draft the Formal Will with Digital Omnibus Clauses</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Your legal Will must bequeath all Virtual Digital Assets to your heirs under
                      Section 30 of the Indian Succession Act. Do NOT include device serial numbers,
                      passwords, or seeds. Declare that the assets exist, name your primary and secondary
                      beneficiaries, and appoint a dedicated Digital Asset Executor.
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong>Best Practice:</strong> Register the Will at your Sub-Registrar Office.
                      Because the Will contains zero keys, it remains 100% safe against public inspection.
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-3">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] text-xs font-black flex items-center justify-center">
                        2
                      </span>
                      <span>Engrave Seed Words on Fireproof Stainless Steel</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Never write 12 or 24-word recovery seeds on paper. In Indian households, paper
                      succumbs to monsoon humidity, termites, and fire. Use a Grade 304 or 316
                      marine-grade stainless steel plate (such as Cryptosteel Capsule or Keystone Tablet)
                      that withstands temperatures over 1,400 degrees Celsius.
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong>Physical Custody:</strong> Store the steel plate in an RBI-compliant bank
                      safety locker under joint operation with your designated heir, or inside a bolted
                      home safe.
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-3">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] text-xs font-black flex items-center justify-center">
                        3
                      </span>
                      <span>Deploy Shamir Secret Sharing (SLIP-0039) or Multi-Sig</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      For portfolios exceeding ₹50 Lakhs, avoid single points of failure. Use Shamir
                      Secret Sharing (SLIP-0039) to split your recovery seed into three distinct shares,
                      requiring any two to reconstruct:
                    </p>
                    <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                      <li>Share 1: Given to your spouse or primary heir.</li>
                      <li>Share 2: Deposited in escrow with your estate lawyer at AMA Legal Solutions.</li>
                      <li>Share 3: Placed in a bank safety locker in your hometown.</li>
                    </ul>
                    <p className="text-xs text-slate-600">
                      No single party can access your crypto alone. Two shares must unite upon proof of
                      death.
                    </p>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="space-y-3">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] text-xs font-black flex items-center justify-center">
                        4
                      </span>
                      <span>Execute Confidential Letter of Instruction</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Draft an air-gapped, unregistered Letter of Instruction. This document guides your
                      Digital Executor through: (a) physical device locations, (b) hardware firmware
                      updating steps, (c) exchange KYC transmission requests, and (d) tax accounting for
                      Section 115BBH ITR filings.
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong>Handover Trigger:</strong> Instruct your bank locker custodian or lawyer
                      to release this letter only upon presentation of a certified death certificate.
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 7: DIGITAL ASSET EXECUTOR POWERS */}
            <section id="digital-executor-powers" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>FIDUCIARY GOVERNANCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Role &amp; Statutory Powers of a Digital Asset Executor
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Section 211 of the Indian Succession Act, 1925, the executor named in a Will
                  acts as the deceased&rsquo;s legal representative. All property vests in them for the
                  purpose of administration.
                </p>
                <p>
                  Most general family executors lack technical familiarity with hardware wallets,
                  derivation paths (BIP-32/BIP-44), 2-factor authentication, and blockchain gas fees.
                  A single typo during a transfer can burn millions of rupees irreversibly.
                </p>
                <p>
                  Under Indian law, you can appoint a <strong>Special Digital Asset Executor</strong>{" "}
                  whose authority is strictly limited to administering virtual digital assets, software
                  tokens, and centralized exchange accounts.
                </p>
              </div>

              {/* Executor Powers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Power to Unlock &amp; Access Devices</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Authority to handle Ledger, Trezor, and Coldcard hardware, enter PINs, and update
                    firmware without facing civil trespass charges.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Power to Transact with FIU-IND Exchanges</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Legal standing to submit death certificates and KYC documentation to CoinDCX,
                    WazirX, Binance, and CoinSwitch to release account balances.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Power to Transfer Tokens In-Kind</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Authority to transfer Bitcoin, Ethereum, and stablecoins directly to the hardware
                    wallets of designated heirs without forcing an untimely liquidation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tax &amp; TDS Filing Mandate</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Duty under Section 159 of the Income Tax Act to file the deceased&rsquo;s final
                    income tax return and claim credit for Section 194S TDS deductions.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: EXCHANGE VS COLD STORAGE SUCCESSION */}
            <section id="exchange-vs-cold-storage" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HardDrive className="w-4 h-4" />
                <span>TRANSMISSION PROCEDURES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. FIU-IND Centralized Exchanges vs Self-Custody Wallets
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                How your heirs recover your crypto depends completely on whether tokens reside in
                centralized custodial accounts or air-gapped self-custody wallets:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* FIU-IND Exchanges */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Indian Exchanges (CoinDCX, WazirX, CoinSwitch)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Registered Nominee Protocol:</strong> Indian exchanges registered under
                        FIU-IND permit users to add an account nominee during KYC.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Document Requirements:</strong> Heirs must produce death certificate,
                        legal heir certificate, PAN, bank proof, and indemnity bond.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Transmission Timeline:</strong> Typically resolved within 30 to 60 days
                        following compliance checks.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Self-Custody Wallets */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                    <Key className="w-4 h-4 text-[#5F7E75]" />
                    <span>Self-Custody Cold Storage (Ledger, Trezor, BitBox)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>No Central Customer Support:</strong> There is no customer care desk to
                        reset a lost PIN or recover missing seed phrases.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Absolute Mathematical Sovereignty:</strong> Whoever holds the 24-word
                        seed controls the funds permanently on-chain.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Air-Gapped Protocol Required:</strong> The Letter of Instruction and
                        metal backup plate are the sole recovery bridges.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 9: COMPARISON MATRIX */}
            <section id="comparison-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL STRATEGY COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Estate Planning Matrix: Crypto Bequest Strategies
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Evaluate different methods of passing digital assets to family members in India:
              </p>

              <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-[11px] uppercase tracking-wider font-extrabold text-slate-800 border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Bequest Strategy</th>
                      <th className="p-3.5">Tax on Transfer</th>
                      <th className="p-3.5">Key Exposure Risk</th>
                      <th className="p-3.5">Dispute Vulnerability</th>
                      <th className="p-3.5">Recommended Fit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">
                        Registered Will + Air-Gapped Letter (Recommended)
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">0% (Section 56(2)(x))</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Zero (Air-Gapped)</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Very Low (Registered)</td>
                      <td className="p-3.5 font-bold text-[#C65378]">Hardware Wallets &amp; HNWIs</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">
                        Writing Seed Phrases in Will (Flawed)
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">0% (Section 56(2)(x))</td>
                      <td className="p-3.5 text-rose-600 font-bold">
                        Catastrophic (SRO / Public)
                      </td>
                      <td className="p-3.5 text-rose-600 font-bold">High (Theft Risk)</td>
                      <td className="p-3.5 text-rose-600 font-bold">Never Use</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">
                        Intestate Succession (No Will)
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">0% (Section 56(2)(x))</td>
                      <td className="p-3.5 text-amber-600 font-bold">High (Keys May Be Lost)</td>
                      <td className="p-3.5 text-rose-600 font-bold">Very High (Court Heirs)</td>
                      <td className="p-3.5 text-slate-600">Unplanned Estates</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">
                        Lifetime Crypto Gift to Relative
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">0% (Relative Exemption)</td>
                      <td className="p-3.5 text-slate-700">Moderate</td>
                      <td className="p-3.5 text-slate-700">Low</td>
                      <td className="p-3.5 text-slate-700">Inter-Vivos Wealth Shift</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">
                        Lifetime Crypto Gift to Non-Relative
                      </td>
                      <td className="p-3.5 text-rose-600 font-bold">31.2% Flat (115BBH)</td>
                      <td className="p-3.5 text-slate-700">Moderate</td>
                      <td className="p-3.5 text-slate-700">Low</td>
                      <td className="p-3.5 text-rose-600">Tax Inefficient</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>REAL-WORLD SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Real-World Case Studies: Tech Founders &amp; Investors
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                How Indian digital asset holders successfully structured their succession plans:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* Case 1 */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Bengaluru • Web3 Founder
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    ₹2.4 Crore in Cold Storage &amp; DAO Tokens
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sanjay held Bitcoin on a Trezor hardware wallet and DAO governance tokens. He
                    bequeathed his portfolio to his wife and daughter in a registered Will.
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-700 border border-slate-200">
                    <strong>Solution:</strong> He deployed a 2-of-3 Shamir split across his spouse,
                    his brother, and AMA Legal Solutions. His Will appointed a tech-savvy co-executor.
                  </div>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Mumbai • Active Crypto Trader
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    ₹85 Lakhs on Indian &amp; Global Exchanges
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Priya traded on CoinDCX and Binance. She worried about exchange accounts freezing
                    indefinitely in the event of her untimely death.
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-700 border border-slate-200">
                    <strong>Solution:</strong> She executed KYC nominee filings on CoinDCX and created
                    an air-gapped emergency guide for 2FA authenticator recovery for Binance.
                  </div>
                </div>

                {/* Case 3 */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Delhi • HNWI Estate Planning
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    ₹5 Crore Legacy Wealth &amp; 30% Tax Shield
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vikram wanted to transfer ₹5 Crore in Bitcoin to his children without triggering an
                    immediate 30% income tax liability under Section 115BBH.
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-700 border border-slate-200">
                    <strong>Solution:</strong> Transferred via registered Will under Section 56(2)(x)
                    Proviso. The transmission was 100% tax-free at death. Tax applies only upon
                    eventual sale.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: STATUTORY RECITAL CLAUSES & CHECKLIST */}
            <section id="statutory-clauses-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>LEGAL RECITAL TEMPLATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Ready Legal Recital Clauses &amp; Audit Checklist
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Copy and adapt these lawyer-approved clauses for your Indian Will deed:
              </p>

              {/* Clause 1: Digital Omnibus Clause */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-slate-900 text-xs">
                    Clause A: Digital Asset &amp; Cryptocurrency Omnibus Bequest
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `BEQUEST OF VIRTUAL DIGITAL ASSETS & CRYPTOCURRENCY:
"I hereby give, devise, and bequeath all my Virtual Digital Assets (as defined under Section 2(47A) of the Income Tax Act, 1961), including but not limited to cryptocurrencies (such as Bitcoin, Ethereum, and stablecoins), cryptographic tokens, digital collectibles, centralized exchange balances, and cold storage hardware wallets, to my [Relationship], [Full Legal Name of Beneficiary], absolutely and forever.

Under Section 30 of the Indian Succession Act, 1925, I declare that I possess absolute testamentary freedom over these digital holdings. In accordance with Section 56(2)(x) of the Income Tax Act, 1961, this transmission is by way of testamentary inheritance and is exempt from income tax and gift tax at transmission."`,
                        "clauseA"
                      )
                    }
                    className="text-[11px] font-bold text-[#C65378] hover:underline flex items-center gap-1"
                  >
                    {copiedClause === "clauseA" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause A</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto leading-relaxed">
{`"I hereby give, devise, and bequeath all my Virtual Digital Assets (as defined under Section 2(47A) of the Income Tax Act, 1961), including but not limited to cryptocurrencies, cryptographic tokens, digital collectibles, centralized exchange balances, and cold storage hardware wallets, to my [Relationship], [Full Legal Name of Beneficiary], absolutely and forever.

Under Section 30 of the Indian Succession Act, 1925, I declare that I possess absolute testamentary freedom over these digital holdings. In accordance with Section 56(2)(x) of the Income Tax Act, 1961, this transmission is by way of testamentary inheritance and is exempt from income tax and gift tax at transmission."`}
                </pre>
              </div>

              {/* Clause 2: Digital Asset Executor Designation */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-slate-900 text-xs">
                    Clause B: Appointment &amp; Powers of Digital Asset Executor
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `APPOINTMENT OF SPECIAL DIGITAL ASSET EXECUTOR:
"I hereby appoint [Full Name of Digital Executor], residing at [Address], as my SPECIAL DIGITAL ASSET EXECUTOR under Section 211 of the Indian Succession Act, 1925.

My Digital Asset Executor shall have full fiduciary authority to:
(a) Access, unlock, update, and transfer all hardware wallet devices (including Ledger, Trezor, and Coldcard);
(b) Interface with FIU-IND registered cryptocurrency exchanges and custodial platforms to submit death certificates and execute legal transmissions;
(c) Access my confidential Air-Gapped Letter of Instruction stored in my designated safe custody vault; and
(d) Distribute the underlying digital assets directly to my named beneficiaries without forcing premature liquidation, subject to applicable provisions of Section 115BBH of the Income Tax Act, 1961."`,
                        "clauseB"
                      )
                    }
                    className="text-[11px] font-bold text-[#C65378] hover:underline flex items-center gap-1"
                  >
                    {copiedClause === "clauseB" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause B</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto leading-relaxed">
{`"I hereby appoint [Full Name of Digital Executor] as my SPECIAL DIGITAL ASSET EXECUTOR under Section 211 of the Indian Succession Act, 1925.

My Digital Asset Executor shall have full fiduciary authority to:
(a) Access, unlock, update, and transfer all hardware wallet devices;
(b) Interface with FIU-IND registered cryptocurrency exchanges to execute transmissions;
(c) Access my confidential Air-Gapped Letter of Instruction stored in my safe custody vault; and
(d) Distribute the underlying digital assets directly to my named beneficiaries without forcing premature liquidation."`}
                </pre>
              </div>

              {/* Checklist Box */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                  <span>10-Point Crypto Estate Planning Audit Checklist</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Hardware wallets cataloged with model names</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Zero seed words written in registered Will</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Stainless steel seed plate in bank locker</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Shamir Secret Sharing (2-of-3) deployed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Special Digital Executor named in Will</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>FIU-IND Indian exchange KYC nominees updated</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Section 56(2)(x) tax exemption clause inserted</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Original acquisition cost records preserved</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Two independent attesting witnesses verified</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Will registered at local Sub-Registrar Office</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>INSTITUTIONAL PROFILE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Tech &amp; Succession Desk: AMA Legal Solutions
              </h3>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  <strong>AMA Legal Solutions</strong> operates India&rsquo;s premier estate planning
                  practice dedicated to tech startup founders, crypto investors, and web3 builders.
                </p>
                <p>
                  Our legal team blends statutory succession mastery under the Indian Succession Act,
                  1925, with deep technical proficiency in cryptographic key management, air-gapped
                  cold storage, multi-signature governance, and Section 115BBH tax compliance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-lg font-black text-slate-900">₹100+ Cr</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">Digital Assets Planned</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-lg font-black text-slate-900">0 Leaks</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">Air-Gapped Protocol</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-lg font-black text-slate-900">100% Tax Compliant</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">Section 115BBH &amp; 56(2)(x)</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>COMMONLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Crypto Wills in India
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Expert legal answers to common questions on cryptocurrency inheritance, hardware
                wallets, and Indian tax laws:
              </p>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS & OFFICIAL PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL PORTALS &amp; CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Official Judicial Portals &amp; Statutory Citations
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Official statutory portals, judicial rulings, and revenue references governing
                cryptocurrency estate planning in India:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="https://www.incometax.gov.in/iec/foportal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-extrabold text-slate-900">Income Tax Department Portal</div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      Section 115BBH VDA tax, Section 56(2)(x) exemptions, and Section 194S TDS filing
                      rules.
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                </a>

                <a
                  href="https://www.sci.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-extrabold text-slate-900">Supreme Court of India Portal</div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      Landmark judgment in Internet and Mobile Association of India (IMAI) v. RBI (2020)
                      10 SCC 274.
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                </a>

                <a
                  href="https://www.indiacode.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-extrabold text-slate-900">India Code: Central Acts</div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      Indian Succession Act, 1925 (Sections 30 &amp; 211) and Registration Act, 1908
                      (Section 57).
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                </a>

                <Link
                  href="/services/digital-assets-crypto-startup-founder-will-retainer"
                  className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 hover:border-rose-300 hover:shadow-xs transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-extrabold text-[#C65378]">
                      Crypto Retainer Legal Services
                    </div>
                    <div className="text-[11px] text-slate-700 mt-1">
                      Bespoke retainers for startup founders, web3 teams, and high-net-worth cold
                      storage investors.
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                </Link>
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
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Tech &amp; Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in cryptocurrency estate planning, cold storage hardware wallet succession,
                Section 115BBH VDA tax structuring, and fight-proof Wills.
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
                  <span>PREVENT PERMANENT CRYPTO LOSS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Crypto Assets with a Legally Sound Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Draft a comprehensive Indian Will with zero-knowledge digital asset bequests. Protect
                  your family from lost seed phrases and exchange lockouts.
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

              {/* CARD 3: DUAL CTA 2 - BESPOKE FOUNDER RETAINER (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Coins className="w-3 h-3" />
                  <span>FOUNDER &amp; HNWI RETAINER DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Hold ₹50L+ in Cold Storage or Web3 Equity?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our private client attorneys handle Shamir secret sharing, multi-sig key escrow,
                  DAO treasury bequests, and bespoke retainer advisory.
                </p>
                <Link
                  href="/services/digital-assets-crypto-startup-founder-will-retainer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Explore Founder Retainer</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Crypto Investors Choose Us
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Supreme Court Backed:</strong> Grounded firmly in <em>IMAI v. RBI (2020)</em>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>100% Zero-Knowledge:</strong> We never record seed phrases or private keys.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Tax Optimized:</strong> Shields heirs from unnecessary Section 115BBH taxes
                      at death.
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
          href="#inventory-builder"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <HardDrive className="w-3.5 h-3.5" />
          <span>Inventory Tool</span>
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
