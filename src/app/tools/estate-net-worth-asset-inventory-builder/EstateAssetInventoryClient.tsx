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
  Percent,
  Copy,
  CheckCheck,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  ArrowDownRight,
  Layers,
  Globe,
  Coins,
  Vault,
  FolderLock,
  Plus,
  Trash2,
  Download,
  Upload,
  AlertCircle,
  FileSpreadsheet,
  KeyRound,
  PieChart,
  HardDrive,
} from "lucide-react";

interface AssetItem {
  id: string;
  category: "real_estate" | "bank_deposits" | "investments" | "insurance" | "valuables";
  title: string;
  institutionOrLocation: string;
  identifierOrAccount: string;
  estimatedValue: number;
  hasNominee: boolean;
  notes: string;
}

interface LiabilityItem {
  id: string;
  title: string;
  lender: string;
  accountNumber: string;
  outstandingBalance: number;
  hasInsuranceCover: boolean;
  notes: string;
}

const DEFAULT_ASSETS: AssetItem[] = [
  {
    id: "re-1",
    category: "real_estate",
    title: "3BHK Residential Apartment",
    institutionOrLocation: "Sector 62, Gurugram, Haryana",
    identifierOrAccount: "Deed No. 4921/2018 (Tower 4, Flat 1102)",
    estimatedValue: 18500000,
    hasNominee: true,
    notes: "Registered in joint names with spouse. Original deed in SBI safe locker.",
  },
  {
    id: "re-2",
    category: "real_estate",
    title: "Ancestral Agricultural Land (1/3rd Share)",
    institutionOrLocation: "Tehsil Rohtak, Haryana",
    identifierOrAccount: "Khasra No. 114/2, Khatauni No. 88",
    estimatedValue: 6500000,
    hasNominee: false,
    notes: "Requires partition settlement among brothers; mutation entered in revenue jamabandi.",
  },
  {
    id: "bk-1",
    category: "bank_deposits",
    title: "Savings Bank Account (Salary / Primary)",
    institutionOrLocation: "HDFC Bank (Connaught Place Branch, Delhi)",
    identifierOrAccount: "A/C ending in ...4912",
    estimatedValue: 780000,
    hasNominee: true,
    notes: "Spouse registered as primary nominee with HDFC net banking.",
  },
  {
    id: "bk-2",
    category: "bank_deposits",
    title: "Cumulative Fixed Deposit (Tax Saver)",
    institutionOrLocation: "State Bank of India (Parliament St, Delhi)",
    identifierOrAccount: "FD No. 39182749102",
    estimatedValue: 1500000,
    hasNominee: true,
    notes: "Maturity due in 2028; Form 15G submitted annually.",
  },
  {
    id: "inv-1",
    category: "investments",
    title: "Equity Demat Portfolio (Direct Stocks & Index ETFs)",
    institutionOrLocation: "Zerodha Broking Ltd (CDSL Depository)",
    identifierOrAccount: "BO ID: 1208160001928374",
    estimatedValue: 4200000,
    hasNominee: true,
    notes: "Nomination verified under SEBI e-sign portal with 100% share to spouse.",
  },
  {
    id: "inv-2",
    category: "investments",
    title: "Mutual Fund SIP Folios (Equity & Hybrid)",
    institutionOrLocation: "CAMS & KFintech Consortia",
    identifierOrAccount: "MFCentral Common Folio Directory",
    estimatedValue: 3100000,
    hasNominee: true,
    notes: "Combined valuation tracked on MFCentral. Both children listed as secondary nominees.",
  },
  {
    id: "inv-3",
    category: "investments",
    title: "Public Provident Fund (PPF Account)",
    institutionOrLocation: "Post Office / SBI Treasury Branch",
    identifierOrAccount: "PPF Passbook No. 772918",
    estimatedValue: 1950000,
    hasNominee: false,
    notes: "Form E nomination form submitted 10 years ago; requires updated re-verification!",
  },
  {
    id: "ins-1",
    category: "insurance",
    title: "Pure Term Life Insurance Policy",
    institutionOrLocation: "Max Life Insurance Ltd",
    identifierOrAccount: "Policy No. 091827461 (Sum Assured ₹2.00 Cr)",
    estimatedValue: 20000000,
    hasNominee: true,
    notes: "Sum assured payable on demise. Beneficial nominee clause active under Sec 39.",
  },
  {
    id: "ins-2",
    category: "insurance",
    title: "Employees' Provident Fund (EPF & EPS 95)",
    institutionOrLocation: "EPFO Regional Office, Delhi South",
    identifierOrAccount: "UAN: 100928374619",
    estimatedValue: 2450000,
    hasNominee: true,
    notes: "E-nomination completed on EPFO UAN Member Sewa Portal.",
  },
  {
    id: "val-1",
    category: "valuables",
    title: "Gold Jewellery & Sovereign Gold Bonds (SGB)",
    institutionOrLocation: "Punjab National Bank Safe Deposit Locker",
    identifierOrAccount: "Locker No. 418 (Key kept in home master safe)",
    estimatedValue: 3200000,
    hasNominee: false,
    notes: "Bank locker agreement in single name. Needs addition of survivor clause / nominee.",
  },
];

const DEFAULT_LIABILITIES: LiabilityItem[] = [
  {
    id: "liab-1",
    title: "Home Loan on Gurugram Apartment",
    lender: "State Bank of India (RACPC Gurugram)",
    accountNumber: "Loan A/C: 38291048192",
    outstandingBalance: 4800000,
    hasInsuranceCover: true,
    notes: "Covered by SBI Life RiNn Raksha policy. Loan automatically cleared on borrower demise.",
  },
  {
    id: "liab-2",
    title: "Car Auto Loan",
    lender: "ICICI Bank Ltd",
    accountNumber: "Loan A/C: 00293847192",
    outstandingBalance: 650000,
    hasInsuranceCover: false,
    notes: "Remaining tenure 26 months. Payable from estate liquidity.",
  },
];

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Estate Inventory Under Estate Act" },
  { id: "interactive-vault-builder", label: "2. Family Asset & Net Worth Vault Tool" },
  { id: "unclaimed-wealth-trap", label: "3. The 48,000 Crore UDGAM & IEPF Trap" },
  { id: "family-red-file-protocol", label: "4. The Family Red File & Emergency Folder" },
  { id: "record-methods-comparison", label: "5. Sheets vs Red File vs Valid Will" },
  { id: "step-by-step-dossier-sop", label: "6. Step-by-Step SOP: Building the Dossier" },
  { id: "section-159-tax-liability", label: "7. Section 159 Income Tax Agent Rules" },
  { id: "digital-assets-lockers", label: "8. Digital Assets, Crypto & Locker Access" },
  { id: "practical-case-studies", label: "9. Real Case Studies: Delhi, Pune, Bengaluru" },
  { id: "legal-clauses-templates", label: "10. Copy-Paste Will Clauses & Checklists" },
  { id: "institutional-profile", label: "11. Legal Backing & Lawyer Profile" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Legal Citations & Official Portals" },
];

