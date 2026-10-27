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
  Scale,
  Building,
  UserCheck,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Building2,
  Calculator,
  Copy,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  Globe,
  Coins,
  ScrollText,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-basis", label: "1. Statutory Basis: Indian Succession Act & Kerala Rules" },
  { id: "malayalam-maranapathram-format", label: "2. Complete Maranapathram Format: Native Malayalam Draft" },
  { id: "english-translation", label: "3. English Translation: Malayalam Will Clauses Explained" },
  { id: "clause-selector", label: "4. Interactive Clause Selector: Customize Your Kerala Will" },
  { id: "kerala-land-schedule", label: "5. Kerala Land Schedule: Resurvey & Thandapper Details" },
  { id: "kerala-probate-exemption", label: "6. Kerala Probate Moat: Why High Court Probate Is Exempt" },
  { id: "pearl-fee-calculator", label: "7. PEARL Portal Fee Guide & SRO Registration Rules" },
  { id: "comparison-table", label: "8. Comparison: Registered Will vs Dhanam vs Ozhivupathram" },
  { id: "registration-sop", label: "9. Step-by-Step SOP: Drafting to Registration in Kerala" },
  { id: "pokkuvarav-sop", label: "10. Pokkuvarav SOP: Thandapper Transfer at Village Office" },
  { id: "case-studies", label: "11. Practical Case Studies: Kochi, Kozhikode & Thrissur" },
  { id: "checklist-medical-cert", label: "12. Sub-Registrar Document Checklist & Doctor Certificate" },
  { id: "succession-tools", label: "13. Contextual Estate Calculators & Succession Tools" },
  { id: "legal-backing", label: "14. Legal Backing: Senior Counsel Succession Profile" },
  { id: "faqs", label: "15. Frequently Asked Questions: Kerala Maranapathram" },
  { id: "statutory-citations", label: "16. Official Kerala Statutory References & Portals" },
];

const FAQS_DATA = [
  {
    q: "കേരളത്തിൽ മരണപത്രം (വിൽപത്രം) എഴുതാൻ മുദ്രപ്പത്രം (Stamp Paper) ആവശ്യമുണ്ടോ?",
    a: "ഇല്ല. ഇന്ത്യൻ പിന്തുടർച്ചാവകാശ നിയമം (Indian Succession Act, 1925) സെക്ഷൻ 63 പ്രകാരവും കേരള സ്റ്റാമ്പ് ആക്ട് പ്രകാരവും വിൽപത്രം തയ്യാറാക്കാൻ മുദ്രപ്പത്രം നിർബന്ധമില്ല (സീറോ സ്റ്റാമ്പ് ഡ്യൂട്ടി). സാധാരണ വെള്ളക്കടലാസിലോ ഗ്രീൻ ലെഡ്ജർ പേപ്പറിലോ കൈപ്പടയിലോ ടൈപ്പ് ചെയ്തോ തയ്യാറാക്കിയ മരണപത്രത്തിന് പൂർണ്ണ നിയമസാധുതയുണ്ട്.",
  },
  {
    q: "കേരളത്തിൽ മരണപത്രം സബ് രജിസ്ട്രാർ ഓഫീസിൽ രജിസ്റ്റർ ചെയ്യുന്നത് നിർബന്ധമാണോ?",
    a: "രജിസ്ട്രേഷൻ ആക്ട് 1908 സെക്ഷൻ 18(e) പ്രകാരം വിൽപത്രം രജിസ്റ്റർ ചെയ്യുന്നത് നിർബന്ധമല്ല, ഐച്ഛികമാണ് (optional). എന്നാൽ രജിസ്ട്രേഷൻ വകുപ്പിന്റെ PEARL പോർട്ടൽ വഴി സബ് രജിസ്ട്രാർ ഓഫീസിൽ രജിസ്റ്റർ ചെയ്യുന്നത് ഭാവിയിൽ ഉയരാനിടയുള്ള വ്യാജരേഖാ ആരോപണങ്ങളും കോടതി തർക്കങ്ങളും ഒഴിവാക്കാൻ അതിശക്തമായ നിയമ പരിരക്ഷ നൽകുന്നു.",
  },
  {
    q: "കേരളത്തിലെ സ്വത്തുക്കൾക്കുള്ള മരണപത്രത്തിന് കോടതി പ്രൊബേറ്റ് (Probate) നിർബന്ധമാണോ?",
    a: "അല്ല. ഇന്ത്യൻ പിന്തുടർച്ചാവകാശ നിയമം സെക്ഷൻ 213, സെക്ഷൻ 57 എന്നിവ പഴയ പ്രസിഡൻസി നഗരങ്ങളായ ചെന്നൈ, മുംബൈ, കൊൽക്കത്ത എന്നിവിടങ്ങളിലെ സ്വത്തുക്കൾക്ക് മാത്രമാണ് ബാധകം. കേരള ഹൈക്കോടതിയുടെ പ്രമുഖ വിധികൾ (Mary Thomas v. Dr. K.E. Thomas) വ്യക്തമാക്കുന്നത് പോലെ കേരളത്തിലുള്ള ഹിന്ദു, ക്രിസ്ത്യൻ, മുസ്ലിം വിഭാഗങ്ങളുടെ സ്വത്തുക്കൾക്ക് കോടതി പ്രൊബേറ്റ് നിർബന്ധമല്ല. രജിസ്റ്റർ ചെയ്ത വിൽപത്രവും മരണ സർട്ടിഫിക്കറ്റും ഉപയോഗിച്ച് വില്ലേജ് ഓഫീസിൽ നേരിട്ട് പോക്കുവരവ് നടത്താം.",
  },
  {
    q: "മരണപത്രത്തിൽ എത്ര സാക്ഷികൾ ഒപ്പുവെക്കണം?",
    a: "സെക്ഷൻ 63(c) പ്രകാരം കുറഞ്ഞത് 2 സാക്ഷികൾ (Attesting Witnesses) വിൽപത്രം തയ്യാറാക്കുന്നയാൾ ഒപ്പിടുന്നത് നേരിട്ട് കണ്ട് സാക്ഷ്യപ്പെടുത്തി ഒപ്പിടണം. സെക്ഷൻ 67 പ്രകാരം വിൽപത്രത്തിലൂടെ സ്വത്ത് ലഭിക്കുന്ന ഗുണഭോക്താവോ അവരുടെ ജീവിതപങ്കാളിയോ സാക്ഷികളാകാൻ പാടില്ല. വിശ്വസ്തരായ സ്വതന്ത്ര വ്യക്തികളായിരിക്കണം സാക്ഷികൾ.",
  },
  {
    q: "കുടുംബ സ്വത്ത് (Ancestral Property) വിൽപത്രത്തിലൂടെ പൂർണ്ണമായി എഴുതിക്കൊടുക്കാൻ കഴിയുമോ?",
    a: "സ്വയം ആർജ്ജിച്ച സ്വത്തുക്കൾ (Self-Acquired Property) ആർക്കും തന്റെ ഇഷ്ടപ്രകാരം എഴുതിക്കൊടുക്കാം. കേരളത്തിൽ 1975 ലെ ജോയിന്റ് ഹിന്ദു ഫാമിലി സിസ്റ്റം (അബോലിഷൻ) ആക്ട് പ്രകാരം ജന്മാവകാശം റദ്ദാക്കപ്പെട്ടതിനാൽ, കുടുംബ സ്വത്തിൽ തനിക്ക് വിഭജനത്തിലൂടെ ലഭിച്ച നിയമപരമായ ഓഹരിയിൽ മാത്രമേ ഒരാൾക്ക് വിൽപത്രം എഴുതാൻ അവകാശമുള്ളൂ.",
  },
  {
    q: "കേരള രജിസ്ട്രേഷൻ വകുപ്പിന്റെ PEARL പോർട്ടലിൽ വിൽപത്രം രജിസ്റ്റർ ചെയ്യുന്നതിനുള്ള ഫീസ് എത്രയാണ്?",
    a: "കേരള രജിസ്ട്രേഷൻ ചട്ടങ്ങൾ അനുസരിച്ച് വിൽപത്രത്തിന് സ്റ്റാമ്പ് ഡ്യൂട്ടി ഇല്ല (₹0). രജിസ്ട്രേഷൻ ഫീസ് ₹1,000 നും കമ്പ്യൂട്ടർ സർവീസ് ഫീസ് ₹100 ഉം ഉൾപ്പെടെ ആകെ ₹1,100 മുതൽ ₹1,200 വരെ മാത്രമാണ് സർക്കാർ ഫീസ് വരുന്നത്.",
  },
  {
    q: "കിടപ്പുരോഗികൾക്കും പ്രായമായവർക്കും വീട്ടിലിരുന്ന് വിൽപത്രം രജിസ്റ്റർ ചെയ്യാൻ കഴിയുമോ?",
    a: "അതെ. രജിസ്ട്രേഷൻ ആക്ട് സെക്ഷൻ 31 പ്രകാരം കമ്മീഷൻ രജിസ്ട്രേഷൻ (Commission Visit) സൗകര്യം ലഭ്യമാണ്. അപേക്ഷയും ഡോക്ടറുടെ മെഡിക്കൽ സർട്ടിഫിക്കറ്റും സമർപ്പിച്ചാൽ സബ് രജിസ്ട്രാർ വീട്ടിലോ ആശുപത്രിയിലോ നേരിട്ടെത്തി വിൽപത്രം രജിസ്റ്റർ ചെയ്തു തരും.",
  },
  {
    q: "രജിസ്റ്റർ ചെയ്ത വിൽപത്രം ഉപയോഗിച്ച് വില്ലേജ് ഓഫീസിൽ പോക്കുവരവ് (പോക്കുവരവ് / തണ്ടപ്പേർ മാറ്റം) ചെയ്യുന്നത് എങ്ങനെ?",
    a: "വിൽപത്രം എഴുതിയ ആൾ മരണമടഞ്ഞ ശേഷം തദ്ദേശസ്ഥാപനത്തിൽ നിന്നുള്ള മരണ സർട്ടിഫിക്കറ്റ്, രജിസ്റ്റർ ചെയ്ത വിൽപത്രത്തിന്റെ സാക്ഷ്യപ്പെടുത്തിയ പകർപ്പ്, ബാധ്യതാ സർട്ടിഫിക്കറ്റ് (EC), മുൻ ആധാരം എന്നിവ സഹിതം കേരള റവന്യൂ ഇ-സർവീസസ് പോർട്ടലിലൂടെ (revenue.kerala.gov.in) ഓൺലൈനായി പോക്കുവരവിന് അപേക്ഷിക്കാം. വില്ലേജ് ഓഫീസർ പരിശോധന നടത്തി തണ്ടപ്പേർ മാറ്റി പുതിയ ഭൂനികുതി രസീത് നൽകും.",
  },
];

