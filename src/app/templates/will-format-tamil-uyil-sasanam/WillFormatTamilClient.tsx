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
  { id: "statutory-basis", label: "1. Statutory Basis: Indian Succession Act & TN Rules" },
  { id: "tamil-uyil-format", label: "2. Complete Uyil Sasanam Format: Native Tamil Draft" },
  { id: "english-translation", label: "3. English Translation: Tamil Uyil Clauses Explained" },
  { id: "clause-selector", label: "4. Interactive Clause Selector: Tailor Your Uyil" },
  { id: "chennai-probate-rules", label: "5. Chennai Probate Moat: Section 213 High Court Rules" },
  { id: "sro-fee-calculator", label: "6. Tamil Nadu SRO Fee Calculator & Registration Rules" },
  { id: "comparison-table", label: "7. Comparison: Registered Uyil vs Settlement vs Patta" },
  { id: "step-by-step-sop", label: "8. Step-by-Step SOP: Drafting to Registration in TN" },
  { id: "case-studies", label: "9. Practical Case Studies: Chennai, Madurai & Kovai" },
  { id: "checklist-medical-cert", label: "10. Sub-Registrar Document Checklist & Medical Cert" },
  { id: "succession-tools", label: "11. Contextual Estate Calculators & Succession Tools" },
  { id: "legal-backing", label: "12. Legal Backing: Senior Counsel Succession Profile" },
  { id: "faqs", label: "13. Frequently Asked Questions: Tamil Uyil Sasanam" },
  { id: "statutory-citations", label: "14. Official Tamil Nadu Statutory References & Acts" },
];

const FAQS_DATA = [
  {
    q: "உயில் எழுத முத்திரைத்தாள் (Stamp Paper) தேவையா?",
    a: "இல்லை. இந்திய வாரிசுரிமை சட்டம் 1925 பிரிவு 63 மற்றும் தமிழ்நாடு முத்திரைத்தாள் சட்டத்தின் கீழ், உயில் எழுதுவதற்கு முத்திரைத்தாள் கட்டாயமில்லை. வெள்ளைத்தாளில் (Plain Paper / Green Ledger Paper) கைப்படவோ அல்லது தட்டச்சு செய்தோ எழுதப்பட்ட உயில் முழு சட்ட செல்லுபடியாகும் தன்மை கொண்டது.",
  },
  {
    q: "தமிழ்நாட்டில் உயில் பதிவு செய்வது கட்டாயமா?",
    a: "பதிவு சட்டம் 1908 பிரிவு 18(e)-ன் படி இந்தியாவில் உயில் பதிவு செய்வது கட்டாயமில்லை. இது விருப்பத்திற்குரியது. இருப்பினும், சார்-பதிவாளர் அலுவலகத்தில் (SRO) பதிவு செய்வது பின்னாளில் உயிலின் உண்மைத்தன்மை மீது எழும் போலி ஆவண குற்றச்சாட்டுகள் மற்றும் நீதிமன்ற வழக்குகளைத் தடுக்கும் மிக வலிமையான சட்ட பாதுகாப்பைத் தருகிறது.",
  },
  {
    q: "சென்னையில் உயிலுக்கு புரோபேட் (Probate) வாங்குவது கட்டாயமா?",
    a: "ஆம். இந்திய வாரிசுரிமை சட்டம் 1925 பிரிவு 213 மற்றும் 57-ன் படி, சென்னை மாநகராட்சி எல்லைக்குட்பட்ட அசையா சொத்துக்கள் தொடர்பாக எழுதப்படும் உயில்களுக்கு அல்லது சென்னை எல்லைக்குள் இயற்றப்படும் உயில்களுக்கு சென்னை உயர் நீதிமன்றத்தில் (Madras High Court Original Side) புரோபேட் அல்லது லெட்டர்ஸ் ஆப் அட்மினிஸ்ட்ரேஷன் பெறுவது கட்டாயமாகும். சென்னை தவிர்த்த பிற தமிழக மாவட்டங்களில் (கோவை, மதுரை, திருச்சி போன்றவை) இது கட்டாயமில்லை.",
  },
  {
    q: "உயிலில் எத்தனை சாட்சிகள் கையெழுத்திட வேண்டும்?",
    a: "சட்டப்பிரிவு 63(c)-ன் படி குறைந்தது 2 சாட்சிகள் (Attesting Witnesses) உயில் எழுதுபவர் கையெழுத்திடுவதை நேரில் பார்த்துவிட்டு கையெழுத்திட வேண்டும். சாட்சிகள் உயிலின் மூலம் சொத்து பலன் பெறும் பயனாளிகளாக (Beneficiaries) இருக்கக்கூடாது. இது பிரிவு 67-ன் கீழ் மிக முக்கிய நிபந்தனையாகும்.",
  },
  {
    q: "பூர்வீக சொத்தை உயில் மூலம் முழுமையாக எழுதி வைக்க முடியுமா?",
    a: "இல்லை. ஒருவர் தனது சுய சம்பாத்திய சொத்துக்களை (Self-Acquired Property) மட்டுமே தனது விருப்பப்படி யாருக்கு வேண்டுமானாலும் உயில் மூலம் எழுதி வைக்க முடியும். பூர்வீக கூட்டு குடும்ப சொத்தில் (Ancestral Property) தனக்கு சட்டப்படி கிடைக்கக்கூடிய பிரிக்கப்படாத பங்குக்கு (Undivided Coparcenary Share) மட்டுமே உயில் எழுத முடியும்.",
  },
  {
    q: "தமிழ்நாட்டில் உயில் பதிவு செய்ய கட்டணம் எவ்வளவு?",
    a: "தமிழ்நாடு பத்திரப்பதிவு துறை (TNREGINET) விதிகளின்படி, உயில் பதிவு செய்ய முத்திரைத்தாள் கட்டணம் ஏதுமில்லை (ரூ.0). பதிவுக்கட்டணம் ரூ.500 மற்றும் கணினி சேவைக் கட்டணம் உட்பட சுமார் ரூ.1,000 மட்டுமே செலவாகும்.",
  },
  {
    q: "ஒருவர் தன் வாழ்நாளில் உயிலை எத்தனை முறை மாற்றலாம் அல்லது ரத்து செய்யலாம்?",
    a: "ஒருவர் தன் வாழ்நாளில் நல்ல மனநிலையில் இருக்கும் வரை எத்தனை முறை வேண்டுமானாலும் புதிய உயில் எழுதலாம் அல்லது பழைய உயிலை ரத்து செய்யலாம் (Revocation). அவர் கடைசியாக எழுதி கையொப்பமிட்ட உயில் மட்டுமே செல்லுபடியாகும் (Last Will and Testament).",
  },
  {
    q: "பதிவு செய்யப்பட்ட உயிலை வைத்து தமிழ்நாட்டில் பட்டா மாறுதல் செய்வது எப்படி?",
    a: "உயில் எழுதியவர் காலமான பிறகு, அவரது இறப்பு சான்றிதழ், வில்லங்க சான்றிதழ் (EC) மற்றும் பதிவு செய்யப்பட்ட உயில் நகலுடன் தமிழ்நாடு நில ஆவண போர்ட்டலில் (tamilnilam.tn.gov.in) பட்டா பெயர் மாறுதலுக்கு விண்ணப்பிக்கலாம். வருவாய் வட்டாட்சியர் கள ஆய்வு செய்து சட்டப்பூர்வமாக பட்டா வழங்கிடுவார்.",
  },
];

