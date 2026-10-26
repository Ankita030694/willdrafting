"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Copy,
  Printer,
  ShieldAlert,
  Sliders,
  DollarSign,
  Info,
  Lock,
  PhoneCall,
  Key,
  Database,
  Cpu,
  Mail,
  HardDrive,
  Globe,
  Share2,
  Coins,
  Wallet,
  Shield,
  CheckSquare,
} from "lucide-react";

interface ComparisonRow {
  parameter: string;
  inWill: string;
  twoDocMethod: string;
  verdict: "safe" | "danger" | "neutral";
  note: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    parameter: "Confidentiality & Privacy",
    inWill: "ZERO privacy: Read by witnesses during signing; becomes public court record during probate.",
    twoDocMethod: "100% Confidential: Stored in a sealed envelope, bank locker, or encrypted password vault.",
    verdict: "safe",
    note: "Public probate records mean anyone can inspect court files and steal exposed seed phrases.",
  },
  {
    parameter: "Risk of Asset Theft",
    inWill: "Catastrophic: Seed phrases are permanently exposed to registrars, clerks, and witnesses.",
    twoDocMethod: "Minimal: Access credentials are only accessible by your chosen executor after death.",
    verdict: "safe",
    note: "Blockchain transactions cannot be reversed by courts or police once a key is compromised.",
  },
  {
    parameter: "Updating Passwords & Coins",
    inWill: "Expensive & slow: Requires executing a formal Codicil or new Will with two witnesses.",
    twoDocMethod: "Instant: Update your private letter anytime with zero advocate fees or witnesses.",
    verdict: "safe",
    note: "Crypto portfolios and passwords change frequently; your Will should remain stable.",
  },
  {
    parameter: "Legal Enforceability in Court",
    inWill: "Valid bequest, but invites severe security risks before probate finishes.",
    twoDocMethod: "100% Enforceable: Will establishes legal title, while letter provides technical access.",
    verdict: "safe",
    note: "Combines Section 30 Succession Act ownership with lawful IT Act electronic authorization.",
  },
  {
    parameter: "Centralized Exchange KYC Claims",
    inWill: "Exchanges (CoinDCX, WazirX) accept the Will for transmission, but reject password sharing.",
    twoDocMethod: "Seamless: Will proves heirship to exchange support, while memo handles self-custody.",
    verdict: "safe",
    note: "FIU-IND registered platforms mandate legal heir documentation rather than informal logins.",
  },
];

const TOC_ITEMS = [
  { id: "executive-brief", label: "Executive Summary" },
  { id: "legal-status-india", label: "1. Legal Status of Crypto" },
  { id: "two-document-method", label: "2. The Two-Document Method" },
  { id: "digital-asset-inventory", label: "3. Digital Asset Inventory" },
  { id: "vda-taxation-rules", label: "4. VDA Taxation & Exemptions" },
  { id: "visual-blueprint", label: "5. Visual Blueprint" },
  { id: "crypto-specific-challenges", label: "6. Wallets, Keys & Exchanges" },
  { id: "non-crypto-digital-assets", label: "7. Non-Crypto Online Assets" },
  { id: "step-by-step-sop", label: "8. Step-by-Step SOP" },
  { id: "automation-dead-man-switch", label: "9. Dead Man Switches & Tools" },
  { id: "interactive-readiness-tool", label: "10. Digital Readiness Audit" },
  { id: "critical-mistakes", label: "11. Three Fatal Mistakes" },
  { id: "frequently-asked-questions", label: "12. Questions People Often Ask" },
  { id: "statutory-citations", label: "13. Statutory Authority" },
];