const FAQS = [
  {
    q: "Why is a family asset inventory list essential in India?",
    a: "Over ₹78,000 Crores of unclaimed funds currently lie abandoned in Indian banks (transferred to the RBI DEA Fund / UDGAM portal) and IEPF (unclaimed shares and dividends). Without a full written or printable asset dossier, surviving spouses and children frequently have no knowledge of existing fixed deposits, demat folios, PPF accounts, or life insurance policies.",
  },
  {
    q: "Does a nominee become the absolute legal owner of assets after death in India?",
    a: "No. The Supreme Court of India in landmark judgments including Sarbati Devi (1984) and Shakti Yezdani (2023) established that a nominee is merely a legal trustee or custodian authorized to receive funds. Beneficial ownership remains with the legal heirs named in a valid Will, or governed by personal estate laws (such as the Hindu Succession Act, 1956).",
  },
  {
    q: "Is my financial data uploaded or stored on any server?",
    a: "No. This tool runs 100% locally in your web browser. Zero financial values, account details, or policy numbers are transmitted to or stored on our servers. You can export your data as a local JSON file or generate a printable physical dossier directly on your device.",
  },
  {
    q: "What is an Emergency Red File or Death Folder?",
    a: "An Emergency Red File (popularized across Indian personal finance communities) is a centralized physical and digital dossier containing asset deeds, bank account rosters, insurance policy numbers, loan schedules, locker keys location, and your filed Will. It ensures that in the event of incapacitation or sudden demise, the family can instantly step in without facing financial paralysis.",
  },
  {
    q: "How does Section 317 of the Indian Succession Act, 1925 govern estate inventories?",
    a: "Section 317 mandates that every executor or head of an estate must exhibit an exact inventory of all asset in possession and credits belonging to the deceased within six months of obtaining probate or letters of care. Maintaining an up-to-date asset roster during life ensures seamless compliance and avoids court citations.",
  },
  {
    q: "What are legal heirs' liabilities for the deceased's debts under Section 159 of the Income Tax Act?",
    a: "Under Section 159 of the Income Tax Act, 1961, legal agents are liable to pay taxes due from the deceased only to the extent to which the estate is capable of meeting the liability. Heirs are not personally liable beyond the net inherited estate value.",
  },
  {
    q: "Can I convert this asset inventory directly into a legally binding Will?",
    a: "Yes. An asset inventory provides the exact schedule of assets required in a fight-proof Will. You can use our self-serve Will drafting wizard to attach this schedule directly as Schedule of Assets, specifying specific legatees for each asset.",
  },
  {
    q: "How should passwords, crypto keys, and digital locker credentials be handled?",
    a: "Never store master passwords or private crypto seeds in unsecured plain-text sheets. Record the existence of the digital assets (e.g., hardware wallet model, broker name) in the dossier, and store master passwords inside an encrypted password manager or sealed tamper-evident envelope with your designated digital executor.",
  },
];

