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
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Lock,
  PhoneCall,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Info,
  Copy,
  CheckCheck,
  TrendingUp,
  FileText,
  Globe,
  Coins,
  Cpu,
  Key,
  Database,
  Layers,
  ShieldAlert,
  Server,
  Mail,
  Fingerprint,
  Wallet,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "digital-legacy-crisis", label: "1. Digital Asset Dilemma: The Public Probate Risk" },
  { id: "two-part-solution-framework", label: "2. Two-Part Solution: Public Will vs Sealed Memorandum" },
  { id: "interactive-inventory-tool", label: "3. Interactive Digital Asset Inventory Generator" },
  { id: "statutory-it-act-compliance", label: "4. Indian Legal Framework: IT Act & Section 115BBH Tax" },
  { id: "digital-executor-powers", label: "5. Appointing a Digital Executor: Scope & Authorities" },
  { id: "crypto-hardware-cold-storage", label: "6. Securing Hardware Wallets & Seed Phrases Offline" },
  { id: "exchange-web2-legacy-protocols", label: "7. Centralized Exchanges, Domains & Social Accounts" },
  { id: "comparison-table-architecture", label: "8. Comparison: Will Clause vs Sealed Memo vs Intestacy" },
  { id: "step-by-step-setup-sop", label: "9. Step-by-Step SOP: Setting Up Your Digital Estate" },
  { id: "practical-security-scenarios", label: "10. Real Case Scenarios: Seed Leaks & Locked Wallets" },
  { id: "copy-paste-will-templates", label: "11. Copy-Paste Digital Will Clauses & Sealed Inventory" },
  { id: "institutional-profile", label: "12. Institutional Legal Backing: AMA Legal Solutions" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Crypto Will Formats" },
  { id: "statutory-citations", label: "14. Statutory Citations & Official Tech Legacy Portals" },
];

const FAQS = [
  {
    q: "Can I mention my crypto wallet seed phrases or passwords directly in my Will?",
    a: "No. You must never write hardware wallet recovery seed phrases, private keys, or account passwords directly in a registered Will. Under Section 294 of the Indian Succession Act, 1925, a probated Will becomes a public judicial document open for inspection by court staff, adverse litigants, and the general public. Anyone inspecting the probate records could drain your cryptocurrency in seconds.",
  },
  {
    q: "What is the recommended two-part format for bequeathing cryptocurrency in India?",
    a: "The gold-standard legal architecture consists of: (1) A formal Public Will Clause bequeathing ownership of the underlying digital assets, tokens, hardware devices, and domains to designated beneficiaries and appointing a Digital Executor, and (2) A confidential, offline Sealed Digital Access Memorandum stored in a secure bank safe deposit locker or steel vault containing technical access coordinates, hardware PIN locations, and password recovery instructions.",
  },
  {
    q: "Is cryptocurrency inheritance taxable under Section 115BBH in India?",
    a: "No. Under Section 56(2)(x) of the Income Tax Act, 1961, any property received under a Will or by way of inheritance is completely exempt from income tax in the hands of the legal heir. While Section 115BBH levies a flat 30% tax plus surcharge and cess on the transfer of Virtual Digital Assets (VDAs), inheritance is excluded from taxable transfer. However, when the beneficiary subsequently sells or exchanges the inherited crypto for fiat currency, the 30% tax applies on the net gains.",
  },
  {
    q: "What powers does a Digital Executor have under the Information Technology Act, 2000?",
    a: "A Digital Executor is legally authorized in the Will to act as the deceased's authorized agent under the Information Technology Act, 2000 and Indian Succession Act, 1925. This explicit authorization shields the executor from criminal penalties for unauthorized access or hacking under Sections 43 and 66 of the IT Act when accessing devices, communicating with service providers, and executing custodial transfers.",
  },
  {
    q: "How do Indian exchanges like CoinDCX and WazirX handle the death of an account holder?",
    a: "Indian FIU-registered exchanges require: (1) Certified copy of the death certificate, (2) Probated Will or Succession Certificate or Legal Heir Certificate issued by the competent revenue authority or civil court, (3) KYC documents and PAN of the claiming legal heir, and (4) An indemnity bond executed by all legal heirs with two solvent sureties. The account is frozen upon notification, and assets are transferred only to verified beneficiary bank accounts.",
  },
  {
    q: "What happens to self-custody cold wallets (Ledger, Trezor) if no seed phrase is left behind?",
    a: "If a testator dies without leaving behind their 12 or 24-word BIP-39 recovery seed phrase or PIN, the cryptocurrency stored on a non-custodial hardware wallet is mathematically unrecoverable. Neither High Courts, succession certificates, nor device manufacturers like Ledger or SatoshiLabs have backdoors or root access to decrypt private keys on the blockchain.",
  },
  {
    q: "Can I transfer domain names, SaaS accounts, and social media through a Will?",
    a: "Yes. Domain names registered on ICANN-accredited registrars (such as GoDaddy or Namecheap) and proprietary intellectual property or software codes are recognized as intangible personal property. The Will should authorize the Digital Executor to request registry transfer. For accounts with Google and Apple, testators should configure Inactive Account Manager and Apple Legacy Contacts prior to demise.",
  },
  {
    q: "Is a separate Sealed Digital Access Memorandum legally binding in an Indian court?",
    a: "The Sealed Memorandum serves as an operational guidance letter to your Executor rather than a testamentary instrument that disposes of property title. The legal bequest of title is executed via the registered Will itself. Because the memorandum provides logistical instructions to the fiduciary rather than alienating property, it does not require probate or public filing, preserving complete technical confidentiality.",
  },
];