const CLAUSES_OPTIONS = [
  {
    id: "life-interest",
    title: "ഭാര്യക്ക്/ഭർത്താവിന് ആജീവനാന്ത ഉപഭോഗാവകാശം (Life Interest Clause for Spouse)",
    malayalam:
      "എന്റെ കാലശേഷം എന്റെ ഭാര്യ/ഭർത്താവ് [പേര്]-ക്ക് ഞാൻ മുകളിൽ വിവരിച്ച സ്വത്തുക്കളിൽ ജീവിതകാലം മുഴുവൻ താമസിക്കുന്നതിനും ആദായം എടുക്കുന്നതിനുമുള്ള പൂർണ്ണ ഉപഭോഗാവകാശം (Life Interest) ഉണ്ടായിരിക്കുന്നതാണ്. എന്നാൽ പ്രസ്തുത സ്വത്ത് വിൽക്കുവാനോ പണയപ്പെടുത്തുവാനോ യാതൊരു അധികാരവും ഉണ്ടായിരിക്കുന്നതല്ല. അവരുടെ ആയുഷ്കാലത്തിന് ശേഷം ഈ സ്വത്തിന്റെ പൂർണ്ണ ഉടമസ്ഥാവകാശം എന്റെ മകൻ/മകൾ [പേര്]-ക്ക് ലഭിക്കുന്നതാണ്.",
    english:
      "After my demise, my spouse [Name] shall have the absolute right to reside in and enjoy the usufruct/income of the scheduled property during their lifetime without any right of alienation, mortgage, or sale. Upon their demise, the absolute fee simple ownership shall devolve upon my child [Name].",
  },
  {
    id: "guardian",
    title: "പ്രായപൂർത്തിയാകാത്ത മക്കൾക്കുള്ള രക്ഷിതാവ് (Minor Child Testamentary Guardian Clause)",
    malayalam:
      "എന്റെയും എന്റെ ഭാര്യയുടെയും കാലശേഷം എന്റെ മക്കൾ പ്രായപൂർത്തിയാകാത്തവരാണെങ്കിൽ, അവരുടെ ശരീരത്തിന്റെയും ഈ വിൽപ്പത്രപ്രകാരം അവർക്ക് ലഭിക്കുന്ന സ്വത്തുക്കളുടെയും നിയമാനുസൃത രക്ഷിതാവായി (Testamentary Guardian) [രക്ഷിതാവിന്റെ പേര്, വിലാസം, ആധാർ നമ്പർ] എന്നയാളെ ഞാൻ ഇതിനാൽ ചുമതലപ്പെടുത്തുന്നു. മക്കൾക്ക് 18 വയസ്സ് പൂർത്തിയാകുമ്പോൾ അവർക്ക് സ്വത്തുക്കൾ കൈമാറേണ്ടതാണ്.",
    english:
      "In the event of the demise of myself and my spouse while our children are minors, I hereby nominate and appoint [Guardian Name, Address, Aadhaar] as the Testamentary Guardian of their persons and properties until they attain the age of majority (18 years).",
  },
  {
    id: "disinheritance",
    title: "നിയമപരമായ അവകാശിയെ ഒഴിവാക്കൽ (Disinheritance / Unequal Share Clause)",
    malayalam:
      "എന്റെ മൂത്ത മകൻ/മകൾ [പേര്]-ക്ക് ഈ വിൽപ്പത്രത്തിലൂടെ യാതൊരു സ്വത്തും ഞാൻ നൽകുന്നില്ല. അവരുടെ വിവാഹസമയത്തും ബിസിനസ്സ് ആവശ്യങ്ങൾക്കുമായി ആവശ്യത്തിലധികം പണവും സ്വർണ്ണാഭരണങ്ങളും ഞാൻ എന്റെ ജീവിതാവസാനം വരെ നൽകിയിട്ടുള്ളതിനാലും, എന്റെ വാർദ്ധക്യകാലത്ത് എന്നെ സംരക്ഷിക്കാതിരുന്നതിനാലുമാണ് പ്രസ്തുത തീരുമാനം സ്വബോധത്തോടെ ഞാൻ എടുക്കുന്നത്.",
    english:
      "I consciously declare that no portion of my estate is bequeathed to my elder child [Name]. Having already settled substantial funds and assets upon them during their marriage and business venture, and considering their failure to provide maintenance during my old age, this exclusion is intentional.",
  },
  {
    id: "residuary",
    title: "അവശിഷ്ട സ്വത്തുക്കൾ സംബന്ധിച്ച വ്യവസ്ഥ (Residuary Estate Clause)",
    malayalam:
      "ഈ മരണപത്രത്തിൽ പ്രത്യേകം പേരെടുത്ത് പരാമർശിക്കാത്തതോ ഭാവിയിൽ ഏതെങ്കിലും തരത്തിൽ ഞാൻ ആർജ്ജിച്ചേക്കാവുന്നതോ ആയ സ്ഥാവര-ജംഗമ സ്വത്തുക്കൾ, ബാങ്ക് നിക്ഷേപങ്ങൾ, ഷെയറുകൾ എന്നിവയെല്ലാം എന്റെ [അവകാശിയുടെ പേര്]-ക്ക് പൂർണ്ണ ഉടമസ്ഥതയോടെ ലഭിക്കുന്നതാണ്.",
    english:
      "I hereby bequeath all residue and remainder of my estate, both movable and immovable, including future acquisitions, bank deposits, and investments not specifically enumerated herein, absolutely to [Beneficiary Name].",
  },
  {
    id: "joint-mirror",
    title: "ദമ്പതികളുടെ സംയുക്ത വിൽപ്പത്ര വ്യവസ്ഥ (Mutual / Mirror Will Clause for Couple)",
    malayalam:
      "ഞങ്ങളിൽ ഒരാൾ ആദ്യം മരണപ്പെട്ടാൽ, ഞങ്ങളുടെ എല്ലാ സ്വത്തുക്കളും ജീവിച്ചിരിക്കുന്ന പങ്കാളിക്ക് പൂർണ്ണ ഉടമസ്ഥതയോടെ ലഭിക്കുന്നതാണ്. ഞങ്ങളുടെ രണ്ടുപേരുടെയും മരണശേഷം മാത്രമേ കുടുംബ സ്വത്തുക്കൾ ഞങ്ങളുടെ മക്കൾക്ക് തുല്യമായി ലഭിക്കുകയുള്ളൂ.",
    english:
      "In the event of the prior demise of either of us, all our joint and separate properties shall vest absolutely in the surviving spouse. Only upon the demise of both of us shall the entire estate devolve equally upon our surviving children.",
  },
];