const DIGITAL_INVENTORY_TEMPLATE = `CONFIDENTIAL DIGITAL ASSET INVENTORY & ACCESS MEMORANDUM
(Supplementary Access Letter to the Last Will and Testament)

IMPORTANT LEGAL NOTICE:
This memorandum is a private, confidential document intended solely for my named Executor and Legal Heir.
It must NOT be attached to my registered Will or disclosed to attesting witnesses.
Store in a sealed, tamper-evident envelope inside a secure bank locker or encrypted password vault.

TESTATOR DETAILS:
Full Legal Name: [Your Full Name]
Aadhaar / PAN: [Aadhaar / PAN Number]
Date of Accompanying Will: [Date of Will]
Named Digital Executor: [Full Name of Trusted Executor / Tech-Savvy Nominee]

========================================================================
1. PRIMARY EMAIL & IDENTITY ACCOUNTS
(Primary email controls account resets and 2FA authentication)
========================================================================
- Google / Gmail Account:
  Email Address: [user@gmail.com]
  2FA Method: [Google Authenticator / YubiKey / SMS]
  Inactive Account Manager Contact: [Nominee Email / Phone]
  Recovery Email / Phone: [Backup Details]

- Apple ID / iCloud:
  Email: [user@icloud.com]
  Legacy Contact Designated: [Yes / No - Name of Contact]
  Master Device Passcode Location: [Safe / Master Password Vault]

========================================================================
2. CRYPTOCURRENCY COLD STORAGE (HARDWARE WALLETS)
========================================================================
- Hardware Wallet 1:
  Brand / Model: [Ledger Nano X / Trezor Safe 3]
  Physical Location: [Home Fireproof Safe / Bank Locker Box #]
  PIN Code: [Stored in Password Manager under entry 'HW-PIN' / Sealed Note B]
  BIP-39 Recovery Seed Phrase (12/24 words):
  [STRICT WARNING: Never store raw words in digital plain text.
   Location of physical steel backup plate / cryptosteel: Sealed Envelope in Safe]
  Beneficiary Named in Will: [Name of Heir]

========================================================================
3. NON-CUSTODIAL SOFTWARE WALLETS (HOT WALLETS)
========================================================================
- Wallet Type: [MetaMask / Phantom / Trust Wallet / Coinbase Wallet]
  Associated Browser / Device: [MacBook Pro / iPhone 15]
  Public Wallet Address: [0x... / Sol...]
  Seed Phrase Location: [Password Vault Emergency Access / Safe]
  Key Tokens / NFTs Held: [BTC, ETH, SOL, Polygon, Specific NFTs]
  Designated Beneficiary: [Name of Heir]

========================================================================
4. CENTRALIZED CRYPTO EXCHANGES (FIU-IND REGISTERED)
========================================================================
- Exchange 1: [CoinDCX / WazirX / Mudrex / Binance]
  Registered Email ID: [Email used for login]
  Registered Mobile: [Mobile Number]
  Nominee Registered on App: [Yes / No - Nominee Name]
  Instructions for Legal Heir:
  [Submit death certificate and Will copy to exchange support for formal transmission.
   Do not attempt illicit bot withdrawals after demise.]

========================================================================
5. DOMAIN NAMES, HOSTING & WEB ASSETS
========================================================================
- Domain Registrar: [GoDaddy / Namecheap / Cloudflare]
  Domain Names Owned: [example.com, myventure.in]
  Hosting Provider: [AWS / DigitalOcean / Hostinger]
  Auto-Renewal Credit Card on File: [Yes / No]
  Intended Heir or Business Successor: [Name of Heir / Business Partner]

========================================================================
6. CLOUD STORAGE & DIGITAL MEMORIES
========================================================================
- Service: [Google Drive / Microsoft OneDrive / Dropbox / Proton Drive]
  Login ID: [Username]
  Contents: [Family photographs, property deeds, tax archives, creative works]
  Wishes: [Transfer family albums to spouse/children; archive or delete work files]

========================================================================
7. DIGITAL CREATOR & REVENUE STREAMS
========================================================================
- Platform: [YouTube / Google AdSense / Substack / Medium / Shopify]
  Channel / Store URL: [URL]
  Payout Bank Account Linked: [Bank Name, Account Number]
  Succession Plan: [Transfer ownership to co-creator / Heir to receive ongoing royalties]

========================================================================
8. SOCIAL MEDIA & MESSAGING ACCOUNTS
========================================================================
- Platforms: [LinkedIn, X (Twitter), Instagram, Facebook]
  Preference: [Memorialize account / Complete deletion upon demise]
  Platform Legacy Settings Configured: [Yes / No]

========================================================================
SIGNATURE & DATE:
Testator Signature: ___________________________________
Date of Execution: [Day, Month, Year]
Location: [City, State]`;

const FAQS = [
  {
    q: "Can I legally bequeath crypto and Bitcoin in an Indian Will?",
    a: "Yes. Under Section 30 of the Indian Succession Act, 1925, any competent person can dispose of any movable property by Will. The Supreme Court of India in the 2020 IMAI judgment affirmed that cryptocurrency is legal to hold and transact. Cryptocurrency is legally classified as Virtual Digital Assets (VDAs) under Section 2(47A) of the Income Tax Act, 1961, and can be legally bequeathed to your chosen heirs.",
  },
  {
    q: "Why should I never put my crypto private keys or seed phrases in my Will?",
    a: "A Will is not a confidential document. Under Section 63 of the Indian Succession Act, at least two independent witnesses must view your execution and can read the document. Furthermore, if your Will is submitted for probate in court or registered at the Sub-Registrar Office, it becomes a public record accessible by clerks and third parties. Anyone who reads your 12 or 24-word seed phrase can instantly steal your entire balance irreversibly. Always use the Two-Document Method.",
  },
  {
    q: "What is the Two-Document Method for crypto and digital estate planning?",
    a: "The Two-Document Method splits legal title from technical access. Document 1 is your formal Last Will and Testament, which names your beneficiaries and legally gifts your digital assets to them without exposing credentials. Document 2 is a separate, confidential Digital Asset Memorandum or sealed access letter (stored in a bank locker or encrypted password vault) that contains hardware wallet locations, PINs, seed phrases, and technical recovery instructions.",
  },
  {
    q: "Is inherited crypto taxed in India under the 30% VDA tax rule?",
    a: "No, the inheritance itself is 100% tax-free upon receipt. Under the proviso to Section 56(2)(x) of the Income Tax Act, 1961, any property or virtual digital asset received under a Will or through inheritance is completely exempt from gift tax and income tax. However, when your heir later sells or exchanges that crypto for rupees, they will owe a flat 30% tax on net profits under Section 115BBH plus 1% TDS under Section 194S.",
  },
  {
    q: "How does my heir calculate capital gains when selling inherited crypto?",
    a: "Under Section 49(1) of the Income Tax Act, 1961, the cost of acquisition for the legal heir is deemed to be the cost for which the deceased person originally bought the cryptocurrency. The heir's taxable profit is the final sale price minus that original purchase cost. Under Section 115BBH, no indexation benefits, deduction of expenses (other than purchase cost), or loss offsets are permitted.",
  },
  {
    q: "How can my family recover crypto kept on Indian centralized exchanges like CoinDCX or WazirX?",
    a: "Centralized exchanges registered with FIU-IND require your legal heir or executor to submit a formal transmission claim. They will ask for an official death certificate, a copy of the probated Will or Legal Heir Certificate / Succession Certificate, complete KYC documents of the claimant, and an indemnity bond. Once verified, the exchange transfers the balance to the heir's verified account.",
  },
  {
    q: "What happens to self-custodial wallets like MetaMask or Ledger if I do not leave instructions?",
    a: "Unlike bank accounts or stock demat accounts, self-custodial blockchain wallets have no customer support, no nominee mechanism, and no court override. If you do not leave your hardware wallet PIN and 12/24-word seed phrase in a secure letter, your crypto will remain locked on the blockchain forever and can never be recovered by anyone, including judges or cyber police.",
  },
  {
    q: "Can my executor access my Google Drive, iCloud, and emails legally after my death?",
    a: "Under Section 43 and Section 66 of the Information Technology Act, 2000, logging into another person's account without express authorization can technically constitute an offense. To protect your family, you should: (1) explicitly authorize your digital executor in your Will to handle electronic accounts, and (2) configure platform legacy features like Google Inactive Account Manager and Apple Legacy Contact during your lifetime.",
  },
  {
    q: "How do I include domain names, social media channels, and YouTube revenue in my Will?",
    a: "Digital media and revenue accounts represent commercial intellectual and contractual property. You can bequeath specific domain names, monetized YouTube channels, or online storefronts to named beneficiaries in your Will. Your confidential access memo should list the registrar (e.g. GoDaddy), Google AdSense account ID, and payout details so the executor can reassign ownership smoothly.",
  },
  {
    q: "Do I need to update my Will every time I buy a new cryptocurrency or change a password?",
    a: "No! This is the greatest advantage of the Two-Document Method. Your formal Will contains a broad legal bequest (e.g. 'all my virtual digital assets and cryptocurrency holdings'). When you buy new coins, open new wallets, or update passwords, you simply update your private Digital Asset Memorandum in your safe or password vault without paying advocate fees or executing a Codicil.",
  },
];

