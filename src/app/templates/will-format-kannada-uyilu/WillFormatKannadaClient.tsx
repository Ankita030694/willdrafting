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
  { id: "statutory-basis", label: "1. Statutory Basis: Indian Succession Act & Kaveri 2.0" },
  { id: "kannada-uyilu-format", label: "2. Complete Uyilu Patra Format: Native Kannada Draft" },
  { id: "english-translation", label: "3. English Translation: Kannada Uyilu Clauses Explained" },
  { id: "clause-selector", label: "4. Interactive Clause Selector: Tailor Your Kannada Will" },
  { id: "bangalore-probate-rules", label: "5. Karnataka Probate Moat: Why Bangalore Probate Exempt" },
  { id: "kaveri-fee-calculator", label: "6. Kaveri 2.0 SRO Fee Estimator & Registration Guide" },
  { id: "comparison-table", label: "7. Comparison: Registered Uyilu vs Unregistered vs Gift" },
  { id: "registration-sop", label: "8. Step-by-Step SOP: Kaveri 2.0 Will Registration in SRO" },
  { id: "bhoomi-bbmp-mutation", label: "9. Bhoomi RTC Pouthi Khata & BBMP e-Khata Mutation SOP" },
  { id: "case-studies", label: "10. Practical Case Studies: Bengaluru, Mysuru & Hubballi" },
  { id: "checklist-medical-cert", label: "11. Sub-Registrar Document Checklist & Doctor Certificate" },
  { id: "succession-tools", label: "12. Contextual Estate Calculators & Succession Tools" },
  { id: "legal-backing", label: "13. Legal Backing: Senior Counsel Succession Profile" },
  { id: "faqs", label: "14. Frequently Asked Questions: Kannada Uyilu Patra" },
  { id: "statutory-citations", label: "15. Official Karnataka Statutory References & Portals" },
];

const FAQS_DATA = [
  {
    q: "ಕರ್ನಾಟಕದಲ್ಲಿ ಉಯಿಲು (ವಿಲ್) ಬರೆಯಲು ಮುದ್ರಾಂಕ ಕಾಗದ (Stamp Paper) ಅಗತ್ಯವಿದೆಯೇ?",
    a: "ಇಲ್ಲ. ಭಾರತೀಯ ಉತ್ತರಾಧಿಕಾರ ಕಾಯ್ದೆ 1925 ರ ಸೆಕ್ಷನ್ 63 ಹಾಗೂ ಕರ್ನಾಟಕ ಮುದ್ರಾಂಕ ಕಾಯ್ದೆಯ ಅಡಿಯಲ್ಲಿ ಉಯಿಲು ಬರೆಯಲು ಯಾವುದೇ ಮುದ್ರಾಂಕ ಶುಲ್ಕ (Zero Stamp Duty) ಇರುವುದಿಲ್ಲ. ಬಿಳಿ ಕಾಗದದ (Plain Paper / Green Ledger Paper) ಮೇಲೆ ಕೈಬರಹದಲ್ಲಾಗಲಿ ಅಥವಾ ಬೆರಳಚ್ಚು (Type) ಮಾಡಿಯಾಗಲಿ ಬರೆದ ಉಯಿಲು ಸಂಪೂರ್ಣ ಕಾನೂನುಬದ್ಧವಾಗಿರುತ್ತದೆ.",
  },
  {
    q: "ಕರ್ನಾಟಕದಲ್ಲಿ ಉಯಿಲನ್ನು ನೋಂದಣಿ (Registration) ಮಾಡಿಸುವುದು ಕಡ್ಡಾಯವೇ?",
    a: "ನೋಂದಣಿ ಕಾಯ್ದೆ 1908 ರ ಸೆಕ್ಷನ್ 18(e) ರ ಪ್ರಕಾರ ಭಾರತದಲ್ಲಿ ಹಾಗೂ ಕರ್ನಾಟಕದಲ್ಲಿ ಉಯಿಲು ನೋಂದಣಿ ಮಾಡಿಸುವುದು ಕಡ್ಡಾಯವಲ್ಲ, ಇದು ಐಚ್ಛಿಕವಾಗಿರುತ್ತದೆ. ಆದರೆ ಉಪ-ನೋಂದಣಾಧಿಕಾರಿ (Sub-Registrar) ಕಚೇರಿಯಲ್ಲಿ ಕಾವೇರಿ 2.0 ಮೂಲಕ ನೋಂದಾಯಿಸುವುದರಿಂದ ಮುಂದಿನ ದಿನಗಳಲ್ಲಿ ಉಯಿಲಿನ ಸತ್ಯಾಸತ್ಯತೆಯ ಮೇಲೆ ಬರುವ ತಕರಾರುಗಳು, ಒತ್ತಾಯದ ಆರೋಪಗಳು ಮತ್ತು ನಕಲಿ ದಾಖಲೆ ಸೃಷ್ಟಿ ಪ್ರಕರಣಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತಡೆಯಬಹುದು.",
  },
  {
    q: "ಬೆಂಗಳೂರಿನಲ್ಲಿರುವ ಆಸ್ತಿಯ ಉಯಿಲಿಗೆ ನ್ಯಾಯಾಲಯದ ಪ್ರೊಬೇಟ್ (Probate) ಪಡೆಯುವುದು ಕಡ್ಡಾಯವೇ?",
    a: "ಇಲ್ಲ. ಭಾರತೀಯ ಉತ್ತರಾಧಿಕಾರ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 213(2) ಮತ್ತು ಸೆಕ್ಷನ್ 57 ಕೇವಲ ಹಳೆಯ ಪ್ರೆಸಿಡೆನ್ಸಿ ಪಟ್ಟಣಗಳಾದ ಮುಂಬೈ, ಕೋಲ್ಕತ್ತಾ ಮತ್ತು ಚೆನ್ನೈ ನಗರಗಳಿಗೆ ಮಾತ್ರ ಅನ್ವಯಿಸುತ್ತದೆ. ಕರ್ನಾಟಕ ಹೈಕೋರ್ಟಿನ ಸ್ಪಷ್ಟ ತೀರ್ಪುಗಳ ಪ್ರಕಾರ (A.S. Poovaiah v. V.M. Poovaiah), ಬೆಂಗಳೂರು ಅಥವಾ ಕರ್ನಾಟಕದ ಯಾವುದೇ ಭಾಗದಲ್ಲಿರುವ ಹಿಂದೂ, ಜೈನ, ಸಿಖ್ ಹಾಗೂ ಬೌದ್ಧ ಧರ್ಮೀಯರ ಆಸ್ತಿಗೆ ಪ್ರೊಬೇಟ್ ಪಡೆಯುವುದು ಕಡ್ಡಾಯವಲ್ಲ. ನೋಂದಾಯಿತ ಉಯಿಲಿನ ಆಧಾರದ ಮೇಲೆಯೇ ನೇರವಾಗಿ ಬಿಬಿಎಂಪಿ ಇ-ಖಾತೆ ಅಥವಾ ಭೂಮಿ ಪೌತಿ ಖಾತೆ ವರ್ಗಾವಣೆ ಮಾಡಬಹುದು.",
  },
  {
    q: "ಉಯಿಲು ಪತ್ರಕ್ಕೆ ಎಷ್ಟು ಜನ ಸಾಕ್ಷಿಗಳು (Witnesses) ಸಹಿ ಮಾಡಬೇಕು?",
    a: "ಭಾರತೀಯ ಉತ್ತರಾಧಿಕಾರ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 63(c) ರ ಪ್ರಕಾರ ಕನಿಷ್ಠ ಇಬ್ಬರು ಸಾಕ್ಷಿಗಳು (Two Attesting Witnesses) ಉಯಿಲುಕರ್ತರು ಸಹಿ ಅಥವಾ ಹೆಬ್ಬೆಟ್ಟಿನ ಗುರುತು ಹಾಕುವುದನ್ನು ಪ್ರತ್ಯಕ್ಷವಾಗಿ ನೋಡಿ, ನಂತರ ಅವರ ಸಮ್ಮುಖದಲ್ಲೇ ಸಾಕ್ಷಿಯಾಗಿ ಸಹಿ ಮಾಡಬೇಕು. ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 67 ರ ಪ್ರಕಾರ, ಉಯಿಲಿನ ಮೂಲಕ ಆಸ್ತಿಯ ಫಲ ಪಡೆಯುವ ಫಲಾನುಭವಿಗಳು ಅಥವಾ ಅವರ ಪತಿ/ಪತ್ನಿ ಸಾಕ್ಷಿದಾರರಾಗಿ ಸಹಿ ಮಾಡಬಾರದು. ಸಾಕ್ಷಿದಾರರು ಸ್ವತಂತ್ರ ಮೂರನೇ ವ್ಯಕ್ತಿಗಳಾಗಿರುವುದು ಶ್ರೇಷ್ಠ.",
  },
  {
    q: "ಪಿತ್ರಾರ್ಜಿತ (Ancestral) ಆಸ್ತಿಯನ್ನು ಉಯಿಲಿನ ಮೂಲಕ ಸಂಪೂರ್ಣವಾಗಿ ಬರೆದುಕೊಡಬಹುದೇ?",
    a: "ಇಲ್ಲ. ಒಬ್ಬ ವ್ಯಕ್ತಿಯು ತನ್ನ ಸ್ವಯಾರ್ಜಿತ (Self-Acquired) ಆಸ್ತಿಯನ್ನು ಮಾತ್ರ ತನ್ನ ಇಷ್ಟಾನುಸಾರ ಯಾರಿಗಾದರೂ ಉಯಿಲಿನ ಮೂಲಕ ನೀಡಬಹುದು. ಪಿತ್ರಾರ್ಜಿತ ಅವಿಭಕ್ತ ಹಿಂದೂ ಕುಟುಂಬದ (HUF Coparcenary) ಆಸ್ತಿಯಲ್ಲಿ ತನಗೆ ಕಾನೂನುಬದ್ಧವಾಗಿ ಬರಬೇಕಾದ ಅವಿಭಜಿತ ಪಾಲಿಗೆ (Undivided Share) ಮಾತ್ರ ಉಯಿಲು ಬರೆಯುವ ಹಕ್ಕಿರುತ್ತದೆ, ಇಡೀ ಆಸ್ತಿಗೆ ಬರೆಯುವಂತಿಲ್ಲ.",
  },
  {
    q: "ಕರ್ನಾಟಕ ಉಪ-ನೋಂದಣಾಧಿಕಾರಿ ಕಚೇರಿಯಲ್ಲಿ ಉಯಿಲು ನೋಂದಣಿ ಶುಲ್ಕ ಎಷ್ಟು?",
    a: "ಕರ್ನಾಟಕ ಕಾವೇರಿ 2.0 ನಿಯಮಾವಳಿಗಳ ಪ್ರಕಾರ, ಉಯಿಲು ನೋಂದಣಿಗೆ ಸ್ಟ್ಯಾಂಪ್ ಡ್ಯೂಟಿ ಶೂನ್ಯ (₹0). ನೋಂದಣಿ ಶುಲ್ಕ ₹1,000 ಹಾಗೂ ಸ್ಕ್ಯಾನಿಂಗ್ ಶುಲ್ಕ ಸೇರಿದಂತೆ ಒಟ್ಟು ಸುಮಾರು ₹1,200 ರಿಂದ ₹1,500 ಮಾತ್ರ ಸರ್ಕಾರಿ ಶುಲ್ಕ ತಗಲುತ್ತದೆ.",
  },
  {
    q: "ಒಬ್ಬ ವ್ಯಕ್ತಿ ತನ್ನ ಜೀವಿತಾವಧಿಯಲ್ಲಿ ಉಯಿಲನ್ನು ಎಷ್ಟು ಬಾರಿ ಬದಲಾಯಿಸಬಹುದು?",
    a: "ಒಬ್ಬ ವ್ಯಕ್ತಿಯು ಉತ್ತಮ ಮಾನಸಿಕ ಸ್ವಾಸ್ಥ್ಯ ಹೊಂದಿರುವವರೆಗೂ ತನ್ನ ಜೀವಿತಾವಧಿಯಲ್ಲಿ ಎಷ್ಟು ಬಾರಿ ಬೇಕಾದರೂ ಹೊಸ ಉಯಿಲು ಬರೆಯಬಹುದು ಅಥವಾ ಹಳೆಯ ಉಯಿಲನ್ನು ರದ್ದುಗೊಳಿಸಬಹುದು (Revocation). ಆತ ಕೊನೆಯದಾಗಿ ಬರೆದು ಸಹಿ ಮಾಡಿದ ಉಯಿಲು (Last Will and Testament) ಮಾತ್ರ ಕಾನೂನಿನ ದೃಷ್ಟಿಯಲ್ಲಿ ಸಿಂಧುವಾಗಿರುತ್ತದೆ.",
  },
  {
    q: "ನೋಂದಾಯಿತ ಉಯಿಲಿನ ಮೂಲಕ ಕರ್ನಾಟಕದಲ್ಲಿ ಪೌತಿ ಖಾತೆ (RTC Mutation) ಮಾಡಿಸುವುದು ಹೇಗೆ?",
    a: "ಉಯಿಲು ಬರೆದವರು ನಿಧನರಾದ ನಂತರ, ಅವರ ಮರಣ ಪ್ರಮಾಣಪತ್ರ, ಕಾವೇರಿ 2.0 ನೋಂದಾಯಿತ ಉಯಿಲು ಪ್ರತಿ ಮತ್ತು ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರದೊಂದಿಗೆ (EC) ಭೂಮಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ (landrecords.karnataka.gov.in) ಅಥವಾ ಗ್ರಾಮ ಪಂಚಾಯತಿ/ತಹಶೀಲ್ದಾರ್ ಕಚೇರಿಯಲ್ಲಿ ಕರ್ನಾಟಕ ಭೂ ಕಂದಾಯ ಕಾಯ್ದೆ ಸೆಕ್ಷನ್ 128 ರಡಿ ಪೌತಿ ಖಾತೆ ವರ್ಗಾವಣೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.",
  },
];