export default function DigitalAssetsCryptoScheduleClient() {
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

  const [activeId, setActiveId] = useState<string>("digital-legacy-crisis");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Copy States
  const [copiedPublicClause, setCopiedPublicClause] = useState<boolean>(false);
  const [copiedSealedMemo, setCopiedSealedMemo] = useState<boolean>(false);
  const [copiedExecutorAuth, setCopiedExecutorAuth] = useState<boolean>(false);
  const [copiedHardwareReceipt, setCopiedHardwareReceipt] = useState<boolean>(false);
  const [copiedTailoredSchedule, setCopiedTailoredSchedule] = useState<boolean>(false);

  // Interactive Digital Asset Inventory Generator State
  const [selectedAssets, setSelectedAssets] = useState<{ [key: string]: boolean }>({
    hardware_wallets: true,
    indian_exchanges: true,
    foreign_exchanges: false,
    defi_wallets: false,
    cloud_passwords: true,
    domain_servers: false,
  });

  const [storageMethod, setStorageMethod] = useState<string>("bank_locker");
  const [executorType, setExecutorType] = useState<string>("dedicated_digital");
  const [portfolioTier, setPortfolioTier] = useState<string>("10l_50l");
  const [seedStorageMistake, setSeedStorageMistake] = useState<boolean>(false);

  const toggleAsset = (key: string) => {
    setSelectedAssets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // Copy helper
  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 3000);
  };

  // Clauses Text
  const publicClauseText = `// PART 1: PUBLIC WILL CLAUSE FOR DIGITAL ASSETS & CRYPTOCURRENCY
// (To be inserted into the main Registered Will under Indian Succession Act, 1925)

"BEQUEST OF DIGITAL ASSETS, VIRTUAL DIGITAL ASSETS (VDA) & DIGITAL DEVICES:

1. DEFINITION & SCOPE: I hereby declare that my 'Digital Estate' shall comprise all my right, title, interest, and beneficial ownership in all forms of Virtual Digital Assets as defined under Section 2(47A) of the Income Tax Act, 1961, including but not limited to cryptocurrencies (Bitcoin, Ethereum, and any tokens/altcoins), non-fungible tokens (NFTs), balances on Indian and foreign centralized exchanges, decentralized liquidity pools, non-custodial cryptographic wallets, as well as domain names, registered web properties, cloud infrastructure accounts, software repositories, email accounts, and electronic hardware devices (laptops, mobile phones, and hardware security keys/cold wallets).

2. APPOINTMENT OF SPECIALIZED DIGITAL EXECUTOR:
I hereby specifically appoint [Full Name of Digital Executor], residing at [Residential Address], PAN: [PAN Number], Email: [Email], as my specialized 'Digital Executor' to manage, administer, retrieve, protect, and distribute my Digital Estate. In the event [Digital Executor Name] is unable or unwilling to act, I appoint [Alternate Digital Executor Name] as alternate Digital Executor.

3. STATUTORY AUTHORIZATION UNDER IT ACT, 2000:
I expressly grant my Digital Executor full legal authority to act as my authorized agent within the meaning of the Information Technology Act, 2000 (including Sections 43, 66, and 85 thereof). My Digital Executor is expressly permitted and authorized to access, control, reset, communicate with, and demand custody transfer from any internet service provider, domain registrar, email host, cloud service provider, and FIU-registered or international cryptocurrency exchange on my behalf.

4. SEPARATE CONFIDENTIAL SEALED DIGITAL ACCESS MEMORANDUM:
For reasons of technical security, private key preservation, and prevention of unauthorized access pursuant to Section 294 of the Indian Succession Act, 1925, I have deliberately refrained from stating my cryptographic recovery seed phrases, passwords, two-factor authentication recovery codes, and private keys in this public testamentary instrument. Instead, I have documented the precise technical instructions in a separate document entitled 'CONFIDENTIAL SEALED DIGITAL ACCESS MEMORANDUM' dated [Date of Memo], which is kept sealed in my Safe Deposit Locker No. [Locker Number] at [Bank Name, Branch]. I direct my Digital Executor to open said sealed memorandum and follow its logistical instructions strictly for the benefit of the beneficiaries named herein.

5. DISTRIBUTION OF VIRTUAL DIGITAL ASSETS:
(a) I bequeath all my Bitcoin, Ethereum, and cold wallet crypto holdings absolutely to my [Relationship], [Beneficiary 1 Name], PAN: [PAN].
(b) I bequeath all my exchange balances held on CoinDCX / WazirX / Binance to my [Relationship], [Beneficiary 2 Name], PAN: [PAN].
(c) I direct that all domain names and intellectual property code repositories shall vest in [Beneficiary 3 Name].

6. TAX COMPLIANCE DIRECTIVE:
All testamentary transfers hereunder constitute exempt receipts under Section 56(2)(x) of the Income Tax Act, 1961. My Digital Executor and beneficiaries are instructed to maintain accurate chain-of-title records for capital gains computation upon any subsequent sale or transfer under Section 115BBH."`;

  const sealedMemoText = `// PART 2: CONFIDENTIAL SEALED DIGITAL ACCESS MEMORANDUM
// (STRICTLY OFFLINE DOCUMENT - STORE IN BANK LOCKER OR TAMPER-EVIDENT VAULT)
// (NEVER FILE THIS DOCUMENT IN PROBATE COURT OR SUB-REGISTRAR OFFICE)

"CONFIDENTIAL MEMORANDUM OF DIGITAL ASSET ACCESS & SECURITY PROTOCOLS

To: [Full Name of Appointed Digital Executor]
From: [Full Name of Testator]
Date of Execution: [DD/MM/YYYY]
Permanent Address: [Address]

CONFIDENTIALITY NOTICE: This document is executed strictly for your eyes only pursuant to Clause [X] of my Last Will and Testament dated [Date of Will]. It contains highly sensitive cryptographic credentials and hardware recovery procedures. Do not photocopy, photograph, upload to cloud storage, or submit to any court or third party.

1. HARDWARE WALLETS & NON-CUSTODIAL RECOVERY SEEDS:
- Device Model: Ledger Nano X / Trezor Model T / Keystone Pro
- Physical Device Location: [e.g. Master Bedroom Wall Safe Behind Painting / Godrej Steel Locker]
- PIN to Unlock Device: [e.g. 8-digit PIN stored in Hint Format: Year of Graduation + First Car Model Digits]
- BIP-39 Recovery Seed Phrase (12/24 Words):
  * Storage Format: Engraved on Keystone Stainless Steel Plate / Cryptosteel Capsule
  * Exact Physical Location: [e.g. Bank Safe Deposit Locker No. 412, SBI Main Branch, Connaught Place, New Delhi]
  * Secondary Passphrase (25th Word / Plausible Deniability): [Stored separately with Legal Counsel AMA Legal Solutions]

2. CENTRALIZED CRYPTO EXCHANGES (FIU-REGISTERED & GLOBAL):
- Exchange 1: CoinDCX
  * Registered Email: [user@gmail.com]
  * Registered Mobile Number: [SIM Card Location: In Testator's Primary Phone]
  * 2FA Authentication Method: [YubiKey 5C NFC stored in desk drawer / Google Authenticator backup seed]
- Exchange 2: Binance International
  * Account UID: [12345678]
  * Anti-Phishing Code: [Word]
  * Passkey / Hardware Key Access: [YubiKey NFC]

3. MASTER PASSWORD MANAGER & CLOUD VAULT:
- Password Manager: [Bitwarden / 1Password / Apple Keychain]
- Master Password Clue / Location: [Stored inside sealed envelope with CA/Advocate]
- Emergency Access Contact Feature: [Enabled for Digital Executor's email with 7-day waiting period]

4. PRIMARY EMAIL & RECOVERY CHANNELS:
- Primary Google Account: [user@gmail.com]
  * Inactive Account Manager: Configured to notify Digital Executor after 90 days of inactivity
- Apple ID: [user@icloud.com]
  * Apple Legacy Contact Access Key: [Printout of Apple Legacy Key attached hereto]

5. DOMAIN NAMES & WEB INFRASTRUCTURE:
- Registrar: GoDaddy / Cloudflare
- Domains: [company.in, project.crypto, personalblog.org]
- Auto-Renew Active: [Yes / Linked to HDFC Credit Card]
- Transfer Auth-Code Protocol: [Digital Executor instructed to initiate transfer to Beneficiary within 60 days]

Signed and Sealed in Duplicate:
Testator Signature: _______________________
Date: _____________________________________
Witness to Physical Sealing (Non-Beneficiary): _______________________"`;

  const executorAuthText = `// PART 3: SPECIFIC DIGITAL EXECUTOR AUTHORIZATION LETTER
// (To be presented to Exchanges, Telecom Providers & Domain Registrars alongside Death Certificate)

"TO WHOMSOEVER IT MAY CONCERN / SERVICE PROVIDER LEGAL COMPLIANCE DESK

SUBJECT: FORMAL AUTHORIZATION UNDER INFORMATION TECHNOLOGY ACT, 2000 AND INDIAN SUCCESSION ACT, 1925 FOR ADMINISTRATION OF DECEASED'S DIGITAL ACCOUNTS

I, [Full Name of Testator], an Indian Citizen holding PAN [PAN] and Aadhaar [Aadhaar], residing at [Address], do hereby execute this formal Letter of Authority:

1. APPOINTMENT: Under my Last Will and Testament dated [Date], I have formally nominated and appointed [Full Name of Digital Executor], PAN [PAN], residing at [Address], as my sole Digital Executor.

2. SPECIFIC POWERS UNDER IT ACT, 2000:
In accordance with the Information Technology Act, 2000 (including Section 10A on electronic contracts and Section 43/66 safe-harbor), I explicitly authorize my Digital Executor to:
(a) Communicate with, issue demands to, and receive account statements from all cryptocurrency exchanges, domain registrars, cloud storage providers, and telecom service providers registered in my name.
(b) Request the immediate freezing, archival, or transmission of my account balances, tokens, and digital domains to the rightful beneficiaries.
(c) Request SIM card transfer or re-issuance from telecom providers (Airtel, Jio, Vi) to facilitate receipt of transmission SMS One-Time Passwords (OTPs).
(d) Download and preserve electronic records, correspondence, and financial logs for estate tax filings and compliance under the Bharatiya Sakshya Adhiniyam, 2023.

3. INDEMNIFICATION OF SERVICE PROVIDERS:
Any service provider, bank, or digital asset exchange honoring this authorization and transferring custody of my digital records or assets to my Digital Executor shall be fully indemnified and held harmless from any claim, liability, or damage arising from such compliance.

IN WITNESS WHEREOF, I have executed this Authority Letter at [City] on this [Day] day of [Month], [Year].

Testator Signature: ___________________________
Attesting Witness 1: __________________________
Attesting Witness 2: __________________________"`;

  const hardwareReceiptText = `// PART 4: OFFLINE HARDWARE WALLET & SEED CUSTODY RECEIPT
// (Documenting chain of custody between Testator, Locker Custodian, and Digital Executor)

"CUSTODY & DEPOSIT RECEIPT: COLD STORAGE RECOVERY SEED CAPSULE

1. PARTICULARS OF ENTRUSTED ASSET:
- Asset Type: Stainless Steel / Titanium 24-Word Cryptographic Seed Capsule
- Hardware Device: Ledger Nano X Serial No. [SN-XXXXXX]
- Tamper-Evident Enclosure: Numbered Security Bag Serial No. [SEAL-987654]

2. DEPOSIT VERIFICATION:
I, [Name of Testator], have on this [Date] deposited the above-described sealed security bag containing my cryptographic private key recovery apparatus in Safe Deposit Locker No. [Locker No.], at [Bank Name], [Branch Address].

3. ACCESS INSTRUCTIONS UPON DEMISE:
The Bank Branch Manager and Joint Locker Nominee are hereby instructed that upon submission of:
(a) My original Death Certificate issued by the Municipal Corporation;
(b) Certified copy of my probated Will dated [Date];
(c) Positive identification and biometric verification of my Digital Executor [Name of Digital Executor];
Access to the specific security bag [SEAL-987654] shall be delivered exclusively to the said Digital Executor.

Testator Signature: __________________________
Acknowledged by Bank / Locker Custodian: __________________________"`;

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Coins className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • IT ACT, 2000 • SECTION 115BBH VDA</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Digital Asset &amp; Crypto Will Schedule Format India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Complete two-part legal framework: <strong>Public Will Clause</strong> bequeathing
            cryptocurrency, domains, and tokens plus a <strong>Confidential Sealed Digital Access
            Memorandum</strong> to preserve seed phrases and 2FA recovery codes without exposing them in
            public probate court.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-inventory-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Cpu className="w-4 h-4" />
              <span>Generate Digital Asset Schedule</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 2(47A)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                VIRTUAL DIGITAL ASSETS (VDA)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2-Part Architecture</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PUBLIC WILL + SEALED MEMORANDUM
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% Inheritance Tax</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                EXEMPT U/S 56(2)(x) UPON WILL
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">IT Act 2000</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SEC 43 &amp; 66 SAFE HARBOR
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
                Governed under Indian Succession Act, 1925 (Sections 2(h), 59, 63, 211, 213, 294),
                Information Technology Act, 2000 (Sections 43, 66, 85), Income Tax Act, 1961
                (Sections 2(47A), 56(2)(x), 115BBH), and Bharatiya Sakshya Adhiniyam, 2023.
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
                <span>EXECUTIVE BRIEF: CRYPTO &amp; DIGITAL ASSETS SUCCESSION</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Public Probate Hazard:</strong> Under Section 294 of the Indian
                    Succession Act, probated Wills become public court records. Writing seed phrases, PINs,
                    or passwords in a registered Will exposes your entire cryptographic wealth to public
                    theft.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Two-Part Architecture:</strong> The only legally sound and technically secure
                    solution is executing a <em>Public Will Clause</em> (bequeathing title, tokens, and
                    hardware devices) alongside a separate <em>Confidential Sealed Digital Access
                    Memorandum</em> kept offline in a bank vault.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Specialized Digital Executor:</strong> Designating a tech-competent Digital
                    Executor protects your estate from Sections 43 &amp; 66 of the Information Technology
                    Act (unauthorized computer access penalties) while enabling interaction with exchanges
                    and registrars.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tax Exemption on Inheritance:</strong> Bequests of Virtual Digital Assets (VDAs)
                    under a Will are 100% exempt from income tax under Section 56(2)(x). The flat 30% tax
                    under Section 115BBH applies only when the heir subsequently liquidates into fiat.
                  </span>
                </li>
              </ul>
            </div>

            {/* VISUAL SHOWCASE: EDITORIAL OG BANNER IMAGE */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>Verified Legal Template Architecture</span>
                </span>
                <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
                  Two-Part Will &amp; Offline Seed Protocol
                </span>
              </div>
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                <Image
                  src="/images/digital-assets-crypto-schedule-will-format-og.jpg"
                  alt="Digital Assets and Crypto Schedule Will Format India Guide and Inventory Template"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 65vw"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs text-slate-600">
                <p className="italic">
                  Figure 1: Authentic testamentary digital asset protocol combining formal public Will clauses
                  with an offline sealed access memorandum.
                </p>
                <a
                  href="#copy-paste-will-templates"
                  className="font-bold text-[#C65378] hover:text-[#a33b5c] inline-flex items-center gap-1 shrink-0"
                >
                  <span>Jump to Templates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* SECTION 1: DIGITAL LEGACY CRISIS */}
            <section id="digital-legacy-crisis" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>ESTATE SECURITY CRISIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Digital Asset Dilemma: The Public Probate Risk
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  As Indian investors, startup founders, and tech professionals accumulate significant wealth
                  in self-custody cryptocurrencies, centralized exchange portfolios, domain portfolios, and
                  proprietary digital infrastructure, estate planning faces an unprecedented technological
                  challenge. Traditional Will drafting was created for tangible immovable real estate and
                  physical gold; it was never designed for decentralized, cryptographic, bearer assets.
                </p>
                <p>
                  When a testator bequeaths real estate, the property description (khasra number, municipal
                  door number, registered deed volume) is published in local newspapers and judicial probate
                  filings without compromising title. By contrast, if a testator writes their 12 or 24-word
                  BIP-39 seed phrase, Ledger PIN, or master password inside their registered Will, they have
                  guaranteed the total loss of their assets.
                </p>
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs sm:text-sm space-y-2">
                  <div className="font-extrabold flex items-center gap-2 text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Statutory Trap: Section 294 of the Indian Succession Act, 1925</span>
                  </div>
                  <p className="leading-relaxed">
                    Under Section 294 of the Indian Succession Act, when a Will is filed for Probate or
                    Letters of Administration in the High Court or District Court, the original Will is
                    deposited in the public court registry. Any person, adverse litigant, or court clerk has
                    the statutory right to inspect, examine, and obtain certified photocopies of the probated
                    instrument. A seed phrase recorded in a public Will becomes public domain the moment
                    probate is instituted.
                  </p>
                </div>
                <p>
                  Conversely, if you leave <em>nothing</em> in writing, the decentralized nature of
                  blockchain ensures your wealth is permanently destroyed. Non-custodial hardware wallets
                  (Ledger Nano, Trezor, Keystone) have zero customer service and zero judicial backdoors.
                  Without private keys, neither a Supreme Court decree nor a Legal Heir Certificate can compel
                  the Ethereum or Bitcoin blockchain to transfer coins.
                </p>
              </div>
            </section>

            {/* SECTION 2: TWO-PART SOLUTION FRAMEWORK */}
            <section id="two-part-solution-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>ARCHITECTURAL RESOLUTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Two-Part Solution: Public Will vs Sealed Memorandum
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To reconcile the strict legal requirement of testamentary clarity with the absolute
                  security mandate of cryptographic custody, estate planning advocates at AMA Legal Solutions
                  utilize a specialized <strong>Two-Part Digital Legacy Framework</strong>:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Part 1 Box */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                      <FileText className="w-4 h-4 text-[#C65378]" />
                      <span>PART 1: The Formal Public Will Clause</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Bequeaths legal ownership and title of digital assets to specific heirs.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Formally appoints and empowers a specialized <strong>Digital Executor</strong>.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Grants statutory authorization under the Information Technology Act, 2000.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Contains ZERO passwords, ZERO seed phrases, and ZERO PINs.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Part 2 Box */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                      <Lock className="w-4 h-4 text-[#5F7E75]" />
                      <span>PART 2: Sealed Digital Access Memorandum</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Offline document stored in a bank safe deposit locker or steel vault.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Contains physical hardware locations, stainless steel plate coordinates.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Details 2FA recovery mechanisms, YubiKey backup keys, password managers.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Never registered at the SRO and never submitted in probate court.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600">
                  Because Part 1 transfers title while Part 2 merely provides operational guidance to the
                  fiduciary, this separation is fully recognized under Indian testamentary jurisprudence.
                </p>
              </div>
            </section>

            {/* SECTION 3: INTERACTIVE INVENTORY GENERATOR */}
            <section id="interactive-inventory-tool" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Cpu className="w-4 h-4" />
                <span>INTERACTIVE DIGITAL ESTATE CONFIGURATOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Interactive Digital Asset Inventory Generator
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your digital asset holdings, evaluate your probate vulnerability score, and generate a
                tailored, lawyer-vetted inventory schedule for your Indian estate plan.
              </p>

              {/* Tool Card Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* 1. Asset Category Checkboxes */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Step 1: Select Your Digital Asset Classes</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      {
                        key: "hardware_wallets",
                        label: "Cold Wallets (Ledger / Trezor)",
                        desc: "Non-custodial bearer private keys & BIP-39 seeds",
                        icon: Wallet,
                      },
                      {
                        key: "indian_exchanges",
                        label: "Indian Exchanges (CoinDCX / WazirX)",
                        desc: "FIU-IND compliant custodial INR balances",
                        icon: Landmark,
                      },
                      {
                        key: "foreign_exchanges",
                        label: "Global Exchanges (Binance / Coinbase)",
                        desc: "Foreign offshore accounts requiring LOA / cross-border claim",
                        icon: Globe,
                      },
                      {
                        key: "defi_wallets",
                        label: "Web3 DeFi Wallets (MetaMask / Phantom)",
                        desc: "Staking pools, DEX liquidity, ENS domains & NFTs",
                        icon: Coins,
                      },
                      {
                        key: "cloud_passwords",
                        label: "Password Vaults & Primary Email",
                        desc: "Bitwarden, 1Password, Google Inactive Account Manager",
                        icon: Key,
                      },
                      {
                        key: "domain_servers",
                        label: "Tech Domains, Cloud & Code Repos",
                        desc: "GoDaddy, AWS, GitHub, intellectual property rights",
                        icon: Server,
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isChecked = selectedAssets[item.key];
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => toggleAsset(item.key)}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                            isChecked
                              ? "bg-rose-50/70 border-[#C65378] text-slate-900 shadow-2xs"
                              : "bg-slate-50/70 border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked ? "bg-[#C65378] text-white" : "border border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold leading-snug flex items-center gap-1.5">
                              <Icon className="w-3.5 h-3.5 text-[#C65378]" />
                              <span>{item.label}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 leading-tight">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Key Controls Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                  {/* Portfolio Tier */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Portfolio Valuation Tier
                    </label>
                    <select
                      value={portfolioTier}
                      onChange={(e) => setPortfolioTier(e.target.value)}
                      aria-label="Portfolio Valuation Tier"
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800 focus:outline-hidden focus:border-[#C65378]"
                    >
                      <option value="under_10l">Under ₹10 Lakhs (Micro/Retail)</option>
                      <option value="10l_50l">₹10 Lakhs to ₹50 Lakhs (Moderate)</option>
                      <option value="50l_2cr">₹50 Lakhs to ₹2 Crores (High Net Worth)</option>
                      <option value="above_2cr">Above ₹2 Crores (Ultra HNI / Founder)</option>
                    </select>
                  </div>

                  {/* Seed Phrase Storage Method */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Seed Phrase Custody Plan
                    </label>
                    <select
                      value={storageMethod}
                      onChange={(e) => setStorageMethod(e.target.value)}
                      aria-label="Seed Phrase Custody Plan"
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800 focus:outline-hidden focus:border-[#C65378]"
                    >
                      <option value="bank_locker">Bank Safe Deposit Locker (Steel Capsule)</option>
                      <option value="shamir_secret">Shamir Secret Sharing (3-of-5 Shards)</option>
                      <option value="multisig">Multi-Signature Smart Contract (2-of-3 Keys)</option>
                      <option value="home_safe">Fireproof Home Wall Safe</option>
                    </select>
                  </div>

                  {/* Executor Appointment */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Executor Structure
                    </label>
                    <select
                      value={executorType}
                      onChange={(e) => setExecutorType(e.target.value)}
                      aria-label="Executor Structure"
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800 focus:outline-hidden focus:border-[#C65378]"
                    >
                      <option value="dedicated_digital">Dedicated Digital Executor (Tech-Savvy)</option>
                      <option value="joint_fiduciary">Joint Executors (Family + Tech Advisor)</option>
                      <option value="general_only">General Will Executor Only</option>
                    </select>
                  </div>
                </div>

                {/* 3. Vulnerability Stress Test Toggle */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Fingerprint className="w-4 h-4 text-[#C65378]" />
                      <span>Security Stress Test: Where are you currently thinking of writing your keys?</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSeedStorageMistake(!seedStorageMistake)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        seedStorageMistake
                          ? "bg-rose-600 text-white"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}
                    >
                      {seedStorageMistake ? "Mistake Active: Written in Will" : "Test Common Mistake"}
                    </button>
                  </div>
                  {seedStorageMistake ? (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs space-y-1 animate-fadeIn">
                      <div className="font-extrabold flex items-center gap-1.5 text-red-700">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>CRITICAL VULNERABILITY DETECTED!</span>
                      </div>
                      <p className="leading-relaxed">
                        Under Section 294 of the Indian Succession Act, probated Wills are accessible to the
                        general public. Anyone inspecting the case record can photocopy your 24 words and drain
                        your entire wallet. <strong>Always keep credentials in Part 2 (Sealed Memorandum)!</strong>
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-600">
                      Click the button above to test what happens if you inadvertently record passwords or seed
                      phrases inside the public Will document.
                    </p>
                  )}
                </div>

                {/* 4. Real-time Summary Card & Custom Schedule Copy */}
                <div className="p-5 rounded-2xl bg-[#172228] text-white space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                        TAILORED SUCCESSION SCHEDULE PREVIEW
                      </div>
                      <div className="text-sm font-extrabold text-white">
                        Recommended Structure for Your Digital Assets
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Legally Valid Architecture</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-white/60 text-[10px] uppercase font-bold">Public Will Inclusions</div>
                      <div className="font-extrabold text-white mt-1">
                        {Object.values(selectedAssets).filter(Boolean).length} Asset Categories Bequeathed
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-white/60 text-[10px] uppercase font-bold">Custody Strategy</div>
                      <div className="font-extrabold text-white mt-1">
                        {storageMethod === "bank_locker"
                          ? "Bank Safe Deposit Locker"
                          : storageMethod === "shamir_secret"
                          ? "Shamir 3-of-5 Secret Sharing"
                          : storageMethod === "multisig"
                          ? "Multi-Sig Smart Contract"
                          : "Fireproof Wall Vault"}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-white/60 text-[10px] uppercase font-bold">Fiduciary Protection</div>
                      <div className="font-extrabold text-white mt-1">
                        {executorType === "dedicated_digital"
                          ? "IT Act Section 43/66 Immunity"
                          : "Joint Estate Representation"}
                      </div>
                    </div>
                  </div>

                  {/* Section 115BBH & Tax Advisory Note */}
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200 leading-relaxed space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-rose-300" />
                      <span>Tax Advisory: Section 56(2)(x) vs Section 115BBH</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Your beneficiaries inherit these digital assets with <strong>0% immediate tax</strong>.
                      However, if they subsequently sell or swap on exchanges, a flat 30% tax + 4% cess
                      applies on profits under Section 115BBH. Maintaining purchase invoices and transaction
                      hashes in your sealed file is mandatory to prove the cost of acquisition.
                    </p>
                    <div className="pt-1">
                      <Link
                        href="/tools/capital-gains-tax-calculator-inherited-property"
                        className="text-rose-300 hover:text-white underline font-bold inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>Calculate inherited capital gains tax with our interactive calculator</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `DIGITAL ASSET ESTATE INVENTORY CONFIGURATION:
Asset Classes: ${Object.keys(selectedAssets)
                            .filter((k) => selectedAssets[k])
                            .join(", ")}
Portfolio Tier: ${portfolioTier}
Seed Storage: ${storageMethod}
Executor Appointment: ${executorType}
Statutory Baseline: Indian Succession Act 1925, IT Act 2000, Income Tax Act Sec 115BBH & 56(2)(x).`,
                          setCopiedTailoredSchedule
                        )
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs transition-colors shadow-sm"
                    >
                      {copiedTailoredSchedule ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-white" />
                          <span>Configuration Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-white" />
                          <span>Copy Custom Inventory Summary</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: INDIAN LEGAL FRAMEWORK */}
            <section id="statutory-it-act-compliance" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY ANALYSIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Indian Legal Framework: IT Act &amp; Section 115BBH Tax
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Estate planning for digital assets in India is governed by the intersection of four
                  statutory pillars: the <strong>Indian Succession Act, 1925</strong>, the <strong>Information
                  Technology Act, 2000</strong>, the <strong>Income Tax Act, 1961</strong>, and the newly
                  enacted <strong>Bharatiya Sakshya Adhiniyam, 2023 (BSA)</strong>.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#C65378]" />
                      <span>1. Indian Succession Act, 1925: Bequest of Intangible Personal Property</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 2(h) and Section 59 of the Act, every person of sound mind has the legal
                      capacity to dispose of all property belonging to them by Will, whether tangible or
                      intangible, real or personal. Virtual digital assets, domain licenses, and code
                      repositories constitute movable personal property under Indian law. Section 63 mandates
                      execution on plain paper in the presence of two attesting witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#C65378]" />
                      <span>2. Information Technology Act, 2000: Shielding the Digital Executor</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 43 and Section 66 of the IT Act, accessing a computer, system, or computer
                      network without the express permission of the owner or person in charge constitutes a
                      punishable civil and criminal offence. When a family member logs into a deceased
                      relative&rsquo;s laptop, Gmail, or exchange account using guessed credentials, they
                      technically breach the IT Act. Incorporating an explicit Digital Executor Clause in the
                      Will legally constitutes the executor as the deceased&rsquo;s &ldquo;authorized
                      agent&rdquo;, conferring legal immunity.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Coins className="w-4 h-4 text-[#C65378]" />
                      <span>3. Income Tax Act, 1961: Section 56(2)(x) Exemption &amp; Section 115BBH</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Finance Act 2022 inserted Section 2(47A) defining Virtual Digital Assets (VDAs) and
                      Section 115BBH charging a 30% flat tax on gains from VDA transfers. However, proviso to
                      Section 56(2)(x) specifically clarifies that any sum of money or property received under a
                      Will or by way of inheritance does not attract income tax. When the heir subsequently
                      liquidates the tokens into INR, Section 115BBH applies with zero deduction for expenses
                      (except the cost of acquisition under Section 49).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-[#C65378]" />
                      <span>4. Bharatiya Sakshya Adhiniyam, 2023: Electronic Record Admissibility</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Replacing the old Section 65B of the Indian Evidence Act, Section 61 and Section 63 of
                      the BSA govern the admissibility of electronic records in Indian courts. Transaction
                      hashes, digital wallet export logs, and exchange account statements submitted by the
                      Digital Executor must be certified in compliance with BSA requirements to be accepted as
                      conclusive proof of ownership.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: APPOINTING A DIGITAL EXECUTOR */}
            <section id="digital-executor-powers" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Key className="w-4 h-4" />
                <span>FIDUCIARY GOVERNANCE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Appointing a Digital Executor: Scope &amp; Authorities
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most general Will executors are elderly family members or lifelong friends who possess
                  impeccable moral standing but lack technical familiarity with cryptographic passphrases,
                  multi-sig signers, hardware cold wallets, or exchange death claim forms. Appointing a
                  dedicated <strong>Digital Executor</strong> bridges this technical chasm.
                </p>
                <p>
                  The Digital Executor operates as a co-executor or special limited fiduciary whose authority
                  is restricted to electronic records, digital devices, and cryptographic assets. Their legally
                  mandated responsibilities include:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Locating physical hardware devices (Ledger, Trezor, YubiKeys) upon demise.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Accessing the bank locker to retrieve the Sealed Digital Access Memorandum.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Liaising with Indian exchanges (CoinDCX, WazirX) for formal account transmission.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Transferring domains and code repositories to keep online commercial SaaS active.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: HARDWARE WALLETS & SEED PHRASES */}
            <section id="crypto-hardware-cold-storage" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Wallet className="w-4 h-4" />
                <span>CRYPTOGRAPHIC VAULTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Securing Hardware Wallets &amp; Seed Phrases Offline
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For non-custodial self-storage, private keys never touch the internet. The hardware wallet is
                  merely a signing device; the actual funds exist on the public blockchain, accessible only via
                  the 12 or 24-word BIP-39 mnemonic seed phrase.
                </p>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Best-Practice Physical Storage Protocol for Indian Testators</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#C65378]">•</span>
                      <span>
                        <strong>Stainless Steel Plates:</strong> Never write seed phrases on paper that can
                        degrade in monsoon humidity or perish in fire. Use stamped stainless steel or titanium
                        capsules (such as Cryptosteel, Keystone Tablet, or Ellipal).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#C65378]">•</span>
                      <span>
                        <strong>Bank Safe Deposit Locker:</strong> Deposit the steel plate in an RBI-regulated
                        bank locker with a joint operation mandate or clear locker nomination. The nominee is
                        instructed to deliver the capsule to the Digital Executor upon probate.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#C65378]">•</span>
                      <span>
                        <strong>25th Word (Passphrase Architecture):</strong> For advanced security, use BIP-39
                        optional passphrases. The 24 words can be stored in the bank locker, while the secret
                        25th word is entrusted to your estate advocate at AMA Legal Solutions. Both are needed
                        to reconstruct the master private key.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 7: CENTRALIZED EXCHANGES & WEB2 LEGACIES */}
            <section id="exchange-web2-legacy-protocols" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>EXCHANGES &amp; DOMAINS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Centralized Exchanges, Domains &amp; Social Accounts
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Unlike decentralized wallets, centralized crypto exchanges (FIU-registered entities like
                  CoinDCX, WazirX, CoinSwitch, or offshore entities like Binance) maintain custodial control of
                  user funds. Their Terms of Service explicitly forbid sharing account passwords. Logging into a
                  deceased person&rsquo;s exchange account can trigger automated fraud freezes and 2FA lockouts.
                </p>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-blue-600" />
                    <span>Indian Exchange Death Transmission Protocol</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To claim balances legally from an Indian exchange, the Digital Executor or legal heir must
                    submit: (1) Certified death certificate, (2) Probated Will or Court Succession
                    Certificate, (3) KYC documents of all legal heirs, and (4) Form 124 Indemnity Bond signed
                    by all heirs. The exchange liquidates or transmits the crypto balance into an authorized
                    beneficiary account.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] font-bold">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                      Google: Inactive Account Manager
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                      Apple: Legacy Contact Access Key
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                      GoDaddy/AWS: ICANN Registry Succession
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table-architecture" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL COMPARISON TABLE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparison: Will Clause vs Sealed Memo vs Intestacy
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                How different digital estate transmission approaches compare under Indian testamentary law:
              </p>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Feature</th>
                      <th className="py-3.5 px-4">Part 1: Public Will</th>
                      <th className="py-3.5 px-4">Part 2: Sealed Memo</th>
                      <th className="py-3.5 px-4">Direct Exchange Claim</th>
                      <th className="py-3.5 px-4">No Will (Intestacy)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Legal Ownership Transfer</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">100% Enforceable</td>
                      <td className="py-3 px-4 text-slate-500">Logistical Only</td>
                      <td className="py-3 px-4">Requires Court Order</td>
                      <td className="py-3 px-4 text-rose-700">Subject to Dispute</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Cryptographic Security</td>
                      <td className="py-3 px-4 text-emerald-700">High (No keys inside)</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Maximum (Offline)</td>
                      <td className="py-3 px-4">Exchange Dependent</td>
                      <td className="py-3 px-4 text-rose-700">100% Lost if Cold</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Public Court Exposure</td>
                      <td className="py-3 px-4">Public upon Probate</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Zero (Never Filed)</td>
                      <td className="py-3 px-4">N/A</td>
                      <td className="py-3 px-4">High Court LOA Needed</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">IT Act Section 43/66</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Express Safe Harbor</td>
                      <td className="py-3 px-4 text-slate-600">Access Coordinates</td>
                      <td className="py-3 px-4">TOS Compliance</td>
                      <td className="py-3 px-4 text-rose-700">Unauthorized Access Risk</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Hardware Cold Recovery</td>
                      <td className="py-3 px-4 text-slate-500">Establishes Heir Title</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Enables Recovery</td>
                      <td className="py-3 px-4 text-rose-700">Impossible (No Custody)</td>
                      <td className="py-3 px-4 text-rose-700">Permanently Buried</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Tax Compliance (115BBH)</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Exempt u/s 56(2)(x)</td>
                      <td className="py-3 px-4 text-slate-500">Provides Cost Basis</td>
                      <td className="py-3 px-4">TDS 1% under 194S</td>
                      <td className="py-3 px-4">Complex Legal Heir Filings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-setup-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PROCEDURAL PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Setting Up Your Digital Estate
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Audit & Catalog Your Complete Digital Footprint",
                    desc: "List every cold wallet, centralized exchange, Web3 wallet, domain registrar, and password vault. Record account UIDs and hardware device serial numbers without noting passwords.",
                  },
                  {
                    step: 2,
                    title: "Draft Part 1: Public Will Clause with Digital Executor",
                    desc: "Incorporate our lawyer-vetted digital bequest clause into your main registered Will. Appoint a tech-competent Digital Executor with express IT Act Section 43/66 legal authorization.",
                  },
                  {
                    step: 3,
                    title: "Engrave Mnemonic Seed Phrases on Metal Plates",
                    desc: "Transfer your 12 or 24-word BIP-39 recovery phrases onto stainless steel or titanium seed plates. Never leave private keys on paper, screenshot them, or save them in cloud notes.",
                  },
                  {
                    step: 4,
                    title: "Complete Part 2: Confidential Sealed Memorandum",
                    desc: "Fill in the confidential access memorandum detailing locker locations, PIN hints, and 2FA recovery backup codes. Sign and place inside a tamper-evident security envelope.",
                  },
                  {
                    step: 5,
                    title: "Deposit in an RBI-Regulated Bank Safe Deposit Locker",
                    desc: "Place the sealed security envelope and metal seed capsule inside a bank locker. Add your Digital Executor as authorized joint operator or register a formal locker nomination.",
                  },
                  {
                    step: 6,
                    title: "Configure Big Tech Legacy Contacts (Google & Apple)",
                    desc: "Set Google Inactive Account Manager to trigger after 90 days, delivering account access to your Digital Executor. Generate and print your Apple Legacy Contact Access Key.",
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

            {/* SECTION 10: PRACTICAL CASE SCENARIOS */}
            <section id="practical-case-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>REAL CASE STUDIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Real Case Scenarios: Seed Leaks &amp; Locked Wallets
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case Study 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Scenario A: Bengaluru Crypto Investor (₹6.2 Cr Saved)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Bengaluru
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Web3 developer held 18 BTC on a Ledger hardware wallet. Instead of writing the seed
                    phrase into his registered Will, he used our Two-Part architecture, bequeathing the
                    underlying Bitcoin in the Will and keeping the stainless steel seed capsule in an SBI bank
                    locker.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Probate Filing Exposure:</span>
                      <span className="font-bold text-emerald-700">0% (Zero seed in court)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tax Payable upon Will Transmission:</span>
                      <span className="font-bold text-emerald-700">₹0 (Exempt u/s 56(2)(x))</span>
                    </div>
                    <div className="pt-1 text-emerald-800 font-bold flex justify-between border-t border-slate-200">
                      <span>Result for Beneficiary:</span>
                      <span>100% Coins Retrieved Safely</span>
                    </div>
                  </div>
                </div>

                {/* Case Study 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Scenario B: Gurgaon SaaS Founder (Critical Domains Saved)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Gurugram
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A SaaS founder suddenly passed away without leaving root credentials to production AWS
                    clusters and proprietary .ai domains. Because he appointed a Digital Executor with express
                    IT Act powers in his Will, the executor presented court credentials to GoDaddy and AWS.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Domain Transfer Delay:</span>
                      <span className="font-bold text-slate-900">7 Days (Zero Downtime)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">IT Act Section 43 Risk:</span>
                      <span className="font-bold text-emerald-700">Complete Fiduciary Immunity</span>
                    </div>
                    <div className="pt-1 text-emerald-800 font-bold flex justify-between border-t border-slate-200">
                      <span>Business Value Preserved:</span>
                      <span>SaaS Operations Kept Alive</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: COPY-PASTE LEGAL TEMPLATES */}
            <section id="copy-paste-will-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>TESTAMENTARY CLAUSES &amp; MEMORANDUM</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Copy-Paste Digital Will Clauses &amp; Sealed Inventory
              </h2>

              {/* Template Box 1: Public Will Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Template 1: Formal Public Will Clause for Digital Assets &amp; Crypto
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(publicClauseText, setCopiedPublicClause)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedPublicClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Public Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-96">
                  {publicClauseText}
                </pre>
              </div>

              {/* Template Box 2: Confidential Sealed Memorandum */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Template 2: Confidential Sealed Digital Access Memorandum Form
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(sealedMemoText, setCopiedSealedMemo)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedSealedMemo ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Sealed Memo</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-96">
                  {sealedMemoText}
                </pre>
              </div>

              {/* Template Box 3: Specific Digital Executor Authorization Letter */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Template 3: Specific Digital Executor Authorization Letter (IT Act, 2000)
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(executorAuthText, setCopiedExecutorAuth)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedExecutorAuth ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Authority Letter</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-72">
                  {executorAuthText}
                </pre>
              </div>

              {/* Template Box 4: Hardware Custody Receipt */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Template 4: Offline Hardware Wallet &amp; Seed Custody Receipt
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(hardwareReceiptText, setCopiedHardwareReceipt)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedHardwareReceipt ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Custody Receipt</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-64">
                  {hardwareReceiptText}
                </pre>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Legal Backing: AMA Legal Solutions
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Digital Estate &amp; Succession Practice
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Testamentary Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s leading digital succession and estate planning platform,
                  powered by AMA Legal Solutions. Our multidisciplinary legal bench combines senior High
                  Court probate advocates, cyber-law litigators under the Information Technology Act, and
                  chartered tax counsel specializing in Section 115BBH VDA taxation. We have structured over
                  15,000 challenge-proof Wills for resident Indian tech founders, investors, and NRIs worldwide.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/tools/capital-gains-tax-calculator-inherited-property"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Inherited Capital Gains Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Requirement Checker</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>SRO Will Registration Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Crypto Will Formats
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Plain-English answers to critical legal and technical questions on bequeathing cryptocurrency,
                hardware wallets, and passwords in India:
              </p>

              {/* Accordion Stack */}
              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors hover:border-slate-300"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>PRIMARY LEGAL SOURCES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; Official Tech Legacy Portals
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700 shadow-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Governing Provisions of Indian Law &amp; Precedents:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Indian Succession Act, 1925 (Section 59 &amp; 63):</strong> Capacity to bequeath
                      intangible movable property by Will executed on plain paper.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925 (Section 294):</strong> Public deposition of probated
                      Wills in court registries prohibiting credential exposure.
                    </li>
                    <li>
                      <strong>Information Technology Act, 2000 (Section 43 &amp; 66):</strong> Penalties for
                      unauthorized access and statutory agent authorization framework.
                    </li>
                    <li>
                      <strong>Income Tax Act, 1961 (Section 2(47A) &amp; 115BBH):</strong> Virtual Digital Asset
                      definition and 30% tax on subsequent sale.
                    </li>
                    <li>
                      <strong>Income Tax Act, 1961 (Section 56(2)(x)):</strong> Absolute exemption of testamentary
                      bequests and inheritance from income tax.
                    </li>
                    <li>
                      <strong>Bharatiya Sakshya Adhiniyam, 2023 (Section 61 &amp; 63):</strong> Admissibility
                      requirements for electronic records and cryptographic ledgers.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://incometaxindia.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Income Tax Department Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://fiuindia.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>FIU-IND Registered VDA Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://myaccount.google.com/inactive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Google Inactive Account Manager</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Succession Calculators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Legal Templates Hub
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Legal Will Template
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Inherited Capital Gains Calculator
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Drafting Document Checklist
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Sub-Registrar Will Registration
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
                Specialist in Indian testamentary jurisprudence, IT Act electronic authorization, Section
                115BBH crypto estate planning, and cross-border digital asset transmission.
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
                  <span>PREVENT CRYPTO PERMANENT LOSS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Family from Lost Seed Phrases &amp; Probate Leaks
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Draft a legally binding, challenge-proof Will with our automated platform. Includes
                  dedicated digital executor clauses and private sealed legacy guidelines.
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
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Key className="w-3 h-3" />
                  <span>TECH FOUNDER &amp; CRYPTO DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Holding Multi-Crore Crypto or Tech Startup Equity?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our cyber-law litigators and estate planning counsel structure multi-sig key custody,
                  cross-border offshore exchange claims, and custom digital testamentary trusts.
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
                  Why Tech Investors Trust WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 294 Protection:</strong> Prevents public exposure of 24-word seed phrases.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>IT Act Authorization:</strong> Grants statutory agent immunity under Sections 43 &amp; 66.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Tax Exemption Verified:</strong> Confirms 0% inheritance tax under Section 56(2)(x).
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
          href="#interactive-inventory-tool"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Digital Inventory</span>
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