export default function DigitalAssetsCryptoClient() {
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

  const [activeId, setActiveId] = useState<string>("executive-brief");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);

  // State for Interactive Digital Readiness Quiz
  const [readinessChecklist, setReadinessChecklist] = useState<Record<string, boolean>>({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: true,
    step6: false,
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

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(DIGITAL_INVENTORY_TEMPLATE);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  const handlePrintTemplate = () => {
    window.print();
  };

  const toggleReadiness = (key: string) => {
    setReadinessChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(readinessChecklist).filter(Boolean).length;
  const readinessScore = Math.round((completedCount / 6) * 100);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy #172228)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial glow accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Coins className="w-4 h-4 text-[#C65378]" />
            <span>DIGITAL ESTATE PLANNING &bull; CRYPTO SUCCESSION GUIDE</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            How to Include Crypto &amp; Digital Assets in an Indian Will
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Protect your Bitcoin, private keys, online investments, and cloud drives. Discover the Two-Document Method, Section 115BBH VDA tax exemptions, and our free downloadable inventory template.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer text-sm sm:text-base"
            >
              <span>Include Digital Assets in Your Will</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#digital-asset-inventory"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all text-sm sm:text-base"
            >
              <span>Download Inventory Template</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Social Proof & Trust Metrics)
          ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            {/* Stat 1: Experience */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Succession Expertise
              </span>
            </div>

            {/* Stat 2: Wills Drafted */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Wills Drafted
              </span>
            </div>

            {/* Stat 3: Assets Protected */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹2,500Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Assets Secured
              </span>
            </div>

            {/* Stat 4: Google Rating */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-4 md:border-l md:border-[#172228]/12">
              <svg
                className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 sm:w-8 sm:h-8 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <div className="flex items-baseline">
                <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                  4.9/5
                </span>
                <span className="text-[10px] sm:text-xs text-[#55636D] font-bold ml-1 sm:ml-1.5 whitespace-nowrap">
                  (1,200+ Reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN EDITORIAL CONTAINER
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block space-y-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-4 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#172228]/10 text-[#172228]">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Table of Contents
                </span>
              </div>

              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-xl transition-all font-medium leading-snug ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-4 border-[#C65378]"
                          : "text-[#55636D] hover:text-[#172228] hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-4 pt-3 border-t border-[#172228]/10">
                <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Legal Framework</span>
                </div>
                <p className="text-[10px] text-[#55636D] mt-1 leading-normal">
                  Indian Succession Act 1925 &bull; IT Act 2000 &bull; Section 115BBH VDA Tax
                </p>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF BOX */}
            <div
              id="executive-brief"
              className="scroll-target rounded-2xl bg-[#F4F8FE] border-l-[5px] border-l-[#C65378] p-6 sm:p-7 shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Executive Summary &bull; Digital Succession Rules</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                Executive Brief: Digital Estate Planning in India
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Cryptocurrency is Legal Property:</strong> Bitcoin, Ethereum, and NFTs constitute Virtual Digital Assets (VDAs) under Section 2(47A) of the Income Tax Act, 1961, and can be legally bequeathed under Section 30 of the Indian Succession Act, 1925.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>The Two-Document Method is Mandatory:</strong> Never put seed phrases or passwords directly into a Will. A Will becomes public during probate and is read by witnesses. Use a formal Will for legal title and a separate, confidential access memo for credentials.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>100% Tax-Free Inheritance:</strong> Under Section 56(2)(x) proviso, crypto inherited under a Will or intestate succession is exempt from tax upon receipt. A 30% VDA capital gains tax applies only when the legal heir later liquidates the tokens.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Non-Custodial Wallets Need Direct Keys:</strong> Blockchains have no customer support or nominee system. If you do not leave a physical seed phrase backup, self-custody funds in Ledger or MetaMask are lost permanently forever.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Cloud Accounts &amp; Social Media:</strong> Digital memories and domain names should be assigned to specific heirs, backed by platform legacy contacts (Google Inactive Account Manager, Apple Legacy Contact).
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 1: LEGAL STATUS OF DIGITAL ASSETS IN INDIA */}
            <section id="legal-status-india" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>Statutory Standing</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                1. Legal Status: Digital Assets &amp; Crypto in Indian Law
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  A common question Indian investors ask is whether cryptocurrency is legally recognized under inheritance laws. The answer is an unambiguous yes. In the landmark judgment <em>Internet and Mobile Association of India (IMAI) v. Reserve Bank of India (2020)</em>, the Supreme Court struck down the RBI banking ban, establishing that holding, trading, and owning virtual currencies is a constitutionally protected economic activity.
                </p>
                <p>
                  Under the <strong>Indian Succession Act, 1925 (Section 30)</strong>, any person of sound mind has the unrestricted power to dispose of their movable property by executing a valid Will. Digital assets (including Bitcoin, Ethereum, NFTs, cloud accounts, domain names, and digital royalties) are legally classified as <em>incorporeal movable property</em>.
                </p>
                <p>
                  Furthermore, the Finance Act, 2022 formally defined cryptocurrency under <strong>Section 2(47A) of the Income Tax Act, 1961</strong> as a &quot;Virtual Digital Asset&quot; (VDA). By taxing VDAs and regulating Virtual Asset Service Providers (VASPs) through the Financial Intelligence Unit (FIU-IND) under the Prevention of Money Laundering Act (PMLA), the Government of India has created an established statutory framework recognizing crypto as taxable personal property that forms part of a deceased person&apos;s legal estate.
                </p>
              </div>

              {/* Callout box for IT Act Section 43/66 caution */}
              <div className="rounded-xl bg-amber-50/80 border border-amber-200 p-4 text-xs text-amber-900 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block mb-1">
                    Information Technology Act, 2000 Caution:
                  </strong>
                  Under Sections 43 and 66 of the IT Act, accessing a computer system or password-protected online account without explicit authorization is a punishable offense. Merely possessing your deceased parent&apos;s password does not grant lawful access. A formal Will that expressly authorizes your named Digital Executor provides the legal shield needed against unauthorized access claims.
                </div>
              </div>
            </section>

            {/* SECTION 2: THE TWO-DOCUMENT METHOD */}
            <section id="two-document-method" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Key className="w-4 h-4" />
                <span>The Core Security Strategy</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                2. The Two-Document Method: Why Never Put Keys in a Will
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  The biggest mistake amateur estate planners make is writing cryptocurrency private keys, 12-word seed phrases, or email passwords directly into their Will. Doing so creates an immediate security disaster.
                </p>
                <p>
                  Under Section 63 of the Indian Succession Act, a Will must be attested by a minimum of <strong>two independent witnesses</strong> who view the document. If you register your Will at the Sub-Registrar Office (SRO), your Will is scanned into government land databases. Moreover, if your estate undergoes court probate in Mumbai, Chennai, or Kolkata, the Will becomes a matter of public court record. Any witness, court clerk, lawyer, or family member who reads your 24-word recovery phrase can drain your blockchain wallets in seconds with zero paper trail.
                </p>
                <p>
                  To solve this dilemma, WillDrafting.in pioneers the <strong>Two-Document Method</strong>:
                </p>
              </div>

              {/* Two Document Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228] uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Document 1: The Formal Will</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    Public Legal Title Document
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Signed before two witnesses and optionally registered at the Sub-Registrar Office. It includes a general legal bequest giving &quot;all my virtual digital assets, hardware wallets, and online accounts to my daughter Ananya.&quot;
                  </p>
                  <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                    &bull; Contains ZERO passwords or seed phrases
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228] uppercase tracking-wider">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Document 2: The Access Memorandum</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    Confidential Practical Access Key
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A private supplementary letter stored inside a bank locker, tamper-evident sealed envelope, or encrypted password vault. It provides exact technical steps, hardware wallet locations, PINs, and recovery seeds.
                  </p>
                  <div className="text-[11px] font-semibold text-[#C65378] bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200">
                    &bull; Updated anytime without advocate fees or new witnesses
                  </div>
                </div>
              </div>

              {/* Comparison Matrix Table */}
              <div className="rounded-2xl bg-white border border-[#172228]/10 overflow-hidden shadow-xs mt-6">
                <div className="px-5 py-3.5 bg-[#172228] text-white flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Comparison: Credentials in Will vs Two-Document Method
                  </span>
                  <span className="text-[11px] text-slate-300">Section 63 ISA Standard</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-[#172228]/10 text-[#172228] font-bold">
                        <th className="p-3">Security &amp; Legal Metric</th>
                        <th className="p-3">Putting Keys in Will</th>
                        <th className="p-3">Two-Document Method</th>
                        <th className="p-3">Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#172228]/5 text-slate-700">
                      {COMPARISON_DATA.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-3 font-semibold text-[#172228]">{row.parameter}</td>
                          <td className="p-3 text-rose-700 bg-rose-50/30">{row.inWill}</td>
                          <td className="p-3 text-emerald-800 bg-emerald-50/30 font-medium">{row.twoDocMethod}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                              <ShieldCheck className="w-3 h-3" /> Recommended
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: DIGITAL ASSET INVENTORY TEMPLATE */}
            <section id="digital-asset-inventory" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>Actionable Free Template</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                3. Digital Asset Inventory Template: Checklist &amp; Assets
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Use our comprehensive, clause-annotated Digital Asset Inventory and Access Memorandum. Fill this out, place it in a sealed envelope, and store it safely in your bank locker or safe with instructions for your named executor.
              </p>

              {/* Template Container */}
              <div className="rounded-2xl bg-white border border-[#172228]/10 overflow-hidden shadow-xs">
                {/* Header Toolbar */}
                <div className="px-4 py-3 bg-[#172228] text-white flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#C65378]" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Confidential Digital Inventory &amp; Memorandum Template
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyTemplate}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {copiedTemplate ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Template</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handlePrintTemplate}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Format</span>
                    </button>
                  </div>
                </div>

                {/* Preformatted Template Box */}
                <div className="p-4 sm:p-6 bg-slate-900 text-slate-200 overflow-x-auto max-h-[500px] overflow-y-auto font-mono text-xs leading-relaxed">
                  <pre className="whitespace-pre-wrap selection:bg-[#C65378] selection:text-white">
                    {DIGITAL_INVENTORY_TEMPLATE}
                  </pre>
                </div>

                <div className="p-4 bg-slate-50 border-t border-[#172228]/10 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span>
                    &bull; Covers 10 digital asset classes: Email, Crypto, NFTs, Cloud, Domains &amp; FinTech.
                  </span>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 text-[#C65378] font-bold hover:underline"
                  >
                    <span>Draft Your Legal Will with Digital Clauses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 4: VDA TAXATION UNDER INCOME TAX ACT */}
            <section id="vda-taxation-rules" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <DollarSign className="w-4 h-4" />
                <span>Statutory Tax Implications</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                4. VDA Taxation: 30% Tax, 1% TDS &amp; Inheritance Exemptions
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Crypto tax laws in India are among the strictest in the world. However, Indian tax jurisprudence makes a crucial, positive distinction between an <strong>inheritance transfer</strong> and a <strong>commercial sale</strong>.
                </p>
                <p>
                  Here is the exact statutory tax roadmap every Indian crypto investor and heir must know:
                </p>
              </div>

              {/* Tax Rules Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Point of Inheritance: 100% Tax-Free</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    Section 56(2)(x) Statutory Exemption
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the third proviso to Section 56(2)(x) of the Income Tax Act, 1961, any sum of money or property (expressly including Virtual Digital Assets) received under a Will or by way of inheritance is <strong>completely exempt from income tax</strong>. Your heir does not pay a single rupee in tax merely for receiving your Bitcoin, Ethereum, or hardware wallets.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Subsequent Liquidation / Sale</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    Section 115BBH &amp; Section 194S TDS
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When your heir later liquidates the inherited cryptocurrency into Indian Rupees (INR) or swaps it for another token, Section 115BBH takes effect. A flat <strong>30% tax (+ 4% cess + applicable surcharge)</strong> is levied on the net profit. Indian exchanges will also deduct <strong>1% TDS under Section 194S</strong> on the gross transaction value.
                  </p>
                </div>
              </div>

              {/* Worked Numeric Calculation Box */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3">
                <h3 className="font-extrabold text-sm text-[#172228] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#C65378]" />
                  <span>Worked Tax Example: Inheriting 1 Bitcoin in India</span>
                </h3>
                <div className="text-xs text-slate-700 space-y-2">
                  <p>
                    <strong>1. Original Purchase:</strong> Ramesh bought 1 Bitcoin in 2021 for ₹25,00,000.
                  </p>
                  <p>
                    <strong>2. Inheritance Upon Demise (2026):</strong> Ramesh passes away and leaves the Bitcoin to his son Rohan via Will. The Bitcoin is worth ₹60,00,000. Rohan pays <strong>₹0 Tax</strong> upon receiving it under Section 56(2)(x).
                  </p>
                  <p>
                    <strong>3. Cost of Acquisition (Section 49(1)):</strong> Under Section 49(1), Rohan&apos;s cost basis is treated as Ramesh&apos;s original purchase price of ₹25,00,000.
                  </p>
                  <p>
                    <strong>4. Future Liquidation:</strong> Rohan sells the Bitcoin in 2027 for ₹75,00,000.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800">
                    Net Capital Gain = Sale Price (₹75L) &minus; Cost of Acquisition (₹25L) = <strong>₹50,00,000</strong><br />
                    Flat 30% Tax under Section 115BBH = ₹15,00,000 (+ 4% Health &amp; Education Cess = ₹60,000) = <strong>₹15,60,000</strong>.<br />
                    1% TDS under Section 194S deducted by exchange = <strong>₹75,000</strong> (credited against final tax).
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Note: Under Section 115BBH(2), no deduction for expenses, brokerage, or electricity is permitted, and losses from one cryptocurrency cannot be offset against gains from another.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: VISUAL BLUEPRINT / INFOGRAPHIC */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HardDrive className="w-4 h-4" />
                <span>Visual Blueprint</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                5. Visual Blueprint: Digital Estate Planning Protocol
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The diagram below illustrates the complete architecture of a compliant digital estate plan in India: separating the formal, probatable Last Will from the confidential, sealed technical access memorandum.
              </p>

              {/* Infographic Image Card */}
              <div className="rounded-2xl bg-white border border-[#172228]/10 overflow-hidden shadow-xs p-4 sm:p-5">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src="/images/digital-assets-crypto-will-india.jpg"
                    alt="Digital Assets and Crypto Estate Planning Architecture in India"
                    fill
                    className="object-cover hover:scale-[1.01] transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
                  <span>
                    <strong>Architecture Blueprint:</strong> Physical Will (names heir) &bull; Sealed Letter (holds seed phrases) &bull; Hardware Wallet (safe custody) &bull; FIU-IND Exchange KYC.
                  </span>
                  <a
                    href="/images/digital-assets-crypto-will-india.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C65378] font-bold hover:underline shrink-0"
                  >
                    <span>View High-Res Image</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 6: CRYPTO CHALLENGES: WALLETS, KEYS & EXCHANGES */}
            <section id="crypto-specific-challenges" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Wallet className="w-4 h-4" />
                <span>Technical Succession Realities</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                6. Crypto Challenges: Hardware Wallets, Keys &amp; Exchanges
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Unlike standard banking deposits where an RBI circular mandates smooth transmission to legal heirs or nominees within 15 days, cryptocurrency exists across decentralized ledgers and sovereign jurisdictions. Estate planning requires tailored handling across three distinct custody models:
                </p>
              </div>

              {/* 3-Way Custody Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white border border-[#172228]/10 p-4 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs mb-1">
                    1
                  </div>
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    Self-Custody Hardware Wallets
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ledger, Trezor, or BitBox devices store private keys offline. They require a physical PIN (typically 4 to 8 digits) and a 12/24-word BIP-39 recovery seed. If entered incorrectly 3 times, the device wipes itself.
                  </p>
                  <p className="text-[11px] font-semibold text-[#C65378]">
                    Solution: Store the PIN and steel seed phrase plate in a sealed safety deposit box.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-[#172228]/10 p-4 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs mb-1">
                    2
                  </div>
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    Indian Centralized Exchanges
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Platforms registered with FIU-IND (CoinDCX, WazirX, CoinSwitch, Mudrex) hold custodial funds. They operate strict AML/KYC checks and reject bot logins after death.
                  </p>
                  <p className="text-[11px] font-semibold text-emerald-700">
                    Solution: Name a nominee in the exchange app; executor files probate / heir certificate to transmit.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-[#172228]/10 p-4 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs mb-1">
                    3
                  </div>
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    DeFi Protocols &amp; Staking
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Yield farming, liquidity pools (Uniswap, Aave), and staked Ethereum on Lido require active wallet signatures to unstake and avoid liquidation penalties.
                  </p>
                  <p className="text-[11px] font-semibold text-blue-700">
                    Solution: Designate a tech-literate Digital Executor with step-by-step unstaking protocols.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: NON-CRYPTO DIGITAL ASSETS */}
            <section id="non-crypto-digital-assets" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>Broad Digital Estate</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                7. Non-Crypto Assets: Cloud Drives, Domains &amp; Social Media
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Your digital estate extends far beyond cryptocurrency. In today&apos;s digital-first economy, the average Indian professional holds dozens of digital assets carrying deep sentimental or substantial financial value:
                </p>
              </div>

              {/* 4 Quadrant Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                    <Mail className="w-4 h-4 text-rose-600" />
                    <span>Family Cloud Drives &amp; Photographs</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Google Photos, Apple iCloud, and Dropbox contain decades of family memories. Most platforms delete inactive accounts after 12 to 24 months. Assigning Apple Legacy Contacts and Google Inactive Account Managers guarantees your family retains these priceless archives.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Domain Names &amp; Digital Real Estate</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Premium domains (e.g. .in, .com) or high-traffic websites generate recurring revenue and hold market value. If credit card auto-renewals lapse after demise, the domain expires and enters public auction. Your access memo must instruct who manages renewals.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                    <Share2 className="w-4 h-4 text-emerald-600" />
                    <span>Creator Royalties &amp; E-Commerce</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    YouTube channels with Google AdSense, Substack newsletters, Spotify podcasts, and Shopify storefronts are monetized contractual assets. Bequeath these income-generating businesses to specific heirs with associated payout banking instructions.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                    <Lock className="w-4 h-4 text-purple-600" />
                    <span>Social Media Memorialization</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    LinkedIn, Instagram, X (Twitter), and Facebook have distinct memorialization policies. Your Will or digital memorandum should specify whether you prefer your public profile to be turned into a memorial page or deleted to protect your privacy.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP SOP PROTOCOL */}
            <section id="step-by-step-sop" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckSquare className="w-4 h-4" />
                <span>6-Stage Implementation Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                8. Step-by-Step SOP: Executing Your Digital Estate Plan
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Follow this battle-tested standard operating procedure to secure your digital and cryptocurrency holdings under Indian law:
              </p>

              {/* 6 Stage Vertical Cards */}
              <div className="space-y-3">
                {[
                  {
                    step: "Stage 1",
                    title: "Take a Complete Digital Asset Inventory",
                    desc: "List every exchange account, hot wallet, hardware wallet, domain, and primary cloud account. Note the platform, registered email, and physical hardware locations.",
                  },
                  {
                    step: "Stage 2",
                    title: "Draft Your Legal Will with a Digital Clause",
                    desc: "Use WillDrafting.in to draft a legally compliant Section 63 Will. Insert a broad digital asset clause naming your beneficiary and appointing a designated Digital Executor.",
                  },
                  {
                    step: "Stage 3",
                    title: "Execute Will Before Two Independent Witnesses",
                    desc: "Sign your physical Will before two adult witnesses who are not beneficiaries. Keep the Will completely free of passwords, PINs, or private keys.",
                  },
                  {
                    step: "Stage 4",
                    title: "Complete the Confidential Access Memorandum",
                    desc: "Fill out the Digital Asset Memorandum (from Section 3). Include exact PINs, hardware locations, and encrypted password manager emergency access steps.",
                  },
                  {
                    step: "Stage 5",
                    title: "Configure Built-in Platform Legacy Features",
                    desc: "Activate Google Inactive Account Manager and Apple Legacy Contact. Set appropriate waiting periods (e.g. 3 or 6 months) and input your trusted heir's email.",
                  },
                  {
                    step: "Stage 6",
                    title: "Establish an Annual Audit Review Cycle",
                    desc: "Review your access letter once every 12 months. When you change master passwords or buy new tokens, simply update the sealed letter in your locker with zero advocate fees.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-3.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-rose-50 text-[#C65378] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65378]">
                          {item.step}
                        </span>
                        <h3 className="font-extrabold text-sm text-[#172228]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: DEAD MAN SWITCHES & AUTOMATION TOOLS */}
            <section id="automation-dead-man-switch" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Cpu className="w-4 h-4" />
                <span>Smart Automation</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                9. Automation Tools: Dead Man Switches &amp; Legacy Contacts
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Technology itself provides built-in tools to automate succession. Combining legal documents with automated triggers ensures your family is not locked out of vital accounts:
                </p>
              </div>

              {/* 3 Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white border border-[#172228]/10 p-4 shadow-xs space-y-2">
                  <h3 className="font-extrabold text-sm text-[#172228] flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Google Inactive Manager</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Set a trigger time (e.g. 3, 6, or 12 months of inactivity). If you do not sign in, Google sends an alert to your phone. If unanswered, it emails your designated trusted contact a secure link to download selected data (Gmail, Drive, Photos).
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-[#172228]/10 p-4 shadow-xs space-y-2">
                  <h3 className="font-extrabold text-sm text-[#172228] flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-purple-600" />
                    <span>Apple Legacy Contact</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under iOS and macOS, generate an Apple Legacy Contact Key. Give this printed QR key to your heir. Upon presenting your official death certificate to Apple, they are granted access to your iCloud photos, notes, and messages.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-[#172228]/10 p-4 shadow-xs space-y-2">
                  <h3 className="font-extrabold text-sm text-[#172228] flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-emerald-600" />
                    <span>Bitwarden / 1Password</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Modern password managers offer &quot;Emergency Access.&quot; A trusted family member can request access. If you do not decline within a set waiting window (e.g. 7 or 14 days), the vault decrypts for them automatically.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: INTERACTIVE DIGITAL READINESS AUDIT */}
            <section id="interactive-readiness-tool" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckSquare className="w-4 h-4" />
                <span>Interactive Assessment</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                10. Interactive Tool: Digital Asset Readiness Assessment
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Check off the items below to calculate your personal Digital Estate Readiness Score. Find out whether your crypto and online accounts are safe or at high risk of permanent loss.
              </p>

              {/* Interactive Tool Card */}
              <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 sm:p-6 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#172228]/10">
                  <div>
                    <h3 className="font-extrabold text-base text-[#172228]">
                      Your Digital Succession Readiness
                    </h3>
                    <p className="text-xs text-slate-500">
                      Completed {completedCount} of 6 essential protection milestones
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#172228]">{readinessScore}%</span>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#55636D]">
                        {readinessScore >= 80 ? "Well Protected" : readinessScore >= 50 ? "Moderate Risk" : "High Risk"}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border-2 border-[#C65378]">
                      <Shield className={`w-5 h-5 ${readinessScore >= 80 ? "text-emerald-600" : "text-[#C65378]"}`} />
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#C65378] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${readinessScore}%` }}
                  />
                </div>

                {/* Checklist Toggles */}
                <div className="space-y-2.5">
                  {[
                    {
                      key: "step1",
                      title: "1. Executed a Formal Will with a Digital Asset Clause",
                      desc: "You have a signed Will under Section 63 naming legal heirs for digital property.",
                    },
                    {
                      key: "step2",
                      title: "2. Used the Two-Document Method (NO passwords in Will)",
                      desc: "Your Will is completely free of private keys, PINs, and 12-word seed phrases.",
                    },
                    {
                      key: "step3",
                      title: "3. Backed Up Seed Phrases on Physical Metal Plates",
                      desc: "Recovery phrases are stored on fireproof steel plates in a secure home safe or bank locker.",
                    },
                    {
                      key: "step4",
                      title: "4. Designated Platform Legacy Contacts",
                      desc: "Configured Google Inactive Account Manager and Apple Legacy Contact on your phone.",
                    },
                    {
                      key: "step5",
                      title: "5. Named Nominees on Centralized Indian Exchanges",
                      desc: "Verified that CoinDCX, WazirX, or Zerodha accounts have updated nominee records.",
                    },
                    {
                      key: "step6",
                      title: "6. Appointed a Tech-Literate Digital Executor",
                      desc: "Designated an executor who knows how to unstake tokens and handle hardware wallets.",
                    },
                  ].map((item) => {
                    const isChecked = readinessChecklist[item.key];
                    return (
                      <div
                        key={item.key}
                        onClick={() => toggleReadiness(item.key)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? "bg-rose-50/40 border-rose-200"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-[#C65378] text-white"
                              : "border border-slate-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#172228]">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600">
                    Need help drafting your digital-ready Will?
                  </span>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>Draft Your Will Online in 15 Mins</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 11: THREE CRITICAL MISTAKES */}
            <section id="critical-mistakes" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>Defensive Estate Planning</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                11. Three Critical Mistakes in Crypto Estate Planning
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Over 90% of crypto assets lost after death stem from these three avoidable blunders:
              </p>

              {/* 3 Mistake Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white border border-rose-200/80 p-5 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                    !
                  </div>
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    1. Putting Seed Phrases Inside the Registered Will
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    As warned earlier, Wills are read by witnesses and court clerks. An exposed 12-word seed phrase invites instant, unrecoverable theft. Keep technical access strictly in your sealed memorandum.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-rose-200/80 p-5 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                    !
                  </div>
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    2. Relying on Informal WhatsApp or Paper Notes
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Leaving a note saying &quot;Rohan gets my Bitcoin&quot; without a formal Will is legally void. Under Section 8 of the Hindu Succession Act, un-willed assets are divided equally among all Class-I heirs, sparking intense family disputes.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-rose-200/80 p-5 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                    !
                  </div>
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    3. Assuming Centralized Exchanges Have Auto-Nominees
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Many investors never set up exchange nominees. When they pass away, international or offshore platforms freeze the accounts indefinitely, demanding expensive international probate orders or foreign court seals.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>Direct Answers to Common Queries</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                12. Frequently Asked Questions: Crypto &amp; Digital Assets
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Find clear answers to complex legal and technical questions on digital estate planning in India:
              </p>

              {/* FAQ Accordion */}
              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-[#172228]/10 overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="font-extrabold text-xs sm:text-sm text-[#172228]">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY AUTHORITY & CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>Legal Authority &amp; Government Acts</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                13. Statutory Authority: Income Tax &amp; Succession Acts
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The legal principles, taxation rules, and procedural protections outlined in this guide are grounded in established Indian statutory law and Supreme Court precedents:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <strong className="text-xs sm:text-sm font-bold text-[#172228] block mb-1">
                    Income Tax Act, 1961
                  </strong>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>&bull; Section 2(47A): Definition of Virtual Digital Assets (VDAs).</li>
                    <li>&bull; Section 56(2)(x) Proviso: 100% Tax Exemption on Inherited Assets.</li>
                    <li>&bull; Section 115BBH: Flat 30% Tax on Net VDA Gains on Sale.</li>
                    <li>&bull; Section 194S: 1% TDS on Crypto Transfers above Threshold.</li>
                    <li>&bull; Section 49(1): Cost of Acquisition Deemed as Cost to Previous Owner.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <strong className="text-xs sm:text-sm font-bold text-[#172228] block mb-1">
                    Indian Succession Act, 1925
                  </strong>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>&bull; Section 2(h): Definition of a Will as a Legal Declaration.</li>
                    <li>&bull; Section 30: Testamentary Disposition of Movable Incorporeal Property.</li>
                    <li>&bull; Section 59: Soundness of Mind and Testamentary Capacity.</li>
                    <li>&bull; Section 63: Mandatory Execution Before Two Independent Witnesses.</li>
                    <li>&bull; Section 211: Executor as Legal Representative of the Estate.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <strong className="text-xs sm:text-sm font-bold text-[#172228] block mb-1">
                    Information Technology Act, 2000
                  </strong>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>&bull; Section 43: Penalty for Unauthorized Access to Computer Systems.</li>
                    <li>&bull; Section 66: Computer-Related Offenses &amp; Password Misuse.</li>
                    <li>&bull; Digital Executor Clause: Authorizes Legal Access to Electronics.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <strong className="text-xs sm:text-sm font-bold text-[#172228] block mb-1">
                    Precedents &amp; Regulatory Framework
                  </strong>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>&bull; Supreme Court IMAI Judgment (2020): Crypto is Legal Property.</li>
                    <li>&bull; FIU-IND VASP Registration: KYC &amp; AML Compliance under PMLA.</li>
                    <li>&bull; Registration Act Section 18(e): Optional Registration of Wills.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Bottom Conversion Action Bar */}
            <div className="rounded-2xl bg-gradient-to-r from-[#172228] to-[#253741] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-extrabold">
                  Ready to Protect Your Crypto &amp; Digital Estate?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Draft a legally valid Section 63 Will with comprehensive digital asset clauses in 15 minutes, or consult our senior advocates for complex multi-sig crypto estate structuring.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                >
                  <span>Draft Your Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/tools/will-checklist"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20"
                >
                  <span>Interactive Will Checklist</span>
                </Link>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY AUTHOR / TRUST / CTA CARDS
              ===================================================================== */}
          <aside className="sticky top-6 space-y-5">
            {/* Card 1: Author Bio Card */}
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#172228] text-white font-extrabold flex items-center justify-center text-sm">
                  AAM
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#172228]">
                    Advocate Anuj Anand Malik
                  </h4>
                  <p className="text-[11px] text-[#C65378] font-bold">
                    Senior Succession &amp; Trust Counsel
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Advocate specializing in testamentary succession, digital estate governance, and cross-border crypto inheritance under the Indian Succession Act and IT Act.
              </p>
              <div className="pt-2 border-t border-[#172228]/5 flex items-center justify-between text-[11px] text-[#55636D]">
                <span>WillDrafting.in</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Bar Verified
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* Card 2: Emergency CTA Card (Brand Navy Background) */}
            <div className="hidden lg:block rounded-2xl bg-[#172228] text-white p-5 shadow-md space-y-3 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
                <Lock className="w-3 h-3" />
                <span>CONFIDENTIAL ESTATE SHIELD</span>
              </div>
              <h3 className="text-base font-extrabold leading-snug">
                Own Crypto or Online Assets?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Without a Will and access memorandum, private keys and accounts become permanently lost to your family forever.
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                <span>Protect Your Assets Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <Lock className="w-3 h-3" />
                <span>Zero Stamp Duty &bull; 100% Legal</span>
              </div>
            </div>

            {/* Card 3: Digital Asset Protection Checklist */}
            <div className="hidden lg:block rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#172228] mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Why Plan Digital Assets Early</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Permanent Loss:</strong> Hardware wallets and private keys cannot be recovered by courts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Prevent Account Deletion:</strong> Protect family photos from Google &amp; Apple auto-deletion.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tax Clarity for Heirs:</strong> Secure the Section 56(2)(x) 100% tax-free inheritance shield.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Peace of Mind:</strong> Ensure your online life work and savings pass seamlessly to loved ones.</span>
                </li>
              </ul>
            </div>

            {/* Card 4: Related Guides List */}
            <div className="hidden lg:block rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#172228] mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span>Related Estate Guides</span>
              </h4>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/will-checklist"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all font-semibold text-[#172228]"
                >
                  Interactive Will Checklist
                  <span className="block text-[10px] text-[#55636D] font-normal mt-0.5">
                    15 asset classes &amp; document preparation tool &rarr;
                  </span>
                </Link>
                <Link
                  href="/blogs/notarized-will-vs-registered-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all font-semibold text-[#172228]"
                >
                  Is a Notarized Will Valid in India?
                  <span className="block text-[10px] text-[#55636D] font-normal mt-0.5">
                    Section 63 witness rules vs SRO registration &rarr;
                  </span>
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all font-semibold text-[#172228]"
                >
                  Free Will Format India
                  <span className="block text-[10px] text-[#55636D] font-normal mt-0.5">
                    Clause-annotated printable template &rarr;
                  </span>
                </Link>
                <Link
                  href="/pricing"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all font-semibold text-[#172228]"
                >
                  Transparent Will Drafting Pricing
                  <span className="block text-[10px] text-[#55636D] font-normal mt-0.5">
                    Instant DIY Will &amp; Senior Advocate Review &rarr;
                  </span>
                </Link>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Free Indian Will Format
                </Link>
                <Link
                  href="/tools/will-checklist"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Preparation Checklist
                </Link>
                <Link
                  href="/blogs/will-vs-family-trust-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will vs Family Trust
                </Link>
                <Link
                  href="/blogs/notarized-will-vs-registered-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Notarized vs Registered Will
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