export default function WillFormatTamilClient() {
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
  const [copiedTamil, setCopiedTamil] = useState<boolean>(false);
  const [copiedEnglish, setCopiedEnglish] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedCustomClause, setCopiedCustomClause] = useState<boolean>(false);

  // SRO Fee Estimator State
  const [propertyEstimatedValue, setPropertyEstimatedValue] = useState<number>(5000000);
  const [isHomeVisit, setIsHomeVisit] = useState<boolean>(false);
  const [numberOfPages, setNumberOfPages] = useState<number>(4);

  // Clause Builder State
  const [selectedPropertyType, setSelectedPropertyType] = useState<"self_acquired" | "coparcenary">("self_acquired");
  const [beneficiaryType, setBeneficiaryType] = useState<"single" | "multiple" | "spouse_life">("spouse_life");
  const [includeExecutor, setIncludeExecutor] = useState<boolean>(true);
  const [includeDoctorCert, setIncludeDoctorCert] = useState<boolean>(true);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of TOC_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fullTamilText = `உயில் சாசனம் (LAST WILL AND TESTAMENT)

இன்று [தேதி] ஆம் நாள் [மாதம்] [வருடம்] அன்று, [மாவட்டம்], [வட்டம்], [முகவரி] என்ற முகவரியில் வசிக்கும் திரு/திருமதி [உயில் எழுதுபவர் முழு பெயர்], வயது [வயது], தந்தை/கணவர் பெயர் [பெயர்], மதம் [மதம்], ஆதார் எண் [ஆதார் எண்] ஆகிய நான், நல்ல உடல் நலத்துடனும், பரிபூரண மன நிதானத்துடனும், எவருடைய வற்புறுத்தலோ அல்லது தூண்டுதலோ இன்றி, சுயமாக யோசித்து இயற்றும் கடைசி உயில் சாசனம் பின்வருமாறு:

1. பூர்வாங்க அறிக்கை மற்றும் ரத்து விவரம் (Preliminary Declaration & Revocation):
நான் இதற்கு முன்பாக ஏதேனும் உயிலோ அல்லது உயில் சாசன இணைப்போ (Codicil) எழுதி வைத்திருந்தால், அவை அனைத்தையும் இந்த ஆவணத்தின் மூலம் முழுமையாக ரத்து செய்கிறேன். இதுவே எனது இறுதியான, சட்டப்பூர்வமான கடைசி உயில் சாசனம் (Last Will and Testament) ஆகும்.

2. உடல் மற்றும் மனநிலை பிரகடனம் (Sound Mental Health):
நான் இந்த உயிலை இயற்றும் இந்நாளில் பரிபூரண திடகாத்திரமான மனநிலையுடன் இருக்கிறேன். எனது சுய புத்தியுடனும், நினைவு தப்பாமலும், சுயமாக முடிவெடுக்கும் ஆற்றலுடனும் இந்த உயிலை எழுதி வைக்கிறேன்.

3. எனது வாழ்நாள் உரிமை (Life Interest of the Testator):
இந்த உயிலின் அட்டவணையில் குறிப்பிடப்பட்டுள்ள அசையும் மற்றும் அசையா சொத்துக்கள் அனைத்தும் எனது வாழ்நாள் காலம் வரை எனக்கே முழுமையான அதிகாரத்துடன் சொந்தமாக இருக்கும். எனது ஆயுட்காலம் வரை இந்த சொத்துக்களை அனுபவிக்கவும், தேவைப்பட்டால் விற்கவோ அல்லது அடமானம் வைக்கவோ எனக்கு முழு உரிமை உண்டு. எனது காலத்திற்குப் பிறகே இந்த உயில் முழுமையாக நடைமுறைக்கு வரும்.

4. சொத்துக்களின் உரிமை விவரம் (Source of Title):
கீழே அட்டவணையில் விவரிக்கப்பட்டுள்ள சொத்துக்கள் அனைத்தும் எனது சொந்த உழைப்பினால் மற்றும் சுய வருமானத்தினால் கிரயம் பெறப்பட்ட சுயார்ஜித சொத்துக்கள் (Self-Acquired Properties) ஆகும். இந்த சொத்துக்களின் மீது வேறு எவருக்கும் எவ்வித உரிமையோ, பாத்தியதையோ அல்லது பங்கோ கிடையாது.

5. சொத்து பகிர்வு விவரம் (Bequest of Properties):
எனது மறைவுக்குப் பிறகு, கீழே கண்ட 'அ' அட்டவணை அசையா சொத்தை எனது [உறவுமுறை: எ.கா. மகன்/மகள்/மனைவி] திரு/திருமதி [பயனாளி பெயர்], வயது [வயது], ஆதார் எண் [ஆதார் எண்] என்பவருக்கு முழு உரிமையுடன் (Absolute Ownership) அடைகின்றது. அவர் இந்த சொத்தை தனது விருப்பப்படி விற்றுக்கொள்ளவோ, தானம் செய்யவோ, பட்டா பெயர் மாற்றம் செய்து அனுபவித்துக் கொள்ளவோ முழு அதிகாரம் உண்டு.

6. எஞ்சிய சொத்துக்கள் பிரிவு (Residuary Clause):
இந்த உயில் சாசனத்தில் தவறுதலாக குறிப்பிடாமல் விடுபட்ட பிற அசையும், அசையா சொத்துக்கள், வங்கி கணக்கு சேமிப்புகள் மற்றும் பங்கு முதலீடுகள் அனைத்தும் எனது மறைவிற்குப் பிறகு மேற்கண்ட எனது [பயனாளி பெயர்] என்பவருக்கே சென்றடையும்.

7. எக்ஸிகியூட்டர் நியமனம் (Appointment of Executor):
எனது மறைவுக்குப் பிறகு இந்த உயிலில் கூறியுள்ள அனைத்து விருப்பங்களையும் முறையாக நிறைவேற்ற திரு/திருமதி [எக்ஸிகியூட்டர் பெயர்], முகவரி [முகவரி] என்பவரை எனது உயிலின் நிறைவேற்றுபவராக (Executor) நியமிக்கிறேன்.

8. சாட்சிகள் முன்னிலையில் உறுதிப்படுத்தல் (Attestation):
மேற்கண்டவாறு எனது விருப்பப்படி தமிழில் தயாரிக்கப்பட்ட இந்த உயில் சாசனத்தை நான் முழுமையாக படித்து உணர்ந்து, அதன் சாராம்சத்தை அறிந்து கொண்டேன். என் முன்னிலையில் கீழே கையொப்பமிட்டுள்ள இரண்டு சாட்சிகள் முன்னிலையில் இந்நாளில் மனப்பூர்வமாக கையொப்பமிடுகிறேன்.

[உயில் எழுதுபவர் கையொப்பம்]
பெயர்: ____________________
தேதி: ____________________

சாட்சிகள் (Witnesses):
எங்கள் முன்னிலையில் உயில் சாஸனகர்த்தா திரு/திருமதி [பெயர்] நல்ல மனநிலையுடன் தனது கையொப்பத்தை இட்டார். அவர் கையொப்பமிட்டதை நாங்கள் இருவரும் நேரில் கண்டோம். அவர் முன்னிலையிலும், ஒருவருக்கொருவர் முன்னிலையிலும் நாங்கள் சாட்சிகளாக கையொப்பமிடுகிறோம்:

சாட்சி 1:
கையொப்பம்: ____________________
பெயர்: [சாட்சி 1 பெயர்]
தந்தை பெயர்: [தந்தை பெயர்]
முகவரி: [முழு முகவரி]
ஆதார் எண்: [ஆதார் எண்]

சாட்சி 2:
கையொப்பம்: ____________________
பெயர்: [சாட்சி 2 பெயர்]
தந்தை பெயர்: [தந்தை பெயர்]
முகவரி: [முழு முகவரி]
ஆதார் எண்: [ஆதார் எண்]

சொத்து விவர அட்டவணை (Schedule of Properties):
அட்டவணை 'அ' (Schedule 'A' Immovable Property):
மாவட்டம்: [மாவட்டம்], பதிவு மாவட்டம்: [பதிவு மாவட்டம்], சார்-பதிவாளர் அலுவலகம்: [SRO பெயர்], கிராமம்: [கிராமம்], சர்வே எண்: [சர்வே எண்], பட்டா எண்: [பட்டா எண்], கதவு எண்: [கதவு எண்], தெரு: [தெரு பெயர்], பரப்பளவு: [சதுர அடி / சென்ட்].
நான்கெல்லை விவரம்:
வடக்கு: [விவரம்], தெற்கு: [விவரம்], கிழக்கு: [விவரம்], மேற்கு: [விவரம்].`;

  const fullEnglishText = `LEGAL WILL AND TESTAMENT (ENGLISH TRANSLATION & NOTES)

Made on this [Date] day of [Month], [Year], at [City/District], Tamil Nadu.

TESTATOR DECLARATION:
I, [Full Name of Testator], aged [Age] years, son/daughter/wife of [Father/Husband Name], residing at [Complete Residential Address], holding Aadhaar No. [Aadhaar Number], of Indian nationality, being of sound mind, memory, and understanding, and without any undue influence, coercion, or fraud, do hereby make, publish, and declare this as my LAST WILL AND TESTAMENT.

CLAUSE 1: REVOCATION OF PRIOR WILLS
I hereby revoke, cancel, and annul all my prior Wills, Testaments, and Codicils made by me at any time heretofore. This instrument alone shall stand as my Last Will and Testament under the Indian Succession Act, 1925.

CLAUSE 2: SOUND MENTAL CAPACITY
I declare that I am physically and mentally competent, in full possession of all my faculties, and capable of understanding the legal effect of this disposition of my properties.

CLAUSE 3: LIFE INTEREST RESERVATION
I reserve the absolute right to enjoy, use, possess, lease, mortgage, or sell all my movable and immovable properties during my natural lifetime. This Will shall take effect only upon my demise.

CLAUSE 4: SELF-ACQUIRED PROPERTY TITLE RECITAL
I declare that the properties described in the Schedule hereunder were acquired solely through my own self-earned funds, earnings, and personal resources without any contribution from ancestral or joint family coparcenary nucleus. I hold absolute and alienable title thereto.

CLAUSE 5: TESTAMENTARY DISPOSITION
Upon my demise, the Schedule 'A' immovable property shall devolve upon my [Relation], [Beneficiary Full Name], absolutely and forever with full powers of alienation, mortgage, sale, and mutation in revenue records.

CLAUSE 6: RESIDUARY ESTATE
Any other movable or immovable assets, bank balances, fixed deposits, securities, or jewellery owned by me at the time of my death not specifically mentioned herein shall devolve upon the said Beneficiary.

CLAUSE 7: APPOINTMENT OF EXECUTOR
I appoint [Executor Full Name], residing at [Address], as the sole Executor of this my Will to obtain probate (if required under Section 213 in Chennai) and carry out my testamentary directions.

ATTESTATION (SECTION 63 INDIAN SUCCESSION ACT, 1925):
Signed by the Testator in our presence, and attested by us in his/her presence and in the presence of each other.

TESTATOR SIGNATURE: ____________________
WITNESS 1: [Name, Address, ID Proof]
WITNESS 2: [Name, Address, ID Proof]`;

  const copyTamilToClipboard = () => {
    navigator.clipboard.writeText(fullTamilText);
    setCopiedTamil(true);
    setTimeout(() => setCopiedTamil(false), 3000);
  };

  const copyEnglishToClipboard = () => {
    navigator.clipboard.writeText(fullEnglishText);
    setCopiedEnglish(true);
    setTimeout(() => setCopiedEnglish(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `TAMIL NADU SUB-REGISTRAR OFFICE (TNREGINET) WILL REGISTRATION CHECKLIST:
1. Two copies of Will draft printed on 80+ GSM durable bond paper.
2. Original Aadhaar Card and PAN Card of the Testator + photocopies.
3. Original Aadhaar Cards and address proofs of 2 independent attesting witnesses.
4. Medical Fitness Certificate (மனநல தகுதி சான்றிதழ்) issued by a Registered Medical Practitioner (MBBS) certifying sound testamentary capacity.
5. Encumbrance Certificate (வில்லங்க சான்றிதழ் / EC) and Patta copy from tamilnilam.tn.gov.in.
6. Two recent passport size photographs of the Testator and both witnesses.
7. TNREGINET online appointment token with fee receipt (Registration Fee ₹500 + scanning charges).
8. Doctor can also sign as one of the attesting witnesses for ironclad validity.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([fullTamilText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "Uyil_Sasanam_Format_Tamil_WillDrafting.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  // Fee calculation engine for Tamil Nadu SRO
  const baseRegFee = 500;
  const computerFee = Math.max(100, numberOfPages * 25);
  const homeVisitFee = isHomeVisit ? 1000 : 0;
  const totalSroCost = baseRegFee + computerFee + homeVisitFee;

  // Dynamic Custom Clause Generator based on state
  const generateCustomClause = () => {
    let text = "";
    if (selectedPropertyType === "self_acquired") {
      text += `[சுயார்ஜித சொத்து பிரகடனம் - Self-Acquired Recital]\n"இந்த உயிலில் விவரிக்கப்பட்டுள்ள சொத்துக்கள் அனைத்தும் எனது சொந்த உழைப்பில் சம்பாதித்த சுயார்ஜித சொத்துக்கள் ஆகும். இவற்றில் வேறு எவருக்கும் எவ்வித பிறப்புரிமையோ அல்லது கூட்டு குடும்ப பங்கோ கிடையாது."\n\n`;
    } else {
      text += `[கூட்டு குடும்ப பிரிக்கப்படாத பங்கு - Undivided Coparcenary Share]\n"இந்து வாரிசுரிமை சட்டம் 1956 பிரிவு 30-ன் படி, பூர்வீக இந்து கூட்டு குடும்ப சொத்தில் ஒரு குறிப்பிட்ட தேதியில் எனக்கு சட்டப்படி கிடைக்கக்கூடிய எனது பிரிக்கப்படாத கூட்டு பங்கினை (Undivided Coparcenary Interest) மட்டுமே நான் இந்த உயிலின் மூலம் வழங்கிட பாத்தியதை உடையவன் ஆகிறேன்."\n\n`;
    }

    if (beneficiaryType === "spouse_life") {
      text += `[மனைவிக்கு வாழ்நாள் உரிமை பாதுகாப்பு - Spouse Life Interest Clause]\n"எனது மறைவுக்குப் பிறகு, எனது மனைவி திருமதி [பெயர்] அவர்கள் தனது வாழ்நாள் காலம் வரை இந்த சொத்தில் வசித்து வரவும், வாடகை வருமானத்தை முழுமையாக அனுபவித்து வரவும் முழுமையான வாழ்நாள் உரிமை (Life Interest) உண்டு. ஆனால் அவர் இந்த சொத்தை விற்கவோ அல்லது அடமானம் வைக்கவோ உரிமை இல்லை. அவரது மறைவுக்குப் பின்னரே இந்த சொத்து எனது வாரிசுகளுக்கு முழு பாத்தியதையாக சென்றடையும்."\n\n`;
    } else if (beneficiaryType === "single") {
      text += `[தனிநபர் முழு உரிமை - Absolute Single Beneficiary]\n"எனது மறைவுக்குப் பிறகு இந்த அட்டவணை சொத்து முழுவதும் எனது [மகன்/மகள்] [பெயர்] என்பவருக்கு சகல பாத்தியங்களும், பட்டா மாற்ற உரிமைகளுடன் முழுமையாக சென்றடையும்."\n\n`;
    } else {
      text += `[சம பங்கு பகிர்வு - Equal Share Distribution]\n"எனது மறைவுக்குப் பிறகு எனது வாரிசுகள் [வாரிசு 1] மற்றும் [வாரிசு 2] ஆகிய இருவரும் இந்த சொத்தினை சரிசமமாக 50% : 50% வீதம் பிரித்துக் கொண்டு பட்டா மாறுதல் செய்து அனுபவிக்க கடமைப்பட்டவர்கள் ஆவர்."\n\n`;
    }

    if (includeExecutor) {
      text += `[எக்ஸிகியூட்டர் நியமனம் - Executor Clause]\n"எனது மறைவிற்குப் பின் எனது விருப்பங்களை எந்தவித குடும்ப தகராறும் இன்றி செயல்படுத்திட எனது குடும்ப வழக்கறிஞர் / நம்பிக்கைக்குரிய திரு/திருமதி [பெயர்] அவர்களை இந்த உயிலின் எக்ஸிகியூட்டராக (Executor) நியமிக்கிறேன்."\n\n`;
    }

    if (includeDoctorCert) {
      text += `[மருத்துவர் தகுதி சான்றிதழ் - Doctor Sound Mind Clause]\n"இந்த உயிலை இயற்றும் போது எனது உடல் நலத்தையும் மன நலத்தையும் பரிசோதித்த பதிவு பெற்ற மருத்துவர் டாக்டர் [மருத்துவர் பெயர்], MBBS, Reg No: [எண்] வழங்கிய மனநல தகுதி சான்றிதழ் இந்த உயிலுடன் இணைக்கப்பட்டுள்ளது."`;
    }

    return text;
  };

  const copyCustomClauseToClipboard = () => {
    navigator.clipboard.writeText(generateCustomClause());
    setCopiedCustomClause(true);
    setTimeout(() => setCopiedCustomClause(false), 3000);
  };

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
            <span>INDIAN SUCCESSION ACT, 1925 • TAMIL NADU REGISTRATION RULES</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            உயில் சாசனம் மாதிரி: Legal Will Format in Tamil
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Here is a complete Will format in Tamil and English. Learn how to write a valid Uyil in Tamil
            Nadu. Follow Section 63 of the Indian Succession Act. Read our Chennai High Court probate guide to
            protect your family from future property disputes.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#tamil-uyil-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>உயில் மாதிரி படிக்க &amp; பதிவிறக்க</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 63</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TWO WITNESS MANDATE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹0 Stamp Duty</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TN SRO PLAIN PAPER VALID
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 213</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CHENNAI PROBATE RULES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">தமிழ் &amp; English</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BILINGUAL COURT READY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Modules)
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
                Governed under Sections 57, 59, 61, 62, 63, 67, 213 &amp; 214 of the Indian Succession Act,
                1925, Section 18(e) of the Registration Act, 1908, and Tamil Nadu Registration Rules.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* -------------------------------------------------------------
                SECTION 1: STATUTORY BASIS
                ------------------------------------------------------------- */}
            <section id="statutory-basis" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <Gavel className="w-3.5 h-3.5" />
                <span>LEGAL FRAMEWORK IN TAMIL NADU</span>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                1. Statutory Basis: Indian Succession Act &amp; TN Rules
              </h2>

              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                An Uyil Sasanam is a written Will in Tamil Nadu. It sets out who gets your land, house, and
                savings after you pass away. The Indian Succession Act, 1925 sets the core rules for making a
                Will.
              </p>

              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Under Section 59, any adult of sound mind can make a Will. You have full freedom to give your
                self-earned property to anyone you choose. You do not need to leave it only to blood heirs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
                    <span>Section 63(c) Execution Rules</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The person making the Will must sign before two witnesses. Both witnesses must also sign in
                    front of the Will maker.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                    <span>Section 67: Who Cannot Be a Witness</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A person who gets property under the Will must not sign as a witness. If an heir signs as a
                    witness, their gift under the Will becomes void under Section 67.
                  </p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------
                SECTION 2: COMPLETE UYIL SASANAM FORMAT (NATIVE TAMIL DRAFT)
                ------------------------------------------------------------- */}
            <section id="tamil-uyil-format" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <ScrollText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PRINTABLE BILINGUAL DRAFT</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyTamilToClipboard}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] font-bold text-xs transition-colors"
                  >
                    {copiedTamil ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTamil ? "நகலெடுக்கப்பட்டது!" : "Copy Tamil Draft"}</span>
                  </button>
                  <button
                    onClick={handleDownloadTxt}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download TXT</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                2. Complete Uyil Sasanam Format: Native Tamil Draft
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                This legal draft uses clear Tamil words accepted by Sub-Registrar Offices across Tamil Nadu.
                You can print this text on plain white paper or green ledger paper.
              </p>

              {/* Copyable Template Box */}
              <div className="relative rounded-2xl bg-slate-900 text-slate-100 p-5 sm:p-6 overflow-x-auto border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
                  <span className="font-mono uppercase tracking-wider text-rose-300">
                    Tamil Nadu Uyil Sasanam Template (தமிழ் வடிவம்)
                  </span>
                  <span className="text-[11px] bg-slate-800 px-2.5 py-0.5 rounded text-slate-300">
                    Plain Paper Valid • Section 63 Compliant
                  </span>
                </div>

                <pre
                  lang="ta"
                  className="font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-200 select-text"
                >
                  {fullTamilText}
                </pre>
              </div>

              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  <strong>முக்கிய குறிப்பு:</strong> அடைப்புக்குறிக்குள் [ ] உள்ள விவரங்களை உங்களது உண்மை
                  விவரங்களைக் கொண்டு நிரப்ப வேண்டும். சாட்சிகள் உயிலின் பயனாளியாக இருக்கக்கூடாது.
                </span>
              </div>
            </section>

            {/* -------------------------------------------------------------
                SECTION 3: ENGLISH TRANSLATION & EXPLANATION
                ------------------------------------------------------------- */}
            <section id="english-translation" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5" />
                  <span>PARALLEL TRANSLATION</span>
                </div>
                <button
                  onClick={copyEnglishToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  {copiedEnglish ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEnglish ? "Copied English!" : "Copy English Clauses"}</span>
                </button>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                3. English Translation: Tamil Uyil Clauses Explained
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Here is the English meaning for each key clause in the Tamil Uyil. This helps NRI family
                members, banks, and High Court staff understand your document.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Clause 1: Revocation of Prior Wills (முந்தைய உயில்கள் ரத்து)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 62, you can change or cancel your Will at any time. This clause cancels all
                    past Wills. It makes sure that only this final paper counts.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Clause 3: Absolute Life Interest Reservation (வாழ்நாள் உரிமை)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Will gives no rights while you are alive. You stay the sole owner with full power to live
                    in, sell, or rent your home. The Will takes effect only after your death.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Clause 6: Residuary Estate Provision (எஞ்சிய சொத்துக்கள்)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This clause covers any newly bought goods, bank deposits, or gold left out of the main list.
                    These extra assets pass smoothly to your chosen heir.
                  </p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------
                SECTION 4: INTERACTIVE CLAUSE SELECTOR
                ------------------------------------------------------------- */}
            <section id="clause-selector" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5" />
                <span>INTERACTIVE BUILDER</span>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                4. Interactive Clause Selector: Tailor Your Uyil
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Choose your family setup and property type to create a custom clause in Tamil for your Will.
              </p>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Property Title Status</label>
                  <select
                    value={selectedPropertyType}
                    onChange={(e) => setSelectedPropertyType(e.target.value as "self_acquired" | "coparcenary")}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-[#C65378] outline-none"
                  >
                    <option value="self_acquired">சுயார்ஜித சொத்து (Self-Acquired Property)</option>
                    <option value="coparcenary">பூர்வீக கூட்டு பங்கு (Undivided Coparcenary Share)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Beneficiary Structure</label>
                  <select
                    value={beneficiaryType}
                    onChange={(e) => setBeneficiaryType(e.target.value as "single" | "multiple" | "spouse_life")}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-[#C65378] outline-none"
                  >
                    <option value="spouse_life">மனைவிக்கு வாழ்நாள் உரிமை (Spouse Life Interest)</option>
                    <option value="single">தனிநபர் முழு உரிமை (Sole Legatee Absolute)</option>
                    <option value="multiple">வாரிசுகளுக்கு சம பங்கு (Equal Share Between Heirs)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="chkExecutor"
                    checked={includeExecutor}
                    onChange={(e) => setIncludeExecutor(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C65378] focus:ring-[#C65378]"
                  />
                  <label htmlFor="chkExecutor" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Include Executor Appointment Clause (நிறைவேற்றுபவர்)
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="chkDoctor"
                    checked={includeDoctorCert}
                    onChange={(e) => setIncludeDoctorCert(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C65378] focus:ring-[#C65378]"
                  />
                  <label htmlFor="chkDoctor" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Include Doctor Sound Mind Certificate Reference
                  </label>
                </div>
              </div>

              {/* Generated Custom Clause Box */}
              <div className="rounded-2xl bg-[#FAF7F0] border border-slate-300 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                    Generated Custom Legal Clauses
                  </span>
                  <button
                    onClick={copyCustomClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs transition-colors"
                  >
                    {copiedCustomClause ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCustomClause ? "Copied Clause!" : "Copy Clause"}</span>
                  </button>
                </div>
                <pre
                  lang="ta"
                  className="font-sans text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/80"
                >
                  {generateCustomClause()}
                </pre>
              </div>
            </section>

            {/* -------------------------------------------------------------
                SECTION 5: CHENNAI PROBATE MOAT
                ------------------------------------------------------------- */}
            <section id="chennai-probate-rules" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5" />
                <span>COMPETITOR BLIND SPOT &amp; CRUCIAL MOAT</span>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                5. Chennai Probate Moat: Section 213 High Court Rules
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Many online guides miss the special probate rule for Chennai under Section 213 of the Indian
                Succession Act, 1925.
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                <h3 className="font-extrabold text-sm text-[#172228] flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>The Chennai Presidency Town Rule</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Chennai is an old Presidency Town under the law. Special rules apply to Wills made by Hindus,
                  Jains, Sikhs, or Buddhists.
                </p>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-5">
                  <li>The Will was signed inside the city limits of Chennai.</li>
                  <li>The Will deals with land or buildings located inside Chennai city limits.</li>
                </ul>
                <p className="text-xs sm:text-sm text-[#C65378] font-bold leading-relaxed">
                  You must obtain Probate from the Madras High Court if the Will is made in Chennai, or if the
                  land is inside Chennai city limits. Under Section 213, banks and courts will not act on the
                  Will without this court grant.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-2">
                <h3 className="font-extrabold text-sm text-slate-900">
                  What About the Rest of Tamil Nadu (Mofussil Areas)?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Probate is not needed for lands in Coimbatore, Madurai, Salem, or Trichy. If the Will and
                  land are outside Chennai, you do not need court probate. You can transfer the Patta directly
                  through the local Tahsildar.
                </p>
              </div>
            </section>

            {/* -------------------------------------------------------------
                SECTION 6: TAMIL NADU SRO FEE CALCULATOR
                ------------------------------------------------------------- */}
            <section id="sro-fee-calculator" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                <span>TNREGINET ESTIMATOR</span>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                6. Tamil Nadu SRO Fee Calculator &amp; Registration Rules
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Many agents ask for large fees to register a Will. Under Tamil Nadu law, stamp duty on a Will is
                zero rupees (Nil). You pay only a basic office fee.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Estimated Property Value (₹)</label>
                  <input
                    type="number"
                    value={propertyEstimatedValue}
                    onChange={(e) => setPropertyEstimatedValue(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-500">Value does NOT affect registration fee</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Total Draft Pages</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={numberOfPages}
                    onChange={(e) => setNumberOfPages(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-500">Scanning fee ₹25/page</span>
                </div>

                <div className="space-y-1 flex flex-col justify-center">
                  <label className="text-xs font-bold text-slate-700">Sub-Registrar Home Visit?</label>
                  <div className="flex items-center gap-2 pt-1.5">
                    <input
                      type="checkbox"
                      id="homeVisit"
                      checked={isHomeVisit}
                      onChange={(e) => setIsHomeVisit(e.target.checked)}
                      className="w-4 h-4 text-[#C65378] rounded"
                    />
                    <label htmlFor="homeVisit" className="text-xs text-slate-700 cursor-pointer font-medium">
                      Bedridden / Senior Citizen
                    </label>
                  </div>
                </div>
              </div>

              {/* Fee Results Display */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 text-center">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Stamp Duty</div>
                  <div className="text-base sm:text-lg font-black text-emerald-700">₹0 (NIL)</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Base SRO Fee</div>
                  <div className="text-base sm:text-lg font-black text-slate-800">₹500</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Scanning &amp; User</div>
                  <div className="text-base sm:text-lg font-black text-slate-800">{formatINR(computerFee)}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Total Official Fee</div>
                  <div className="text-base sm:text-lg font-black text-[#C65378]">{formatINR(totalSroCost)}</div>
                </div>
              </div>
            </section>

            {/* =============================================================
                EDITORIAL FEATURE ASSET: BILINGUAL TAMIL WILL TEMPLATE PACK
                ============================================================= */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-xs space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 group">
                <Image
                  src="/images/will-format-tamil-uyil-sasanam-og.jpg"
                  alt="Will Format in Tamil: உயில் சாசனம் மாதிரி (Uyil Sasanam) Legal Template"
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs text-slate-600">
                <span className="font-bold text-[#172228] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                  <span>உயில் சாசனம் மாதிரி (Tamil Uyil Sasanam Official Deed Format)</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  Compliant with Indian Succession Act, 1925 &amp; TN SRO Rules
                </span>
              </div>
            </div>

            {/* -------------------------------------------------------------
                SECTION 7: COMPARISON TABLE
                ------------------------------------------------------------- */}
            <section id="comparison-table" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>DECISION MATRIX</span>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                7. Comparison: Registered Uyil vs Settlement vs Patta
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                See how a registered Uyil differs from a Settlement Deed and an intestate Varisu Certificate.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="p-3 font-extrabold">Feature / Criterion</th>
                      <th className="p-3 font-extrabold text-rose-300">Registered Uyil</th>
                      <th className="p-3 font-extrabold">Settlement Deed</th>
                      <th className="p-3 font-extrabold">Varisu Certificate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">Ownership Transfer Timing</td>
                      <td className="p-3 font-semibold text-emerald-700">Only After Testator Death</td>
                      <td className="p-3 text-slate-700">Immediate Upon SRO Registration</td>
                      <td className="p-3 text-slate-700">After Death (Intestate)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">Right to Revoke / Cancel</td>
                      <td className="p-3 font-semibold text-emerald-700">100% Revocable Anytime</td>
                      <td className="p-3 text-rose-700">Irrevocable (Unless Senior Citizen s.23)</td>
                      <td className="p-3 text-slate-700">Not Applicable (Statutory)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">Stamp Duty in Tamil Nadu</td>
                      <td className="p-3 font-semibold text-emerald-700">NIL (₹0)</td>
                      <td className="p-3 text-slate-700">1% (Family) to 7% (Non-Family)</td>
                      <td className="p-3 text-slate-700">NIL</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">Disinheriting Legal Heirs</td>
                      <td className="p-3 font-semibold text-emerald-700">Allowed for Self-Acquired</td>
                      <td className="p-3 text-slate-700">Allowed During Lifetime</td>
                      <td className="p-3 text-rose-700">Cannot Disinherit (Equal Shares)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">Patta Transfer on Tamil Nilam</td>
                      <td className="p-3 font-semibold text-slate-700">Directly in Beneficiary Name</td>
                      <td className="p-3 text-slate-700">Directly in Settlee Name</td>
                      <td className="p-3 text-slate-700">Joint Patta for All Legal Heirs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* -------------------------------------------------------------
                SECTION 8: STEP-BY-STEP SOP
                ------------------------------------------------------------- */}
            <section id="step-by-step-sop" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <FileCheck className="w-3.5 h-3.5" />
                <span>PROCEDURAL ROADMAP</span>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                8. Step-by-Step SOP: Drafting to Registration in TN
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Follow these five clear steps to draft, sign, and register a solid Uyil in Tamil Nadu.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Verify Title Deeds &amp; Encumbrance Certificate (வில்லங்கம்)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Check your title deed and get an Encumbrance Certificate from tnreginet.gov.in. Make
                      sure the property is your own self-earned asset.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Obtain Medical Mental Fitness Certificate (மனநல தகுதி சான்றிதழ்)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Visit an MBBS doctor on the day you sign. The doctor gives a simple fitness certificate to
                      prove your mind was clear and sound.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Draft the Uyil in Tamil or English on Plain Paper
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Print the draft on clean, heavy paper. Number each page. Write the exact survey number,
                      door number, and four boundary sides.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Execution Before Two Independent Attesting Witnesses
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Sign every page of the Will before two independent witnesses. Both witnesses must watch
                      you sign, and then sign after you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Sub-Registrar Office Registration (Book 3 Entry)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Book an online token on TNREGINET. Visit the Sub-Registrar Office with both witnesses to
                      record fingerprints, photos, and book entry.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------
                SECTION 9: PRACTICAL CASE STUDIES
                ------------------------------------------------------------- */}
            <section id="case-studies" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>REAL-WORLD SCENARIOS</span>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                9. Practical Case Studies: Chennai, Madurai &amp; Kovai
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Real cases show why following Tamil Nadu Will rules protects family harmony.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Case 1: Chennai T. Nagar Property Probate</span>
                    <span className="text-[10px] bg-rose-100 text-[#C65378] px-2 py-0.5 rounded font-bold">Chennai City</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father left a house in T. Nagar to his daughter. The local bank asked for court probate.
                    Because the Will had two witnesses and a doctor certificate, the Madras High Court granted
                    probate under Section 213 with no delay.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Case 2: Madurai Farm Land Patta Transfer</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Mofussil TN</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A farmer in Madurai left five acres to his younger son. The elder son claimed probate was
                    needed. The Tahsildar ruled that Section 213 does not apply outside Chennai, and updated the
                    Patta on tamilnilam.tn.gov.in.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Case 3: Coimbatore Equal Daughters Bequest</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Coimbatore</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A factory owner in Coimbatore divided his self-earned units equally between two daughters.
                    Clear recitals proving his own funds defeated a partition suit brought by distant relatives.
                  </p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------
                SECTION 10: CHECKLIST & MEDICAL CERTIFICATE
                ------------------------------------------------------------- */}
            <section id="checklist-medical-cert" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SRO DOCUMENT PACK</span>
                </div>
                <button
                  onClick={copyChecklistToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  {copiedChecklist ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedChecklist ? "Copied Checklist!" : "Copy Checklist"}</span>
                </button>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                10. Sub-Registrar Document Checklist &amp; Medical Cert
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Carry these items when you visit the Sub-Registrar Office to register your Uyil.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono leading-relaxed space-y-2">
                <div className="text-rose-300 font-bold">
                  DOCTOR&apos;S SOUND MIND CERTIFICATE FORMAT (மருத்துவர் மனநல சான்றிதழ்):
                </div>
                <p>
                  &quot;I, Dr. [Doctor Name], MBBS, Reg. No. [Medical Council No.], practicing at [Clinic/Hospital Address],
                  do hereby certify that I have this day examined Mr./Mrs. [Testator Name], aged [Age] years, residing at
                  [Address]. I found him/her to be in sound physical and mental health, possessing full cognitive faculties,
                  memory, and testamentary capacity to execute a Will of his/her free will without any signs of senility,
                  delirium, or mental impairment.&quot;
                </p>
                <div className="pt-2 text-slate-400">
                  Date: ____________ | Place: ____________ | Signature &amp; Official Seal of Doctor
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------
                SECTION 11: CONTEXTUAL ESTATE CALCULATORS & TOOLS
                ------------------------------------------------------------- */}
            <section id="succession-tools" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>INTERACTIVE SUCCESSION CALCULATORS</span>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                11. Contextual Estate Calculators &amp; Succession Tools
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Making a Will connects to capital gains tax, family property checks, and witness rules. Use
                our free calculators to plan your estate.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* TOOL CARD 1: CAPITAL GAINS CALCULATOR */}
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="group block p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 hover:border-[#C65378] transition-all shadow-2xs hover:-translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-[#C65378] flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors leading-snug">
                    Inherited Property Capital Gains Calculator
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Compare 12.5% Flat vs 20% Indexation under Budget 2024 grandfathering rules.
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#C65378]">
                    <span>Calculate Taxes</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* TOOL CARD 2: ANCESTRAL VS SELF-ACQUIRED */}
                <Link
                  href="/tools/ancestral-vs-self-acquired-property-classifier"
                  className="group block p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 hover:border-[#C65378] transition-all shadow-2xs hover:-translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors leading-snug">
                    Ancestral Property Title Classifier
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Determine whether your Tamil Nadu property is self-acquired or coparcenary.
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#5F7E75]">
                    <span>Classify Title</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* TOOL CARD 3: WITNESS ELIGIBILITY CHECKER */}
                <Link
                  href="/tools/witness-eligibility-section-67-checker"
                  className="group block p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 hover:border-[#C65378] transition-all shadow-2xs hover:-translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors leading-snug">
                    Section 67 Witness Eligibility Checker
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Verify whether your chosen attesting witnesses are legally eligible under Section 67.
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-purple-700">
                    <span>Audit Witnesses</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </section>

            {/* -------------------------------------------------------------
                SECTION 12: LEGAL BACKING & ADVOCATE PROFILE
                ------------------------------------------------------------- */}
            <section id="legal-backing" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>LEGAL EXPERTISE &amp; VERIFICATION</span>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                12. Legal Backing: Senior Counsel Succession Profile
              </h3>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200">
                <div className="w-14 h-14 rounded-full bg-[#172228] text-rose-200 font-extrabold text-lg flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div className="space-y-1">
                  <div className="font-extrabold text-slate-900 text-base">Advocate Anuj Anand Malik</div>
                  <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel • AMA Legal Solutions
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Advocate Anuj Anand Malik is an experienced succession counsel. He handles Madras High Court
                    probate cases, Will disputes, and estate planning across Tamil Nadu.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                WillDrafting.in works with AMA Legal Solutions to offer trusted estate support for families in
                Chennai, Madurai, Coimbatore, and across India.
              </p>
            </section>

            {/* -------------------------------------------------------------
                SECTION 13: FAQS ACCORDION
                ------------------------------------------------------------- */}
            <section id="faqs" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                13. Frequently Asked Questions: Tamil Uyil Sasanam
              </h3>

              <div className="divide-y divide-slate-200 pt-2">
                {FAQS_DATA.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="py-4">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between text-left gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180 text-[#C65378]" : "text-slate-400"}`} />
                      </button>
                      {isOpen && (
                        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* -------------------------------------------------------------
                SECTION 14: STATUTORY CITATIONS & OFFICIAL PORTALS
                ------------------------------------------------------------- */}
            <section id="statutory-citations" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                <Landmark className="w-3.5 h-3.5" />
                <span>OFFICIAL PORTALS &amp; STATUTES</span>
              </div>

              {/* H2: <= 70 chars, NO em-dash */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                14. Official Tamil Nadu Statutory References &amp; Acts
              </h3>

              <ul className="text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Indian Succession Act, 1925:</strong> Sections 57, 59, 63, 67, 213, and 214 (Will
                    Execution and Probate Provisions).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Registration Act, 1908:</strong> Section 18(e) (Optional registration of Wills)
                    and Section 40 (Persons entitled to present Wills).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Inspector General of Registration Tamil Nadu:</strong> Official Portal{" "}
                    <a
                      href="https://tnreginet.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C65378] underline font-semibold"
                    >
                      tnreginet.gov.in
                    </a>{" "}
                    for SRO appointment tokens, Guideline Value search, and Encumbrance Certificate (EC).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Tamil Nadu Revenue &amp; Land Records:</strong> Official Patta Portal{" "}
                    <a
                      href="https://tamilnilam.tn.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C65378] underline font-semibold"
                    >
                      tamilnilam.tn.gov.in
                    </a>{" "}
                    for Online Patta Transfer after registered Uyil execution.
                  </span>
                </li>
              </ul>
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
                Expert in Indian succession law, Madras High Court probate filings, and bilingual Will drafting.
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
                  <span>PREVENT FAMILY PARTITION LAWSUITS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Children with a Challenge-Proof Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Stop painful court disputes before they start. Our lawyer-guided engine builds a valid Will in
                  15 minutes.
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
                  <span>Tamil Nadu SRO &amp; Court Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-xs p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>PROBATE &amp; DISPUTE DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Chennai High Court Probate or SRO Assistance?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our senior advocates help with Madras High Court probate petitions, caveats, and Will contests
                  across Tamil Nadu.
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
                  Why Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 63 Compliance:</strong> Verified two-witness attestation clauses.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Chennai Probate Guidance:</strong> Explicit Section 213 jurisdictional notes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Bilingual Legal Drafts:</strong> Clean Tamil syntax with parallel English notes.
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
          href="#tamil-uyil-format"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Tamil Draft</span>
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
