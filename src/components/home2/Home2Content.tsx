"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import EmailOtpAuth from "@/components/auth/EmailOtpAuth";
import Folder from "@/components/Folder";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Eye,
  Lock,
  Languages,
  Clock,
  Scale,
  FileCheck2,
  Users,
  MessageSquareText,
  ChevronDown,
  Star,
  X,
  Check,
  Award,
  FileText,
} from "lucide-react";

/* =========================================================================
   DATA: ALL 12 HOMEPAGE SECTIONS DISTILLED WITH COMPLETE INFORMATION
   ========================================================================= */

const WHY_TRUST_FEATURES = [
  {
    icon: <CheckCircle2 size={18} strokeWidth={1.9} className="text-[#C65378]" />,
    title: "Register in Few Steps",
    description:
      "No complicated paperwork. Answer simple guided questions about your family and assets to complete your Will in minutes.",
  },
  {
    icon: <Languages size={18} strokeWidth={1.9} className="text-[#5F7E75]" />,
    title: "Available in Hindi & English",
    description:
      "Draft your Will in the language you feel most comfortable with. Easily switch between English and Hindi anytime.",
  },
  {
    icon: <Sparkles size={18} strokeWidth={1.9} className="text-[#C65378]" />,
    title: "Simple & Easy to Use",
    description:
      "A clean, friendly design created for everyone. Clear guidance at every step with no confusing legal words.",
  },
];

const CLAUSE_ITEMS = [
  {
    id: "clause-1",
    number: "1/",
    title: "Declaration of Sound Mind & Revocation",
    lawRef: "Indian Succession Jurisprudence",
    badge: "Testamentary Capacity",
    summary:
      "Clearly establishes your testamentary capacity and voluntary intention while expressly revoking previous Wills, codicils and testamentary dispositions to help avoid conflicting succession claims.",
    legalSnippet:
      "I hereby declare that I am of sound mind, memory, and understanding, and that I make this last Will voluntarily without any undue influence, coercion, or misrepresentation. I hereby revoke all prior Wills, codicils, and testamentary dispositions made by me at any time.",
    image: "/images/senior-couple.jpg",
    points: [
      "Explicit revocation of previous Wills & codicils.",
      "Records testamentary capacity & sound disposing mind.",
      "Helps address concerns regarding coercion or undue influence.",
    ],
  },
  {
    id: "clause-2",
    number: "2/",
    title: "Appointment of Executors & Administrators",
    lawRef: "Estate Administration Framework",
    badge: "Estate Administration",
    summary:
      "Appoints a primary and alternate executor to administer your estate, represent the estate where legally required, obtain probate where applicable, and distribute assets according to your Will.",
    legalSnippet:
      "I hereby appoint [PRIMARY EXECUTOR NAME], residing at [ADDRESS], to be the sole Executor of this my Will. In the event they predecease me or decline to act, I appoint [ALTERNATE EXECUTOR NAME] as alternate Executor with appropriate powers.",
    image: "/images/advocate.jpg",
    points: [
      "Primary and alternate executor provisions.",
      "Authority to administer estate assets.",
      "Powers concerning debts, expenses and distribution of assets.",
    ],
  },
  {
    id: "clause-3",
    number: "3/",
    title: "Specific Asset Bequests & Residual Estate",
    lawRef: "Statutory Bequests Framework",
    badge: "Asset Distribution",
    summary:
      "Clearly identifies how immovable property, bank accounts, investments, demat holdings, jewellery and other assets should pass to your beneficiaries, supported by a residuary clause for assets not specifically mentioned.",
    legalSnippet:
      "I bequeath my residential flat situated at [PROPERTY ADDRESS] unto [BENEFICIARY NAME] absolutely. All my bank deposits, mutual fund holdings, demat portfolios, and residual movable assets shall devolve upon [RESIDUARY BENEFICIARY] in accordance with this Will.",
    image: "/images/asset-bequests.jpg",
    points: [
      "Clear separation of immovable & movable assets.",
      "Residuary clause for assets not specifically listed.",
      "Can address investments, digital assets and other property.",
    ],
  },
  {
    id: "clause-4",
    number: "4/",
    title: "Guardianship for Minor Children",
    lawRef: "Guardians and Wards Act, 1890",
    badge: "Minor Protection",
    summary:
      "Allows parents to express their wishes regarding a testamentary guardian for minor children and include appropriate provisions for management of assets intended for them, subject to applicable law.",
    legalSnippet:
      "In the event of my demise while any child of mine is a minor, I nominate and appoint [GUARDIAN NAME] as the testamentary guardian of my minor child/children, subject to applicable law.",
    image: "/images/hero-family.jpg",
    points: [
      "Testamentary guardian provision.",
      "Alternate guardian where appropriate.",
      "Provisions concerning assets intended for minor children.",
    ],
  },
  {
    id: "clause-5",
    number: "5/",
    title: "Execution & Two-Witness Attestation",
    lawRef: "Statutory Dual-Witness Attestation",
    badge: "Will Execution",
    summary:
      "Follows the applicable execution and attestation requirements for an ordinary Will, including signing by the testator and attestation by two or more witnesses as prescribed by law.",
    legalSnippet:
      "Signed by the Testator in our joint presence, and attested by each of us in the presence of the Testator and each other, all being present at the same time.",
    image: "/hero.jpeg",
    points: [
      "Two-witness physical attestation.",
      "Proper signing and attestation process.",
      "Helps avoid common Will execution errors.",
    ],
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Tell Us About Your Family & Assets",
    description:
      "Share the details that matter, including your family, beneficiaries, property, investments and other assets in plain English or Hindi.",
  },
  {
    number: "02",
    title: "Strategy Session",
    description:
      "Your information is structured into a clear, personalised Will in India, covering beneficiaries, asset distribution, executor and guardianship.",
  },
  {
    number: "03",
    title: "Relentless Execution",
    description:
      "Review your Will clauses and estate planning provisions carefully. Make sure your property, financial assets and family wishes are clearly recorded.",
  },
  {
    number: "04",
    title: "Resolution & Peace of Mind",
    description:
      "Complete the Will execution and two-witness attestation process correctly. Your final Will gives your family clear instructions for the future.",
  },
];

const COMPARISON_ROWS = [
  {
    topic: "Asset Distribution",
    withoutWill:
      "Assets are distributed according to the law, which may not match your wishes.",
    withWill:
      "You decide how your assets should be distributed among your chosen beneficiaries.",
  },
  {
    topic: "Bank Accounts & Investments",
    withoutWill:
      "Family may face legal procedures and paperwork to access or transfer assets.",
    withWill:
      "Your Will names beneficiaries and an executor to help manage your estate.",
  },
  {
    topic: "Guardianship for Minor Children",
    withoutWill:
      "Guardianship decisions may be handled according to applicable law and by the relevant authority.",
    withWill:
      "You can state your wishes for who should care for your minor children.",
  },
  {
    topic: "Family Disputes & Estate Administration",
    withoutWill:
      "Uncertainty can lead to disagreements, delays and additional legal work.",
    withWill:
      "Clear instructions can reduce confusion, disputes and unnecessary legal work.",
  },
];

