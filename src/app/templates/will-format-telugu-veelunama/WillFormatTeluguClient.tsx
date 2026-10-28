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
  ScrollText,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-basis", label: "1. Statutory Basis: Indian Succession Act & Telugu SRO Rules" },
  { id: "telugu-veelunama-format", label: "2. Complete Veelunama Format: Native Telugu Will Draft" },
  { id: "english-translation", label: "3. English Translation: Telugu Veelunama Clauses Explained" },
  { id: "clause-selector", label: "4. Interactive Clause Selector: Tailor Your Telugu Will" },
  { id: "us-nri-telugu-checklist", label: "5. US-NRI Telugu Checklist: Property in Hyderabad & AP" },
  { id: "sro-registration-rules", label: "6. Telangana & Andhra Pradesh SRO Will Registration Rules" },
  { id: "comparison-table", label: "7. Comparison: Registered Veelunama vs Gift vs Varisu Nama" },
  { id: "step-by-step-sop", label: "8. Step-by-Step SOP: Drafting to SRO Registration" },
  { id: "case-studies", label: "9. Practical Case Studies: Hyderabad & Visakhapatnam Courts" },
  { id: "checklist-doctor-cert", label: "10. Sub-Registrar Document Checklist & Doctor Certificate" },
  { id: "succession-tools", label: "11. Contextual Succession Calculators & Estate Planning Tools" },
  { id: "legal-authority", label: "12. Legal Authority: Senior Succession Counsel Profile" },
  { id: "faqs", label: "13. Frequently Asked Questions: Telugu Veelunama Format" },
  { id: "statutory-citations", label: "14. Official Telangana & Andhra Pradesh Legal References" },
];

const FAQS_DATA = [
  {
    q: "వీలునామా రాయడానికి స్టాంప్ పేపర్ (Stamp Paper) అవసరమా?",
    a: "అవసరం లేదు. భారతీయ వారసత్వ చట్టం 1925 సెక్షన్ 63 మరియు తెలంగాణ, ఆంధ్రప్రదేశ్ స్టాంప్ నిబంధనల ప్రకారం వీలునామాను స్టాంప్ పేపర్‌పై రాయవలసిన అవసరం లేదు. తెల్ల కాగితం (Plain Paper లేదా Green Ledger Paper) పై చేతితో రాసినా లేదా కంప్యూటర్‌లో టైప్ చేసినా అది చట్టబద్ధంగా పూర్తిగా చెల్లుబాటు అవుతుంది. స్టాంప్ డ్యూటీ సున్నా (₹0).",
  },
  {
    q: "తెలంగాణ మరియు ఆంధ్రప్రదేశ్‌లలో వీలునామా రిజిస్ట్రేషన్ తప్పనిసరిగా చేయాలా?",
    a: "రిజిస్ట్రేషన్ చట్టం 1908 సెక్షన్ 18(e) ప్రకారం భారతదేశంలో వీలునామా రిజిస్ట్రేషన్ చేయడం చట్టరీత్యా తప్పనిసరి కాదు, అది ఐచ్ఛికం (Optional). అయితే, సబ్-రిజిస్ట్రార్ కార్యాలయం (SRO) లో రిజిస్ట్రేషన్ చేయించడం వలన భవిష్యత్తులో ఫోర్జరీ లేదా బలవంతపు ఆరోపణలు రాకుండా బలమైన చట్టపరమైన రక్షణ లభిస్తుంది. రెవెన్యూ రికార్డులు మరియు మున్సిపల్ మ్యుటేషన్‌లో చిక్కులు ఉండవు.",
  },
  {
    q: "హైదరాబాద్ లేదా ఆంధ్రప్రదేశ్‌లో వీలునామాకు కోర్టు ప్రొబేట్ (Probate) అవసరమా?",
    a: "అవసరం లేదు. భారతీయ వారసత్వ చట్టం సెక్షన్ 57 మరియు సెక్షన్ 213 ప్రకారం, ప్రొబేట్ కేవలం ముంబై, కోల్‌కతా, మరియు చెన్నై ప్రెసిడెన్సీ నగరాలకు మాత్రమే వర్తిస్తుంది. హైదరాబాద్, రంగారెడ్డి, మేడ్చల్, విశాఖపట్నం, విజయవాడ మరియు తెలంగాణ, ఏపీలలోని ఏ ప్రాంతంలోనూ వీలునామా అమలు కొరకు కోర్టు ప్రొబేట్ పొందడం తప్పనిసరి కాదు. నేరుగా తహశీల్దార్ లేదా మున్సిపల్ కార్యాలయంలో మ్యుటేషన్ చేయవచ్చు.",
  },
  {
    q: "వీలునామాపై ఎంతమంది సాక్షులు సంతకాలు చేయాలి?",
    a: "సెక్షన్ 63(c) ప్రకారం కనీసం ఇద్దరు స్వతంత్ర సాక్షులు (Two Attesting Witnesses) వీలునామా కర్త సంతకం చేయడాన్ని ప్రత్యక్షంగా చూసి సాక్షి సంతకాలు చేయాలి. అత్యంత ముఖ్యమైన నియమం: సెక్షన్ 67 ప్రకారం ఆస్తి పొందే లబ్ధిదారులు (Beneficiaries) లేదా వారి భార్య/భర్త సాక్షులుగా సంతకం చేయకూడదు. అలా చేస్తే వారికి ఇచ్చే ఆస్తి చెల్లకుండా పోతుంది.",
  },
  {
    q: "పూర్వీకుల ఆస్తిపై (Ancestral Property) పూర్తి వీలునామా రాయవచ్చా?",
    a: "వ్యక్తి తన సొంత సంపాదనతో కొనుగోలు చేసిన ఆస్తులపై (Self-Acquired Property) మాత్రమే తన ఇష్టానుసారం పూర్తి వీలునామా రాయవచ్చును. పూర్వీకుల ఉమ్మడి కుటుంబ ఆస్తిలో (Ancestral Coparcenary Property) తనకు చట్టప్రకారం లభించే విభజించబడని వాటాకు (Undivided Share) మాత్రమే హిందూ వారసత్వ చట్టం సెక్షన్ 30 ప్రకారం వీలునామా రాయవచ్చును.",
  },
  {
    q: "తెలంగాణ మరియు ఏపీలలో వీలునామా రిజిస్ట్రేషన్ ఫీజు ఎంత?",
    a: "తెలంగాణ మరియు ఆంధ్రప్రదేశ్ రిజిస్ట్రేషన్ శాఖ నిబంధనల ప్రకారం వీలునామాపై స్టాంప్ డ్యూటీ సున్నా (₹0). కేవలం ప్రభుత్వ రిజిస్ట్రేషన్ ఫీజు ₹1,000 మరియు కంప్యూటర్ స్కానింగ్/యూజర్ ఛార్జీలు మాత్రమే ఉంటాయి. మొత్తం ప్రభుత్వ రుసుము సుమారు ₹1,500 వరకు ఉంటుంది.",
  },
  {
    q: "అమెరికాలో ఉన్న ఎన్నారై (US Telugu NRI) తల్లిదండ్రులు హైదరాబాద్ ఆస్తులపై వీలునామా ఎలా రాయాలి?",
    a: "భారతదేశంలో ఉన్న స్థిరాస్తుల కొరకు ప్రత్యేకమైన భారతీయ వీలునామా (Separate Indian Will) రాయడం చట్టపరంగా ఉత్తమం. అమెరికా లివింగ్ ట్రస్ట్ (US Living Trust) లేదా విదేశీ వీలునామాను భారతీయ రెవెన్యూ అధికారులు, తహశీల్దార్ లేదా ధరణి పోర్టల్ నేరుగా అంగీకరించవు. ప్రత్యేక భారతీయ వీలునామా రాయడం ద్వారా వారసులకు ఎటువంటి కోర్టు కేసులు లేకుండా సులభంగా నామ మార్పిడి (Mutation) జరుగుతుంది.",
  },
  {
    q: "జీవితకాలంలో వీలునామాను ఎన్నిసార్లు మార్చవచ్చు లేదా రద్దు చేయవచ్చు?",
    a: "వీలునామా కర్త సజీవంగా మరియు ఆరోగ్యకరమైన మానసిక స్థితిలో ఉన్నంతవరకు ఎన్నిసార్లయినా వీలునామాను సవరించుకోవచ్చు (Codicil ద్వారా) లేదా పూర్తిగా రద్దు చేసుకోవచ్చు (Revocation Deed ద్వారా). చివరగా రాసి సంతకం చేసిన వీలునామా (Last Will and Testament) మాత్రమే చట్టప్రకారం చెల్లుబాటు అవుతుంది.",
  },
];

