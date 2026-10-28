"use client";

import React, { useState, useEffect } from "react";
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
  Download,
  ScrollText,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "dayabhaga-law", label: "1. Dayabhaga Law: Absolute Freedom in Bengal" },
  { id: "bengali-will-format", label: "2. Complete Bengali Ichchapatra Format" },
  { id: "english-translation", label: "3. English Translation & Clause Explanations" },
  { id: "clause-selector", label: "4. Free Clause Selector & Customizer" },
  { id: "kolkata-probate-rules", label: "5. Kolkata High Court Probate Moat (Sec 213)" },
  { id: "west-bengal-sro-fees", label: "6. West Bengal SRO Filing & Fee Guide" },
  { id: "comparison-table", label: "7. Comparison: Filed Will vs Warish Patra" },
  { id: "step-by-step-sop", label: "8. Step-by-Step SOP: Drafting to Filing" },
  { id: "practical-case-studies", label: "9. Practical Case Studies: Kolkata & Bengal" },
  { id: "checklist-medical-cert", label: "10. SRO Checklist & Doctor Cert" },
  { id: "succession-tools", label: "11. Contextual Tools & Estate Tools" },
  { id: "legal-backing", label: "12. Legal Backing: Estate Counsel Profile" },
  { id: "faqs", label: "13. Frequently Asked Questions: Bengali Will" },
  { id: "statutory-citations", label: "14. Legal Citations: Bengal Land & Acts" },
];

const FAQS_DATA = [
  {
    q: "উইল বা ইচ্ছাপত্র লেখার জন্য কি স্ট্যাম্প পেপার (Stamp Paper) প্রয়োজন?",
    a: "না। ভারতীয় উত্তরাধিকার আইন ১৯২৫ এর ধারা ৬৩ এবং পশ্চিমবঙ্গ স্ট্যাম্প আইন অনুসারে, উইল লেখার জন্য কোনো নন-জুডিশিয়াল স্ট্যাম্প পেপারের প্রয়োজন নেই। সাধারণ সাদা কাগজ (Plain Paper) বা গ্রিন লেজার পেপারে কম্পিউটার টাইপ করে বা হাতে লিখে সম্পাদিত উইল সম্পূর্ণ আইনত বৈধ ও কার্যকরী।",
  },
  {
    q: "দায়ভাগ হিন্দু আইনে পৈতৃক সম্পত্তির ওপর বাবার কি সম্পূর্ণ উইল করার অধিকার আছে?",
    a: "হ্যাঁ। পশ্চিমবঙ্গ ও আসামে প্রচলিত ঐতিহাসিক দায়ভাগ হিন্দু আইন (Dayabhaga School of Hindu Law) অনুযায়ী পিতা জীবিত থাকা পর্যন্ত সন্তানদের পৈতৃক সম্পত্তিতে কোনো জন্মগত সমস্বত্বাধিকার (Joint Right) থাকে না। ফলে একজন বাঙালি হিন্দু পিতা তাঁর স্বোপার্জিত এবং পৈতৃক উভয় সম্পত্তির ওপরই ১০০% নিরঙ্কুশ উইল বা হস্তান্তরের ক্ষমতা রাখেন।",
  },
  {
    q: "কলকাতায় কি উইলের জন্য কোর্ট থেকে প্রোবেট (Probate) নেওয়া বাধ্যতামূলক?",
    a: "হ্যাঁ। ভারতীয় উত্তরাধিকার আইন ১৯২৫ এর ধারা ৫৭ এবং ২১৩ অনুসারে, যদি কোনো উইল কলকাতা প্রেসিডেন্সি শহরের স্থানীয় ভৌগোলিক সীমার মধ্যে সম্পাদিত হয়, অথবা উইলে উল্লিখিত স্থাবর সম্পত্তি কলকাতা মিউনিসিপ্যাল কর্পোরেশন (KMC) এলাকার মধ্যে অবস্থিত হয়, তবে সেই উইলের ভিত্তিতে সম্পত্তিতে অধিকার প্রতিষ্ঠা করতে কলকাতা হাইকোর্ট বা আলিপুর কোর্ট থেকে প্রোবেট বা লেটার্স অব অ্যাডমিনিস্ট্রেশন নেওয়া আইনত বাধ্যতামূলক। তবে কলকাতার বাইরের জেলাগুলোতে (যেমন হাওড়া, উত্তর বা দক্ষিণ ২৪ পরগনা, হুগলি, শিলিগুড়ি) প্রোবেট বাধ্যতামূলক নয়।",
  },
  {
    q: "উইলে কতজন সাক্ষী থাকা আইনত আবশ্যক?",
    a: "ভারতীয় উত্তরাধিকার আইনের ধারা ৬৩(গ) অনুসারে, কমপক্ষে ২ জন নিরপেক্ষ সাক্ষীর (Signing Witnesses) উপস্থিত থাকা আবশ্যক। সাক্ষীদের উপস্থিতিতে উইলকারী সই করবেন এবং উইলকারীর উপস্থিতিতে সাক্ষীরা স্বাক্ষর করবেন। ধারা ৬৭ অনুসারে, উইলের সুবিধাভোগী (Heir) বা তাঁর স্বামী/স্ত্রী কোনোভাবেই উইলের সাক্ষী হতে পারবেন না।",
  },
  {
    q: "ওয়ারিশান সার্টিফিকেট (Warish Paper) এবং উইলের মধ্যে পার্থক্য কী?",
    a: "যদি কোনো ব্যক্তি উইল না রেখে মারা যান (No-Will Estate), তবে তাঁর সমস্ত স্বাভাবিক উত্তরাধিকারীদের তালিকাভুক্ত করে গ্রাম পঞ্চায়েত প্রধান বা মিউনিসিপ্যালিটি কাউন্সিলর থেকে ওয়ারিশান সার্টিফিকেট নিয়ে বাংলারভূমি পোর্টালে মিউটেশন করা হয়। কিন্তু কোনো ব্যক্তি জীবিতাবস্থায় বৈধ উইল রেখে গেলে ওয়ারিশান সার্টিফিকেটের পরিবর্তে সেই উইলের (কলকাতায় প্রোবেট সহ) ভিত্তিতে একক বা নির্দিষ্ট মনোনীত উত্তরাধিকারীর নামে নামপত্তন হয়।",
  },
  {
    q: "পশ্চিমবঙ্গে রেজিস্ট্রি অফিসে (ADSR / ARA) উইল রেজিস্ট্রেশন খরচ কত?",
    a: "পশ্চিমবঙ্গ সরকারের ই-নথিকরণ (e-Nathikaran) নিয়মানুযায়ী উইলে কোনো অ্যাড-ভ্যালোরেম স্ট্যাম্প ডিউটি লাগে না (স্ট্যাম্প শুল্ক শূন্য টাকা)। সাব-রেজিস্ট্রার অফিসে শুধুমাত্র সরকারি রেজিস্ট্রেশন ফি প্রায় ₹১০০ থেকে ₹২০০ এবং কম্পিউটার সার্ভিস চার্জ বাবদ সামান্য খরচ হয়।",
  },
  {
    q: "জীবিতাবস্থায় কি উইল পরিবর্তন বা বাতিল (Revocation) করা যায়?",
    a: "হ্যাঁ। সুস্থ মস্তিষ্কে থাকা অবস্থায় একজন ব্যক্তি তাঁর জীবদ্দশায় যতবার খুশি উইল পরিবর্তন, সংশোধন (Codicil) বা সম্পূর্ণ প্রত্যাহার (Revocation) করতে পারেন। মৃত্যুর পূর্বে সম্পাদিত সর্বশেষ স্বাক্ষরিত উইলটিই আইনত বলবৎ থাকবে (Last Will and Testament)।",
  },
  {
    q: "উইলের পর বাংলারভূমি পোর্টালে (banglarbhumi.gov.in) জমি বা ফ্ল্যাট মিউটেশন কীভাবে হয়?",
    a: "উইলকারীর মৃত্যুর পর তাঁর ডেথ সার্টিফিকেট, নিবন্ধিত উইল (কলকাতার ক্ষেত্রে প্রোবেট অর্ডার কপি), আগের খতিয়ান ও পর্চা সহ বাংলারভূমি পোর্টালে অনলাইনে ওয়ারিশ ও টেস্টামেন্টারি মিউটেশনের আবেদন জমা দিতে হয়। এরপর সংশ্লিষ্ট বিএলঅ্যান্ডএলআরও (BL&LRO) শুনানি করে আবেদনকারীর নামে নতুন খতিয়ান মঞ্জুর করেন।",
  },
];