const AMA_PILLARS = [
  {
    icon: <Scale size={18} className="text-[#C65378]" />,
    title: "Bar Council Enrolled Advocates",
    description:
      "Every clause template and manual Will review is supervised by practising advocates from AMA Legal Solutions with deep expertise in Indian succession law.",
  },
  {
    icon: <ShieldCheck size={18} className="text-[#5F7E75]" />,
    title: "Statutory & Sub-Registrar Ready",
    description:
      "Engineered in strict compliance with the Indian Succession Act, 1925, Hindu Succession Act, 1956, and Registration Act, 1908 across India.",
  },
  {
    icon: <Award size={18} className="text-[#B5840B]" />,
    title: "18-Point Legal Health Check",
    description:
      "Powered by AMA Legal Solutions' succession audit rules to catch beneficiary share mismatches, minor guardianship gaps, and loan encumbrances.",
  },
];

const PRICING_TIERS = [
  {
    value: "essential",
    step: "01",
    label: "Auto Verified (Essential Will)",
    shortLabel: "Auto Verified",
    price: "₹2,490",
    tagline: "Automated & Legally Sound",
    badge: "Recommended",
    description: "Official automated Will draft complying with Indian succession rules.",
    ctaText: "Choose Auto Verified",
    features: [
      "Official automated Will draft (PDF)",
      "Statutory Indian Succession Act compliance",
      "Full immovable & movable asset scheduling",
      "Nominee & beneficiary allocations",
      "Executor & guardian appointments",
      "Dual-witness attestation signing guide",
    ],
  },
  {
    value: "lawyer_verified",
    step: "02",
    label: "Manually Verified (Lawyer Verified)",
    shortLabel: "Lawyer Verified",
    price: "₹4,990",
    tagline: "High Court Advocate Vetted & Certified",
    description:
      "Line-by-line review and digital certification by a qualified Bar Council advocate.",
    ctaText: "Choose Lawyer Verified",
    features: [
      "Everything in Auto Verified",
      "Line-by-line review by High Court advocate",
      "Custom clause verification for complex estates",
    ],
  },
  {
    value: "premium",
    step: "03",
    label: "Connect to Lawyer",
    shortLabel: "Connect to Lawyer",
    price: "₹9,990",
    tagline: "Advocate Phone Call & Complete Legal Advisory",
    description:
      "Advocate will connect on call for Will verification and resolution of all legal queries.",
    ctaText: "Connect to Lawyer",
    features: [
      "Everything in Lawyer Verified",
      "Advocate connects on call",
      "Comprehensive resolution for further queries",
    ],
  },
];

const ALL_REVIEWS = [
  {
    name: "Siddharth M.",
    content:
      "Excellent service and communication 👍 Every step from adding our Bengaluru apartment to verifying details via OTP was clearly explained and stress-free.",
  },
  {
    name: "Raghavendra P.",
    content:
      "The legal advisors from AMA Legal Solutions were patient, reassuring, and thorough from the first consultation call to the final court-ready Will.",
  },
  {
    name: "Kavita N.",
    content:
      "I recently arranged our family Will and minor guardianship clauses online. They were respectful, kind, and professional in addressing every question.",
  },
  {
    name: "Deepali K.",
    content:
      "Very easy to follow. The 18-point legal health check caught a nominee vs. beneficiary mismatch I hadn't noticed. Prepared and attested flawlessly.",
  },
  {
    name: "Rajesh K.",
    content:
      "Drafted my Will in less than 20 minutes online. The advocate review gave our family total confidence under the Hindu Succession Act.",
  },
  {
    name: "Ananya S.",
    content:
      "Transparent flat fees with zero hidden charges. Highly recommend to any Indian family looking to secure their children's future properly.",
  },
  {
    name: "Arvind D.",
    content:
      "The step-by-step questionnaire made scheduling our Demat holdings, bank accounts, and ancestral jewellery completely straightforward.",
  },
  {
    name: "Priya M.",
    content:
      "Excellent platform! Having an experienced Bar Council advocate review every clause before signing gave us complete peace of mind.",
  },
  {
    name: "Devendra T.",
    content:
      "Clear guidance without complicated legalese. The section-by-section review and OTP lock made sure our final Will deed was 100% accurate.",
  },
  {
    name: "Sunita R.",
    content:
      "Securing our family assets used to be something we kept putting off. With WillDrafting.in, we got our Will completed and printed over a weekend.",
  },
  {
    name: "Vikram S.",
    content:
      "Affordable, quick, and backed by genuine legal practitioners at AMA Legal Solutions. Best online estate planning service in India.",
  },
  {
    name: "Meenakshi W.",
    content:
      "Compassionate, structured service. The Schedule A asset table and two-witness execution guide made registration at the Sub-Registrar effortless.",
  },
];

