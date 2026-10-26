"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import { useLanguage } from "@/context/LanguageContext";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Printer,
  Download,
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
  AlertCircle,
  FileCheck,
  Languages,
  PenLine,
  Moon,
} from "lucide-react";
import { FAQS, HOWTO_STEPS, OG_IMAGE_PATH } from "./willFormatHindiData";

const TOC_ITEMS = [
  { id: "plain-paper-validity", label: "1. सादे कागज़ पर वसीयत" },
  { id: "section-63-rules", label: "2. धारा 63 के नियम" },
  { id: "hindi-will-template", label: "3. वसीयतनामा फॉर्मेट" },
  { id: "validity-checklist", label: "4. वैधता जाँच सूची" },
  { id: "section-67-warning", label: "5. धारा 67 चेतावनी" },
  { id: "visual-blueprint", label: "6. वसीयत की संरचना" },
  { id: "step-by-step-guide", label: "7. वसीयत कैसे लिखें" },
  { id: "three-common-mistakes", label: "8. 3 सबसे आम गलतियाँ" },
  { id: "comparison-table", label: "9. तुलना तालिका" },
  { id: "language-rules", label: "10. भाषा और अनुवाद के नियम" },
  { id: "specialized-scenarios", label: "11. विशेष स्थितियाँ" },
  { id: "institutional-backing", label: "12. AMA Legal Solutions" },
  { id: "frequently-asked-questions", label: "13. अक्सर पूछे जाने वाले प्रश्न" },
  { id: "statutory-citations", label: "14. कानूनी संदर्भ" },
];

const TEMPLATE_TEXT = `वसीयतनामा (अंतिम वसीयत)

मैं, [वसीयतकर्ता का पूरा नाम], पुत्र/पुत्री/पत्नी श्री [पिता/पति का नाम], आयु लगभग [आयु] वर्ष, निवासी [पूरा स्थायी पता], पैन नंबर [पैन], आधार नंबर XXXX-XXXX-[अंतिम 4 अंक], एतद्द्वारा अपनी पूर्व में की गई सभी वसीयतों, कोडिसिल (वसीयत-पूरक) और वसीयती व्यवस्थाओं को रद्द करता/करती हूँ। मैं घोषणा करता/करती हूँ कि यह मेरी अंतिम वसीयत है।

1. स्वस्थ मानसिक स्थिति की घोषणा
मैं घोषणा करता/करती हूँ कि मैं पूरी तरह स्वस्थ चित्त और समझ की स्थिति में हूँ। मैं यह वसीयत अपनी स्वतंत्र इच्छा से लिख रहा/रही हूँ। इस पर किसी व्यक्ति का कोई दबाव, धोखा, भय या अनुचित प्रभाव नहीं है।

2. निष्पादक (एग्ज़ीक्यूटर) की नियुक्ति
मैं श्री/श्रीमती [निष्पादक का नाम], पुत्र/पुत्री [पिता का नाम], निवासी [पता] को इस वसीयत का निष्पादक नियुक्त करता/करती हूँ।
यदि वे मुझसे पहले न रहें, यह दायित्व लेने से मना करें या कार्य करने में असमर्थ हों, तो मैं श्री/श्रीमती [वैकल्पिक निष्पादक का नाम], निवासी [पता] को वैकल्पिक निष्पादक नियुक्त करता/करती हूँ।

3. ऋण और अंतिम संस्कार का खर्च
मेरा निर्देश है कि मेरे सभी वैध ऋण, वसीयत से जुड़े खर्च और अंतिम संस्कार का खर्च मेरी संपत्ति में से निष्पादक द्वारा चुकाया जाए।

4. अचल संपत्ति (अनुसूची 'क')
अनुसूची 'क' में वर्णित अचल संपत्ति [मेरी स्व-अर्जित संपत्ति है / पैतृक संपत्ति में मेरा अविभाजित हिस्सा है]। मेरी मृत्यु के बाद:
(क) [संपत्ति का पूरा पता, खसरा/सर्वे नंबर, रजिस्ट्री विवरण] पर स्थित मेरी आवासीय संपत्ति मेरे/मेरी [संबंध], [लाभार्थी 1 का नाम] को पूर्ण स्वामित्व अधिकारों के साथ प्राप्त होगी।
(ख) [अन्य अचल संपत्ति और उसके लाभार्थी का विवरण, यदि हो]।

5. चल संपत्ति (अनुसूची 'ख')
मेरी मृत्यु के बाद:
(क) [बैंक का नाम, शाखा] में मेरे बचत खाता संख्या [खाता संख्या] की पूरी राशि [लाभार्थी 2 का नाम] को प्राप्त होगी।
(ख) [डिपॉजिटरी पार्टिसिपेंट का नाम] के पास मेरे डीमैट खाते (DP ID [ ], Client ID [ ]) में रखे सभी शेयर और प्रतिभूतियाँ [लाभार्थी 3 का नाम] को प्राप्त होंगी।
(ग) मेरे सोने-चाँदी के आभूषण और अन्य कीमती वस्तुएँ [लाभार्थी का नाम] को प्राप्त होंगी।

6. नाबालिग संतान के संरक्षक (यदि लागू हो)
यदि मेरी मृत्यु के समय मेरी कोई संतान नाबालिग हो, तो मैं [संरक्षक का नाम], निवासी [पता] को उसका संरक्षक नियुक्त करता/करती हूँ।

7. शेष संपत्ति (अवशिष्ट खंड)
जिस संपत्ति का इस वसीयत में अलग से उल्लेख नहीं है, या जो संपत्ति मुझे भविष्य में प्राप्त हो, वह सभी चल और अचल संपत्ति मेरे/मेरी [संबंध], [लाभार्थी का नाम] को प्राप्त होगी।

8. नॉमिनी (नामांकन) के संबंध में स्पष्टीकरण
बैंक, हाउसिंग सोसायटी या डिपॉजिटरी में दर्ज नॉमिनी केवल संपत्ति प्राप्त करके उसे इस वसीयत के लाभार्थियों को सौंपने के लिए होंगे। जहाँ तक कानून अनुमति देता है, इन संपत्तियों का पूर्ण स्वामित्व इस वसीयत में नामित लाभार्थियों का होगा।

साक्ष्य स्वरूप, मैंने आज दिनांक [दिन] [माह] [वर्ष] को [शहर/स्थान] में इस वसीयत पर अपने हस्ताक्षर किए हैं। इस वसीयत में कुल [ ] पृष्ठ हैं और प्रत्येक पृष्ठ पर मेरे हस्ताक्षर हैं।

___________________________________
वसीयतकर्ता के हस्ताक्षर / अंगूठे का निशान
[वसीयतकर्ता का पूरा नाम]

गवाहों का सत्यापन (भारतीय उत्तराधिकार अधिनियम, 1925 की धारा 63 के अंतर्गत)
हम, नीचे हस्ताक्षर करने वाले गवाह, प्रमाणित करते हैं कि उपरोक्त वसीयतकर्ता [वसीयतकर्ता का नाम] ने हमारी उपस्थिति में इस वसीयत पर हस्ताक्षर किए हैं। हमने वसीयतकर्ता के अनुरोध पर और उनकी उपस्थिति में गवाह के रूप में हस्ताक्षर किए हैं। हम पुष्टि करते हैं कि हम या हमारे जीवनसाथी इस वसीयत के लाभार्थी नहीं हैं।

गवाह 1:
हस्ताक्षर: ___________________________
पूरा नाम: [गवाह 1 का नाम]
पिता का नाम: [पिता का नाम]
आयु और व्यवसाय: [आयु / व्यवसाय]
पूरा पता: [पता]
दिनांक: [दिनांक]

गवाह 2:
हस्ताक्षर: ___________________________
पूरा नाम: [गवाह 2 का नाम]
पिता का नाम: [पिता का नाम]
आयु और व्यवसाय: [आयु / व्यवसाय]
पूरा पता: [पता]
दिनांक: [दिनांक]

अनुसूची 'क': अचल संपत्ति
1. संपत्ति का विवरण: [मकान / फ्लैट / प्लॉट / कृषि भूमि]
   क्षेत्रफल और सीमाएँ: पूर्व: [ ], पश्चिम: [ ], उत्तर: [ ], दक्षिण: [ ]
   रजिस्ट्री/बैनामा संख्या: [दस्तावेज़ संख्या और उप-पंजीयक कार्यालय]

अनुसूची 'ख': चल संपत्ति
1. बैंक खाते और एफडी: [बैंक का नाम, खाता संख्या, IFSC]
2. डीमैट और म्यूचुअल फंड: [DP ID, Client ID, फोलियो नंबर]
3. बीमा पॉलिसी: [बीमा कंपनी, पॉलिसी नंबर]
4. आभूषण और अन्य कीमती वस्तुएँ: [विवरण]`;