export default function WillFormatKannadaClient() {
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
  const [copiedKannada, setCopiedKannada] = useState<boolean>(false);
  const [copiedEnglish, setCopiedEnglish] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedCustomClause, setCopiedCustomClause] = useState<boolean>(false);

  // Kaveri 2.0 SRO Fee Estimator State
  const [propertyEstimatedValue, setPropertyEstimatedValue] = useState<number>(6000000);
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

  const fullKannadaText = `ಉಯಿಲು ಪತ್ರ (ವಿಲ್) ಮಾದರಿ - LAST WILL AND TESTAMENT

ದಿನಾಂಕ: [ದಿನಾಂಕ] [ತಿಂಗಳು] [ವರ್ಷ]
ಸ್ಥಳ: [ಸ್ಥಳ / ತಾಲೂಕು / ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ]

ಉಯಿಲುಕರ್ತರ ವಿವರ (Testator Details):
ನಾನು, ಶ್ರೀ/ಶ್ರೀಮತಿ [ಉಯಿಲುಕರ್ತರ ಪೂರ್ಣ ಹೆಸರು], ವಯಸ್ಸು ಸುಮಾರು [ವಯಸ್ಸು] ವರ್ಷ, ತಂದೆ/ಗಂಡನ ಹೆಸರು [ಹೆಸರು], ಮதம் [ಮತ/ಧರ್ಮ], ಉದ್ಯೋಗ [ಉದ್ಯೋಗ], ಆಧಾರ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ [ಆಧಾರ್ ಸಂಖ್ಯೆ], ಪ್ಯಾನ್ ಸಂಖ್ಯೆ [ಪ್ಯಾನ್ ಸಂಖ್ಯೆ], ವಿಳಾಸ: ಮನೆ ನಂ. [ಮನೆ ಸಂಖ್ಯೆ], [ಬಡಾವಣೆ/ಗ್ರಾಮ], [ಅಂಚೆ ಕಚೇರಿ], [ತಾಲೂಕು], [ಜಿಲ್ಲೆ], ಕರ್ನಾಟಕ - [ಪಿನ್ ಕೋಡ್] ನಿವಾಸಿಯಾದ ನಾನು, ಸ್ವಇಚ್ಛೆಯಿಂದ, ಪರಿಪೂರ್ಣ ಮಾನಸಿಕ ಸ್ವಾಸ್ಥ್ಯದಿಂದ ಹಾಗೂ ಸರಿ-ತಪ್ಪುಗಳ ಸಂಪೂರ್ಣ ವಿವೇಚನೆಯೊಂದಿಗೆ ಬರೆಸಿದ/ಬರೆದ ಕೊನೆಯ ಉಯಿಲು ಪತ್ರವು ಈ ಕೆಳಗಿನಂತಿರುತ್ತದೆ:

೧. ಹಳೆಯ ಉಯಿಲುಗಳ ರದ್ದತಿ (Revocation of Prior Wills):
ಇದಕ್ಕೆ ಮುಂಚಿತವಾಗಿ ನಾನು ಯಾವುದೇ ಉಯಿಲು ಪತ್ರವಾಗಲಿ (Will) ಅಥವಾ ಉಯಿಲು ಅನುಬಂಧಗಳನ್ನಾಗಲಿ (Codicils) ಬರೆದಿದ್ದರೆ, ಅವೆಲ್ಲವನ್ನೂ ಈ ಮೂಲ ದಾಖಲೆಯ ಮೂಲಕ ಸಂಪೂರ್ಣವಾಗಿ ರದ್ದುಪಡಿಸಿರುತ್ತೇನೆ. ಈ ದಿನಾಂಕದಂದು ನಾನು ಮಾಡುತ್ತಿರುವ ಈ ಉಯಿಲೇ ನನ್ನ ಅಂತಿಮ ಮತ್ತು ಕೊನೆಯ ಉಯಿಲು ಪತ್ರವಾಗಿರುತ್ತದೆ (Last Will and Testament).

೨. ಮಾನಸಿಕ ಸ್ವಾಸ್ಥ್ಯದ ದೃಢೀಕರಣ (Sound Mental Health & Discretion):
ನಾನು ಯಾವುದೇ ವ್ಯಕ್ತಿಯ ಬಲಾತ್ಕಾರ, ವಂಚನೆ, ಒತ್ತಡ ಅಥವಾ ಅನುಚಿತ ಪ್ರಭಾವಕ್ಕೆ ಒಳಗಾಗದೆ, ಉತ್ತಮ ಆರೋಗ್ಯ ಮತ್ತು ಸಂಪೂರ್ಣ ಸ್ವಸ್ಥಚಿತ್ತದಿಂದ (Sound Disposing Mind) ಈ ಉಯಿಲನ್ನು ಮಾಡುತ್ತಿದ್ದೇನೆ.

೩. ಉಯಿಲುಕರ್ತರ ಜೀವಿತಾವಧಿ ಹಕ್ಕು (Life Interest of the Testator):
ಈ ಉಯಿಲಿನಲ್ಲಿ ನಮೂದಿಸಲಾದ ಎಲ್ಲಾ ಚರ ಮತ್ತು ಸ್ಥಿರ ಸ್ವತ್ತುಗಳು ನನ್ನ ಜೀವಿತಾವಧಿಯವರೆಗೆ ಸಂಪೂರ್ಣವಾಗಿ ನನ್ನ ಸ್ವಾಧೀನ, ಅನುಭವ ಮತ್ತು ಆಡಳಿತದಲ್ಲೇ ಇರುತ್ತವೆ. ನನ್ನ ಜೀವಿತಾವಧಿಯಲ್ಲಿ ಈ ಆಸ್ತಿಗಳನ್ನು ಅನುಭವಿಸಲು, ಬಾಡಿಗೆಗೆ ನೀಡಲು, ಮಾರಾಟ ಮಾಡಲು, ಗಿರವಿ ಇಡಲು ಅಥವಾ ಯಾವುದೇ ರೀತಿಯ ವ್ಯವಹಾರ ನಡೆಸಲು ನನಗೆ ಸಂಪೂರ್ಣ ಸರ್ವಸ್ವತಂತ್ರ ಹಕ್ಕಿರುತ್ತದೆ. ಈ ಉಯಿಲು ನನ್ನ ಮರಣಾನಂತರವಷ್ಟೇ ಜಾರಿಗೆ ಬರತಕ್ಕದ್ದು.

೪. ಆಸ್ತಿಯ ಸ್ವರೂಪ ಮತ್ತು ಮಾಲೀಕತ್ವ (Source of Title - Self-Acquired):
ಈ ಕೆಳಗಿನ ಅನುಸೂಚಿ 'ಅ' ಮತ್ತು 'ಬ' ದಲ್ಲಿ ನಮೂದಿಸಲಾದ ಆಸ್ತಿಗಳು ನನ್ನ ಸ್ವಂತ ದುಡಿಮೆ ಮತ್ತು ಉಳಿತಾಯದಿಂದ ಸಂಪಾದಿಸಿದ ಸ್ವಯಾರ್ಜಿತ ಆಸ್ತಿಗಳಾಗಿರುತ್ತವೆ (Self-Acquired Properties). ಈ ಆಸ್ತಿಗಳ ಮೇಲೆ ಬೇರೆ ಯಾವ ವ್ಯಕ್ತಿಗೂ ಯಾವುದೇ ರೀತಿಯ ಪೂರ್ವಭಾವಿ ಹಕ್ಕು ಅಥವಾ ಪಾಲುದಾರಿಕೆ ಇರುವುದಿಲ್ಲ.

೫. ಆಸ್ತಿಗಳ ಹಂಚಿಕೆ ವಿವರ (Devolution of Properties):
ನನ್ನ ಮರಣಾನಂತರ:
(ಅ) ಅನುಸೂಚಿ 'ಅ' ದಲ್ಲಿ ಕಾಣಿಸಿದ ಸ್ಥಿರ ಆಸ್ತಿಯಾದ [ಮನೆ / ಸೈಟ್ / ಅಪಾರ್ಟ್‌ಮೆಂಟ್ / ಜಮೀನು] ಸಂಪೂರ್ಣ ಮಾಲೀಕತ್ವದೊಂದಿಗೆ ನನ್ನ [ಸಂಬಂಧ: ಮಗ/ಮಗಳು/ಪತ್ನಿ] ಶ್ರೀ/ಶ್ರೀಮತಿ [ಫಲಾನುಭವಿಯ ಹೆಸರು], ವಯಸ್ಸು [ವಯಸ್ಸು], ಆಧಾರ್ ಸಂಖ್ಯೆ [ಆಧಾರ್ ಸಂಖ್ಯೆ] ಇವರಿಗೆ ಸೇರತಕ್ಕದ್ದು. ಆತ/ಆಕೆ ಈ ಆಸ್ತಿಯನ್ನು ತನ್ನ ಇಷ್ಟಾನುಸಾರ ಬಿಬಿಎಂಪಿ ಇ-ಆಸ್ತಿ ಅಥವಾ ಭೂಮಿ ಪೌತಿ ಖಾತೆ ವರ್ಗಾವಣೆ ಮಾಡಿಸಿಕೊಂಡು ಶಾಶ್ವತವಾಗಿ ಅನುಭವಿಸಲು ಸರ್ವ ಹಕ್ಕು ಹೊಂದಿರುತ್ತಾರೆ.
(ಆ) ಅನುಸೂಚಿ 'ಬ' ದಲ್ಲಿ ಕಾಣಿಸಿದ ಚರ ಆಸ್ತಿಗಳಾದ ಬ್ಯಾಂಕ್ ಖಾತೆ ಠೇವಣಿ, ಚಿನ್ನಾಭರಣ ಹಾಗೂ ಮ್ಯೂಚುಯಲ್ ಫಂಡ್ ಹೂಡಿಕೆಗಳು ನನ್ನ [ಸಂಬಂಧ] ಶ್ರೀ/ಶ್ರೀಮತಿ [ಹೆಸರು] ಅವರಿಗೆ ಸೇರತಕ್ಕದ್ದು.

೬. ಉಳಿಕೆ ಆಸ್ತಿಗಳ ವಿಲೇವಾರಿ ಷರತ್ತು (Residuary Clause):
ಈ ಉಯಿಲಿನಲ್ಲಿ ಆಕಸ್ಮಿಕವಾಗಿ ನಮೂದಿಸಲು ಬಿಟ್ಟುಹೋದ ನನ್ನ ಇನ್ನಿತರ ಯಾವುದೇ ಚರ ಅಥವಾ ಸ್ಥಿರ ಆಸ್ತಿಗಳು ಇದ್ದಲ್ಲಿ, ಅವೆಲ್ಲವೂ ನನ್ನ ನಿಧನಾನಂತರ ಮೇಲ್ಕಂಡ ಫಲಾನುಭವಿಯಾದ ಶ್ರೀ/ಶ್ರೀಮತಿ [ಹೆಸರು] ಅವರಿಗೆ ಸೇರತಕ್ಕದ್ದು.

೭. ಉಯಿಲು ನಿರ್ವಾಹಕರ ನೇಮಕ (Appointment of Executor):
ನನ್ನ ಮರಣಾನಂತರ ಈ ಉಯಿಲಿನಲ್ಲಿ ತಿಳಿಸಲಾದ ಎಲ್ಲಾ ಇಚ್ಛೆಗಳನ್ನು ಶಿಸ್ತುಬದ್ಧವಾಗಿ ನೆರವೇರಿಸಲು ಹಾಗೂ ಕಾನೂನು ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಪೂರೈಸಲು ಶ್ರೀ/ಶ್ರೀಮತಿ [ನಿರ್ವಾಹಕರ ಹೆಸರು], ವಾಸ: [ವಿಳಾಸ], ಗುರುತಿನ ಚೀಟಿ ಸಂಖ್ಯೆ [ಗುರುತಿನ ಸಂಖ್ಯೆ] ಇವರನ್ನು ಈ ಉಯಿಲಿನ ನಿರ್ವಾಹಕರನ್ನಾಗಿ (Executor) ನೇಮಿಸಿರುತ್ತೇನೆ.

೮. ಆಸ್ತಿಗಳ ವಿವರ (Schedule of Properties):
ಅನುಸೂಚಿ 'ಅ' (ಸ್ಥಿರ ಆಸ್ತಿ / Immovable Property):
- ಆಸ್ತಿಯ ವಿಧ: [ವಸತಿ ನಿವೇಶನ / ಕಟ್ಟಡ / ಅಪಾರ್ಟ್‌ಮೆಂಟ್ / ಕೃಷಿ ಜಮೀನು]
- ವಿಳಾಸ / ಸರ್ವೆ ನಂ: [ಸರ್ವೆ ನಂಬರ್ / ಬಿಬಿಎಂಪಿ ಪಿಐಡಿ ಸಂಖ್ಯೆ / ಇ-ಸ್ವತ್ತು ನಂ]
- ಚಕ್ಕುಬಂದಿ (Boundaries):
  * ಪೂರ್ವಕ್ಕೆ: [ವಿವರ]
  * ಪಶ್ಚಿಮಕ್ಕೆ: [ವಿವರ]
  * ಉತ್ತರಕ್ಕೆ: [ವಿವರ]
  * ದಕ್ಷಿಣಕ್ಕೆ: [ವಿವರ]

ಅನುಸೂಚಿ 'ಬ' (ಚರ ಆಸ್ತಿ / Movable Property):
- ಬ್ಯಾಂಕ್ ಉಳಿತಾಯ ಖಾತೆ ವಿವರ: [ಬ್ಯಾಂಕ್ ಹೆಸರು, ಶಾಖೆ, ಖಾತೆ ಸಂಖ್ಯೆ]
- ಫಿಕ್ಸೆಡ್ ಡೆಪಾಸಿಟ್ ವಿವರ: [ಎಫ್‌ಡಿ ರಸೀದಿ ಸಂಖ್ಯೆ ಮತ್ತು ಮೊತ್ತ]
- ಇತರ ಆಸ್ತಿಗಳು / ಲಾಕರ್ ವಿವರ: [ವಿವರ]

ಉಯಿಲುಕರ್ತರ ಸಹಿ / ಹೆಬ್ಬೆಟ್ಟಿನ ಗುರುತು:
_______________________________
(ಶ್ರೀ/ಶ್ರೀಮತಿ [ಉಯಿಲುಕರ್ತರ ಹೆಸರು])

ಸಾಕ್ಷಿಗಳ ದೃಢೀಕರಣ (Attestation Clause under Section 63 Indian Succession Act):
ಉಯಿಲುಕರ್ತರಾದ ಶ್ರೀ/ಶ್ರೀಮತಿ [ಉಯಿಲುಕರ್ತರ ಹೆಸರು] ಅವರು ಉತ್ತಮ ಆರೋಗ್ಯ ಹಾಗೂ ಸ್ವಸ್ಥಚಿತ್ತದಿಂದ ಇದ್ದು, ಈ ಉಯಿಲು ಪತ್ರವನ್ನು ಸ್ವತಃ ಓದಿಕೊಂಡು ಅರ್ಥಮಾಡಿಕೊಂಡು, ನಮ್ಮಿಬ್ಬರ ಸಮಕ್ಷಮದಲ್ಲೇ ತಮ್ಮ ಸಹಿ/ಹೆಬ್ಬೆಟ್ಟಿನ ಗುರುತನ್ನು ಹಾಕಿರುತ್ತಾರೆ. ನಂತರ ಅವರ ಕೋರಿಕೆಯ ಮೇರೆಗೆ ಹಾಗೂ ಅವರ ಪ್ರತ್ಯಕ್ಷ ಸಮ್ಮುಖದಲ್ಲೇ ನಾವಿಬ್ಬರು ಸಾಕ್ಷಿದಾರರಾಗಿ ನಮ್ಮ ಸಹಿಗಳನ್ನು ಮಾಡಿರುತ್ತೇವೆ.

ಸಾಕ್ಷಿ ೧ (Witness 1):
ಸಹಿ: _________________________
ಹೆಸರು: [ಸಾಕ್ಷಿ ೧ ಪೂರ್ಣ ಹೆಸರು]
ತಂದೆಯ ಹೆಸರು: [ಹೆಸರು]
ವಿಳಾಸ: [ಸಂಪೂರ್ಣ ವಿಳಾಸ]
ಆಧಾರ್ / ಗುರುತಿನ ಚೀಟಿ ನಂ: [ಆಧಾರ್ ಸಂಖ್ಯೆ]

ಸಾಕ್ಷಿ ೨ (Witness 2):
ಸಹಿ: _________________________
ಹೆಸರು: [ಸಾಕ್ಷಿ ೨ ಪೂರ್ಣ ಹೆಸರು]
ತಂದೆಯ ಹೆಸರು: [ಹೆಸರು]
ವಿಳಾಸ: [ಸಂಪೂರ್ಣ ವಿಳಾಸ]
ಆಧಾರ್ / ಗುರುತಿನ ಚೀಟಿ ನಂ: [ಆಧಾರ್ ಸಂಖ್ಯೆ]`;

  const fullEnglishText = `LAST WILL AND TESTAMENT (ENGLISH TRANSLATION OF KANNADA DRAFT)

Date of Execution: [Date] [Month] [Year]
Place of Execution: [City / District, Karnataka]

TESTATOR DETAILS:
I, [Full Name of Testator], aged about [Age] years, son/daughter/wife of [Parent/Spouse Name], residing at [Address, Taluk, District], Karnataka - [PIN Code], holding Aadhaar No. [Aadhaar Number] and PAN [PAN], being of sound disposing state of mind, memory, and understanding, and without any coercion, undue influence, fraud, or misrepresentation, do hereby make, publish, and declare this as my Last Will and Testament:

1. REVOCATION OF PRIOR TESTAMENTARY DISPOSITIONS:
I hereby absolutely revoke, cancel, and annul all former Wills, Codicils, and testamentary dispositions executed by me at any time heretofore. I declare this present document to be my final, operative Last Will and Testament.

2. DECLARATION OF SOUND MIND & CAPACITY:
I declare that I am enjoying sound health and robust disposing mental faculties. I am fully conscious of my assets, natural bounty, and legal heirs, and I am executing this document out of my own free volition.

3. ABSOLUTE LIFE INTEREST OF TESTATOR:
All properties listed in the schedules hereunder shall remain under my absolute ownership, custody, and peaceful enjoyment throughout my natural lifetime. I retain unfettered rights to alienate, mortgage, lease, or deal with any of these assets. This Will shall take effect strictly upon and after my demise.

4. NATURE OF TITLE (SELF-ACQUIRED PROPERTY):
I hereby declare that the properties described in Schedule 'A' and Schedule 'B' are my self-acquired assets, acquired exclusively out of my personal earnings, investments, and independent resources. No other coparcener, ancestral claimant, or third party holds any right, title, or interest therein.

5. BEQUEST AND DEVOLUTION OF PROPERTIES:
Upon my death:
(a) The immovable property described in Schedule 'A' shall devolve absolutely and forever upon my [Relationship: Son/Daughter/Spouse], [Beneficiary Name], Aadhaar No. [Aadhaar Number]. The beneficiary shall hold unfettered absolute ownership with full authority to effect BBMP e-Aasthi or Bhoomi RTC Khata mutation in their independent name.
(b) The movable assets described in Schedule 'B' (bank accounts, fixed deposits, jewellery, mutual funds) shall devolve upon [Beneficiary Name].

6. RESIDUARY CLAUSE:
Any other movable or immovable assets, unlisted bank balances, or refunds belonging to me at the time of my death not specifically enumerated herein shall devolve upon [Beneficiary Name] absolutely.

7. APPOINTMENT OF EXECUTOR:
I hereby appoint [Executor Name], residing at [Address], Identity No. [ID Number], to act as the Sole Executor of this my Last Will and Testament to administer my estate and effectuate my testamentary intentions.

SCHEDULE 'A' (Immovable Property):
- Property Type: Residential Plot / Built House / Apartment / Agricultural Land
- BBMP PID / Survey No / e-Swathu No: [Details]
- Boundaries: East by [...], West by [...], North by [...], South by [...]

SCHEDULE 'B' (Movable Property):
- Bank Account Details: [Bank, Branch, Account No]
- Fixed Deposit Receipts & Amounts: [Details]

TESTATOR SIGNATURE / THUMB IMPRESSION:
_____________________________________
([Name of Testator])

ATTESTATION CLAUSE (SECTION 63, INDIAN SUCCESSION ACT, 1925):
Signed, acknowledged, and declared by the above-named Testator as their Last Will and Testament in the joint presence of us, who in their presence, at their request, and in the presence of each other, have subscribed our names as attesting witnesses.

Witness 1:
Signature: __________________________
Name: [Full Name] | Address: [Address] | ID: [Aadhaar No]

Witness 2:
Signature: __________________________
Name: [Full Name] | Address: [Address] | ID: [Aadhaar No]`;

  const copyKannadaToClipboard = () => {
    navigator.clipboard.writeText(fullKannadaText);
    setCopiedKannada(true);
    setTimeout(() => setCopiedKannada(false), 3000);
  };

  const copyEnglishToClipboard = () => {
    navigator.clipboard.writeText(fullEnglishText);
    setCopiedEnglish(true);
    setTimeout(() => setCopiedEnglish(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `KAVERI 2.0 SUB-REGISTRAR WILL REGISTRATION CHECKLIST (KARNATAKA):
1. Original Kannada Will (Uyilu Patra) typed on legal paper/green ledger sheet (minimum 2 copies).
2. Aadhaar Cards & PAN Cards of the Testator and both Attesting Witnesses.
3. Registered Title Deed / Sale Deed chain proving Testator's ownership.
4. Latest BBMP e-Aasthi e-Khata Certificate & Tax Paid Receipt (for Bengaluru properties) or Bhoomi RTC / Pahani (for revenue land).
5. Medical Fitness & Sound Mind Certificate issued by Registered Medical Practitioner (MBBS).
6. 2 Passport-size photographs of Testator and both Witnesses.
7. Kaveri 2.0 Appointment Acknowledgement Slip & Online Fee Payment Challan (₹1,000 registration fee).
8. Section 31 Application (if requesting Sub-Registrar home visit for bedridden/elderly testator).`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  const copyCustomClauseToClipboard = (clauseText: string) => {
    navigator.clipboard.writeText(clauseText);
    setCopiedCustomClause(true);
    setTimeout(() => setCopiedCustomClause(false), 3000);
  };

  // Fee calculation logic under Karnataka Kaveri 2.0
  const baseRegFee = 1000;
  const scanningFeePerPage = 50;
  const totalScanningFee = numberOfPages * scanningFeePerPage;
  const homeVisitFee = isHomeVisit ? 2000 : 0;
  const totalGovFee = baseRegFee + totalScanningFee + homeVisitFee;

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
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 s. 63 • KAVERI 2.0 SRO DRAFT</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ (Legal Will Format in Kannada)
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Complete, lawyer-vetted <strong>ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ</strong> (Kannada Uyilu Patra format) compliant with
            Section 63 of the Indian Succession Act, 1925, Karnataka Registration Rules, and Kaveri 2.0 Sub-Registrar
            procedures for Bengaluru and statewide property transmission.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#kannada-uyilu-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <ScrollText className="w-4 h-4" />
              <span>Get Kannada Uyilu Template</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Challenge-Proof Will</span>
            </button>
          </div>
        </div>

        {/* Feature OG Banner Display - Prominent Visual Banner */}
        <div className="relative max-w-4xl mx-auto px-4 mt-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900 group">
            <Image
              src="/images/will-format-kannada-uyilu-og.jpg"
              alt="Will Format in Kannada: ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ (Uyilu Patra) Legal Template"
              width={1200}
              height={675}
              priority
              className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 sm:p-5 text-left">
              <span className="text-xs uppercase tracking-wider text-rose-300 font-bold block mb-1">
                Official Bilingual Template Pack
              </span>
              <p className="text-xs sm:text-sm text-white/95">
                ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ (Will Format in Kannada) • Indian Succession Act 1925 • Kaveri 2.0 Registration Guide
              </p>
            </div>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 63 ISA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STATUTORY EXECUTION CODE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Kaveri 2.0</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                KARNATAKA ONLINE REGISTRATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹0 Stamp Duty</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NO STAMP PAPER REQUIRED
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Pouthi &amp; e-Khata</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BHOOMI &amp; BBMP READY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Tools)
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
                Governed under Indian Succession Act 1925 ss. 59, 63, 67 &amp; 74; Registration Act 1908 ss. 18(e), 31,
                42-43; Karnataka Registration Rules (Kaveri 2.0); Karnataka Land Revenue Act 1964 ss. 128-129 (Bhoomi);
                and Supreme Court precedent <em>H. Venkatachala Iyengar v. B.N. Thimmajamma</em>.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOLS
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: KANNADA WILL (UYILU PATRA) ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Vernacular Legal Validity:</strong> A Will drafted in Kannada (ವಿಲ್ / ಉಯಿಲು ಪತ್ರ) carries
                    100% legal validity across Indian civil courts, the Karnataka High Court, BBMP, BDA, and all
                    Sub-Registrar Offices under Section 63 of the Indian Succession Act, 1925.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Stamp Duty in Karnataka:</strong> Under the Karnataka Stamp Act, 1957, executing a Will
                    attracts ₹0 stamp duty. You can execute it on clean white paper or green ledger sheet without buying
                    any stamp paper.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Mandatory Probate in Karnataka:</strong> Unlike Mumbai, Kolkata, and Chennai (presidency
                    towns governed by Section 213(2) and Section 57), probate is strictly NOT mandatory in Karnataka for
                    Hindus, Jains, Sikhs, or Buddhists. A registered Uyilu enables direct mutation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Kaveri 2.0 Integration:</strong> Karnataka Department of Stamps and Registration now processes
                    all Sub-Registrar appointments, e-KYC, biometric capture, and Will registration through the Kaveri
                    2.0 portal (<em>kaveri.karnataka.gov.in</em>) for a nominal government fee of ₹1,000.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY BASIS */}
            <section id="statutory-basis" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Basis: Indian Succession Act &amp; Kaveri 2.0
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Writing a Will in Kannada—traditionally termed an <strong>ಉಯಿಲು ಪತ್ರ (Uyilu Patra)</strong> or{" "}
                  <strong>ಮರಣ ಶಾಸನ (Marana Shasana)</strong>—is governed fundamentally by Section 63 of the Indian
                  Succession Act, 1925. The statute does not mandate English or Sanskrit terminology; Indian testamentary
                  jurisprudence recognizes any clear expression of intention written in the mother tongue of the testator,
                  provided the core statutory requirements of signature and two attesting witnesses are fulfilled.
                </p>
                <p>
                  In Karnataka, the landmark Supreme Court Constitution Bench decision originating from the Mysore High
                  Court, <em>H. Venkatachala Iyengar v. B.N. Thimmajamma (AIR 1959 SC 443)</em>, set the golden precedent
                  for proving Wills in India. The Court ruled that the propounder must prove: (1) Due execution under
                  Section 63, (2) Sound disposing state of mind under Section 59, and (3) Dispelling of all suspicious
                  circumstances. When an elderly Kannadiga drafts a Will in Kannada, it demonstrates genuine comprehension
                  and eliminates allegations of linguistic misunderstanding.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Section 63(c) ISA: Two Witnesses</h3>
                    <p className="text-xs text-slate-600">
                      Minimum two independent witnesses must personally observe the testator sign or affix thumb impression,
                      and then attest the document in the testator&apos;s physical presence.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Kaveri 2.0 SRO Portal</h3>
                    <p className="text-xs text-slate-600">
                      Karnataka&apos;s digital registry handles online slot booking, e-KYC photo capture, biometric verification,
                      and electronic archival of the registered Uyilu.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: COMPLETE UYILU PATRA FORMAT (NATIVE KANNADA DRAFT) */}
            <section id="kannada-uyilu-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>NATIVE KANNADA TEMPLATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Complete Uyilu Patra Format: Native Kannada Draft
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The following is the full, legally robust Kannada Uyilu draft tailored for property owners in Bengaluru,
                Mysuru, Mangaluru, Belagavi, and across Karnataka. You can review, copy, and customize this draft directly.
              </p>

              <div className="relative rounded-2xl bg-white border border-slate-300 shadow-md overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-[#172228] text-white">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ಕನ್ನಡ ಉಯಿಲು ಪತ್ರ ಮಾದರಿ (KANNADA WILL TEMPLATE)</span>
                  </div>
                  <button
                    onClick={copyKannadaToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors"
                  >
                    {copiedKannada ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-white" />
                        <span>ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>ಪ್ರತಿ ಕಾಪಿ ಮಾಡಿ (Copy Text)</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 sm:p-6 bg-slate-50 max-h-[550px] overflow-y-auto font-mono text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap select-all border-b border-slate-200">
                  {fullKannadaText}
                </div>

                <div className="p-3 bg-white text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
                  <span>💡 ಮುದ್ರಾಂಕ ಶುಲ್ಕ ಅಗತ್ಯವಿಲ್ಲ. ಲೀಗಲ್ ಸೈಜ್ ಪೇಪರ್ ಮೇಲೆ ಟೈಪ್ ಮಾಡಿ ಸಬ್-ರಿಜಿಸ್ಟ್ರಾರ್ ಕಚೇರಿಯಲ್ಲಿ ನೋಂದಾಯಿಸಬಹುದು.</span>
                  <button
                    onClick={copyKannadaToClipboard}
                    className="text-[#C65378] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Click to Copy Full Draft</span>
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 3: ENGLISH TRANSLATION */}
            <section id="english-translation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>BILINGUAL LEGAL ANATOMY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. English Translation: Kannada Uyilu Clauses Explained
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                For bank managers, overseas family members, non-resident Indians (NRIs), and corporate employers who require
                an English translation of the Kannada document, here is the complete clause-by-clause English counterpart.
              </p>

              <div className="relative rounded-2xl bg-white border border-slate-300 shadow-md overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>ENGLISH TRANSLATION OF KANNADA UYILU DRAFT</span>
                  </div>
                  <button
                    onClick={copyEnglishToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors"
                  >
                    {copiedEnglish ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied English Text!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy English Draft</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 sm:p-6 bg-slate-50 max-h-[450px] overflow-y-auto font-mono text-xs text-slate-700 leading-relaxed whitespace-pre-wrap select-all">
                  {fullEnglishText}
                </div>
              </div>
            </section>

            {/* SECTION 4: INTERACTIVE CLAUSE SELECTOR */}
            <section id="clause-selector" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sliders className="w-4 h-4" />
                <span>INTERACTIVE GENERATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Interactive Clause Selector: Tailor Your Kannada Will
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Customize your Kannada Will clauses depending on whether your property is self-acquired or ancestral, and
                whether you wish to grant life interest to your spouse or appoint an independent executor.
              </p>

              <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Property Title Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Property Title Classification
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPropertyType("self_acquired")}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                          selectedPropertyType === "self_acquired"
                            ? "bg-rose-50 border-[#C65378] text-[#C65378]"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <div>ಸ್ವಯಾರ್ಜಿತ ಆಸ್ತಿ</div>
                        <div className="text-[10px] font-normal text-slate-500">Self-Acquired (100% Free Will)</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPropertyType("coparcenary")}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                          selectedPropertyType === "coparcenary"
                            ? "bg-rose-50 border-[#C65378] text-[#C65378]"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <div>ಪಿತ್ರಾರ್ಜಿತ ಪಾಲು</div>
                        <div className="text-[10px] font-normal text-slate-500">Undivided Coparcenary Share</div>
                      </button>
                    </div>
                  </div>

                  {/* Beneficiary Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Devolution Structure
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setBeneficiaryType("spouse_life")}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          beneficiaryType === "spouse_life"
                            ? "bg-rose-50 border-[#C65378] text-[#C65378]"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <div>ಪತ್ನಿಗೆ ಜೀವಿತಾವಧಿ</div>
                        <div className="text-[10px] font-normal text-slate-500">Spouse Life Interest</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setBeneficiaryType("single")}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          beneficiaryType === "single"
                            ? "bg-rose-50 border-[#C65378] text-[#C65378]"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <div>ಏಕೈಕ ವಾರಸುದಾರ</div>
                        <div className="text-[10px] font-normal text-slate-500">Sole Heir Absolute</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setBeneficiaryType("multiple")}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          beneficiaryType === "multiple"
                            ? "bg-rose-50 border-[#C65378] text-[#C65378]"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <div>ಸಮಾನ ಪಾಲು</div>
                        <div className="text-[10px] font-normal text-slate-500">Equal Sibling Split</div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Toggles */}
                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeExecutor}
                      onChange={(e) => setIncludeExecutor(e.target.checked)}
                      className="rounded text-[#C65378] focus:ring-[#C65378]"
                    />
                    <span className="font-semibold">ಉಯಿಲು ನಿರ್ವಾಹಕ (Executor) ನೇಮಕ ಷರತ್ತು ಸೇರಿಸಿ</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeDoctorCert}
                      onChange={(e) => setIncludeDoctorCert(e.target.checked)}
                      className="rounded text-[#C65378] focus:ring-[#C65378]"
                    />
                    <span className="font-semibold">ವೈದ್ಯಕೀಯ ಪ್ರಮಾಣಪತ್ರ ಷರತ್ತು (Sound Mind Medical Certificate)</span>
                  </label>
                </div>

                {/* Resulting Clause Box */}
                <div className="rounded-xl bg-slate-900 text-white p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-rose-300 font-bold">
                    <span>ತಯಾರಾದ ಕನ್ನಡ ಕಾನೂನು ಷರತ್ತು (CUSTOM KANNADA LEGAL CLAUSE)</span>
                    <button
                      onClick={() => {
                        const customClause = `${
                          selectedPropertyType === "self_acquired"
                            ? "೪. ಸ್ವಯಾರ್ಜಿತ ಆಸ್ತಿ ಘೋಷಣೆ: ಈ ಉಯಿಲಿನಲ್ಲಿ ನಮೂದಿಸಲಾದ ಆಸ್ತಿಗಳು ನನ್ನ ಸ್ವಂತ ಸಂಪಾದನೆಯ ಸ್ವಯಾರ್ಜಿತ ಆಸ್ತಿಯಾಗಿದ್ದು, ಇದನ್ನು ನನ್ನ ಇಷ್ಟಾನುಸಾರ ಯಾರಿಗಾದರೂ ನೀಡಲು ನನಗೆ ಸಂಪೂರ್ಣ ಕಾನೂನುಬದ್ಧ ಅಧಿಕಾರವಿರುತ್ತದೆ."
                            : "೪. ಪಿತ್ರಾರ್ಜಿತ ಅವಿಭಕ್ತ ಪಾಲು: ಹಿಂದೂ ಉತ್ತರಾಧಿಕಾರ ಕಾಯ್ದೆ ಸೆಕ್ಷನ್ 30 ರ ಅಡಿಯಲ್ಲಿ ನನ್ನ ಪಿತ್ರಾರ್ಜಿತ ಅವಿಭಕ್ತ ಕುಟುಂಬದ ಆಸ್ತಿಯಲ್ಲಿ ನನಗೆ ಕಾನೂನುಬದ್ಧವಾಗಿ ಬರಬೇಕಾದ ಅವಿಭಜಿತ ಪಾಲಿಗೆ (Undivided Coparcenary Share) ಮಾತ್ರ ನಾನು ಈ ಉಯಿಲಿನ ಮೂಲಕ ವಿಲೇವಾರಿ ಮಾಡಿರುತ್ತೇನೆ."
                        }\n${
                          beneficiaryType === "spouse_life"
                            ? "೫. ಪತ್ನಿಯ ಜೀವಿತಾವಧಿ ಹಕ್ಕು: ನನ್ನ ಮರಣಾನಂತರ ನನ್ನ ಧರ್ಮಪತ್ನಿ ಶ್ರೀಮತಿ [ಹೆಸರು] ಅವರಿಗೆ ಈ ಆಸ್ತಿಯನ್ನು ತಮ್ಮ ಜೀವಿತಾವಧಿಯವರೆಗೆ ಅನುಭವಿಸಲು ಮತ್ತು ಬಾಡಿಗೆ ಪಡೆಯಲು ಸಂಪೂರ್ಣ ಜೀವಿತಾವಧಿ ಹಕ್ಕಿರುತ್ತದೆ (Life Interest). ಅವರ ಕಾಲಾನಂತರವಷ್ಟೇ ಈ ಆಸ್ತಿಯು ನನ್ನ ಮಕ್ಕಳಿಗೆ ಸಮಾನವಾಗಿ ಹಸ್ತಾಂತರವಾಗತಕ್ಕದ್ದು."
                            : beneficiaryType === "single"
                            ? "೫. ಏಕೈಕ ಮಾಲೀಕತ್ವ: ನನ್ನ ನಿಧನದ ನಂತರ ಈ ಆಸ್ತಿಯ ಸಂಪೂರ್ಣ ಮಾಲೀಕತ್ವವು (Absolute Ownership) ನನ್ನ [ಸಂಬಂಧ] ಶ್ರೀ/ಶ್ರೀಮತಿ [ಹೆಸರು] ಇವರಿಗೆ ಮಾತ್ರ ಸೇರತಕ್ಕದ್ದು."
                            : "೫. ಸಮಾನ ಹಂಚಿಕೆ: ನನ್ನ ಮರಣಾನಂತರ ಈ ಆಸ್ತಿಯು ನನ್ನ ಎಲ್ಲಾ ಮಕ್ಕಳಿಗೆ ಯಾವುದೇ ಭೇದ-ಭಾವವಿಲ್ಲದೆ ಸಮಾನ ಪಾಲುಗಳಾಗಿ (Equal Proportionate Shares) ಹಂಚಿಕೆಯಾಗತಕ್ಕದ್ದು."
                        }${
                          includeExecutor
                            ? "\n೬. ನಿರ್ವಾಹಕರ ನೇಮಕ: ಈ ಉಯಿಲಿನ ಸುಗಮ ಜಾರಿಗೆ ಶ್ರೀ/ಶ್ರೀಮತಿ [ನಿರ್ವಾಹಕರ ಹೆಸರು] ಇವರನ್ನು ಉಯಿಲು ನಿರ್ವಾಹಕರನ್ನಾಗಿ (Executor) ನೇಮಿಸಿದ್ದೇನೆ."
                            : ""
                        }${
                          includeDoctorCert
                            ? "\n೭. ವೈದ್ಯಕೀಯ ದೃಢೀಕರಣ: ನಾನು ಈ ಉಯಿಲನ್ನು ಮಾಡುವ ಸಂದರ್ಭದಲ್ಲಿ ನೋಂದಾಯಿತ ಎಂಬಿಬಿಎಸ್ ವೈದ್ಯರಾದ ಡಾ. [ವೈದ್ಯರ ಹೆಸರು] ಇವರು ನನ್ನ ಮಾನಸಿಕ ಸ್ವಾಸ್ಥ್ಯವನ್ನು (Mental Fitness) ತಪಾಸಣೆ ಮಾಡಿ ಪ್ರಮಾಣೀಕರಿಸಿರುತ್ತಾರೆ."
                            : ""
                        }`;
                        copyCustomClauseToClipboard(customClause);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-white hover:text-rose-200 font-bold"
                    >
                      {copiedCustomClause ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCustomClause ? "Copied!" : "Copy Clause"}</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                    {selectedPropertyType === "self_acquired"
                      ? "೪. ಸ್ವಯಾರ್ಜಿತ ಆಸ್ತಿ ಘೋಷಣೆ: ಈ ಉಯಿಲಿನಲ್ಲಿ ನಮೂದಿಸಲಾದ ಆಸ್ತಿಗಳು ನನ್ನ ಸ್ವಂತ ಸಂಪಾದನೆಯ ಸ್ವಯಾರ್ಜಿತ ಆಸ್ತಿಯಾಗಿದ್ದು, ಇದನ್ನು ನನ್ನ ಇಷ್ಟಾನುಸಾರ ಯಾರಿಗಾದರೂ ನೀಡಲು ನನಗೆ ಸಂಪೂರ್ಣ ಕಾನೂನುಬದ್ಧ ಅಧಿಕಾರವಿರುತ್ತದೆ."
                      : "೪. ಪಿತ್ರಾರ್ಜಿತ ಅವಿಭಕ್ತ ಪಾಲು: ಹಿಂದೂ ಉತ್ತರಾಧಿಕಾರ ಕಾಯ್ದೆ ಸೆಕ್ಷನ್ 30 ರ ಅಡಿಯಲ್ಲಿ ನನ್ನ ಪಿತ್ರಾರ್ಜಿತ ಅವಿಭಕ್ತ ಕುಟುಂಬದ ಆಸ್ತಿಯಲ್ಲಿ ನನಗೆ ಕಾನೂನುಬದ್ಧವಾಗಿ ಬರಬೇಕಾದ ಅವಿಭಜಿತ ಪಾಲಿಗೆ (Undivided Coparcenary Share) ಮಾತ್ರ ನಾನು ಈ ಉಯಿಲಿನ ಮೂಲಕ ವಿಲೇವಾರಿ ಮಾಡಿರುತ್ತೇನೆ."}
                    {"\n"}
                    {beneficiaryType === "spouse_life"
                      ? "೫. ಪತ್ನಿಯ ಜೀವಿತಾವಧಿ ಹಕ್ಕು: ನನ್ನ ಮರಣಾನಂತರ ನನ್ನ ಧರ್ಮಪತ್ನಿ ಶ್ರೀಮತಿ [ಹೆಸರು] ಅವರಿಗೆ ಈ ಆಸ್ತಿಯನ್ನು ತಮ್ಮ ಜೀವಿತಾವಧಿಯವರೆಗೆ ಅನುಭವಿಸಲು ಮತ್ತು ಬಾಡಿಗೆ ಪಡೆಯಲು ಸಂಪೂರ್ಣ ಜೀವಿತಾವಧಿ ಹಕ್ಕಿರುತ್ತದೆ (Life Interest). ಅವರ ಕಾಲಾನಂತರವಷ್ಟೇ ಈ ಆಸ್ತಿಯು ನನ್ನ ಮಕ್ಕಳಿಗೆ ಸಮಾನವಾಗಿ ಹಸ್ತಾಂತರವಾಗತಕ್ಕದ್ದು."
                      : beneficiaryType === "single"
                      ? "೫. ಏಕೈಕ ಮಾಲೀಕತ್ವ: ನನ್ನ ನಿಧನದ ನಂತರ ಈ ಆಸ್ತಿಯ ಸಂಪೂರ್ಣ ಮಾಲೀಕತ್ವವು (Absolute Ownership) ನನ್ನ [ಸಂಬಂಧ] ಶ್ರೀ/ಶ್ರೀಮತಿ [ಹೆಸರು] ಇವರಿಗೆ ಮಾತ್ರ ಸೇರತಕ್ಕದ್ದು."
                      : "೫. ಸಮಾನ ಹಂಚಿಕೆ: ನನ್ನ ಮರಣಾನಂತರ ಈ ಆಸ್ತಿಯು ನನ್ನ ಎಲ್ಲಾ ಮಕ್ಕಳಿಗೆ ಯಾವುದೇ ಭೇದ-ಭಾವವಿಲ್ಲದೆ ಸಮಾನ ಪಾಲುಗಳಾಗಿ (Equal Proportionate Shares) ಹಂಚಿಕೆಯಾಗತಕ್ಕದ್ದು."}
                    {includeExecutor && (
                      <>
                        {"\n"}
                        ೬. ನಿರ್ವಾಹಕರ ನೇಮಕ: ಈ ಉಯಿಲಿನ ಸುಗಮ ಜಾರಿಗೆ ಶ್ರೀ/ಶ್ರೀಮತಿ [ನಿರ್ವಾಹಕರ ಹೆಸರು] ಇವರನ್ನು ಉಯಿಲು ನಿರ್ವಾಹಕರನ್ನಾಗಿ (Executor) ನೇಮಿಸಿದ್ದೇನೆ.
                      </>
                    )}
                    {includeDoctorCert && (
                      <>
                        {"\n"}
                        ೭. ವೈದ್ಯಕೀಯ ದೃಢೀಕರಣ: ನಾನು ಈ ಉಯಿಲನ್ನು ಮಾಡುವ ಸಂದರ್ಭದಲ್ಲಿ ನೋಂದಾಯಿತ ಎಂಬಿಬಿಎಸ್ ವೈದ್ಯರಾದ ಡಾ. [ವೈದ್ಯರ ಹೆಸರು] ಇವರು ನನ್ನ ಮಾನಸಿಕ ಸ್ವಾಸ್ಥ್ಯವನ್ನು (Mental Fitness) ತಪಾಸಣೆ ಮಾಡಿ ಪ್ರಮಾಣೀಕರಿಸಿರುತ್ತಾರೆ.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: KARNATAKA PROBATE MOAT */}
            <section id="bangalore-probate-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LEGAL MOAT &amp; JURISPRUDENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Karnataka Probate Moat: Why Bangalore Probate Exempt
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A critical legal distinction exists between real estate in Karnataka and properties in Mumbai, Kolkata,
                  or Chennai. Under Section 213(2) read with Section 57 of the Indian Succession Act, 1925, obtaining court
                  probate or Letters of Administration is mandatory <strong>only</strong> for Wills executed within the
                  historical ordinary original civil jurisdiction of the High Courts of Bombay, Calcutta, and Madras, or for
                  wills involving immovable property situated within those specific presidency limits.
                </p>
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-amber-900 text-xs sm:text-sm space-y-2">
                  <div className="font-bold flex items-center gap-2 text-amber-800">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Karnataka High Court Ruling: No Mandatory Probate in Karnataka</span>
                  </div>
                  <p>
                    In <em>A.S. Poovaiah v. V.M. Poovaiah (ILR 2001 KAR 3524)</em> and confirmed in subsequent division bench
                    rulings, the Karnataka High Court explicitly held that Section 213 does NOT apply to Hindus, Jains,
                    Sikhs, and Buddhists residing in the State of Karnataka, including Bengaluru. A legatee does NOT need a
                    District Court probate decree before asserting ownership or applying for mutation.
                  </p>
                </div>
                <p>
                  Therefore, in Bengaluru and throughout Karnataka, an <strong>Uyilu Patra registered under Kaveri 2.0</strong> is
                  directly recognized by the BBMP (for e-Aasthi e-Khata), BDA, Gram Panchayats (e-Swathu Form 9/11), the
                  Tahsildar (Bhoomi RTC Pahani mutation), and scheduled banks without undergoing years of probate litigation!
                </p>
              </div>
            </section>

            {/* SECTION 6: KAVERI 2.0 SRO FEE ESTIMATOR */}
            <section id="kaveri-fee-calculator" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>OFFICIAL SRO FEE CALCULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Kaveri 2.0 SRO Fee Estimator &amp; Registration Guide
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Estimate the exact government registration fee at your local Karnataka Sub-Registrar Office (SRO) under
                the Kaveri 2.0 portal rules.
              </p>

              <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Property Value (Informational) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Approx Property Value (₹)
                    </label>
                    <input
                      type="number"
                      value={propertyEstimatedValue}
                      onChange={(e) => setPropertyEstimatedValue(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#C65378] focus:border-transparent"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Stamp Duty is ₹0 regardless of property valuation.
                    </span>
                  </div>

                  {/* Document Pages */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Number of Draft Pages
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={numberOfPages}
                      onChange={(e) => setNumberOfPages(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#C65378] focus:border-transparent"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Scanning fee is ₹50 per page on Kaveri 2.0.
                    </span>
                  </div>

                  {/* Home Visit Toggle */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Sub-Registrar Home Visit?
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsHomeVisit(!isHomeVisit)}
                      className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                        isHomeVisit
                          ? "bg-rose-50 border-[#C65378] text-[#C65378]"
                          : "border-slate-300 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      {isHomeVisit ? "Home Visit Enabled (Sec 31)" : "Standard Visit to SRO"}
                    </button>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      For elderly / bedridden testators under Sec 31.
                    </span>
                  </div>
                </div>

                {/* Calculation Output Bar */}
                <div className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-700">
                    <div>
                      <div className="text-xs text-rose-300 font-bold uppercase">Stamp Duty</div>
                      <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">₹0 (Zero)</div>
                      <div className="text-[10px] text-slate-400">No stamp paper needed</div>
                    </div>
                    <div className="pt-2 sm:pt-0">
                      <div className="text-xs text-rose-300 font-bold uppercase">Base Reg Fee</div>
                      <div className="text-xl sm:text-2xl font-extrabold text-white">₹{baseRegFee.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400">Fixed Karnataka tariff</div>
                    </div>
                    <div className="pt-2 sm:pt-0">
                      <div className="text-xs text-rose-300 font-bold uppercase">Scanning Fee</div>
                      <div className="text-xl sm:text-2xl font-extrabold text-white">₹{totalScanningFee.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400">{numberOfPages} pages × ₹50</div>
                    </div>
                    <div className="pt-2 sm:pt-0">
                      <div className="text-xs text-rose-300 font-bold uppercase">Total Government Fee</div>
                      <div className="text-xl sm:text-2xl font-extrabold text-yellow-300">₹{totalGovFee.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400">Payable online on Kaveri 2.0</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPARATIVE ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Comparison: Registered Uyilu vs Unregistered vs Gift
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Understand the statutory, taxation, and revenue mutation differences between various estate transmission
                methods recognized under Karnataka land laws.
              </p>

              <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm text-left text-slate-700 border-collapse">
                    <thead className="bg-[#172228] text-white uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Feature / Parameter</th>
                        <th className="py-3 px-4 text-[#C65378] font-black">Registered Uyilu (Kaveri 2.0)</th>
                        <th className="py-3 px-4">Plain Paper Uyilu</th>
                        <th className="py-3 px-4">Dāna Patra (Gift Deed)</th>
                        <th className="py-3 px-4">Hakku Bidalike (Release)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Stamp Duty in Karnataka</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">₹0 (Zero)</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">₹0 (Zero)</td>
                        <td className="py-3 px-4 text-rose-700">₹1,000 + 2% Surcharge (Family)</td>
                        <td className="py-3 px-4">₹5,000 fixed (Family)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Registration Requirement</td>
                        <td className="py-3 px-4 font-bold text-emerald-700">Registered at SRO</td>
                        <td className="py-3 px-4 text-amber-700">Unregistered / Notarized</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">Mandatory (Sec 17)</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">Mandatory (Sec 17)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">When Ownership Transfers</td>
                        <td className="py-3 px-4 text-slate-800">Only after death of Testator</td>
                        <td className="py-3 px-4 text-slate-800">Only after death of Testator</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">Immediately upon registration</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">Immediately upon registration</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Can Testator Revoke?</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">Yes, 100% revocable anytime</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">Yes, revocable anytime</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">Irrevocable without court order</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">Irrevocable</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">BBMP / Bhoomi Mutation Risk</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">Very Low (Quick Pouthi/e-Khata)</td>
                        <td className="py-3 px-4 text-amber-700">Moderate (Affidavits required)</td>
                        <td className="py-3 px-4 text-emerald-700">Instant (Deed based)</td>
                        <td className="py-3 px-4 text-emerald-700">Instant (Deed based)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP SOP FOR KAVERI 2.0 REGISTRATION */}
            <section id="registration-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>STEP-BY-STEP PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step SOP: Kaveri 2.0 Will Registration in SRO
              </h3>
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Draft the Kannada Uyilu &amp; Print on Legal Paper</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Finalize your Kannada draft ensuring clear recital of self-acquired status, schedule of properties
                      with bounding limits (ಚಕ್ಕುಬಂದಿ), and appointment of an executor. Print on durable green ledger or
                      stout legal bond paper without buying stamp papers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Obtain MBBS Medical Sound Mind Certificate</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Have a registered medical practitioner examine the testator on the execution date. The doctor issues
                      a certificate on their official letterhead certifying the testator is conscious, oriented in time,
                      place, and person, and possessed of sound testamentary capacity.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Book Appointment on Kaveri 2.0 Portal</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Log in to <em>kaveri.karnataka.gov.in</em>. Select &apos;Document Registration&apos;, choose your jurisdictional
                      Sub-Registrar Office (or any SRO within the registration district), enter testator and witness KYC,
                      pay the ₹1,000 fee online via KII-Pay, and generate your appointment token.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Physical Appearance &amp; Biometric Endorsement</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Testator and two independent witnesses present their original Aadhaar cards before the Sub-Registrar.
                      The SRO captures digital webcam photographs, left-thumb biometrics, and records admission of execution
                      under Section 35 of the Registration Act.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Same-Day Return of Original Registered Will</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      The Sub-Registrar scans the document into the Kaveri 2.0 central repository, affixes the Book 3
                      registration seal, and returns the original registered Will back to the testator on the very same day.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: BHOOMI RTC & BBMP E-KHATA MUTATION */}
            <section id="bhoomi-bbmp-mutation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>POST-DEATH PROPERTY TRANSMISSION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Bhoomi RTC Pouthi Khata &amp; BBMP e-Khata Mutation SOP
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Upon the demise of the testator, property ownership does not transfer automatically in government records.
                  The legatee must file for revenue mutation in the appropriate Karnataka portal depending on property classification:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Card 1: BBMP e-Aasthi */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                    <div className="flex items-center gap-2 font-bold text-[#172228]">
                      <Building className="w-4 h-4 text-[#C65378]" />
                      <span>BBMP e-Aasthi (Bengaluru Urban Sites/Flats)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Submit the registered Uyilu, death certificate, and latest property tax receipt to the Assistant
                      Revenue Officer (ARO) via the BBMP Sakala portal. The ARO publishes a 30-day public notice in the
                      ward office. In the absence of objections, the Khata is transferred directly in the legatee&apos;s name
                      as a digitized &apos;A-Khata&apos;.
                    </p>
                  </div>

                  {/* Card 2: Bhoomi Pouthi Khata */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                    <div className="flex items-center gap-2 font-bold text-[#172228]">
                      <MapPin className="w-4 h-4 text-emerald-700" />
                      <span>Bhoomi Pouthi Khata (Agricultural / Revenue Land)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 128 of the Karnataka Land Revenue Act, 1964, apply on <em>landrecords.karnataka.gov.in</em>{" "}
                      under &apos;Pouthi Khata&apos; (ಪೌತಿ ಖಾತೆ). The Village Accountant (VA) and Revenue Inspector (RI) verify the
                      registered Uyilu, issue Form 21 notice, and enter the legatee&apos;s name in Column 9 of the RTC (Pahani).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>REAL-LIFE SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Bengaluru, Mysuru &amp; Hubballi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="text-xs font-bold text-[#C65378] uppercase">Case 1: Bengaluru Apartment</div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Jayanagar 4BHK Flat Protection</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A retired IT executive drafted a Kannada Uyilu granting life interest to his wife and sole remainder
                    ownership to his daughter. Registered at Basavanagudi SRO on Kaveri 2.0 with an MBBS certificate,
                    preventing partition claims from estranged siblings.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="text-xs font-bold text-[#C65378] uppercase">Case 2: Mysuru Farmhouse</div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Agricultural Land Pouthi Khata</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A farmer in Nanjangud willed 6 acres of self-acquired arecanut land to his younger son who maintained
                    the farm. Registered at Nanjangud SRO. Post-demise, Bhoomi RTC mutation in Column 9 was completed in 45
                    days under Section 128 without any dispute.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="text-xs font-bold text-[#C65378] uppercase">Case 3: Mangaluru Commercial</div>
                  <h3 className="font-extrabold text-slate-900 text-sm">NRI Multi-Heir S54EC Split</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A testator in Kadri Mangaluru bequeathed commercial shopfronts equally among three NRI children as
                    tenants-in-common. This structured drafting enabled each child to claim independent ₹50L Section 54EC
                    bond deductions upon eventual asset monetization.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: SUB-REGISTRAR CHECKLIST & DOCTOR CERTIFICATE */}
            <section id="checklist-medical-cert" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>VERIFICATION ASSETS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Sub-Registrar Document Checklist &amp; Doctor Certificate
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Checklist Box */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Kaveri 2.0 SRO Document Checklist
                    </span>
                    <button
                      onClick={copyChecklistToClipboard}
                      className="text-xs text-[#C65378] font-bold hover:underline inline-flex items-center gap-1"
                    >
                      {copiedChecklist ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedChecklist ? "Copied Checklist!" : "Copy"}</span>
                    </button>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Original Kannada Uyilu drafted on legal/ledger paper.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Testator &amp; 2 witnesses original Aadhaar cards &amp; PAN.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Title deeds / registered sale deeds of schedule properties.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>BBMP e-Khata / Bhoomi RTC Pahani / e-Swathu Form 9 &amp; 11.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Doctor&apos;s Sound Disposing Mind Certificate (MBBS).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Kaveri 2.0 Online Challan receipt for ₹1,000 registration fee.</span>
                    </li>
                  </ul>
                </div>

                {/* Doctor Certificate Format */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Doctor&apos;s Mental Fitness Certificate
                    </span>
                    <button
                      onClick={() => {
                        const doctorText = `MEDICAL FITNESS & SOUND DISPOSING MIND CERTIFICATE
(To be issued on Registered Medical Practitioner's Letterhead)

Date: [Date of Examination]
Place: [City / District, Karnataka]

This is to certify that I have this day examined Mr./Mrs. [Testator Full Name], aged about [Age] years, residing at [Full Address].

Based on my clinical evaluation, I certify that:
1. The subject is conscious, well-oriented in time, place, and person.
2. The subject has normal cognitive faculties, coherent speech, and intact memory.
3. The subject is in a sound disposing state of mind and possesses full mental capacity to execute legal documents including their Last Will and Testament.

Doctor's Name: Dr. [Doctor Name], MBBS / MD
KMC Registration No: [Karnataka Medical Council Reg No]
Signature & Official Clinic Stamp: _________________________`;
                        navigator.clipboard.writeText(doctorText);
                        alert("Doctor certificate format copied to clipboard!");
                      }}
                      className="text-xs text-[#C65378] font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Certificate</span>
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-[11px] font-mono text-slate-700 leading-relaxed border border-slate-200 whitespace-pre-wrap">
                    {`MEDICAL FITNESS & SOUND DISPOSING MIND CERTIFICATE:
"I have clinically examined Mr./Mrs. [Testator Name], aged [Age] years. The subject is conscious, oriented, and possessed of full sound disposing mental faculties to understand the nature and effect of executing this Last Will and Testament."
- Dr. [Name], MBBS (KMC Reg. No. [XXXXX])`}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Eliminates allegations of cognitive decline, dementia, or undue influence under Section 68 Indian
                    Evidence Act.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: CONTEXTUAL SUCCESSION CALCULATORS */}
            <section id="succession-tools" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE SUCCESSION TOOLS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Contextual Estate Calculators &amp; Succession Tools
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Planning your estate involves tax optimization and succession valuation. Use our specialized statutory tools:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] transition-all shadow-xs group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#C65378] uppercase">TAX OPTIMIZER</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C65378] transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm mb-1">
                    Inherited Property Capital Gains Tax Calculator
                  </div>
                  <p className="text-xs text-slate-600">
                    Compare 12.5% Flat vs 20% Indexation under Budget 2024 grandfathering rules for ancestral property sale.
                  </p>
                </Link>

                <Link
                  href="/tools/probate-court-fee-timeline-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] transition-all shadow-xs group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#5F7E75] uppercase">COURT FEE CALCULATOR</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#5F7E75] transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm mb-1">
                    Probate Court Fee Calculator India
                  </div>
                  <p className="text-xs text-slate-600">
                    Calculate ad-valorem Karnataka Court Fees Act tariffs for High Court and District Court succession petitions.
                  </p>
                </Link>
              </div>
            </section>

            {/* SECTION 13: LEGAL BACKING PROFILE */}
            <section id="legal-backing" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL COUNSEL AUTHORSHIP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Legal Backing: Senior Counsel Succession Profile
              </h3>
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-rose-100 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Advocate Anuj Anand Malik</h3>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Succession Counsel • AMA Legal Solutions
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Specialist in Indian testamentary jurisprudence, cross-border NRI estate structuring, High Court
                  probate litigation, and Karnataka Land Revenue mutation defenses. Every template and clause on
                  WillDrafting.in is reviewed to withstand challenges under Section 68 of the Indian Evidence Act and
                  Section 63 of the Indian Succession Act, 1925.
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs font-semibold text-slate-700 gap-2">
                  <span>Advocate Bar Council of India Enrollment</span>
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Verified Legal Counsel</span>
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 14: FAQS */}
            <section id="faqs" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: Kannada Uyilu Patra
              </h3>
              <div className="space-y-3">
                {FAQS_DATA.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : "text-slate-400"
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

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; STATUTES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Official Karnataka Statutory References &amp; Portals
              </h3>
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 text-xs">
                <div className="font-bold text-rose-300">Authoritative Karnataka Government Portals:</div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span>Kaveri 2.0 Registration Portal:</span>
                    <a
                      href="https://kaveri.karnataka.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>kaveri.karnataka.gov.in</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span>Bhoomi RTC Land Records &amp; Pouthi Khata:</span>
                    <a
                      href="https://landrecords.karnataka.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>landrecords.karnataka.gov.in</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>BBMP e-Aasthi Sakala Khata Transfer:</span>
                    <a
                      href="https://bbmpeaasthi.karnataka.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>bbmpeaasthi.karnataka.gov.in</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
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
                Specialist in Indian testamentary jurisprudence, Karnataka SRO Kaveri 2.0 registration protocols, and
                probate exemptions.
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
                  <span>PREVENT FAMILY PARTITION DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Bengaluru &amp; Karnataka Properties
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Draft a custom, legally registered Kannada or English Will compliant with Section 63 ISA and Kaveri 2.0
                  in less than 15 minutes.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will Online</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>KARNATAKA ADVOCATE DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need SRO Registration Assistance or Home Visit?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our succession advocates handle Kaveri 2.0 Sub-Registrar appointments, bedridden testator Section 31
                  home visits, and Bhoomi mutation pan-Karnataka.
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
                      <strong>Section 63 ISA Rigor:</strong> Complete 2-witness execution formatting.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Kaveri 2.0 Aligned:</strong> Matches Karnataka Sub-Registrar standards.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Probate Exemption:</strong> Direct mutation before BBMP &amp; Bhoomi.
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
          href="#kannada-uyilu-format"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <ScrollText className="w-3.5 h-3.5" />
          <span>ಕನ್ನಡ ಉಯಿಲು</span>
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