const ALL_FAQS = [
  {
    id: 1,
    question: "What basic details do I need to keep ready before I start?",
    answer:
      "You only need everyday details: your full name, date of birth, address, PAN or Aadhaar number, and the names of your immediate family members (such as your spouse, children, or parents). You do not need to upload bulky property deeds just to draft your Will.",
  },
  {
    id: 2,
    question: "What kinds of property, bank accounts, and savings can I include in my Will?",
    answer:
      "You can include your house, flat, or land, bank savings and fixed deposits, mutual funds, Demat shares, life insurance policies, gold and jewellery, vehicles, business interests, and even digital accounts. You can list as many assets as you own.",
  },
  {
    id: 3,
    question: "What if my house or car still has an ongoing bank loan?",
    answer:
      "That is completely fine. While adding an asset, you can simply select that it has an active loan and mention the bank or loan details so your Will clearly records how it should be handled for your family.",
  },
  {
    id: 4,
    question: "Can I divide a single property or bank account among multiple family members?",
    answer:
      "Yes. For every asset, you can choose who receives it and split it in any percentage you like (for example, 50% each to two children, or 100% to your spouse). You can also name a backup person for any asset just in case.",
  },
  {
    id: 5,
    question: "What happens to assets I buy in the future after making this Will?",
    answer:
      "During the questionnaire, you will choose who should receive any remaining or future assets not separately listed. This ensures that even if you open a new bank account or buy minor items later, they are automatically covered.",
  },
  {
    id: 6,
    question: "Who is an Executor, and whom should I name?",
    answer:
      "An Executor is simply the trusted person who will make sure your wishes in the Will are carried out smoothly. Most people choose their spouse, an adult child, a sibling, or a trusted family friend. You can also name an alternate person as a backup.",
  },
  {
    id: 7,
    question: "How can I make sure my children are cared for if they are under 18?",
    answer:
      "If you have minor children, our guided flow includes a dedicated step where you can name a trusted Guardian (and a backup Guardian) to look after their upbringing and protect their share until they turn 18.",
  },
  {
    id: 8,
    question: "Can I add personal wishes or special instructions for specific family items?",
    answer:
      "Yes. You can write specific notes for individual assets (such as family heirlooms or jewellery), mention any pending loans or obligations, and include your personal funeral or charitable wishes.",
  },
  {
    id: 9,
    question: "How do I know I haven't missed anything, and can anyone edit my Will later?",
    answer:
      "Before generating your final Will, you review all your details section by section and confirm them with a one-time password (OTP) sent to your email. Once you verify with the OTP, your Will is locked so nobody can alter your wishes, and our automatic check makes sure all shares add up to 100%.",
  },
  {
    id: 10,
    question: "Once I download my Will PDF, how do I make it legally valid?",
    answer:
      "Simply print the downloaded PDF on plain A4 paper, sign it in the presence of two adult witnesses (who are not beneficiaries in your Will), and have both witnesses sign alongside you. Your Will is immediately valid, and you can also register it at your local Sub-Registrar's office if you wish.",
  },
  {
    id: 11,
    question:
      "Can NRIs and OCIs living in the US, UK, UAE, Canada, or Australia draft a valid Will for Indian property?",
    answer:
      "Yes. NRIs and OCIs holding residential or commercial real estate, NRE/NRO/FCNR bank accounts, mutual funds, or Demat portfolios in India should maintain a separate Indian Will under the Two-Will Strategy. This avoids 12 to 18 months of foreign probate re-sealing delays under Section 228 of the Indian Succession Act, 1925 and streamlines FEMA repatriation.",
  },
  {
    id: 12,
    question:
      "I already added a nominee on my bank account, mutual funds, and Demat account. Do I still need a Will?",
    answer:
      "Yes. As reaffirmed by the Supreme Court of India in Sarbati Devi and Shakti Yezdani (2023), a bank, insurance, or Demat nominee is only a provisional trustee (custodian) who receives the asset for discharge of institutional liability, not the legal owner. Only a valid Will legally transfers permanent ownership to your chosen beneficiaries.",
  },
  {
    id: 13,
    question:
      "Does WillDrafting.in support Hindu, Muslim (Wasiyat), Christian, and Parsi succession laws in India?",
    answer:
      "Yes. Our legal-tech drafting engine and AMA Legal Solutions advocates structure Wills compliant with the Hindu Succession Act, 1956 (for Hindus, Buddhists, Sikhs, and Jains), Muslim Personal Law Shariat Wasiyat rules (including the 1/3rd testamentary limit), and the Indian Succession Act, 1925 (for Christians, Parsis, and inter-faith marriages under the Special Marriage Act).",
  },
  {
    id: 14,
    question:
      "Is Will registration or Probate mandatory in India (including Mumbai, Chennai, and Kolkata)?",
    answer:
      "Under Section 18(e) of the Registration Act, 1908, registering a Will is completely optional across India. An unregistered Will signed before two witnesses on plain paper is 100% legally valid. Furthermore, following the Repealing and Amending Act, 2025 (omitting Section 213 of the Indian Succession Act), compulsory High Court probate in Mumbai, Chennai, and Kolkata is no longer a statutory bar for uncontested Wills.",
  },
];