const CLAUSE_ANNOTATIONS = [
  {
    clause: "स्वस्थ मानसिक स्थिति की घोषणा",
    statute: "धारा 59, ISA 1925",
    rationale:
      "वसीयत वही बना सकता है जो बालिग हो और स्वस्थ चित्त हो। यह घोषणा बाद में मानसिक अक्षमता के आरोपों के खिलाफ़ पहला बचाव है।",
  },
  {
    clause: "पुरानी वसीयतें रद्द करना",
    statute: "धारा 62 और 70, ISA 1925",
    rationale:
      "वसीयत जीवनभर बदली जा सकती है। यह खंड पुरानी या भूली हुई वसीयतों को साफ़ तौर पर रद्द करता है, ताकि दो वसीयतों में टकराव न हो।",
  },
  {
    clause: "निष्पादक की नियुक्ति",
    statute: "धारा 222, ISA 1925",
    rationale:
      "प्रोबेट केवल वसीयत में नामित निष्पादक को दिया जा सकता है। वैकल्पिक निष्पादक होने से काम नहीं रुकता, भले ही पहला निष्पादक उपलब्ध न हो।",
  },
  {
    clause: "संपत्ति का स्पष्ट विवरण",
    statute: "धारा 74 और 82, ISA 1925",
    rationale:
      "वसीयत में खास कानूनी शब्द ज़रूरी नहीं, पर इरादा साफ़ होना चाहिए। खसरा नंबर, खाता संख्या और फोलियो नंबर लिखने से परिवार में अलग-अलग अर्थ निकालने की गुंजाइश नहीं रहती।",
  },
  {
    clause: "नाबालिग के संरक्षक",
    statute: "धारा 9, HMGA 1956",
    rationale:
      "हिंदू माता-पिता वसीयत से संरक्षक नियुक्त कर सकते हैं। ध्यान दें: पिता द्वारा नियुक्त संरक्षक तभी प्रभावी होता है जब माँ जीवित न हो, या माँ ने कोई और संरक्षक नियुक्त न किया हो।",
  },
  {
    clause: "अवशिष्ट खंड (शेष संपत्ति)",
    statute: "धारा 8 और 15, HSA 1956",
    rationale:
      "जो संपत्ति वसीयत में छूट जाती है, वह निर्वसीयत उत्तराधिकार के नियमों से बँटती है। यह खंड भविष्य में खरीदी गई या भूली हुई संपत्ति को भी आपकी इच्छा के अनुसार बाँटता है।",
  },
  {
    clause: "नॉमिनी स्पष्टीकरण",
    statute: "शक्ति येज़दानी (SC, 2023)",
    rationale:
      "नॉमिनी आमतौर पर केवल संरक्षक होता है, मालिक नहीं। अपवाद: बीमा अधिनियम की धारा 39 के तहत माता-पिता, पति/पत्नी या संतान लाभकारी नॉमिनी हो सकते हैं। इसलिए बीमा नॉमिनेशन को वसीयत से मिलाकर रखें।",
  },
  {
    clause: "दो गवाहों का सत्यापन",
    statute: "धारा 63(c), ISA 1925",
    rationale:
      "यह वसीयत की कानूनी नींव है। दो गवाहों के सत्यापन के बिना वसीयत को अदालत में साबित करना लगभग असंभव हो जाता है।",
  },
];