export default function EstateAssetInventoryClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Vault State (Assets & Liabilities)
  const [assets, setAssets] = useState<AssetItem[]>(DEFAULT_ASSETS);
  const [liabilities, setLiabilities] = useState<LiabilityItem[]>(DEFAULT_LIABILITIES);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");

  // Emergency Profile Metadata
  const [profileName, setProfileName] = useState<string>("Primary Family Earner");
  const [spouseName, setSpouseName] = useState<string>("Spouse / Primary Heir");
  const [trustedExecutor, setTrustedExecutor] = useState<string>("Family Elder / Trusted Friend");
  const [familyDoctor, setFamilyDoctor] = useState<string>("Dr. Sharma (Max Healthcare)");
  const [caOrAdvocate, setCaOrAdvocate] = useState<string>("AMA Legal Solutions / CA Verma");
  const [willLocation, setWillLocation] = useState<string>("Godrej Master Bedroom Safe (Filed Copy with Lawyer)");

  // Form helper states for adding new asset
  const [showAddAssetModal, setShowAddAssetModal] = useState<boolean>(false);
  const [newAssetCategory, setNewAssetCategory] = useState<AssetItem["category"]>("bank_deposits");
  const [newAssetTitle, setNewAssetTitle] = useState<string>("");
  const [newAssetInstitution, setNewAssetInstitution] = useState<string>("");
  const [newAssetIdentifier, setNewAssetIdentifier] = useState<string>("");
  const [newAssetValue, setNewAssetValue] = useState<number>(100000);
  const [newAssetNominee, setNewAssetNominee] = useState<boolean>(true);
  const [newAssetNotes, setNewAssetNotes] = useState<string>("");

  // Form helper states for adding new liability
  const [showAddLiabilityModal, setShowAddLiabilityModal] = useState<boolean>(false);
  const [newLiabTitle, setNewLiabTitle] = useState<string>("");
  const [newLiabLender, setNewLiabLender] = useState<string>("");
  const [newLiabAccount, setNewLiabAccount] = useState<string>("");
  const [newLiabBalance, setNewLiabBalance] = useState<number>(500000);
  const [newLiabInsurance, setNewLiabInsurance] = useState<boolean>(false);
  const [newLiabNotes, setNewLiabNotes] = useState<string>("");

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

  // Calculations
  const totalAssetsValue = assets.reduce((sum, item) => sum + item.estimatedValue, 0);
  const totalLiabilitiesValue = liabilities.reduce((sum, item) => sum + item.outstandingBalance, 0);
  const estateNetWorth = totalAssetsValue - totalLiabilitiesValue;

  const totalAssetsCount = assets.length;
  const nominatedAssetsCount = assets.filter((item) => item.hasNominee).length;
  const nominationHealthPercentage =
    totalAssetsCount > 0 ? Math.round((nominatedAssetsCount / totalAssetsCount) * 100) : 0;

  // Liquid assets (bank + mutual funds/stocks)
  const liquidAssetsValue = assets
    .filter((a) => a.category === "bank_deposits" || a.category === "investments")
    .reduce((sum, a) => sum + a.estimatedValue, 0);

  const realEstateValue = assets
    .filter((a) => a.category === "real_estate")
    .reduce((sum, a) => sum + a.estimatedValue, 0);

  const insuranceProtectionValue = assets
    .filter((a) => a.category === "insurance")
    .reduce((sum, a) => sum + a.estimatedValue, 0);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetTitle.trim()) return;

    const newItem: AssetItem = {
      id: "asset-" + Date.now(),
      category: newAssetCategory,
      title: newAssetTitle.trim(),
      institutionOrLocation: newAssetInstitution.trim() || "Nationalized Entity",
      identifierOrAccount: newAssetIdentifier.trim() || "Standard Registration",
      estimatedValue: Number(newAssetValue) || 0,
      hasNominee: newAssetNominee,
      notes: newAssetNotes.trim(),
    };

    setAssets((prev) => [newItem, ...prev]);
    setShowAddAssetModal(false);
    setNewAssetTitle("");
    setNewAssetInstitution("");
    setNewAssetIdentifier("");
    setNewAssetValue(100000);
    setNewAssetNominee(true);
    setNewAssetNotes("");
  };

  const handleAddLiability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLiabTitle.trim()) return;

    const newItem: LiabilityItem = {
      id: "liab-" + Date.now(),
      title: newLiabTitle.trim(),
      lender: newLiabLender.trim() || "Institutional Creditor",
      accountNumber: newLiabAccount.trim() || "Standard Loan Account",
      outstandingBalance: Number(newLiabBalance) || 0,
      hasInsuranceCover: newLiabInsurance,
      notes: newLiabNotes.trim(),
    };

    setLiabilities((prev) => [newItem, ...prev]);
    setShowAddLiabilityModal(false);
    setNewLiabTitle("");
    setNewLiabLender("");
    setNewLiabAccount("");
    setNewLiabBalance(500000);
    setNewLiabInsurance(false);
    setNewLiabNotes("");
  };

  const handleDeleteAsset = (id: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDeleteLiability = (id: string) => {
    setLiabilities((prev) => prev.filter((l) => l.id !== id));
  };

  const handleToggleNominee = (id: string) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, hasNominee: !a.hasNominee } : a))
    );
  };

  const handleExportJSON = () => {
    const data = {
      profile: {
        profileName,
        spouseName,
        trustedExecutor,
        familyDoctor,
        caOrAdvocate,
        willLocation,
        exportDate: new Date().toISOString(),
      },
      summary: {
        totalAssetsValue,
        totalLiabilitiesValue,
        estateNetWorth,
        nominationHealthPercentage,
      },
      assets,
      liabilities,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `family_asset_inventory_vault_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.assets && Array.isArray(parsed.assets)) {
          setAssets(parsed.assets);
        }
        if (parsed.liabilities && Array.isArray(parsed.liabilities)) {
          setLiabilities(parsed.liabilities);
        }
        if (parsed.profile) {
          if (parsed.profile.profileName) setProfileName(parsed.profile.profileName);
          if (parsed.profile.spouseName) setSpouseName(parsed.profile.spouseName);
          if (parsed.profile.trustedExecutor) setTrustedExecutor(parsed.profile.trustedExecutor);
          if (parsed.profile.familyDoctor) setFamilyDoctor(parsed.profile.familyDoctor);
          if (parsed.profile.caOrAdvocate) setCaOrAdvocate(parsed.profile.caOrAdvocate);
          if (parsed.profile.willLocation) setWillLocation(parsed.profile.willLocation);
        }
        alert("Family Asset Vault successfully imported from your local JSON file!");
      } catch (err) {
        alert("Invalid JSON file format. Please ensure you upload a valid dossier file.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefault = () => {
    if (confirm("Reset the inventory to the standard sample Indian family portfolio?")) {
      setAssets(DEFAULT_ASSETS);
      setLiabilities(DEFAULT_LIABILITIES);
    }
  };

  const handleClearAll = () => {
    if (confirm("Clear all asset and liability records? This action cannot be undone.")) {
      setAssets([]);
      setLiabilities([]);
    }
  };

  const copyClauseToClipboard = () => {
    const clauseText = `STATUTORY DISCLOSURE & ASSET SCHEDULE PROTOCOL CLAUSE FOR INDIAN WILL:
"AND WHEREAS I maintain a comprehensive, updated Master Asset & Liability Dossier ('The Family Red File') setting out complete particulars of my immovable properties, bank accounts, fixed deposits, demat folios, mutual funds, provident funds, and insurance policies, which is kept in safe physical custody at [Location, e.g., Master Bedroom Safe / Advocate's Office].

AND I HEREBY DECLARE that the schedule of properties appended to this my Last Will and Testament reflects my full and true estate as of this date. I direct my Executor(s) named herein to refer to the said Master Asset Dossier immediately upon my demise, to liaise with the respective banking and financial institutions under Section 317 of the Indian Succession Act, 1925, and to ensure that all assets are seamlessly transmitted to the respective beneficiaries strictly in accordance with the bequests delineated in this Will, notwithstanding any statutory nomination recorded during my lifetime."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `EXECUTOR & SPOUSE 15-POINT FAMILY ASSET TRANSMISSION CHECKLIST:
1. Obtain 15-20 certified original copies of the Death Certificate from the Municipal Corporation (MCD/BMC/BBMP).
2. Locate the registered original Will, codicils, and the physical Family Red File / Asset Dossier.
3. Notify all life insurance companies within 30 days; submit Form 39 along with original policy bonds and canceled cheques.
4. Intimate primary salary/pension bank branches; stop standing instructions and auto-debits for credit cards.
5. Inquire whether home loans and vehicle loans are covered by credit life insurance (e.g., SBI RiNn Raksha, ICICI Lombard).
6. File death intimation with CDSL/NSDL depository participants to transmit demat shares to the surviving joint holder or nominee.
7. Submit transmission requests for mutual fund folios via MFCentral or respective AMCs with Form T2/T3.
8. Submit Form G/H for PPF accounts at Post Office/Bank branches to release accumulated tax-free balances.
9. File online e-nomination claim for EPF (Form 20/5IF) and monthly widow/children pension under EPS 95 (Form 10D).
10. Apply for title mutation of residential and commercial immovable properties in local Municipal & Revenue records.
11. Transfer electricity, water, and piped gas meters to the surviving spouse/heir using legal heir certificate.
12. Access bank safe deposit lockers following the joint survivor mandate or RBI guidelines on nominee locker opening.
13. Search the RBI UDGAM portal (udgam.rbi.org.in) for any unlinked dormant bank accounts or unclaimed fixed deposits.
14. Check the MCA IEPF portal (iepf.gov.in) for unclaimed corporate shares, physical share certificates, and dividends.
15. Discharge the deceased's pending income tax liabilities as Legal Representative under Section 159 of the Income Tax Act, 1961.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  const filteredAssets =
    activeCategoryFilter === "all"
      ? assets
      : assets.filter((a) => a.category === activeCategoryFilter);

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
            <Vault className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTION 317 • ZERO-SERVER LOCAL DOSSIER</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Estate Net Worth &amp; Family Asset Inventory Vault
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Build a 100% private, browser-local <strong>Emergency Red File dossier</strong> for your
            spouse and family. Catalog real estate, bank deposits, demat folios, insurance, and
            liabilities so your hard-earned wealth never ends up trapped in <strong>RBI UDGAM or IEPF</strong>.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-vault-builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FolderLock className="w-4 h-4" />
              <span>Open Private Asset Vault</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹78,213 Cr</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                UNCLAIMED IN UDGAM &amp; IEPF
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Private</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ZERO-SERVER BROWSER LOCAL
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 317 ISA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STATUTORY INVENTORY MANDATE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">1-Click PDF</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PRINTABLE EMERGENCY DOSSIER
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
                <span>Legal Office</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 211, 213, 317, 318, and 332 of the Indian Succession Act,
                1925; Section 159 of the Income Tax Act, 1961; and RBI UDGAM &amp; SEBI MITRA /
                IEPF frameworks.
              </p>
            </div>

            {/* Privacy Guarantee Pill */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200/80 p-4 text-xs text-emerald-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Zero Cloud Storage</span>
              </div>
              <p className="leading-relaxed text-[11px] text-emerald-800/90">
                All data entered into this tool stays 100% inside your local web browser session.
                No databases, tracking, or server endpoints.
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
                <span>EXECUTIVE BRIEF: FAMILY WEALTH VAULT &amp; EMERGENCY RED FILE</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Unclaimed Wealth Catastrophe:</strong> Indian families lose tens of
                    thousands of crores because surviving spouses do not know which banks hold fixed
                    deposits, which demat accounts hold stocks, or where insurance policies are filed.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nominee vs Legal Heir Distinction:</strong> A nominee is merely a
                    temporary custodian (Supreme Court in <em>Sarbati Devi</em> &amp; <em>Shakti Yezdani</em>).
                    Without an accurate asset schedule in a filed Will, bank nominees face immediate
                    lawsuits from other legal heirs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Legal Compliance under Section 317:</strong> Executors must file an
                    exhaustive inventory of assets within six months of probate. Maintaining a live
                    dossier ensures frictionless probate and prevents legal fights.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero-Server Privacy Guarantee:</strong> Unlike insecure cloud apps or shared
                    Google sheets, this tool computes everything in your browser memory. Generate your
                    printable emergency dossier and keep it safely locked with your Will.
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
                1. Legal Basis: Estate Inventory Under Estate Act
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Indian testamentary jurisprudence, the care of a deceased single&rsquo;s
                  estate is governed primarily by the <strong>Indian Succession Act, 1925</strong>. Under
                  <strong> Section 211</strong>, the executor named in a Will or the court-appointed
                  head represents the legal personality of the deceased for all purposes, and all
                  asset vests in them.
                </p>
                <p>
                  Crucially, <strong>Section 317 of the Indian Succession Act</strong> establishes a needed
                  legal duty: an executor or head must, within six months from the grant of probate
                  or letters of care, exhibit in court an exact inventory containing a full and true
                  estimate of all asset in possession and credits belonging to the deceased. Within one year,
                  they must submit formal accounts of the estate.
                </p>
                <p>
                  When people pass away without leaving an organized asset inventory, executors and
                  surviving heirs face immense office hurdles. Banking institutions, depository
                  participants (NSDL/CDSL), mutual fund registrars (CAMS/KFintech), and insurance companies
                  operate in silos. Without knowing account numbers, folio identifiers, and filed branches,
                  legitimate wealth remains permanently untracked.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE VAULT BUILDER */}
            <section id="interactive-vault-builder" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE ASSET VAULT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Family Asset &amp; Net Worth Inventory Vault
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Catalog your assets and liabilities below. This tool computes your consolidated estate net
                worth, evaluates your <strong>Nomination Health Score</strong> to flag UDGAM/IEPF forfeiture risks,
                and generates a ready-to-print emergency financial dossier.
              </p>

              {/* Main Interactive Tool Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Top Privacy & Tool Controls Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/70">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>100% Client-Side Private Vault</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Zero Server Upload
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Financial data is stored strictly in browser memory. Nothing is sent to our servers.
                      </div>
                    </div>
                  </div>

                  {/* Vault Actions */}
                  <div className="flex items-center flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shadow-xs transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Dossier</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleExportJSON}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 text-[#C65378] hover:bg-rose-100 text-xs font-bold border border-rose-200/80 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Backup</span>
                    </button>
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Restore</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportJSON}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleResetToDefault}
                      title="Reset to sample Indian portfolio"
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors text-xs font-bold"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Real-Time Net Worth Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Gross Assets */}
                  <div className="bg-[#FAF7F0] rounded-2xl p-4 border border-amber-200/60">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center justify-between">
                      <span>Total Gross Assets</span>
                      <Building className="w-4 h-4 text-amber-700" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                      {formatINR(totalAssetsValue)}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {assets.length} items cataloged across categories
                    </div>
                  </div>

                  {/* Card 2: Total Liabilities */}
                  <div className="bg-rose-50/60 rounded-2xl p-4 border border-rose-200/60">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#C65378] flex items-center justify-between">
                      <span>Outstanding Debts</span>
                      <Coins className="w-4 h-4 text-[#C65378]" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-rose-950 mt-2">
                      {formatINR(totalLiabilitiesValue)}
                    </div>
                    <div className="text-xs text-rose-800 mt-1">
                      {liabilities.length} liabilities recorded
                    </div>
                  </div>

                  {/* Card 3: Net Estate Worth */}
                  <div className="bg-[#172228] text-white rounded-2xl p-4 border border-slate-700 shadow-xs">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300 flex items-center justify-between">
                      <span>Net Family Estate</span>
                      <Vault className="w-4 h-4 text-[#C65378]" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white mt-2">
                      {formatINR(estateNetWorth)}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      Surplus wealth to be bequeathed in Will
                    </div>
                  </div>

                  {/* Card 4: Nomination Health Ratio */}
                  <div
                    className={`rounded-2xl p-4 border ${
                      nominationHealthPercentage >= 80
                        ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                        : "bg-amber-50 border-amber-300 text-amber-950"
                    }`}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
                      <span>Nomination Health</span>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black mt-2">
                      {nominationHealthPercentage}%
                    </div>
                    <div className="text-xs mt-1">
                      {nominatedAssetsCount} of {totalAssetsCount} assets have verified nominees
                    </div>
                  </div>
                </div>

                {/* Nomination Warning if any asset lacks nominee */}
                {nominationHealthPercentage < 100 && (
                  <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-extrabold text-amber-950">
                        Attention: {totalAssetsCount - nominatedAssetsCount} Assets Lack Verified Nominees!
                      </div>
                      <p className="leading-relaxed">
                        Under Reserve Bank of India and SEBI regulations, bank accounts or demat portfolios
                        without an updated nominee become dormant after inactivity and are eventually transferred
                        to the <strong>RBI DEA Fund (UDGAM portal)</strong> or <strong>IEPF</strong>. We strongly
                        recommend updating nominations right away.
                      </p>
                    </div>
                  </div>
                )}

                {/* Emergency Contact & Dossier Details Form */}
                <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200/90 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-black uppercase tracking-wider text-[#C65378] flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4" />
                      <span>EMERGENCY DOSSIER PROFILE &amp; RED FILE METADATA</span>
                    </div>
                    <span className="text-[11px] text-slate-500 italic">Included on printed dossier</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Estate Owner Full Name</label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold focus:outline-hidden focus:border-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Primary Nominee / Spouse</label>
                      <input
                        type="text"
                        value={spouseName}
                        onChange={(e) => setSpouseName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold focus:outline-hidden focus:border-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Designated Trusted Executor</label>
                      <input
                        type="text"
                        value={trustedExecutor}
                        onChange={(e) => setTrustedExecutor(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold focus:outline-hidden focus:border-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Family Doctor / Hospital</label>
                      <input
                        type="text"
                        value={familyDoctor}
                        onChange={(e) => setFamilyDoctor(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold focus:outline-hidden focus:border-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Family Lawyer / CA</label>
                      <input
                        type="text"
                        value={caOrAdvocate}
                        onChange={(e) => setCaOrAdvocate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold focus:outline-hidden focus:border-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Physical Will &amp; Key Location</label>
                      <input
                        type="text"
                        value={willLocation}
                        onChange={(e) => setWillLocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold focus:outline-hidden focus:border-[#C65378]"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Filter Pills & Add Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-slate-500 mr-1">Filter Assets:</span>
                    {[
                      { id: "all", label: "All Assets" },
                      { id: "real_estate", label: "Real Estate" },
                      { id: "bank_deposits", label: "Bank & FDs" },
                      { id: "investments", label: "Demat & MF" },
                      { id: "insurance", label: "Insurance & PF" },
                      { id: "valuables", label: "Gold & Valuables" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveCategoryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          activeCategoryFilter === tab.id
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAssetModal(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] text-white hover:bg-[#a33b5c] text-xs font-bold shadow-xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Asset</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddLiabilityModal(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-900 text-white hover:bg-rose-950 text-xs font-bold shadow-xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Debt/Loan</span>
                    </button>
                  </div>
                </div>

                {/* Assets Table / List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-black text-slate-700 uppercase tracking-wider pb-1 border-b border-slate-100">
                    <span>ASSET SCHEDULE ({filteredAssets.length} ITEMS)</span>
                    <span>ESTIMATED VALUE</span>
                  </div>

                  {filteredAssets.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl text-slate-500 text-xs">
                      No assets found in this category. Click &quot;Add New Asset&quot; to begin cataloging.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredAssets.map((asset) => (
                        <div
                          key={asset.id}
                          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-2xs space-y-2"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-slate-900 text-sm">
                                  {asset.title}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    asset.category === "real_estate"
                                      ? "bg-blue-100 text-blue-800"
                                      : asset.category === "bank_deposits"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : asset.category === "investments"
                                      ? "bg-purple-100 text-purple-800"
                                      : asset.category === "insurance"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-rose-100 text-rose-800"
                                  }`}
                                >
                                  {asset.category.replace("_", " ").toUpperCase()}
                                </span>
                              </div>
                              <div className="text-xs text-slate-600 font-medium">
                                {asset.institutionOrLocation} •{" "}
                                <span className="text-slate-800">{asset.identifierOrAccount}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 sm:self-center">
                              <div className="text-right">
                                <div className="text-base font-black text-slate-900">
                                  {formatINR(asset.estimatedValue)}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleToggleNominee(asset.id)}
                                  className={`text-[10px] font-bold inline-flex items-center gap-1 ${
                                    asset.hasNominee
                                      ? "text-emerald-700 hover:text-emerald-900"
                                      : "text-rose-600 hover:text-rose-800 underline"
                                  }`}
                                >
                                  {asset.hasNominee ? (
                                    <>
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                      <span>Nominee Filed</span>
                                    </>
                                  ) : (
                                    <>
                                      <AlertTriangle className="w-3 h-3 text-rose-500" />
                                      <span>NO Nominee (Click to toggle)</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteAsset(asset.id)}
                                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Remove asset from vault"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {asset.notes && (
                            <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <span className="font-semibold text-slate-700">Confidential Note: </span>
                              {asset.notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Liabilities Table / List */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-black text-rose-800 uppercase tracking-wider pb-1">
                    <span>OUTSTANDING DEBTS &amp; LIABILITIES ({liabilities.length} ITEMS)</span>
                    <span>OUTSTANDING AMOUNT</span>
                  </div>

                  {liabilities.length === 0 ? (
                    <div className="text-center py-6 bg-slate-50 rounded-2xl text-slate-500 text-xs">
                      Zero recorded liabilities. Your estate is completely debt-free!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {liabilities.map((liab) => (
                        <div
                          key={liab.id}
                          className="p-4 rounded-2xl bg-white border border-rose-100 hover:border-rose-200 transition-all shadow-2xs space-y-2"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-slate-900 text-sm">
                                  {liab.title}
                                </span>
                                {liab.hasInsuranceCover && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                    LOAN COVERED BY INSURANCE
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-600 font-medium">
                                {liab.lender} • <span className="text-slate-800">{liab.accountNumber}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 sm:self-center">
                              <div className="text-right">
                                <div className="text-base font-black text-rose-950">
                                  {formatINR(liab.outstandingBalance)}
                                </div>
                                <div className="text-[10px] text-slate-500">
                                  {liab.hasInsuranceCover ? "Auto-waived on death" : "Paid from estate"}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteLiability(liab.id)}
                                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Remove liability"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {liab.notes && (
                            <div className="text-xs text-slate-500 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                              <span className="font-semibold text-rose-800">Resolution Note: </span>
                              {liab.notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA to Will Creation */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-5">
                  <div className="space-y-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-[#C65378] text-[11px] font-black uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>NEXT CRITICAL LEGAL STEP</span>
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-white">
                      Attach This Inventory Schedule to a Filed Will
                    </div>
                    <p className="text-xs text-slate-300 max-w-xl">
                      An asset inventory alone does not prevent fights among co-heirs. Under the Indian
                      Estate Act, 1925, only a filed Will legally directs who inherits each
                      cataloged asset, bank account, and demat portfolio.
                    </p>
                  </div>

                  <button
                    onClick={handleStartDraft}
                    className="shrink-0 px-6 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
                  >
                    Draft Fight-Proof Will Now
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 3: THE UNCLAIMED WEALTH TRAP */}
            <section id="unclaimed-wealth-trap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>UNCLAIMED WEALTH IN INDIA</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. The 48,000 Crore Trap: How Unclaimed Assets End in UDGAM
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  According to official data presented by the Ministry of Finance in Parliament, as of 2024,
                  over <strong>₹48,262 Crores</strong> of unclaimed bank deposits lie deposited with the
                  Reserve Bank of India&rsquo;s <strong>Depositor Education and Awareness (DEA) Fund</strong>.
                  Simultaneously, the <strong>Investor Education and Protection Fund (IEPF)</strong> holds
                  over <strong>₹30,000 Crores</strong> worth of unclaimed shares, corporate bonds, and accrued
                  dividends, while the insurance sector holds thousands of crores in unclaimed maturity proceeds.
                </p>
                <p>
                  Why does this staggering wealth remain abandoned? The root cause is not insolvency, but
                  <strong> information asymmetry within Indian families</strong>. In the vast majority of cases:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The primary earner maintained accounts across multiple PSU and private banks (e.g., SBI,
                    ICICI, HDFC, PNB) without creating a consolidated register.
                  </li>
                  <li>
                    Fixed deposit receipts, physical share papers, and PPF passbooks were kept in
                    forgotten cupboards or single-operated bank lockers.
                  </li>
                  <li>
                    The family never updated nominations after marriage, divorce, or the death of an earlier
                    nominee.
                  </li>
                  <li>
                    Following 10 years of inactivity, banks are legally mandated under Section 26A of the
                    Banking Regulation Act, 1949 to transfer the balances to the RBI DEA Fund.
                  </li>
                </ul>
                <p>
                  Recovering funds from the RBI UDGAM portal or filing IEPF-5 claim forms is a notoriously
                  lengthy bureaucratic ordeal requiring indemnity bonds, court sworn notes, legal heir papers,
                  and estate papers. Maintaining an active Family Asset Inventory is the single most
                  effective preventative shield against this trap.
                </p>
              </div>

              {/* Visual Presentation Card for OG / Vault Dashboard Preview */}
              <div className="pt-2">
                <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-3xl overflow-hidden bg-slate-900 shadow-md border border-slate-200">
                  <Image
                    src="/images/estate-net-worth-asset-inventory-builder-og.jpg"
                    alt="Asset Inventory List for Family India and Emergency Net Worth Vault Dossier"
                    width={1200} height={675}
                    className="absolute inset-0 w-full h-full object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
                <div className="text-[11px] text-slate-500 text-center mt-2 font-medium">
                  Figure 1.1: Official WillDrafting.in Family Asset Inventory Vault &amp; Emergency Red File Dossier
                </div>
              </div>
            </section>

            {/* SECTION 4: THE FAMILY RED FILE PROTOCOL */}
            <section id="family-red-file-protocol" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FolderLock className="w-4 h-4" />
                <span>EMERGENCY RED FILE PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. The Family Red File: Essential Papers Every Spouse Needs
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Indian personal finance forums (such as r/personalfinanceindia), the concept of an
                  <strong> &quot;Emergency Red File&quot; or &quot;In Case of Death Folder&quot;</strong> has
                  emerged as a viral best practice. It refers to a dedicated, brightly colored physical folder
                  kept in a known home location that houses every critical paper the family needs within the
                  first 72 hours of an emergency.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C65378]" />
                      <span>Immediate 72-Hour Survival Items</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>Health insurance cards &amp; TPA cashless policy numbers</li>
                      <li>Pure term insurance policy bonds &amp; claim helpline contacts</li>
                      <li>Emergency liquid cash / emergency savings account debit card</li>
                      <li>Names and contact numbers of family physician and trusted lawyer</li>
                      <li>Master password manager emergency access recovery kit</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#5F7E75]" />
                      <span>Long-Term Asset Transfer Items</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>Original Filed Will and filed codicils</li>
                      <li>Original Title Deeds, conveyance deeds &amp; share papers</li>
                      <li>Consolidated Demat Client Master List (CML) and CAS statements</li>
                      <li>EPF UAN number and PPF passbook copies</li>
                      <li>Bank safe deposit locker number, bank branch, and physical key</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: COMPARING ASSET RECORDS */}
            <section id="record-methods-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPARATIVE ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Comparing Asset Records: Sheets vs Red File vs Valid Will
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Many people assume a casual Google Sheet or note in their smartphone is sufficient.
                Review the structural comparison below to understand the legal and operational differences:
              </p>

              {/* Structured HTML Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-[#172228] text-white uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-extrabold">Evaluation Dimension</th>
                      <th className="py-3.5 px-4 font-extrabold">Unsecured Google Sheet / Excel</th>
                      <th className="py-3.5 px-4 font-extrabold text-rose-200">
                        WillDrafting Client Vault
                      </th>
                      <th className="py-3.5 px-4 font-extrabold text-emerald-300">
                        Fight-Proof Filed Will
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Privacy &amp; Data Security</td>
                      <td className="py-3 px-4 text-rose-700 font-medium">
                        High risk of cloud leakage, accidental sharing, or unencrypted sync
                      </td>
                      <td className="py-3 px-4 text-emerald-800 font-semibold bg-rose-50/30">
                        100% browser-local; zero server transfer or cloud storage
                      </td>
                      <td className="py-3 px-4 text-slate-900 font-semibold">
                        Confidential physical paper; sealed in envelope until demise
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Legal Enforceability</td>
                      <td className="py-3 px-4 text-slate-600">
                        Zero legal standing under Indian Succession Act; inadmissible as bequest
                      </td>
                      <td className="py-3 px-4 text-slate-700 bg-rose-50/30">
                        Valid office memorandum; serves as Section 317 inventory basis
                      </td>
                      <td className="py-3 px-4 text-emerald-800 font-bold">
                        Absolute legal title under Section 213; binds all legal heirs
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Fight Immunity</td>
                      <td className="py-3 px-4 text-rose-700">
                        Easily disputed by excluded relatives; cannot override no-Will law
                      </td>
                      <td className="py-3 px-4 text-slate-700 bg-rose-50/30">
                        Provides verifiable evidence of asset provenance and liabilities
                      </td>
                      <td className="py-3 px-4 text-emerald-800 font-bold">
                        Highest immunity when attested by two independent witnesses &amp; doctor
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Family Accessibility</td>
                      <td className="py-3 px-4 text-slate-600">
                        Spouse often locked out by 2-factor SMS check on deceased phone
                      </td>
                      <td className="py-3 px-4 text-emerald-800 font-semibold bg-rose-50/30">
                        Printable physical dossier right away accessible in family safe
                      </td>
                      <td className="py-3 px-4 text-slate-900 font-semibold">
                        Read by designated Executor in presence of all family members
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Bank &amp; Demat Claims</td>
                      <td className="py-3 px-4 text-slate-600">
                        Does not expedite claims if nominations are conflicting or missing
                      </td>
                      <td className="py-3 px-4 text-emerald-800 font-semibold bg-rose-50/30">
                        Includes Nominee Health Audit to eliminate UDGAM/IEPF pitfalls
                      </td>
                      <td className="py-3 px-4 text-emerald-800 font-bold">
                        Enables instant asset transfer and probate grant in High Court
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-dossier-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PROCEDURAL ROADMAP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Step-by-Step SOP: Building Your Family Financial Dossier
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: "STEP 1",
                    title: "Pull Consolidated Statements (CAS & AIS)",
                    desc: "Download your CAMS/KFintech Consolidated Account Statement (CAS) for all mutual funds, NSDL/CDSL e-CAS for demat shares, and the Annual Information Statement (AIS) from the Income Tax e-filing portal. The AIS captures all interest from bank accounts, dividends, and asset purchases.",
                  },
                  {
                    step: "STEP 2",
                    title: "Audit and Rectify Nominations Across All Portfolios",
                    desc: "Verify that every single bank savings account, fixed deposit, PPF account, and demat portfolio has an active nominee filed. Use the online net banking or SEBI e-sign portal to add your spouse or children.",
                  },
                  {
                    step: "STEP 3",
                    title: "Input Asset and Liability Records in the Tool",
                    desc: "Use the free vault builder above to record your asset addresses, account identifiers (e.g., last 4 digits for privacy), estimated values, and liability loan numbers. Check if home loans carry term cover.",
                  },
                  {
                    step: "STEP 4",
                    title: "Print Physical Emergency Red File Dossier",
                    desc: "Click 'Print Dossier' to generate an executive physical paper. Place this dossier alongside certified copies of your marriage paper, asset purchase deeds, and locker keys in a safe, water-resistant folder.",
                  },
                  {
                    step: "STEP 5",
                    title: "Execute a Challenge-Proof Will",
                    desc: "Draft your legally binding Will with specific bequests for each asset. Schedule A of the Will will reference your full asset inventory, ensuring zero ambiguity in court.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-[#C65378] text-[10px] font-black uppercase tracking-wider">
                        {item.step}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mid-Article Contextual Tool Link */}
              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>RELATED INTERACTIVE TOOL</span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    Need to calculate capital gains on inherited family asset?
                  </div>
                  <p className="text-xs text-slate-600">
                    Compare Budget 2024 grandfathering (12.5% flat vs 20% indexation) and Section 54/54EC
                    exemptions across multiple heirs.
                  </p>
                </div>
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#172228] text-white hover:bg-slate-800 text-xs font-bold transition-all"
                >
                  <span>Open Capital Gains Tool</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* SECTION 7: SECTION 159 INCOME TAX RULES */}
            <section id="section-159-tax-liability" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL REPRESENTATIVE TAXATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Section 159 Income Tax Act: Legal Agent Duties
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A vital reason to maintain an exact net worth statement is <strong>Section 159 of the
                  Income Tax Act, 1961</strong>. When a taxpayer passes away, their legal agent (executor,
                  head, or legal heir) is deemed to be an assessee liable to pay any sum which the
                  deceased would have been liable to pay.
                </p>
                <p>
                  Crucially, <strong>Section 159(6)</strong> establishes that the liability of the legal
                  agent is limited strictly to the value of the estate inherited. If an single passes
                  away leaving ₹10 Lakhs in assets but ₹25 Lakhs in income tax dues or unsecured personal loans,
                  the heirs cannot be compelled to pay the remaining ₹15 Lakhs out of their personal pockets.
                </p>
                <p>
                  Having a documented asset and liability inventory protects heirs against unlawful demands by
                  recovery officers, proving the precise quantum of net inherited estate.
                </p>
              </div>
            </section>

            {/* SECTION 8: DIGITAL ASSETS & LOCKER ACCESS */}
            <section id="digital-assets-lockers" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HardDrive className="w-4 h-4" />
                <span>MODERN WEALTH ACCESS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Digital Assets &amp; Locker Access: Critical Transfer Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Today&rsquo;s estate planning goes far beyond physical real estate and gold. Millions of
                  Indians possess cryptocurrency wallets, monetized YouTube channels, domain portfolios, SaaS
                  equity, and online bank accounts without paper passbooks.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs sm:text-sm">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Three Golden Rules for Digital Assets &amp; Safe Deposit Lockers:
                  </div>
                  <ul className="space-y-2 text-slate-600 list-disc pl-4">
                    <li>
                      <strong>Never Write Passwords in Plain Text:</strong> Do not record ATM PINs, crypto
                      private keys, or net banking passwords inside the unencrypted dossier. Instead, record the
                      existence of the asset (e.g., &quot;Ledger Nano X hardware wallet&quot;) and state that
                      recovery seeds are kept in a sealed tamper-evident tamper envelope in the master locker.
                    </li>
                    <li>
                      <strong>RBI Revised Locker Guidelines (2023):</strong> Under RBI Circulars, if a safe
                      deposit locker is operated with &quot;Either or Survivor&quot; or contains a filed
                      nominee, the bank MUST grant access to the nominee/survivor without insisting on a probate
                      or estate paper, following inventory preparation in the presence of bank officers.
                    </li>
                    <li>
                      <strong>Designate a Digital Executor:</strong> In your Will, appoint a tech-literate digital
                      executor with explicit office under the Information Technology Act, 2000 to manage cloud
                      accounts, deactivate social media profiles, and liquidate digital tokens.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 9: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>REAL-WORLD LITIGATION PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Case Studies: Bengaluru, Mumbai &amp; Delhi Families
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Case 1: Bengaluru Tech Exec */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#C65378]">
                    CASE STUDY 1: BENGALURU
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    The ₹1.8 Cr Lost ESOP &amp; MF Folios
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 46-year-old tech architect passed away suddenly due to cardiac arrest. His spouse was
                    unaware that he had accrued unvested US stock options, 14 mutual fund folios across different
                    brokers, and three bank accounts. It took 22 months of court appearances and legal fees to
                    trace the folios. A simple Emergency Red File would have transmitted assets in 30 days.
                  </p>
                </div>

                {/* Case 2: Mumbai Locker Dispute */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#C65378]">
                    CASE STUDY 2: MUMBAI
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Locker Key Lost Without Nominee
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A retired businessman in Bandra maintained a bank locker holding 650 grams of family gold.
                    He passed away no-Will without adding his daughter as nominee. The bank refused to break
                    open the locker without a formal Estate Paper from the Bombay High Court, which took
                    18 months and ₹1.5 Lakhs in court fees.
                  </p>
                </div>

                {/* Case 3: Delhi Home Loan Protection */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                    CASE STUDY 3: DELHI
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Home Loan Insurance Saved Widow
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Delhi government official maintained an exact asset &amp; liability dossier. When he died
                    unexpectedly, his spouse discovered a ₹65 Lakh home loan schedule with an attached credit life
                    insurance policy number. The insurance company settled the remaining loan balance in full,
                    leaving the home house 100% unencumbered.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: COPY-PASTE LEGAL CLAUSES */}
            <section id="legal-clauses-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Copy className="w-4 h-4" />
                <span>STATUTORY TEMPLATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Copy-Paste Legal Clauses &amp; Emergency Disclosure Templates
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use these checked lawyer-drafted clauses in your legal Will or family emergency memorandum:
              </p>

              {/* Template Box 1: Will Clause */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Asset Schedule Protocol Clause for Indian Will</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 text-xs font-bold border border-rose-200/80 transition-colors"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto">
{`"AND WHEREAS I maintain a comprehensive, updated Master Asset & Liability Dossier ('The Family Red File') setting out complete particulars of my immovable properties, bank accounts, fixed deposits, demat folios, mutual funds, provident funds, and insurance policies, which is kept in safe physical custody at [Location, e.g., Master Bedroom Safe / Advocate's Office].

AND I HEREBY DECLARE that the schedule of properties appended to this my Last Will and Testament reflects my full and true estate as of this date. I direct my Executor(s) named herein to refer to the said Master Asset Dossier immediately upon my demise, to liaise with the respective banking and financial institutions under Section 317 of the Indian Succession Act, 1925, and to ensure that all assets are seamlessly transmitted to the respective beneficiaries strictly in accordance with the bequests delineated in this Will, notwithstanding any statutory nomination recorded during my lifetime."`}
                </pre>
              </div>

              {/* Template Box 2: Transmission Checklist */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Executor &amp; Spouse 15-Point Transfer Checklist</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 transition-colors"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto">
{`EXECUTOR & SPOUSE 15-POINT FAMILY ASSET TRANSMISSION CHECKLIST:
1. Obtain 15-20 certified original copies of the Death Certificate from the Municipal Corporation (MCD/BMC/BBMP).
2. Locate the registered original Will, codicils, and the physical Family Red File / Asset Dossier.
3. Notify all life insurance companies within 30 days; submit Form 39 along with original policy bonds and canceled cheques.
4. Intimate primary salary/pension bank branches; stop standing instructions and auto-debits for credit cards.
5. Inquire whether home loans and vehicle loans are covered by credit life insurance (e.g., SBI RiNn Raksha, ICICI Lombard).
6. File death intimation with CDSL/NSDL depository participants to transmit demat shares to the surviving joint holder or nominee.
7. Submit transmission requests for mutual fund folios via MFCentral or respective AMCs with Form T2/T3.
8. Submit Form G/H for PPF accounts at Post Office/Bank branches to release accumulated tax-free balances.
9. File online e-nomination claim for EPF (Form 20/5IF) and monthly widow/children pension under EPS 95 (Form 10D).
10. Apply for title mutation of residential and commercial immovable properties in local Municipal & Revenue records.
11. Transfer electricity, water, and piped gas meters to the surviving spouse/heir using legal heir certificate.
12. Access bank safe deposit lockers following the joint survivor mandate or RBI guidelines on nominee locker opening.
13. Search the RBI UDGAM portal (udgam.rbi.org.in) for any unlinked dormant bank accounts or unclaimed fixed deposits.
14. Check the MCA IEPF portal (iepf.gov.in) for unclaimed corporate shares, physical share certificates, and dividends.
15. Discharge the deceased's pending income tax liabilities as Legal Representative under Section 159 of the Income Tax Act, 1961.`}
                </pre>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL LEGAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>PRACTICE CREDENTIALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Legal Backing: AMA Legal Solutions Profile
              </h3>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                      AAM
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-base">
                        Lawyer Anuj Anand Malik
                      </div>
                      <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                        Senior Estate &amp; Estate Planning Counsel
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold self-start sm:self-auto flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Bar Council of Delhi • AMA Legal Solutions</span>
                  </div>
                </div>

                <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                  <p>
                    Lawyer Anuj Anand Malik leads the Estate, Wealth Transfer, and Will
                    Court Fights practice at <strong>AMA Legal Solutions</strong>. Over 14+ years of specialized
                    practice before the High Court of Delhi and Supreme Court of India, he has represented
                    high-net-worth families, NRIs, and business owners in high-stakes probate fights, split
                    suits, and Will asset audits.
                  </p>
                  <p>
                    WillDrafting.in was architected under his direct legal supervision to ensure that Indian
                    citizens have access to institutional-grade Will protection without the risks of
                    unregulated forms, invalid witness witness signing, or omitted asset schedules.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Family Asset Inventories
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left font-extrabold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL CITATIONS &amp; REGULATORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Legal Citations &amp; Central Regulatory Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="font-bold text-slate-900 text-sm">Governing Statutes &amp; Official Portals:</div>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Indian Succession Act, 1925:</strong> Sections 211, 213, 317 (Inventory and
                    Accounts), 318, and 332 (Assent of Executor).
                  </li>
                  <li>
                    <strong>Income Tax Act, 1961:</strong> Section 159 (Legal Agent liability limited
                    to estate value) and Section 47(iii) (Exclusion of estate from capital gains).
                  </li>
                  <li>
                    <strong>Reserve Bank of India (RBI) UDGAM Portal:</strong> Official Centralized Web Portal
                    for searching Unclaimed Deposits (udgam.rbi.org.in).
                  </li>
                  <li>
                    <strong>Ministry of Corporate Affairs (MCA) IEPF:</strong> Investor Education and Protection
                    Fund Office rules for unclaimed shares &amp; dividends (iepf.gov.in).
                  </li>
                  <li>
                    <strong>Supreme Court Precedents:</strong> <em>Smt. Sarbati Devi v. Smt. Usha Devi</em> (1984)
                    1 SCC 424 and <em>Shakti Yezdani v. Jayanand Jayant Salgaonkar</em> (2023) Supreme Court
                    confirming nominee as mere custodian.
                  </li>
                </ul>
              </div>
            </section>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clear Will keeps your spouse and kids safe. It stops long court fights. You pick who gets your house, land, shop, gold, and bank cash. Do not wait to put your plan in writing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can write a Will on plain white paper. No stamp paper is needed in India. Sign it in front of two adult witnesses. Each witness signs in your view to make it valid.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team checks your asset list and tax bills. We write your Will in clear words with no mix-ups. Then we guide you step by step so your heirs get their share fast.
              </p>
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
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Indian testamentary jurisprudence, Section 317 asset inventory audits,
                High Court probate petitions, and multi-asset estate planning.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked Counsel</span>
                </span>
              </div>
            </div>

            {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
            <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>PREVENT FAMILY WEALTH LOSS</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                Draft a Fight-Proof Will in 15 Minutes
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Ensure your family asset inventory is legally signed under the Indian Succession Act.
                Includes specific bequests, executor appointment, and witness witness signing blueprints.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                <span>Draft Your Will Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                <Scale className="w-3 h-3" />
                <span>AMA LEGAL SOLUTIONS</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                Consult a Senior Estate Planning Lawyer
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Have complex multi-city family land, business holdings, or NRI estate questions?
                Book a confidential advisory session with our senior lawyers.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Schedule Lawyer Talk</span>
              </Link>
            </div>

            {/* CARD 4: RELATED TOOLS & CALCULATORS */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sliders className="w-4 h-4" />
                <span>RELATED SUCCESSION TOOLS</span>
              </div>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
                >
                  <div className="font-bold text-slate-900">Capital Gains Tax Tool</div>
                  <div className="text-[11px] text-slate-500">12.5% Flat vs 20% Indexation</div>
                </Link>
                <Link
                  href="/tools/bank-deceased-claim-document-checklist-generator"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
                >
                  <div className="font-bold text-slate-900">Bank Deceased Claim Checklist</div>
                  <div className="text-[11px] text-slate-500">Surviving Nominee vs Legal Heir</div>
                </Link>
                <Link
                  href="/tools/demat-mutual-fund-transmission-document-finder"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
                >
                  <div className="font-bold text-slate-900">Demat &amp; MF Transfer Finder</div>
                  <div className="text-[11px] text-slate-500">SEBI T2/T3 &amp; CML Checklist</div>
                </Link>
                <Link
                  href="/tools/executor-duties-90-day-timeline-generator"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
                >
                  <div className="font-bold text-slate-900">90-Day Executor Timeline Generator</div>
                  <div className="text-[11px] text-slate-500">Milestones from Demise to Probate</div>
                </Link>
                <Link
                  href="/tools/witness-eligibility-section-67-checker"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
                >
                  <div className="font-bold text-slate-900">Witness Eligibility &amp; Sec 67 Checker</div>
                  <div className="text-[11px] text-slate-500">Audit Void Bequests &amp; Witnesses</div>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* =========================================================================
          MODAL 1: ADD ASSET POPUP
          ========================================================================= */}
      {showAddAssetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#C65378]" />
                <span>Add Asset to Family Vault</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddAssetModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAsset} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Asset Category</label>
                <select
                  value={newAssetCategory}
                  onChange={(e) => setNewAssetCategory(e.target.value as AssetItem["category"])}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-hidden focus:border-[#C65378]"
                >
                  <option value="real_estate">Real Estate (Flats, Houses, Plots, Land)</option>
                  <option value="bank_deposits">Bank Accounts &amp; Fixed Deposits (FD / RD)</option>
                  <option value="investments">Demat Stocks, Mutual Funds &amp; NPS</option>
                  <option value="insurance">Life Insurance Policies &amp; EPF/PPF</option>
                  <option value="valuables">Gold, Safe Locker, Vehicles &amp; Valuables</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Asset Description / Name</label>
                <input
                  type="text"
                  placeholder="e.g., 2BHK Flat in Pune / SBI Fixed Deposit / Zerodha Demat"
                  value={newAssetTitle}
                  onChange={(e) => setNewAssetTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:border-[#C65378]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Institution / Location</label>
                  <input
                    type="text"
                    placeholder="e.g., HDFC Bank, Andheri East / DLF Phase 5"
                    value={newAssetInstitution}
                    onChange={(e) => setNewAssetInstitution(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:border-[#C65378]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Account No / Deed No (Last 4 digits)</label>
                  <input
                    type="text"
                    placeholder="e.g., A/C ending in ...5821"
                    value={newAssetIdentifier}
                    onChange={(e) => setNewAssetIdentifier(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:border-[#C65378]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Value (₹ INR)</label>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    value={newAssetValue}
                    onChange={(e) => setNewAssetValue(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold focus:outline-hidden focus:border-[#C65378]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nominee Filed?</label>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setNewAssetNominee(true)}
                      className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                        newAssetNominee
                          ? "bg-emerald-700 text-white shadow-xs"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      Yes, Filed
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewAssetNominee(false)}
                      className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                        !newAssetNominee
                          ? "bg-rose-700 text-white shadow-xs"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      No / Pending
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Confidential Location / Access Note</label>
                <textarea
                  rows={2}
                  placeholder="e.g., Original passbook in Godrej safe; joint holder with spouse."
                  value={newAssetNotes}
                  onChange={(e) => setNewAssetNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:border-[#C65378]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddAssetModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C65378] text-white font-extrabold hover:bg-[#a33b5c] shadow-xs"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: ADD LIABILITY POPUP
          ========================================================================= */}
      {showAddLiabilityModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#C65378]" />
                <span>Add Outstanding Debt / Liability</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddLiabilityModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLiability} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Debt Type / Description</label>
                <input
                  type="text"
                  placeholder="e.g., Home Mortgage Loan / Car Auto Loan / Personal Loan"
                  value={newLiabTitle}
                  onChange={(e) => setNewLiabTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:border-[#C65378]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lender / Bank</label>
                  <input
                    type="text"
                    placeholder="e.g., State Bank of India / HDFC Ltd"
                    value={newLiabLender}
                    onChange={(e) => setNewLiabLender(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:border-[#C65378]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Loan Account Number</label>
                  <input
                    type="text"
                    placeholder="e.g., Loan A/C ...8392"
                    value={newLiabAccount}
                    onChange={(e) => setNewLiabAccount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:border-[#C65378]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Outstanding Balance (₹ INR)</label>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    value={newLiabBalance}
                    onChange={(e) => setNewLiabBalance(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold focus:outline-hidden focus:border-[#C65378]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Has Credit Life Cover?</label>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setNewLiabInsurance(true)}
                      className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                        newLiabInsurance
                          ? "bg-emerald-700 text-white shadow-xs"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      Yes, Insured
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewLiabInsurance(false)}
                      className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                        !newLiabInsurance
                          ? "bg-rose-700 text-white shadow-xs"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      No Insurance
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deal / Payoff Instructions</label>
                <textarea
                  rows={2}
                  placeholder="e.g., To be cleared from term insurance proceeds or mutual fund liquidation."
                  value={newLiabNotes}
                  onChange={(e) => setNewLiabNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:border-[#C65378]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddLiabilityModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C65378] text-white font-extrabold hover:bg-[#a33b5c] shadow-xs"
                >
                  Save Liability
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          PRINT ONLY VIEW: FORMATTED FAMILY EMERGENCY DOSSIER
          ========================================================================= */}
      <div className="hidden print:block p-8 bg-white text-black font-serif space-y-6">
        <div className="border-b-2 border-black pb-4 text-center space-y-1">
          <div className="text-2xl font-bold tracking-tight uppercase">
            CONFIDENTIAL FAMILY EMERGENCY ASSET &amp; LIABILITY DOSSIER
          </div>
          <p className="text-xs italic text-gray-700">
            Prepared under Section 317 of the Indian Succession Act, 1925 • Private Record for Spouse, Heirs &amp; Designated Executor
          </p>
          <p className="text-[11px] text-gray-600">Generated via WillDrafting.in Client-Side Vault on {new Date().toLocaleDateString("en-IN")}</p>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-2 gap-4 text-xs border border-gray-300 p-4 rounded">
          <div>
            <strong>Estate Owner:</strong> {profileName}
          </div>
          <div>
            <strong>Primary Nominee / Spouse:</strong> {spouseName}
          </div>
          <div>
            <strong>Trusted Designated Executor:</strong> {trustedExecutor}
          </div>
          <div>
            <strong>Family Doctor:</strong> {familyDoctor}
          </div>
          <div>
            <strong>Lawyer / CA:</strong> {caOrAdvocate}
          </div>
          <div>
            <strong>Will &amp; Key Location:</strong> {willLocation}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-3 gap-4 text-xs border-y border-black py-2 font-bold text-center">
          <div>TOTAL GROSS ASSETS: {formatINR(totalAssetsValue)}</div>
          <div>TOTAL LIABILITIES: {formatINR(totalLiabilitiesValue)}</div>
          <div>NET ESTATE WORTH: {formatINR(estateNetWorth)}</div>
        </div>

        {/* Asset Table */}
        <div className="space-y-2">
          <div className="text-sm font-bold uppercase border-b border-gray-400 pb-1">SCHEDULE OF ASSETS</div>
          <table className="w-full text-left text-[11px] border border-gray-300">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="p-1.5">Category</th>
                <th className="p-1.5">Asset Description</th>
                <th className="p-1.5">Institution / Location</th>
                <th className="p-1.5">Account / Identifier</th>
                <th className="p-1.5 text-right">Estimated Value</th>
                <th className="p-1.5 text-center">Nominee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assets.map((a, i) => (
                <tr key={i}>
                  <td className="p-1.5 font-medium">{a.category.replace("_", " ").toUpperCase()}</td>
                  <td className="p-1.5 font-bold">{a.title}</td>
                  <td className="p-1.5">{a.institutionOrLocation}</td>
                  <td className="p-1.5">{a.identifierOrAccount}</td>
                  <td className="p-1.5 text-right font-mono">{formatINR(a.estimatedValue)}</td>
                  <td className="p-1.5 text-center">{a.hasNominee ? "YES" : "NO"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Liabilities Table */}
        <div className="space-y-2">
          <div className="text-sm font-bold uppercase border-b border-gray-400 pb-1">SCHEDULE OF LIABILITIES &amp; DEBTS</div>
          <table className="w-full text-left text-[11px] border border-gray-300">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="p-1.5">Debt Description</th>
                <th className="p-1.5">Lender / Institution</th>
                <th className="p-1.5">Loan Account No</th>
                <th className="p-1.5 text-right">Outstanding Amount</th>
                <th className="p-1.5 text-center">Insurance Cover</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {liabilities.map((l, i) => (
                <tr key={i}>
                  <td className="p-1.5 font-bold">{l.title}</td>
                  <td className="p-1.5">{l.lender}</td>
                  <td className="p-1.5">{l.accountNumber}</td>
                  <td className="p-1.5 text-right font-mono">{formatINR(l.outstandingBalance)}</td>
                  <td className="p-1.5 text-center">{l.hasInsuranceCover ? "YES (INSURED)" : "NO"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Declaration */}
        <div className="pt-4 border-t border-black text-[10px] space-y-3">
          <p>
            <strong>Legal Declaration:</strong> This confidential inventory is recorded to assist my lawful
            Executor(s) and legal heirs in the orderly care and transfer of my estate pursuant to
            Sections 211 and 317 of the Indian Succession Act, 1925. The beneficial title to all assets listed
            above shall devolve strictly as directed under my Last Will and Testament.
          </p>
          <div className="flex justify-between pt-6">
            <div>Signature of Estate Owner: _______________________</div>
            <div>Date: _______________</div>
          </div>
        </div>
      </div>
    </div>
  );
}