export default function WillFormatBengaliClient() {
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

  const [activeId, setActiveId] = useState<string>("dayabhaga-law");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedBengali, setCopiedBengali] = useState<boolean>(false);
  const [copiedEnglish, setCopiedEnglish] = useState<boolean>(false);
  const [copiedMedicalCert, setCopiedMedicalCert] = useState<boolean>(false);
  const [selectedClauseTab, setSelectedClauseTab] = useState<
    "dayabhaga" | "exclusion" | "executor" | "life_interest" | "residuary"
  >("dayabhaga");
  const [copiedCustomClause, setCopiedCustomClause] = useState<boolean>(false);

  // SRO Fee Tool state for West Bengal
  const [propertyDistrict, setPropertyDistrict] = useState<string>("kolkata");
  const [numberOfPages, setNumberOfPages] = useState<number>(4);
  const [registrationMode, setRegistrationMode] = useState<"office" | "commission">("office");

  useEffect(() => {
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

    const elements = document.querySelectorAll("section[id], div[id].scroll-target");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Full Bengali Will Template
  const fullBengaliText = `।। অন্তিম ইচ্ছাপত্র বা উইলনামা ।।
(ভারতীয় উত্তরাধিকার আইন ১৯২৫ এর ধারা ৬৩ ও দায়ভাগ হিন্দু আইনানুসারে সম্পাদিত)

আমি, শ্রী/শ্রীমতী [উইলকারীর সম্পূর্ণ নাম], পিতা/স্বামী: [পিতা বা স্বামীর নাম], বয়স আনুমানিক: [বয়স] বছর, ধর্ম: হিন্দু (দায়ভাগ আইনানুসারে পরিচালিত), জাতীয়তা: ভারতীয়, পেশা: [পেশা], আধার নম্বর: [আধার নম্বর], স্থায়ী ও বর্তমান ঠিকানা: [সম্পূর্ণ ঠিকানা, মৌজা, খতিয়ান, থানা ও জেলা], সুস্থ শরীরে, স্থির মস্তিষ্কে এবং কাহারও কোনো প্রকার প্ররোচনা, চাপ বা অসদুপায় ব্যতীত স্বেচ্ছায় অদ্য [তারিখ, মাস ও সাল] তারিখে এই দলিল আমার জীবনের প্রথম ও অন্তিম ইচ্ছাপত্র (Last Will and Testament) রূপে সম্পাদন ও ঘোষণা করিতেছি।

১. পূর্ববর্তী উইল বাতিলকরণ ধারা (Revocation of Prior Wills):
আমি এতদ্বারা ঘোষণা করিতেছি যে, অদ্যকার তারিখের পূর্বে আমার দ্বারা কোনো প্রকার উইল, ইচ্ছাপত্র বা কোডাসিল (Codicil) সম্পাদিত হইয়া থাকিলে তাহা এই দলিলের দ্বারা সম্পূর্ণ বাতিল, প্রত্যাহার ও আইনত নিষ্ক্রিয় বলিয়া গণ্য হইবে। এই অন্তিম ইচ্ছাপত্রটিই আমার মৃত্যুর পর একমাত্র বৈধ ও কার্যকরী দলিল হইবে।

২. শারীরিক ও মানসিক সুস্থতার ঘোষণা (Sound Mental Capacity):
আমি সম্পূর্ণ সুস্থ চিত্তে এবং স্মৃতি ও বিচারশক্তি অক্ষুণ্ণ রাখিয়া এই দলিলের মর্ম ও আইনি তাৎপর্য সম্পূর্ণ উপলব্ধি করিয়া অত্র উইল সম্পাদন করিতেছি।

৩. দায়ভাগ অধিকার ও স্বোপার্জিত স্বত্ব ঘোষণা (Dayabhaga Title Declaration):
আমি দায়ভাগ হিন্দু আইনের অনুসারী। এই উইলের তপসিলে বর্ণিত যাবতীয় স্থাবর ও অস্থাবর সম্পত্তি আমার স্বোপার্জিত অর্থ দ্বারা অর্জিত অথবা আইনানুসারে সম্পূর্ণ আমার নিরঙ্কুশ ব্যক্তিমালিকানাধীন সম্পত্তি। দায়ভাগ আইনের বিধান মতে আমার জীবিতাবস্থায় ইহাতে আমার কোনো পুত্র, কন্যা বা অন্যান্য উত্তরাধিকারীদের কোনো প্রকার জন্মগত সমস্বত্বাধিকার (Coparcenary Right) নাই। অতএব, অত্র সম্পত্তির উপর আমার সম্পূর্ণ স্বাধীন, অবাধ ও ১০০% দান, বিক্রয় ও উইল করিবার আইনসংগত অধিকার বিদ্যমান রহিয়াছে।

৪. আজীবন ভোগদখল স্বত্ব সংরক্ষণ (Reservation of Life Estate):
আমি ঘোষণা করিতেছি যে, আমার প্রাকৃতিক জীবদ্দশায় অত্র দলিলের তপসিলে বর্ণিত সমস্ত স্থাবর ও অস্থাবর সম্পত্তির নিরঙ্কুশ মালিকানা, ভোগদখল, ভাড়া আদায়, উন্নয়ন কিংবা বিক্রয় করিবার সর্বময় ক্ষমতা একমাত্র আমারই থাকিবে। আমার জীবনাবসানের পরই কেবল এই উইল পূর্ণ শক্তিতে কার্যকর হইবে।

৫. সম্পত্তির বন্টন ও হস্তান্তর বিধান (Bequest of Properties):
আমার মৃত্যুর পর তপসিলভুক্ত সম্পত্তির মালিকানা নিম্নোক্তভাবে অর্পিত হইবে:
(ক) তপসিল 'ক' ভুক্ত স্থাবর সম্পত্তি (বাড়ি/জমি/ফ্ল্যাট): আমার [সম্পর্ক], শ্রী/শ্রীমতী [উত্তরাধিকারীর নাম], পিতা/স্বামী: [পিতার নাম], আধার নম্বর: [আধার নং]-কে সম্পূর্ণ ও নিরঙ্কুশ স্বত্বে প্রদান করিলাম। তিনি উক্ত সম্পত্তির নিরঙ্কুশ মালিক হইয়া স্বনামে সরকারি খতিয়ান ও মিউনিসিপ্যাল হোল্ডিং নামপত্তন (Mutation) করিয়া চিরকাল ভোগদখল ও হস্তান্তর করিতে পারিবেন।
(খ) তপসিল 'খ' ভুক্ত অস্থাবর সম্পত্তি (ব্যাংক আমানত, ফিক্সড ডিপোজিট, মিউচুয়াল ফান্ড, অলঙ্কার ইত্যাদি): আমার মৃত্যুর পর [উত্তরাধিকারীর নাম]-এর নামে সম্পূর্ণভাবে হস্তান্তরিত হইবে।

৬. অবশিষ্ট সম্পত্তি সংক্রান্ত ধারা (Residuary Estate):
অত্র উইলে নির্দিষ্টভাবে উল্লিখিত হয় নাই অথবা ভবিষ্যতে আমার দ্বারা অর্জিত হইবে এমন কোনো স্থাবর বা অস্থাবর সম্পত্তি অবশিষ্ট থাকিলে তাহা উপরোক্ত প্রধান উত্তরাধিকারী লাভ করিবেন।

৭. উইল নির্বাহক নিয়োগ (Appointment of Executor):
আমার এই উইলের শর্তাবলী যথাযথভাবে পালন, প্রয়োজনে মহামান্য আদালত (যেমন কলকাতা হাইকোর্ট বা জেলা জজ আদালত) হইতে প্রোবেট (Probate) গ্রহণ এবং সম্পত্তির সুশৃঙ্খল হস্তান্তরের নিমিত্তে আমি শ্রী/শ্রীমতী [নির্বাহকের নাম], ঠিকানা: [ঠিকানা]-কে অত্র উইলের একমাত্র নির্বাহক (Sole Executor) নিয়োগ করিলাম।

৮. সাক্ষীগণের দ্বারা সত্যায়ন (Attestation under Section 63 Indian Succession Act):
উইলকারী সুস্থ শরীরে ও সচেতন মনে আমাদের সম্মুখে উপস্থিত হইয়া এই দলিলের প্রতিটি পৃষ্ঠায় স্বহস্তে স্বাক্ষর করিলেন। অতঃপর তাঁহার সনির্বন্ধ অনুরোধে ও উপস্থিতিতে এবং আমরা পরস্পর পরস্পরের সম্মুখে উপস্থিত থাকিয়া এই উইলে সাক্ষী হিসেবে স্বাক্ষর করিলাম।

উইলকারীর স্বাক্ষর / টিপসহি: ___________________________
তারিখ: [তারিখ]
স্থান: [স্থান, যেমন: কলকাতা / হাওড়া]

প্রথম সাক্ষীর বিবরণ:
স্বাক্ষর: ___________________________
নাম: [প্রথম সাক্ষীর নাম]
পিতার নাম: [পিতার নাম]
ঠিকানা: [সম্পূর্ণ ঠিকানা]
পেশা: [পেশা]
আধার / ভোটার কার্ড নং: [নম্বর]

দ্বিতীয় সাক্ষীর বিবরণ:
স্বাক্ষর: ___________________________
নাম: [দ্বিতীয় সাক্ষীর নাম]
পিতার নাম: [পিতার নাম]
ঠিকানা: [সম্পূর্ণ ঠিকানা]
পেশা: [পেশা]
আধার / ভোটার কার্ড নং: [নম্বর]

সম্পত্তির তপসিল (Schedule of Properties):
তপসিল 'ক' (স্থাবর সম্পত্তি):
জেলা: [জেলা, যেমন: কলকাতা / উত্তর ২৪ পরগনা], থানা: [থানা], সাব-রেজিস্ট্রি অফিস: [ADSR / ARA], মৌজা: [মৌজা], জে.এল. নম্বর: [J.L. No.], খতিয়ান নম্বর: [খতিয়ান নং], দাগ নম্বর: [দাগ নং], হোল্ডিং নম্বর: [ওয়ার্ড ও হোল্ডিং], জমির পরিমাণ / ফ্ল্যাটের আয়তন: [আয়তন]।
চৌহদ্দি: উত্তরে: [উত্তরের সীমানা], দক্ষিণে: [দক্ষিণের সীমানা], পূর্বে: [পূর্বের সীমানা], পশ্চিমে: [পশ্চিমের সীমানা]।

তপসিল 'খ' (অস্থাবর সম্পত্তি):
১. ব্যাংক অ্যাকাউন্ট নম্বর: [অ্যাকাউন্ট নং], ব্যাংক: [ব্যাংকের নাম ও শাখা]।
২. ফিক্সড ডিপোজিট রসিদ নম্বর: [FD নং], পরিমাণ: ₹[টাকা]।
৩. সোনার অলঙ্কার ও মূল্যবান সামগ্রী: [সংক্ষিপ্ত বিবরণ]।`;

  // English Translation and Notes
  const fullEnglishText = `LAST WILL AND TESTAMENT (ENGLISH TRANSLATION & STATUTORY NOTES)
(Executed in compliance with Section 63 of the Indian Succession Act, 1925 & Dayabhaga School of Hindu Law)

I, [Full Name of Testator], son/daughter/wife of [Father's / Husband's Name], aged about [Age] years, by faith Hindu (governed strictly by the Dayabhaga School of Hindu Law), by nationality Indian, residing at [Complete Residential Address, District, West Bengal], holding Aadhaar No. [Aadhaar Number], being of sound mind, memory, and disposing capacity, without any fraud, coercion, or undue influence, do hereby make, publish, and declare this as my LAST WILL AND TESTAMENT on this [Date] day of [Month], [Year].

CLAUSE 1: REVOCATION OF ALL PRIOR WILLS
I hereby revoke, cancel, and annul all my previous Wills, Codicils, or testamentary instruments executed by me prior to this date. This instrument alone shall stand as my final and legally operative Last Will and Testament.

CLAUSE 2: SOUND DISPOSING MIND & MENTAL HEALTH
I declare that I am physically and mentally competent, in complete possession of my senses and rational judgment, and fully aware of the consequences of this testamentary disposition.

CLAUSE 3: DAYABHAGA LAW & ABSOLUTE TITLE RECITAL
I state that I am governed by the Dayabhaga School of Hindu Law as applicable in West Bengal. The properties mentioned in the Schedule hereunder are solely my self-acquired or absolutely owned estates. Under the Dayabhaga school, no son, daughter, or heir has any birthright coparcenary interest in these properties during my natural lifetime. Consequently, I possess complete, unfettered, and 100% testamentary freedom to bequeath, transfer, or alienate the same to any person of my choice.

CLAUSE 4: RESERVATION OF LIFE INTEREST
I explicitly reserve the absolute right to use, possess, reside in, lease, develop, mortgage, or sell all my scheduled movable and immovable properties throughout my natural life. This Will shall take legal effect only upon my demise.

CLAUSE 5: TESTAMENTARY DISPOSITION
Upon my death, the Schedule properties shall devolve as follows:
(a) Schedule 'A' Immovable Property (House / Flat / Land) shall devolve upon my [Relationship], [Full Name of Beneficiary], absolutely and forever with full ownership and rights of mutation, alienation, and sale.
(b) Schedule 'B' Movable Assets (Bank accounts, Fixed Deposits, Demat shares, Jewellery) shall transfer entirely to the said Beneficiary.

CLAUSE 6: RESIDUARY CLAUSE
Any other properties or assets owned by me at the time of my death not specifically enumerated herein shall devolve upon the said primary Beneficiary.

CLAUSE 7: APPOINTMENT OF EXECUTOR
I appoint [Executor Full Name], residing at [Address], as the sole Executor of this my Will to administer my estate, apply for Probate or Letters of Administration before the Hon'ble High Court at Calcutta or District Court (if required under Section 213), and execute my wishes.

CLAUSE 8: ATTESTATION UNDER SECTION 63(c)
Signed by the Testator in our joint presence, and attested by us as witnesses in the presence of the Testator and in the presence of each other.

TESTATOR SIGNATURE: ___________________________
WITNESS 1: [Name, Address, Identification Proof]
WITNESS 2: [Name, Address, Identification Proof]`;

  const medicalCertFormat = `CERTIFICATE OF MENTAL CAPACITY & SOUND DISPOSING MIND
(To be issued by a Registered Medical Practitioner on Official Letterhead)

To Whom It May Concern:

Date: [Date of Examination]
Time: [Time of Examination]
Location: [Clinic / Hospital / Testator Residence], West Bengal

This is to certify that I, Dr. [Full Name of Medical Practitioner], holding Medical Registration No. [WBMC / NMC Reg No.], practicing at [Clinic / Hospital Address], have on this day physically examined:

Name of Testator: [Full Name of Testator]
Age / Gender: [Age] Years / [Male / Female]
Son / Daughter / Wife of: [Relative Name]
Residing at: [Residential Address, West Bengal]
Identification Proof Verified: Aadhaar Card / Voter ID No. [ID Number]

CLINICAL EVALUATION FINDINGS:
1. Conscious, alert, oriented to time, place, and person.
2. Cognitive functions, memory recall, and logical reasoning are intact and unimpaired.
3. Free from acute delirium, dementia, intoxication, or psychiatric incapacity.
4. Capable of understanding the nature of an estate, testamentary disposition, and executing legal documents voluntarily.

I hereby certify that the above-named individual is of SOUND DISPOSING MIND, in full control of their mental faculties, and legally competent to execute their Last Will and Testament under Section 59 of the Indian Succession Act, 1925.

Signature of Medical Practitioner: ___________________________
Doctor's Full Name: Dr. [Name]
Qualifications: [MBBS / MD / Spec.]
Registration No.: [WBMC Reg Number]
Official Clinic Seal: [Rubber Stamp]`;

  const copyBengaliToClipboard = () => {
    navigator.clipboard.writeText(fullBengaliText);
    setCopiedBengali(true);
    setTimeout(() => setCopiedBengali(false), 3000);
  };

  const copyEnglishToClipboard = () => {
    navigator.clipboard.writeText(fullEnglishText);
    setCopiedEnglish(true);
    setTimeout(() => setCopiedEnglish(false), 3000);
  };

  const copyMedicalToClipboard = () => {
    navigator.clipboard.writeText(medicalCertFormat);
    setCopiedMedicalCert(true);
    setTimeout(() => setCopiedMedicalCert(false), 3000);
  };

  const customClauses = {
    dayabhaga: {
      title: "Dayabhaga Ancestral Property Bequest Clause",
      bengali: `আমি দায়ভাগ হিন্দু আইন দ্বারা পরিচালিত। উক্ত তফসিলে বর্ণিত সম্পত্তি আমার পিতা/পূর্বপুরুষ হইতে প্রাপ্ত হইলেও দায়ভাগ আইনের বিধান অনুযায়ী আমার জীবদ্দশায় আমার কোনো পুত্র, কন্যা বা আত্মীয়ের কোনো জন্মগত সমস্বত্বাধিকার (Coparcenary Right) নাই। আমি এই সম্পত্তির ১০০% নিরঙ্কুশ উইল করিবার যোগ্য অধিকারী এবং আমার মৃত্যুর পর এই সম্পত্তি এককভাবে আমার মনোনীত উত্তরাধিকারী [নাম]-এর অধিকারে বর্তাইবে।`,
      english: `I am governed strictly by the Dayabhaga School of Hindu Law. Even if the Schedule property was inherited from my ancestors, by virtue of the Dayabhaga doctrine, no child or descendant has any birthright coparcenary interest during my lifetime. I possess 100% testamentary authority to bequeath the entirety of this ancestral asset to my nominated beneficiary [Name] exclusively.`,
    },
    exclusion: {
      title: "Disinheritance / Exclusion Clause (সন্তানকে ত্যাজ্য বা বঞ্চিতকরণ)",
      bengali: `আমি স্বজ্ঞানে ও সুস্থ মস্তিষ্কে ঘোষণা করিতেছি যে, আমার জ্যেষ্ঠ পুত্র/কন্যা [নাম]-কে অত্র উইলের সমস্ত সম্পত্তি হইতে সম্পূর্ণ বঞ্চিত ও ত্যাজ্য করিলাম। তিনি আমার জীবিতাবস্থায় আমার প্রতি চরম অবহেলা ও দুর্ব্যবহার করিয়াছেন এবং ইতোমধ্যে তাঁহার জীবদ্দশায় পৃথক অর্থ সাহায্য পাইয়াছেন। অতএব তিনি বা তাঁহার কোনো উত্তরসূরি আমার কোনো সম্পত্তিতে অধিকার দাবি করিতে পারিবেন না।`,
      english: `I consciously and deliberately exclude my [son/daughter], [Name], from any share in my estate. During my lifetime, they displayed severe neglect and indifference, having already received substantial financial assistance. Neither they nor their descendants shall have any right, claim, or interest whatsoever in any part of my estate.`,
    },
    executor: {
      title: "Executor Appointment & Probate Authority Clause",
      bengali: `আমি শ্রী/শ্রীমতী [নাম], পিতা: [নাম], ঠিকানা: [ঠিকানা]-কে অত্র ইচ্ছাপত্রের একমাত্র নির্বাহক (Sole Executor) নিযুক্ত করিলাম। তিনি আমার মৃত্যুর পর কলকাতা হাইকোর্ট বা উপযুক্ত দেওয়ানি আদালত হইতে প্রোবেট (Probate) গ্রহণ করিতে এবং আমার সম্পত্তির হস্তান্তরের সমস্ত আইনি প্রক্রিয়া সম্পাদন করিতে সম্পূর্ণ ক্ষমতাপ্রাপ্ত থাকিবেন।`,
      english: `I hereby appoint [Executor Name], residing at [Address], as the sole Executor of this Last Will. Upon my demise, he/she shall have full legal authority to petition the Hon'ble High Court at Calcutta or competent Civil Court for Probate under Section 213 of the Indian Succession Act, 1925 and administer my estate.`,
    },
    life_interest: {
      title: "Life Interest Clause for Surviving Spouse (স্ত্রীর জন্য আজীবন ভরণপোষণ)",
      bengali: `আমার মৃত্যুর পর আমার স্ত্রী [স্ত্রীর নাম] তাঁহার জীবদ্দশায় তপসিলভুক্ত বাসগৃহটিতে সম্পূর্ণ শান্তিপূর্ণভাবে বসবাস ও ভাড়ার আয় ভোগ করিবার আজীবন অধিকার (Life Interest) পাইবেন। তিনি উক্ত সম্পত্তি বিক্রয় বা বন্ধক দিতে পারিবেন না। তাঁহার মৃত্যুর পর উক্ত সম্পত্তির পূর্ণ ও চূড়ান্ত মালিকানা আমার [সন্তানের নাম]-এর নিকট অর্পিত হইবে।`,
      english: `Upon my demise, my wife [Wife's Name] shall hold a limited life interest in the scheduled residence for her lifetime, entitling her to reside and collect rental income without power of sale or mortgage. Upon her demise, absolute fee-simple ownership shall vest entirely in my [Child's Name].`,
    },
    residuary: {
      title: "Residuary Estate Clause (অবশিষ্ট যাবতীয় সম্পত্তির বন্টন)",
      bengali: `অত্র দলিলের তপসিলে উল্লেখিত হয় নাই কিংবা ভবিষ্যতে আমি কোনো নতুন স্থাবর বা অস্থাবর সম্পত্তি অর্জন করিলে, তাহার যাবতীয় স্বত্ব ও অধিকার আমার প্রধান সুবিধাভোগী [নাম]-এর নিকট সম্পূর্ণভাবে অর্পিত হইবে।`,
      english: `All the rest, residue, and remainder of my estate, both real and personal, whatsoever and wheresoever situated, not otherwise specifically disposed of herein, I give, devise, and bequeath absolutely to my principal beneficiary [Name].`,
    },
  };

  const copyCustomClauseToClipboard = () => {
    const clause = customClauses[selectedClauseTab];
    const textToCopy = `// ${clause.title}\n\n[BENGALI DRAFT]:\n${clause.bengali}\n\n[ENGLISH DRAFT]:\n${clause.english}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedCustomClause(true);
    setTimeout(() => setCopiedCustomClause(false), 3000);
  };

  // Fee calculation for SRO in WB
  const calcBaseFee = propertyDistrict === "kolkata" ? 150 : 100;
  const calcPageFee = numberOfPages * 12;
  const calcCommission = registrationMode === "commission" ? 500 : 0;
  const totalEstimatedSroCost = calcBaseFee + calcPageFee + calcCommission + 60; // 60 computer fee

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Exact Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients matching brand identity */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • DAYABHAGA HINDU LAW &amp; SRO RULES</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা: Legal Will Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download our legally checked Bengali Will format (উইল বা ইচ্ছাপত্র ফরম্যাট). Understand the
            Dayabhaga Hindu law rule giving fathers 100% Will freedom over family asset,
            Section 213 Kolkata High Court probate rules, and West Bengal SRO filing SOP.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#bengali-will-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>বাংলা উইল ফরম্যাট পড়ুন ও কপি করুন</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Valid Will Online</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Dayabhaga Law</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                100% TESTAMENTARY FREEDOM
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 213</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                KOLKATA PROBATE MANDATE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹0 Stamp Duty</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PLAIN PAPER EXECUTION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2 Witnesses</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 63(c) ATTESTATION
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
                Governed under Sections 57, 59, 63 &amp; 213 of the Indian Succession Act, 1925,
                Dayabhaga School of Hindu Law, West Bengal Land Reforms Act, 1955, and Calcutta High
                Court Original Side Rules.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & TEMPLATES
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: BENGALI WILL (ইচ্ছাপত্র) RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dayabhaga Law Superpower:</strong> Bengali Hindus follow Dayabhaga law.
                    Unlike Mitakshara law elsewhere in India, sons and daughters have zero birthright
                    joint claim while the father lives. A father can bequeath 100% of family
                    asset through an Ichchapatra to anyone.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 213 Kolkata Probate Moat:</strong> If the Will is made within Kolkata
                    Presidency town or covers land assets inside KMC area, court probate
                    from the Calcutta High Court or Alipore Court is strictly needed.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Plain Paper Legality:</strong> No non-judicial stamp paper is required in West
                    Bengal. A Will signed on plain white or green ledger paper with two valid witnesses
                    is 100% legally enforceable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nominal SRO Filing:</strong> Filing under Section 18(e) at the
                    SRO (ADSR / ARA) is a choice but provides unbeatable evidence against
                    future fraud allegations. Total official fee is only ₹100 to ₹250.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: DAYABHAGA LAW */}
            <section id="dayabhaga-law" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL DOCTRINE IN BENGAL</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#172228]">
                1. Dayabhaga Law: Absolute Will Freedom in Bengal
              </h2>
              <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Estate planning for Bengali Hindus operates under a fundamentally distinct legal system
                  compared to North, West, or South India. While the rest of India is governed by the
                  Mitakshara school of Hindu law, West Bengal and Assam are governed by the ancient{" "}
                  <strong>Dayabhaga school of Hindu law</strong> (authored by Jimutavahana).
                </p>
                <p>
                  This legal difference is of immense strategic significance for Will drafting:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                    <span className="font-bold text-amber-900 block mb-1">
                      Mitakshara Law (Rest of India)
                    </span>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Sons and daughters acquire an automatic birthright joint interest in family
                      joint family asset the moment they are born. The father cannot freely bequeath
                      the entire family home without consent.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                    <span className="font-bold text-emerald-900 block mb-1">
                      Dayabhaga Law (West Bengal &amp; Assam)
                    </span>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Children have <strong>NO birthright interest</strong> while their father is alive.
                      The father is the absolute, singular master of both self-acquired AND family
                      assets. He has 100% Will freedom to bequeath family assets to anyone
                      under his Ichchapatra.
                    </p>
                  </div>
                </div>
                <p>
                  Under Section 30 of the Hindu Succession Act, 1956, any Hindu may dispose of any asset
                  capable of being disposed of by him. Because Dayabhaga vests absolute title in the living
                  father, a Bengali father can legally bequeath an family family house in Kolkata,
                  Howrah, or Durgapur to his daughter, spouse, or third party, entirely excluding an errant
                  son without facing joint split fights.
                </p>
              </div>
            </section>

            {/* SECTION 2: BENGALI WILL FORMAT */}
            <section id="bengali-will-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ScrollText className="w-4 h-4" />
                <span>NATIVE VERNACULAR TEMPLATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                2. Complete Bengali Ichchapatra Format: Native Draft
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Below is the complete legal text of a valid Will in Bengali (উইল বা ইচ্ছাপত্র). This draft
                incorporates Dayabhaga title declarations, Section 63 witness signing clauses, executor
                appointment, and asset schedules. Click the button to copy the entire template.
              </p>

              <div className="relative rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-[#172228] text-white">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>বাংলা ইচ্ছাপত্র লিগ্যাল ড্রাফট (Plain Paper Format)</span>
                  </div>
                  <button
                    onClick={copyBengaliToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    {copiedBengali ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 sm:p-6 bg-slate-50/50 max-h-[600px] overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap select-all">
                  {fullBengaliText}
                </div>
              </div>
            </section>

            {/* SECTION 3: ENGLISH TRANSLATION */}
            <section id="english-translation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>BILINGUAL REFERENCE &amp; CLAUSE NOTES</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                3. English Translation: Bengali Will Clauses Explained
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                If you are an NRI or drafting a bilingual Will for assets in West Bengal, here is the
                exact English equivalent of each Bengali clause. This ensures complete alignment between
                vernacular terms and English legal proceedings.
              </p>

              <div className="relative rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>English Translation &amp; Estate Act Clauses</span>
                  </div>
                  <button
                    onClick={copyEnglishToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    {copiedEnglish ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy English Draft</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 sm:p-6 bg-slate-50/50 max-h-[500px] overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap select-all">
                  {fullEnglishText}
                </div>
              </div>
            </section>

            {/* SECTION 4: INTERACTIVE CLAUSE SELECTOR */}
            <section id="clause-selector" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sliders className="w-4 h-4" />
                <span>TAILOR YOUR WILL DRAFT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                4. Free Clause Selector: Tailor Your Bengali Will
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Select specific legal situations below to view and copy specialized legal clauses designed
                mainly for West Bengal asset laws and Dayabhaga jurisprudence:
              </p>

              <div className="rounded-2xl bg-white border border-slate-200 shadow-xs p-5 space-y-4">
                {/* Clause Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                  {(
                    [
                      { key: "dayabhaga", label: "Dayabhaga Family" },
                      { key: "exclusion", label: "Leaving Out (ত্যাজ্য)" },
                      { key: "executor", label: "Executor & Probate" },
                      { key: "life_interest", label: "Spouse Life Estate" },
                      { key: "residuary", label: "Residuary Estate" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedClauseTab(tab.key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        selectedClauseTab === tab.key
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Selected Clause Display */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#172228]">
                      {customClauses[selectedClauseTab].title}
                    </h3>
                    <button
                      onClick={copyCustomClauseToClipboard}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[#172228] text-xs font-semibold transition-all"
                    >
                      {copiedCustomClause ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-600" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 text-xs text-slate-800 leading-relaxed space-y-2">
                    <div>
                      <span className="font-bold text-[#C65378] block text-[11px] uppercase tracking-wide">
                        Bengali Draft (বাংলা খসড়া):
                      </span>
                      <p className="mt-1 font-serif text-sm">
                        {customClauses[selectedClauseTab].bengali}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-rose-200/50">
                      <span className="font-bold text-slate-600 block text-[11px] uppercase tracking-wide">
                        English Legal Interpretation:
                      </span>
                      <p className="mt-1 text-slate-700">
                        {customClauses[selectedClauseTab].english}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Visual Overview Banner (Middle of Scrollable Content) */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
              <Image
                src="/images/will-format-bengali-ichchapatra-og.jpg"
                alt="উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা: Will Format in Bengali Legal Overview"
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
              />
              <div className="p-3.5 bg-[#172228] text-white text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span className="font-semibold text-slate-100">
                    উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা • Dayabhaga Hindu Law &amp; Kolkata Probate Guide
                  </span>
                </div>
                <span className="text-[11px] text-rose-200 font-mono">
                  Indian Succession Act, 1925 s. 63
                </span>
              </div>
            </div>

            {/* SECTION 5: KOLKATA PROBATE MOAT */}
            <section id="kolkata-probate-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>CALCUTTA HIGH COURT JURISDICTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                5. Kolkata High Court Probate Moat: Section 213 Rules
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Section 213 read with Section 57(a) &amp; (b) of the Indian Succession Act, 1925
                  creates a strict local distinction between the historic Presidency town of
                  Kolkata and the rest of West Bengal:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#172228] text-white">
                        <th className="p-3.5 font-bold">Parameter</th>
                        <th className="p-3.5 font-bold">Kolkata Presidency Area (KMC)</th>
                        <th className="p-3.5 font-bold">Rest of West Bengal (Districts)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 font-semibold text-slate-900">Probate Rule</td>
                        <td className="p-3.5 text-rose-700 font-bold">
                          Strictly Needed (Sec 213)
                        </td>
                        <td className="p-3.5 text-emerald-700 font-medium">
                          A Choice / Not Needed
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 font-semibold text-slate-900">Local Courts</td>
                        <td className="p-3.5">
                          Calcutta High Court (Original Side) or Alipore District Court
                        </td>
                        <td className="p-3.5">
                          District Judge / Civil Judge (Senior Division) of district
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 font-semibold text-slate-900">City / Land Name Change</td>
                        <td className="p-3.5">
                          KMC will refuse Assessment Book name change without Court Probate Order
                        </td>
                        <td className="p-3.5">
                          BL&amp;LRO mutates based on Filed Will + Legal Heir NOC on Banglarbhumi
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 font-semibold text-slate-900">Maximum Court Fees</td>
                        <td className="p-3.5">
                          Under WB Court-Fees Act, capped at ₹50,000 for probate petitions
                        </td>
                        <td className="p-3.5">
                          Nominal court fees unless contested into contentious civil suit
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Crucial Warning for Kolkata Asset Owners:</span>
                  </div>
                  <p>
                    If your flat or house is located in South Kolkata, North Kolkata, or Central Kolkata
                    under KMC wards, do not rely solely on a filed Will for future transfer. Your
                    appointed executor must file for Probate before the Calcutta High Court or Alipore
                    Court upon your demise to establish legal title under Section 213.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: SRO FEES & E-NATHIKARAN */}
            <section id="west-bengal-sro-fees" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>OFFICIAL WBDOR FEES CALCULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                6. West Bengal SRO Filing: e-Nathikaran Fee Guide
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Will filing in West Bengal is conducted under the Directorate of Filing and
                Stamp Revenue (WBDOR) via the <strong>e-Nathikaran portal</strong>. Because a Will does not
                transfer immediate title, it is exempt from ad-valorem stamp duty.
              </p>

              {/* Interactive SRO Fee Calculator */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#C65378]" />
                    <span className="font-bold text-sm sm:text-base text-[#172228]">
                      West Bengal SRO Fee Estimator
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Zero Stamp Duty (₹0)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Filing District</label>
                    <select
                      value={propertyDistrict}
                      onChange={(e) => setPropertyDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#C65378]/30 outline-hidden font-medium"
                    >
                      <option value="kolkata">Kolkata (ARA I/II/III / Alipore)</option>
                      <option value="howrah">Howrah (ADSR / DSR)</option>
                      <option value="24pgs_north">North 24 Parganas (Barasat/Bidhannagar)</option>
                      <option value="24pgs_south">South 24 Parganas (Alipore/Baruipur)</option>
                      <option value="other_wb">Other Districts (Siliguri/Asansol/etc)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Number of Pages in Will
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={numberOfPages}
                      onChange={(e) => setNumberOfPages(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#C65378]/30 outline-hidden font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Signing Mode</label>
                    <select
                      value={registrationMode}
                      onChange={(e) => setRegistrationMode(e.target.value as "office" | "commission")}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#C65378]/30 outline-hidden font-medium"
                    >
                      <option value="office">At SRO office (Normal)</option>
                      <option value="commission">Home Visit Commission (Bedridden Senior)</option>
                    </select>
                  </div>
                </div>

                {/* Calculation Summary Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left text-xs">
                    <div className="text-slate-600">
                      Base Fee: <strong>{formatINR(calcBaseFee)}</strong> • Page Scanning:{" "}
                      <strong>{formatINR(calcPageFee)}</strong> • Computer Processing:{" "}
                      <strong>₹60</strong>
                    </div>
                    {registrationMode === "commission" && (
                      <div className="text-amber-700 font-semibold">
                        Home Visit Commission Fee: +₹500
                      </div>
                    )}
                    <div className="text-[11px] text-slate-500">
                      Applies at all ADSR / ARA offices across West Bengal via e-Nathikaran.
                    </div>
                  </div>

                  <div className="text-center sm:text-right shrink-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Total Govt Filing Cost
                    </span>
                    <span className="text-2xl font-extrabold text-[#172228]">
                      {formatINR(totalEstimatedSroCost)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>LEGAL PATHWAY COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                7. Legal Comparison: Filed Will vs Warish Paper
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                When someone passes away in West Bengal, asset transfer follows either no-Will
                estate (via Warish Paper) or Will estate (via Will/Probate). Here is
                how they compare across key parameters:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold">Feature</th>
                      <th className="p-3.5 font-bold">Filed Will (উইল)</th>
                      <th className="p-3.5 font-bold">Warish Patra (ওয়ারিশান)</th>
                      <th className="p-3.5 font-bold">Gift Deed (দানপত্র)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold text-slate-900">Effective Date</td>
                      <td className="p-3.5">Only after death of Will maker</td>
                      <td className="p-3.5">Applies when deceased dies no-Will</td>
                      <td className="p-3.5">Immediate transfer during lifetime</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold text-slate-900">Stamp Duty in WB</td>
                      <td className="p-3.5 text-emerald-700 font-bold">₹0 (Zero Stamp Duty)</td>
                      <td className="p-3.5 text-emerald-700 font-bold">₹0 (Office)</td>
                      <td className="p-3.5 text-rose-700 font-semibold">
                        0.5% (Family) / 5%-7% (Others)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold text-slate-900">Leaving Out Freedom</td>
                      <td className="p-3.5 text-emerald-700 font-bold">
                        100% (Dayabhaga permits exclusion)
                      </td>
                      <td className="p-3.5 text-rose-700">
                        None (All Class I heirs get legal shares)
                      </td>
                      <td className="p-3.5">Immediate irrevocable gift</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold text-slate-900">KMC / Banglarbhumi Name Change</td>
                      <td className="p-3.5">Probate order (Kolkata) or Will + Death Cert</td>
                      <td className="p-3.5">Panchayat / Councillor Warish Paper</td>
                      <td className="p-3.5">Filed Gift Deed copy</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold text-slate-900">Revocability</td>
                      <td className="p-3.5 text-emerald-700 font-bold">
                        100% revocable anytime while alive
                      </td>
                      <td className="p-3.5">Not applicable</td>
                      <td className="p-3.5 text-rose-700">Irrevocable once accepted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTION PROTOCOL IN WEST BENGAL</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                8. Step-by-Step SOP: Drafting to Filing in Bengal
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: "Step 1",
                    title: "Asset Cataloging & Dayabhaga Title Verification",
                    desc: "List all assets with exact mouza, J.L. number, khatian, and dag numbers from Banglarbhumi. Confirm that assets in West Bengal fall under Dayabhaga law with no pre-existing court attachment.",
                  },
                  {
                    step: "Step 2",
                    title: "Drafting the Will with Clear Bequest & Revocation Clauses",
                    desc: "Incorporate the Dayabhaga recital, explicit revocation of prior wills, life estate reservation, appointment of a trustworthy Executor, and full residuary bequest in clear Bengali and English.",
                  },
                  {
                    step: "Step 3",
                    title: "Obtaining Registered Medical Practitioner's Fitness Certificate",
                    desc: "For Will makers over 60 years or with health conditions, have a filed MBBS doctor examine the Will maker on the day of signing and issue a Sound Mind Fitness Paper.",
                  },
                  {
                    step: "Step 4",
                    title: "Execution Before Two Independent Witnesses (Sec 63)",
                    desc: "Sign all pages in the presence of two independent witnesses who are NOT heirs and not spouses of heirs (Section 67 rule). Witnesses then attest in your presence.",
                  },
                  {
                    step: "Step 5",
                    title: "e-Nathikaran Appointment & Sub-Registrar Office Visit",
                    desc: "Generate e-appointment on the West Bengal e-Nathikaran portal. Visit the ADSR / ARA Kolkata with witnesses, Aadhaar cards, doctor's paper, and original draft for biometric capture and filing.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#C65378]/10 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-[#172228]">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>REAL LITIGATION SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                9. Practical Case Studies: Kolkata, Salt Lake &amp; Howrah
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wide">
                    CASE STUDY 1 • KOLKATA
                  </div>
                  <h3 className="text-sm font-bold text-[#172228]">
                    Alipore High Court Probate Victory
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father in Ballygunge bequeathed his entire home house to his younger
                    daughter, excluding his estranged son. Upon demise, the daughter applied for probate
                    at Calcutta High Court. The son challenged claiming Mitakshara joint right.
                    The Court upheld the Will under Dayabhaga doctrine, confirming the father had 100%
                    gift office.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wide">
                    CASE STUDY 2 • SALT LAKE
                  </div>
                  <h3 className="text-sm font-bold text-[#172228]">
                    Bidhannagar Leasehold Flat Transfer
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Will maker held a 999-year leasehold asset in Salt Lake under the Urban
                    Development &amp; City Affairs Office. The filed Will clearly appointed
                    his wife as primary executor. The UD Office mutated the leasehold rights smoothly
                    because the Will mainly referred to Government lease terms.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wide">
                    CASE STUDY 3 • HOWRAH
                  </div>
                  <h3 className="text-sm font-bold text-[#172228]">
                    District Banglarbhumi Name Change
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In Howrah district (outside Kolkata Presidency area), the legal heir presented a
                    filed Bengali Ichchapatra to the BL&amp;LRO. Because Section 213 does not
                    mandate probate outside Kolkata, the BL&amp;LRO checked witness sworn notes and mutated
                    the farm and homestead land on Banglarbhumi within 45 days.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: CHECKLIST & MEDICAL CERTIFICATE */}
            <section id="checklist-medical-cert" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>REGISTRATION CHECKLIST &amp; DOCTOR CERT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                10. SRO Paper Checklist &amp; Medical Paper
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Checklist Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#172228]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>SRO (ADSR) Needed Checklist</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Original Will typed on plain paper or green ledger sheet (2 sets).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Original Aadhaar Card and PAN Card of Will maker + Self-attested copies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Original ID proofs (Aadhaar / Voter ID) of 2 signing witnesses.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Recent passport-size photographs of Will maker and both witnesses.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Banglarbhumi Khatian / Porcha / KMC Tax receipt proving title.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Doctor's Sound Mind Fitness Paper on official letterhead.</span>
                    </li>
                  </ul>
                </div>

                {/* Doctor Certificate Box */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#C65378]">
                      <Award className="w-4 h-4" />
                      <span>Doctor's Sound Mind Paper</span>
                    </div>
                    <button
                      onClick={copyMedicalToClipboard}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#C65378] hover:bg-[#a33b5c] text-white text-[11px] font-bold transition-all"
                    >
                      {copiedMedicalCert ? (
                        <>
                          <CheckCheck className="w-3 h-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Format</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-800 max-h-[220px] overflow-y-auto whitespace-pre-wrap leading-relaxed border border-slate-200">
                    {medicalCertFormat}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: CONTEXTUAL ESTATE TOOLS */}
            <section id="succession-tools" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE ESTATE PLANNING TOOLS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                11. Contextual Estate Tools &amp; Estate Tools
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Use our suite of legal tools to estimate tax on inherited asset, verify court
                probate expenses, and check witness eligibility under Indian succession laws:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#172228] group-hover:text-[#C65378] transition-colors">
                      Inherited Asset Tax Tool
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Compare 12.5% flat vs 20% indexation on sale of inherited asset under Budget
                      2024 grandfathering.
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#C65378]">
                    <span>Calculate Capital Gains</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  href="/tools/probate-court-fee-timeline-calculator"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <Gavel className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#172228] group-hover:text-emerald-700 transition-colors">
                      Probate Court Fee Tool
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Estimate Calcutta High Court and Alipore Court fee caps and timelines for probate
                      petitions.
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-700">
                    <span>Estimate Probate Fees</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  href="/services/will-registration"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#172228] group-hover:text-blue-700 transition-colors">
                      West Bengal SRO Will Filing
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Assisted filing service at ADSR offices across Kolkata, Howrah, and Bengal.
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-blue-700">
                    <span>Explore SRO Services</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </section>

            {/* SECTION 12: LEGAL BACKING */}
            <section id="legal-backing" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>EDITORIAL &amp; LEGAL OVERSIGHT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                12. Legal Backing: Senior Estate Counsel Profile
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-2xl shrink-0 shadow-md">
                  AM
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-base font-extrabold text-[#172228]">
                      Lawyer Anuj Anand Malik
                    </h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#C65378]/10 text-[#C65378]">
                      Senior Estate Counsel
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    AMA Legal Solutions • Bar Council of Delhi &amp; Supreme Court Bar Association
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Lawyer Anuj Anand Malik has over 15 years of experience in cross-border estate
                    planning, high-stakes probate court fights, and Will fight defense. He has
                    advised hundreds of Bengali and NRI families on Dayabhaga family estate,
                    Calcutta High Court probate petitions, and fight-proof Will drafting.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                      5,000+ Wills Supervised
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      100% Probate Success
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="faqs" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                13. Frequently Asked Questions: Bengali Ichchapatra
              </h3>
              <div className="space-y-3">
                {FAQS_DATA.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-[#172228] hover:text-[#C65378] transition-colors"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
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
                <BookOpen className="w-4 h-4" />
                <span>STATUTORY REPOSITORY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                14. Legal Citations: Bengal Land &amp; Estate Acts
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold">Act / Statute</th>
                      <th className="p-3.5 font-bold">Relevant Section</th>
                      <th className="p-3.5 font-bold">Legal Mandate &amp; Operational Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold text-slate-900">
                        Indian Succession Act, 1925
                      </td>
                      <td className="p-3.5 font-mono text-[#C65378]">Section 63</td>
                      <td className="p-3.5">
                        Signing rules: signature by Will maker and needed witness signing by 2
                        independent witnesses.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold text-slate-900">
                        Indian Succession Act, 1925
                      </td>
                      <td className="p-3.5 font-mono text-[#C65378]">Sections 57 &amp; 213</td>
                      <td className="p-3.5">
                        Needed probate rule for Wills signed or governing asset within
                        Kolkata Presidency limits.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold text-slate-900">
                        Dayabhaga School of Hindu Law
                      </td>
                      <td className="p-3.5 font-mono text-[#C65378]">Jimutavahana Ch. 2</td>
                      <td className="p-3.5">
                        Absence of birthright joint; living father possesses absolute, unfettered
                        gift rights.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold text-slate-900">
                        Filing Act, 1908
                      </td>
                      <td className="p-3.5 font-mono text-[#C65378]">Section 18(e)</td>
                      <td className="p-3.5">
                        Filing of Wills is strictly a choice; plain plain paper Wills are
                        fully valid if checked.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold text-slate-900">
                        West Bengal Land Reforms Act, 1955
                      </td>
                      <td className="p-3.5 font-mono text-[#C65378]">Section 50</td>
                      <td className="p-3.5">
                        Step for name change of land records on Banglarbhumi upon Will or
                        no-Will estate.
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                <div className="w-12 h-12 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  AM
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#172228]">Lawyer Anuj Anand Malik</h3>
                  <p className="text-[11px] text-[#C65378] font-bold">Senior Estate Counsel</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reviewed and vetted under Dayabhaga Hindu Law, Section 63 of the Indian Succession Act,
                1925, and Calcutta High Court Probate Rules.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span>Checked Legal Draft</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Enforceable
                </span>
              </div>
            </div>

            {/* CARD 2: DUAL CONVERSION CTA BOX */}
            <div className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#253842] text-white p-6 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                <span>LEGAL WILL DRAFTING</span>
              </div>
              <h3 className="text-lg font-extrabold leading-snug">
                Protect Your Family with a Fight-Proof Will
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Draft your legally binding Will online in 10 minutes with our smart questionnaire, or
                consult senior High Court lawyers for custom estate planning in West Bengal.
              </p>
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleStartDraft}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-all shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Valid Will Online (₹0)</span>
                </button>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10"
                >
                  <Gavel className="w-3.5 h-3.5 text-rose-300" />
                  <span>Consult Estate Lawyer</span>
                </Link>
              </div>
            </div>

            {/* CARD 3: RELATED REGIONAL TEMPLATES */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>Regional Will Templates</span>
              </div>
              <div className="space-y-2 text-xs">
                <Link
                  href="/templates/will-format-hindi"
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-[#C65378] transition-colors"
                >
                  • Will Format in Hindi (वसीयতनामा प्रारूप)
                </Link>
                <Link
                  href="/templates/will-format-tamil-uyil-sasanam"
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-[#C65378] transition-colors"
                >
                  • Will Format in Tamil (உயில் சாசனம்)
                </Link>
                <Link
                  href="/templates/will-format-marathi-mrutyupatra"
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-[#C65378] transition-colors"
                >
                  • Will Format in Marathi (मृत्यूपत्र)
                </Link>
                <Link
                  href="/templates/will-format-gujarati-vasiyatnama"
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-[#C65378] transition-colors"
                >
                  • Will Format in Gujarati (વસીયતનામું)
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-[#C65378] transition-colors"
                >
                  • Standard Will Format India (English)
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