const CHECKLIST_ITEMS = [
  {
    id: "check-1",
    label: "आयु और मानसिक क्षमता",
    subtext: "वसीयतकर्ता 18 वर्ष से अधिक का है और अपनी संपत्ति को समझता है (धारा 59)।",
  },
  {
    id: "check-2",
    label: "सादा कागज़ पर्याप्त है",
    subtext: "वसीयत सादे कागज़ पर टाइप या हाथ से लिखी है। स्टाम्प पेपर की ज़रूरत नहीं है।",
  },
  {
    id: "check-3",
    label: "निष्पादक और वैकल्पिक निष्पादक",
    subtext: "एक भरोसेमंद व्यक्ति का नाम निष्पादक के रूप में साफ़ लिखा है।",
  },
  {
    id: "check-4",
    label: "दो स्वतंत्र गवाह",
    subtext: "दोनों गवाह बालिग हैं और न वे, न उनके जीवनसाथी लाभार्थी हैं (धारा 67)।",
  },
  {
    id: "check-5",
    label: "संपत्ति की स्पष्ट पहचान",
    subtext: "ज़मीन-मकान के साथ खसरा/सर्वे नंबर और खातों के साथ खाता संख्या लिखी है।",
  },
  {
    id: "check-6",
    label: "अवशिष्ट खंड शामिल है",
    subtext: "छूटी हुई या भविष्य की संपत्ति के लिए शेष संपत्ति का खंड जोड़ा गया है।",
  },
  {
    id: "check-7",
    label: "हर पृष्ठ पर हस्ताक्षर और तारीख",
    subtext: "हर पृष्ठ पर वसीयतकर्ता के हस्ताक्षर हैं और अंत में तारीख व स्थान लिखा है।",
  },
];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const PRINTABLE_HTML = `<!DOCTYPE html><html lang="hi"><head><meta charset="utf-8"><title>वसीयतनामा फॉर्मेट - WillDrafting.in</title>
<style>body{font-family:'Noto Sans Devanagari','Mangal','Nirmala UI',sans-serif;font-size:13pt;line-height:1.75;color:#111;margin:2cm;white-space:pre-wrap;}</style>
</head><body>${escapeHtml(TEMPLATE_TEXT)}</body></html>`;