export default function WillFormatMalayalamClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-basis");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedMalayalam, setCopiedMalayalam] = useState<boolean>(false);
  const [copiedEnglish, setCopiedEnglish] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedDoctorCert, setCopiedDoctorCert] = useState<boolean>(false);
  const [selectedClauseId, setSelectedClauseId] = useState<string>("life-interest");

  // PEARL Fee Calculator State
  const [registrationMode, setRegistrationMode] = useState<"sro" | "commission">("sro");
  const [testatorCount, setTestatorCount] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(4);

  // Fee calculation under Kerala Registration Rules
  const baseRegFee = 1000 * testatorCount;
  const computerFee = 100;
  const commissionFee = registrationMode === "commission" ? 1000 : 0;
  const totalGovtFee = baseRegFee + computerFee + commissionFee;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const item = TOC_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const selectedClauseData =
    CLAUSES_OPTIONS.find((c) => c.id === selectedClauseId) || CLAUSES_OPTIONS[0];

  const MALAYALAM_WILL_TEXT = `മരണപത്രം (LAST WILL AND TESTAMENT)

ഈ മരണപത്രം (വിൽപത്രം) [വർഷം] ആണ്ട് [മാസം] മാസം [തീയതി]-ാം തീയതി [ജില്ല] ജില്ലയിൽ [സബ് രജിസ്ട്രാർ ഓഫീസ് പരിധി] സബ് ജില്ലയിൽ [താലൂക്ക്] താലൂക്കിൽ [വില്ലേജ്] വില്ലേജിൽ [ദേശത്തിന്റെ പേര്] ദേശത്ത് [വീട്ടുപേര് / മേൽവിലാസം] എന്ന വിലാസത്തിൽ താമസിക്കുന്ന [പിതാവിന്റെ / ഭർത്താവിന്റെ പേര്] മകൻ/മകൾ/ഭാര്യ, [വയസ്സ്] വയസ്സുള്ള [വിൽപ്പത്ര കർത്താവിന്റെ പൂർണ്ണമായ പേര്] (ആധാർ നമ്പർ: [XXXX XXXX XXXX], പാൻ നമ്പർ: [ABCDE1234F]) ആയ ഞാൻ പൂർണ്ണ മനഃസമ്മതത്തോടും സ്വബോധത്തോടും കൂടി എഴുതി തയ്യാറാക്കുന്നത്:

1. സ്വബോധവും മാനസികാരോഗ്യവും (Sound Mind and Health):
ഞാൻ ഇപ്പോൾ നല്ല ശാരീരിക-മാനസികാരോഗ്യത്തോടും സ്വതന്ത്ര ചിന്താശക്തിയോടും കൂടിയാണ് ഈ മരണപത്രം തയ്യാറാക്കുന്നത്. ഇതിലേക്ക് യാതൊരുവിധ ബാഹ്യ സമ്മർദ്ദമോ, അവിഹിത പ്രേരണയോ, വഞ്ചനയോ, നിർബന്ധമോ ഉണ്ടായിട്ടില്ല.

2. മുൻ വിൽപ്പത്രങ്ങൾ റദ്ദാക്കൽ (Revocation of Prior Wills):
ഇതിനു മുൻപ് ഞാൻ ഏതെങ്കിലും തീയതികളിൽ എഴുതിയിട്ടുള്ളതോ രജിസ്റ്റർ ചെയ്തിട്ടുള്ളതോ ആയ എല്ലാ വിൽപ്പത്രങ്ങളും ഒസ്യത്തുകളും കോഡിസിലുകളും (Codicils) ഇതിനാൽ പൂർണ്ണമായി റദ്ദ് ചെയ്തിരിക്കുന്നു. ഇതാണ് എന്റെ അവസാനത്തെയും നിയമാനുസൃതവുമായ വിൽപ്പത്രം.

3. കാര്യനിർവ്വഹകന്റെ നിയമനം (Appointment of Executor):
എന്റെ മരണാനന്തരം ഈ വിൽപ്പത്രത്തിലെ വ്യവസ്ഥകൾ കൃത്യമായി നടപ്പിലാക്കുന്നതിനായി [കാര്യനിർവ്വഹകന്റെ പൂർണ്ണമായ പേര്], [മേൽവിലാസം] (ആധാർ നമ്പർ: [XXXX XXXX XXXX]) എന്നയാളെ എന്റെ എക്സിക്യൂട്ടറായി (കാര്യനിർവ്വഹകൻ) ഞാൻ ഇതിനാൽ നിയമിക്കുന്നു. പ്രസ്തുത കാര്യനിർവ്വഹകന് പ്രതിഫലം കൂടാതെ ഉത്തരവാദിത്തം നിർവ്വഹിക്കാനുള്ള അധികാരമുണ്ടായിരിക്കുന്നതാണ്.

4. മരണാനന്തര ചിലവുകളും ബാധ്യതകളും (Debts and Funeral Expenses):
എന്റെ മരണാനന്തര സംസ്കാര കർമ്മങ്ങൾക്കും മറ്റ് ക്രിയാകർമ്മങ്ങൾക്കും വരുന്ന ചിലവുകളും എനിക്കെന്തെങ്കിലും നിയമാനുസൃത കടബാധ്യതകൾ ഉണ്ടെങ്കിൽ അവയും എന്റെ സ്വത്തുക്കളിൽ നിന്നും ആദ്യം തീർപ്പാക്കേണ്ടതാണ്.

5. സ്വത്തുക്കളുടെ കൈമാറ്റ വ്യവസ്ഥകൾ (Bequest of Properties):
താഴെ പട്ടികയിൽ (Schedule) വിവരിക്കുന്നതും എന്റെ സ്വയം ആർജ്ജിത സ്വത്തുക്കളും നിയമാനുസൃത വിഭജനത്തിലൂടെ എനിക്ക് ലഭിച്ചിട്ടുള്ളതുമായ എല്ലാ സ്ഥാവര-ജംഗമ സ്വത്തുക്കളുടെയും പൂർണ്ണ ഉടമസ്ഥാവകാശം എന്റെ ജീവിതാവസാനം വരെ എനിക്ക് മാത്രമായിരിക്കും. പ്രസ്തുത സ്വത്തുക്കൾ വിൽക്കുവാനോ കൈമാറ്റം ചെയ്യുവാനോ ഉള്ള പൂർണ്ണ അധികാരം എന്റെ ജീവിതാവസാനം വരെ എനിക്കുണ്ട്. എന്റെ മരണശേഷം താഴെ പറയുന്ന വിധത്തിൽ സ്വത്തുക്കൾ ഗുണഭോക്താക്കൾക്ക് ലഭിക്കേണ്ടതാണ്:

(A) സ്ഥാവര സ്വത്ത് (ഷെഡ്യൂൾ A പ്രകാരം):
താഴെ എ-പട്ടികയിൽ പറയുന്ന വസ്തുവും അതിലുള്ള വീടും എന്റെ [മകൻ / മകൾ / ഭാര്യ / ഗുണഭോക്താവിന്റെ പേര്] (ആധാർ: [XXXX XXXX XXXX])-ന് എന്റെ മരണശേഷം പൂർണ്ണ ഉടമസ്ഥതയോടും സർവ്വ സ്വതന്ത്ര അവകാശങ്ങളോടും കൂടി സിദ്ധിക്കുന്നതാണ്.

(B) ജംഗമ സ്വത്തുക്കൾ (Movable Properties):
എന്റെ പേരിൽ വിവിധ ബാങ്കുകളിലുള്ള സ്ഥിരനിക്ഷേപങ്ങൾ (FD), സേവിംഗ്സ് അക്കൗണ്ടുകൾ, സ്വർണ്ണാഭരണങ്ങൾ, വാഹനങ്ങൾ എന്നിവ എന്റെ മരണശേഷം [ഗുണഭോക്താവിന്റെ പേര്]-ന് ലഭിക്കുന്നതാണ്.

6. അവശിഷ്ട സ്വത്ത് വ്യവസ്ഥ (Residuary Clause):
ഈ വിൽപ്പത്രത്തിൽ പ്രത്യേകം പരാമർശിക്കാത്തതോ ഭാവിയിൽ ഏതെങ്കിലും വിധേന ഞാൻ സമ്പാദിച്ചേക്കാവുന്നതോ ആയ മറ്റെല്ലാ സ്വത്തുക്കളും [അവകാശിയുടെ പേര്]-ന് പൂർണ്ണമായി ലഭിക്കുന്നതാണ്.

സ്ഥാവര സ്വത്ത് വിവരങ്ങൾ (SCHEDULE OF IMMOVABLE PROPERTY - A SCHEDULE)
• ജില്ല (District): [ജില്ലയുടെ പേര്, ഉദാ: എറണാകുളം]
• സബ് രജിസ്ട്രാർ ഓഫീസ് (Sub-Registrar Office): [എസ്.ആർ.ഒ പേര്, ഉദാ: ഇടപ്പള്ളി]
• താലൂക്ക് (Taluk): [താലൂക്ക്, ഉദാ: കണയന്നൂർ]
• വില്ലേജ് (Village): [വില്ലേജ്, ഉദാ: ഇടപ്പള്ളി തെക്കുംഭാഗം]
• ബ്ലോക്ക് നമ്പർ (Block No.): [ബ്ലോക്ക് നമ്പർ, ഉദാ: 12]
• റീ-സർവ്വേ നമ്പർ (Re-survey No.): [റീ-സർവ്വേ നമ്പർ, ഉദാ: 245/3-1]
• പഴയ സർവ്വേ നമ്പർ (Old Survey No.): [പഴയ സർവ്വേ നമ്പർ, ഉദാ: 618/2]
• തണ്ടപ്പേർ നമ്പർ (Thandapper No.): [തണ്ടപ്പേർ നമ്പർ, ഉദാ: 14258]
• വിസ്തീർണ്ണം (Extent): [ഉദാ: 4 ആർസ് 5 സ്ക്വയർ മീറ്റർ (10 സെന്റ്)]
• തദ്ദേശസ്വയംഭരണ കെട്ടിട നമ്പർ (Door No.): [കോർപ്പറേഷൻ/പഞ്ചായത്ത് കെട്ടിട നമ്പർ]
• നാലതിരുകൾ (Four Boundaries):
   - കിഴക്ക് (East): [കിഴക്ക് അതിര് വിവരങ്ങൾ]
   - പടിഞ്ഞാറ് (West): [പടിഞ്ഞാറ് അതിര് വിവരങ്ങൾ]
   - തെക്ക് (South): [തെക്ക് അതിര് വിവരങ്ങൾ]
   - വടക്ക് (North): [വടക്ക് അതിര് വിവരങ്ങൾ]

മുകളിൽ പറഞ്ഞ വിവരങ്ങൾ എല്ലാം സത്യമാണെന്ന് പൂർണ്ണ ബോധ്യത്തോടെ സാക്ഷികളുടെ സാന്നിധ്യത്തിൽ ഞാൻ ഒപ്പുവെക്കുന്നു.

തീയതി: [തീയതി/മാസം/വർഷം]
സ്ഥലം: [സ്ഥലം]

വിൽപ്പത്ര കർത്താവിന്റെ ഒപ്പ്: ________________________
പേര്: [വിൽപ്പത്ര കർത്താവിന്റെ പേര്]

സാക്ഷികൾ (ATTESTING WITNESSES):
ഞങ്ങൾ താഴെ ഒപ്പിട്ടിരിക്കുന്ന സാക്ഷികൾ, വിൽപ്പത്ര കർത്താവായ [കർത്താവിന്റെ പേര്] സ്വബോധത്തോടും പൂർണ്ണ ആരോഗ്യത്തോടും കൂടി ഞങ്ങളുടെ സാന്നിധ്യത്തിൽ ഈ വിൽപ്പത്രത്തിൽ ഒപ്പുവെക്കുന്നത് നേരിൽ കാണുകയും, തുടർന്ന് അദ്ദേഹത്തിന്റെ/അവരുടെ അഭ്യർത്ഥനപ്രകാരവും പരസ്പര സാന്നിധ്യത്തിലും ഞങ്ങൾ സാക്ഷികളായി താഴെ ഒപ്പുവെക്കുകയും ചെയ്യുന്നു:

സാക്ഷി 1:
ഒപ്പ്: ___________________________
പേര്: [സാക്ഷി 1-ന്റെ പൂർണ്ണമായ പേര്]
മേൽവിലാസം: [മേൽവിലാസം]
ആധാർ നമ്പർ: [XXXX XXXX XXXX]
ഫോൺ/ബന്ധപ്പെടാനുള്ള വിവരം: [വിവരങ്ങൾ]

സാക്ഷി 2:
ഒപ്പ്: ___________________________
പേര്: [സാക്ഷി 2-ന്റെ പൂർണ്ണമായ പേര്]
മേൽവിലാസം: [മേൽവിലാസം]
ആധാർ നമ്പർ: [XXXX XXXX XXXX]
ഫോൺ/ബന്ധപ്പെടാനുള്ള വിവരം: [വിവരങ്ങൾ]`;

  const ENGLISH_TRANSLATION_TEXT = `LAST WILL AND TESTAMENT (ENGLISH TRANSLATION)

This Last Will and Testament is executed on this [Day] of [Month, Year] at [Place], by [Testator Full Name], son/daughter/spouse of [Father/Spouse Name], aged [Age] years, residing at [Full Residential Address, Desom, Village, Taluk, District, Kerala], holding Aadhaar No. [Aadhaar] and PAN [PAN], in full disposition of sound mental health and understanding:

Clause 1. Sound Health and Testamentary Capacity:
I declare that I am executing this Will in a sound state of mind, physical health, and with free will, without any undue influence, fraud, coercion, or misrepresentation from any person.

Clause 2. Revocation of All Prior Wills:
I hereby absolutely revoke, cancel, and annul all former Wills, Codicils, and Testamentary Dispositions made by me at any time heretofore, and declare this to be my Last Will and Testament.

Clause 3. Appointment of Executor:
I hereby appoint [Executor Name], residing at [Address], holding Aadhaar No. [Aadhaar], as the sole Executor of this my Will to carry out my directions without furnishing security.

Clause 4. Payment of Debts and Funeral Expenses:
I direct that all my just debts, funeral, testamentary, and obsequial expenses shall be paid and discharged out of my estate as soon as convenient after my demise.

Clause 5. Devise and Bequest of Estate:
I retain absolute life ownership, possession, and alienation rights over all my self-acquired and inherited properties described in the Schedule below during my natural lifetime. Upon my demise, my estate shall devolve as follows:
(A) Schedule A Immovable Property shall devolve absolutely upon my [Son/Daughter/Spouse/Beneficiary Name].
(B) All movable assets, including bank accounts, fixed deposits, gold ornaments, and securities, shall devolve upon [Beneficiary Name].

Clause 6. Residuary Bequest:
I give, devise, and bequeath all the rest, residue, and remainder of my estate, both movable and immovable, whatsoever and wheresoever situated, to [Beneficiary Name] absolutely.

SCHEDULE OF IMMOVABLE PROPERTY:
District: [District], Sub-District SRO: [SRO], Taluk: [Taluk], Village: [Village], Block No: [Block], Re-survey No: [Re-survey], Old Survey No: [Old Survey], Thandapper No: [Thandapper], Extent: [Extent in Ares / Cents], Door No: [Panchayat/Corporation No], bounded on East by [Boundary], West by [Boundary], South by [Boundary], and North by [Boundary].

IN WITNESS WHEREOF, I have hereunto set my hand and signature in the presence of the attesting witnesses.

TESTATOR SIGNATURE: _______________________
Name: [Testator Name]

ATTESTING WITNESSES:
Signed by the above-named Testator in our joint presence, and we, in their presence and at their request, have subscribed our names as witnesses:
Witness 1: [Name, Address, Aadhaar]
Witness 2: [Name, Address, Aadhaar]`;

  const copyToClipboard = (text: string, type: "malayalam" | "english" | "checklist" | "doctor") => {
    navigator.clipboard.writeText(text);
    if (type === "malayalam") {
      setCopiedMalayalam(true);
      setTimeout(() => setCopiedMalayalam(false), 2500);
    } else if (type === "english") {
      setCopiedEnglish(true);
      setTimeout(() => setCopiedEnglish(false), 2500);
    } else if (type === "checklist") {
      setCopiedChecklist(true);
      setTimeout(() => setCopiedChecklist(false), 2500);
    } else if (type === "doctor") {
      setCopiedDoctorCert(true);
      setTimeout(() => setCopiedDoctorCert(false), 2500);
    }
  };

  const DOCTOR_CERT_TEXT = `MEDICAL FITNESS CERTIFICATE FOR WILL EXECUTION IN KERALA

To Whomsoever It May Concern

This is to certify that I, Dr. [Doctor Name], MBBS / MD (Reg. No: [Travancore-Cochin Medical Council Reg No]), have clinically examined [Testator Name], aged [Age] years, residing at [Address, Kerala], on [Date] at [Time].

Based on my clinical examination and cognitive evaluation:
1. The person is fully conscious, alert, oriented to time, place, and person.
2. The person possesses sound memory, cognitive faculties, and full mental capacity.
3. The person understands the nature and legal consequences of executing a Last Will and Testament disposing of their movable and immovable properties.
4. The person is mentally capable of giving free and voluntary consent without any cognitive impairment or external coercion.

Doctor's Signature: _______________________
Doctor's Name: Dr. [Doctor Name]
Qualification & Reg. No: [Reg. No]
Hospital / Clinic Seal: [Seal]
Date: [Date]`;

  const SRO_CHECKLIST_TEXT = `KERALA SRO WILL REGISTRATION CHECKLIST (PEARL PORTAL):

1. Two Original Copies of Will (Drafted on plain white paper or green ledger paper).
2. Aadhaar Card & PAN Card of the Testator (Original + Self-attested photocopy).
3. Two Independent Attesting Witnesses with original Aadhaar cards and photos (Witnesses must NOT be beneficiaries under Section 67).
4. Title Deeds of Properties (Prior registered sale deed, partition deed, or settlement deed).
5. Land Revenue Records: Latest Land Tax Receipt (ഭൂനികുതി രസീത്), Thandapper extract, and Re-survey sketch (from e-Rekha).
6. MBBS Doctor's Mental Fitness Certificate (Mandatory for senior citizens above 65 years or hospitalized individuals).
7. PEARL Portal Online Token Booking Slip & e-Payment Receipt (Fee ₹1,000 + Computer fee ₹100).
8. Formal Application for Commission Visit under Section 31 (If registration is conducted at residence/hospital for bedridden individuals).`;

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION (Matching Theme & Color Palette)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTION 63 • KERALA PEARL SRO</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            മരണപത്രം ഫോർമാറ്റ് മലയാളം: Legal Will Format in Kerala
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            ഡൗൺലോഡ് ചെയ്യാം നിയമസാധുതയുള്ള <strong>മരണപത്രം ഫോർമാറ്റ് മലയാളം</strong> (will format in malayalam).
            മുദ്രപ്പത്രം ആവശ്യമില്ലാത്ത പ്ലെയിൻ പേപ്പർ ഫോർമാറ്റ്, സെക്ഷൻ 63 സാക്ഷി നിയമങ്ങൾ, കേരള ഹൈക്കോടതിയുടെ
            പ്രൊബേറ്റ് ഇളവുകൾ, റീ-സർവ്വേ ഷെഡ്യൂൾ, രജിസ്ട്രേഷൻ വകുപ്പിന്റെ PEARL പോർട്ടൽ നടപടിക്രമങ്ങൾ.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#malayalam-maranapathram-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <ScrollText className="w-4 h-4" />
              <span>മലയാളം വിൽപത്രം ഫോർമാറ്റ് കാണുക</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>തയ്യാറാക്കാം ഓൺലൈൻ വിൽപത്രം</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUST SIGNALS / STATS STRIP
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">സെക്ഷൻ 63</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                2 സാക്ഷി നിയമം (TWO WITNESSES)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹0 മുദ്രപ്പത്രം</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ZERO STAMP DUTY IN KERALA
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">പ്രൊബേറ്റ് ഇല്ല</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                KERALA HC PROBATE EXEMPTION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">PEARL പോർട്ടൽ</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                KERALA SRO TOKEN BOOKING
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN THREE-COLUMN LAYOUT
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
                <span>വിഷയസൂചിക (TOC)</span>
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
                Governed under Indian Succession Act 1925 Section 63, Kerala Registration Rules 1958,
                and Kerala Joint Hindu Family System (Abolition) Act 1975. Valid for Hindus, Christians,
                and Muslims across Kerala.
              </p>
            </div>

            {/* Kerala High Court Precedent Card */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 space-y-2">
              <div className="font-extrabold flex items-center gap-1.5 text-emerald-900">
                <Landmark className="w-4 h-4 text-emerald-700" />
                <span>Kerala High Court Ruling</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                <em>Mary Thomas v. Dr. K.E. Thomas</em> (1989 (2) KLT 414): Probate under Section 213 is
                NOT compulsory for properties in Kerala. Registered Will directly enables mutation.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: KERALA WILL DRAFTING RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>മുദ്രപ്പത്രം ആവശ്യമില്ല (Zero Stamp Duty):</strong> സാധാരണ വെള്ളക്കടലാസിലോ ലെഡ്ജർ
                    പേപ്പറിലോ തയ്യാറാക്കിയ വിൽപത്രത്തിന് പൂർണ്ണ നിയമസാധുതയുണ്ട്. മുദ്രപ്പത്രം നിർബന്ധമില്ല.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>രണ്ട് സ്വതന്ത്ര സാക്ഷികൾ (Section 63(c)):</strong> വിൽപത്രത്തിൽ ഗുണഭോക്താക്കൾ
                    അല്ലാത്ത 2 സാക്ഷികൾ നിർബന്ധമായും ഒപ്പിടണം. വിൽപത്ര കർത്താവ് ഒപ്പിടുന്നത് സാക്ഷികൾ നേരിൽ
                    കണ്ടിരിക്കണം.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>കോടതി പ്രൊബേറ്റ് കേരളത്തിൽ ആവശ്യമില്ല:</strong> മുംബൈ, കൊൽക്കത്ത, ചെന്നൈ പോലെ
                    കേരളത്തിൽ വിൽപത്രത്തിന് ഹൈക്കോടതി പ്രൊബേറ്റ് നിർബന്ധമല്ല. രജിസ്റ്റർ ചെയ്ത മരണപത്രം
                    നേരിട്ട് വില്ലേജിൽ പോക്കുവരവിന് പര്യാപ്തമാണ്.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>PEARL പോർട്ടൽ രജിസ്ട്രേഷൻ &amp; ഹോം വിസിറ്റ്:</strong> സബ് രജിസ്ട്രാർ ഓഫീസിൽ
                    പോകാതെ തന്നെ കിടപ്പുരോഗികൾക്കും പ്രായമായവർക്കും സെക്ഷൻ 31 പ്രകാരം വീട്ടിലിരുന്ന് കമ്മീഷൻ
                    വഴി വിൽപത്രം രജിസ്റ്റർ ചെയ്യാം.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY BASIS */}
            <section id="statutory-basis" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>നിയമപരമായ അടിത്തറ</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Basis: Indian Succession Act &amp; Kerala Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  കേരളത്തിൽ ഒരാൾ ജീവിച്ചിരിക്കുമ്പോൾ തന്റെ മരണശേഷം സ്ഥാവര ജംഗമ സ്വത്തുക്കൾ ആർക്കൊക്കെ
                  ലഭിക്കണമെന്ന് നിശ്ചയിച്ച് എഴുതിവെക്കുന്ന നിയമപരമായ രേഖയാണ് <strong>മരണപത്രം (വിൽപത്രം /
                  ഒസ്യത്ത്)</strong>. ഇന്ത്യൻ പിന്തുടർച്ചാവകാശ നിയമം, 1925 (Indian Succession Act, 1925)
                  സെക്ഷൻ 63 അനുസരിച്ചാണ് ഇന്ത്യയിലെയും കേരളത്തിലെയും വിൽപത്രങ്ങൾ തയ്യാറാക്കേണ്ടത്.
                </p>
                <p>
                  കേരളത്തിൽ മരണപത്രം എഴുതുമ്പോൾ താഴെ പറയുന്ന മൂന്ന് സുപ്രധാന നിയമപരമായ നിബന്ധനകൾ
                  പാലിച്ചിരിക്കണം:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
                    <div className="text-xs font-bold text-[#C65378] uppercase">സെക്ഷൻ 59</div>
                    <div className="font-extrabold text-slate-900 text-sm">മാനസികാരോഗ്യം (Sound Mind)</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      വിൽപത്രം തയ്യാറാക്കുന്ന വ്യക്തി പൂർണ്ണ മനഃസമ്മതത്തോടും മാനസികാരോഗ്യത്തോടും കൂടിയാണ്
                      തീരുമാനമെടുക്കുന്നതെന്ന് ഉറപ്പാക്കണം.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
                    <div className="text-xs font-bold text-[#C65378] uppercase">സെക്ഷൻ 63(c)</div>
                    <div className="font-extrabold text-slate-900 text-sm">2 സാക്ഷികൾ (Attestation)</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      വിൽപത്ര കർത്താവ് ഒപ്പിടുന്നത് നേരിൽ കണ്ട രണ്ട് സാക്ഷികൾ വേണം. അവർ ഗുണഭോക്താക്കൾ
                      ആകാൻ പാടില്ല (സെക്ഷൻ 67).
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
                    <div className="text-xs font-bold text-[#C65378] uppercase">സെക്ഷൻ 62</div>
                    <div className="font-extrabold text-slate-900 text-sm">റദ്ദാക്കാനുള്ള അവകാശം</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      ജീവിച്ചിരിക്കുന്ന കാലത്തോളം എത്ര തവണ വേണമെങ്കിലും വിൽപത്രം തിരുത്താനോ പുതിയത്
                      എഴുതി പഴയത് റദ്ദാക്കാനോ വിൽപ്പത്ര കർത്താവിന് അവകാശമുണ്ട്.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: MALAYALAM WILL FORMAT */}
            <section id="malayalam-maranapathram-format" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ScrollText className="w-4 h-4" />
                <span>ഔദ്യോഗിക കരട് രൂപം</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Complete Maranapathram Format: Native Malayalam Draft
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                കേരളത്തിലെ സബ് രജിസ്ട്രാർ ഓഫീസുകൾക്കും റവന്യൂ വില്ലേജ് ഓഫീസുകൾക്കും അനുയോജ്യമായ പൂർണ്ണ
                മലയാളം വിൽപത്രം കരട് താഴെ നൽകുന്നു. ഇത് പകർത്തി നിങ്ങളുടെ വിശദാംശങ്ങൾ അനുസരിച്ച് മാറ്റിയെഴുതാവുന്നതാണ്.
              </p>

              {/* Template Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>സമ്പൂർണ്ണ മരണപത്രം ഫോർമാറ്റ് (NATIVE MALAYALAM WILL DRAFT)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(MALAYALAM_WILL_TEXT, "malayalam")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      {copiedMalayalam ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">പകർത്തി (Copied)!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>പകർപ്പിയെടുക്കുക (Copy Draft)</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>പ്രിന്റ്</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-7 bg-[#FFFDF9] font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap max-h-[620px] overflow-y-auto border-t border-slate-200">
                  {MALAYALAM_WILL_TEXT}
                </div>
              </div>
            </section>

            {/* SECTION 3: ENGLISH TRANSLATION */}
            <section id="english-translation" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>ഇംഗ്ലീഷ് പരിഭാഷ</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. English Translation: Malayalam Will Clauses Explained
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                For Non-Resident Indians (NRIs) living in the Gulf, UK, US, and financial institutions
                requiring an English translation of Malayalam Will clauses, below is the legally certified
                English equivalent.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-800 text-white px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-200">
                    <Globe className="w-4 h-4 text-[#C65378]" />
                    <span>ENGLISH TRANSLATION OF MALAYALAM DRAFT</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(ENGLISH_TRANSLATION_TEXT, "english")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedEnglish ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy English Draft</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 sm:p-7 bg-slate-50 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap max-h-[500px] overflow-y-auto border-t border-slate-200">
                  {ENGLISH_TRANSLATION_TEXT}
                </div>
              </div>
            </section>

            {/* SECTION 4: INTERACTIVE CLAUSE SELECTOR */}
            <section id="clause-selector" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sliders className="w-4 h-4" />
                <span>പ്രത്യേക വ്യവസ്ഥകൾ</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Interactive Clause Selector: Customize Your Kerala Will
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                കുടുംബത്തിന്റെ സവിശേഷ സാഹചര്യങ്ങൾക്കനുസരിച്ച് വിൽപത്രത്തിൽ ഉൾപ്പെടുത്തേണ്ട പ്രത്യേക
                വ്യവസ്ഥകൾ താഴെ നിന്നും തിരഞ്ഞെടുക്കുക:
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
                {/* Clause Tabs */}
                <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100">
                  {CLAUSES_OPTIONS.map((c) => {
                    const isSelected = selectedClauseId === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedClauseId(c.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {c.title.split("(")[0]}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Clause Display */}
                <div className="space-y-4">
                  <div className="font-extrabold text-sm sm:text-base text-slate-900">
                    {selectedClauseData.title}
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      മലയാളം വ്യവസ്ഥ (Malayalam Clause)
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                      {selectedClauseData.malayalam}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      ഇംഗ്ലീഷ് പരിഭാഷ (English Translation)
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {selectedClauseData.english}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `${selectedClauseData.malayalam}\n\n[English Translation]:\n${selectedClauseData.english}`,
                          "malayalam"
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>ഈ വ്യവസ്ഥ പകർത്തിയെടുക്കുക</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: KERALA LAND SCHEDULE */}
            <section id="kerala-land-schedule" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>ഭൂമി ഷെഡ്യൂൾ രേഖപ്പെടുത്തൽ</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Kerala Land Schedule: Resurvey &amp; Thandapper Details
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  കേരളത്തിൽ രജിസ്ട്രേഷൻ നടത്തുമ്പോഴും വില്ലേജ് ഓഫീസിൽ പോക്കുവരവ് (പോക്കുവരവ് / കരമടയ്ക്കൽ)
                  നടത്തുമ്പോഴും ഏറ്റവും കൂടുതൽ തടസ്സങ്ങൾ ഉണ്ടാകുന്നത് വസ്തു വിവരങ്ങൾ (Schedule of Property)
                  അപൂർണ്ണമായി എഴുതുന്നത് വഴിയാണ്.
                </p>
                <p>
                  കേരള റവന്യൂ ചട്ടങ്ങൾ പ്രകാരം ഒരു മരണപത്രത്തിൽ താഴെ പറയുന്ന വിവരങ്ങൾ നിർബന്ധമായും
                  ഉൾപ്പെടുത്തിയിരിക്കണം:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1.5 shadow-2xs">
                    <div className="font-extrabold text-xs text-[#C65378] uppercase">
                      1. റീ-സർവ്വേ &amp; പഴയ സർവ്വേ
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      റീ-സർവ്വേ പൂർത്തിയായ വില്ലേജുകളിൽ ബ്ലോക്ക് നമ്പർ, റീ-സർവ്വേ സബ് ഡിവിഷൻ നമ്പർ എന്നിവയോടൊപ്പം
                      പഴയ സർവ്വേ നമ്പരും രേഖപ്പെടുത്തണം. ഇത് ഇ-രേഖ (e-Rekha) പോർട്ടലുമായി ഒത്തുനോക്കാൻ സഹായിക്കും.
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1.5 shadow-2xs">
                    <div className="font-extrabold text-xs text-[#C65378] uppercase">
                      2. തണ്ടപ്പേർ അക്കൗണ്ട് നമ്പർ
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      വില്ലേജ് ഓഫീസിൽ കരം തീർപ്പാക്കുന്ന തണ്ടപ്പേർ നമ്പർ (Thandapper Account No) കൃത്യമായി
                      എഴുതണം. ഇത് മരണശേഷം അവകാശിയുടെ പേരിലേക്ക് കരം മാറ്റാൻ അത്യന്താപേക്ഷിതമാണ്.
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1.5 shadow-2xs">
                    <div className="font-extrabold text-xs text-[#C65378] uppercase">
                      3. വിസ്തീർണ്ണം (ആർസ് / സെന്റ്)
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      മെട്രിക് അളവുകോലായ ആർസ് (Ares), സ്ക്വയർ മീറ്റർ എന്നിവയോടൊപ്പം സാധാരണ ഉപയോഗിക്കുന്ന
                      സെന്റ് (Cents) അളവും രേഖപ്പെടുത്തുന്നത് തെറ്റിദ്ധാരണകൾ ഒഴിവാക്കും (1 ആർ = 2.47 സെന്റ്).
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1.5 shadow-2xs">
                    <div className="font-extrabold text-xs text-[#C65378] uppercase">
                      4. നാലതിരുകൾ (Four Boundaries)
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      കിഴക്ക്, പടിഞ്ഞാറ്, തെക്ക്, വടക്ക് എന്നീ അതിരുകളിൽ ആരുടെയൊക്കെ ഭൂമിയാണ് അല്ലെങ്കിൽ റോഡാണോ
                      തോടാണോ എന്ന് കൃത്യമായി കാണിക്കണം.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: KERALA PROBATE EXEMPTION */}
            <section id="kerala-probate-exemption" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>ഹൈക്കോടതി വിധി &amp; പ്രൊബേറ്റ് ഇളവ്</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Kerala Probate Moat: Why High Court Probate Is Exempt
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  ഇന്ത്യയിലെ പല ഓൺലൈൻ പോർട്ടലുകളും ബാങ്കുകളും വിൽപത്ര പ്രകാരം സ്വത്ത് കൈമാറ്റം ചെയ്യാൻ
                  കോടതിയിൽ നിന്നുള്ള പ്രൊബേറ്റ് (Probate of Will) വേണമെന്ന് തെറ്റായി ആവശ്യപ്പെടാറുണ്ട്.
                  എന്നാൽ <strong>കേരളത്തിലെ സ്വത്തുക്കൾക്ക് പ്രൊബേറ്റ് ആവശ്യമില്ല</strong> എന്നതാണ് നിയമപരമായ
                  യാഥാർത്ഥ്യം.
                </p>
                <div className="rounded-2xl bg-rose-50/60 border border-rose-200 p-5 space-y-3">
                  <div className="font-extrabold text-sm text-[#C65378] flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>സെക്ഷൻ 213(2) &amp; സെക്ഷൻ 57 ഇന്ത്യൻ പിന്തുടർച്ചാവകാശ നിയമം</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    ഇന്ത്യൻ പിന്തുടർച്ചാവകാശ നിയമം സെക്ഷൻ 213(1) പ്രകാരമുള്ള നിർബന്ധിത പ്രൊബേറ്റ് വ്യവസ്ഥ
                    പഴയ ബ്രിട്ടീഷ് പ്രസിഡൻസി നഗരങ്ങളായ മുംബൈ, കൊൽക്കത്ത, ചെന്നൈ എന്നീ നഗരങ്ങളുടെ പരിധിയിൽ
                    എഴുതപ്പെട്ടതോ അവിടുത്തെ സ്വത്തുക്കൾ ഉൾപ്പെട്ടതോ ആയ വിൽപത്രങ്ങൾക്ക് മാത്രമാണ് ബാധകം.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    കേരള ഹൈക്കോടതിയുടെ ഡിവിഷൻ ബെഞ്ച് <em>Mary Thomas v. Dr. K.E. Thomas</em> (1989 (2) KLT 414),
                    <em> Chellappan Nadar v. Varathan Nadar</em>, <em>Vincent v. Varghese</em> (2018) എന്നീ
                    വിധികളിലൂടെ വ്യക്തമാക്കിയിട്ടുള്ളത്: കേരളത്തിലെ ഹിന്ദുക്കൾക്കോ ക്രിസ്ത്യാനികൾക്കോ മുസ്ലിങ്ങൾക്കോ
                    വിൽപത്ര പ്രകാരം അവകാശം സ്ഥാപിക്കാൻ കോടതി പ്രൊബേറ്റ് ആവശ്യമില്ല. രജിസ്റ്റർ ചെയ്ത മരണപത്രം
                    വില്ലേജ് ഓഫീസിലും തദ്ദേശസ്ഥാപനങ്ങളിലും ബാങ്കുകളിലും പൂർണ്ണമായും സാധുവാണ്.
                  </p>
                </div>
              </div>
            </section>

            {/* Visual Editorial Banner in Middle of Scrollable Content */}
            <div className="my-8 rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/will-format-malayalam-maranapathram-og.jpg"
                  alt="Will Format in Malayalam: മരണപത്രം ഫോർമാറ്റ് മലയാളം (Maranapathram) Legal Template"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="px-5 py-3.5 bg-slate-900 text-white text-xs flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-800">
                <span className="font-semibold text-rose-300">
                  മരണപത്രം ഫോർമാറ്റ് മലയാളം / Will Format in Malayalam Kerala
                </span>
                <span className="text-[11px] text-slate-400">
                  Compliant with Section 63 Indian Succession Act 1925 &amp; Kerala PEARL Portal
                </span>
              </div>
            </div>

            {/* SECTION 7: PEARL FEE CALCULATOR */}
            <section id="pearl-fee-calculator" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>രജിസ്ട്രേഷൻ ഫീസ് കാൽക്കുലേറ്റർ</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. PEARL Portal Fee Guide &amp; SRO Registration Rules
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                കേരള രജിസ്ട്രേഷൻ വകുപ്പിന്റെ PEARL പോർട്ടൽ ചട്ടങ്ങൾ അനുസരിച്ചുള്ള ഔദ്യോഗിക സർക്കാർ ഫീസ്
                താഴെ കണക്കാക്കാം:
              </p>

              {/* Calculator Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      രജിസ്ട്രേഷൻ രീതി (Mode of Registration)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRegistrationMode("sro")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          registrationMode === "sro"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        സബ് രജിസ്ട്രാർ ഓഫീസ്
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegistrationMode("commission")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          registrationMode === "commission"
                            ? "bg-[#C65378] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        വീട് / ആശുപത്രി വിസിറ്റ്
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      വിൽപ്പത്ര കർത്താക്കളുടെ എണ്ണം (Testators)
                    </label>
                    <select
                      value={testatorCount}
                      onChange={(e) => setTestatorCount(Number(e.target.value))}
                      className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value={1}>1 വ്യക്തി (Individual Will)</option>
                      <option value={2}>2 വ്യക്തികൾ (Joint Will / ദമ്പതികൾ)</option>
                    </select>
                  </div>
                </div>

                {/* Calculation Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 text-center">
                  <div>
                    <div className="text-xs text-slate-600 font-medium">മുദ്രപ്പത്ര ഫീസ്</div>
                    <div className="text-lg font-black text-emerald-700">₹0 (ശൂന്യം)</div>
                    <div className="text-[10px] text-slate-500">Zero Stamp Duty</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 font-medium">രജിസ്ട്രേഷൻ ഫീസ്</div>
                    <div className="text-lg font-black text-slate-900">₹{baseRegFee}</div>
                    <div className="text-[10px] text-slate-500">₹1,000 per testator</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 font-medium">കമ്പ്യൂട്ടർ സർവീസ്</div>
                    <div className="text-lg font-black text-slate-900">₹{computerFee}</div>
                    <div className="text-[10px] text-slate-500">Digital Scanning</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 font-medium">കമ്മീഷൻ വിസിറ്റ്</div>
                    <div className="text-lg font-black text-[#C65378]">₹{commissionFee}</div>
                    <div className="text-[10px] text-slate-500">Sec 31 Attendance</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 text-white">
                  <div>
                    <div className="text-xs text-rose-300 font-bold uppercase tracking-wider">
                      ആകെ സർക്കാർ ഫീസ് (TOTAL GOVERNMENT FEE)
                    </div>
                    <div className="text-2xl font-black text-white">₹{totalGovtFee}</div>
                  </div>
                  <div className="text-xs text-slate-300 text-right">
                    *യാത്രാബത്ത (TA) സബ് രജിസ്ട്രാർ ഓഫീസിലെ ദൂരത്തിനനുസരിച്ച് നേരിട്ട് നൽകേണ്ടതാണ്.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>താരതമ്യ പട്ടിക</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparison: Registered Will vs Dhanam vs Ozhivupathram
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  കേരളത്തിൽ കുടുംബ സ്വത്തുക്കൾ അടുത്ത തലമുറയിലേക്ക് കൈമാറാൻ വിൽപത്രം കൂടാതെ ധനനിശ്ചയം
                  (Dhanam), ഒഴിവുമുറി (Release Deed), ഭാഗപത്രം (Partition) എന്നിവയും ഉപയോഗിക്കാറുണ്ട്.
                  അവ തമ്മിലുള്ള പ്രധാന വ്യത്യാസങ്ങൾ:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs bg-white">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">ഘടകം (Parameter)</th>
                        <th className="p-3.5 text-rose-300">രജിസ്റ്റർ ചെയ്ത വിൽപത്രം</th>
                        <th className="p-3.5">ധനനിശ്ചയ ആധാരം (Dhanam)</th>
                        <th className="p-3.5">ഒഴിവുമുറി ആധാരം (Release)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">മുദ്രപ്പത്ര ഫീസ് (Stamp Duty)</td>
                        <td className="p-3.5 font-bold text-emerald-700">₹0 (പൂർണ്ണമായും ശൂന്യം)</td>
                        <td className="p-3.5">കുടുംബത്തിൽ പരമാവധി ₹1,000</td>
                        <td className="p-3.5">കുടുംബത്തിൽ പരമാവധി ₹1,000</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">പ്രാബല്യത്തിൽ വരുന്ന സമയം</td>
                        <td className="p-3.5 font-bold text-rose-700">മരണശേഷം മാത്രം</td>
                        <td className="p-3.5">രജിസ്ട്രേഷൻ ദിവസം മുതൽ</td>
                        <td className="p-3.5">രജിസ്ട്രേഷൻ ദിവസം മുതൽ</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">റദ്ദാക്കാനുള്ള അവകാശം (Revocability)</td>
                        <td className="p-3.5 font-bold text-emerald-700">ജീവിതാവസാനം വരെ സാധ്യമാണ്</td>
                        <td className="p-3.5 text-rose-700">ഏകപക്ഷീയമായി റദ്ദാക്കാൻ കഴിയില്ല</td>
                        <td className="p-3.5 text-rose-700">റദ്ദാക്കാൻ സാധ്യമല്ല</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">ജീവിച്ചിരിക്കുമ്പോൾ ഉടമസ്ഥാവകാശം</td>
                        <td className="p-3.5 font-bold text-emerald-700">കർത്താവിന് 100% ഉടമസ്ഥത</td>
                        <td className="p-3.5 text-slate-600">ഗുണഭോക്താവിന് കൈമാറപ്പെടുന്നു</td>
                        <td className="p-3.5 text-slate-600">അവകാശം ഉപേക്ഷിക്കപ്പെടുന്നു</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">പോക്കുവരവ് ഫീസ്</td>
                        <td className="p-3.5">മരണ സർട്ടിഫിക്കറ്റ് സഹിതം നോമിനൽ ഫീസ്</td>
                        <td className="p-3.5">ഉടൻ തന്നെ പുതിയ തണ്ടപ്പേർ</td>
                        <td className="p-3.5">ശേഷിക്കുന്നവരുടെ തണ്ടപ്പേർ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP DRAFTING TO REGISTRATION SOP */}
            <section id="registration-sop" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>ഘട്ടങ്ങൾ (SOP)</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Drafting to Registration in Kerala
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  കേരളത്തിൽ ഒരു വിൽപത്രം തയ്യാറാക്കി രജിസ്ട്രേഷൻ പൂർത്തിയാക്കുന്നതിനുള്ള 5 സുപ്രധാന ഘട്ടങ്ങൾ:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">
                        സ്വത്ത് രേഖകളും റീ-സർവ്വേ നമ്പറുകളും ശേഖരിക്കുക
                      </div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        മുൻ ആധാരം, ഏറ്റവും പുതിയ ഭൂനികുതി രസീത്, തണ്ടപ്പേർ പകർപ്പ്, ബാങ്ക് അക്കൗണ്ട് വിവരങ്ങൾ
                        എന്നിവ തയ്യാറാക്കുക. റീ-സർവ്വേ ബ്ലോക്കും നമ്പറും ഇ-രേഖ പോർട്ടലിൽ പരിശോധിച്ച് ഉറപ്പാക്കുക.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">
                        കരട് തയ്യാറാക്കലും 2 സാക്ഷികളെ കണ്ടെത്തലും
                      </div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        മേൽ കൊടുത്ത മലയാളം ഫോർമാറ്റിൽ വിൽപത്രം പ്ലെയിൻ പേപ്പറിലോ ലെഡ്ജർ പേപ്പറിലോ തയ്യാറാക്കുക.
                        ഗുണഭോക്താക്കൾ അല്ലാത്ത 2 വിശ്വസ്തരായ സാക്ഷികളെ തിരഞ്ഞെടുക്കുക (സുഹൃത്തുക്കൾ, ഡോക്ടർ, അയൽവാസികൾ).
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">
                        ഡോക്ടറുടെ മെഡിക്കൽ ഫിറ്റ്നസ് സർട്ടിഫിക്കറ്റ്
                      </div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        മുതിർന്ന പൗരന്മാരാണെങ്കിൽ (65 വയസ്സിന് മുകളിൽ) അല്ലെങ്കിൽ കിടപ്പിലാണെങ്കിൽ MBBS
                        ഡോക്ടറുടെ ഫിറ്റ്നസ് സർട്ടിഫിക്കറ്റ് വാങ്ങുക. ഇത് ഭാവിയിൽ ഉയരാനിടയുള്ള തർക്കങ്ങൾ തടയും.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">
                        PEARL പോർട്ടൽ വഴി ഓൺലൈൻ ടോക്കൺ ബുക്കിംഗ്
                      </div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        കേരള രജിസ്ട്രേഷൻ വകുപ്പിന്റെ PEARL പോർട്ടലിൽ (pearl.keralaregistration.gov.in) ലോഗിൻ
                        ചെയ്ത് സബ് രജിസ്ട്രാർ ഓഫീസിലേക്ക് തീയതിയും സമയവും ബുക്ക് ചെയ്യുക. ഫീസ് ₹1,100 ഓൺലൈനായി
                        അടയ്ക്കുക.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      5
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">
                        സബ് രജിസ്ട്രാർക്ക് മുന്നിൽ ഹാജരാകലും ബയോമെട്രിക് രജിസ്ട്രേഷനും
                      </div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        നിശ്ചിത സമയത്ത് വിൽപ്പത്ര കർത്താവും 2 സാക്ഷികളും ആധാർ കാർഡുമായി എസ്.ആർ.ഒയിൽ ഹാജരാകുക
                        (അല്ലെങ്കിൽ കമ്മീഷൻ വിസിറ്റിൽ വീട്ടിൽ). ഫോട്ടോയും വിരലടയാളവും രേഖപ്പെടുത്തി രജിസ്ട്രേഷൻ
                        പൂർത്തിയാക്കി രസീത് കൈപ്പറ്റുക.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: POKKUVARAV SOP */}
            <section id="pokkuvarav-sop" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>പോക്കുവരവ് &amp; തണ്ടപ്പേർ മാറ്റം</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Pokkuvarav SOP: Thandapper Transfer at Village Office
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  വിൽപത്രം എഴുതിയ വ്യക്തി മരണമടഞ്ഞാൽ മാത്രമേ വിൽപത്രം പ്രാബല്യത്തിൽ വരികയുള്ളൂ. മരണശേഷം
                  വില്ലേജ് ഓഫീസിൽ അവകാശിയുടെ പേരിലേക്ക് പോക്കുവരവ് (Transfer of Registry) നടത്തുന്നതിനുള്ള
                  നടപടിക്രമം:
                </p>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 text-xs sm:text-sm">
                  <div className="font-bold text-slate-900">ആവശ്യമായ രേഖകൾ:</div>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                    <li>പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി നൽകിയ ഒറിജിനൽ മരണ സർട്ടിഫിക്കറ്റ്.</li>
                    <li>രജിസ്റ്റർ ചെയ്ത വിൽപത്രത്തിന്റെ സാക്ഷ്യപ്പെടുത്തിയ പകർപ്പ് (Certified Copy from SRO).</li>
                    <li>PEARL പോർട്ടലിൽ നിന്നും എടുത്ത എൻകംബ്രൻസ് സർട്ടിഫിക്കറ്റ് (EC).</li>
                    <li>മുൻ ആധാര പകർപ്പും ഒടുവിലത്തെ കരമടച്ച രസീതും.</li>
                  </ul>
                  <div className="pt-2 font-bold text-slate-900">നടപടിക്രമം:</div>
                  <p className="text-slate-600 leading-relaxed">
                    കേരള റവന്യൂ വകുപ്പിന്റെ പോർട്ടൽ വഴി (revenue.kerala.gov.in) ഓൺലൈനായി പോക്കുവരവിന് അപേക്ഷിക്കുക.
                    വില്ലേജ് ഓഫീസർ ഫീൽഡ് ഇൻസ്പെക്ഷൻ നടത്തി തണ്ടപ്പേർ അക്കൗണ്ട് മാറ്റി നൽകും. ഇതിനായി കോടതി
                    പ്രൊബേറ്റ് സർട്ടിഫിക്കറ്റ് നിർബന്ധമല്ല.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: PRACTICAL CASE STUDIES */}
            <section id="case-studies" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>കേസ് പഠനങ്ങൾ</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Practical Case Studies: Kochi, Kozhikode &amp; Thrissur
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                {/* Case 1 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>കേസ് 1: ഗൾഫ് പ്രവാസിയുടെ കൊച്ചിയിലെ ഫ്ലാറ്റും കോഴിക്കോട്ടെ കുടുംബവീടും</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                      NRI ESTATE
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ദുബായിൽ ജോലി ചെയ്യുന്ന രാമചന്ദ്രൻ (58) കൊച്ചി മറൈൻ ഡ്രൈവിലെ ഫ്ലാറ്റും കോഴിക്കോട്ടെ
                    പൂർവ്വിക സ്വത്തും മക്കൾക്കായി ഭാഗിക്കാൻ ആഗ്രഹിച്ചു. ഒരു രജിസ്റ്റർ ചെയ്ത മരണപത്രത്തിലൂടെ
                    ഫ്ലാറ്റ് മകൾക്കും കുടുംബവീട് മകനും നൽകി, തങ്ങളുടെ ജീവിതാവസാനം വരെ ഭാര്യക്ക് മുഴുവൻ
                    ആദായവും താമസാവകാശവും ഉറപ്പുവരുത്തി. നാട്ടിൽ അവധിക്ക് വന്നപ്പോൾ ഇടപ്പള്ളി സബ് രജിസ്ട്രാർ
                    ഓഫീസിൽ PEARL വഴി രജിസ്ട്രേഷൻ പൂർത്തിയാക്കി.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>കേസ് 2: തൃശ്ശൂരിലെ മുതിർന്ന പൗരന് ഹോം കമ്മീഷൻ വിസിറ്റ് രജിസ്ട്രേഷൻ</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      COMMISSION SRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    തൃശ്ശൂരിലെ വാസുദേവൻ നമ്പൂതിരി (82) വാർദ്ധക്യസഹജമായ അസുഖങ്ങളാൽ കിടപ്പിലായിരുന്നു. സബ് രജിസ്ട്രാർ
                    ഓഫീസിൽ നേരിട്ടെത്താൻ സാധിക്കാത്തതിനാൽ സെക്ഷൻ 31 പ്രകാരം കമ്മീഷൻ അപേക്ഷ സമർപ്പിച്ചു. സബ് രജിസ്ട്രാർ
                    വീട്ടിലെത്തി ഡോക്ടറുടെ സർട്ടിഫിക്കറ്റ് പരിശോധിച്ച് ഫോട്ടോയും വിരലടയാളവും രേഖപ്പെടുത്തി വിൽപത്രം
                    നിയമപരമായി രജിസ്റ്റർ ചെയ്തു.
                  </p>
                </div>

                {/* Case 3 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>കേസ് 3: കോട്ടയത്തെ ക്രിസ്ത്യൻ കുടുംബത്തിന് പ്രൊബേറ്റ് ഇല്ലാതെ പോക്കുവരവ്</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                      CHRISTIAN WILL
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    കോട്ടയത്തെ ജോസഫ് മാത്യുവിന്റെ മരണശേഷം മകൻ റബ്ബർ തോട്ടം പോക്കുവരവ് ചെയ്യാൻ ചെന്നപ്പോൾ വില്ലേജ്
                    ഓഫീസർ കോടതി പ്രൊബേറ്റ് ആവശ്യപ്പെട്ടു. എന്നാൽ കേരള ഹൈക്കോടതിയുടെ ഡിവിഷൻ ബെഞ്ച് ഉത്തരവുകൾ
                    (Mary Thomas case) ഉദ്ധരിച്ച് അഭിഭാഷകൻ വിശദീകരണം നൽകിയതോടെ, കോടതി വ്യവഹാരങ്ങൾ ഇല്ലാതെ തന്നെ
                    വില്ലേജ് ഓഫീസിൽ പുതിയ തണ്ടപ്പേരിലേക്ക് വിജയകരമായി പോക്കുവരവ് പൂർത്തിയായി.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: CHECKLIST & MEDICAL CERTIFICATE */}
            <section id="checklist-medical-cert" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>രേഖകളും മെഡിക്കൽ സർട്ടിഫിക്കറ്റും</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Sub-Registrar Document Checklist &amp; Doctor Certificate
              </h2>

              {/* SRO Checklist */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>സബ് രജിസ്ട്രാർ ഓഫീസിലേക്ക് ആവശ്യമുള്ള രേഖകൾ (Checklist)</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(SRO_CHECKLIST_TEXT, "checklist")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedChecklist ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
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
                <div className="p-4 rounded-2xl bg-[#FAF7F0] font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {SRO_CHECKLIST_TEXT}
                </div>
              </div>

              {/* Doctor Medical Certificate */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                    <span>ഡോക്ടറുടെ മാനസികാരോഗ്യ സർട്ടിഫിക്കറ്റ് (Doctor Certificate)</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(DOCTOR_CERT_TEXT, "doctor")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedDoctorCert ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Doctor Certificate</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {DOCTOR_CERT_TEXT}
                </div>
              </div>
            </section>

            {/* SECTION 13: SUCCESSION TOOLS */}
            <section id="succession-tools" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>ബന്ധപ്പെട്ട കാൽക്കുലേറ്ററുകൾ &amp; ടൂളുകൾ</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Contextual Estate Calculators &amp; Succession Tools
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                വിൽപത്ര തയ്യാറാക്കലിനും അനന്തരാവകാശ സ്വത്തുക്കളുടെ നികുതി കണക്കാക്കലിനുമുള്ള മറ്റ് ഓൺലൈൻ ടൂളുകൾ:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] hover:shadow-md transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">ബജറ്റ് 2024 കാൽക്കുലേറ്റർ</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C65378] transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Inherited Property Capital Gains Calculator
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    പാരമ്പര്യമായി കിട്ടിയ ഭൂമിയോ വീടോ വിൽക്കുമ്പോൾ 12.5% ഫ്ലാറ്റ് ടാക്സും 20% ഇൻഡെക്സേഷനും താരതമ്യം ചെയ്യുക.
                  </p>
                </Link>

                <Link
                  href="/tools/probate-checker"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] hover:shadow-md transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">കോടതി പരിശോധന</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C65378] transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Probate Requirement Checker India
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    നിങ്ങളുടെ സംസ്ഥാനത്തോ നഗരത്തിലോ വിൽപത്രത്തിന് പ്രൊബേറ്റ് നിർബന്ധമാണോ എന്ന് പരിശോധിക്കുക.
                  </p>
                </Link>

                <Link
                  href="/tools/succession-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] hover:shadow-md transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">അവകാശ വിഹിതം</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C65378] transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Legal Heir Share Calculator
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    വിൽപത്രം ഇല്ലാതെ മരിച്ചാൽ മക്കൾക്കും ഭാര്യക്കും മാതാവിനും ലഭിക്കുന്ന നിയമാനുസൃത ഓഹരി അറിയുക.
                  </p>
                </Link>

                <Link
                  href="/services/will-registration"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] hover:shadow-md transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">എസ്.ആർ.ഒ സർവീസ്</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C65378] transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Will Registration Assistance Service
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    കേരളത്തിലെ സബ് രജിസ്ട്രാർ ഓഫീസുകളിലും കമ്മീഷൻ ഹോം രജിസ്ട്രേഷനിലും അഭിഭാഷക സഹായം.
                  </p>
                </Link>
              </div>
            </section>

            {/* SECTION 14: LEGAL BACKING */}
            <section id="legal-backing" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>അഭിഭാഷക മേൽനോട്ടം</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Legal Backing: Senior Counsel Succession Profile
              </h2>
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C65378] font-black text-xl flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-lg">Advocate Anuj Anand Malik</div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Succession Counsel • AMA Legal Solutions
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Expert in Indian Succession Act, High Court Probate Jurisprudence &amp; NRI Estate Structuring
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  ഇന്ത്യയിലെ വിവിധ സംസ്ഥാനങ്ങളിലെ സവിശേഷ പിന്തുടർച്ചാവകാശ നിയമങ്ങളിലും വസ്തു കൈമാറ്റ
                  തർക്കങ്ങളിലും 15 വർഷത്തിലധികം പരിചയസമ്പന്നനായ സീനിയർ അഡ്വക്കേറ്റ് അനുജ് ആനന്ദ് മാലിക്കിന്റെ
                  നേതൃത്വത്തിലാണ് ഈ ഫോർമാറ്റുകളും നിയമ നിർദ്ദേശങ്ങളും പരിശോധിച്ചുറപ്പിച്ചിട്ടുള്ളത്.
                </p>
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Verified Legal Practice</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Building className="w-4 h-4 text-slate-500" />
                    <span>Bar Council Registered</span>
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 15: FAQS */}
            <section id="faqs" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>സംശയനിവാരണം</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Frequently Asked Questions: Kerala Maranapathram
              </h2>
              <div className="space-y-3">
                {FAQS_DATA.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
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

            {/* SECTION 16: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>ഔദ്യോഗിക റഫറൻസുകൾ</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                16. Official Kerala Statutory References &amp; Portals
              </h2>
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  ഈ മാർഗ്ഗനിർദ്ദേശങ്ങളിൽ പരാമർശിച്ചിട്ടുള്ള ഔദ്യോഗിക നിയമങ്ങളും സർക്കാർ പോർട്ടലുകളും താഴെ നൽകുന്നു:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                  <li>
                    <strong>ഇന്ത്യൻ പിന്തുടർച്ചാവകാശ നിയമം, 1925 (Section 63):</strong> വിൽപത്ര തയ്യാറാക്കലും
                    സാക്ഷ്യപ്പെടുത്തലും.
                  </li>
                  <li>
                    <strong>രജിസ്ട്രേഷൻ ആക്ട്, 1908 (Section 18 &amp; 31):</strong> ഐച്ഛിക രജിസ്ട്രേഷനും കമ്മീഷൻ
                    വിസിറ്റും.
                  </li>
                  <li>
                    <strong>കേരള സ്റ്റാമ്പ് ആക്ട്, 1959 (Schedule 60):</strong> വിൽപത്രങ്ങൾക്കുള്ള സീറോ സ്റ്റാമ്പ് ഡ്യൂട്ടി.
                  </li>
                  <li>
                    <strong>കേരള ജോയിന്റ് ഹിന്ദു ഫാമിലി സിസ്റ്റം (അബോലിഷൻ) ആക്ട്, 1975:</strong> ജന്മാവകാശ റദ്ദാക്കലും
                    വ്യക്തിഗത സ്വത്തവകാശവും.
                  </li>
                </ul>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2.5">
                  <a
                    href="https://pearl.keralaregistration.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold text-xs"
                  >
                    <span>Kerala PEARL Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://erekha.kerala.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold text-xs"
                  >
                    <span>e-Rekha Land Records</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://revenue.kerala.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold text-xs"
                  >
                    <span>Kerala Revenue e-Services</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://hckerala.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold text-xs"
                  >
                    <span>High Court of Kerala</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR PROFILE */}
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
                Specialist in Indian testamentary jurisprudence, Kerala High Court probate rules,
                and Gulf NRI estate planning across Ernakulam, Kozhikode, and Trivandrum.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Legal Counsel</span>
                </span>
              </div>
            </div>

            {/* CARD 2: DUAL CTA 1 - SELF SERVE DRAFTING */}
            <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                <Sparkles className="w-3 h-3 text-[#C65378]" />
                <span>ഓൺലൈൻ വിൽപത്രം തയ്യാറാക്കാം</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                തയ്യാറാക്കാം 100% നിയമസാധുതയുള്ള മരണപത്രം
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                സെക്ഷൻ 63 ചട്ടങ്ങൾ പാലിച്ച് ലളിതമായ ചോദ്യങ്ങൾക്ക് മറുപടി നൽകി മിനിറ്റുകൾക്കുള്ളിൽ വിൽപത്രം രൂപകൽപ്പന ചെയ്യുക.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>വിൽപത്രം നിർമ്മിക്കുക</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (STRICTLY NO MOBILE NUMBERS) */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-800">
                <UserCheck className="w-3 h-3 text-[#C65378]" />
                <span>അഭിഭാഷക സഹായം</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                Need Custom Will Drafting or SRO Assistance?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                കുടുംബ തർക്കങ്ങൾ, പ്രവാസി സ്വത്തുക്കൾ, വിൽപത്രം രജിസ്ട്രേഷൻ എന്നിവയിൽ AMA Legal Solutions
                അഭിഭാഷകരുടെ നിയമോപദേശം തേടുക.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
              >
                <span>Consult Senior Succession Advocate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* CARD 4: KERALA JURISDICTION QUICK CARD */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 space-y-2 text-xs text-emerald-950">
              <div className="font-extrabold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Kerala SRO Facts</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-emerald-800 list-disc pl-4 leading-relaxed">
                <li>മുദ്രപ്പത്രം ആവശ്യമില്ല (₹0 Stamp Duty).</li>
                <li>രജിസ്ട്രേഷൻ ഫീസ്: ₹1,000 + ₹100.</li>
                <li>2 സാക്ഷികൾ നിർബന്ധം (ഗുണഭോക്താക്കൾ ആകരുത്).</li>
                <li>കിടപ്പുരോഗികൾക്ക് ഹോം വിസിറ്റ് സൗകര്യം.</li>
                <li>കോടതി പ്രൊബേറ്റ് കേരളത്തിൽ നിർബന്ധമല്ല.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
