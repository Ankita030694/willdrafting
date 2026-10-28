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
  Eye,
  FileDown,
  MessageSquare,
} from "lucide-react";
import {
  TOC_ITEMS,
  FAQS,
  GLOSSARY_ITEMS,
  COMPARISON_TABLE_DATA,
  MARATHI_WILL_FULL_TEXT,
  ENGLISH_WILL_TRANSLATION,
  DOCTOR_CERTIFICATE_TEXT,
  OG_IMAGE_URL,
} from "./marathiWillData";

export default function WillFormatMarathiClient() {
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
  const [copiedMarathi, setCopiedMarathi] = useState<boolean>(false);
  const [copiedEnglish, setCopiedEnglish] = useState<boolean>(false);
  const [copiedDoctor, setCopiedDoctor] = useState<boolean>(false);
  const [bilingualMode, setBilingualMode] = useState<"marathi" | "english" | "side-by-side">("marathi");

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

  const copyToClipboard = (text: string, type: "marathi" | "english" | "doctor") => {
    navigator.clipboard.writeText(text);
    if (type === "marathi") {
      setCopiedMarathi(true);
      setTimeout(() => setCopiedMarathi(false), 3000);
    } else if (type === "english") {
      setCopiedEnglish(true);
      setTimeout(() => setCopiedEnglish(false), 3000);
    } else {
      setCopiedDoctor(true);
      setTimeout(() => setCopiedDoctor(false), 3000);
    }
  };

  const downloadTextFile = (content: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
            <span>INDIAN SUCCESSION ACT, 1925 • SECTION 63 • MAHARASHTRA RULES</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            मृत्यूपत्र फॉरमॅट मराठी: कायदेशीर नमुना व नियम
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            भारतीय वारसा कायदा १९२५ च्या कलम ६३ नुसार कायदेशीररित्या वैध <strong>मृत्यूपत्र फॉरमॅट मराठी (Will Format in Marathi)</strong> साध्या कागदावर तयार करा. दोन साक्षीदारांचे साक्षांकन, गृहनिर्माण संस्था (CHS) फ्लॅट ट्रान्सफर, प्रोबेट नियम व वकिलांचे थेट मार्गदर्शन.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#marathi-will-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>मृत्यूपत्र नमुना पहा व कॉपी करा</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>ऑनलाइन मृत्यूपत्र तयार करा</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">कलम ६३</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                २ साक्षीदार साक्षांकन अनिवार्य
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹० स्टॅम्प ड्युटी</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                साध्या पांढऱ्या कागदावर १००% वैध
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">ऐच्छिक नोंदणी</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SRO बुक ३ अधिकृत तरतूद
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">मुंबई प्रोबेट</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                हायकोर्ट कलम २१३ कार्यक्षेत्र
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
                <span>विषय सूची (TABLE OF CONTENTS)</span>
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
                <span>कायदेशीर प्राधिकार व अधिनियमे</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                भारतीय वारसा कायदा, १९२५ (कलमे ५९, ६३, ७४, २१३), नोंदणी कायदा, १९०८ (कलम १८), महाराष्ट्र सहकारी संस्था कायदा, १९६० (कलम १५४बी-१३) आणि सर्वोच्च न्यायालयाचे मार्गदर्शक निकाल.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED VISUAL BANNER (OG IMAGE EMBEDDED) */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-[#172228]">
              <Image
                src="/images/will-format-marathi-mrutyupatra-og.jpg"
                alt="मृत्यूपत्र फॉरमॅट मराठी: भारतीय वारसा कायदा कलम ६३ नुसार कायदेशीर नमुना"
                width={1200}
                height={670}
                priority
                className="w-full h-auto object-cover max-h-[460px]"
              />
              <div className="p-4 sm:p-5 bg-gradient-to-t from-[#172228] via-[#172228]/90 to-[#172228]/80 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>महाराष्ट्र व भारतीय कायद्यानुसार प्रमाणित नमुना • कलम ६३ व दोन साक्षीदार आवश्यक</span>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-300">
                  <span>साध्या कागदावर १००% वैध</span>
                </div>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>महत्त्वाचा सारांश: मराठीत मृत्यूपत्र लिहिताना लक्षात ठेवावयाच्या गोष्टी</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>साध्या कागदावर वैधता (Plain Paper Validity):</strong> मृत्यूपत्रासाठी कोणत्याही स्टॅम्प पेपरची (Stamp Paper) अजिबात आवश्यकता नाही. कलम ७४ नुसार पांढऱ्या कागदावर मराठीत लिहिलेले मृत्यूपत्र पूर्णपणे कायदेशीर ठरते.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>दोन स्वतंत्र साक्षीदार (Two Independent Witnesses):</strong> कलम ६३(क) नुसार दोन सज्ञान व्यक्तींनी मृत्युपत्रकर्त्याला सही करताना प्रत्यक्ष पाहणे आणि स्वतः साक्षीदार म्हणून सही करणे आवश्यक आहे. लाभार्थी साक्षीदार असू नये.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>नोंदणी ऐच्छिक परंतु सुरक्षित (Registration is Optional):</strong> नोंदणी कायदा कलम १८(इ) नुसार नोंदणी सक्तीची नाही, मात्र भविष्यातील कौटुंबिक तंटे व खोट्या सह्यांचे आरोप टाळण्यासाठी दुय्यम निबंधकांकडे (SRO) नोंदणी करणे उत्तम.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>सोसायटी फ्लॅट व नॉमिनी (CHS Flat &amp; Nominee):</strong> सुप्रीम कोर्टाच्या *Indrani Wahi* निकालानुसार सोसायटीतील नॉमिनी हा केवळ तात्पुरता विश्वस्त असतो; खरी कायदेशीर मालकी मृत्यूपत्रातील लाभार्थ्यालाच मिळते.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>कायदेशीर चौकट व नियम</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. कायदेशीर पाया: भारतीय वारसा कायदा कलम ६३ चे नियम
              </h2>
              <div className="space-y-3.5 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  महाराष्ट्रामध्ये स्वतःच्या कष्टाने कमावलेल्या स्थावर (घर, फ्लॅट, शेतजमीन) आणि जंगम (बँक ठेवी, शेअर्स, सोने) मालमत्तेचे मृत्यूनंतर वाटप कसे व्हावे, हे ठरवण्यासाठी <strong>मृत्यूपत्र (Will / Testament)</strong> हा सर्वात सुरक्षित आणि कायदेशीर दस्तऐवज आहे. भारतीय वारसा कायदा, १९२५ (Indian Succession Act, 1925) च्या कलम ५९ नुसार, कोणताही सज्ञान आणि निरोगी मानसिक स्थिती असलेला नागरिक स्वतःचे मृत्यूपत्र करू शकतो.
                </p>
                <p>
                  अनेक लोकांचा असा गैरसमज असतो की मृत्यूपत्र केवळ इंग्रजीतच करावे लागते किंवा महागड्या स्टॅम्प पेपरवर नोटरी करणे सक्तीचे असते. भारतीय वारसा कायद्याच्या कलम ७४ मध्ये स्पष्ट म्हटले आहे की, मृत्यूपत्रासाठी कोणतीही विशिष्ट तांत्रिक भाषा आवश्यक नाही. मृत्युपत्रकर्त्याची इच्छा आणि उद्देश स्पष्ट असणे हीच एकमेव कायदेशीर कसोटी आहे. त्यामुळे मराठी भाषेत आपल्या मातृभाषेत लिहिलेले मृत्यूपत्र देशातील कोणत्याही न्यायालयात १००% ग्राह्य धरले जाते.
                </p>
                <p>
                  मात्र, मृत्यूपत्र वैध ठरण्यासाठी कलम ६३ मधील पुढील तीन वैधानिक अटी पूर्ण करणे अनिवार्य आहे:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-black text-[#C65378] uppercase">
                      <FileCheck className="w-4 h-4" />
                      <span>१. मृत्युपत्रकर्त्याची स्वाक्षरी</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      मृत्युपत्रकर्त्याने मृत्यूपत्राच्या प्रत्येक पानावर स्वतःची स्वाक्षरी किंवा अंगठ्याचा ठसा उमटवणे आवश्यक आहे.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-black text-[#C65378] uppercase">
                      <Users className="w-4 h-4" />
                      <span>२. दोन साक्षीदार (कलम ६३)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      किमान दोन स्वतंत्र साक्षीदारांनी मृत्युपत्रकर्त्याला सही करताना प्रत्यक्ष पाहिलेले असावे आणि स्वतः सही करावी.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-black text-[#C65378] uppercase">
                      <Award className="w-4 h-4" />
                      <span>३. साक्षीदारांची पात्रता (कलम ६७)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      ज्या व्यक्तीला मृत्यूपत्रात हिस्सा दिला आहे, ती व्यक्ती किंवा तिचा जोडीदार साक्षीदार असू नये.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: MARATHI WILL TEMPLATE (INTERACTIVE COPY BOX) */}
            <section id="marathi-will-template" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>कायदेशीर मृत्यूपत्र मसुदा</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. मृत्यूपत्र फॉरमॅट मराठी: प्रत्यक्ष कायदेशीर नमुना
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                खाली मुंबई, पुणे, नाशिक, नागपूरसह संपूर्ण महाराष्ट्रात कायदेशीरदृष्ट्या पूर्णपणे ग्राह्य असणारा अधिकृत <strong>मृत्यूपत्र फॉरमॅट मराठी (Mrutyupatra Format)</strong> दिलेला आहे. हा मसुदा तुम्ही कॉपी करू शकता किंवा डाऊनलोड करून साध्या कागदावर टाईप करू शकता.
              </p>

              {/* Template Card Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
                {/* Header Strip with Action Controls */}
                <div className="bg-[#172228] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                      मृत्यूपत्र / इच्छापत्र अधिकृत नमुना (मराठी)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(MARATHI_WILL_FULL_TEXT, "marathi")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs transition-colors shadow-xs"
                      title="संपूर्ण मसुदा कॉपी करा"
                    >
                      {copiedMarathi ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>कॉपी झाले!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>मसुदा कॉपी करा</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        downloadTextFile(MARATHI_WILL_FULL_TEXT, "mrutyupatra-format-marathi.txt")
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                      title="टेक्स्ट फाईल डाऊनलोड करा"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">डाऊनलोड (.txt)</span>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                      title="प्रिंट काढा"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">प्रिंट</span>
                    </button>
                  </div>
                </div>

                {/* Preformatted Template Box */}
                <div className="p-5 sm:p-7 md:p-8 bg-[#FAF7F0]/40 max-h-[550px] overflow-y-auto text-xs sm:text-sm font-serif leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {MARATHI_WILL_FULL_TEXT}
                </div>

                {/* Footnote / Doctor's certificate toggle bar */}
                <div className="p-4 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#5F7E75] shrink-0" />
                    <span>
                      टीप: ब्रॅकेट [ ] मधील माहिती स्वतःच्या मिळकतीनुसार व नावानुसार बदलावी.
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(DOCTOR_CERTIFICATE_TEXT, "doctor")}
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:text-[#a33b5c] transition-colors"
                  >
                    {copiedDoctor ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">डॉक्टर प्रमाणपत्र कॉपी झाले!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>डॉक्टरांचे मानसिक प्रमाणपत्र कॉपी करा</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 3: BILINGUAL COMPARISON TOGGLE */}
            <section id="bilingual-will-comparison" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>द्विभाषिक तुलना व भाषांतर</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. द्विभाषिक तुलना: मराठी नमुना आणि इंग्रजी भाषांतर
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                कुटुंबातील इतर सदस्यांना किंवा बँकेत/सोसायटीत सादर करण्यासाठी बऱ्याचदा मराठी मृत्यूपत्राचा इंग्रजी अनुवाद लागतो. खालील बटणे वापरून तुम्ही मराठी आणि इंग्रजी कायदेशीर मजकुराची तुलना करू शकता.
              </p>

              {/* Toggle Buttons */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setBilingualMode("marathi")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    bilingualMode === "marathi"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  मराठी मूळ मजकूर (Marathi View)
                </button>
                <button
                  onClick={() => setBilingualMode("english")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    bilingualMode === "english"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  इंग्रजी भाषांतर (English Translation)
                </button>
                <button
                  onClick={() => setBilingualMode("side-by-side")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    bilingualMode === "side-by-side"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  दोन्ही बाजूला (Side-by-Side Dual View)
                </button>
              </div>

              {/* Render Based on Mode */}
              {bilingualMode === "side-by-side" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-[#C65378] uppercase">
                        मराठी मसुदा (Native Marathi)
                      </span>
                      <button
                        onClick={() => copyToClipboard(MARATHI_WILL_FULL_TEXT, "marathi")}
                        className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>कॉपी</span>
                      </button>
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed font-serif max-h-[400px] overflow-y-auto whitespace-pre-wrap">
                      {MARATHI_WILL_FULL_TEXT}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-700 uppercase">
                        इंग्रजी भाषांतर (English Legal Translation)
                      </span>
                      <button
                        onClick={() => copyToClipboard(ENGLISH_WILL_TRANSLATION, "english")}
                        className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed font-serif max-h-[400px] overflow-y-auto whitespace-pre-wrap">
                      {ENGLISH_WILL_TRANSLATION}
                    </div>
                  </div>
                </div>
              ) : bilingualMode === "english" ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#5F7E75]" />
                      <span className="text-sm font-bold text-slate-900">
                        Official English Translation of Marathi Will Format
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(ENGLISH_WILL_TRANSLATION, "english")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                    >
                      {copiedEnglish ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEnglish ? "Copied" : "Copy English Text"}</span>
                    </button>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 font-serif leading-relaxed whitespace-pre-wrap max-h-[450px] overflow-y-auto">
                    {ENGLISH_WILL_TRANSLATION}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-[#C65378]" />
                      <span className="text-sm font-bold text-slate-900">
                        मराठी मूळ कायदेशीर मसुदा (Native Marathi Template)
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(MARATHI_WILL_FULL_TEXT, "marathi")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C65378] text-white text-xs font-bold hover:bg-[#a33b5c]"
                    >
                      {copiedMarathi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedMarathi ? "कॉपी झाले" : "मराठी मजकूर कॉपी करा"}</span>
                    </button>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 font-serif leading-relaxed whitespace-pre-wrap max-h-[450px] overflow-y-auto">
                    {MARATHI_WILL_FULL_TEXT}
                  </div>
                </div>
              )}
            </section>

            {/* SECTION 4: MAHARASHTRA LEGAL NUANCES */}
            <section id="maharashtra-legal-nuances" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>महाराष्ट्र विशिष्ट कायदेशीर बारकावे</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. मुंबई व महाराष्ट्रातील विशेष कायदेशीर तरतुदी
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  महाराष्ट्रामध्ये मृत्यूपत्र करताना इतर राज्यांपेक्षा काही अतिशय महत्त्वाचे स्थानिक कायदेशीर नियम आणि हायकोर्टाचे अधिकारक्षेत्र लागू होते:
                </p>

                {/* 3 Nuance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#172228]">
                      <Scale className="w-4 h-4 text-[#C65378]" />
                      <span>१. मुंबई शहर कार्यक्षेत्रात प्रोबेटची सक्ती (Probate Rule)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      भारतीय वारसा कायदा कलम ५७ व २१३(२) नुसार, मुंबई उच्च न्यायालयाच्या मूळ अधिकारक्षेत्रात (Ordinary Original Civil Jurisdiction - म्हणजे कुलाबा ते माहीम/शीव) केलेली किंवा या क्षेत्रातील स्थावर मालमत्तेशी संबंधित असलेल्या हिंदू मृत्यूपत्रांचे <strong>प्रोबेट (Probate)</strong> घेणे कायद्याने बंधनकारक आहे. मात्र ठाणे, नवी मुंबई, पुणे किंवा नागपूर येथील मालमत्तांसाठी प्रोबेट सक्तीचे नाही.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#172228]">
                      <Building2 className="w-4 h-4 text-[#5F7E75]" />
                      <span>२. सहकारी गृहनिर्माण संस्था फ्लॅट ट्रान्सफर (MCS Act 154B-13)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      महाराष्ट्र सहकारी संस्था कायदा कलम १५४बी-१३ आणि नवीन मॉडेल बाय-लॉ ३४-३५ नुसार, सोसायटी सभासदाच्या मृत्यूनंतर फ्लॅट शेअर्स केवळ नॉमिनीच्या नावे तात्पुरते वर्ग होतात. सर्वोच्च न्यायालयाच्या <em>Indrani Wahi</em> निकालानुसार खरी कायदेशीर मालकी मृत्यूपत्रातील लाभार्थ्याकडेच राहते.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#172228]">
                      <MapPin className="w-4 h-4 text-emerald-700" />
                      <span>३. शेतजमीन व ७/१२ फेरफार नोंद (Maharashtra Land Revenue)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      महाराष्ट्रातील शेतजमीन किंवा प्लॉटच्या बाबतीत, नोंदणीकृत मृत्यूपत्राच्या आधारे तलाठी कार्यालयात कलम १४९ महाराष्ट्र जमीन महसूल संहितेनुसार थेट वारस फेरफार (Mutation Entry) नोंदवता येतो. मृत्यूपत्र नोंदणीकृत असल्यास महसूल अधिकाऱ्यांना नोंद करणे सुलभ होते.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#172228]">
                      <Lock className="w-4 h-4 text-rose-700" />
                      <span>४. SRO कार्यालयात मृत्यूपत्र नोंदणी फी व प्रक्रिया</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      महाराष्ट्रात दुय्यम निबंधक कार्यालयात (SRO) मृत्यूपत्र नोंदणीसाठी फक्त ₹१०० नोंदणी फी आणि ₹२० प्रति पान स्कॅनिंग फी लागते. स्टॅम्प ड्युटी शून्य (₹०) असते. नोंदणीसाठी दोन साक्षीदार प्रत्यक्ष हजर राहावे लागतात.
                    </p>
                  </div>
                </div>

                {/* MID-ARTICLE CONTEXTUAL LINK TO INTERACTIVE TOOL */}
                <div className="rounded-2xl bg-gradient-to-r from-rose-50 via-white to-emerald-50 border border-[#C65378]/25 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#C65378] tracking-wider">
                      <Calculator className="w-4 h-4" />
                      <span>संबंधित उपयुक्त कर कॅल्क्युलेटर</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                      वारशाने मिळालेल्या मिळकतीची विक्री करताना भांडवली नफा कर किती लागेल?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                      मृत्यूपत्राद्वारे वारसा हक्काने मिळालेले घर किंवा शेतजमीन विकताना बजेट २०२४ नुसार १२.५% फ्लॅट कर की २०% इंडेक्सेशन कर कोणता फायदेशीर ठरेल? आमचे मोफत कॅल्क्युलेटर वापरून त्वरित तपासा.
                    </p>
                  </div>
                  <Link
                    href="/tools/capital-gains-tax-calculator-inherited-property"
                    className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#172228] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-transform hover:-translate-y-0.5 shadow-md"
                  >
                    <span>कॅल्क्युलेटर वापरा</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 5: COMPARISON TABLE */}
            <section id="legal-comparison-matrix" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>कायदेशीर पर्यायांची तुलना</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. तुलना तक्ता: नोंदणीकृत मृत्यूपत्र विरुद्ध इतर पर्याय
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                स्वतःच्या मिळकतीचे वाटप करताना नोंदणीकृत मृत्यूपत्र, साध्या कागदावरील मृत्यूपत्र, बक्षीसपत्र (Gift Deed) आणि विना-मृत्यूपत्र वारसा हक्क यामध्ये नेमका काय फरक आहे ते खालील तक्त्यावरून समजून घ्या:
              </p>

              {/* Responsive HTML Comparison Table */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#172228] text-white">
                        <th className="p-3.5 sm:p-4 font-bold border-b border-slate-700 min-w-[130px]">
                          तुलनेचे निकष
                        </th>
                        <th className="p-3.5 sm:p-4 font-bold border-b border-slate-700 text-rose-300 min-w-[150px]">
                          नोंदणीकृत मृत्यूपत्र
                        </th>
                        <th className="p-3.5 sm:p-4 font-bold border-b border-slate-700 min-w-[150px]">
                          साध्या कागदावरील मृत्यूपत्र
                        </th>
                        <th className="p-3.5 sm:p-4 font-bold border-b border-slate-700 min-w-[140px]">
                          बक्षीसपत्र (Gift Deed)
                        </th>
                        <th className="p-3.5 sm:p-4 font-bold border-b border-slate-700 min-w-[140px]">
                          विना-मृत्यूपत्र वारसा
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {COMPARISON_TABLE_DATA.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                          <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/80">
                            {row.feature}
                          </td>
                          <td className="p-3.5 sm:p-4 font-semibold text-[#C65378] bg-rose-50/30">
                            {row.registeredWill}
                          </td>
                          <td className="p-3.5 sm:p-4">{row.unregisteredWill}</td>
                          <td className="p-3.5 sm:p-4">{row.giftDeed}</td>
                          <td className="p-3.5 sm:p-4 text-slate-500">{row.intestate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 6: LEGAL GLOSSARY (MARATHI TO ENGLISH) */}
            <section id="legal-glossary-marathi-english" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>कायदेशीर संज्ञा व अर्थ</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. मराठी ते इंग्रजी कायदेशीर संज्ञा शब्दकोश
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                मृत्यूपत्र, दस्तनोंदणी आणि महसूल दप्तरी वापरल्या जाणाऱ्या महत्त्वाच्या मराठी शब्दांचे इंग्रजी कायदेशीर प्रतिशब्द व त्यांचा अचूक अर्थ खाली दिला आहे:
              </p>

              {/* Glossary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {GLOSSARY_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1 hover:border-[#C65378]/40 transition-colors shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-sm">{item.marathi}</span>
                      <span className="text-xs font-bold text-[#C65378] px-2 py-0.5 rounded-full bg-rose-50">
                        {item.english}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="step-by-step-guide" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>कृती आराखडा व टप्पे</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. टप्प्याटप्प्याने प्रक्रिया: मृत्यूपत्र कसे तयार करावे?
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                मृत्यूपत्र तयार करताना कोणतीही चूक होऊ नये आणि भविष्यात ते न्यायालयात निर्विवाद सिद्ध व्हावे, यासाठी खालील ५ सोप्या टप्प्यांचा अवलंब करा:
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-2xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                    १
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      सर्व मिळकतींची यादी आणि कागदपत्रे गोळा करणे (Asset Audit)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      स्वतःच्या नावावर असणाऱ्या सर्व स्थावर मिळकतींची इंडेक्स २ प्रत, खरेदीखत, सोसायटी शेअर सर्टिफिकेट, ७/१२ उतारा आणि बँक खात्यांचे पासबुक समोर ठेवा.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-2xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                    २
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      विश्वासू अंमलबजावणीदार (Executor) व दोन साक्षीदारांची निवड
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      मृत्यूपत्राची अंमलबजावणी करण्यासाठी विश्वासू मित्राची किंवा नातेवाईकाची अंमलबजावणीदार म्हणून निवड करा. तसेच मृत्यूपत्रात हिस्सा नसणाऱ्या दोन स्वतंत्र साक्षीदारांची निश्चिती करा.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-2xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                    ३
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      साध्या पांढऱ्या कागदावर मराठीत मसुदा टाईप करणे
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      वरील परिच्छेद २ मधील अधिकृत फॉरमॅटनुसार साध्या A4 आकाराच्या पांढऱ्या कागदावर मृत्यूपत्र टाईप करा. मालमत्तेचे वाटप कोणाला आणि किती प्रमाणात करायचे ते स्पष्ट लिहा.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-2xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                    ४
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      दोन साक्षीदारांच्या प्रत्यक्ष उपस्थितीत स्वाक्षरी (Execution)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      मृत्युपत्रकर्त्याने दोन साक्षीदारांसमोर सही करावी. त्यानंतर दोन्ही साक्षीदारांनी मृत्युपत्रकर्त्यासमोर साक्षांकन विधानावर स्वाक्षरी व पूर्ण पत्ता लिहावा (कलम ६३).
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-2xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#5F7E75] text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                    ५
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      दुय्यम निबंधक कार्यालयात (SRO) नोंदणी करणे (ऐच्छिक परंतु फायदेशीर)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      मृत्यूपत्र अधिक सुरक्षित करण्यासाठी स्थानिक दुय्यम निबंधक कार्यालयात (Sub-Registrar Office) जाऊन ₹१०० भरून नोंदणी करा. नोंदणीमुळे मृत्यूपत्र हरवण्याची किंवा नष्ट होण्याची भीती उरत नाही.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>शंका निरसन</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. वारंवार विचारले जाणारे प्रश्न: मृत्यूपत्र मार्गदर्शन
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                मराठीत मृत्यूपत्र लिहिताना नागरिकांच्या मनात वारंवार निर्माण होणाऱ्या महत्त्वाच्या कायदेशीर प्रश्नांची उत्तरे:
              </p>

              {/* Accordion Container */}
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
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

            {/* SECTION 9: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>कायदेशीर संदर्भ व प्राधिकार</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. कायदेशीर संदर्भ आणि सर्वोच्च न्यायालय निकाल
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-xs sm:text-sm">
                <p>
                  या पृष्ठावरील माहिती आणि मृत्यूपत्र नमुना खालील केंद्रीय व राज्यस्तरीय कायदे आणि उच्च व सर्वोच्च न्यायालयाच्या निर्देशांवर आधारित आहे:
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-600">
                  <li>
                    <strong>भारतीय वारसा कायदा, १९२५ (Indian Succession Act, 1925):</strong> कलम ५९ (सक्षम मन), कलम ६३ (मृत्यूपत्राचे साक्षांकन), कलम ७४ (भाषेची सक्ती नसणे), कलम २१३ (मुंबई उच्च न्यायालय प्रोबेट कार्यक्षेत्र).
                  </li>
                  <li>
                    <strong>नोंदणी कायदा, १९०८ (Registration Act, 1908):</strong> कलम १८(इ) (मृत्यूपत्र नोंदणी ऐच्छिक), कलम ४२ (सीलबंद पाकिटात मृत्यूपत्र जमा ठेवणे).
                  </li>
                  <li>
                    <strong>महाराष्ट्र सहकारी संस्था कायदा, १९६० (MCS Act, 1960):</strong> कलम १५४बी-१३ (फ्लॅट ट्रान्सफर व नॉमिनीचे अधिकार).
                  </li>
                  <li>
                    <strong>इंद्राणी वाही विरुद्ध निबंधक (Indrani Wahi v. Registrar of Co-op Societies, 2016 SC):</strong> सुप्रीम कोर्टाचा निकाल - नॉमिनी केवळ विश्वस्त असून कायदेशीर मालक मृत्यूपत्रातील वारसच असतो.
                  </li>
                  <li>
                    <strong>एच. वेंकटचाला अय्यंगार विरुद्ध बी.एन. थिम्मजम्मा (1959 SC):</strong> मृत्यूपत्राची सत्यता सिद्ध करण्यासाठी संशयास्पद परिस्थिती दूर करण्याची जबाबदारी.
                  </li>
                </ul>

                <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                  <span>अधिकृत शासकीय पोर्टल:</span>
                  <a
                    href="https://igrmaharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C65378] hover:underline"
                  >
                    <span>IGR Maharashtra</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <Link href="/templates" className="text-[#C65378] hover:underline">
                    सर्व कायदेशीर टेम्पलेट्स
                  </Link>
                  <span>•</span>
                  <Link href="/services/will-registration" className="text-[#C65378] hover:underline">
                    मृत्यूपत्र नोंदणी सेवा
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD (NO PHONE NUMBER!) */}
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
                Specialist in Indian testamentary jurisprudence, Bombay High Court probate matters, Section 63 witness compliance, and Maharashtra Co-operative Housing Society flat transmission.
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
                  <span>कौटुंबिक वाद व कोर्ट कचेरी टाळा</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  आपले कायदेशीर मृत्यूपत्र १५ मिनिटांत तयार करा
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  वकिलांनी तपासलेला, कलम ६३ नुसार दोन साक्षीदारांसह साध्या कागदावर १००% कायदेशीर मृत्यूपत्र मसुदा काही मिनिटांत तयार करा.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>मृत्यूपत्र ड्राफ्ट सुरू करा</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card - NO PHONE NUMBER!) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>सल्लागार वकील विभाग</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  जटिल मालमत्ता किंवा हायकोर्ट प्रोबेट सल्ला हवा आहे?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  मुंबई, पुणे व महाराष्ट्रातील अनुभवी उत्तराधिकार वकिलांसोबत थेट सल्लामसलत बुक करा.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>वकिलांचा कायदेशीर सल्ला घ्या</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  महाराष्ट्रातील कुटुंबे WillDrafting वर का विश्वास ठेवतात?
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>कलम ६३ पडताळणी:</strong> दोन साक्षीदारांचे साक्षांकन काटेकोरपणे पाळले जाते.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>CHS फ्लॅट संरक्षण:</strong> सोसायटी बाय-लॉ व सुप्रीम कोर्ट नियमांशी सुसंगत.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>स्थानिक भाषा:</strong> मराठी आणि इंग्रजी दोन्ही भाषांमध्ये स्पष्ट मसुदा.
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
          href="#marathi-will-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>मृत्यूपत्र नमुना</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>मृत्यूपत्र बनवा</span>
        </button>
      </div>
    </div>
  );
}