export default function WillFormatHindiClient() {
  const { status } = useSession();
  const router = useRouter();
  const { setLang } = useLanguage();

  // Opens the existing bilingual wizard in Hindi, since the visitor came from the Hindi page.
  const handleStartDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setLang("hi");
    if (status === "authenticated") {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const [activeId, setActiveId] = useState<string>("plain-paper-validity");
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    "check-1": true,
    "check-2": true,
    "check-3": false,
    "check-4": true,
    "check-5": false,
    "check-6": false,
    "check-7": true,
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

  const handleCopy = () => {
    navigator.clipboard.writeText(TEMPLATE_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Prints only the template (not the whole page) so users can "Save as PDF" a clean format.
  const handlePrint = () => {
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) {
      window.print();
      return;
    }
    win.document.open();
    win.document.write(PRINTABLE_HTML);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
  };

  // Word-compatible download (HTML saved as .doc opens directly in MS Word / Google Docs).
  const handleDownloadWord = () => {
    const blob = new Blob(["\ufeff", PRINTABLE_HTML], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vasiyatnama-format-hindi-willdrafting.doc";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const isAllValid = checkedCount === CHECKLIST_ITEMS.length;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Bilingual Toggle: Hindi (current) / English (/templates/will-format-india) */}
          <div
            className="inline-flex items-center p-1 rounded-full bg-white/10 border border-white/15 mb-6"
            role="group"
            aria-label="भाषा चुनें / Choose language"
          >
            <span
              aria-current="page"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-[#172228] text-xs font-bold"
            >
              <Languages className="w-3.5 h-3.5 text-[#C65378]" />
              हिंदी
            </span>
            <Link
              href="/templates/will-format-india"
              hrefLang="en-IN"
              lang="en"
              onClick={() => setLang("en")}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              English
            </Link>
          </div>

          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200">
              <FileText className="w-4 h-4 text-[#C65378]" />
              <span>भारतीय उत्तराधिकार अधिनियम &bull; हिंदी वसीयत प्रारूप</span>
            </div>
          </div>

          {/* Single H1 (54 chars, distinct from SEO title, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-snug text-white mb-6 drop-shadow-xs">
            वसीयतनामा फॉर्मेट: हिंदी में कानूनी रूप से मान्य वसीयत
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            सरल हिंदी में मुफ्त वसीयतनामा का नमूना। हर खंड का कानूनी कारण समझें, धारा 63 के गवाह नियम जानें और सादे कागज़ पर अपनी वसीयत आज ही तैयार करें।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>15 मिनट में वसीयत बनाएँ</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#hindi-will-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>मुफ्त फॉर्मेट नीचे देखें</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP
          ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ वर्ष
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-wide text-[#55636D] mt-2">
                कानूनी अनुभव
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-wide text-[#55636D] mt-2">
                मामले संभाले
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹2,500 करोड़+
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-wide text-[#55636D] mt-2">
                संपत्ति सुरक्षित
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-4 md:border-l md:border-[#172228]/12">
              <svg className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 sm:w-8 sm:h-8 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                4.9/5
              </span>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] sm:text-xs font-bold text-[#172228]">1,300+</span>
                <span className="text-[10px] sm:text-[11px] tracking-wide text-[#55636D] font-semibold">
                  समीक्षाएँ
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          {/* ===================== LEFT COLUMN: STICKY TOC ===================== */}
          <aside className="sticky top-6 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-[#172228]">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black tracking-wide text-slate-700">विषय सूची</span>
              </div>
              <nav aria-label="विषय सूची" className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-[13px] py-2 px-3 rounded-lg transition-all leading-snug ${
                      activeId === item.id
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>कानूनी आधार</span>
              </div>
              <p className="leading-relaxed text-[12px]">
                भारतीय उत्तराधिकार अधिनियम, 1925 की धारा 63 और रजिस्ट्रेशन अधिनियम, 1908 की धारा 18 के अनुसार तैयार।
              </p>
            </div>
          </aside>

          {/* ===================== MIDDLE COLUMN: MAIN CONTENT ===================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE SUMMARY BOX */}
            <div className="rounded-2xl bg-white border border-slate-200/90 border-l-[6px] border-l-[#C65378] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black tracking-wide text-[#C65378]">
                  संक्षेप में: हिंदी वसीयत की ज़रूरी बातें
                </span>
              </div>
              <p className="text-lg font-bold text-slate-900 mb-3">
                भारत में मान्य वसीयत के 4 मुख्य नियम
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-1" />
                  <span>
                    <strong>हिंदी पूरी तरह मान्य है:</strong> वसीयत किसी भी भाषा में लिखी जा सकती है। ज़रूरी है कि आपकी इच्छा साफ़ हो।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-1" />
                  <span>
                    <strong>स्टाम्प पेपर ज़रूरी नहीं:</strong> सादे सफ़ेद कागज़ पर लिखी वसीयत पूरे भारत में मान्य है।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-1" />
                  <span>
                    <strong>दो गवाह अनिवार्य:</strong> धारा 63 के अनुसार कम से कम दो बालिग गवाह हस्ताक्षर करें।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-1" />
                  <span>
                    <strong>लाभार्थी गवाह न बने:</strong> धारा 67 के अनुसार गवाह या उसके जीवनसाथी को दिया गया हिस्सा शून्य हो जाता है।
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: PLAIN PAPER VALIDITY */}
            <section id="plain-paper-validity" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>खंड 1: कानूनी आधार</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                1. सादे कागज़ पर वसीयत: क्या यह कानूनी रूप से मान्य है?
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                बहुत से लोग मानते हैं कि वसीयत स्टाम्प पेपर पर ही बनती है। यह सही नहीं है। भारतीय स्टाम्प अधिनियम, 1899 के तहत वसीयत पर कोई स्टाम्प ड्यूटी नहीं लगती। किसी भी राज्य में वसीयत के लिए स्टाम्प शुल्क देना ज़रूरी नहीं है।
              </p>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                वसीयत की वैधता के नियम भारतीय उत्तराधिकार अधिनियम, 1925 की धारा 63 में हैं। वसीयतकर्ता को हस्ताक्षर करने होते हैं। फिर दो गवाह इसकी पुष्टि करते हैं। बस इतना ही। नोटरी, स्टाम्प या पंजीकरण की कोई अनिवार्यता नहीं है।
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900 mb-1">याद रखें: कागज़ नहीं, प्रक्रिया मायने रखती है</p>
                <p>
                  अदालतें वसीयत को उसके कागज़ से नहीं, उसके निष्पादन से परखती हैं। अगर हस्ताक्षर और गवाही धारा 63 के अनुसार हुई है, तो सादे कागज़ की वसीयत भी पूरी तरह लागू होती है। विस्तार से पढ़ें:{" "}
                  <Link href="/blogs/will-valid-on-plain-paper-india" className="text-[#C65378] font-semibold hover:underline">
                    क्या सादे कागज़ पर बनी वसीयत मान्य है?
                  </Link>
                </p>
              </div>
            </section>

            {/* SECTION 2: SECTION 63 RULES IN SIMPLE HINDI */}
            <section id="section-63-rules" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <PenLine className="w-4 h-4" />
                <span>खंड 2: निष्पादन के नियम</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                2. धारा 63 के नियम: हस्ताक्षर और गवाही सरल हिंदी में
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                धारा 63 बताती है कि एक सामान्य वसीयत कैसे पूरी होती है। कानूनी भाषा कठिन है, इसलिए हमने इसे चार आसान नियमों में बाँटा है।
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    n: "63(a)",
                    t: "वसीयतकर्ता के हस्ताक्षर",
                    d: "वसीयतकर्ता खुद हस्ताक्षर करे या अंगूठे का निशान लगाए। वह चाहे तो उसकी मौजूदगी और निर्देश पर कोई और भी हस्ताक्षर कर सकता है।",
                  },
                  {
                    n: "63(b)",
                    t: "हस्ताक्षर की सही जगह",
                    d: "हस्ताक्षर ऐसी जगह हों जिससे साफ़ लगे कि वसीयतकर्ता पूरे दस्तावेज़ को लागू करना चाहता है। आमतौर पर यह अंत में और हर पृष्ठ के नीचे होता है।",
                  },
                  {
                    n: "63(c)",
                    t: "दो गवाह ज़रूरी",
                    d: "कम से कम दो गवाह वसीयतकर्ता को हस्ताक्षर करते देखें। फिर दोनों गवाह वसीयतकर्ता की मौजूदगी में अपने हस्ताक्षर करें।",
                  },
                  {
                    n: "63(c)",
                    t: "गवाह को सामग्री जानना ज़रूरी नहीं",
                    d: "गवाह को वसीयत की बातें पढ़ने की ज़रूरत नहीं है। उसे केवल यह प्रमाणित करना है कि हस्ताक्षर उसके सामने हुए।",
                  },
                ].map((r, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-sm md:text-base text-slate-900">{r.t}</h3>
                      <span className="text-[11px] font-semibold text-[#C65378] bg-rose-50 px-2 py-0.5 rounded-md shrink-0">
                        धारा {r.n}
                      </span>
                    </div>
                    <p className="text-[13px] md:text-sm text-slate-600 leading-relaxed">{r.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3: HINDI WILL TEMPLATE */}
            <section id="hindi-will-template" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>खंड 3: मुफ्त हिंदी प्रारूप</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                3. वसीयतनामा फॉर्मेट: कॉपी और प्रिंट करने योग्य हिंदी प्रारूप
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                नीचे भारतीय संपत्ति के लिए पूरा वसीयतनामा का नमूना है। कोष्ठक [ ] में दी गई जानकारी अपने विवरण से भरें। आप इसे कॉपी कर सकते हैं, Word फ़ाइल में डाउनलोड कर सकते हैं या प्रिंट करके PDF के रूप में सेव कर सकते हैं।
              </p>

              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                      हिंदी वसीयतनामा प्रारूप (सादे कागज़ के लिए)
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                      title="क्लिपबोर्ड पर कॉपी करें"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>कॉपी हो गया!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>कॉपी करें</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadWord}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                      title="Word फ़ाइल डाउनलोड करें"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Word डाउनलोड</span>
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                      title="प्रिंट करें या PDF सेव करें"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>प्रिंट / PDF</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-slate-50/50 max-h-[520px] overflow-y-auto text-[13px] sm:text-sm text-slate-800 leading-loose whitespace-pre-wrap border-b border-slate-200">
                  {TEMPLATE_TEXT}
                </div>

                <div className="p-4 bg-rose-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-700">
                  <span className="text-center sm:text-left">
                    अपने परिवार और संपत्ति के अनुसार भरा हुआ प्रारूप चाहिए?
                  </span>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C65378] text-white text-xs sm:text-sm font-bold hover:bg-[#a13c5d] transition-all shrink-0 cursor-pointer"
                  >
                    <span>अपनी वसीयत ऑनलाइन बनाएँ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="text-base md:text-lg font-bold text-slate-900">
                  हर खंड क्यों ज़रूरी है: कानूनी कारण
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {CLAUSE_ANNOTATIONS.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-sm text-slate-900">{item.clause}</span>
                        <span className="text-[11px] font-semibold text-[#C65378] bg-rose-50 px-2 py-0.5 rounded-md shrink-0">
                          {item.statute}
                        </span>
                      </div>
                      <p className="text-[13px] text-slate-600 leading-relaxed">{item.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4: VALIDITY CHECKLIST */}
            <section id="validity-checklist" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>खंड 4: वैधता जाँच</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                4. क्या यह वसीयत कानूनी रूप से मान्य होगी? जाँच सूची
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                प्रिंट करने से पहले इन बिंदुओं को जाँचें। हर बिंदु पर टिक करें और देखें कि आपकी वसीयत धारा 63 के नियमों पर खरी उतरती है या नहीं।
              </p>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <span className="font-bold text-slate-900 text-sm">
                    वैधता स्कोर: {checkedCount} / {CHECKLIST_ITEMS.length}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      isAllValid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {isAllValid ? "सभी शर्तें पूरी" : "कुछ बिंदु बाकी हैं"}
                  </span>
                </div>

                <div className="space-y-3">
                  {CHECKLIST_ITEMS.map((item) => (
                    <label
                      key={item.id}
                      htmlFor={item.id}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <input
                        id={item.id}
                        type="checkbox"
                        checked={!!checkedItems[item.id]}
                        onChange={() => toggleCheck(item.id)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-[#C65378] focus:ring-[#C65378]"
                      />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{item.label}</div>
                        <div className="text-[13px] text-slate-500 mt-0.5">{item.subtext}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {isAllValid ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-[13px] text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>बहुत बढ़िया। आपकी वसीयत धारा 63 की सभी मुख्य शर्तें पूरी करती है।</span>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5 text-[13px] text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>बाकी बिंदु भी पूरे करें, ताकि आगे चलकर वसीयत पर विवाद या देरी न हो।</span>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 5: SECTION 67 WARNING */}
            <section id="section-67-warning" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>खंड 5: ज़रूरी चेतावनी</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                5. धारा 67 चेतावनी: लाभार्थी या उसका जीवनसाथी गवाह न बने
              </h2>
              <div className="rounded-2xl bg-amber-50/70 border border-amber-300 p-5 sm:p-6 space-y-3 text-slate-800">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-sm sm:text-base">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>गवाह बनते ही लाभार्थी का हिस्सा शून्य हो जाता है</span>
                </div>
                <p className="text-sm leading-relaxed">
                  अपने बेटे, बेटी या पत्नी को गवाह न बनाएँ, अगर उन्हें वसीयत में कुछ मिल रहा है। धारा 67 के अनुसार गवाह या उसके जीवनसाथी को दिया गया हिस्सा <strong>पूरी तरह शून्य हो जाता है</strong>।
                </p>
                <p className="text-sm leading-relaxed">
                  बाकी वसीयत मान्य रहती है, लेकिन उस व्यक्ति का हिस्सा चला जाता है। इसलिए हमेशा ऐसे दो बालिग गवाह चुनें जिनका आपकी संपत्ति में कोई हित न हो।
                </p>
                <div className="pt-2 border-t border-amber-200 text-[13px] font-semibold text-amber-950 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>&bull; भरोसेमंद पड़ोसी या मित्र</span>
                  <span>&bull; फ़ैमिली डॉक्टर</span>
                  <span>&bull; चार्टर्ड अकाउंटेंट या वकील</span>
                </div>
              </div>
            </section>

            {/* SECTION 6: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>खंड 6: दृश्य संरचना</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                6. वसीयत की संरचना: एक नज़र में पूरा ढाँचा
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                एक मान्य वसीयत का क्रम तय होता है। शीर्षक और घोषणा से शुरू होकर, खंड, हस्ताक्षर और अंत में दो गवाहों का सत्यापन आता है।
              </p>

              <div className="-mx-4 sm:-mx-6 md:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-full bg-white rounded-none md:rounded-2xl border-y md:border border-slate-200 overflow-hidden shadow-xs">
                <div className="w-full">
                  <Image
                    src={OG_IMAGE_PATH}
                    alt="हिंदी वसीयतनामा फॉर्मेट की संरचना: क्रमांकित खंड, धारा 63 और दो गवाहों का सत्यापन"
                    width={1200}
                    height={630}
                    className="w-full h-auto block"
                  />
                </div>
                <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-slate-600 border-t border-slate-200">
                  <span className="font-medium text-slate-700">
                    चित्र 1: धारा 63 के अनुसार हिंदी वसीयत का मानक ढाँचा
                  </span>
                  <a
                    href={OG_IMAGE_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#C65378] font-bold hover:underline shrink-0"
                  >
                    <span>बड़े आकार में देखें</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP GUIDE */}
            <section id="step-by-step-guide" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
                <span>खंड 7: चरण-दर-चरण प्रक्रिया</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                7. वसीयत कैसे लिखें: 6 आसान चरणों में पूरी प्रक्रिया
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                वसीयत बनाने के लिए अदालत जाने की ज़रूरत नहीं है। इन छह चरणों का पालन करें और आपकी वसीयत कानूनी रूप से पूरी हो जाएगी।
              </p>

              <div className="space-y-3.5">
                {HOWTO_STEPS.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-slate-900">{item.title}</h3>
                      <p className="text-[13px] md:text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 8: 3 MOST COMMON MISTAKES */}
            <section id="three-common-mistakes" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>खंड 8: आम गलतियाँ</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                8. 3 सबसे आम गलतियाँ जो वसीयत को कमज़ोर बना देती हैं
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                छोटी सी चूक भी परिवार को सालों की मुकदमेबाज़ी में फँसा सकती है। हिंदी वसीयत बनाते समय इन तीन गलतियों से बचें।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    t: "लाभार्थी को गवाह बनाना",
                    d: "बेटे, बेटी या पत्नी को गवाह बनाने से धारा 67 के तहत उनका पूरा हिस्सा शून्य हो जाता है। गवाह हमेशा स्वतंत्र व्यक्ति हों।",
                  },
                  {
                    t: "संपत्ति का अधूरा विवरण",
                    d: "\"मेरा मकान\" या \"मेरा बैंक खाता\" लिखना काफ़ी नहीं है। खसरा नंबर, पता और खाता संख्या के बिना परिवार में विवाद की संभावना बढ़ती है।",
                  },
                  {
                    t: "बिना हस्ताक्षर की काट-छाँट",
                    d: "हस्ताक्षर के बाद की गई कटिंग या ओवरराइटिंग तभी मान्य है जब उस पर वसीयतकर्ता और दोनों गवाहों के हस्ताक्षर हों (धारा 71)।",
                  },
                ].map((m, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                      #{i + 1}
                    </div>
                    <h3 className="font-bold text-sm md:text-base text-slate-900">{m.t}</h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed">{m.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>खंड 9: कानूनी तुलना</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                9. सादा, नोटरीकृत और पंजीकृत वसीयत: तुलना तालिका
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                तीनों तरह की वसीयत कानूनन मान्य हैं। फ़र्क केवल सबूत की मज़बूती, खर्च और समय में है।
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-[13px] sm:text-sm text-slate-700 min-w-[620px]">
                  <thead className="bg-slate-900 text-white font-semibold">
                    <tr>
                      <th className="p-3.5 sm:p-4">विषय</th>
                      <th className="p-3.5 sm:p-4">सादे कागज़ की वसीयत</th>
                      <th className="p-3.5 sm:p-4">नोटरीकृत वसीयत</th>
                      <th className="p-3.5 sm:p-4">पंजीकृत वसीयत</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">कानूनी वैधता</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">पूरी तरह मान्य (धारा 63)</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">पूरी तरह मान्य</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">पूरी तरह मान्य</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">स्टाम्प ड्यूटी</td>
                      <td className="p-3.5">₹0</td>
                      <td className="p-3.5">₹0 (केवल नोटरी शुल्क)</td>
                      <td className="p-3.5">₹0 (राज्य के अनुसार मामूली पंजीकरण शुल्क)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">गवाह</td>
                      <td className="p-3.5">कम से कम 2 बालिग</td>
                      <td className="p-3.5">कम से कम 2 बालिग</td>
                      <td className="p-3.5">2 गवाह, पंजीयक के सामने भी</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">सबूत की मज़बूती</td>
                      <td className="p-3.5 text-amber-600 font-semibold">सामान्य</td>
                      <td className="p-3.5 text-amber-600 font-semibold">सामान्य (नोटरी रजिस्टर में प्रविष्टि)</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">सबसे मज़बूत (सरकारी रिकॉर्ड)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">गुम होने का जोखिम</td>
                      <td className="p-3.5 text-rose-600 font-semibold">ज़्यादा</td>
                      <td className="p-3.5 text-rose-600 font-semibold">ज़्यादा</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">कम (प्रमाणित प्रति मिलती है)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">समय</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">उसी दिन</td>
                      <td className="p-3.5">उसी दिन</td>
                      <td className="p-3.5">उप-पंजीयक की अपॉइंटमेंट पर निर्भर</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[13px] text-slate-500">
                पंजीकरण की पूरी प्रक्रिया जानने के लिए पढ़ें:{" "}
                <Link
                  href="/blogs/how-to-register-will-in-india-state-sub-registrar-guide"
                  className="text-[#C65378] font-semibold hover:underline"
                >
                  उप-पंजीयक कार्यालय में वसीयत पंजीकरण गाइड
                </Link>
              </p>
            </section>

            {/* SECTION 10: LANGUAGE, REGISTRATION & TRANSLATION RULES */}
            <section id="language-rules" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <Languages className="w-4 h-4" />
                <span>खंड 10: भाषा से जुड़े नियम</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                10. हिंदी में वसीयत: भाषा, पंजीकरण और अनुवाद के नियम
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                धारा 74 के अनुसार वसीयत में किसी तकनीकी शब्द की ज़रूरत नहीं है। आप उसी भाषा में लिखें जिसे आप सबसे अच्छी तरह समझते हैं। इससे बाद में यह आरोप नहीं लगता कि आपको वसीयत की बातें समझ नहीं आई थीं।
              </p>
              <div className="space-y-3">
                {[
                  {
                    t: "जिस भाषा को आप पढ़ते हैं, उसी में लिखें",
                    d: "अगर आप अंग्रेज़ी नहीं पढ़ते, तो अंग्रेज़ी वसीयत पर हस्ताक्षर न करें। अपनी समझ की भाषा में लिखी वसीयत को चुनौती देना कठिन होता है।",
                  },
                  {
                    t: "अनपढ़ वसीयतकर्ता के लिए खास पंक्ति",
                    d: "अगर वसीयतकर्ता पढ़ नहीं सकता, तो अंगूठे के निशान से पहले यह पंक्ति जोड़ें: \"यह वसीयत मुझे पढ़कर सुनाई और समझाई गई, और मैंने इसे सही मानकर अंगूठा लगाया।\"",
                  },
                  {
                    t: "पंजीकरण के समय भाषा",
                    d: "रजिस्ट्रेशन अधिनियम की धारा 19 के अनुसार, अगर दस्तावेज़ उस ज़िले में आमतौर पर इस्तेमाल न होने वाली भाषा में है, तो पंजीयक सही अनुवाद माँग सकता है। हिंदी भाषी राज्यों में हिंदी वसीयत सीधे पंजीकृत होती है।",
                  },
                  {
                    t: "नाम और नंबर दस्तावेज़ों जैसे ही लिखें",
                    d: "लाभार्थियों के नाम उसी वर्तनी में लिखें जैसे आधार या पैन पर हैं। खाता संख्या, IFSC और DP ID को अंकों और अंग्रेज़ी अक्षरों में ही रहने दें।",
                  },
                ].map((r, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                    <h3 className="font-bold text-sm md:text-base text-slate-900">{r.t}</h3>
                    <p className="text-[13px] md:text-sm text-slate-600 mt-1 leading-relaxed">{r.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 11: SPECIALIZED SCENARIOS */}
            <section id="specialized-scenarios" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>खंड 11: विशेष परिस्थितियाँ</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                11. विशेष स्थितियाँ: पैतृक संपत्ति, नाबालिग और मुस्लिम वसीयत
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                आप कितनी संपत्ति अपनी इच्छा से दे सकते हैं, यह संपत्ति के प्रकार और आपके व्यक्तिगत कानून पर निर्भर करता है। इन चार स्थितियों को ध्यान से समझें।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#5F7E75]" />
                    <h3 className="font-bold text-sm md:text-base text-slate-900">पैतृक (सहदायिक) संपत्ति</h3>
                  </div>
                  <p className="text-[13px] text-slate-600 leading-relaxed">
                    हिंदू उत्तराधिकार अधिनियम की धारा 30 के तहत आप केवल पैतृक संपत्ति में अपना हिस्सा वसीयत कर सकते हैं, पूरी संपत्ति नहीं।{" "}
                    <Link
                      href="/blogs/ancestral-vs-self-acquired-property-will-hindu-succession-act"
                      className="text-[#C65378] font-semibold hover:underline"
                    >
                      पैतृक बनाम स्व-अर्जित संपत्ति
                    </Link>
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#D29E0D]" />
                    <h3 className="font-bold text-sm md:text-base text-slate-900">नाबालिग बच्चों के संरक्षक</h3>
                  </div>
                  <p className="text-[13px] text-slate-600 leading-relaxed">
                    18 वर्ष से कम उम्र के बच्चों के लिए वसीयत में संरक्षक का नाम लिखें। माता और पिता दोनों अपनी-अपनी वसीयत में एक ही संरक्षक चुनें, ताकि टकराव न हो।{" "}
                    <Link href="/blogs/appoint-guardians-minor-children" className="text-[#C65378] font-semibold hover:underline">
                      संरक्षक नियुक्ति गाइड
                    </Link>
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-bold text-sm md:text-base text-slate-900">मुस्लिम वसीयत (वसीयत)</h3>
                  </div>
                  <p className="text-[13px] text-slate-600 leading-relaxed">
                    मुस्लिम व्यक्तिगत कानून में आमतौर पर संपत्ति का केवल एक-तिहाई हिस्सा ही वसीयत किया जा सकता है। बाकी शरीयत के अनुसार बँटता है। यह प्रारूप मुस्लिम वसीयत के लिए नहीं है।{" "}
                    <Link
                      href="/blogs/muslim-will-wasiyat-india-one-third-rule"
                      className="text-[#C65378] font-semibold hover:underline"
                    >
                      एक-तिहाई नियम समझें
                    </Link>
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C65378]" />
                    <h3 className="font-bold text-sm md:text-base text-slate-900">वरिष्ठ नागरिक की वसीयत</h3>
                  </div>
                  <p className="text-[13px] text-slate-600 leading-relaxed">
                    80 वर्ष से अधिक आयु या बीमारी की स्थिति में डॉक्टर का फ़िटनेस प्रमाणपत्र साथ लगाएँ। यह अनिवार्य नहीं है, पर मानसिक क्षमता पर सवाल उठने से रोकता है।{" "}
                    <Link
                      href="/blogs/senior-citizen-will-doctor-medical-fitness-certificate-india"
                      className="text-[#C65378] font-semibold hover:underline"
                    >
                      मेडिकल प्रमाणपत्र के बारे में
                    </Link>
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL BACKING */}
            <section id="institutional-backing" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>खंड 12: विश्वसनीयता</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                12. AMA Legal Solutions द्वारा जाँची गई कानूनी प्रक्रिया
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <p className="text-lg font-bold text-slate-900">WillDrafting.in</p>
                    <p className="text-[13px] text-slate-500 mt-0.5">भारत का समर्पित वसीयत और उत्तराधिकार पोर्टल</p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#FAF7F0] border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700">
                    <span>सहयोग में</span>
                    <strong className="text-slate-900">AMA Legal Solutions</strong>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in का हर प्रारूप और खंड AMA Legal Solutions के अनुभवी वकीलों द्वारा तैयार और समय-समय पर जाँचा जाता है। हम भारतीय उत्तराधिकार अधिनियम, 1925 और हिंदू उत्तराधिकार अधिनियम, 1956 के अनुसार काम करते हैं। हमारा ऑनलाइन विज़ार्ड हिंदी और अंग्रेज़ी दोनों में उपलब्ध है।
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className="font-extrabold text-slate-900 text-sm">18-बिंदु जाँच</div>
                    <div className="text-[12px] text-slate-500 mt-0.5">कानूनी स्वास्थ्य ऑडिट</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className="font-extrabold text-slate-900 text-sm">शून्य स्टाम्प ड्यूटी</div>
                    <div className="text-[12px] text-slate-500 mt-0.5">सादे कागज़ पर मान्य</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className="font-extrabold text-slate-900 text-sm">हिंदी और अंग्रेज़ी</div>
                    <div className="text-[12px] text-slate-500 mt-0.5">द्विभाषी प्रिंट-रेडी PDF</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-[#C65378]">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span>खंड 13: सीधे जवाब</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                अक्सर पूछे जाने वाले प्रश्न: हिंदी वसीयतनामा
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                वसीयत लिखने, गवाही और पंजीकरण से जुड़े आम सवालों के सरल जवाब।
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors"
                  >
                    <button
                      type="button"
                      id={`faq-button-${idx}`}
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50/80 transition-colors"
                      aria-expanded={openFaq === idx}
                      aria-controls={`faq-panel-${idx}`}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {/* Kept in the DOM (hidden) so crawlers can read every answer. */}
                    <div
                      id={`faq-panel-${idx}`}
                      role="region"
                      aria-labelledby={`faq-button-${idx}`}
                      hidden={openFaq !== idx}
                      className="px-4 pb-5 sm:px-5 sm:pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {faq.a}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 14: CITATIONS & AUTHORITY LINKS */}
            <section id="statutory-citations" className="scroll-target pt-6 border-t border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wide text-slate-500">
                <BookOpen className="w-4 h-4" />
                <span>खंड 14: कानूनी संदर्भ</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">कानूनी संदर्भ और आधिकारिक सरकारी स्रोत</h2>
              <ul className="list-disc pl-5 text-[13px] text-slate-600 space-y-1.5 leading-relaxed">
                <li>
                  <strong>भारतीय उत्तराधिकार अधिनियम, 1925:</strong> धारा 59 (वसीयत करने की क्षमता), धारा 62 और 70 (वसीयत बदलना या रद्द करना), धारा 63 (निष्पादन और गवाही), धारा 67 (गवाह-लाभार्थी), धारा 71 (बाद में किए गए बदलाव), धारा 74 (शब्दों की स्वतंत्रता) और धारा 222 (निष्पादक को प्रोबेट)।
                </li>
                <li>
                  <strong>हिंदू उत्तराधिकार अधिनियम, 1956:</strong> धारा 8 और 15 (निर्वसीयत उत्तराधिकार) और धारा 30 (वसीयती उत्तराधिकार)।
                </li>
                <li>
                  <strong>हिंदू अप्राप्तवयता और संरक्षकता अधिनियम, 1956:</strong> धारा 9 (वसीयती संरक्षक)।
                </li>
                <li>
                  <strong>रजिस्ट्रेशन अधिनियम, 1908:</strong> धारा 18 (वसीयत का वैकल्पिक पंजीकरण) और धारा 19 (भाषा और अनुवाद)।
                </li>
                <li>
                  <strong>भारतीय स्टाम्प अधिनियम, 1899</strong> और <strong>बीमा अधिनियम, 1938</strong> की धारा 39 (नामांकन)।
                </li>
                <li>
                  <strong>सुप्रीम कोर्ट:</strong> <em>शक्ति येज़दानी बनाम जयानंद जयंत सालगांवकर (2023)</em>, नॉमिनी केवल संरक्षक है।
                </li>
              </ul>

              <div className="pt-2 space-y-2">
                <div className="text-[13px] font-semibold text-slate-700">आधिकारिक सरकारी पोर्टल:</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "India Code (केंद्रीय कानून)", url: "https://www.indiacode.nic.in/" },
                    { name: "विधायी विभाग, भारत सरकार", url: "https://legislative.gov.in/" },
                    { name: "भारत का सर्वोच्च न्यायालय", url: "https://www.sci.gov.in/" },
                  ].map((p) => (
                    <a
                      key={p.url}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1 rounded-lg bg-rose-50 text-slate-700 hover:bg-rose-100 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 text-[#C65378]" />
                      {p.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-3 space-y-2">
                <div className="text-[13px] font-semibold text-slate-700">संबंधित मुफ्त गाइड और टूल:</div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/templates/will-format-india"
                    hrefLang="en-IN"
                    className="text-[13px] px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    <span lang="en">English Will Format</span> (अंग्रेज़ी प्रारूप) &rarr;
                  </Link>
                  <Link
                    href="/blogs/nominee-vs-legal-heir-india-supreme-court-rule"
                    className="text-[13px] px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    नॉमिनी बनाम कानूनी वारिस &rarr;
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="text-[13px] px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    उत्तराधिकार हिस्सा कैलकुलेटर &rarr;
                  </Link>
                  <Link
                    href="/service/nri-will-india"
                    className="text-[13px] px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    NRI के लिए भारतीय वसीयत &rarr;
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* ===================== RIGHT COLUMN: STICKY SIDEBAR ===================== */}
          <aside className="space-y-5 sticky top-6">
            {/* CARD 1: AUTHOR BIO */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378] font-bold text-sm font-bold shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    <a
                      href="https://www.linkedin.com/in/iamanujmalik/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C65378] transition-colors"
                    >
                      एडवोकेट अनुज आनंद मलिक
                    </a>
                  </div>
                  <div className="text-[12px] font-semibold text-[#C65378]">वरिष्ठ उत्तराधिकार अधिवक्ता</div>
                </div>
              </div>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                बार काउंसिल में पंजीकृत अधिवक्ता। AMA Legal Solutions में वसीयत, प्रोबेट और संपत्ति योजना का 18+ वर्षों का अनुभव।
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75]" />
                  <span>कानूनी रूप से जाँचा गया</span>
                </span>
                <a
                  href="https://www.linkedin.com/in/iamanujmalik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#C65378] hover:underline"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: ACTION CTA */}
            <div className="hidden lg:block bg-[#172228] rounded-3xl p-6 text-white text-center shadow-lg shadow-slate-900/10 space-y-4">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold tracking-wide text-rose-200">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>गोपनीय और सुरक्षित</span>
              </div>
              <p className="text-lg font-bold leading-snug">
                एक वकील द्वारा जांचा हुआ, प्रिंट-रेडी वसीयतनामा 15 मिनट में चाहिए?
              </p>
              <p className="text-[13px] text-slate-300 leading-relaxed">
                गलतियों से बचें। हमारा हिंदी विज़ार्ड आपसे आसान सवाल पूछकर अदालत में टिकने वाली वसीयत तैयार करता है।
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-bold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer"
              >
                <span>मुफ्त ड्राफ्ट शुरू करें</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="text-[12px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                <PhoneCall className="w-3.5 h-3.5 text-[#5F7E75]" />
                <span>सवाल हैं? हमारे वकीलों से बात करें</span>
              </div>
            </div>

            {/* CARD 3: TRUST CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <p className="font-bold text-xs tracking-wide text-slate-800">यह प्रारूप क्यों चुनें?</p>
              <ul className="space-y-2.5 text-[13px] text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>शुद्ध हिंदी:</strong> सरल और व्याकरण की दृष्टि से सही भाषा।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>धारा 63 अनुरूप:</strong> दो गवाहों का सत्यापन खंड शामिल।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>अवशिष्ट खंड:</strong> भविष्य की संपत्ति भी कवर।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>विवाद से बचाव:</strong> संपत्ति का स्पष्ट विवरण और नॉमिनी स्पष्टीकरण।
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED RESOURCES */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <p className="font-bold text-xs tracking-wide text-slate-800">संबंधित मुफ्त संसाधन</p>
              <div className="space-y-2">
                <Link
                  href="/templates/will-format-india"
                  hrefLang="en-IN"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-[13px] text-slate-900" lang="en">
                    Will Format in English
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">यही प्रारूप अंग्रेज़ी में &rarr;</div>
                </Link>
                <Link
                  href="/blogs/will-valid-on-plain-paper-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-[13px] text-slate-900">सादे कागज़ पर वसीयत</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">क्या स्टाम्प पेपर की ज़रूरत है? &rarr;</div>
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-[13px] text-slate-900">उत्तराधिकार कैलकुलेटर</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">वसीयत न हो तो किसे कितना मिलेगा? &rarr;</div>
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
                  English Will Format
                </Link>
                <Link
                  href="/service/will-registration"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  वसीयत पंजीकरण सेवा
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  उत्तराधिकार कैलकुलेटर
                </Link>
                <Link
                  href="/tools/will-checklist"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  वसीयत चेकलिस्ट
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