export default function Home2Content() {
  const router = useRouter();
  const { status } = useSession();
  const [activeClauseIdx, setActiveClauseIdx] = useState(0);
  const [folderOpen, setFolderOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const [formMode, setFormMode] = useState<"signup" | "signin">("signup");
  const [googleError, setGoogleError] = useState("");

  useEffect(() => {
    const handleOpenSample = () => {
      setFolderOpen(true);
      setSampleModalOpen(true);
    };
    window.addEventListener("open-sample-will", handleOpenSample);
    return () => window.removeEventListener("open-sample-will", handleOpenSample);
  }, []);

  const scrollToOnboardingForm = () => {
    const el = document.getElementById("home2-onboarding-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const firstInput = el.querySelector("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 450);
      }
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleError("");
    try {
      await signIn("google", { callbackUrl: "/start/dashboard" });
    } catch {
      setGoogleError("Google Sign-In is unavailable right now. Please use the email code below.");
    }
  };

  const activeClause = CLAUSE_ITEMS[activeClauseIdx];
  const visibleReviews = showAllReviews ? ALL_REVIEWS : ALL_REVIEWS.slice(0, 6);
  const visibleFaqs = showAllFaqs ? ALL_FAQS : ALL_FAQS.slice(0, 6);

  const folderDocuments = [
    <div
      key="doc-1"
      className="p-2 h-full flex flex-col justify-between text-[7.5px] leading-tight bg-white select-none border border-[#2C221E]/10"
    >
      <div>
        <div className="flex items-center justify-between border-b border-[#2C221E]/10 pb-1 mb-1.5">
          <span className="font-bold text-[#C65378] tracking-wider uppercase text-[7px]">
            Last Will
          </span>
          <span className="text-[6px] font-mono text-[#6E635C]">SAMPLE</span>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-[#C65378]/25 rounded-full w-4/5" />
          <div className="h-1 bg-[#2C221E]/10 rounded-full w-full" />
          <div className="h-1 bg-[#2C221E]/10 rounded-full w-3/4" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-[#2C221E]/5">
        <span className="text-[6px] text-[#5F7E75] font-semibold">✓ View Sample</span>
        <div className="w-2.5 h-2.5 rounded-full bg-[#C65378] flex items-center justify-center text-white text-[5px] font-bold">
          ★
        </div>
      </div>
    </div>,
    <div
      key="doc-2"
      className="p-2 h-full flex flex-col justify-between text-[7.5px] leading-tight bg-white select-none border border-[#2C221E]/10"
    >
      <div>
        <div className="flex items-center justify-between border-b border-[#2C221E]/10 pb-1 mb-1.5">
          <span className="font-bold text-[#2C221E] tracking-wider uppercase text-[7px]">
            Asset Inventory
          </span>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-[#2C221E]/20 rounded-full w-full" />
          <div className="h-1 bg-[#2C221E]/10 rounded-full w-5/6" />
          <div className="h-1 bg-[#2C221E]/10 rounded-full w-2/3" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-[#2C221E]/5">
        <span className="text-[6px] text-[#6E635C] font-mono">Schedule A</span>
        <span className="text-[6px] text-[#C65378] font-bold">Preview</span>
      </div>
    </div>,
    <div
      key="doc-3"
      className="p-2 h-full flex flex-col justify-between text-[7.5px] leading-tight bg-white select-none border border-[#2C221E]/10"
    >
      <div>
        <div className="flex items-center justify-between border-b border-[#2C221E]/10 pb-1 mb-1.5">
          <span className="font-bold text-[#5F7E75] tracking-wider uppercase text-[7px]">
            Witness Guide
          </span>
          <span className="text-[6px] text-[#C65378] font-bold">LEGAL</span>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-[#2C221E]/20 rounded-full w-3/4" />
          <div className="h-1 bg-[#2C221E]/10 rounded-full w-full" />
          <div className="h-1 bg-[#2C221E]/10 rounded-full w-4/5" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-[#2C221E]/5">
        <span className="text-[6px] text-[#2C221E] font-semibold">2 Witnesses</span>
        <span className="text-[6px] text-[#5F7E75] font-mono">Ready</span>
      </div>
    </div>,
  ];

  return (
    <div className="w-full bg-[#FAF7F0] text-[#2C221E]">
      {/* =====================================================================
          1. HERO SECTION (WITH EMBEDDED "CREATE MY WILL" ONBOARDING FORM)
          ===================================================================== */}
      <section
        aria-label="Online Will Drafting Platform Hero"
        className="w-full pt-24 sm:pt-28 pb-6 sm:pb-10 px-3 sm:px-6 lg:px-8"
      >
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[40px] bg-gradient-to-br from-[#FFFFFF] via-[#FAF7F0] to-[#F3ECE0] border border-[#C65378]/18 shadow-[0_16px_50px_-18px_rgba(198,83,120,0.10)] p-5 sm:p-8 lg:p-11 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#C65378]/[0.07] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-1/3 w-80 h-80 rounded-full bg-[#D29E0D]/[0.07] blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-center">
            {/* Left Column: Headline, Copy, 3 Graphical Steps, Hero Illustration Preview */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#C65378]/25 px-3.5 py-1.5 mb-3.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                <h1 className="text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase text-[#C65378]">
                  India&apos;s first online will drafting platform
                </h1>
              </div>

              <h2 className="text-[1.95rem] xs:text-[2.3rem] sm:text-[3rem] xl:text-[3.4rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#2C221E] mb-3">
                Plan with love, protect with{" "}
                <span className="font-bold text-[#C65378]">WILL</span>
              </h2>

              <p className="text-[0.88rem] sm:text-[0.96rem] leading-[1.6] text-[#5C534E] max-w-[580px] mb-5">
                Plan for the people and assets that matter most. Answer simple guided questions in{" "}
                <strong className="font-semibold text-[#2C221E]">English or Hindi (हिंदी)</strong>,
                generate your Will document online, and get professional legal assistance to help
                ensure your wishes are clearly documented.
              </p>

              {/* Graphical 3-Step Visual Explainer (SEO H3s) */}
              <div className="w-full grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-[#C65378]/15 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C65378]/10 text-[#C65378] flex items-center justify-center">
                      <MessageSquareText className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65378]">
                      01
                    </span>
                  </div>
                  <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#2C221E] leading-snug">
                    Answer Simple Questions
                  </h3>
                  <p className="hidden sm:block text-[11px] text-[#6E635C] mt-0.5">
                    In plain Hindi or English
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-[#5F7E75]/20 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-8 h-8 rounded-xl bg-[#5F7E75]/12 text-[#5F7E75] flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5F7E75]">
                      02
                    </span>
                  </div>
                  <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#2C221E] leading-snug">
                    Add Family &amp; Property
                  </h3>
                  <p className="hidden sm:block text-[11px] text-[#6E635C] mt-0.5">
                    Decide who gets what easily
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-[#D29E0D]/25 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-8 h-8 rounded-xl bg-[#D29E0D]/15 text-[#9A7004] flex items-center justify-center">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A7004]">
                      03
                    </span>
                  </div>
                  <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#2C221E] leading-snug">
                    Get Your Legal Will
                  </h3>
                  <p className="hidden sm:block text-[11px] text-[#6E635C] mt-0.5">
                    Ready to print &amp; sign
                  </p>
                </div>
              </div>

              {/* Compact Visual Hero Illustration Banner + Ratings + Sample Will Trigger */}
              <div className="w-full rounded-2xl bg-[#F6F1E6] border border-[#2C221E]/8 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#FAF7F0] border border-[#C65378]/20 shrink-0">
                    <Image
                      src="/images/heronewnewnew.svg"
                      alt="Legally valid online will drafting platform in India"
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <div className="flex items-center gap-1.5">
                        <Image
                          src="/ggle.png"
                          alt="Google Reviews"
                          width={54}
                          height={18}
                          className="h-4 w-auto object-contain"
                        />
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#FBBC04] text-[#FBBC04]" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Image
                          src="/trustpilot.svg"
                          alt="Trustpilot"
                          width={64}
                          height={18}
                          className="h-4 w-auto object-contain"
                        />
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#00B67A] text-[#00B67A]" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[11.5px] text-[#5C534E]">
                      100% Legally Valid in India · Backed by AMA Legal Solutions
                    </p>
                  </div>
                </div>

                <a
                  href="#sample-will-section"
                  onClick={(e) => {
                    e.preventDefault();
                    setFolderOpen(true);
                    setSampleModalOpen(true);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full border border-[#C65378] bg-white px-4 py-2 text-[12.5px] font-semibold text-[#C65378] hover:bg-[#C65378]/10 transition-all shrink-0 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>See What You’ll Create</span>
                </a>
              </div>
            </div>

            {/* Right Column: Embedded "Create My Will" Onboarding Form Card */}
            <div className="lg:col-span-5 w-full" id="home2-onboarding-card">
              <div className="rounded-[26px] sm:rounded-[30px] bg-white border-2 border-[#C65378]/30 shadow-[0_18px_45px_rgba(198,83,120,0.12)] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-[#2C221E]/8">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#C65378]">
                      <Sparkles className="w-3 h-3" />
                      Create My Will · Quick Start
                    </span>
                    <h3 className="text-[1.2rem] sm:text-[1.35rem] font-semibold text-[#2C221E] leading-tight mt-0.5">
                      {formMode === "signup"
                        ? "Start Your Will in 60 Seconds"
                        : "Welcome Back - Sign In"}
                    </h3>
                  </div>
                  <span className="text-[10.5px] font-semibold text-[#5F7E75] bg-[#5F7E75]/10 px-2.5 py-1 rounded-full">
                    Free Setup
                  </span>
                </div>

                {status === "authenticated" ? (
                  <div className="py-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#5F7E75]/15 text-[#5F7E75] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[#2C221E]">
                        Your account is ready!
                      </p>
                      <p className="text-xs text-[#5C534E] mt-1">
                        Continue straight to your guided Will drafting dashboard.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => router.push("/start/dashboard")}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] py-3.5 px-6 text-sm font-semibold text-white shadow-sm hover:bg-[#a13c5d] transition-all cursor-pointer"
                    >
                      <span>Continue to My Will</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-[#2C221E]/15 bg-[#FAF7F0] hover:bg-[#F3ECE0] text-[13.5px] font-semibold text-[#2C221E] transition-all cursor-pointer"
                    >
                      <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden="true">
                        <path
                          fill="#FFC107"
                          d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
                        />
                        <path
                          fill="#FF3D00"
                          d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                        />
                        <path
                          fill="#4CAF50"
                          d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
                        />
                        <path
                          fill="#1976D2"
                          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C39 35.2 44 30 44 24c0-1.3-.1-2.7-.4-3.5z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    {googleError && (
                      <p className="mt-2 text-xs text-red-700 bg-red-50 p-2 rounded-lg">
                        {googleError}
                      </p>
                    )}

                    <div className="flex items-center gap-3 my-3 text-[11px] uppercase tracking-wider text-[#6E635C]">
                      <div className="flex-1 h-px bg-[#2C221E]/10" />
                      <span>or fill the form</span>
                      <div className="flex-1 h-px bg-[#2C221E]/10" />
                    </div>

                    <EmailOtpAuth
                      mode={formMode}
                      onSuccess={() => {
                        router.push("/start/dashboard");
                        router.refresh();
                      }}
                      submitLabel={
                        formMode === "signup"
                          ? "Create My Will Now →"
                          : "Send Login Code →"
                      }
                    />

                    <div className="mt-3 pt-2.5 border-t border-[#2C221E]/8 flex items-center justify-between text-[12px] text-[#5C534E]">
                      <span>
                        {formMode === "signup"
                          ? "Already have an account?"
                          : "New to WillDrafting.in?"}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormMode(formMode === "signup" ? "signin" : "signup")
                        }
                        className="font-semibold text-[#C65378] hover:underline cursor-pointer"
                      >
                        {formMode === "signup" ? "Sign in" : "Create account"}
                      </button>
                    </div>
                  </>
                )}

                <div className="mt-3 pt-2.5 border-t border-[#2C221E]/8 flex items-center justify-center gap-4 text-[11px] text-[#6E635C]">
                  <span className="inline-flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#5F7E75]" />
                    100% Private &amp; OTP Locked
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C65378]" />
                    Pay Only on Completion
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. WHY TRUST SECTION (CONCISE EDITORIAL + 3 PLAIN-LANGUAGE PILLARS)
          ===================================================================== */}
      <section className="w-full py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[36px] bg-white border border-[#2C221E]/8 p-5 sm:p-8 lg:p-10 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center pb-6 mb-6 border-b border-[#2C221E]/8">
            <div className="lg:col-span-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C65378]">
                Why Families Choose WillDrafting.in
              </span>
              <h2 className="text-[1.6rem] sm:text-[2.2rem] font-medium text-[#2C221E] leading-[1.12] tracking-tight mt-1 mb-2.5">
                It&apos;s Not About What You Leave Behind. It&apos;s About Who You Leave It For.
              </h2>
              <p className="text-[0.88rem] sm:text-[0.95rem] text-[#5C534E] leading-relaxed max-w-2xl mb-4">
                You&apos;ve spent years building your home, savings, investments, and business. A
                Will puts your wishes in writing, protects your assets, and gives your family
                complete clarity.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#C65378] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#a13c5d] transition-all"
              >
                <span>Make My Will Today</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-4">
              <div className="relative w-full h-[170px] sm:h-[195px] rounded-2xl bg-[#FAF7F0] border border-[#2C221E]/8 overflow-hidden">
                <Image
                  src="/desktopusp.jpg"
                  alt="Why Indian families trust WillDrafting for lawyer-verified estate planning"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WHY_TRUST_FEATURES.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#FAF7F0] border border-[#2C221E]/8 p-4 sm:p-5 flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-[#2C221E]/8 flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-[14.5px] font-semibold text-[#2C221E] mb-1">{f.title}</h3>
                  <p className="text-[12.5px] text-[#5C534E] leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. BELOW TRUST SECTION (5 CORE CLAUSES IN YOUR WILL - COMPACT EXPLORER)
          ===================================================================== */}
      <section className="w-full py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[36px] bg-[#F6F1E6] border border-[#2C221E]/8 p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C65378]">
                Legally Structured Will Clauses
              </span>
              <h2 className="text-[1.6rem] sm:text-[2.15rem] font-medium text-[#2C221E] leading-tight mt-1">
                5 Core Clauses Tailored to Your Estate &amp; Family
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#C65378] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#a13c5d] transition-all shrink-0 self-start sm:self-auto"
            >
              <span>Create My Will</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* 5 Clause Selector Pills */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {CLAUSE_ITEMS.map((clause, idx) => {
                const isActive = idx === activeClauseIdx;
                return (
                  <button
                    key={clause.id}
                    type="button"
                    onClick={() => setActiveClauseIdx(idx)}
                    className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isActive
                        ? "bg-[#C65378] text-white shadow-sm"
                        : "bg-white text-[#2C221E] hover:bg-white/80 border border-[#2C221E]/8"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#FAF7F0] text-[#C65378]"
                        }`}
                      >
                        {clause.number}
                      </span>
                      <span className="text-[13px] sm:text-[13.5px] font-medium truncate">
                        {clause.title}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-white" : "text-[#6E635C]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Clause Detail Card */}
            <div className="lg:col-span-7 rounded-2xl bg-white border border-[#2C221E]/8 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-7">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#5F7E75] bg-[#5F7E75]/10 px-2.5 py-0.5 rounded-full">
                    {activeClause.badge}
                  </span>
                  <span className="text-[10.5px] text-[#6E635C]">
                    Clause {activeClauseIdx + 1} of 5 · {activeClause.lawRef}
                  </span>
                </div>
                <h3 className="text-[1.2rem] sm:text-[1.35rem] font-semibold text-[#2C221E] mb-2">
                  {activeClause.title}
                </h3>
                <p className="text-[12.5px] sm:text-[13px] text-[#5C534E] leading-relaxed mb-3.5">
                  {activeClause.summary}
                </p>
                <ul className="space-y-1.5 mb-4">
                  {activeClause.points.map((pt, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-[12px] font-medium text-[#2C221E]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C65378] hover:text-[#a13c5d]"
                >
                  <span>Include in My Will</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="sm:col-span-5 flex flex-col gap-3">
                <div className="relative w-full h-[145px] rounded-xl overflow-hidden bg-[#FAF7F0] border border-[#2C221E]/8">
                  <Image
                    src="/images/Advocate%20Review%20Ready.png"
                    alt={activeClause.title}
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
                <div className="rounded-xl bg-[#FAF7F0] p-3 border border-[#2C221E]/8">
                  <p className="text-[10.5px] font-serif italic text-[#5C534E] line-clamp-3">
                    &ldquo;{activeClause.legalSnippet}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. WHAT WE DO SECTION (ONLINE WILL DRAFTING & ESTATE PLANNING INDIA)
          ===================================================================== */}
      <section className="w-full py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[36px] bg-white border border-[#2C221E]/8 p-5 sm:p-8 lg:p-10 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C65378]">
                Online Will Drafting &amp; Estate Planning India
              </span>
              <h2 className="text-[1.6rem] sm:text-[2.15rem] font-medium text-[#2C221E] leading-tight mt-1 mb-2">
                Put Your Estate Plan in Writing.
              </h2>
              <p className="text-[13px] sm:text-[14px] text-[#5C534E] leading-relaxed">
                Whether you are a Resident Indian or an NRI/OCI abroad, our bilingual (English &amp;
                Hindi) online Will generator structures your estate under the Indian Succession Act,
                1925, Hindu Succession Act, 1956, and Muslim Personal Law (Wasiyat), backed by AMA
                Legal Solutions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Service 1: Online Will Drafting */}
            <div className="rounded-2xl bg-[#FAF7F0] border border-[#2C221E]/8 p-5 flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white border border-[#C65378]/15 shrink-0 overflow-hidden flex items-center justify-center">
                <Image
                  src="/new1servcie.png"
                  alt="Online Will Drafting Service under Indian Law"
                  fill
                  sizes="140px"
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 text-left">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#5F7E75] bg-white px-2.5 py-0.5 rounded-full border border-[#5F7E75]/20 mb-1.5">
                  Available Now
                </span>
                <h3 className="text-[1.2rem] font-semibold text-[#2C221E] mb-1">
                  Online Will Drafting
                </h3>
                <p className="text-[12.5px] text-[#5C534E] leading-relaxed mb-3">
                  Protect your assets, choose your beneficiaries, name guardians for minor children,
                  and clearly record how your estate should be distributed.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#C65378] px-4 py-2 text-xs font-semibold text-white hover:bg-[#a13c5d] transition-all"
                >
                  <span>Write your Will</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Service 2: Coming Soon */}
            <div className="rounded-2xl bg-[#FAF7F0] border border-[#2C221E]/8 p-5 flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white border border-[#2C221E]/8 shrink-0 overflow-hidden flex items-center justify-center">
                <Image
                  src="/comingsoon.png"
                  alt="Power of Attorney and Estate Planning Services"
                  fill
                  sizes="140px"
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 text-left">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#B5840B] bg-[#D29E0D]/15 px-2.5 py-0.5 rounded-full mb-1.5">
                  Coming Soon
                </span>
                <h3 className="text-[1.2rem] font-semibold text-[#2C221E] mb-1">
                  Power of Attorney &amp; Trusts
                </h3>
                <p className="text-[12.5px] text-[#5C534E] leading-relaxed mb-3">
                  Power of Attorney and additional estate planning services in India are coming soon,
                  giving you more ways to manage and protect your family&apos;s interests.
                </p>
                <span className="inline-flex items-center rounded-full bg-white border border-[#2C221E]/10 px-4 py-1.5 text-xs font-medium text-[#6E635C]">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. ESTATE FOLDER SECTION (#sample-will-section - INTERACTIVE PREVIEW)
          ===================================================================== */}
      <section
        id="sample-will-section"
        className="w-full py-6 sm:py-8 px-3 sm:px-6 lg:px-8"
      >
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#F6F1E6] via-[#FAF7F0] to-[#F6F1E6] border border-[#C65378]/20 p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#C65378]/25 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#C65378] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Inspect Before You Draft
              </div>
              <h2 className="text-[1.6rem] sm:text-[2.15rem] font-medium text-[#2C221E] leading-tight mb-2.5">
                See Exactly How Your Final Will Document Looks.
              </h2>
              <p className="text-[13px] sm:text-[14px] text-[#5C534E] leading-relaxed mb-4 max-w-xl">
                Click the interactive estate folder or open the sample preview to inspect our
                Schedule A asset table, beneficiary percentage allocations, and dual-witness
                attestation page before you begin.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFolderOpen(true);
                    setSampleModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-[#C65378] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#C65378] hover:bg-[#C65378]/10 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Full Sample Will PDF</span>
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C65378] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#a13c5d] transition-all"
                >
                  <span>Create My Will</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white rounded-2xl border border-[#2C221E]/8 p-6">
              <div
                onClick={() => {
                  setFolderOpen(true);
                  setSampleModalOpen(true);
                }}
                className="cursor-pointer py-2"
              >
                <Folder
                  color="#C65378"
                  size={1.25}
                  items={folderDocuments}
                  isOpen={folderOpen}
                  onOpenChange={(next: boolean) => {
                    setFolderOpen(next);
                    if (next) setSampleModalOpen(true);
                  }}
                />
              </div>
              <p className="text-[11.5px] font-medium text-[#6E635C] mt-3">
                Click the folder to inspect the Sample Will
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. WORKING PROCESS SECTION (#how-it-works - 4 SIMPLE STEPS)
          ===================================================================== */}
      <section id="how-it-works" className="w-full py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[36px] bg-white border border-[#2C221E]/8 p-5 sm:p-8 lg:p-10 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C65378]">
                Working Process
              </span>
              <h2 className="text-[1.6rem] sm:text-[2.15rem] font-medium text-[#2C221E] leading-tight mt-1">
                Four Simple Steps to Put Your Family&apos;s Future in Writing
              </h2>
            </div>
            <button
              type="button"
              onClick={scrollToOnboardingForm}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F0] border border-[#C65378]/30 px-4 py-2 text-xs font-semibold text-[#C65378] hover:bg-[#C65378] hover:text-white transition-all cursor-pointer self-start sm:self-auto"
            >
              <span>Start Step 01 Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((st, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#FAF7F0] border border-[#2C221E]/8 p-5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[1.85rem] font-semibold text-[#C65378] leading-none">
                    {st.number}
                  </span>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#5F7E75] bg-white px-2.5 py-0.5 rounded-full border border-[#5F7E75]/20">
                    Step {idx + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#2C221E] mb-1.5">{st.title}</h3>
                  <p className="text-[12.5px] text-[#5C534E] leading-relaxed">{st.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. ESTATE COMPARISON SECTION (INTESTACY VS. ESTATE PLANNING - LIGHT LUXURY)
          ===================================================================== */}
      <section className="w-full py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[36px] bg-[#F6F1E6] border border-[#2C221E]/8 p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C65378]">
                Intestacy vs. Estate Planning
              </span>
              <h2 className="text-[1.6rem] sm:text-[2.15rem] font-medium text-[#2C221E] leading-tight mt-1">
                What Happens to Your Family If You Die Without a Will?
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#C65378] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#a13c5d] transition-all shrink-0 self-start sm:self-auto"
            >
              <span>Protect My Estate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="rounded-2xl bg-white border border-[#2C221E]/8 overflow-hidden">
            {/* Desktop Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-6 px-6 py-3.5 bg-[#FAF7F0] border-b border-[#2C221E]/8 text-[11px] font-bold uppercase tracking-[0.12em]">
              <div className="col-span-3 text-[#6E635C]">Estate Scenario</div>
              <div className="col-span-4 text-[#B91C1C] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
                <span>Dying Without a Will</span>
              </div>
              <div className="col-span-5 text-[#5F7E75] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5F7E75]" />
                <span>With WillDrafting.in</span>
              </div>
            </div>

            <div className="divide-y divide-[#2C221E]/8">
              {COMPARISON_ROWS.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 px-5 sm:px-6 py-4 items-center"
                >
                  <div className="md:col-span-3 font-semibold text-[14px] text-[#2C221E]">
                    {row.topic}
                  </div>
                  <div className="md:col-span-4 flex items-start gap-2 text-[12.5px] text-[#7F1D1D] bg-[#FEF2F2]/70 md:bg-transparent p-2.5 md:p-0 rounded-xl">
                    <X className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>{row.withoutWill}</span>
                  </div>
                  <div className="md:col-span-5 flex items-start gap-2 text-[12.5px] text-[#2C221E] font-medium bg-[#ECFDF5]/70 md:bg-transparent p-2.5 md:p-0 rounded-xl">
                    <Check className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                    <span>{row.withWill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. POWERED BY AMA LEGAL SOLUTIONS SECTION (WARM CHAMPAGNE & GOLD LUXURY)
          ===================================================================== */}
      <section className="w-full py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[36px] bg-white border border-[#D29E0D]/30 p-5 sm:p-8 lg:p-10 shadow-2xs relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-6 border-b border-[#2C221E]/8">
            <div className="max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#B5840B]">
                Institutional Legal Backing
              </span>
              <h2 className="text-[1.6rem] sm:text-[2.15rem] font-medium text-[#2C221E] leading-tight mt-1 mb-2">
                WillDrafting.in is Powered by{" "}
                <span className="underline decoration-[#D29E0D] decoration-2 underline-offset-4">
                  AMA Legal Solutions
                </span>
                .
              </h2>
              <p className="text-[13px] text-[#5C534E] leading-relaxed">
                Behind our 15-minute digital experience stands{" "}
                <strong className="font-semibold text-[#2C221E]">AMA Legal Solutions</strong>, a
                full-service Indian law firm specializing in estate succession, probate, and family
                wealth protection.
              </p>
            </div>

            {/* Dual Logo Lockup */}
            <div className="shrink-0 flex items-center gap-5 bg-[#FAF7F0] border border-[#D29E0D]/25 rounded-2xl px-5 py-4 self-start lg:self-auto">
              <Image
                src="/Logofinal.svg"
                alt="WillDrafting.in Logo"
                width={130}
                height={40}
                className="h-9 w-auto object-contain"
              />
              <div className="h-8 w-px bg-[#2C221E]/15" />
              <Image
                src="/ama.svg"
                alt="AMA Legal Solutions Logo"
                width={165}
                height={38}
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AMA_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#FAF7F0] border border-[#2C221E]/8 p-4 sm:p-5"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-[#2C221E]/8 flex items-center justify-center mb-3">
                  {pillar.icon}
                </div>
                <h3 className="text-[14.5px] font-semibold text-[#2C221E] mb-1">
                  {pillar.title}
                </h3>
                <p className="text-[12.5px] text-[#5C534E] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. PRICING SECTION (#plans - 3 TRANSPARENT FLAT-FEE PLANS)
          ===================================================================== */}
      <section id="plans" className="w-full py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[36px] bg-[#F6F1E6] border border-[#2C221E]/8 p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C65378]">
                Transparent Will Drafting Charges in India
              </span>
              <h2 className="text-[1.6rem] sm:text-[2.15rem] font-medium text-[#2C221E] leading-tight mt-1">
                Choose The Right Plan For Your Family &amp; Estate.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5C534E] max-w-md">
              Fixed one-time pricing with zero hidden lawyer fees. Start free and pay when ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRICING_TIERS.map((tier) => {
              const isRec = Boolean(tier.badge);
              return (
                <div
                  key={tier.value}
                  className={`relative rounded-3xl bg-white p-6 flex flex-col justify-between transition-all ${
                    isRec
                      ? "border-2 border-[#C65378] shadow-[0_12px_32px_rgba(198,83,120,0.12)]"
                      : "border border-[#2C221E]/10 shadow-2xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                        Plan {tier.step}
                      </span>
                      {isRec && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#C65378] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5">
                          <Star className="w-2.5 h-2.5 fill-white" />
                          {tier.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-[1.1rem] font-semibold text-[#2C221E]">{tier.label}</h3>
                    <div className="mt-2 mb-2 flex items-baseline gap-1.5">
                      <span className="text-[2rem] font-bold text-[#2C221E] tracking-tight">
                        {tier.price}
                      </span>
                      <span className="text-xs text-[#6E635C]">one-time</span>
                    </div>
                    <p className="text-[12.5px] text-[#5C534E] mb-4">{tier.description}</p>

                    <ul className="space-y-2 mb-5 pt-3 border-t border-[#2C221E]/8">
                      {tier.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[12.5px] text-[#2C221E]"
                        >
                          <Check className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3 px-5 text-[13.5px] font-semibold transition-all ${
                      isRec
                        ? "bg-[#C65378] text-white hover:bg-[#a13c5d]"
                        : "bg-[#FAF7F0] text-[#C65378] border border-[#C65378]/35 hover:bg-[#C65378] hover:text-white"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. TESTIMONIAL SECTION (ALL 12 VERIFIED CLIENT REVIEWS - CONCISE GRID)
          ===================================================================== */}
      <section className="w-full py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[36px] bg-white border border-[#2C221E]/8 p-5 sm:p-8 lg:p-10 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5F7E75]">
                Verified Client Stories
              </span>
              <h2 className="text-[1.6rem] sm:text-[2.15rem] font-medium text-[#2C221E] leading-tight mt-1">
                Trusted by 1,000+ Indian Families &amp; NRIs
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowAllReviews((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F0] border border-[#2C221E]/10 px-4 py-2 text-xs font-semibold text-[#2C221E] hover:border-[#C65378] hover:text-[#C65378] transition-all cursor-pointer self-start sm:self-auto"
            >
              <span>
                {showAllReviews ? "Show Compact View (6)" : `View All ${ALL_REVIEWS.length} Reviews`}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  showAllReviews ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {visibleReviews.map((rev, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#FAF7F0] border border-[#2C221E]/8 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]" />
                    ))}
                  </div>
                  <p className="text-[12.5px] text-[#5C534E] leading-relaxed mb-3">
                    &ldquo;{rev.content}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#2C221E]/6 text-[11.5px]">
                  <span className="font-semibold text-[#2C221E]">{rev.name}</span>
                  <span className="inline-flex items-center gap-1 text-[#5F7E75] font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Client
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. FAQ SECTION (ALL 14 FAQS IN COMPACT 2-COLUMN LUXURY ACCORDION)
          ===================================================================== */}
      <section className="w-full py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[36px] bg-[#F6F1E6] border border-[#2C221E]/8 p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C65378]">
                Frequently Asked Questions
              </span>
              <h2 className="text-[1.6rem] sm:text-[2.15rem] font-medium text-[#2C221E] leading-tight mt-1">
                Everything You Need to Know in Plain Language
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowAllFaqs((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#2C221E]/10 px-4 py-2 text-xs font-semibold text-[#2C221E] hover:border-[#C65378] hover:text-[#C65378] transition-all cursor-pointer self-start sm:self-auto"
            >
              <span>
                {showAllFaqs ? "Show Top 6 Questions" : `Show All ${ALL_FAQS.length} Questions`}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showAllFaqs ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visibleFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white border border-[#2C221E]/8 px-4 py-3.5 self-start"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-3 text-left cursor-pointer"
                  >
                    <span className="text-[13.5px] font-semibold text-[#2C221E] leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 pt-2.5 border-t border-[#2C221E]/6 text-[12.5px] text-[#5C534E] leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          12. FINAL CTA SECTION (DON'T LEAVE YOUR FAMILY GUESSING - WARM LUXURY)
          ===================================================================== */}
      <section className="w-full pt-6 pb-16 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[40px] bg-gradient-to-br from-[#FFFFFF] via-[#FAF7F0] to-[#F2E9DC] border-2 border-[#C65378]/25 p-6 sm:p-10 lg:p-14 text-center relative overflow-hidden shadow-[0_14px_40px_rgba(198,83,120,0.08)]">
          {/* Decorative CTA Illustrations (Left & Right on Desktop) */}
          <div className="hidden lg:block absolute top-6 left-8 w-28 h-28 pointer-events-none">
            <Image
              src="/cta/1.png"
              alt="Court-ready Will document"
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>
          <div className="hidden lg:block absolute bottom-6 left-12 w-24 h-24 pointer-events-none">
            <Image
              src="/cta/3.png"
              alt="Advocate verified certificate"
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
          <div className="hidden lg:block absolute top-6 right-8 w-28 h-28 pointer-events-none">
            <Image
              src="/cta/4.png"
              alt="Legal health check"
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>
          <div className="hidden lg:block absolute bottom-6 right-12 w-24 h-24 pointer-events-none">
            <Image
              src="/cta/5.png"
              alt="Family protection plan"
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C65378]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#C65378] mb-3">
              <FileText className="w-3.5 h-3.5" />
              Ready in 15 Minutes · Hindi &amp; English
            </span>

            <h2 className="text-[1.85rem] sm:text-[2.6rem] font-medium text-[#2C221E] leading-tight mb-3">
              Don&apos;t Leave Your Family Guessing.
            </h2>

            <p className="text-[13.5px] sm:text-[15px] text-[#5C534E] leading-relaxed mb-6">
              You spend a lifetime building what matters. Make sure your wishes are known when
              you&apos;re no longer there to explain them. Create a personalised Will that clearly
              records your wishes for your family, property and assets.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] px-8 py-3.5 text-sm sm:text-[15px] font-semibold text-white shadow-sm hover:bg-[#a13c5d] transition-all"
              >
                <span>Create My Will in Minutes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={scrollToOnboardingForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C65378] bg-white px-7 py-3 text-sm font-semibold text-[#C65378] hover:bg-[#C65378]/10 transition-all cursor-pointer"
              >
                <span>Fill Onboarding Form Above</span>
              </button>
            </div>

            {/* Social Proof Avatars */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-[#6E635C]">
              <div className="flex -space-x-1.5 overflow-hidden justify-center">
                <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    alt="Client avatar Priya Sharma"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    alt="Client avatar Rajesh Verma"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80"
                    alt="Client avatar Sunita Mehta"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span>
                <strong className="font-semibold text-[#2C221E]">1,000+ families</strong> have taken
                the first step toward protecting their future.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SAMPLE WILL PREVIEW MODAL
          ===================================================================== */}
      {sampleModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Sample Last Will & Testament Preview"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/50 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSampleModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#C65378]/20">
            <button
              type="button"
              onClick={() => setSampleModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF7F0] flex items-center justify-center text-[#2C221E] hover:bg-[#C65378] hover:text-white transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-[#2C221E]/10 pb-4 mb-5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C65378]">
                Official Sample Output · AMA Legal Solutions
              </span>
              <h3 className="text-xl font-semibold text-[#2C221E] mt-1">
                LAST WILL AND TESTAMENT (SAMPLE PREVIEW)
              </h3>
            </div>

            <div className="space-y-4 text-[13px] text-[#5C534E] leading-relaxed font-serif bg-[#FAF7F0] p-5 rounded-2xl border border-[#2C221E]/8">
              <p>
                <strong className="text-[#2C221E]">1. DECLARATION &amp; REVOCATION:</strong> I,{" "}
                <span className="underline">[Testator Full Name]</span>, aged{" "}
                <span className="underline">[Age]</span> years, residing at{" "}
                <span className="underline">[Address]</span>, being of sound mind and disposing
                memory, hereby revoke all former Wills and Codicils made by me and declare this to
                be my Last Will and Testament.
              </p>
              <p>
                <strong className="text-[#2C221E]">2. APPOINTMENT OF EXECUTOR:</strong> I appoint{" "}
                <span className="underline">[Primary Executor Name]</span> as the sole Executor of
                this Will to administer my estate and distribute my assets as scheduled below.
              </p>
              <p>
                <strong className="text-[#2C221E]">3. SCHEDULE A - ASSET BEQUESTS:</strong> All my
                movable and immovable properties, including my residential apartment, bank accounts,
                Demat holdings, and jewellery, shall vest in my named beneficiaries in the exact
                percentage shares specified in Schedule A.
              </p>
              <p>
                <strong className="text-[#2C221E]">4. ATTESTATION BY TWO WITNESSES:</strong> Signed
                by the above-named Testator in our presence, who at their request and in their
                presence have hereunto subscribed our names as attesting witnesses under Section 63
                of the Indian Succession Act, 1925.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSampleModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-[#5C534E] hover:text-[#2C221E] cursor-pointer"
              >
                Close Preview
              </button>
              <Link
                href="/contact"
                onClick={() => setSampleModalOpen(false)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#a13c5d]"
              >
                <span>Create My Own Will Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