export default function WillFormatTeluguClient() {
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
  const [copiedTelugu, setCopiedTelugu] = useState<boolean>(false);
  const [copiedEnglish, setCopiedEnglish] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedDoctorCert, setCopiedDoctorCert] = useState<boolean>(false);

  // Clause selector states
  const [selectedScenario, setSelectedScenario] = useState<
    "sole_beneficiary" | "equal_children" | "spouse_life_interest" | "minor_guardian" | "disinheritance"
  >("equal_children");

  // SRO Fee Estimator States
  const [selectedState, setSelectedState] = useState<"telangana" | "andhra_pradesh">("telangana");
  const [numberOfPages, setNumberOfPages] = useState<number>(4);
  const [isHomeVisit, setIsHomeVisit] = useState<boolean>(false);

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
      root: null,
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0,
    });

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const fullTeluguText = `వీలునామా / ఆఖరి వీలునామా (LAST WILL AND TESTAMENT)

తేదీ: [తేదీ] రోజున, [నెల], [సంవత్సరం] నాడు, [నగరం/గ్రామం], [జిల్లా], [తెలంగాణ / ఆంధ్రప్రదేశ్] రాష్ట్రములో వ్రాయబడిన ఆఖరి వీలునామా.

వీలునామా కర్త వివరాలు (TESTATOR DECLARATION):
నేను, [వీలునామా కర్త పూర్తి పేరు], వయస్సు [వయస్సు] సంవత్సరాలు, తండ్రి/భర్త పేరు: [తండ్రి/భర్త పేరు], నివాసము: [పూర్తి ఇంటి చిరునామా, వీధి, పట్టణం/గ్రామం, జిల్లా, పిన్ కోడ్], ఆధార్ కార్డు సంఖ్య: [ఆధార్ సంఖ్య], పాన్ కార్డు సంఖ్య: [పాన్ కార్డు సంఖ్య], భారతదేశ పౌరుడను/పౌరురాలను.

మానసిక దృఢత్వ ప్రకటన (SOUND MENTAL CAPACITY DECLARATION):
నేను ప్రస్తుతం పూర్తి శారీరక మరియు మానసిక ఆరోగ్యముతో, స్వస్థ చిత్తముతో (Sound mind, memory, and understanding) ఉన్నాను. ఎవరి ప్రలోభాలు, బెదిరింపులు, మోసము లేదా బలవంతము లేకుండా నా స్వబుద్ధితో, స్వచ్ఛందముగా నా ఇష్టపూర్వకముగా నా అనంతరం నా ఆస్తుల నిర్వహణ మరియు పంపకం కొరకు ఈ ఆఖరి వీలునామాను వ్రాసి ప్రకటించుచున్నాను.

నిబంధన 1: పూర్వపు వీలునామాల రద్దు (REVOCATION OF PRIOR WILLS):
నేను ఇంతకు పూర్వము ఏవైనా వీలునామాలు, కాడిసిల్స్ లేదా వీలునామా ఒప్పందములు చేసియున్నచో, వాటన్నింటిని ఈ వీలునామా ద్వారా పూర్తిగా రద్దు చేయుచున్నాను. ఈ పత్రము మాత్రమే నా ఏకైక చెల్లుబాటు అయ్యే ఆఖరి వీలునామాగా పరిగణించబడవలెను.

నిబంధన 2: జీవితకాల సంపూర్ణ హక్కుల రక్షణ (LIFETIME ABSOLUTE RIGHTS):
నా జీవితకాలము ముగిసేవరకు ఈ క్రింది షెడ్యూలులో పేర్కొన్న నా సమస్త చరాచర ఆస్తులపై సంపూర్ణ యాజమాన్య, అనుభవ హక్కులు మరియు వాటిని అమ్ముటకు, తనఖా పెట్టుటకు లేదా ఇతరులకు బదలాయించుటకు గల సర్వ హక్కులు నాకే పూర్తిగా ఉండును. ఈ వీలునామా నా తదనంతరం (నా సహజ మరణానంతరం) మాత్రమే అమలులోనికి వచ్చును.

నిబంధన 3: స్వార్జిత ఆస్తి ప్రకటన (SELF-ACQUIRED PROPERTY DECLARATION):
ఈ క్రింది షెడ్యూలు 'ఎ' మరియు 'బి' లలో వివరించబడిన స్థిర మరియు చర ఆస్తులన్నీయు నా స్వంత సంపాదనతో, నా వ్యక్తిగత నిధులతో కొనుగోలు చేసిన స్వార్జితములు (Self-Acquired Properties). వీటిపై ఏ ఇతర కుటుంబ సభ్యులకు లేదా పూర్వీకుల ఉమ్మడి కుటుంబానికి ఎటువంటి జన్మహక్కు గాని, వాటా గాని లేదు. వీటిని నా ఇష్టము వచ్చిన రీతిలో సంక్రమింపజేయుటకు నాకు సర్వాధికారములు కలవు.

నిబంధన 4: ఆస్తుల సంక్రమణ మరియు వారసత్వ కేటాయింపు (TESTAMENTARY BEQUEST):
నా మరణానంతరం, ఈ క్రింది షెడ్యూల్ 'ఎ' లో పేర్కొన్న స్థిరాస్తి నా [సంబంధం], [లబ్ధిదారుని పూర్తి పేరు], ఆధార్ సంఖ్య: [ఆధార్ నంబర్] వారికి సంపూర్ణ సర్వహక్కులతో (Absolute and unconditional ownership) చెందవలెను. సదరు లబ్ధిదారుడు తమ పేరిట రెవెన్యూ రికార్డులు, పురపాలక సంఘం (GHMC / మున్సిపాలిటీ / గ్రామ పంచాయతీ) మరియు ధరణి/రిజిస్ట్రేషన్ శాఖలలో నామ మార్పిడి (Mutation) చేయించుకొనుటకు సంపూర్ణ అర్హులు.

నిబంధన 5: మిగిలిన ఆస్తుల కేటాయింపు (RESIDUARY ASSETS CLAUSE):
ఈ వీలునామాలో ప్రత్యేకముగా ప్రస్తావించని ఏవైనా ఇతర స్థిరాస్తులు, బ్యాంకు ఖాతాలు, ఫిక్స్‌డ్ డిపాజిట్లు, షేర్లు, మ్యూచువల్ ఫండ్లు, బంగారు ఆభరణాలు మరియు ఇతర చరాస్తులు ఏవైనా నా మరణ సమయానికి నా పేరిట ఉన్నచో, అవన్నీయు కూడా పైన పేర్కొన్న నా లబ్ధిదారునికే చెందవలెను.

నిబంధన 6: ఎగ్జిక్యూటర్ నియామకం (APPOINTMENT OF EXECUTOR):
ఈ వీలునామాలోని అంశములను సక్రమముగా అమలుపరచుటకు గాను, నేను [ఎగ్జిక్యూటర్ పూర్తి పేరు], చిరునామా: [చిరునామా], ఆధార్ సంఖ్య: [ఆధార్ నంబర్] వారిని నా వీలునామా ఎగ్జిక్యూటర్‌గా నియమించుచున్నాను.

సాక్షుల సమక్షములో ధృవీకరణ (ATTESTATION CLAUSE UNDER SECTION 63 OF INDIAN SUCCESSION ACT, 1925):
ఈ పైన వ్రాయబడిన వీలునామాను మేము చదివి వినిపించగా, వీలునామా కర్త విని, పూర్తిగా అర్థం చేసుకుని, స్వస్థ చిత్తముతో మా సమక్షములో సంతకము చేసినారు. పిమ్మట కర్త కోరిక మేరకు, కర్త సమక్షములో మరియు ఒకరి సమక్షములో మరొకరము సాక్షులుగా సంతకములు చేసినాము.

వీలునామా కర్త సంతకం (TESTATOR SIGNATURE):
సంతకం: _________________________________________
పేరు: [వీలునామా కర్త పేరు]
తేదీ: [తేదీ]
స్థలం: [స్థలం]

సాక్షి 1 (WITNESS 1):
సంతకం: _________________________________________
పేరు: [సాక్షి 1 పూర్తి పేరు]
తండ్రి పేరు: [తండ్రి పేరు]
చిరునామా: [పూర్తి నివాస చిరునామా]
ఆధార్ కార్డు సంఖ్య: [ఆధార్ నంబర్]

సాక్షి 2 (WITNESS 2):
సంతకం: _________________________________________
పేరు: [సాక్షి 2 పూర్తి పేరు]
తండ్రి పేరు: [తండ్రి పేరు]
చిరునామా: [పూర్తి నివాస చిరునామా]
ఆధార్ కార్డు సంఖ్య: [ఆధార్ నంబర్]

షెడ్యూల్ ఆస్తుల వివరాలు (SCHEDULE OF PROPERTIES):
షెడ్యూల్ 'ఎ' స్థిరాస్తి (Schedule 'A' Immovable Property):
జిల్లా: [జిల్లా], సబ్-రిజిస్ట్రార్ కార్యాలయం: [SRO పేరు], మండలం: [మండలం], గ్రామం/మున్సిపాలిటీ: [గ్రామం/వార్డు], సర్వే నంబర్: [సర్వే నంబర్], ప్లాట్ నంబర్: [ప్లాట్ నంబర్], విస్తీర్ణం: [చదరపు గజాలు / గుంటలు / ఎకరాలు].
నాలుగు సరిహద్దులు (Four Boundaries):
తూర్పు: [తూర్పు సరిహద్దు వివరాలు]
పడమర: [పడమర సరిహద్దు వివరాలు]
ఉత్తరం: [ఉత్తర సరిహద్దు వివరాలు]
దక్షిణం: [దక్షిణ సరిహద్దు వివరాలు]`;

  const fullEnglishText = `LEGAL WILL AND TESTAMENT (ENGLISH TRANSLATION & NOTES)

Made on this [Date] day of [Month], [Year], at [City/District], Telangana / Andhra Pradesh.

TESTATOR DECLARATION:
I, [Full Name of Testator], aged [Age] years, son/daughter/wife of [Father/Husband Name], residing at [Complete Residential Address], holding Aadhaar No. [Aadhaar Number], PAN No. [PAN Number], Indian national, being of sound mind, memory, and understanding, and without any undue influence or coercion, do make, publish, and declare this as my LAST WILL AND TESTAMENT.

CLAUSE 1: REVOCATION OF ALL PRIOR WILLS
I cancel and revoke all older Wills and Codicils made by me before this date. This document alone is my valid Last Will.

CLAUSE 2: SOUND MENTAL CAPACITY
I declare that I am in good physical and mental health. I fully understand what I own and to whom I am giving my estate.

CLAUSE 3: LIFETIME OWNERSHIP RIGHTS
I keep full ownership of all my properties during my life. I can live in them, rent them out, or sell them at any time. This Will only works after my death.

CLAUSE 4: SELF-ACQUIRED PROPERTY TITLE
The properties in Schedule A and Schedule B were bought with my own hard-earned money. No relative has any birthright share in them. I have full legal power to give them to anyone I choose.

CLAUSE 5: DISTRIBUTION OF PROPERTIES
Upon my death, the Schedule A immovable property shall go to my [Relation], [Beneficiary Full Name], holding Aadhaar No. [Aadhaar Number], with full ownership rights. They can mutate their name in land and city municipal records.

CLAUSE 6: RESIDUARY ASSETS
Any bank accounts, fixed deposits, mutual funds, or gold owned by me at my death that are not named here shall also go to the same Beneficiary.

CLAUSE 7: APPOINTMENT OF EXECUTOR
I appoint [Executor Full Name], residing at [Address], as the sole Executor of this Will to carry out my wishes.

ATTESTATION (SECTION 63, INDIAN SUCCESSION ACT, 1925):
Signed by the Testator in our presence, and attested by us in his/her presence, and in the presence of each other.

TESTATOR SIGNATURE: _________________________________________
WITNESS 1: [Full Name, Father's Name, Residential Address, Aadhaar Proof]
WITNESS 2: [Full Name, Father's Name, Residential Address, Aadhaar Proof]`;

  const copyTeluguToClipboard = () => {
    navigator.clipboard.writeText(fullTeluguText);
    setCopiedTelugu(true);
    setTimeout(() => setCopiedTelugu(false), 3000);
  };

  const copyEnglishToClipboard = () => {
    navigator.clipboard.writeText(fullEnglishText);
    setCopiedEnglish(true);
    setTimeout(() => setCopiedEnglish(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `US-NRI TELUGU PARENT ESTATE CHECKLIST (HYDERABAD & ANDHRA PRADESH):
1. Make a separate Indian Will for Indian properties. Do not rely only on a US Living Trust.
2. Clearly write down the SRO name, Survey Number, Flat Number, and Dharani Passbook or GHMC tax number.
3. Ensure two independent witnesses sign the Will. The witnesses must not receive any gift under the Will.
4. Get a mental fitness certificate from an MBBS doctor on the day of signing.
5. If signing in the USA, have the Will notarized and consular attested at an Indian Consulate.
6. Register the Will at the Sub-Registrar Office in Telangana or AP during your visit to India.
7. Keep original sale deeds, 30-year link documents, and Encumbrance Certificates safely together.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  const copyDoctorCertToClipboard = () => {
    const certText = `DOCTOR FITNESS CERTIFICATE FORMAT:
"I have examined Mr./Mrs. [Testator Full Name], aged [Age] years, residing at [Address], on this [Date]. The person is alert, oriented, and in sound mental health. In my medical view, the person is fully capable of understanding the nature and effect of making a Will. I have no personal interest in their estate."

Doctor Signature: _______________________
Clinic / Hospital Stamp: _________________
Date: __________________________________`;
    navigator.clipboard.writeText(certText);
    setCopiedDoctorCert(true);
    setTimeout(() => setCopiedDoctorCert(false), 3000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([fullTeluguText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "Veelunama_Format_Telugu_WillDrafting.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  // Fee calculation engine for Telangana and Andhra Pradesh SRO
  const baseRegFee = 1000;
  const userScanningFee = selectedState === "telangana" ? 500 : 300;
  const homeVisitFee = isHomeVisit ? 1000 : 0;
  const totalSroCost = baseRegFee + userScanningFee + homeVisitFee;

  // Scenario clause text
  const getScenarioClause = () => {
    switch (selectedScenario) {
      case "sole_beneficiary":
        return {
          title: "ఏకైక లబ్ధిదారుని నిబంధన (Sole Beneficiary Clause)",
          telugu: `"నా సహజ మరణానంతరం, ఈ వీలునామా షెడ్యూలులో పేర్కొన్న నా సమస్త స్థిర మరియు చరాస్తులు, బ్యాంకు ఖాతాలు, ఫిక్స్‌డ్ డిపాజిట్లు నా [సంబంధం], [లబ్ధిదారుని పూర్తి పేరు] వారికి మాత్రమే సంపూర్ణ యాజమాన్య హక్కులతో చెందవలెను. నా ఇతర బంధువులకు ఎవరికీ ఇందులో ఎటువంటి హక్కు గాని, వాటా గాని ఉండదు."`,
          english: `"After my death, all my properties and bank accounts shall go solely to my [Relation], [Full Name of Beneficiary]. No other relative shall have any share in them."`,
        };
      case "equal_children":
        return {
          title: "సంతానానికి సమాన వాటాల నిబంధన (Equal Division Between Children)",
          telugu: `"నా మరణానంతరం, నా షెడ్యూలు స్థిరాస్తి నా కుమారుడు [కుమారుని పేరు] మరియు నా కుమార్తె [కుమార్తె పేరు] లకు చెరిసగం (50:50 సమాన వాటాలుగా) సంక్రమించవలెను. ఇద్దరూ పరస్పర అంగీకారంతో రిజిస్టర్డ్ భాగ పరిష్కార పత్రం (Partition Deed) ద్వారా విభజించుకుని అనుభవించవలెను."`,
          english: `"After my death, my property shall go equally to my son [Son Name] and my daughter [Daughter Name] in equal shares."`,
        };
      case "spouse_life_interest":
        return {
          title: "జీవిత భాగస్వామికి జీవితకాల అనుభవ హక్కు (Spouse Life Interest Clause)",
          telugu: `"నా మరణానంతరం, నా భార్య/భర్త [పేరు] బ్రతికి ఉన్నంతవరకు ఈ ఇంటిలో నివసించుటకు మరియు అద్దెలు పొందుటకు సంపూర్ణ జీవితకాల హక్కు (Life Interest) ఉండును. అయితే ఆస్తిని అమ్ముటకు గాని, తనఖా పెట్టుటకు గాని హక్కు ఉండదు. వారి తదనంతరం మాత్రమే ఆస్తి నా సంతానానికి సంపూర్ణ హక్కులతో చెందవలెను."`,
          english: `"After my death, my spouse [Spouse Name] can live in this house and collect rent for life. They cannot sell the house. After their death, the house goes to my children."`,
        };
      case "minor_guardian":
        return {
          title: "మైనర్ సంతానానికి గార్డియన్ నిబంధన (Testamentary Guardian for Minor)",
          telugu: `"నా మరణ సమయానికి నా సంతానం మైనర్‌గా ఉన్నచో, వారు 18 సంవత్సరాల వయస్సు పూర్తి చేసుకునే వరకు వారి సంరక్షణ కొరకు మరియు ఆస్తి పర్యవేక్షణ కొరకు నా నమ్మకస్తులైన [గార్డియన్ పేరు] వారిని టెస్టమెంటరీ గార్డియన్‌గా నియమించుచున్నాను."`,
          english: `"If my children are minors when I pass away, I appoint [Guardian Name] as their guardian under Section 60 until they turn 18."`,
        };
      case "disinheritance":
        return {
          title: "స్పష్టమైన కారణాలతో వారసత్వ మినహాయింపు (Specific Disinheritance Clause)",
          telugu: `"నా కుమారుడు/కుమార్తె [పేరు] నా వృద్ధాప్యంలో నన్ను ఏమాత్రం పట్టించుకోనందున మరియు ఇప్పటికే వారికి అవసరమైనంత నగదు రూపంలో సహాయం చేసినందున, నా ఈ వీలునామా ఆస్తుల నుండి వారిని పూర్తిగా మినహాయించుచున్నాను. వారికి నా ఆస్తిపై ఎటువంటి హక్కు ఉండదు."`,
          english: `"I leave no property to my [Relation], [Name], because I gave them money earlier and they did not look after me in my old age."`,
        };
    }
  };

  const scenarioData = getScenarioClause();

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy matching Reference Page)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTION 63 • TELANGANA &amp; AP SRO RULES</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, strictly 1 per page, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            వీలునామా ఫార్మాట్ తెలుగు: Legally Valid Will Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download a valid <strong>వీలునామా ఫార్మాట్ తెలుగు (Will Format in Telugu)</strong> for plain paper drafting.
            Learn how to write a valid Will with two witnesses, a doctor fitness certificate, and simple SRO registration
            rules in Telangana and Andhra Pradesh.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#telugu-veelunama-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <ScrollText className="w-4 h-4" />
              <span>వీలునామా ఫార్మాట్ చూడండి (View Draft)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Challenge-Proof Will Online</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#172228]/10 shadow-xs text-[#C65378] flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#172228]/70 font-medium">Sec 63 Compliant</p>
                <p className="text-sm font-bold text-[#172228]">Plain Paper Legal</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#172228]/10 shadow-xs text-[#5F7E75] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#172228]/70 font-medium">Two Witnesses</p>
                <p className="text-sm font-bold text-[#172228]">Non-Beneficiary</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#172228]/10 shadow-xs text-[#C65378] flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#172228]/70 font-medium">Hyderabad &amp; AP</p>
                <p className="text-sm font-bold text-[#172228]">Probate Not Mandatory</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#172228]/10 shadow-xs text-[#5F7E75] flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#172228]/70 font-medium">US-NRI Estates</p>
                <p className="text-sm font-bold text-[#172228]">Cross-Border Moat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: MAIN BODY (Sidebar + Content Column Grid)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* =======================================================================
              STICKY LEFT SIDEBAR (TOC + Conversion CTAs)
              ======================================================================= */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 self-start">
            {/* Table of Contents Box */}
            <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#172228]/10">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <div className="text-sm font-bold text-[#172228] uppercase tracking-wider">
                  విషయ సూచిక (Index)
                </div>
              </div>
              <nav className="space-y-1 text-xs sm:text-sm">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block py-1.5 px-2.5 rounded-lg transition-colors leading-snug ${
                      activeId === item.id
                        ? "bg-[#C65378]/10 text-[#C65378] font-bold"
                        : "text-[#172228]/80 hover:text-[#C65378] hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Conversion CTA 1: Self-Serve Online Will */}
            <div className="bg-[#172228] text-white p-6 rounded-2xl shadow-md border border-[#172228]/15 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C65378]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C65378]/25 text-[#C65378] text-[0.7rem] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3 h-3" />
                <span>AI-Assisted Legal Drafting</span>
              </div>
              <div className="text-base font-bold text-white mb-2 leading-snug">
                మీ వీలునామాను 15 నిమిషాల్లో ఆన్‌లైన్‌లో రాయండి
              </div>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                Draft a legally valid Will for your properties in Hyderabad and Andhra Pradesh.
                You can print it on plain paper right away.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>వీలునామా ప్రారంభించండి (Start Will)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Conversion CTA 2: Advocate Consultation (Strictly NO phone numbers) */}
            <div className="bg-gradient-to-br from-rose-50 to-[#FAF7F0] p-6 rounded-2xl border border-[#C65378]/20 shadow-xs">
              <div className="flex items-center gap-2 text-[#C65378] font-bold text-xs uppercase tracking-wider mb-2">
                <Gavel className="w-4 h-4" />
                <span>AMA Legal Solutions Advisory</span>
              </div>
              <div className="text-base font-bold text-[#172228] mb-2 leading-snug">
                న్యాయవాది సలహా కావాలా? (Need Advocate Guidance?)
              </div>
              <p className="text-xs text-[#172228]/80 leading-relaxed mb-4">
                Talk to senior lawyers for custom Will drafting, NRI property advice, and dispute prevention.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#C65378]/30 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-xs font-bold transition-all shadow-xs"
              >
                <span>న్యాయవాద సంప్రదింపు (Book Consultation)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Senior Counsel Authority Profile */}
            <div className="bg-white p-5 rounded-2xl border border-[#172228]/10 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-base shrink-0">
                AM
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#172228]">Advocate Anuj Anand Malik</p>
                <p className="text-[#172228]/70">Senior Succession Counsel</p>
                <p className="text-[0.7rem] text-[#C65378] font-semibold mt-0.5">
                  Bar Council of Delhi • AMA Legal Solutions
                </p>
              </div>
            </div>
          </aside>

          {/* =======================================================================
              MAIN CONTENT COLUMN
              ======================================================================= */}
          <main className="lg:col-span-8 space-y-12">
            {/* OG Image Display Section */}
            <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#172228]/10 shadow-sm overflow-hidden">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xs border border-[#172228]/10">
                <Image
                  src="/images/will-format-telugu-veelunama-og.jpg"
                  alt="Will Format in Telugu: వీలునామా ఫార్మాట్ (Veelunama) Legal Guide"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#172228]/70 px-1">
                <span className="font-semibold text-[#172228]">
                  చిత్రం: తెలుగు వీలునామా మరియు వారసత్వ చట్ట నిబంధనలు (Legal Will Format in Telugu)
                </span>
                <span className="inline-flex items-center gap-1 text-[#5F7E75] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Sec 63 ISA Compliant
                </span>
              </div>
            </section>

            {/* Quick Answer / Executive Summary Box */}
            <section className="bg-gradient-to-br from-emerald-50/70 via-white to-rose-50/40 p-6 rounded-2xl border border-[#5F7E75]/25 shadow-xs">
              <div className="flex items-center gap-2 text-[#5F7E75] font-bold text-xs uppercase tracking-wider mb-2">
                <Info className="w-4 h-4" />
                <span>ముఖ్య సారాంశం (Quick Legal Answer)</span>
              </div>
              <div className="text-lg font-extrabold text-[#172228] mb-3">
                తెలుగులో వీలునామా ఎలా రాయాలి? (How to Write a Will in Telugu)
              </div>
              <p className="text-sm text-[#172228]/90 leading-relaxed mb-3">
                భారతీయ వారసత్వ చట్టం 1925 (Indian Succession Act, 1925) సెక్షన్ 63 ప్రకారం, వీలునామాను తెల్ల కాగితంపై
                తెలుగులో రాయవచ్చును. స్టాంప్ పేపర్ కొనుగోలు చేయవలసిన అవసరం లేదు. వీలునామా కర్త స్వస్థ చిత్తముతో (Sound
                Mind) సంతకం చేసి, ఆస్తితో సంబంధం లేని కనీసం ఇద్దరు స్వతంత్ర సాక్షుల (Two Witnesses) సమక్షంలో ధృవీకరించాలి.
              </p>
              <p className="text-sm text-[#172228]/90 leading-relaxed">
                హైదరాబాద్ మరియు ఆంధ్రప్రదేశ్‌లలో వీలునామా అమలు కొరకు కోర్టు ప్రొబేట్ (Probate) అవసరం లేదు. సబ్-రిజిస్ట్రార్
                కార్యాలయంలో రిజిస్ట్రేషన్ చేయడం ఐచ్ఛికమైనప్పటికీ, కుటుంబ వివాదాలు నివారించడానికి ఇది అత్యుత్తమ చట్టపరమైన రక్షణ.
              </p>
            </section>

            {/* =====================================================================
                SECTION 1: STATUTORY BASIS & LEGAL FOUNDATIONS
                ===================================================================== */}
            <section id="statutory-basis" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#C65378]">
                <Scale className="w-3.5 h-3.5" />
                <span>చట్టపరమైన ఆధారం • STATUTORY BASIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                1. Statutory Basis: Indian Succession Act &amp; Telugu SRO Rules
              </h2>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                Making and registering a Will in Telangana and Andhra Pradesh is governed by clear statutory laws.
                Here are the core legal rules every family must know:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-[#C65378] font-bold text-xs mb-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Indian Succession Act, 1925 (Sec 59 &amp; 63)</span>
                  </div>
                  <p className="text-xs text-[#172228]/80 leading-relaxed">
                    Under Section 59, any adult of sound mind can make a Will. Under Section 63, the person making the Will
                    must sign it. At least two witnesses must watch them sign and sign the Will too.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-[#5F7E75] font-bold text-xs mb-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Registration Act, 1908 (Section 18(e))</span>
                  </div>
                  <p className="text-xs text-[#172228]/80 leading-relaxed">
                    Under Section 18(e), registering a Will is optional in India. An unregistered Will on plain white paper
                    is legally valid. But registering it at the Sub-Registrar Office in Telangana or AP gives strong proof against false claims of fraud.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-[#C65378] font-bold text-xs mb-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Section 67: Disqualification of Beneficiary Witness</span>
                  </div>
                  <p className="text-xs text-[#172228]/80 leading-relaxed">
                    Under Section 67, any person who gets property under the Will must NOT sign as a witness. Their spouse
                    must not sign either. If a beneficiary signs as a witness, their gift under the Will becomes void.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-[#5F7E75] font-bold text-xs mb-1.5">
                    <Landmark className="w-4 h-4" />
                    <span>Section 213: No Probate Moat in Telangana &amp; AP</span>
                  </div>
                  <p className="text-xs text-[#172228]/80 leading-relaxed">
                    Under Sections 57 and 213, probate from a High Court is not mandatory in Telangana or Andhra Pradesh for
                    Hindus. You do not need to go to court for probate. Revenue officers and municipal bodies can update property records directly.
                  </p>
                </div>
              </div>
            </section>

            {/* =====================================================================
                SECTION 2: COMPLETE VEELUNAMA FORMAT (NATIVE TELUGU WILL DRAFT)
                ===================================================================== */}
            <section id="telugu-veelunama-format" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#C65378]">
                <FileText className="w-3.5 h-3.5" />
                <span>ప్రామాణిక వీలునామా డ్రాఫ్ట్ • NATIVE TELUGU FORMAT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                2. Complete Veelunama Format: Native Telugu Will Draft
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                ఈ క్రింది తెలుగు వీలునామా నమూనాను ఏ4 సైజు తెల్ల కాగితంపై లేదా గ్రీన్ లెడ్జర్ పేపర్‌పై ఉపయోగించవచ్చు.
                బ్రాకెట్లలో [ ] ఉన్న వివరాలను మీ ఆస్తులకు అనుగుణంగా మార్చుకోండి:
              </p>

              {/* Styled Legal Parchment Box */}
              <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#172228]/15 shadow-md overflow-hidden">
                {/* Header bar */}
                <div className="bg-[#172228] text-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
                    <ScrollText className="w-4 h-4 text-[#C65378]" />
                    <span>వీలునామా ఫార్మాట్ తెలుగు (Veelunama Legal Draft)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyTeluguToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      {copiedTelugu ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>కాపీ చేయబడింది!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>కాపీ చేయండి (Copy)</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>ప్రింట్ (Print)</span>
                    </button>
                    <button
                      onClick={handleDownloadTxt}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-xs font-bold text-white transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>డౌన్‌లోడ్ .TXT</span>
                    </button>
                  </div>
                </div>

                {/* Parchment Body */}
                <div className="p-5 sm:p-7 max-h-[550px] overflow-y-auto text-xs sm:text-sm font-serif leading-relaxed text-[#172228] space-y-4 bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EC]">
                  <div className="text-center pb-3 border-b border-[#172228]/15">
                    <h3 className="text-base sm:text-lg font-bold tracking-wider text-[#172228]">
                      వీలునామా / ఆఖరి వీలునామా
                    </h3>
                    <p className="text-xs text-[#172228]/70 italic mt-0.5">
                      (భారతీయ వారసత్వ చట్టం, 1925 సెక్షన్ 63 ప్రకారం చేయబడినది)
                    </p>
                  </div>

                  <p>
                    <strong>తేదీ:</strong> [తేదీ] రోజున, [నెల], [సంవత్సరం] నాడు, [నగరం/గ్రామం], [జిల్లా],
                    [తెలంగాణ / ఆంధ్రప్రదేశ్] రాష్ట్రములో వ్రాయబడిన ఆఖరి వీలునామా.
                  </p>

                  <div>
                    <h4 className="font-bold text-[#172228] uppercase text-xs tracking-wider mb-1">
                      వీలునామా కర్త వివరాలు (TESTATOR DECLARATION):
                    </h4>
                    <p>
                      నేను, <strong>[వీలునామా కర్త పూర్తి పేరు]</strong>, వయస్సు [వయస్సు] సంవత్సరాలు, తండ్రి/భర్త పేరు:
                      [తండ్రి/భర్త పేరు], నివాసము: [పూర్తి ఇంటి చిరునామా, వీధి, పట్టణం/గ్రామం, జిల్లా, పిన్ కోడ్], ఆధార్
                      కార్డు సంఖ్య: [ఆధార్ సంఖ్య], పాన్ కార్డు సంఖ్య: [పాన్ కార్డు సంఖ్య], భారతదేశ పౌరుడను/పౌరురాలను.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#172228] uppercase text-xs tracking-wider mb-1">
                      మానసిక దృఢత్వ ప్రకటన (SOUND MENTAL CAPACITY DECLARATION):
                    </h4>
                    <p>
                      నేను ప్రస్తుతం పూర్తి శారీరక మరియు మానసిక ఆరోగ్యముతో, స్వస్థ చిత్తముతో (Sound mind, memory, and understanding)
                      ఉన్నాను. ఎవరి ప్రలోభాలు, బెదిరింపులు, మోసము లేదా బలవంతము లేకుండా నా స్వబుద్ధితో, స్వచ్ఛందముగా నా ఇష్టపూర్వకముగా
                      నా అనంతరం నా ఆస్తుల నిర్వహణ మరియు పంపకం కొరకు ఈ ఆఖరి వీలునామాను వ్రాసి ప్రకటించుచున్నాను.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#172228] uppercase text-xs tracking-wider mb-1">
                      నిబంధన 1: పూర్వపు వీలునామాల రద్దు (REVOCATION OF PRIOR WILLS):
                    </h4>
                    <p>
                      నేను ఇంతకు పూర్వము ఏవైనా వీలునామాలు, కాడిసిల్స్ లేదా వీలునామా ఒప్పందములు చేసియున్నచో, వాటన్నింటిని ఈ
                      వీలునామా ద్వారా పూర్తిగా రద్దు చేయుచున్నాను. ఈ పత్రము మాత్రమే నా ఏకైక చెల్లుబాటు అయ్యే ఆఖరి వీలునామాగా
                      పరిగణించబడవలెను.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#172228] uppercase text-xs tracking-wider mb-1">
                      నిబంధన 2: జీవితకాల సంపూర్ణ హక్కుల రక్షణ (LIFETIME ABSOLUTE RIGHTS):
                    </h4>
                    <p>
                      నా జీవితకాలము ముగిసేవరకు ఈ క్రింది షెడ్యూలులో పేర్కొన్న నా సమస్త చరాచర ఆస్తులపై సంపూర్ణ యాజమాన్య,
                      అనుభవ హక్కులు మరియు వాటిని అమ్ముటకు, తనఖా పెట్టుటకు లేదా ఇతరులకు బదలాయించుటకు గల సర్వ హక్కులు నాకే
                      పూర్తిగా ఉండును. ఈ వీలునామా నా తదనంతరం (నా సహజ మరణానంతరం) మాత్రమే అమలులోనికి వచ్చును.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#172228] uppercase text-xs tracking-wider mb-1">
                      నిబంధన 3: స్వార్జిత ఆస్తి ప్రకటన (SELF-ACQUIRED PROPERTY DECLARATION):
                    </h4>
                    <p>
                      ఈ క్రింది షెడ్యూలు &apos;ఎ&apos; మరియు &apos;బి&apos; లలో వివరించబడిన స్థిర మరియు చర ఆస్తులన్నీయు నా స్వంత సంపాదనతో, నా వ్యక్తిగత
                      నిధులతో కొనుగోలు చేసిన స్వార్జితములు (Self-Acquired Properties). వీటిపై ఏ ఇతర కుటుంబ సభ్యులకు లేదా పూర్వీకుల
                      ఉమ్మడి కుటుంబానికి ఎటువంటి జన్మహక్కు గాని, వాటా గాని లేదు. వీటిని నా ఇష్టము వచ్చిన రీతిలో సంక్రమింపజేయుటకు
                      నాకు సర్వాధికారములు కలవు.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#172228] uppercase text-xs tracking-wider mb-1">
                      నిబంధన 4: ఆస్తుల సంక్రమణ మరియు వారసత్వ కేటాయింపు (TESTAMENTARY BEQUEST):
                    </h4>
                    <p>
                      నా మరణానంతరం, ఈ క్రింది షెడ్యూల్ &apos;ఎ&apos; లో పేర్కొన్న స్థిరాస్తి నా [సంబంధం], <strong>[లబ్ధిదారుని పూర్తి పేరు]</strong>,
                      ఆధార్ సంఖ్య: [ఆధార్ నంబర్] వారికి సంపూర్ణ సర్వహక్కులతో (Absolute and unconditional ownership) చెందవలెను. సదరు
                      లబ్ధిదారుడు తమ పేరిట రెవెన్యూ రికార్డులు, పురపాలక సంఘం (GHMC / మున్సిపాలిటీ / గ్రామ పంచాయతీ) మరియు
                      ధరణి/రిజిస్ట్రేషన్ శాఖలలో నామ మార్పిడి (Mutation) చేయించుకొనుటకు సంపూర్ణ అర్హులు.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#172228] uppercase text-xs tracking-wider mb-1">
                      నిబంధన 5: మిగిలిన ఆస్తుల కేటాయింపు (RESIDUARY ASSETS CLAUSE):
                    </h4>
                    <p>
                      ఈ వీలునామాలో ప్రత్యేకముగా ప్రస్తావించని ఏవైనా ఇతర స్థిరాస్తులు, బ్యాంకు ఖాతాలు, ఫిక్స్‌డ్ డిపాజిట్లు, షేర్లు,
                      మ్యూచువల్ ఫండ్లు, బంగారు ఆభరణాలు మరియు ఇతర చరాస్తులు ఏవైనా నా మరణ సమయానికి నా పేరిట ఉన్నచో, అవన్నీయు కూడా
                      పైన పేర్కొన్న నా లబ్ధిదారునికే చెందవలెను.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#172228] uppercase text-xs tracking-wider mb-1">
                      నిబంధన 6: ఎగ్జిక్యూటర్ నియామకం (APPOINTMENT OF EXECUTOR):
                    </h4>
                    <p>
                      ఈ వీలునామాలోని అంశములను సక్రమముగా అమలుపరచుటకు గాను, నేను [ఎగ్జిక్యూటర్ పూర్తి పేరు], చిరునామా: [చిరునామా],
                      ఆధార్ సంఖ్య: [ఆధార్ నంబర్] వారిని నా వీలునామా ఎగ్జిక్యూటర్‌గా నియమించుచున్నాను.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#172228] uppercase text-xs tracking-wider mb-1">
                      సాక్షుల సమక్షములో ధృవీకరణ (ATTESTATION CLAUSE UNDER SECTION 63):
                    </h4>
                    <p>
                      ఈ పైన వ్రాయబడిన వీలునామాను మేము చదివి వినిపించగా, వీలునామా కర్త విని, పూర్తిగా అర్థం చేసుకుని, స్వస్థ చిత్తముతో
                      మా సమక్షములో సంతకము చేసినారు. పిమ్మట కర్త కోరిక మేరకు, కర్త సమక్షములో మరియు ఒకరి సమక్షములో మరొకరము సాక్షులుగా
                      సంతకములు చేసినాము.
                    </p>
                  </div>

                  <div className="pt-2">
                    <p className="font-bold">వీలునామా కర్త సంతకం (TESTATOR SIGNATURE): ____________________</p>
                    <p className="mt-1">సాక్షి 1 సంతకం: ____________________ [పేరు, తండ్రి పేరు, చిరునామా, ఆధార్]</p>
                    <p className="mt-1">సాక్షి 2 సంతకం: ____________________ [పేరు, తండ్రి పేరు, చిరునామా, ఆధార్]</p>
                  </div>

                  <div className="pt-2 border-t border-[#172228]/15">
                    <h4 className="font-bold text-[#172228] uppercase text-xs tracking-wider mb-1">
                      షెడ్యూల్ ఆస్తుల వివరాలు (SCHEDULE OF PROPERTIES):
                    </h4>
                    <p>
                      షెడ్యూల్ &apos;ఎ&apos; స్థిరాస్తి: జిల్లా: [జిల్లా], సబ్-రిజిస్ట్రార్ కార్యాలయం: [SRO పేరు], మండలం: [మండలం], గ్రామం: [గ్రామం],
                      సర్వే నంబర్: [సర్వే నంబర్], ప్లాట్ నంబర్: [ప్లాట్ నంబర్], విస్తీర్ణం: [చదరపు గజాలు / గుంటలు].
                    </p>
                    <p className="mt-1 text-xs text-[#172228]/80">
                      సరిహద్దులు: తూర్పు: [వివరణ], పడమర: [వివరణ], ఉత్తరం: [వివరణ], దక్షిణం: [వివరణ].
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                SECTION 3: ENGLISH TRANSLATION & STATUTORY ANATOMY
                ===================================================================== */}
            <section id="english-translation" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#5F7E75]">
                <Globe className="w-3.5 h-3.5" />
                <span>ఆంగ్ల అనువాదం • ENGLISH TRANSLATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                3. English Translation: Telugu Veelunama Clauses Explained
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                Banks and courts often ask for an English copy of a Telugu Will. Here is a clear English explanation
                of each key clause:
              </p>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <h4 className="text-xs font-bold text-[#C65378] uppercase tracking-wider mb-1">
                    Clause 1: Revocation of Prior Wills (పూర్వపు వీలునామాల రద్దు)
                  </h4>
                  <p className="text-xs text-[#172228]/80 leading-relaxed">
                    Under Section 70, writing a new Will cancels all old Wills. This stops any old letters or rough drafts
                    from causing family disputes later.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <h4 className="text-xs font-bold text-[#5F7E75] uppercase tracking-wider mb-1">
                    Clause 2: Sound Mental Capacity Recital (స్వస్థ చిత్తము ప్రకటన)
                  </h4>
                  <p className="text-xs text-[#172228]/80 leading-relaxed">
                    Under Section 59, you must be in good mental health to make a Will. A doctor certificate proves you knew
                    what you were doing. This protects your Will if an unhappy relative challenges it in court.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <h4 className="text-xs font-bold text-[#C65378] uppercase tracking-wider mb-1">
                    Clause 3: Life Interest Reservation (జీవితకాల అనుభవ హక్కు)
                  </h4>
                  <p className="text-xs text-[#172228]/80 leading-relaxed">
                    A Will only works after death. You keep full ownership of your home while you are alive. You can still
                    live in it, rent it out, or sell it at any time.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <h4 className="text-xs font-bold text-[#5F7E75] uppercase tracking-wider mb-1">
                    Clause 4 &amp; 5: Self-Acquired vs Coparcenary Title (స్వార్జిత ఆస్తి)
                  </h4>
                  <p className="text-xs text-[#172228]/80 leading-relaxed">
                    You can give away all properties bought with your own hard-earned money. For ancestral family property,
                    you can only give your own legal share under Section 30.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={copyEnglishToClipboard}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#172228]/20 hover:border-[#C65378] text-[#172228] text-xs font-bold transition-colors shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>{copiedEnglish ? "ఆంగ్ల డ్రాఫ్ట్ కాపీ చేయబడింది!" : "ఆంగ్ల డ్రాఫ్ట్ కాపీ చేయండి (Copy English Translation)"}</span>
                </button>
              </div>
            </section>

            {/* =====================================================================
                SECTION 4: INTERACTIVE CLAUSE SELECTOR & CUSTOMIZER
                ===================================================================== */}
            <section id="clause-selector" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#C65378]">
                <Sliders className="w-3.5 h-3.5" />
                <span>అనుకూల నిబంధనలు • CLAUSE SELECTOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                4. Interactive Clause Selector: Tailor Your Telugu Will
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                ప్రతి కుటుంబ పరిస్థితి విభిన్నంగా ఉంటుంది. మీ అవసరాలకు తగిన ప్రత్యేక నిబంధనను ఎంచుకుని వీలునామాలో చేర్చుకోండి:
              </p>

              {/* Selector Tabs */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedScenario("equal_children")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedScenario === "equal_children"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-white border border-[#172228]/10 text-[#172228] hover:bg-slate-50"
                  }`}
                >
                  సంతానానికి సమాన వాటాలు
                </button>
                <button
                  onClick={() => setSelectedScenario("spouse_life_interest")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedScenario === "spouse_life_interest"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-white border border-[#172228]/10 text-[#172228] hover:bg-slate-50"
                  }`}
                >
                  భార్య/భర్త జీవితకాల హక్కు
                </button>
                <button
                  onClick={() => setSelectedScenario("sole_beneficiary")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedScenario === "sole_beneficiary"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-white border border-[#172228]/10 text-[#172228] hover:bg-slate-50"
                  }`}
                >
                  ఒకే ఒక్క లబ్ధిదారుడు
                </button>
                <button
                  onClick={() => setSelectedScenario("minor_guardian")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedScenario === "minor_guardian"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-white border border-[#172228]/10 text-[#172228] hover:bg-slate-50"
                  }`}
                >
                  మైనర్ సంతానం గార్డియన్
                </button>
                <button
                  onClick={() => setSelectedScenario("disinheritance")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedScenario === "disinheritance"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-white border border-[#172228]/10 text-[#172228] hover:bg-slate-50"
                  }`}
                >
                  ఆస్తి నుండి మినహాయింపు
                </button>
              </div>

              {/* Dynamic Selected Clause Box */}
              <div className="bg-white p-5 rounded-2xl border border-[#172228]/15 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#172228]">{scenarioData.title}</h4>
                  <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold">
                    Custom Clause
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 font-serif text-xs leading-relaxed text-[#172228]">
                  <p className="font-semibold text-[#C65378] mb-1">తెలుగు నిబంధన:</p>
                  <p>{scenarioData.telugu}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-sans text-xs leading-relaxed text-[#172228]/80">
                  <p className="font-semibold text-slate-700 mb-1">English Legal Clause:</p>
                  <p>{scenarioData.english}</p>
                </div>
              </div>
            </section>

            {/* =====================================================================
                SECTION 5: US-NRI TELUGU PARENT CHECKLIST (CROSS-BORDER MOAT)
                ===================================================================== */}
            <section id="us-nri-telugu-checklist" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#5F7E75]">
                <Globe className="w-3.5 h-3.5" />
                <span>ఎన్నారై మార్గదర్శకాలు • US-NRI TELUGU MOAT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                5. US-NRI Telugu Checklist: Property in Hyderabad &amp; AP
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                Many Telugu families living in the USA own apartments and land in Hyderabad and Andhra Pradesh.
                A US Living Trust does not work smoothly in India. Here is what you should do:
              </p>

              <div className="bg-gradient-to-br from-white via-rose-50/20 to-emerald-50/20 p-5 sm:p-6 rounded-2xl border border-[#172228]/15 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#172228]/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                    <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                    <span>US-NRI తెలుగు కుటుంబాల ఎస్టేట్ ప్లానింగ్ చెక్‌లిస్ట్</span>
                  </div>
                  <button
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#172228]/15 hover:border-[#C65378] text-xs font-semibold text-[#172228] transition-colors"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>కాపీ చేయబడింది!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>చెక్‌లిస్ట్ కాపీ చేయండి</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-2.5 text-xs text-[#172228]/85 leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Make a Separate Indian Will:</strong> Make a separate Will for your properties in India.
                      Do not mix Indian lands with your American Will or living trust.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Include Survey and Municipal Numbers:</strong> Always write the survey number, flat number,
                      and Dharani passbook or GHMC property tax number clearly.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Consulate Signing in the USA:</strong> If you live in America, you can sign your Will at an
                      Indian Consulate. Consulates in San Francisco, New York, Chicago, Atlanta, and Houston provide consular stamps.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Avoid US Living Trust Pitfalls:</strong> Indian land officers do not easily recognize foreign trusts.
                      Getting court probate in India takes years under Section 228. A direct Indian Will avoids this problem.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Name a Local Executor in India:</strong> Appoint a trusted relative or lawyer in Hyderabad or AP.
                      They can help update property names without your children flying to India.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                SECTION 6: TELANGANA & AP SRO REGISTRATION RULES & FEE ESTIMATOR
                ===================================================================== */}
            <section id="sro-registration-rules" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#C65378]">
                <Calculator className="w-3.5 h-3.5" />
                <span>రిజిస్ట్రేషన్ ఫీజు • SRO FEE CALCULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                6. Telangana &amp; Andhra Pradesh SRO Will Registration Rules
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                Registering a Will in Telangana or Andhra Pradesh has very low government fees.
                Use this simple tool to estimate your official fees:
              </p>

              {/* Calculator Interactive Card */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#172228]/15 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#172228] mb-1.5">రాష్ట్రం (State)</label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value as "telangana" | "andhra_pradesh")}
                      className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#172228]/20 bg-slate-50 focus:outline-hidden focus:border-[#C65378]"
                    >
                      <option value="telangana">తెలంగాణ (Telangana SRO)</option>
                      <option value="andhra_pradesh">ఆంధ్రప్రదేశ్ (Andhra Pradesh SRO)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172228] mb-1.5">పేజీల సంఖ్య (Pages)</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={numberOfPages}
                      onChange={(e) => setNumberOfPages(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#172228]/20 bg-slate-50 focus:outline-hidden focus:border-[#C65378]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172228] mb-1.5">ఇంటి వద్ద రిజిస్ట్రేషన్?</label>
                    <select
                      value={isHomeVisit ? "yes" : "no"}
                      onChange={(e) => setIsHomeVisit(e.target.value === "yes")}
                      className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#172228]/20 bg-slate-50 focus:outline-hidden focus:border-[#C65378]"
                    >
                      <option value="no">SRO కార్యాలయంలో (At SRO)</option>
                      <option value="yes">ఇంటి వద్ద (Home Visit Sec 31)</option>
                    </select>
                  </div>
                </div>

                {/* Calculation Output Strip */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-rose-50/80 via-white to-emerald-50/80 border border-[#172228]/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-[#172228]/70">మొత్తం అంచనా ప్రభుత్వ రుసుము (Total SRO Fee):</p>
                    <p className="text-xl sm:text-2xl font-black text-[#C65378]">₹{totalSroCost.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="text-xs text-[#172228]/80 space-y-0.5 text-right">
                    <p>స్టాంప్ డ్యూటీ: <strong>₹0 (సున్నా)</strong></p>
                    <p>రిజిస్ట్రేషన్ రుసుము: <strong>₹{baseRegFee}</strong></p>
                    <p>స్కానింగ్ &amp; యూజర్ ఛార్జీలు: <strong>₹{userScanningFee}</strong></p>
                    {isHomeVisit && <p className="text-emerald-700">హోమ్ విజిట్ ఫీజు: <strong>₹1,000</strong></p>}
                  </div>
                </div>

                <p className="text-[0.75rem] text-[#172228]/70 italic leading-relaxed">
                  *గమనిక: సీనియర్ సిటిజన్లు లేదా అనారోగ్యంతో నడవలేని వారు రిజిస్ట్రేషన్ చట్టం సెక్షన్ 31 కింద ప్రైవేట్ అటెండెన్స్
                  కొరకు దరఖాస్తు చేసుకోవచ్చు. సబ్-రిజిస్ట్రార్ స్వయంగా మీ ఇంటికి లేదా ఆసుపత్రికి వచ్చి రిజిస్ట్రేషన్ పూర్తి చేస్తారు.
                </p>
              </div>
            </section>

            {/* =====================================================================
                SECTION 7: COMPARISON TABLE
                ===================================================================== */}
            <section id="comparison-table" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#5F7E75]">
                <Layers className="w-3.5 h-3.5" />
                <span>సమగ్ర పోలిక • COMPARISON TABLE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                7. Comparison: Registered Veelunama vs Gift vs Varisu Nama
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                ఆస్తి బదిలీ కొరకు రిజిస్టర్డ్ వీలునామా, గిఫ్ట్ డీడ్ (దాన పత్రం), మరియు లీగల్ హెయిర్ సర్టిఫికేట్ (వారిసు నామా)
                మధ్య ఉన్న చట్టపరమైన తేడాలు:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#172228]/15 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3 sm:p-3.5 font-bold">లక్షణం (Feature)</th>
                      <th className="p-3 sm:p-3.5 font-bold text-rose-300">వీలునామా (Veelunama)</th>
                      <th className="p-3 sm:p-3.5 font-bold">గిఫ్ట్ డీడ్ (Gift Deed)</th>
                      <th className="p-3 sm:p-3.5 font-bold">వారిసు నామా (Legal Heir)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#172228]/10 text-[#172228]">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold">అమలులోకి వచ్చే సమయం</td>
                      <td className="p-3 text-[#C65378] font-bold">మరణానంతరం మాత్రమే</td>
                      <td className="p-3">రిజిస్ట్రేషన్ అయిన వెంటనే</td>
                      <td className="p-3">మరణానంతరం వారసత్వంగా</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold">రద్దు చేసుకునే హక్కు (Revocation)</td>
                      <td className="p-3 text-emerald-700 font-bold">జీవితకాలంలో ఎప్పుడైనా రద్దు చేయవచ్చు</td>
                      <td className="p-3 text-rose-700">రద్దు చేయడం దాదాపు అసాధ్యం</td>
                      <td className="p-3">వర్తించదు (చట్టబద్ధ పంపకం)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold">స్టాంప్ డ్యూటీ &amp; ఖర్చు</td>
                      <td className="p-3 text-emerald-700 font-bold">₹0 స్టాంప్ డ్యూటీ (మొత్తం ~₹1,500)</td>
                      <td className="p-3 text-rose-700">1% నుండి 2% స్టాంప్ డ్యూటీ (లక్షల్లో ఖర్చు)</td>
                      <td className="p-3">తహశీల్దార్ ఆఫీస్ ఖర్చులు</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold">ఎవరికైనా ఇచ్చే స్వేచ్ఛ</td>
                      <td className="p-3 text-emerald-700 font-bold">ఎవరికైనా ఇష్టానుసారం ఇవ్వవచ్చు</td>
                      <td className="p-3">ఎవరికైనా బహుమతి ఇవ్వవచ్చు</td>
                      <td className="p-3 text-rose-700">కేవలం సహజ వారసులకే సమాన వాటాలు</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold">కోర్టు సవాలు భయం</td>
                      <td className="p-3 text-[#5F7E75] font-semibold">రిజిస్ట్రేషన్ &amp; డాక్టర్ సర్టిఫికెట్‌తో సురక్షితం</td>
                      <td className="p-3">చాలా తక్కువ రిస్క్</td>
                      <td className="p-3 text-amber-700">బంధువుల మధ్య కోర్టు వివాదాలు ఎక్కువ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* =====================================================================
                SECTION 8: STEP-BY-STEP SOP
                ===================================================================== */}
            <section id="step-by-step-sop" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#C65378]">
                <Clock className="w-3.5 h-3.5" />
                <span>విధాన క్రమం • STEP-BY-STEP SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                8. Step-by-Step SOP: Drafting to SRO Registration
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                Follow these five simple steps to draft and register your Will in Telangana or Andhra Pradesh:
              </p>

              <div className="space-y-3">
                <div className="flex gap-3.5 bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#172228]">Collect Property Documents and Title Deeds</h4>
                    <p className="text-xs text-[#172228]/80 mt-1 leading-relaxed">
                      Gather property sale deeds, encumbrance certificates, and tax receipts.
                      List all your bank accounts and fixed deposit details clearly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#172228]">Draft the Will in Telugu or English</h4>
                    <p className="text-xs text-[#172228]/80 mt-1 leading-relaxed">
                      Write your Will in Telugu or English using our format.
                      Make sure that beneficiary names and property boundaries are completely accurate.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#172228]">Get a Doctor Fitness Certificate</h4>
                    <p className="text-xs text-[#172228]/80 mt-1 leading-relaxed">
                      Visit an MBBS doctor on the day you sign.
                      The doctor can issue a certificate of mental fitness and can also act as one of your witnesses.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#172228]">Sign Before Two Independent Witnesses</h4>
                    <p className="text-xs text-[#172228]/80 mt-1 leading-relaxed">
                      Sign every page of your Will in front of two witnesses.
                      Remember that witnesses must not be beneficiaries receiving any property under the Will.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 bg-white p-4 rounded-xl border border-[#172228]/10 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#172228]">Register at the Sub-Registrar Office</h4>
                    <p className="text-xs text-[#172228]/80 mt-1 leading-relaxed">
                      Book a slot on the registration portal.
                      Visit the Sub-Registrar Office to submit biometric thumbprints, photographs, and collect your registered copy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                SECTION 9: PRACTICAL CASE STUDIES & PRECEDENTS
                ===================================================================== */}
            <section id="case-studies" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#5F7E75]">
                <Gavel className="w-3.5 h-3.5" />
                <span>తీర్పులు &amp; విశ్లేషణ • CASE STUDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                9. Practical Case Studies: Hyderabad &amp; Visakhapatnam Courts
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                Real disputes in civil courts teach valuable lessons about how to protect your estate from challenges:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#172228]/10 shadow-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#C65378]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Case 1: Jubilee Hills, Hyderabad (Sec 67 Infraction)</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#172228]">
                    Beneficiary Signed as Witness
                  </h4>
                  <p className="text-xs text-[#172228]/80 leading-relaxed">
                    In a Hyderabad family dispute, a younger son signed as a witness while also being the main heir.
                    The court held that under Section 67, his share was void. Always choose two neutral witnesses who inherit nothing.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#172228]/10 shadow-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#5F7E75]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Case 2: Visakhapatnam (Doctor Certificate Moat)</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#172228]">
                    Doctor Certificate Defeated Dementia Claim
                  </h4>
                  <p className="text-xs text-[#172228]/80 leading-relaxed">
                    In Visakhapatnam, sons challenged their father&apos;s Will claiming he had dementia.
                    The daughter produced an MBBS doctor certificate issued on the registration date. The court upheld the Will.
                  </p>
                </div>
              </div>
            </section>

            {/* =====================================================================
                SECTION 10: SUB-REGISTRAR DOCUMENT CHECKLIST & DOCTOR CERTIFICATE
                ===================================================================== */}
            <section id="checklist-doctor-cert" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#C65378]">
                <FileCheck className="w-3.5 h-3.5" />
                <span>డాక్యుమెంట్ చెక్‌లిస్ట్ • MANDATORY DOCUMENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                10. Sub-Registrar Document Checklist &amp; Doctor Certificate
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                Take these essential documents with you when you visit the Sub-Registrar Office:
              </p>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#172228]/15 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#172228]/85">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Two original printed copies of your Will on good paper</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Original Aadhaar card and PAN card of the person making the Will</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Original Aadhaar cards and address proofs of both witnesses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Doctor mental fitness certificate signed by an MBBS doctor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Original title deeds and recent Encumbrance Certificate (EC)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Recent passport size photos of the testator and witnesses</span>
                  </div>
                </div>

                {/* Doctor Certificate Box */}
                <div className="pt-3 border-t border-[#172228]/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#C65378]">
                      డాక్టర్ మెంటల్ ఫిట్‌నెస్ సర్టిఫికేట్ ఫార్మాట్ (Medical Certificate Draft)
                    </span>
                    <button
                      onClick={copyDoctorCertToClipboard}
                      className="inline-flex items-center gap-1 text-[0.75rem] font-bold text-[#172228] hover:text-[#C65378]"
                    >
                      <Copy className="w-3 h-3 text-[#C65378]" />
                      <span>{copiedDoctorCert ? "సర్టిఫికెట్ కాపీ చేయబడింది!" : "సర్టిఫికెట్ కాపీ చేయండి"}</span>
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-[#172228]/80 leading-relaxed">
                    &quot;I have examined Mr./Mrs. [Name], aged [Age] on [Date]. The person is found to be in sound mental health, fully alert, oriented, and competent to execute a Last Will and Testament without any external influence.&quot;
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                SECTION 11: MID-ARTICLE CONTEXTUAL LINKS TO INTERACTIVE TOOLS
                ===================================================================== */}
            <section id="succession-tools" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#5F7E75]">
                <Calculator className="w-3.5 h-3.5" />
                <span>ఉచిత ఆన్‌లైన్ టూల్స్ • ESTATE PLANNING TOOLS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                11. Contextual Succession Calculators &amp; Estate Planning Tools
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                Use our free legal tools to calculate taxes on inherited property or book professional Will registration:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="group bg-white p-5 rounded-2xl border border-[#172228]/10 hover:border-[#C65378] shadow-xs transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Coins className="w-5 h-5 text-[#C65378]" />
                    <ArrowRight className="w-4 h-4 text-[#172228]/40 group-hover:text-[#C65378] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-sm font-bold text-[#172228] group-hover:text-[#C65378] transition-colors">
                    Inherited Property Capital Gains Calculator
                  </h4>
                  <p className="text-xs text-[#172228]/70 mt-1 leading-relaxed">
                    Compare 12.5% flat tax with 20% indexation on selling inherited family property under Budget 2024 rules.
                  </p>
                </Link>

                <Link
                  href="/services/will-registration"
                  className="group bg-white p-5 rounded-2xl border border-[#172228]/10 hover:border-[#5F7E75] shadow-xs transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Landmark className="w-5 h-5 text-[#5F7E75]" />
                    <ArrowRight className="w-4 h-4 text-[#172228]/40 group-hover:text-[#5F7E75] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-sm font-bold text-[#172228] group-hover:text-[#5F7E75] transition-colors">
                    SRO Will Registration Legal Service
                  </h4>
                  <p className="text-xs text-[#172228]/70 mt-1 leading-relaxed">
                    Get end-to-end assistance from experienced advocates at Sub-Registrar Offices across Telangana and AP.
                  </p>
                </Link>
              </div>
            </section>

            {/* =====================================================================
                SECTION 12: LEGAL AUTHORITY & ADVOCATE PROFILE
                ===================================================================== */}
            <section id="legal-authority" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#C65378]">
                <Award className="w-3.5 h-3.5" />
                <span>విశ్వసనీయత • LEGAL AUTHORITY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                12. Legal Authority: Senior Succession Counsel Profile
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                All templates and guides on WillDrafting are verified by practicing succession lawyers:
              </p>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#172228]/15 shadow-xs flex flex-col sm:flex-row items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xl shrink-0">
                  AM
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <h4 className="text-base font-bold text-[#172228]">Advocate Anuj Anand Malik</h4>
                  <p className="text-xs text-[#C65378] font-bold">Senior Succession Counsel • AMA Legal Solutions</p>
                  <p className="text-xs text-[#172228]/80 leading-relaxed">
                    Over 15 years of experience in estate planning, Will drafting, and property dispute resolution.
                    Guiding families across Hyderabad, Visakhapatnam, and Vijayawada on smooth asset transmission.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:underline"
                    >
                      <span>వారసత్వ సలహా కొరకు సంప్రదించండి (Contact Succession Counsel)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                SECTION 13: FREQUENTLY ASKED QUESTIONS
                ===================================================================== */}
            <section id="faqs" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#5F7E75]">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>ప్రశ్నోత్తరాలు • FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                13. Frequently Asked Questions: Telugu Veelunama Format
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                తెలుగు వీలునామాకు సంబంధించి అత్యంత సాధారణంగా అడిగే చట్టపరమైన ప్రశ్నలకు సమాధానాలు:
              </p>

              <div className="space-y-3">
                {FAQS_DATA.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-[#172228]/10 overflow-hidden shadow-xs transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#172228] hover:text-[#C65378] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          openFaq === idx ? "rotate-180 text-[#C65378]" : "text-[#172228]/50"
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#172228]/80 leading-relaxed border-t border-[#172228]/5 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* =====================================================================
                SECTION 14: OFFICIAL STATUTORY CITATIONS & PORTALS
                ===================================================================== */}
            <section id="statutory-citations" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#C65378]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>అధికారిక మూలాలు • OFFICIAL STATUTORY CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                14. Official Telangana &amp; Andhra Pradesh Legal References
              </h3>
              <p className="text-sm text-[#172228]/80 leading-relaxed">
                ఈ పేజీలో పేర్కొన్న వివరాలన్నీ కింది భారతీయ చట్టాలు మరియు అధికారిక పోర్టళ్ల ప్రకారం నిర్ధారించబడ్డాయి:
              </p>

              <div className="bg-white p-5 rounded-2xl border border-[#172228]/10 shadow-xs space-y-3 text-xs text-[#172228]/85">
                <div className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#172228]">The Indian Succession Act, 1925:</span>
                    <p className="text-[#172228]/70">Sections 57, 59, 63, 67, 70, 74, 213, and 214.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#172228]">The Registration Act, 1908:</span>
                    <p className="text-[#172228]/70">Sections 18(e), 31 (Private attendance at home), and 40 (Persons entitled to present Wills).</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#172228]">Telangana Registration &amp; Stamps Department:</span>
                    <p className="text-[#172228]/70">Official Portal: registration.telangana.gov.in &amp; Dharani Portal (dharani.telangana.gov.in).</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#172228]">Andhra Pradesh Registration &amp; Stamps (IGRS AP):</span>
                    <p className="text-[#172228]/70">Official Portal: igrs.ap.gov.in (Market value search and Will registration appointment services).</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom Conversion CTA Strip */}
            <section className="bg-[#172228] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#172228]/20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative max-w-xl mx-auto space-y-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  మీ కుటుంబ ఆస్తులకు సంపూర్ణ చట్ట రక్షణ కల్పించండి
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  భారతీయ వారసత్వ చట్టం 1925 ప్రకారం ఎలాంటి లోపాలు లేని చట్టబద్ధమైన వీలునామాను ఈరోజే ప్రారంభించండి.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleStartDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-transform hover:-translate-y-0.5 shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>ఆన్‌లైన్ వీలునామా ప్రారంభించండి</span>
                  </button>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#172228] hover:bg-slate-100 text-xs font-bold transition-transform hover:-translate-y-0.5 shadow-sm"
                  >
                    <span>న్యాయవాది సంప్రదింపు</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Legal Disclaimer Box */}
            <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 text-[0.7rem] text-[#172228]/70 leading-relaxed text-center">
              <strong>చట్టపరమైన నిరాకరణ (Legal Disclaimer):</strong> ఈ వెబ్‌పేజీలోని సమాచారం మరియు వీలునామా ఫార్మాట్ కేవలం
              సాధారణ విద్యా మరియు సమాచార ప్రయోజనాల కొరకు మాత్రమే అందించబడినది. ఇది వ్యక్తిగత న్యాయ సలహాగా పరిగణించబడదు.
              సంక్లిష్టమైన కుటుంబ ఆస్తుల పంపకం మరియు ఎన్నారై స్థిరాస్తుల విషయంలో అర్హత కలిగిన న్యాయవాదిని సంప్రదించాల్సిందిగా
              సిఫార్సు చేయడమైనది.
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
